# Lighthouse CI Result Transformer

## Motivation

Having a simple GitHub Actions that would handle the output of the [Lighthouse CI Action](https://github.com/treosh/lighthouse-ci-action).

## Current features

- Post to Slack

## Usage

```yaml
jobs:
  yourjob:
    steps:
      - name: Audit URLs using Lighthouse
        id: audit
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://example.com

      - name: Handle the audit output
        uses: derniercri/lighthouse-ci-result-transformer@latest
        with:
          resultsPath: ${{steps.audit.outputs.resultsPath}}
          slackWebhookUrl: ${{ github.secrets.SLACK_WEBHOOK_URL }} # Optional
```
