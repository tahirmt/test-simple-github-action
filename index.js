const core = require('@actions/core');
const github = require('@actions/github');

try {
  const token = core.getInput('token');
  const outputFile = core.getInput('outputFile');
  const since = core.getInput('since');
  const nextTag = core.getInput('nextTag');
  const filter = core.getInput('filter');
  const labels = core.getInput('labels');
  
  console.log(`token ${token}!`);
  console.log(`outputFile ${outputFile}!`);
  console.log(`since ${since}!`);
  console.log(`nextTag ${nextTag}!`);
  console.log(`filter ${filter}!`);
  console.log(`labels ${labels}!`);
  
  core.setOutput("changelog", "Something");
  
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}