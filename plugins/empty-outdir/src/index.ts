import consola from "consola"
import { existsSync, readdirSync, rmSync, statSync } from "node:fs"
import { join, resolve } from "node:path"
import { RolldownPlugin } from "rolldown"

export interface Options {
  root?: string
  mode?: "disable" | "enable" | "force"
}

/**
 * A plugin to empty output directory for all rolldown outputs.
 *
 * There are three modes:
 *
 * - `"disable"`: Do not empty outdir.
 * - `"enable"`: Empty outdir only when inside package root.
 * - `"force"`: Empty outdir even if outside package root.
 */
export default function (options?: Options): RolldownPlugin {
  let root: string // init in options().
  const emptied = new Set<string>()
  return {
    name: "empty-outdir",
    options(inputOptions) {
      root = resolve(options?.root || inputOptions.cwd || "")
    },
    outputOptions(outputOptions) {
      if (options?.mode === "disable" || !outputOptions.dir) return

      const outdir = resolve(outputOptions.dir || "")
      if (emptied.has(outdir)) return
      if (options?.mode !== "force" && !outdir.startsWith(root)) {
        consola.warn(`cannot empty outdir outside cwd: ${outdir}`)
        return
      }

      const o = outdir
      emptied.add(o)
      if (!existsSync(o) || !statSync(o).isDirectory()) return
      for (const n of readdirSync(o)) rmSync(join(o, n), { recursive: true })
      consola.success(`empty outdir: ${o}`)
    },
  }
}
