# Contributing

## Clone

```sh
$ git clone https://github.com/sixui/sixui
$ cd sixui
```

## Prepare

```sh
$ nvm use 18
$ yarn set version 4.1.0
$ yarn install
```

## Run for local development

```sh
$ yarn dev
```

Open Storybook at http://localhost:6006.

## Work on a new branch

```sh
$ git checkout -b button-color
```

## Edit code

Ie. `src/components/atoms/Button/Button.tsx`, then commit changes.

```sh
$ git add .
$ git commit -m "feat: button has a new color"
$ git push -u origin button-color
```

## Submit your code

Open a pull request for the `button-color` branch (via GitHub.com or a VSCode plugin). Once opened, the CI job to publish Storybook will run.

If needed, in the list of PR checks at the bottom of the page, click `Storybook Publish` to view the published Storybook with the new changes and review it.

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
