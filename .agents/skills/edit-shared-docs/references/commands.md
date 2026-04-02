# Commands

## Shared Repo (`InKCre/docs`)

```bash
git -C /path/to/InKCre/docs status
git -C /path/to/InKCre/docs add .
git -C /path/to/InKCre/docs commit -m "docs(scope): summary"
git -C /path/to/InKCre/docs push origin main
```

## Unit Repo Pointer Bump

```bash
git -C /path/to/unit-repo submodule update --init --recursive docs/_shared
git -C /path/to/unit-repo/docs/_shared fetch origin
git -C /path/to/unit-repo/docs/_shared checkout <source-commit>
```

Then validate:

```bash
<skill-root>/scripts/check-submodule.sh \
  --repo-root /path/to/unit-repo --mode pre-commit
```

If you are reading the canonical shared skill through `docs/_shared/.agents/skills/edit-shared-docs/`, then `<skill-root>` is:

```bash
/path/to/unit-repo/docs/_shared/.agents/skills/edit-shared-docs
```

## Safe Status Inspection

```bash
git -C /path/to/unit-repo submodule status
git -C /path/to/unit-repo/docs/_shared rev-parse --short HEAD
git -C /path/to/unit-repo/docs/_shared remote -v
```
