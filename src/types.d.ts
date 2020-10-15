import path from 'path';

type Config = {
  files: string;
  dryRun: boolean;
  outputFilename: string;
};

type FileData = path.ParsedPath | { path: string };

type BaseData = {
  env: Record<string, string | undefined>;
};

type Data = BaseData & {
  file: FileData;
  date: Date;
};

type DataWithOutputFile = Data & {
  outputFile: FileData;
};
