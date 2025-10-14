import { RolldownPlugin } from "rolldown"
import tsconfigAliases from "tsconfig-aliases"

/**
 * Resolves paths from tsconfig.json for Rolldown.
 *
 * @param tsconfig The path to the tsconfig.json file or the tsconfig object.
 * @returns A Rolldown plugin that resolves paths from tsconfig.json.
 */
export default function (
  tsconfig?: string | Record<string, unknown>,
): RolldownPlugin {
  return {
    name: "tsconfig-paths",
    options(options) {
      return {
        ...options,
        resolve: {
          ...options.resolve,
          alias: tsconfigAliases(tsconfig),
        },
      }
    },
  }
}
