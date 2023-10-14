const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function createTables() {
    try {
        const client = await pool.connect();

        const ManagerTable = `CREATE TABLE IF NOT EXISTS manager (
                    manager_id VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
                    empname VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE, 
                    designation VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL
                    );
                `;
        const EmployeeTable = ` CREATE TABLE IF NOT EXISTS employee(
                    emp_id VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
                    empname VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE, 
                    designation VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    manager_id VARCHAR(255),
                    FOREIGN KEY (manager_id) REFERENCES "manager"(manager_id)
                );
            `;

        const ProjectsTable = `CREATE TABLE IF NOT EXISTS projects(
                    project_id VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
                    project_name VARCHAR(255) NOT NULL,
                    descriptions VARCHAR(255) NOT NULL,
                    start_date DATE NOT NULL,
                    end_date DATE NOT NULL,
                    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    projects_status VARCHAR(255) CHECK (projects_status IN ('open', 'closed')),
                    manager_id VARCHAR(255),
                    FOREIGN KEY (manager_id) REFERENCES "manager"(manager_id)
                );
            `;

        const TasksTable = `CREATE TABLE IF NOT EXISTS tasks(
                    task_id VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
                    task_name VARCHAR(255) NOT NULL,
                    descriptions VARCHAR(255) NOT NULL,
                    comments VARCHAR(255) NOT NULL,
                    start_date DATE NOT NULL,
                    end_date DATE NOT NULL,
                    completed INT DEFAULT 0,
                    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    task_status VARCHAR(255) CHECK (task_status IN ('open', 'in_progress','closed')),
                    project_id VARCHAR(255),
                    FOREIGN KEY (project_id) REFERENCES "projects"(project_id),
                    manager_id VARCHAR(255),
                    FOREIGN KEY (manager_id) REFERENCES "manager"(manager_id),
                    emp_id VARCHAR(255),
                    FOREIGN KEY (emp_id) REFERENCES "employee"(emp_id)
                );
                `;

        const CommentsTable = `CREATE TABLE IF NOT EXISTS empcomments(
                    id serial PRIMARY KEY,
                    emp_id VARCHAR(255),
                    FOREIGN KEY (emp_id) REFERENCES "employee"(emp_id),
                    project_id VARCHAR(255),
                    FOREIGN KEY (project_id) REFERENCES "projects"(project_id),
                    task_id VARCHAR(255),
                    FOREIGN KEY (task_id) REFERENCES "tasks"(task_id),
                    manager_id VARCHAR(255),
                    FOREIGN KEY (manager_id) REFERENCES "manager"(manager_id),
                    comments VARCHAR(255) NOT NULL,
                    response VARCHAR(255) DEFAULT NULL,
                    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `;

        await client.query(ManagerTable);
        await client.query(EmployeeTable);
        await client.query(ProjectsTable);
        await client.query(TasksTable);
        await client.query(CommentsTable);
        client.release();
        console.log('Table created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        pool.end();
    }
}






module.exports = createTables;
