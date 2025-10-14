import { Command } from "commander"
import { consola } from "consola"
import { writeFileSync } from "node:fs"
import parseChangelog, { checkVersion } from "."

const program = new Command()

program
  .name("current-changelog")
  .description("Parse changelog content for specific version.")
  .option("-f, --file <path>", "Changelog file path (default: CHANGELOG.md)")
  .option("-v, --version <version>", "Version (default: from package.json)")
  .option("-w, --workdir <path>", "Workdir (default: current directory)")
  .option("-o, --output <path>", "Output file path (default: stdout)")
  .action(async (options) => {
    const result = parseChangelog({
      version: options.version,
      file: options.file,
      workdir: options.workdir,
    })

    if (options.output) {
      writeFileSync(options.output, result)
      consola.success(`current changelog output into ${options.output}`)
    } else {
      consola.log(result)
    }
  })

program
  .command("check")
  .description("Check whether the version matches the version in package.json")
  .argument("<version>", "version to check")
  .option("-w, --workdir <path>", "Workdir (default: current directory)")
  .action((version, options) => {
    const result = checkVersion(version, options.workdir)
    if (result.isMatch) {
      consola.success(`package.json version matched: ${version}`)
    } else {
      consola.error(`version ${version} not match (${result.packageVersion})`)
      process.exit(1)
    }
  })

program.parse()
