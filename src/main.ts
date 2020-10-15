import core from '@actions/core';
import glob from '@actions/glob';
import fs from 'fs';
import handlebars from 'handlebars';
import { Data, DataWithOutputFile } from './types';
import { buildBaseData, buildFileData, applyTemplate, buildAndApplyTemplate } from './utils';

const run = async (): Promise<void> => {
  try {
    const config = {
      files: core.getInput('files'),
      outputFilename: core.getInput('output-filename'),
      deleteInputFile: core.getInput('delete-input-file'),
      dryRun: core.getInput('dry-run') === 'true',
    };

    core.debug(`Configuration:\n${JSON.stringify(config, undefined, 2)}`);

    const baseData = buildBaseData();

    const outputFilenameCompiledTemplate = handlebars.compile(config.outputFilename);

    const globber = await glob.create(config.files);

    for await (const inputFilename of globber.globGenerator()) {
      const fileStats = await fs.promises.stat(inputFilename);

      if (!fileStats.isFile) {
        continue;
      }

      core.debug(`Reading input file "${inputFilename}"...`);

      const data: Data = {
        ...baseData,
        file: buildFileData(inputFilename),
        date: new Date(),
      };
      const outputFilename = applyTemplate(outputFilenameCompiledTemplate, data);

      const inputContent = await fs.promises.readFile(inputFilename, 'utf8');

      const dataWithOutputFile: DataWithOutputFile = {
        ...data,
        outputFile: buildFileData(outputFilename),
      };
      const outputContent = buildAndApplyTemplate(inputContent, dataWithOutputFile);

      if (config.deleteInputFile) {
        core.debug(`Deleting input file...`);

        if (!config.dryRun) {
          await fs.promises.unlink(inputFilename);
        }
      }

      core.debug(`Writing output file "${outputFilename}"...`);

      if (!config.dryRun) {
        await fs.promises.writeFile(outputFilename, outputContent);
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
