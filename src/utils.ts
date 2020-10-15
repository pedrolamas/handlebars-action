import path from 'path';
import handlebars from 'handlebars';
import { BaseData, Data, FileData } from './types';

export const buildBaseData = (): BaseData => ({
  env: { ...process.env },
});

export const buildFileData = (filename: string): FileData => ({
  ...path.parse(filename),
  path: filename,
});

export const applyTemplate = (template: handlebars.TemplateDelegate, data: Data): string => template(data);

export const buildAndApplyTemplate = (template: string, data: Data): string => {
  const compiledTemplate = handlebars.compile(template);

  return applyTemplate(compiledTemplate, data);
};
