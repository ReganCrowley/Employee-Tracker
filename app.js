const inquirer = require('inquirer');

const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'grandmaster@1',
        database: 'employee_db'
    },
);

const main = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What do you want to do?',
                name: 'option',
                choices: [
                    "view all departments",
                    "view all roles",
                    "view all employees",
                    "add a department",
                    "add a role",
                    "add an employee",
                    "update an employee role"
                ]
            }
        ])
        .then((response) => {
            console.log("You have chosen " + response.option)

            if (response.option === "view all departments") {
                viewAllDepartments()
            }
            if (response.option === "view all roles") {
                viewAllRoles()
            }
            if (response.option === "view all employees") {
                viewAllEmployees()
            }
            if (response.option === "add a department") {
                addADepartment()
            }
            if (response.option === "add a role") {
                addARole()
            }
            if (response.option === "add an employee") {
                addAnEmployee()
            }
            if (response.option === "update an employee role") {
                updateAnEmployee()
            }
        }
        );
}

const viewAllDepartments = () => {
    // TO DO add sql code to get departments and display them
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        main()
    });
}

const viewAllRoles = () => {
    // TO DO add sql code to get roles and display them
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        main()
    });

}

const viewAllEmployees = () => {
    // TO DO add sql code to get employees and display them
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        main()
    });
}

const addADepartment = () => {
    // TO DO add inquirer code to ask about department details
    // and sql code to insert the department
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the department name?',
                name: 'department_name'
            }
        ]).then(response => {

            db.query('INSERT INTO department (name) VALUES (?)',
                [response.department_name],
                function (err, results) {
                    if (err) {
                        console.error(err)
                    }

                    console.table("Department added!");
                    main()
                }
            );
        })
}

const addARole = () => {
    // TO DO add inquirer code to ask about role details
    // and sql code to insert the role

    db.query('SELECT * FROM department', function (err, results) {
        if (results.length <= 0) {
            console.log("Add a department first!")
            return main();
        }

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the title of the role?',
                    name: 'title'
                },
                {
                    type: 'input',
                    message: 'what is the salary?',
                    name: 'salary'
                },
                {
                    type: 'list',
                    message: 'What is the department',
                    choices: results.map(department => {
                        return {
                            name: department.name,
                            value: department.id

                        }
                    }),
                    name: 'department_id'
                }
            ]).then(response => {
                db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
                    [response.title, response.salary, response.department_id],
                    function (err, results) {
                        if (err) {
                            console.error(err)
                        }

                        console.table("role added!");
                        main()
                    }
                );

            })
    });


}

const addAnEmployee = () => {
    // TO DO add inquirer code to ask about employee details
    // and sql code to insert the employee
    main()
}

const updateAnEmployee = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        if (results.length <= 0) {
            console.log("Add an employee first!")
            return main();
        }

        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Who is the employee to update?',
                    choices: results.map(employee => {
                        return {
                            name: employee.first_name + " " + employee.last_name,
                            value: employee.id

                            
                        }
                        
                    }),
                    
                    name: 'employee_id'
                }
                
            ]).then(response => {
               
                // db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
                //     [response.title, response.salary, response.department_id],
                //     function (err, results) {
                //         if (err) {
                //             console.error(err)
                //         }

                //         console.table("role added!");
                //         main()
                //     }
                // );

            })
    });
   // main()
}

main()