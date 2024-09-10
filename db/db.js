import mysql2 from 'mysql2';

const db_con = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'GeopolimMySQL2024*',
    database: 'geoapu',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db_con.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
    connection.release();
});

export default db_con;
