const inquirer = require("inquirer");
var connection = require("./connection.js");

mainMenu();

function mainMenu() {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
        "View All Employees",
        "View All Employees by Department",
        "View All Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager"
    ]
  })
  .then(function (answer) {
    switch (answer.action) {
      case "View All Employees":
        viewAll();
        break;
      case "View All Employees by Department":
        console.log("Under construction");
        break;
      case "View All Employees by Manager":
        console.log("Under construction");
        break;
      case "Add Employee":
        console.log("Under construction");
        break;
      case "Remove Employee":
        console.log("Under construction");
        break;
      case "Update Employee Role":
        console.log("Under construction");
        break;
      case "Update Employee Manager":
        console.log("Under construction");
        break;
    }
  });
};

function viewAll(){
    console.log("Under construction");
    mainMenu();
}