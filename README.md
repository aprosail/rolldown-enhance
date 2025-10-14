# Rolldown Enhance Workspace

Some plugins to make your rolldown experience better.
This repository is a pnpm workspace containing following packages and plugins:

Packages (tools and lower level APIs):

- [common-lib-tsconfig](./packages/common-lib-tsconfig):
  tsconfig.json code reuse for libraries development.
- [current-changelog](./packages/current-changelog):
  generate changelog of current version.
- [rolldown-enhance](./packages/rolldown-enhance):
  the collection of all those packages and plugins.
- [tsconfig-aliases](./packages/tsconfig-aliases):
  detect aliases defined in `tsconfig.json`.

Plugins (with `rolldown-plugin-` prefix):

- [tsconfig-paths](./plugins/tsconfig-paths):
  resolve paths from `tsconfig.json` for Rolldown.

WIP.

## Open Source License

This package is released under the [Apache 2.0 License](./LICENSE).
