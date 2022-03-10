import path from 'path';

type Config = {
  files: string;
  outputFilename: string;
  deleteInputFile: boolean;
  htmlEscape: boolean;
  dryRun: boolean;
};

type FileData = path.ParsedPath | { path: string };

type BaseData = {
  env: Record<string, string | undefined>;
  github: {
    action?: string;
    action_path?: string;
    action_repository?: string;
    actor?: string;
    api_url?: string;
    base_ref?: string;
    env?: string;
    event_name?: string;
    event_path?: string;
    graphql_url?: string;
    head_ref?: string;
    job?: string;
    path?: string;
    ref?: string;
    ref_name?: string;
    ref_protected?: string;
    ref_type?: string;
    repository?: string;
    repository_name?: string;
    repository_owner?: string;
    retention_days?: string;
    run_attempt?: string;
    run_id?: string;
    run_number?: string;
    server_url?: string;
    sha?: string;
    workflow?: string;
    workspace?: string;
    runner_arch?: string;
    runner_name?: string;
    runner_os?: string;
    runner_temp?: string;
    runner_tool_cache?: string;
  };
  date: {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    epochTime: number;
    timezoneOffset: number;
    dateString: string;
    timeString: string;
    fullString: string;
    utc: {
      year: number;
      month: number;
      day: number;
      hours: number;
      minutes: number;
      seconds: number;
      fullString: string;
    };
  };
};

type Data = BaseData & {
  file: FileData;
};

type DataWithOutputFile = Data & {
  outputFile: FileData;
};
