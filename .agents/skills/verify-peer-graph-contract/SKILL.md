---
name: verify-peer-graph-contract
description: 在同一个隔离信息库上通过真实 Python 和 Rust Peer HTTP 入口验证 InKCre 图导航契约。改动 Block 邻域、Relation 邻域、有向最短路径或 HTTP 映射时使用。
---

# 验证 Peer 图导航契约

运行器读取 Hub 的 [共享语料](../../../20-product-tdd/graph-navigation-retrieval.corpus.json)，由首个 Peer 通过 HTTP 写入真实拓扑，再从每个 Peer 读取。跨实现修改使用两个候选入口。单实现修改也可用 `--peer` 指定一个入口。

## 启动

准备有 pgvector 的 PostgreSQL 17、装有依赖的 Python 专用工作树，以及 Rust 专用工作树。以下命令从 Hub 工作树根在 Bash 中运行。参数依次是本次 Python、Rust 工作树绝对路径，端口被占用时更换。Rust 的 [专属数据库入口](https://github.com/InKCre/impl-rs/blob/main/CONTRIBUTING.md#独占开发数据库) 使用传入的 Python 版本初始化。

```bash
set -euo pipefail
umask 077
hub="$PWD"
py_repo="$1"
rust_repo="$2"
proof="$(mktemp -d "${TMPDIR:-/tmp}/inkcre-graph-proof.XXXXXX")"
py_port=18762
rust_port=18763

(
  cd "$rust_repo"
  git submodule update --init --recursive
  agent-build cargo build --locked -p inkcre-app
  python3 scripts/dev_database.py init --impl-py "$py_repo"
  python3 scripts/dev_database.py exec -- target/debug/inkcre db-check | jq -e '.environment == "development"'
  python3 scripts/dev_database.py exec -- target/debug/inkcre token --lifetime-seconds 1800 >"$proof/token"
)
```

在两个独立终端前台启动 Peer，复用上面设置的路径、端口和 `proof`。用 Rust 的 `exec` 把测试连接传给进程，Python 进程追加 SQLAlchemy 驱动名，启动时跳过与图导航无关的 Extension。

```bash
cd "$rust_repo"
python3 scripts/dev_database.py exec -- target/debug/inkcre serve \
  --bind "127.0.0.1:$rust_port" --state-dir "$proof/rust-peer" --no-worker --no-cron
```

```bash
cd "$py_repo"
python3 "$rust_repo/scripts/dev_database.py" exec -- bash -c '
  export DATABASE_URL="postgresql+psycopg://${DATABASE_URL#postgresql://}"
  export INKCRE_ENV_FILE="" SKIP_EXTENSION_START=1 OBSRV__LOGGING_BACKEND=none
  export PEER_ID="$(pdm run python -c "import uuid; print(uuid.uuid4())")"
  exec pdm run python -m uvicorn run:api_app --host 127.0.0.1 --port "$1"
' inkcre-graph-python "$py_port"
```

## 就绪与诊断

用 `lsof -nP -iTCP:<端口> -sTCP:LISTEN` 确认监听进程是刚启动的两个候选。记录两个工作树的 `git rev-parse HEAD` 和工作树是否有本次未提交改动。执行只读诊断，确认每个 Peer 的就绪端点和授权 Block 读取成功。

```bash
verify="$hub/.agents/skills/verify-peer-graph-contract/scripts/verify_graph.py"
peers=(--peer "python=http://127.0.0.1:$py_port" --peer "rust=http://127.0.0.1:$rust_port")
python3 "$verify" "${peers[@]}" --token-file "$proof/token" --disposable-database --doctor
```

## 驱动和证据

```bash
python3 "$verify" "${peers[@]}" --token-file "$proof/token" --disposable-database \
  --report "$proof/python-first.json"
python3 "$verify" --peer "rust=http://127.0.0.1:$rust_port" --peer "python=http://127.0.0.1:$py_port" \
  --token-file "$proof/token" --disposable-database --report "$proof/rust-first.json"
```

每个报告应包含每个 Peer 的十个当前语料场景。成功退出、语义状态、路径顺序和邻域闭合由运行器判断。查看 [功能地图](features/README.md) 对照每个入口。保留两个报告、候选 SHA 和退出状态。TypeScript 直接走 [PostgREST SDK 的图导航入口](https://github.com/InKCre/impl-ts/blob/main/packages/core/src/graph-navigation-retrieval/main.ts)，它需要在该 SDK 层单独验收。

## 清理

运行器按相反顺序删掉自己创建的 Relation 和 Block，再重新读取第一个 Block 确认已消失。失败后也会尝试清理已记录的对象。停止本次前台启动的两个进程，在 Rust 专用工作树执行 `python3 scripts/dev_database.py destroy`。删除 `"$proof/token"` 和本次 Rust 运行状态。保留两个 JSON 报告并确认文件仍可读。报告里只有 Peer 别名、场景名、状态和断言失败信息。

当用户修改路由、图语义或可选运行时，更新语料与功能地图。哪些变化成为新的产品契约，以及部署到哪些 Peer，由共享契约的维护者判断。
