const fs = require('fs');
const core = require('@actions/core');
const { slackHandler } = require('./slack');

const loadResults = () => {
  const data = fs.readFileSync(core.getInput('resultsPath'), 'utf8');
  global.results = JSON.parse(data);
};

try {
  loadResults();

  const slackWebhookUrl = core.getInput('slackWebhookUrl');
  if (slackWebhookUrl) {
    slackHandler(slackWebhookUrl);
  }
} catch (error) {
  core.setFailed(error.message);
}
