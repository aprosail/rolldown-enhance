import { readFileSync } from "node:fs"
import { builtinModules } from "node:module"
import { join, resolve } from "node:path"
import { RolldownPlugin } from "rolldown"

export interface Options {
  root?: string
  mode?: "node" | "deps" | "all-deps"
  external?: (string | RegExp)[]
  internal?: (string | RegExp)[]
}

export default function (options?: Options): RolldownPlugin {
  return {
    name: "auto-external",
    options(inputOptions) {
      const external = options?.external || []
      const internal = options?.internal || []
      function resolveDeps(...raw: (string | RegExp)[]) {
        return [...raw, ...external].filter((i) => !internal.includes(i))
      }

      const mode = options?.mode || "deps"
      const nodeAPIs = [/^node:/g, ...builtinModules]
      if (mode === "node") {
        return {
          ...inputOptions,
          external: resolveDeps(...nodeAPIs),
        }
      }

      const root = resolve(options?.root || inputOptions.cwd || "")
      const content = readFileSync(join(root, "package.json"), "utf-8")
      const manifest = JSON.parse(content)
      const deps = Object.keys(manifest.dependencies || {})
      if (mode === "deps") {
        return {
          ...inputOptions,
          external: resolveDeps(...deps, ...nodeAPIs),
        }
      }

      const devDeps = Object.keys(manifest.devDependencies || {})
      return {
        ...inputOptions,
        external: resolveDeps(...deps, ...devDeps, ...nodeAPIs),
      }
    },
  }
}
