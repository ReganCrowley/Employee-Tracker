INSERT INTO department (id, name)
VALUES (001, "marketing"),
       (002, "engineering"),
       (003, "design");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "junior marketing consultant", 50000, 001),
       (002, "senior marketing consultant", 100000, 001),
       (003, "front end developer", 50000, 002);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "joe", "bloggs", 002, NULL),
       (002, "new", "guy", 001, 001),
       (003, "foo", "mcbar", 003, NULL);