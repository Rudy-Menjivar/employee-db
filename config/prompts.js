const inquirer = require("inquirer");
const { printTable } = require('console-table-printer');
var connection = require("./connection.js");
var query;
const queryAllRoles = `SELECT id, title FROM role`;
var empChoices = [];
var empByMgr = [];

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
        mgtList();
        setTimeout(viewAllbyMgr, 300);
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
    query = "SELECT employee.id AS ID, CONCAT(employee.first_name, ' ' ,employee.last_name) AS 'Employee Name', role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(mgr.first_name, ' ' ,mgr.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee mgr on employee.manager_id = mgr.id ORDER by employee.last_name ASC"
    renderResults();
};

function viewAllbyDept(){
    inquirer.prompt({
        name: "deptName",
        type: "list",
        message: "View Employees by Department:",
        choices: ["Engineering", "Finance", "Legal", "Management", "Sales"]
    })
    .then((answer) => { 
      switch (answer.deptName) {
        case "Engineering":
          renderDept(answer);
          break;
        case "Finance":
          renderDept(answer);
          break;
        case "Legal":
          renderDept(answer);
          break;
        case "Management":
          renderDept(answer);
          break;
        case "Sales":
          renderDept(answer);
          break;
      }
    })
}

// Returns employee data that match department that's selected with the use of placeholder value
function renderDept(answer) {
    connection.query("SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS 'Employee Name', role.title AS Title, department.name as Department, role.salary as Salary, CONCAT(mgr.first_name, ' ' ,mgr.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee mgr on employee.manager_id = mgr.id WHERE department.name = ?", [answer.deptName], function (err, res) {
        if (err) throw err;
        printTable(res)
        mainMenu();
    })
};

function mgtList() {
    empChoices.push(" -- Main Menu -- ");
    connection.query("SELECT id, first_name, last_name FROM employee WHERE role_id BETWEEN 6 AND 7", function (err, res) {
        res.forEach(function(arr) {
            const empResults = { id: arr.id, first_name: arr.first_name, last_name: arr.last_name }
            empByMgr.push(empResults)
            empChoices.push(`${arr.first_name} ${arr.last_name}`);
        })
      if (err) throw err;
    });
};

function viewAllbyMgr() {
    inquirer.prompt({
        name: "selection",
        type: "list",
        message: "View Employees by Manager:",
        choices: empChoices
    })
    .then((answers) => {
        var mgrId = getManagerID(answers.selection, empByMgr);
        query = `SELECT id AS ID, CONCAT(first_name, ' ', last_name) AS EMPLOYEE_NAME FROM employee WHERE manager_id=${mgrId};`;
        connection.query(query, function (err, res) {
            if (err) throw err;
            if (res.length === 0) {
                console.log("")
            }
            else {
                printTable(res);
            }
            mainMenu();
        });
    })
};

function getManagerID(selection, mgrName) {
    if (selection === " -- Main Menu -- ") {
        return mgrName.id = null;
    }
    else {
    var splitSelection = selection.split(" ");
        for (var i = 0; i < mgrName.length; i++) {
            if (mgrName[i].first_name === splitSelection[0] && mgrName[i].last_name === splitSelection[1]) {
                return mgrName[i].id;
            }
        }
    }
};

function addEmp() {
  mgtList()
  connection.query(queryAllRoles, (err, results) => {
    if (err) throw err;
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "whatRole",
        type: "list",
        message: "What is the employee's title?",
        choices: ["Lawyer", "Software Engineer", "Accountant", "Manager", "Salesperson"]
      },
      {
        name: "whatMgr",
        type: "list",
        message: "Who is the employee's manager?",
        choices: empChoices
      },
    ])
    .then(answers => {
      console.log('Answers:', answers); 
    })
  })
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
        printTable(res)
        mainMenu();
    })
};