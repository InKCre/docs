#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  check-submodule.sh --repo-root <unit-repo-path> --mode <pre-bump|pre-commit>

Checks:
  - docs/_shared exists and is a git repo
  - .gitmodules maps docs/_shared to InKCre/docs
  - submodule worktree is clean
  - submodule commit exists on origin
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

REPO_ROOT="$(cd "$REPO_ROOT" && pwd)"
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

if ! git -C "$SUBMODULE_PATH" rev-parse --git-dir >/dev/null 2>&1; then
  echo "[ERROR] docs/_shared is not a valid git working tree." >&2
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
git -C "$SUBMODULE_PATH" fetch --quiet origin
if ! git -C "$SUBMODULE_PATH" for-each-ref --format='%(refname)' refs/remotes/origin --contains "$submodule_commit" | grep -q .; then
  echo "[ERROR] Submodule commit not reachable on origin: $submodule_commit" >&2
  exit 1
fi

if [[ "$MODE" == "pre-commit" ]]; then
  if [[ -n "$(git -C "$REPO_ROOT" status --porcelain docs/_shared | sed -n '1p')" ]]; then
    :
  else
    echo "[WARN] docs/_shared pointer not changed in superproject index." >&2
  fi
fi

echo "[OK] Submodule checks passed for mode=$MODE"
echo "[OK] URL=$submodule_url"
echo "[OK] COMMIT=$submodule_commit"
