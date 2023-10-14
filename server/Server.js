const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser');
const app = express()
const PORT = process.env.PORT | 5000
const { Pool } = require('pg');
require('dotenv').config();
const createTables = require('./Db/Tables');
const apiRouter = require('./Api');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});


pool.connect((err) => {
    if (err) {
        console.log("Error Connecting To the DataBase" + err.stack);
        return;
    }
})

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
createTables(); //Uncomment Only One Once
app.use('/api', apiRouter);
app.listen(PORT, () => console.log(`Server Running At Port: ${PORT}`))