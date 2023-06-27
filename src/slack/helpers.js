const formattedSlackResults = () => Object.keys(global.results.categories).map((key) => {
  const item = global.results.categories[key];

  return {
    type: 'mrkdwn',
    text: `*${item.title}*\n${(item.score * 100).toFixed(0)}`,
  };
});

const slackWebhookPayload = () => ({
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Your Lighthouse Report is ready.',
      },
    },
    {
      type: 'section',
      fields: formattedSlackResults(),
    },
  ],
});

module.exports = {
  slackWebhookPayload,
};
