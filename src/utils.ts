import path from 'path'
import handlebars from 'handlebars'

export type Config = {
  files: string
  dryRun: boolean
  outputFilename: string
}

export type FileData = path.ParsedPath | {path: string}

export type BaseData = {
  env: Record<string, string | undefined>
}

export type Data = BaseData & {
  file: FileData
  date: Date
}

export type DataWithOutputFile = Data & {
  outputFile: FileData
}

export const buildBaseData = (): BaseData => ({
  env: {...process.env}
})

export const buildFileData = (filename: string): FileData => ({
  ...path.parse(filename),
  path: filename
})

export const applyTemplate = (
  template: handlebars.TemplateDelegate,
  data: Data
): string => template(data)

export const buildAndApplyTemplate = (template: string, data: Data): string => {
  const compiledTemplate = handlebars.compile(template)

  return applyTemplate(compiledTemplate, data)
}
