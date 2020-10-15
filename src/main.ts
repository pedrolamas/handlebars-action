import * as core from '@actions/core'
import * as glob from '@actions/glob'
import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'

const run = async (): Promise<void> => {
  try {
    const config = {
      files: core.getInput('files'),
      dryRun: core.getInput('dry-run') === 'true',
      outputFilename: core.getInput('output-filename')
    }

    core.debug(`Configuration:\n${JSON.stringify(config, undefined, 2)}`)

    const outputFilenameTemplate = handlebars.compile(config.outputFilename)

    const baseData = {
      env: {...process.env}
    }

    const globber = await glob.create(config.files)

    for await (const filename of globber.globGenerator()) {
      const fileStats = await fs.promises.stat(filename)

      if (!fileStats.isFile) {
        continue
      }

      core.debug(`Processing file "${filename}"...`)

      const fileContent = await fs.promises.readFile(filename)

      core.debug(`\tCreating template...`)

      const fileContentTemplate = handlebars.compile(fileContent)

      core.debug(`\tApplying template...`)

      const data = {
        ...baseData,
        file: {
          ...path.parse(filename),
          path: filename
          // ...stringPropertiesOnly(fileStats)
        },
        date: {
          now: new Date().toISOString()
        }
      }
      const newFilename = outputFilenameTemplate(data)

      const dataWithOutputFile = {
        ...data,
        outputFile: {
          ...path.parse(newFilename),
          path: newFilename
        }
      }
      const newFileContent = fileContentTemplate(dataWithOutputFile)

      core.debug(`\tSaving file "${newFilename}"...`)

      if (!config.dryRun) {
        await fs.promises.writeFile(newFilename, newFileContent)
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

// type ObjectOfStrings = {
//   [key: string]: string | undefined
// }

// const stringPropertiesOnly = (item: object): ObjectOfStrings => {
//   return Object.entries(item)
//     .filter(
//       ([, value]) => typeof value === 'string' || typeof value === 'number'
//     )
//     .reduce(
//       (res, [key, value]) => (res[key] = value.toString()),
//       {} as ObjectOfStrings
//     )
// }

run()
