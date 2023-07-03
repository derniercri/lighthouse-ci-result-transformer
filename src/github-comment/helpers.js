const formattedGithubCommentResults = () => Object.keys(global.results.categories).map((key) => {
  const item = global.results.categories[key];
  const score = (item.score * 100).toFixed(0);

  return `| ${item.title} | ${score} | ${score >= 80 ? '✅' : '❌'} |`;
});

const githubCommentBody = () => `
Your Lighthouse report is ready ! :tada:

| Category | Score | Valid |
|--------|--------|--------|
${formattedGithubCommentResults()}
`;

module.exports = {
  githubCommentBody,
};
