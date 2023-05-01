# Gruzprom

An app for a moving company. This project is a monorepo created with [Nx](https://nx.dev). See [Wiki](https://github.com/mksmtn/gruzprom/wiki) for more info.

## Dev containers

This repository uses a [Development Container](https://containers.dev/), which allows developing inside a Docker container with all the dependencies already pre-installed. So if you need to add a global dependency (e.g. a global npm module or a Debian package) you should add it in [the Docker image](./devcontainer/Dockerfile), so all the other developers get it for free.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Protocol for creating a new project

1. Generate a new project (e.g. an Angular lib):

```bash
nx g @nrwl/angular:lib my-lib --changeDetection OnPush --inlineStyle true --prefix m-l --standalone true
```

2. Add `version` Nx target to `project.json` (copy-paste from another project)

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
