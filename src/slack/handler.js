import { slackWebhookPayload } from './helpers';

const slackHandler = (slackWebhookUrl) => {
  fetch(slackWebhookUrl, {
    method: 'POST',
    body: JSON.stringify(slackWebhookPayload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default slackHandler;
