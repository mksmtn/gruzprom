# Gruzprom

An app for a moving company. This project is a monorepo created with [Nx](https://nx.dev). See [Wiki](https://github.com/mksmtn/gruzprom/wiki) for more info.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Protocol for creating a new project

1. Add `version` Nx target to `project.json`:

```bash
npx nx g @jscutlery/semver:install
```

## Release protocol

We use the [semver](https://github.com/jscutlery/semver) Nx plugin

```bash
npx nx run my-project:version [...options]

npx nx affected --target version [..options]
```
