# Gruzprom

An app for a moving company. This project is a monorepo created with [Nx](https://nx.dev). See [Wiki](https://github.com/mksmtn/gruzprom/wiki) for more info.

## Dev containers

This repository uses a [Development Container](https://containers.dev/), which allows developing inside a Docker container with all the dependencies already pre-installed. So if you need to add a global dependency (e.g. a global npm module or a Debian package) you should add it in [the Docker image](./.devcontainer/Dockerfile), so all the other developers get it for free.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Running tests

```bash
npm run test
```

Note: Clarity Design lib is packaged incorrectly, so it [breaks](https://stackoverflow.com/questions/74860112/problem-importing-clarity-components-in-jest-unit-tests) Jest. See example how to solve it in [b2b-ui jest config](./packages/apps/b2b-ui/jest.config.ts).

## Protocol for creating a new project

1. Generate a new project (e.g. an Angular lib):

```bash
nx g @nx/angular:lib my-lib --changeDetection OnPush --inlineStyle true --prefix m-l --standalone true

nx g @nx/angular:app my-app --changeDetection OnPush --inlineStyle true --prefix m-a --standalone true --add-tailwind
```

2. Add `version` Nx target to `project.json` (copy-paste from another project)

3. Configure `tailwind.config.js` in your new project to use the [existing preset](./packages/libs/tailwind-preset/tailwind.config.js), e.g. [in b2b-ui](./packages/apps/b2b-ui/tailwind.config.js)

## Release protocol

We use the [semver](https://github.com/jscutlery/semver) Nx plugin

```bash
nx run my-project:version [...options]

nx affected --target version [..options]
```

## Some commands (just for info)

Adding semver plugin:

```bash
nx g @jscutlery/semver:install
```
