const inquirer = require("inquirer");
require('dotenv').config()
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASS,
    database: 'employeetracker',
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

function starterQ() {
    var questions = [{
        type: 'list',
        name: 'commandType',
        message: "W would you like to do ? ",
        choices: ['View Departments', 'View Roles', 'View Emloyees', 'Add Departments', 'Add Roles', 'Add Employees', 'Update Employee']
    },];


    inquirer.prompt(questions).then(function (answers) {
        console.log('these are our answers in the .then!!', answers);

        if (answers.commandType === 'View Departments') {
            ViewDepartments()
            // internQuestions()
        } else if (answers.commandType === 'View Roles') {
            ViewRoles();
            //ManagerQuestions()
        } else if (answers.commandType === "View Emloyees") {
            ViewEmployee();
            //EngineerQuestions();
        }
        else if (answers.commandType === "Add Departments") {
            addDepartment()
        }
        else if (answers.commandType === "Add Roles") {
            addRole()
        } else if (answers.commandType === "Add Employees") {
            addEmployee()
        }
        else if (answers.commandType === "Update Employee") {
            updateEmployee()
        }

    });
}
starterQ()

function addDepartment() {
    var questions = [{
        type: 'input',
        name: 'departmentsName',
        message: "Whats the name of departments that you want to add?",

    },];
    inquirer.prompt(questions).then(function (answers) {
        console.log("answer", answers)

        var query = "INSERT INTO departments (name) VALUES (?)"

        connection.query(query, [answers.departmentsName], function (error, results) {
            if (error) throw error;
            console.log('The result from DB!!  ', results);
        });
        // save to DB!!! sql time
    })
}

function addRole() {
    var query = "SELECT * FROM departments";

    connection.query(query, function (error, results) {
        if (error) throw error;
        console.table(results);
        var deptNames = []
        for (let i = 0; i < results.length; i++) {

            console.log(results[i].name);
            deptNames.push(results[i].name);

        }
        console.log(deptNames);

        var questions = [
            {
                type: 'input',
                name: 'roleTitle',
                message: "Wats the name of title that you want to add?",
            },
            {
                type: 'input',
                name: 'salary',
                message: "Whats the salary that you want to add?",
            },
            {
                type: 'list',
                name: 'dept',
                message: "Which Dept does it belong to ? ",
                choices: deptNames
            },


        ];

        inquirer.prompt(questions).then(function (answers) {
            console.log("answer", answers)
            var deptId;

            for (var i = 0; i < results.length; i++) {
                if (results[i].name === answers.dept) {
                    deptId = results[i].id
                }
            }
            console.log('this is our dept id!!!', deptId)

            var comand = "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)"

            connection.query(comand, [answers.roleTitle, answers.salary, deptId], function (error, results) {
                if (error) throw error;
                console.log('The result from DB!!  ', results);
            });
            //save to DB!!! sql time
        })

    });


    // 

}

function addEmployee() {
    var query = "SELECT * FROM roles";
    connection.query(query, function (error, results) {
        if (error) throw error;
        console.table(results);
        var roleTitle = []
        for (let i = 0; i < results.length; i++) {

            console.log(results[i].name);
            roleTitle.push(results[i].title);

        }

        var questions = [
            {
                type: 'input',
                name: 'firstName',
                message: "Wats the  first name of employee that you want to add?",
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Whats the last name  that you want to add?",
            },
            {
                type: 'list',
                name: 'role',
                message: "Which role does it belong to ? ",
                choices: roleTitle
            },





        ];


        inquirer.prompt(questions).then(function (answers) {
            console.log("answer", answers)
            var roleId;

            for (var i = 0; i < results.length; i++) {
                if (results[i].title === answers.role) {
                    roleId = results[i].id
                }
            }
            console.log('this is our role id!!!', roleId)

            var comand = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)"

            connection.query(comand, [answers.firstName, answers.lastName, roleId], function (error, results) {
                if (error) throw error;
                console.log('The result from DB!!  ', results);
            });
            //save to DB!!! sql time
        })





    })

}

function updateEmployee() {
    // select * to get all the roles
    // select * to get all the employess
    // ask inquirere q's
    //do Update sql comand connection.query()

    var query = "SELECT * FROM roles";
    connection.query(query, function (error, roleResults) {
        var query = "SELECT * FROM employee";
        connection.query(query, function (error, employeeResults) {
            console.log('this is roles', roleResults, 'this is employees', employeeResults)

        })
    })
}

function ViewDepartments() {
    var query = "SELECT * FROM departments";

    connection.query(query, function (error, results) {
        if (error) throw error;
        console.table(results);
    });

}

function ViewRoles() {
    var query = "SELECT * FROM roles";

    connection.query(query, function (error, results) {
        if (error) throw error;
        console.table(results);
    });

}

function ViewEmployee() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (error, results) {
        if (error) throw error;
        console.table(results);
    });
}