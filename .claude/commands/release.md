---
description: Create and publish a new package release using Nx
argument-hint: "dry" for dry-run preview
---

## Release Process

Perform a complete package release using Nx's automated release workflow. This process uses conventional commits to determine version bumps, generates changelogs, creates GitHub releases, and publishes to npm.

### Overview

The Sixui release process:

1. Analyzes conventional commits since last release
2. Determines semantic version bumps (major/minor/patch)
3. Builds all packages with dependency graph awareness
4. Updates package.json versions across monorepo
5. Generates workspace changelog
6. Creates GitHub release
7. Publishes packages to npm registry

**Nx configuration:**

- Uses conventional commits for versioning
- Runs `nx run-many -t build` before versioning
- Creates GitHub releases automatically
- Preserves local dependency protocols (workspace:\*)

### 1. Pre-Release Validation

**Before starting a release, verify:**

```bash
# Ensure working directory is clean
git status

# Ensure on main branch
git branch --show-current

# Pull latest changes
git pull origin main

# Verify all checks pass
pnpm check

# Ensure build succeeds
pnpm build
```

**Pre-release checklist:**

- [ ] All commits follow conventional format
- [ ] Working directory is clean (no uncommitted changes)
- [ ] On main branch
- [ ] Local branch is up-to-date with remote
- [ ] All tests pass
- [ ] Build succeeds for all packages
- [ ] No breaking changes without proper BREAKING CHANGE footer

### 2. Preview Release (Dry Run)

**Always preview before publishing:**

```bash
pnpm release:dry
```

**Review the dry-run output carefully:**

- Version bump calculations (which packages, what versions)
- Changelog entries that will be generated
- GitHub release details
- Package metadata changes
- Dependencies that will be updated

**Common scenarios:**

- `feat:` commits → minor version bump (0.x.0)
- `fix:` commits → patch version bump (0.0.x)
- `BREAKING CHANGE:` in footer → major version bump (x.0.0)
- No conventional commits → no version bump

### 3. Execute Release

**If dry-run looks correct, proceed with actual release:**

```bash
pnpm release -y
```

**What happens during release:**

1. **Pre-version validation**
   - Runs `nx run-many -t build` to ensure all packages build successfully
   - Validates package.json files and dependencies

2. **Version calculation**
   - Analyzes commits since last release tag
   - Applies semantic versioning based on conventional commits
   - Updates all package.json files
   - Updates dependency versions in dependent packages

3. **Changelog generation**
   - Creates/updates CHANGELOG.md
   - Groups changes by type (Features, Bug Fixes, etc.)
   - Links to commits and PRs
   - Includes breaking change notes

4. **Git operations**
   - Creates release commit with updated versions
   - Tags commit with version numbers
   - Pushes commit and tags to remote

5. **GitHub release**
   - Creates GitHub release from tag
   - Includes changelog in release notes
   - Attaches release artifacts if configured

6. **npm publish**
   - Publishes updated packages to npm registry
   - Respects package access settings (public/private)
   - Maintains workspace protocol for local dependencies

### 4. Post-Release Verification

**After release completes, verify:**

```bash
# Verify git tags were created
git tag --list | tail -5

# Verify commit was pushed
git log --oneline -3

# Check remote tags
git ls-remote --tags origin
```

**On GitHub:**

- [ ] Release appears in Releases section
- [ ] Release notes are properly formatted
- [ ] Tags are created correctly

**On npm:**

- [ ] Packages published successfully
- [ ] New versions visible on npm registry
- [ ] Package metadata is correct

### 5. Rollback (If Needed)

**If release fails or needs rollback:**

```bash
# Find the release tag
git tag --list

# Delete local tag
git tag -d @sixui/core@x.x.x

# Delete remote tag (use with caution!)
git push origin :refs/tags/@sixui/core@x.x.x

# If commit was pushed, revert it
git revert HEAD
git push
```

**Note:** npm publishes cannot be undone, only deprecated:

```bash
npm deprecate @sixui/core@x.x.x "Accidental release, use x.x.y instead"
```

## Release Types and Commit Messages

**Understanding version bumps:**

```bash
# Patch release (0.0.x) - Bug fixes only
fix(Button): correct ripple animation timing
fix(core): resolve hydration mismatch in SSR

# Minor release (0.x.0) - New features (backwards compatible)
feat(Dialog): add fullscreen mode
feat(core): add new Tooltip component

# Major release (x.0.0) - Breaking changes
feat(Button)!: remove deprecated variant prop

BREAKING CHANGE: The `variant` prop has been removed.
Use `appearance` prop instead.
```

## Troubleshooting

**Build fails during pre-version:**

- Fix build errors before attempting release
- Ensure all packages build successfully
- Check TypeScript errors and lint issues

**Version not bumping as expected:**

- Verify commits follow conventional format
- Check if commits are since last release tag
- Review dry-run output for version calculation details

**GitHub release creation fails:**

- Verify `GH_TOKEN` or `GITHUB_TOKEN` environment variable is set
- Ensure GitHub CLI (`gh`) is authenticated
- Check repository permissions for creating releases

**npm publish fails:**

- Verify npm authentication (`npm whoami`)
- Check npm registry permissions
- Ensure package names are available/not taken
- Verify package.json `publishConfig` is correct

## Best Practices

**Before releasing:**

- ✅ Run dry-run first, always
- ✅ Verify all CI checks pass
- ✅ Review generated changelog for accuracy
- ✅ Ensure breaking changes are properly documented
- ✅ Test built packages in isolation if possible

**Commit hygiene:**

- ✅ Use meaningful conventional commit messages
- ✅ Include BREAKING CHANGE footer for breaking changes
- ✅ Reference issue numbers in commit bodies
- ✅ Keep commit history clean and logical

**During release:**

- ✅ Monitor the release process output
- ✅ Watch for errors or warnings
- ✅ Don't interrupt the process once started
- ✅ Verify each step completes successfully

**After release:**

- ✅ Verify packages on npm registry
- ✅ Check GitHub release page
- ✅ Update documentation if needed
- ✅ Notify team/users of release
- ✅ Monitor for any issues in new version

## Important Reminders

- **DO NOT** release from feature branches (use main branch only)
- **DO NOT** manually edit package.json versions (let Nx handle it)
- **DO NOT** release with uncommitted changes
- **DO NOT** interrupt the release process once started
- **DO** always run dry-run first
- **DO** verify all checks pass before releasing
- **DO** communicate breaking changes clearly
- **DO** follow semantic versioning principles
