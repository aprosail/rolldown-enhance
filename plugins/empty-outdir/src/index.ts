import consola from "consola"
import { existsSync, readdirSync, rmSync, statSync } from "node:fs"
import { join, resolve } from "node:path"
import { cwd } from "node:process"
import { RolldownPlugin } from "rolldown"

export type Mode = "disable" | "enable" | "force"

/**
 * A plugin to empty output directory for all rolldown outputs.
 * There are three modes:
 *
 * - `"disable"`: Do not empty outdir.
 * - `"enable"`: Empty outdir only when inside cwd.
 * - `"force"`: Empty outdir even if outside cwd.
 */
export default function (mode: Mode = "enable"): RolldownPlugin {
  let root = cwd()
  const emptied = new Set<string>()
  return {
    name: "empty-outdir",

    // Ensure cwd.
    options(inputOptions) {
      if (inputOptions.cwd) root = resolve(inputOptions.cwd)
    },

    // Empty each outdir.
    outputOptions(outputOptions) {
      if (mode === "disable" || !outputOptions.dir) return

      const outdir = resolve(outputOptions.dir || "")
      if (emptied.has(outdir)) return
      if (mode !== "force" && !outdir.startsWith(root)) {
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
