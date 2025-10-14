import { builtinModules } from "node:module"
import { join } from "node:path"
import { defineConfig, RolldownPlugin } from "rolldown"
import { dts } from "rolldown-plugin-dts"
import tsconfigPaths from "rolldown-plugin-tsconfig-paths"
import { dependencies } from "./package.json"
import emptyOutdir from "./src/index"

const root = import.meta.dirname
const out = join(root, "out")
const lib = defineConfig({
  plugins: [tsconfigPaths(), emptyOutdir()],
  external: [/^node:/g, ...Object.keys(dependencies), ...builtinModules],
  cwd: root,
  input: join(root, "src/index.ts"),
  output: { dir: out, format: "esm", minify: true, sourcemap: true },
})

const esModule = defineConfig({
  ...lib,
  plugins: [...(lib.plugins as RolldownPlugin[]), dts({ sourcemap: true })],
})

const commonJS = defineConfig({
  ...lib,
  output: {
    ...lib.output,
    entryFileNames: "index.cjs",
    exports: "named",
    format: "commonjs",
  },
})

export default defineConfig([esModule, commonJS])
