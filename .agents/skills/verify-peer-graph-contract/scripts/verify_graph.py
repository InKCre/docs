#!/usr/bin/env python3
"""Exercise the Hub graph corpus over real Peer HTTP endpoints on one disposable database."""

import argparse
import json
import urllib.error
import urllib.parse
import urllib.request
import uuid
from collections.abc import Iterator
from contextlib import ExitStack, contextmanager
from pathlib import Path

CORPUS = (
    Path(__file__).resolve().parents[4]
    / "20-product-tdd"
    / "graph-navigation-retrieval.corpus.json"
)


class Peer:
    def __init__(self, spec: str, token: str):
        self.name, separator, self.base = spec.partition("=")
        url = urllib.parse.urlsplit(self.base)
        if (
            not separator
            or not self.name
            or url.scheme != "http"
            or url.hostname != "127.0.0.1"
            or not url.port
            or url.path
            or url.query
            or url.fragment
            or url.username
        ):
            raise ValueError("use name=http://127.0.0.1:port for an isolated Peer")
        self.token = token

    def call(self, method: str, path: str, *, expected=(200,), body=None):
        request = urllib.request.Request(
            self.base + path,
            data=None if body is None else json.dumps(body).encode(),
            headers={
                "Authorization": f"Bearer {self.token}",
                "Content-Type": "application/json",
            },
            method=method,
        )
        try:
            with urllib.request.urlopen(request, timeout=20) as response:
                if response.status not in expected:
                    raise RuntimeError(
                        f"{self.name}: {method} {path} returned HTTP {response.status}"
                    )
                if response.status == 204:
                    return None
                return json.load(response)
        except urllib.error.HTTPError as error:
            status = error.code
            error.close()
            if status == 404 and status in expected:
                return None
            raise RuntimeError(
                f"{self.name}: {method} {path} returned HTTP {status}"
            ) from None


@contextmanager
def fixture(writer: Peer, topology: dict) -> Iterator[tuple[dict, dict]]:
    blocks = {}
    relations = {}
    marker = uuid.uuid4().hex
    with ExitStack() as cleanup:
        for alias in topology["blocks"]:
            block = writer.call(
                "POST",
                "/blocks",
                expected=(200, 201),
                body={
                    "resolver": "core.text.v1",
                    "content": f"graph-contract:{marker}:{alias}",
                },
            )
            blocks[alias] = block["id"]
            cleanup.callback(
                writer.call, "DELETE", f"/blocks/{block['id']}", expected=(204, 404)
            )
        for entry in topology["relations"]:
            relation = writer.call(
                "POST",
                "/relations",
                expected=(200, 201),
                body={
                    "from_": blocks[entry["from"]],
                    "to_": blocks[entry["to"]],
                    "content": entry["content"],
                },
            )
            relations[entry["alias"]] = relation["id"]
            cleanup.callback(
                writer.call,
                "DELETE",
                f"/relations/{relation['id']}",
                expected=(204, 404),
            )
        yield blocks, relations
    writer.call("GET", f"/blocks/{next(iter(blocks.values()))}", expected=(404,))


def request_case(peer: Peer, scenario: dict, blocks: dict, relations: dict):
    operation = scenario["operation"]
    options = scenario["input"].copy()
    if operation == "block_neighborhood":
        alias = options.pop("focal")
        block = -1 if alias == "missing" else blocks[alias]
        query = urllib.parse.urlencode(options, doseq=True)
        return peer.call(
            "GET", f"/blocks/{block}/neighborhood?{query}", expected=(200, 404)
        )
    if operation == "relation_neighborhood":
        focal = relations[options["focal"]]
        return peer.call("GET", f"/relations/{focal}/neighborhood")
    if operation == "find_path":
        options["from_block_id"] = blocks[options.pop("from")]
        options["to_block_id"] = blocks[options.pop("to")]
        return peer.call("POST", "/graph/path", body=options)
    raise ValueError(f"unsupported corpus operation {operation}")


def verify_path(value: dict, options: dict, blocks: dict) -> None:
    nodes = value["block_path"]
    edges = value["relation_path"]
    if (
        len(nodes) != len(edges) + 1
        or nodes[0] != blocks[options["from"]]
        or nodes[-1] != blocks[options["to"]]
    ):
        raise AssertionError("path does not connect the requested endpoints")
    graph = value["graph"]
    if set(nodes) != {node["id"] for node in graph["blocks"]}:
        raise AssertionError("path Block identities differ from the graph")
    by_id = {edge["id"]: edge for edge in graph["relations"]}
    if set(edges) != by_id.keys():
        raise AssertionError("path Relation identities differ from the graph")
    for edge_id, start, end in zip(edges, nodes[:-1], nodes[1:], strict=True):
        edge = by_id[edge_id]
        actual = (edge["from_block_id"], edge["to_block_id"])
        valid = {
            "out": [(start, end)],
            "in": [(end, start)],
            "both": [(start, end), (end, start)],
        }
        if actual not in valid[options["direction"]]:
            raise AssertionError(
                "path Relation does not link its consecutive Blocks in the requested direction"
            )
        if options.get("contents") and edge["content"] not in options["contents"]:
            raise AssertionError("path Relation does not match the content filter")


def verify_case(peer: Peer, scenario: dict, blocks: dict, relations: dict) -> str:
    expected = scenario["assert"]
    value = request_case(peer, scenario, blocks, relations)
    status = "missing" if value is None else value.get("status", "found")
    if status != expected["status"]:
        raise AssertionError(
            f"status should be {expected['status']}, observed {status}"
        )
    if status != "found":
        return status
    graph = value["graph"]
    block_set = {node["id"] for node in graph["blocks"]}
    relation_set = {edge["id"] for edge in graph["relations"]}
    if "block_set" in expected and block_set != {
        blocks[name] for name in expected["block_set"]
    }:
        raise AssertionError("unexpected Block set")
    if "relation_set" in expected and relation_set != {
        relations[name] for name in expected["relation_set"]
    }:
        raise AssertionError("unexpected Relation set")
    if "focal" in expected and value["focal_block"] != blocks[expected["focal"]]:
        raise AssertionError("unexpected focal Block")
    if expected.get("endpoint_closed") and any(
        edge[endpoint] not in block_set
        for edge in graph["relations"]
        for endpoint in ("from_block_id", "to_block_id")
    ):
        raise AssertionError("Relation references a Block outside the returned graph")
    if "block_path" in expected and value["block_path"] != [
        blocks[name] for name in expected["block_path"]
    ]:
        raise AssertionError("unexpected ordered Block path")
    if "relation_path" in expected and value["relation_path"] != [
        relations[name] for name in expected["relation_path"]
    ]:
        raise AssertionError("unexpected ordered Relation path")
    if "hop_count" in expected and len(value["relation_path"]) != expected["hop_count"]:
        raise AssertionError("unexpected hop count")
    if scenario["operation"] == "find_path":
        verify_path(value, scenario["input"], blocks)
    return status


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--peer",
        action="append",
        required=True,
        help="name=http://127.0.0.1:port; first Peer writes the disposable fixture",
    )
    parser.add_argument("--token-file", type=Path, required=True)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument(
        "--doctor",
        action="store_true",
        help="read-only readiness and authenticated retrieval",
    )
    mode.add_argument("--report", type=Path)
    parser.add_argument(
        "--disposable-database",
        required=True,
        action="store_true",
        help="confirm all entries use the same task-owned test database",
    )
    args = parser.parse_args()
    token = args.token_file.read_text().strip()
    peers = [Peer(spec, token) for spec in args.peer]
    if not token or len({peer.name for peer in peers}) != len(peers):
        parser.error("token and distinct Peer names are required")
    for peer in peers:
        peer.call("GET", "/readyz")
        peer.call("GET", "/blocks/recent?limit=1")
    if args.doctor:
        print("Ready and authenticated: " + ", ".join(peer.name for peer in peers))
        return 0

    corpus = json.loads(CORPUS.read_text())
    results = []
    try:
        with fixture(peers[0], corpus["topology"]) as (blocks, relations):
            for peer in peers:
                for scenario in corpus["scenarios"]:
                    result = {"peer": peer.name, "scenario": scenario["name"]}
                    try:
                        result["status"] = verify_case(
                            peer, scenario, blocks, relations
                        )
                    except (
                        AssertionError,
                        KeyError,
                        RuntimeError,
                        urllib.error.URLError,
                    ) as error:
                        result.update(status="error", detail=str(error))
                    results.append(result)
    finally:
        args.report.write_text(json.dumps(results, ensure_ascii=False, indent=2) + "\n")
    return int(any(result["status"] == "error" for result in results))


if __name__ == "__main__":
    raise SystemExit(main())
