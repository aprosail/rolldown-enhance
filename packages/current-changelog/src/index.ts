import { readFileSync } from "node:fs"
import { join } from "node:path"
import { cwd } from "node:process"

/**
 * Resolve version from raw string or package.json.
 *
 * 1. If raw version is provided, remove 'v', 'ver', or 'version' prefix.
 * 2. If no raw version is provided, read version from package.json in cwd.
 * 3. The result is always a clean version string without any prefix.
 *
 * @param raw raw version string (e.g., 'v1.0.0', 'version 1.0.0')
 * @param workdir working directory to look for package.json
 * @returns resolved version string
 */
export function resolveVersion(raw?: string, workdir?: string) {
  if (raw) return raw.replace(/^(?:v|ver\s+|version\s+)/i, "")
  const content = readFileSync(join(workdir || cwd(), "package.json"), "utf-8")
  return JSON.parse(content).version as string
}

/**
 * Parse a changelog.md file and get changelog content for a specific version.
 *
 * 1. The version title must be heading2 (start with `## `).
 * 2. The version might have a prefix of `v`, `ver` or `version`, or not.
 * 3. The result will be trimmed.
 * 4. When not found, it throws.
 * 5. The prefix might be Capital cased.
 *
 * @param raw content of the changelog file.
 * @param version version to parse.
 */
export function parseCurrentChangelog(raw: string, version: string) {
  // Normalize version number by removing all possible prefixes.
  const resolvedVersion = version.replace(/^(?:v|ver\s+|version\s+)/i, "")

  // Build version pattern that supports various prefixes.
  const versionPattern = `##\\s+(?:v|ver\\s+|version\\s+)?${resolvedVersion}\\b`
  const versionRegex = new RegExp(versionPattern, "i")
  const versionMatch = raw.match(versionRegex)
  if (!versionMatch) throw new Error(`version ${version} not found`)

  const startIndex = versionMatch.index! + versionMatch[0].length
  const nextVersionRegex = /^##\s+(?:v|ver\s+|version\s+)?\d+\.\d+\.\d+\b/gim

  nextVersionRegex.lastIndex = startIndex
  const nextVersionMatch = nextVersionRegex.exec(raw)
  const endIndex = nextVersionMatch ? nextVersionMatch.index : raw.length

  // Ensure we get the content after the version title.
  let content = raw.slice(startIndex, endIndex).trim()

  // Remove leading newline if present.
  if (content.startsWith("\n")) content = content.slice(1)
  if (!content) throw new Error(`content not found for version ${version}`)
  return content
}

/**
 * Check if the provided version matches the version in package.json.
 *
 * @param version version to check.
 * @param workdir working directory to look for package.json.
 * @returns object with match status and package version.
 */
export function checkVersion(version: string, workdir?: string) {
  const normalizedInput = version
    .replace(/^(?:version\s+|ver\s+|v)/i, "")
    .trim()
  const packageVersion = resolveVersion(undefined, workdir)

  return {
    isMatch: normalizedInput === packageVersion,
    packageVersion,
    inputVersion: normalizedInput,
  }
}

/**
 * Main function to parse changelog content for specific version.
 *
 * 1. Resolves version from options or package.json.
 * 2. Reads changelog content from file or uses provided code.
 * 3. Parses and returns changelog content for the specified version.
 * 4. Default changelog file is 'CHANGELOG.md' in current directory.
 *
 * @param options configuration options.
 * @param options.file path to changelog file (default: 'CHANGELOG.md').
 * @param options.code changelog content as string (overrides file).
 * @param options.version target version (default: from package.json).
 * @param options.workdir working directory for file resolution.
 * @returns changelog content for the specified version.
 */
export default function (options: {
  file?: string
  code?: string
  version?: string
  workdir?: string
}) {
  const version = resolveVersion(options.version, options.workdir)
  const content =
    options.code ||
    readFileSync(options.file || join(cwd(), "CHANGELOG.md"), "utf-8")

  return parseCurrentChangelog(content, version)
}
