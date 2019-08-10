#!/usr/bin/env node
// Initialise readline to get user input
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get any provided args
const [, , ...args] = process.argv;

// TODO: Use tag values if provided
// if (args.length > 0) {
//   console.log(`Started without asking questions ${args}`);
//   rl.close();
// } else {
//   main();
// }

main();

/**
 * Ask a question and resolve the answer via a promise
 * @param {*} q Question to ask
 */
function question(q) {
  return new Promise(resolve => rl.question(q, answer => resolve(answer)));
}

function generateSkillManifest(skillName, languages = ["en-US"]) {
  console.log(skillName, languages);
}

function generateCustomIntents(intents) {
    console.log(intents);
}

/**
 * Asks a series of questions, and uses the answers to generate the boilerplate
 */
async function main() {
  // TODO: Regex check to enforce name
  const skillName = await question("What do you want to call your new skill? ");
  generateSkillManifest(skillName);

  // TODO: Add language options
  //   const language = await question("Language: (en-US) ")

  // Get intent names
  let intents = await question(
    "Enter a comma seperated list of custom intent names: "
  );
  intents = intents.split(",").map(intent => intent.trim());
  generateCustomIntents(intents);
  rl.close();
}
