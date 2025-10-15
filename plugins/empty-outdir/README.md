# Rolldown Plugin Empty Outdir

A plugin to empty output directory for all rolldown outputs.

## Usage

Add this plugin to your rolldown configurations,
and it will empty output directory for all rolldown outputs.

```ts
import rolldown from "rolldown"
import emptyOutdir from "rolldown-plugin-empty-outdir"

export default defineConfig({
  plugins: [..., emptyOutdir()],
  ...
})
```

There are three mode of empty outdir:

- `"disable"`: Do not empty outdir.
- `"enable"`: Empty outdir only when inside the `root`.
- `"force"`: Empty outdir even if outside the `root`.

By default, it will only empty output directories inside the `root`.
Once the outdir to empty is outside the `root`,
it will not empty such outdir, and will print a warning message.
This is because it may delete something outside the package root in some cases,
which is unsafe, may cause some unexpected issues, and may not what you want.

The root directory is `cwd` by default,
and you can also customize such option like this:

```ts
import rolldown from "rolldown"
import emptyOutdir from "rolldown-plugin-empty-outdir"

const monorepoRoot = ...
export default defineConfig({
  plugins: [..., emptyOutdir({root: monorepoRoot})],
  ...
})
```

When you want to force empty outdir, even they may not inside the `root`,
and you understand the risks, and make sure you can handle such cases,
you can set `mode` to `"force"` like this:

```ts
import rolldown from "rolldown"
import emptyOutdir from "rolldown-plugin-empty-outdir"

export default defineConfig({
  plugins: [..., emptyOutdir({mode: "force"})],
  ...
})
```

## Open Source License

This package is released under the [Apache 2.0 License](./LICENSE).
