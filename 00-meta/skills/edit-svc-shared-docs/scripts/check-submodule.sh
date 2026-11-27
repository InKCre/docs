#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  check-submodule.sh --repo-root <unit-repo-path> --mode <pre-bump|pre-commit>

Checks:
  - docs/_shared is an initialized submodule working tree
  - .gitmodules maps docs/_shared to InKCre/docs
  - submodule worktree is clean
  - submodule commit exists on origin
  - in pre-commit mode, the index records the checked-out gitlink
EOF
}

REPO_ROOT=""
MODE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --repo-root)
      REPO_ROOT="${2:-}"
      shift 2
      ;;
    --mode)
      MODE="${2:-}"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "[ERROR] Unknown arg: $1" >&2
      usage
      exit 2
      ;;
  esac
done

if [[ -z "$REPO_ROOT" || -z "$MODE" ]]; then
  echo "[ERROR] Missing required arguments." >&2
  usage
  exit 2
fi

if [[ "$MODE" != "pre-bump" && "$MODE" != "pre-commit" ]]; then
  echo "[ERROR] mode must be pre-bump or pre-commit." >&2
  exit 2
fi

REPO_ROOT="$(cd "$REPO_ROOT" && pwd -P)"
SUBMODULE_PATH="$REPO_ROOT/docs/_shared"
GITMODULES_PATH="$REPO_ROOT/.gitmodules"

if [[ ! -f "$GITMODULES_PATH" ]]; then
  echo "[ERROR] .gitmodules not found at $REPO_ROOT" >&2
  exit 1
fi

if [[ ! -d "$SUBMODULE_PATH" ]]; then
  echo "[ERROR] submodule path missing: $SUBMODULE_PATH" >&2
  exit 1
fi

submodule_root="$(git -C "$SUBMODULE_PATH" rev-parse --show-toplevel 2>/dev/null || true)"
if [[ "$submodule_root" != "$SUBMODULE_PATH" ]]; then
  echo "[ERROR] docs/_shared is not initialized. Run git submodule update --init -- docs/_shared." >&2
  exit 1
fi

submodule_url="$(git -C "$REPO_ROOT" config -f .gitmodules --get submodule.docs/_shared.url || true)"
if [[ -z "$submodule_url" ]]; then
  echo "[ERROR] .gitmodules missing submodule.docs/_shared.url" >&2
  exit 1
fi

if [[ "$submodule_url" != "git@github.com:InKCre/docs.git" && "$submodule_url" != "https://github.com/InKCre/docs.git" ]]; then
  echo "[ERROR] Unexpected submodule URL: $submodule_url" >&2
  exit 1
fi

if [[ -n "$(git -C "$SUBMODULE_PATH" status --porcelain)" ]]; then
  echo "[ERROR] docs/_shared has local modifications. Clean it before continuing." >&2
  exit 1
fi

submodule_commit="$(git -C "$SUBMODULE_PATH" rev-parse HEAD)"
if [[ "$MODE" == "pre-commit" ]]; then
  index_entry="$(git -C "$REPO_ROOT" ls-files --stage -- docs/_shared)"
  if [[ "$index_entry" != "160000 $submodule_commit 0"$'\t'"docs/_shared" ]]; then
    echo "[ERROR] Index does not record the checked-out docs/_shared commit $submodule_commit. Resolve any conflict and stage the intended gitlink with git add -- docs/_shared." >&2
    exit 1
  fi
  if git -C "$REPO_ROOT" diff --cached --quiet --ignore-submodules=none -- docs/_shared; then
    echo "[WARN] docs/_shared pointer not changed in superproject index." >&2
  fi
fi

git -C "$SUBMODULE_PATH" fetch --quiet --prune origin
origin_ref="$(git -C "$SUBMODULE_PATH" for-each-ref \
  --count=1 --format='%(refname)' --contains "$submodule_commit" refs/remotes/origin)"
if [[ -z "$origin_ref" ]]; then
  echo "[ERROR] Submodule commit not reachable on origin: $submodule_commit" >&2
  exit 1
fi

echo "[OK] Submodule checks passed for mode=$MODE"
echo "[OK] URL=$submodule_url"
echo "[OK] COMMIT=$submodule_commit"
