#!/usr/bin/env node

// Use fs to write files to system
const fs = require("fs");

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
 * @param {string} q Question to ask
 * @returns {string} String value of the user's response
 */
function question(q) {
  return new Promise(resolve => rl.question(q, answer => resolve(answer)));
}

/**
 * Synchronously creates a new directory at the current PWD
 * @param {string} pathName Name of path to create directory at
 */
function createDirectory(pathName) {
  fs.mkdirSync(`./${pathName}`);
}

/**
 * Creates a skill.json file in the directory, with the name of the skill as
 * input by the user
 * @param {string} skillName Name of skill as input by user
 * @param {string} pathName Name of path to create skill.json under
 * @param {[string]} locales List of locales to add to skill manifest
 */
function generateSkillManifest(skillName, pathName, locales = ["en-US"]) {
  // Read data from skill.json template
  let data = fs.readFileSync("skill.json", "utf-8");
  // Replace data with user values
  data = data
    .replace(/\[skillName\]/g, skillName)
    .replace(/\[lambdaName\]/g, `${pathName}-lambda`);
  // Write new file in directory
  fs.writeFile(`${pathName}/skill.json`, data, () => {});
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
  // Create path name from user input
  pathName = skillName.toLowerCase().replace(/ /g, "-");
  createDirectory(pathName);
  generateSkillManifest(skillName, pathName);

  // TODO: Add language options
  //   const language = await question("Language: (en-US) ")

  // TODO: Add category options
  const category = await question("Skill category: (KNOWLEDGE_AND_TRIVIA)")

  // Get intent names
  //   let intents = await question(
  //     "Enter a comma seperated list of custom intent names: "
  //   );
  //   intents = intents.split(",").map(intent => intent.trim());
  //   generateCustomIntents(intents);
  rl.close();
}
