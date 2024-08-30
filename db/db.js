import mysql from 'mysql2'

const db_con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'GeopolimMySQL2024*', // Asegúrate de reemplazar 'your_password' con tu contraseña real
})

db_con.connect((err) => {
    if (err) {
        console.log('La conexión con la base de datos falló !!!', err)
    } else {
        console.log('Conectado con la base de datos !!!')
    }
})

export default db_con
