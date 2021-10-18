# Serveless app [built with serverless-stack, AWS-SDK and AWS-CDK]

## Requirements

- Node 14.0+
- npm, npx


## Installing 

- clone the repo
- run 'npm install' to install dependancies
- run 'cp .env.example .env' 
- edit .env file with appropriate data


## Commands

### `npm run start`

Starts the local Lambda development environment.

### `npm run build`

Build your app and synthesize your stacks.

Generates a `.build/` directory with the compiled files and a `.build/cdk.out/` directory with the synthesized CloudFormation stacks.

### `npm run deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy, a specific stack.

### `npm run remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally removes, a specific stack.

### `npm run test`

Runs your tests using Jest. Takes all the [Jest CLI options](https://jestjs.io/docs/en/cli).

## `Webhooks`

To track event and ensure it from mailgun 'apiEndpoint+/mail-event'
