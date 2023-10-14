const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Manager Register
router.post('/register/manager', async (req, res) => {
    const { emp_id, emp_name, email, designation, password } = req.body;
    const sql = `INSERT INTO manager(manager_id, empname,email, designation, password) VALUES($1, $2, $3, $4,$5)RETURNING *;`;
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [emp_id, emp_name, email, designation, password]);
        client.release();
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting Manager:', error);
        res.status(500).json({ error: 'Internal server error', error });
    }
});

// Employee Register
router.post('/register/employee', async (req, res) => {
    const { emp_id, emp_name, designation, email, manager_id, password, } = req.body;
    const sql = `INSERT INTO employee(emp_id, empname, designation,email,manager_id, password) VALUES($1, $2, $3, $4,$5,$6)RETURNING *;`;
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [emp_id, emp_name, designation, email, manager_id, password]);
        client.release();
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting Employee:', error);
        res.status(500).json({ error: 'Internal server error', error });
    }
});

// Manager Login
router.get('/managerlogin/:email/:password', async (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    const sql = 'SELECT * FROM manager WHERE email = $1;';

    try {
        const client = await pool.connect();
        const result = await client.query(sql, [email]);
        client.release();

        if (result.rows.length === 0) {
            res.status(401).json({ error: 'User not found' });
        } else {
            const manager = result.rows[0];
            if (manager.password === password) {
                res.status(200).json(manager);
            } else {
                res.status(401).json({ error: 'Incorrect password' });
            }
        }
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Employee Login
router.get('/emplogin/:email/:password', async (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    const sql = 'SELECT * FROM employee WHERE email = $1;';
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [email]);
        client.release();
        if (result.rows.length === 0) {
            res.status(401).json({ error: 'User not found' });
        } else {
            const employee = result.rows[0];
            if (employee.password === password) {
                res.status(200).json(employee);
            } else {
                res.status(401).json({ error: 'Incorrect password' });
            }
        }
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Add Projects
router.post('/projects', async (req, res) => {
    const { project_id, project_name, descriptions,
        start_date, end_date, projects_status, manager_id } = req.body;
    const sql = `INSERT INTO projects(project_id, project_name, descriptions,
        start_date,end_date,projects_status, manager_id)VALUES($1, $2, $3, $4, $5, $6,$7)RETURNING *;`;
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [project_id, project_name, descriptions,
            start_date, end_date, projects_status, manager_id]);
        client.release();
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting Projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add Tasks
router.post('/tasks', async (req, res) => {
    const { task_id, task_name, descriptions,
        comments, start_date, end_date, task_status, project_id, manager_id, emp_id } = req.body;
    console.log("________________")
    console.log(req.body);
    const sql = `INSERT INTO tasks(task_id, task_name, descriptions,comments,
        start_date,end_date,task_status,project_id,manager_id, emp_id)VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9,$10)RETURNING *;`;
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [task_id, task_name, descriptions, comments,
            start_date, end_date, task_status, project_id, manager_id, emp_id]);
        client.release();
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting Tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Projects
router.get('/getprojects/:manager_id', async (req, res) => {
    const manager_id = req.params.manager_id;
    const sql = `SELECT * FROM projects WHERE manager_id = $1;`;
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [manager_id]);
        client.release();
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching projects by user_id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Employees
router.get('/getemployees/:manager_id', async (req, res) => {
    const manager_id = req.params.manager_id;
    const sql = `SELECT * FROM employee WHERE manager_id = $1;`;
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [manager_id]);
        client.release();
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching employee by manager_id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Get Managers
router.get('/getmanagers/:manager_id', async (req, res) => {
    const manager_id = req.params.manager_id;
    const sql = `SELECT * FROM manager WHERE empid = $1;`;
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [manager_id]);
        console.log(result)
        client.release();
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching employee by manager_id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Tasks For Employee
router.get('/gettasks/:emp_id', async (req, res) => {
    const emp_id = req.params.emp_id;
    const sql = `SELECT t.*,p.project_name,m.empname AS manager_name FROM tasks t 
                INNER JOIN projects p ON t.project_id = p.project_id
                INNER JOIN manager m ON t.manager_id = m.manager_id
                WHERE t.emp_id = $1 AND t.task_status NOT IN ('closed');`
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [emp_id]);
        client.release();
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching Tasks by emp_id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Tasks For Manager
router.get('/gettasksadded/:manager_id', async (req, res) => {
    const manager_id = req.params.manager_id;
    const sql = `SELECT t.*,p.project_name FROM tasks t INNER JOIN projects p ON t.project_id = p.project_id 
    WHERE t.manager_id = $1`;

    try {
        const client = await pool.connect();
        const result = await client.query(sql, [manager_id]);
        client.release();
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching Tasks by emp_id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete Projects
router.delete('/deleteprojects/:project_id', async (req, res) => {
    const projectId = req.params.project_id;
    const sql = `DELETE FROM projects WHERE project_id = $1;`;
    try {
        const client = await pool.connect();
        await client.query(sql, [projectId]);
        client.release();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting project by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete Employee
router.delete('/deleteemployee/:employee_id', async (req, res) => {
    const employee_id = req.params.employee_id;
    const sql = `DELETE FROM employee WHERE emp_id = $1;`;
    try {
        const client = await pool.connect();
        await client.query(sql, [employee_id]);
        client.release();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting Employee by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete Tasks
router.delete('/deletetask/:task_id', async (req, res) => {
    const task_id = req.params.task_id;
    const sql = `DELETE FROM tasks WHERE task_id = $1;`;
    try {
        const client = await pool.connect();
        await client.query(sql, [task_id]);
        client.release();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting Task by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update Task Status
router.put('/updatetask/:task_id', async (req, res) => {
    const task_id = req.params.task_id;
    const { task_status, completed } = req.body;
    const sql = ` UPDATE tasks SET task_status = $1, completed = $2 WHERE task_id = $3`;
    try {
        const client = await pool.connect();
        await client.query(sql, [task_status, completed, task_id]);
        client.release();
        res.status(200).json({ message: `Task with ID ${task_id} updated successfully` });
    } catch (error) {
        console.error(`Error updating Task by ID ${task_id}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Checking For Manager Id Already present are not
router.get('/manager_id/:manager_id', async (req, res) => {
    const idToCheck = req.params.manager_id;
    const sql = 'SELECT COUNT(*) FROM manager WHERE manager_id = $1';
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [idToCheck]);
        client.release();
        const isAvailable = result.rows[0].count == 0;
        res.json({ isAvailable });
    } catch (error) {
        console.error(`Error checking ID availability: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Checking For Manager Email Already present are not
router.get('/manager_email/:email', async (req, res) => {
    const idToCheck = req.params.email;
    const sql = 'SELECT COUNT(*) FROM manager WHERE email = $1';
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [idToCheck]);
        client.release();
        const isEmailAvailable = result.rows[0].count == 0;
        res.json({ isEmailAvailable });
    } catch (error) {
        console.error(`Error checking Email availability: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Checking For Employee Id Already present are not
router.get('/employee_id/:emp_id', async (req, res) => {
    const idToCheck = req.params.emp_id;
    const sql = 'SELECT COUNT(*) FROM employee WHERE emp_id = $1';
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [idToCheck]);
        client.release();
        const isAvailable = result.rows[0].count == 0;
        res.json({ isAvailable });
    } catch (error) {
        console.error(`Error checking ID availability: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Checking For Emaployee Email Already present are not
router.get('/employee_email/:email', async (req, res) => {
    const idToCheck = req.params.email;
    const sql = 'SELECT COUNT(*) FROM employee WHERE email = $1';
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [idToCheck]);
        client.release();
        const isEmailAvailable = result.rows[0].count == 0;
        res.json({ isEmailAvailable });
    } catch (error) {
        console.error(`Error checking EMployee availability: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Checking For EMplpoyees Manager present are not
router.get('/emp_manager/:manager_id', async (req, res) => {
    const idToCheck = req.params.manager_id;
    const sql = 'SELECT COUNT(*) FROM manager WHERE manager_id = $1';
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [idToCheck]);
        client.release();
        const ManagerExcist = result.rows[0].count == 0;
        res.json({ ManagerExcist });
    } catch (error) {
        console.error(`Error checking EMployee availability: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Checking For Project Id Availabality
router.get('/project_id/:project_id', async (req, res) => {
    const idToCheck = req.params.project_id;
    const sql = 'SELECT COUNT(*) FROM projects WHERE project_id = $1';
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [idToCheck]);
        client.release();
        const isAvailable = result.rows[0].count == 0;
        console.log(isAvailable)
        res.json({ isAvailable });
    } catch (error) {
        console.error(`Error checking ID availability: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Checking For Task Id Availabality
router.get('/task_id/:task_id', async (req, res) => {
    const idToCheck = req.params.task_id;
    const sql = 'SELECT COUNT(*) FROM tasks WHERE task_id = $1';
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [idToCheck]);
        client.release();
        const isAvailable = result.rows[0].count == 0;
        console.log(isAvailable)
        res.json({ isAvailable });
    } catch (error) {
        console.error(`Error checking ID availability: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add Comments
router.post('/comments', async (req, res) => {
    const { project_id, task_id, emp_id, manager_id, comments } = req.body;
    const sql = `INSERT INTO empcomments(project_id,task_id,emp_id,manager_id,comments)VALUES($1, $2, $3, $4,$5)RETURNING *;`;
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [project_id, task_id, emp_id, manager_id, comments]);
        client.release();
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting Comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Comments(Manager)
router.get('/getcomments/:manager_id', async (req, res) => {
    const manager_id = req.params.manager_id;
    const sql = `SELECT e.empname, p.project_name, t.task_name, ec.*
                FROM empcomments ec
                JOIN employee e ON ec.emp_id = e.emp_id
                LEFT JOIN projects p ON ec.project_id = p.project_id
                LEFT JOIN tasks t ON ec.task_id = t.task_id
                WHERE ec.manager_id =$1 AND ec.response IS NULL;
                `
    try {

        const client = await pool.connect();
        const result = await client.query(sql, [manager_id]);
        client.release();
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching Coments by manager_id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Comments(Employee)
router.get('/getmycomments/:emp_id', async (req, res) => {
    const emp_id = req.params.emp_id;
    const sql = `SELECT ec.id,ec.comments AS emp_comment,ec.added_date,ec.response AS emp_response,p.project_name,t.task_name,m.empname AS manager_name
                FROM empcomments ec
                LEFT JOIN projects p ON ec.project_id = p.project_id
                LEFT JOIN tasks t ON ec.task_id = t.task_id
                LEFT JOIN manager m ON ec.manager_id = m.manager_id
                WHERE ec.emp_id =$1;
                `
    try {
        const client = await pool.connect();
        const result = await client.query(sql, [emp_id]);
        client.release();
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching Coments by emp_id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Manager Response for Employee Comments
router.put('/response', async (req, res) => {
    const { comments_id, response } = req.body;
    const sql = ` UPDATE empcomments SET response = $1 WHERE id = $2`;
    try {
        const client = await pool.connect();
        await client.query(sql, [response, comments_id]);
        client.release();
        res.status(200).json({ message: `Response with ID ${comments_id} updated successfully` });
    } catch (error) {
        console.error(`Error updating Comments by ID ${comments_id}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete comments
router.delete('/deletecomments/:comments_id', async (req, res) => {
    const comments_id = req.params.comments_id;
    const sql = `DELETE FROM empcomments WHERE id = $1;`;
    try {
        const client = await pool.connect();
        await client.query(sql, [comments_id]);
        client.release();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting Comments by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
