# Contributing

Create a new branch.

```sh
$ git checkout -b button-color
```

Edit code, ie. `src/components/atoms/Button/Button.tsx`, then commit changes.

```sh
$ git add .
$ git commit -m "feat: button has a new color"
$ git push -u origin button-color
```

Open a pull request for the `button-color` branch (via GitHub.com or a VSCode plugin). Once opened, the CI job to publish Storybook will run.

If needed, in the list of PR checks at the bottom of the page, click `Storybook Publish` to view the published Storybook with the new changes and review it.

Now merge the PR, navigate to the package on npm, and hang tight for a few minutes while the package is updated.

Checkout main and delete the merged branch.

```sh
$ git checkout main
$ git pull
$ git branch -d button-color
```

### Tokens (.env)

Used to run `yarn release` locally.

#### GITHUB_TOKEN

Create a [fine-grained token](https://github.com/settings/tokens?type=beta) on GitHub with the following scopes:

- Repository access
  - sixui/sixui
- Repository permissions
  - repo:issues (rw)
  - repo:workflow (rw)
  - repo:contents (rw)
  - repo:pull-requests (r)

### NPM_TOKEN

Used to run `yarn release` locally.

Create a [granular access token](https://www.npmjs.com/settings/olivierpascal/tokens) on npmjs with the following scopes:

- Packages and scopes
  - @sixui: read/write
