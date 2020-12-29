const inquirer = require("inquirer");
var connection = require("./connection.js");
var query;

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
        viewAllbyDept();
        break;
      case "View All Employees by Manager":
        viewAllbyMgr();
        break;
      case "Add Employee":
        addEmp();
        break;
      case "Remove Employee":
        removeEmp();
        break;
      case "Update Employee Role":
        updateEmpRole();
        break;
      case "Update Employee Manager":
        updateEmpMgr();
        break;
    }
  });
};

function viewAll(){
    query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, CONCAT(mgr.first_name, ' ' ,mgr.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee mgr on employee.manager_id = mgr.id ORDER by employee.id ASC"
    renderResults();
};

function viewAllbyDept(){
    console.log("Under construction");
    mainMenu();
};

function viewAllbyMgr(){
    console.log("Under construction");
    mainMenu();
};

function addEmp(){
    console.log("Under construction");
    mainMenu();
};

function removeEmp(){
    console.log("Under construction");
    mainMenu();
};

function updateEmpRole(){
    console.log("Under construction");
    mainMenu();
};

function updateEmpMgr(){
    console.log("Under construction");
    mainMenu();
};

function renderResults(){
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res)
        mainMenu();
    })
};