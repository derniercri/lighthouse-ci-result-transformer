const axios = require('axios');
const { slackWebhookPayload } = require('./helpers');

const slackHandler = (slackWebhookUrl) => {
  axios.post(slackWebhookUrl, slackWebhookPayload());
};

module.exports = slackHandler;
