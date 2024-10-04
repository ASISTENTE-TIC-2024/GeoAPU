import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db_con = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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
