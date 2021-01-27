const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

// destination will be created or overwritten by default.
fs.copyFile('./changelog', '~/changelog', (err) => {
  if (err) throw err;
  console.log('File was copied to destination');
});

function exec(cmd, handler = function(error, stdout, stderr){console.log(stdout);if(error !== null){console.log(stderr)}})
{
    const childfork = require('child_process');
    return childfork.exec(cmd, handler);
}

try {
  const token = core.getInput('token');
  const outputFile = core.getInput('outputFile');
  const since = core.getInput('since');
  const complete = core.getInput('complete');
  const nextTag = core.getInput('nextTag');
  const filter = core.getInput('filter');
  const labels = core.getInput('labels');
  const includeUntagged = core.getInput('includeUntagged');
  
  console.log(`token ${token}`);
  console.log(`outputFile ${outputFile}`);
  console.log(`since ${since}`);
  console.log(`nextTag ${nextTag}`);
  console.log(`complete ${complete}`);
  console.log(`filter ${filter}`);
  console.log(`labels ${labels}`);
  console.log(`includeUntagged ${includeUntagged}`);
  
  const repository = github.context.payload.repository.full_name;

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  if (!repository) {
    core.setFailed("repository not found");
    return;
  }

  let command = `~/changelog generate --repository=${repository}`
  if (complete == 'true') {
    command += ' --type=complete'
  } else if (since) {
    command += ' --type=sinceTag'
    command += ` --tag=${since}`
  }
  if (nextTag) {
    command += ` --next-tag=${nextTag}`
  }
  if (token) {
    command += ` --token=${token}`
  }
  if (outputFile) {
    command += ` --output=${outputFile}`
  }
  if (filter) {
    command += ` --filter-reg-ex=${filter}`
  }
  if (labels) {
    command += ` --labels=${labels}`
  }
  if (includeUntagged) {
    command += ` --include-untagged=${includeUntagged}`
  }
  // always log to the console so we can set it as output
  command += ` --log-console=true`
  
  console.log(`command ${command}`);

  exec("echo $(pwd)");
  exec("ls");

  exec(command, function(error, stdout, stderr){
    core.setOutput("changelog", stdout);

    if(error !== null) {
      core.setFailed(stderr);
    }
  }
  );
} catch (error) {
  core.setFailed(error.message);
}