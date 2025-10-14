import { readFileSync } from "node:fs"
import { basename } from "node:path"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { checkVersion, parseCurrentChangelog } from "."

describe("parseCurrentChangelog", () => {
  const sampleChangelog = [
    "# Changelog",
    "",
    "All notable changes to this project will be documented in this file.",
    "",
    "## v1.0.0 - 2024-01-01",
    "",
    "### Added",
    "- Initial release",
    "- Basic functionality",
    "",
    "## 1.1.0 - 2024-02-01",
    "",
    "### Added",
    "- New feature A",
    "- New feature B",
    "",
    "### Fixed",
    "- Bug fix 1",
    "",
    "## version 2.0.0 - 2024-03-01",
    "",
    "### Breaking Changes",
    "- API changes",
    "- Configuration updates",
    "",
    "### Added",
    "- Major new features",
    "",
    "## Version 2.1.0 - 2024-04-01",
    "",
    "### Added",
    "- Feature with capital Version prefix",
    "",
    "## ver 2.2.0 - 2024-05-01",
    "",
    "### Added",
    "- Feature with ver prefix",
    "",
    "## Ver 2.3.0 - 2024-06-01",
    "",
    "### Added",
    "- Feature with capital Ver prefix",
  ].join("\n")

  test("parse version with v prefix", () => {
    const result = parseCurrentChangelog(sampleChangelog, "v1.0.0")
    expect(result).toContain("### Added")
    expect(result).toContain("- Initial release")
    expect(result).toContain("- Basic functionality")
    expect(result).not.toContain("## 1.1.0")
  })

  test("parse version without prefix", () => {
    const result = parseCurrentChangelog(sampleChangelog, "1.1.0")
    expect(result).toContain("### Added")
    expect(result).toContain("- New feature A")
    expect(result).toContain("- New feature B")
    expect(result).toContain("### Fixed")
    expect(result).toContain("- Bug fix 1")
    expect(result).not.toContain("## v1.0.0")
    expect(result).not.toContain("## version 2.0.0")
  })

  test("parse version with version prefix", () => {
    const result = parseCurrentChangelog(sampleChangelog, "version 2.0.0")
    expect(result).toContain("### Breaking Changes")
    expect(result).toContain("- API changes")
    expect(result).toContain("- Configuration updates")
    expect(result).toContain("### Added")
    expect(result).toContain("- Major new features")
    expect(result).not.toContain("## 1.1.0")
  })

  test("parse version with capital Version prefix", () => {
    const result = parseCurrentChangelog(sampleChangelog, "Version 2.1.0")
    expect(result).toContain("### Added")
    expect(result).toContain("- Feature with capital Version prefix")
    expect(result).not.toContain("## version 2.0.0")
    expect(result).not.toContain("## ver 2.2.0")
  })

  test("parse version with ver prefix", () => {
    const result = parseCurrentChangelog(sampleChangelog, "ver 2.2.0")
    expect(result).toContain("### Added")
    expect(result).toContain("- Feature with ver prefix")
    expect(result).not.toContain("## Version 2.1.0")
    expect(result).not.toContain("## Ver 2.3.0")
  })

  test("parse version with capitalized ver prefix", () => {
    const result = parseCurrentChangelog(sampleChangelog, "Ver 2.3.0")
    expect(result).toContain("### Added")
    expect(result).toContain("- Feature with capital Ver prefix")
    expect(result).not.toContain("## ver 2.2.0")
  })

  test("handle case insensitive version matching", () => {
    const result = parseCurrentChangelog(sampleChangelog, "V1.0.0")
    expect(result).toContain("### Added")
    expect(result).toContain("- Initial release")
  })

  test("return trimmed content", () => {
    const result = parseCurrentChangelog(sampleChangelog, "1.1.0")
    expect(result).not.toMatch(/^\s+/)
    expect(result).not.toMatch(/\s+$/)
  })

  test("throw error when version not found", () => {
    expect(() => {
      parseCurrentChangelog(sampleChangelog, "3.0.0")
    }).toThrow("version 3.0.0 not found")
  })

  test("throw error when version has no content", () => {
    const emptyVersionChangelog = [
      "# Changelog",
      "",
      "## 1.0.0",
      "",
      "## 1.1.0",
      "### Added",
      "- Some content",
    ].join("\n")

    expect(() => {
      parseCurrentChangelog(emptyVersionChangelog, "1.0.0")
    }).toThrow("content not found for version 1.0.0")
  })

  test("handle version at the end of file", () => {
    const endChangelog = [
      "# Changelog",
      "",
      "## 1.0.0",
      "### Added",
      "- Feature A",
      "",
      "## 2.0.0",
      "### Added",
      "- Feature B",
    ].join("\n")

    const result = parseCurrentChangelog(endChangelog, "2.0.0")
    expect(result).toContain("### Added")
    expect(result).toContain("- Feature B")
    expect(result).not.toContain("## 1.0.0")
  })

  test("handle complex version formats", () => {
    const complexChangelog = [
      "# Changelog",
      "",
      "## v1.0.0-alpha.1",
      "### Added",
      "- Alpha features",
      "",
      "## version 1.0.0-beta.2",
      "### Added",
      "- Beta features",
      "",
      "## 1.0.0-rc.1",
      "### Added",
      "- Release candidate features",
      "",
      "## 1.0.0",
      "### Added",
      "- Final release",
    ].join("\n")

    const result = parseCurrentChangelog(complexChangelog, "1.0.0-rc.1")
    expect(result).toContain("### Added")
    expect(result).toContain("- Release candidate features")
    expect(result).not.toContain("## 1.0.0")
  })
})

describe("checkVersion", () => {
  beforeEach(() => {
    vi.mock("node:fs", () => ({
      readFileSync: vi.fn((path: string) => {
        return basename(path) === "package.json"
          ? JSON.stringify({ version: "0.0.0" })
          : readFileSync(path, "utf-8")
      }),
    }))
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test("without prefix", () => {
    const result = checkVersion("0.0.0")
    expect(result.isMatch).toBe(true)
    expect(result.packageVersion).toBe("0.0.0")
    expect(result.inputVersion).toBe("0.0.0")
  })

  test("with v prefix", () => {
    const result = checkVersion("v0.0.0")
    expect(result.isMatch).toBe(true)
    expect(result.packageVersion).toBe("0.0.0")
    expect(result.inputVersion).toBe("0.0.0")
  })

  test("version prefix", () => {
    const result = checkVersion("version 0.0.0")
    expect(result.isMatch).toBe(true)
    expect(result.packageVersion).toBe("0.0.0")
    expect(result.inputVersion).toBe("0.0.0")
  })

  test("ver prefix", () => {
    const result = checkVersion("ver 0.0.0")
    expect(result.isMatch).toBe(true)
    expect(result.packageVersion).toBe("0.0.0")
    expect(result.inputVersion).toBe("0.0.0")
  })

  test("check version mismatch", () => {
    const result = checkVersion("1.0.0")
    expect(result.isMatch).toBe(false)
    expect(result.packageVersion).toBe("0.0.0")
    expect(result.inputVersion).toBe("1.0.0")
  })

  test("capital prefix", () => {
    const result = checkVersion("Version 0.0.0")
    expect(result.isMatch).toBe(true)
    expect(result.packageVersion).toBe("0.0.0")
    expect(result.inputVersion).toBe("0.0.0")
  })
})
