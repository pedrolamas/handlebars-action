# @pedrolamas/handlebars-action

![Project Maintenance](https://img.shields.io/maintenance/yes/2020.svg)
[![License](https://img.shields.io/github/license/PedroLamas/handlebars-action.svg)](https://github.com/PedroLamas/handlebars-action/blob/master/LICENSE)

![CI](https://github.com/PedroLamas/handlebars-action/workflows/CI/badge.svg)

[![Twitter Follow](https://img.shields.io/twitter/follow/pedrolamas?style=social)](https://twitter.com/pedrolamas)

This action will find files in the repo matching a specific search spec and process them as [Handlebars](https://handlebarsjs.com) templates.

The full expression syntax of Handlebars can be used on the templates.

## Usage

```yaml
- uses: @pedrolamas/handlebars-action
  with:
    # Files to process
    # Default: '**/*.template'
    files: '**/*.template'

    # Output filename template
    # Default: '{{ file.dir }}/{{ file.name }}'
    output-filename: '{{ file.dir }}/{{ file.name }}'

    # Remove the input file
    # Default: false
    delete-input-file: true

    # Makes no real changes
    # default: false
    dry-run: false
```

## Available tags

### Environment variables

- `{{ env.[name] }}` - The value of the environment variable called `[name]`. For example, `{{ env.GITHUB_REPOSITORY }}` will return the value of the `$GITHUB_REPOSITORY` environment variable.

### Input file

- `{{ file.path }}` - The full path of the input file used as template.
- `{{ file.root }}` - The root of the input file path such as '/' or 'c:\'.
- `{{ file.dir }}` - The full directory path of the input file such as '/home/user/dir' or 'c:\path\dir'.
- `{{ file.base }}` - The input file name including extension (if any) such as 'index.html'.
- `{{ file.ext }}` - The input file extension (if any) such as '.html'.
- `{{ file.name }}` - The input file name without extension (if any) such as 'index'.

### Output file

- `{{ outputFile.path }}` - The full path of the output file used as template.
- `{{ outputFile.root }}` - The root of the output file path such as '/' or 'c:\'.
- `{{ outputFile.dir }}` - The full directory path of the output file such as '/home/user/dir' or 'c:\path\dir'.
- `{{ outputFile.base }}` - The output file name including extension (if any) such as 'index.html'.
- `{{ outputFile.ext }}` - The output file extension (if any) such as '.html'.
- `{{ outputFile.name }}` - The output file name without extension (if any) such as 'index'.

### GitHub context

- `{{ github.action }}` - The unique identifier (id) of the action.
- `{{ github.actor }}` - The name of the person or app that initiated the workflow. For example, octocat.
- `{{ github.api_url }}` - Returns the API URL. For example: https://api.github.com.
- `{{ github.base_ref }}` - Only set for forked repositories. The branch of the base repository.
- `{{ github.event_name }}` - The name of the webhook event that triggered the workflow.
- `{{ github.event_path }}` - The path of the file with the complete webhook event payload. For example, /github/workflow/event.json.
- `{{ github.graphql_url }}` - Returns the GraphQL API URL. For example: https://api.github.com/graphql.
- `{{ github.head_ref }}` - Only set for forked repositories. The branch of the head repository.
- `{{ github.ref }}` - The branch or tag ref that triggered the workflow. For example, refs/heads/feature-branch-1. If neither a branch or tag is available for the event type, the variable will not exist.
- `{{ github.repository }}` - The owner and repository name. For example, octocat/Hello-World.
- `{{ github.run_id }}` - A unique number for each run within a repository. This number does not change if you re-run the workflow run.
- `{{ github.run_number }}` - A unique number for each run of a particular workflow in a repository. This number begins at 1 for the workflow's first run, and increments with each new run. This number does not change if you re-run the workflow run.
- `{{ github.server_url }}` - Returns the URL of the GitHub server. For example: https://github.com.
- `{{ github.sha }}` - The commit SHA that triggered the workflow. For example, ffac537e6cbbf934b08745a378932722df287a53.
- `{{ github.workflow }}` - The name of the workflow.
- `{{ github.workspace }}` - The GitHub workspace directory path. The workspace directory is a copy of your repository if your workflow uses the actions/checkout action. If you don't use the actions/checkout action, the directory will be empty. For example, /home/runner/work/my-repo-name/my-repo-name.

### Misc

- `{{ date }}` - The output of `new Date()`.

## License

MIT
