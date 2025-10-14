# Rolldown Plugin TSConfig Paths

[en(English)](./README.md) |
[zh(中文)](./README_zh.md)

A plugin to resolves paths from tsconfig for Rolldown.

This plugin will help you to parse paths from a default or specified
`tsconfig.json` or `tsconfig.xxx.json` file, or a parsed tsconfig object,
and then modify the `resolve.alias` option of Rolldown.
That you only need a single line of code
to support tsconfig aliases in Rolldown.

## Usage

It will detect `tsconfig.json` file in cwd by default.

```ts
// rolldown.config.ts
import { defineConfig } from "rolldown"

export default defineConfig({
  plugins: [tsconfigPaths()],
  ...
})
```

You may also customize a tsconfig path:

```ts
// rolldown.config.ts
import { join } from "node:path"
import { defineConfig } from "rolldown"

const root = import.meta.dirname
export default defineConfig({
  plugins: [tsconfigPaths(join(root, "tsconfig.xxx.json"))],
  ...
})
```

You may also customize a tsconfig object:

```ts
// rolldown.config.ts
import { defineConfig } from "rolldown"

export default defineConfig({
  plugins: [tsconfigPaths({ compilerOptions: { ... } })],
  ...
})
```

## Open Source License

This package is released under the [Apache 2.0 License](./LICENSE).
