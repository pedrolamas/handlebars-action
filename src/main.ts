import * as core from '@actions/core'
import * as glob from '@actions/glob'
// import fs from 'fs/promises'
// import handlebars from 'handlebars'

const run = async (): Promise<void> => {
  try {
    const globber = await glob.create('**/*.template')

    for await (const file of globber.globGenerator()) {
      core.debug(`Process: ${file}`)

      // const fileContent = await fs.readFile(file)

      // const template = handlebars.compile(fileContent)

      // const data = {
      //   file: {
      //     name: file
      //   },
      //   env: {...process.env},
      //   data: null
      // }

      // const newFileContent = template(data)

      // fs.writeFile(file, newFileContent)
    }

    // core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
