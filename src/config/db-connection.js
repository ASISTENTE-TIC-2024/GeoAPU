import mysql2 from 'mysql2';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from './config.js';


const db_con = mysql2.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
});


db_con.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
    connection.release();
});

export default db_con;
