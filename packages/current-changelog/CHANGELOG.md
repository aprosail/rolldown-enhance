## 1.2.1

1. Move into `rolldown-enhance` repository.
2. Simplify some test code, only styles, nothing else.
3. The previous changes are inside the archived repository
   [`current-changelog`](https://github.com/aprosail/current-changelog).

## 1.2.0

Support commonjs module in APIs.

But as the original APIs are designed with default export,
you may need to use `require("current-changelog").default`
to access the default export in CommonJS mode.

## 1.1.0

Support output to specified file:

Before that, you may use `current-changelog > xxx` to output into a file,
but in GitHub workflow runtime, there will sometimes be a `[log]` prefix,
that you may not exactly want.
So current version provided an `--output` option to specify an output file
that the output will be clean.

## 1.0.0

Setup package development environment:

1. `prettier` and `oxlint` for code style.
2. `vitest` for testing.
3. `rolldown` for bundling, with both bin and lib output.
4. Recommended VSCode settings and extensions.

Implement basic functionalities:

1. Auto detect version from `package.json`.
2. Parse changelog from `CHANGELOG.md`.
3. Support multiple version prefix: none, `v`, `ver`, and `version`.
4. Customizable changelog file and content, and customizable version.
5. Command line wrapper for developers to call in npm scripts easily.
6. `check` command to check if version matches package.json.

Documentation:

1. Readme in both English and Chinese languages.
2. Comment documentation for all public functions.
3. Use the Apache 2.0 license.
