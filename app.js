const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
//​
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// ​
const render = require("./lib/htmlRenderer");
// ​
// ​
const employeeCollection = [];
// // Write code to use inquirer to gather information about the development team members,
// // and to create objects for each team member (using the correct classes as blueprints!)

function role() {
  inquirer
    .prompt([
      {
        type: "rawlist",
        message: "Please select a role to describe a team member.",
        choices: ["Engineer", "Intern", "Manager"],
        name: "memberType",
      },
    ])
    .then(function (response) {
      if (response.memberType === "Engineer") {
        engineerInquirer();
      } else if (response.memberType === "Intern") {
        internInquirer();
      } else {
        managerInquirer();
      }
    });
}

function engineerInquirer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the employee's ID?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the employee's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the employee's GitHub username?",
        name: "githubUser",
      },
    ])
    .then(function (response) {
      const newEngineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.githubUser
      );
      employeeCollection.push(newEngineer);
      inquirer
        .prompt([
          {
            type: "rawlist",
            message: "Do you have other members on your team?",
            choices: ["yes", "no"],
            name: "yesOrNo",
          },
        ])
        .then(function (response) {
          if (response.yesOrNo === "yes") {
            role();
          }else{
            fs.writeFile(outputPath, render(employeeCollection), function(err){
                if (err) throw err;
            });
          };
        });
    });
}
function internInquirer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the employee's ID?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the employee's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the employee's school?",
        name: "school",
      },
    ])
    .then(function (response) {
      const newIntern = new Intern(
        response.name,
        response.id,
        response.email,
        response.school
      );
      employeeCollection.push(newIntern);
      inquirer
        .prompt([
          {
            type: "rawlist",
            message: "Do you have other members on your team?",
            choices: ["yes", "no"],
            name: "yesOrNo",
          },
        ])
        .then(function (response) {
          if (response.yesOrNo === "yes") {
            role();
          } else{
            fs.writeFile(outputPath, render(employeeCollection), function(err){
                if (err) throw err;
            });
          };
        });
    });
}
function managerInquirer() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the employee's ID?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the employee's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the employee's office number?",
        name: "officeNumber",
      },
    ])
    .then(function (response) {
      const newManager = new Manager(
        response.name,
        response.id,
        response.email,
        response.officeNumber
      );
      employeeCollection.push(newManager);
      inquirer
        .prompt([
          {
            type: "rawlist",
            message: "Do you have other members on your team?",
            choices: ["yes", "no"],
            name: "yesOrNo",
          },
        ])
        .then(function (response) {
          if (response.yesOrNo === "yes") {
            role();
          } else{
              fs.writeFile(outputPath, render(employeeCollection), function(err){
                  if (err) throw err;
              });
          };
        });
    });
}

role();
// // After the user has input all employees desired, call the `render` function (required
// // above) and pass in an array containing all employee objects; the `render` function will
// // generate and return a block of HTML including templated divs for each employee!
// ​
// // After you have your html, you're now ready to create an HTML file using the HTML
// // returned from the `render` function. Now write it to a file named `team.html` in the
// // `output` folder. You can use the variable `outputPath` above target this location.
// // Hint: you may need to check if the `output` folder exists and create it if it
// // does not.
// ​
// // HINT: each employee type (manager, engineer, or intern) has slightly different
// // information; write your code to ask different questions via inquirer depending on
// // employee type.
// ​
// // HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// // and Intern classes should all extend from a class named Employee; see the directions
// // for further information. Be sure to test out each class and verify it generates an
// // object with the correct structure and methods. This structure will be crucial in order
// // for the provided `render` function to work!```
