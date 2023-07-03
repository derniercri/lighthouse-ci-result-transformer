const core = require('@actions/core');
const github = require('@actions/github');
const {
  get,
  split,
  find,
} = require('lodash');
const { githubCommentBody } = require('./helpers');

const githubCommentHandler = async () => {
  const { context } = github;
  const githubToken = core.getInput('githubToken');
  const octokit = github.getOctokit(githubToken);
  const pullRequestId = get(context, 'payload.pull_request.number');
  const [owner, repo] = split(core.getInput('repository'), '/');

  if (!pullRequestId) {
    return core.warning('githubComment can only enabled on pull requests. Skipping');
  }

  const comments = await octokit.paginate(octokit.rest.issues.listComments, {
    owner,
    repo,
    issue_number: pullRequestId,
  });

  const commentId = `lighouse-report-${pullRequestId}`;

  const mutationFunction = find(comments, (comment) => comment.comment_id === commentId)
    ? octokit.rest.issues.updateComment
    : octokit.rest.issues.createComment;

  return mutationFunction({
    ...context.repo,
    issue_number: pullRequestId,
    comment_id: `lighouse-report-${pullRequestId}`,
    body: githubCommentBody(),
  });
};

module.exports = githubCommentHandler;
