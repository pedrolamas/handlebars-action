import path from 'path';

type Config = {
  files: string;
  dryRun: boolean;
  outputFilename: string;
};

type FileData = path.ParsedPath | { path: string };

type BaseData = {
  env: Record<string, string | undefined>;
  github: {
    action?: string;
    actor?: string;
    api_url?: string;
    base_ref?: string;
    event_name?: string;
    event_path?: string;
    graphql_url?: string;
    head_ref?: string;
    ref?: string;
    repository?: string;
    run_id?: string;
    run_number?: string;
    server_url?: string;
    sha?: string;
    workflow?: string;
    workspace?: string;
  };
};

type Data = BaseData & {
  file: FileData;
  date: Date;
};

type DataWithOutputFile = Data & {
  outputFile: FileData;
};
