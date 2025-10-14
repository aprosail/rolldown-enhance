# Current Changelog

[en(English)](./README.md) |
[zh(中文)](./README_zh.md)

A command line tool for parsing changelog text of current or specified version.
This package provides both a command line tool and
an API library for developers to use in other projects.

## Usages

### Command Line Tool

```bash
current-changelog                     # Auto detect by default.
current-changelog -h                  # Show help.
current-changelog -v 1.2.3            # Specify version.
current-changelog -f CHANGELOG.xxx.md # Specify changelog file.
current-changelog -o CHANGELOG.md     # Output to file.

current-changelog check 1.2.3 # Check if version matches package.json.
```

### API Library

```ts
import currentChangelog from "current-changelog"

currentChangelog() // Auto detect by default.
currentChangelog({ version: "1.0.0" }) // Specify version.
currentChangelog({ file: "CHANGELOG.xxx.md" }) // Specify changelog file.
currentChangelog({ code: "..." }) // Specify changelog content.
currentChangelog({ workdir: "..." }) // Specify working directory.
```

Attention that in commonjs mode, you need to use `default`
to access the default exported function like this:

```js
const currentChangelog = require("current-changelog").default
```

or:

```js
const { default: currentChangelog } = require("current-changelog")
```

## Open Source License

This package is released under the [Apache 2.0 License](./LICENSE).
