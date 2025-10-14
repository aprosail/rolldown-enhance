import { mkdirSync, readdirSync, rmSync } from "node:fs"
import { builtinModules } from "node:module"
import { join } from "node:path"
import { defineConfig } from "rolldown"
import { dts } from "rolldown-plugin-dts"
import { dependencies } from "./package.json"

const root = import.meta.dirname
const out = join(root, "out")
const bin = defineConfig({
  external: [/^node:/g, ...Object.keys(dependencies), ...builtinModules],
  cwd: root,
  input: join(root, "src/main.ts"),
  output: { dir: out, format: "esm", minify: true, sourcemap: true },
})

const lib = defineConfig({ ...bin, input: join(root, "src/index.ts") })
const esModule = defineConfig({ plugins: [dts({ sourcemap: true })], ...lib })
const commonJS = defineConfig({
  ...lib,
  output: {
    ...lib.output,
    dir: join(out, "commonjs"),
    format: "commonjs",
    exports: "named",
  },
})

mkdirSync(out, { recursive: true })
for (const n of readdirSync(out)) rmSync(join(out, n), { recursive: true })
export default defineConfig([bin, esModule, commonJS])
