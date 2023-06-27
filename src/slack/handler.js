const { slackWebhookPayload } = require('./helpers');

const slackHandler = (slackWebhookUrl) => {
  fetch(slackWebhookUrl, {
    method: 'POST',
    body: JSON.stringify(slackWebhookPayload()),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

module.exports = slackHandler;
