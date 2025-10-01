---
description: Stage, commit and optionally push changes following project conventions
argument-hint: \"push\" to push changes
---

## Commit Process

Perform a complete git release cycle following project conventions. Note that
you can, and should, create multiple commits if needed, by grouping related
changes together.

1. **Review changes**
   - Run `git status` to see all modified files
   - Run `git diff` to review unstaged changes
   - Run `git log --oneline -5` to see recent commit style

2. **Stage changes**
   - Use `git add` to stage relevant files
   - Be selective - only add files that belong to this commit

3. **Create commit**
   - Follow conventional commit format from .commitlintrc.json
   - Use appropriate type: feat, fix, refactor, docs, style, test, chore
   - Write clear, concise commit message
   - Include co-author attribution for AI assistance

4. **Push to remote**
   - Run `git push` to push changes if the user asked for it
   - Verify push was successful

## Important notes:

- Ensure that commit hooks from husky pass
- Follow the project's commit message conventions
- Never commit sensitive information or API keys
- Never mention Claude in commit messages, like "Generated with Claude" or "Co-Authored by Claude"
