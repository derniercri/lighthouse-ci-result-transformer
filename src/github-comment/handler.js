const core = require('@actions/core');
const github = require('@actions/github');
const { get } = require('lodash');
const { githubCommentBody } = require('./helpers');

const githubCommentHandler = () => {
  const { context } = github;
  const githubToken = core.getInput('GITHUB_TOKEN');
  const octokit = github.getOctokit(githubToken);
  const pullRequestId = get(context, 'payload.pull_request.number');

  if (!pullRequestId) {
    return core.warning('githubComment can only enabled on pull requests. Skipping');
  }

  return octokit.rest.issues.updateComment({
    ...context.repo,
    issue_number: pullRequestId,
    comment_id: `lighouse-report-${pullRequestId}`,
    body: githubCommentBody(),
  });
};

module.exports = githubCommentHandler;
