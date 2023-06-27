const fs = require('fs');
const core = require('@actions/core');
const { split, last, head } = require('lodash');
const slackHandler = require('./slack');

const readManifest = (directory) => {
  const manifestPath = `${directory}/manifest.json`;
  const data = fs.readFileSync(manifestPath, 'utf8');
  return head(JSON.parse(data));
};

const loadResults = () => {
  const directory = core.getInput('resultsPath');
  const manifest = readManifest(directory);
  const jsonFileName = last(split(manifest.jsonPath, '/'));
  const data = fs.readFileSync(`${directory}/${jsonFileName}`, 'utf8');

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
