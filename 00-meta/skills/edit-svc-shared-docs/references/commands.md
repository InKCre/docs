# Commands

## Hub Repo (`InKCre/docs`)

```bash
git -C /path/to/InKCre/docs status
git -C /path/to/InKCre/docs add .
git -C /path/to/InKCre/docs commit -m "docs(scope): summary"
git -C /path/to/InKCre/docs push origin <branch>
```

## Spoke Repo Shared Ref Bump

```bash
git -C /path/to/spoke-repo submodule update --init --recursive docs/_shared
git -C /path/to/spoke-repo/docs/_shared fetch origin
git -C /path/to/spoke-repo/docs/_shared checkout <hub-commit>
```

Then validate:

```bash
<skill-root>/scripts/check-submodule.sh   --repo-root /path/to/spoke-repo --mode pre-commit
```

The canonical `<skill-root>` is:

```bash
/path/to/spoke-repo/docs/_shared/00-meta/skills/edit-svc-shared-docs
```

## Safe Status Inspection

```bash
git -C /path/to/spoke-repo submodule status
git -C /path/to/spoke-repo/docs/_shared rev-parse --short HEAD
git -C /path/to/spoke-repo/docs/_shared remote -v
```
