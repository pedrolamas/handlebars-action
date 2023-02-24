import { BaseData, Data, FileData } from './types.d';
import handlebars from 'handlebars';
import path from 'path';

type HandlebarsCompileOptions = Parameters<typeof handlebars.compile> extends [input: unknown, options?: infer T] ? T : never;

export const buildBaseData = (): BaseData => {
  const date = new Date();

  return {
    env: { ...process.env },
    github: {
      action: process.env['GITHUB_ACTION'],
      action_path: process.env['GITHUB_ACTION_PATH'],
      action_repository: process.env['GITHUB_ACTION_REPOSITORY'],
      actor: process.env['GITHUB_ACTOR'],
      api_url: process.env['GITHUB_API_URL'],
      base_ref: process.env['GITHUB_BASE_REF'],
      env: process.env['GITHUB_ENV'],
      event_name: process.env['GITHUB_EVENT_NAME'],
      event_path: process.env['GITHUB_EVENT_PATH'],
      graphql_url: process.env['GITHUB_GRAPHQL_URL'],
      head_ref: process.env['GITHUB_HEAD_REF'],
      job: process.env['GITHUB_JOB'],
      path: process.env['GITHUB_PATH'],
      ref: process.env['GITHUB_REF'],
      ref_name: process.env['GITHUB_REF_NAME'],
      ref_protected: process.env['GITHUB_REF_PROTECTED'],
      ref_type: process.env['GITHUB_REF_TYPE'],
      repository: process.env['GITHUB_REPOSITORY'],
      repository_name: process.env['GITHUB_REPOSITORY']?.replace(/.*\//, ''),
      repository_owner: process.env['GITHUB_REPOSITORY_OWNER'],
      retention_days: process.env['GITHUB_RETENTION_DAYS'],
      run_attempt: process.env['GITHUB_RUN_ATTEMPT'],
      run_id: process.env['GITHUB_RUN_ID'],
      run_number: process.env['GITHUB_RUN_NUMBER'],
      server_url: process.env['GITHUB_SERVER_URL'],
      sha: process.env['GITHUB_SHA'],
      workflow: process.env['GITHUB_WORKFLOW'],
      workspace: process.env['GITHUB_WORKSPACE'],
      runner_arch: process.env['RUNNER_ARCH'],
      runner_name: process.env['RUNNER_NAME'],
      runner_os: process.env['RUNNER_OS'],
      runner_temp: process.env['RUNNER_TEMP'],
      runner_tool_cache: process.env['RUNNER_TOOL_CACHE'],
    },
    date: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      epochTime: date.getTime(),
      timezoneOffset: date.getTimezoneOffset(),
      dateString: date.toDateString(),
      timeString: date.toTimeString(),
      fullString: date.toString(),
      isoString: date.toISOString(),
      utc: {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds(),
        fullString: date.toUTCString(),
      },
    },
  };
};

export const buildFileData = (filename: string): FileData => ({
  ...path.parse(filename),
  path: filename,
});

export const buildTemplate = <T = Data>(template: string, options?: HandlebarsCompileOptions): handlebars.TemplateDelegate<T> => handlebars.compile<T>(template, options);
