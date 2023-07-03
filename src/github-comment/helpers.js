const { mapKeys, join } = require('lodash');

const formattedGithubCommentResults = () => join(mapKeys(global.results.categories, (key) => {
  const item = global.results.categories[key];
  const score = (item.score * 100).toFixed(0);

  return `| ${item.title} | ${score} | ${score >= 80 ? '✅' : '❌'} |`;
}), '\n');

const githubCommentBody = () => `
Your Lighthouse report is ready ! :tada:

| Category | Score | Valid |
|--------|--------|--------|
${formattedGithubCommentResults()}
`;

module.exports = {
  githubCommentBody,
};
