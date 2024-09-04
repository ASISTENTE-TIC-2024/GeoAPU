import mysql2 from 'mysql2'

const db_con = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'GeopolimMySQL2024*', // Asegúrate de reemplazar 'your_password' con tu contraseña real
    database: 'geoapu',
})

db_con.connect((err) => {
    if (err) {
        console.log('La conexión con la base de datos falló !!!', err)
    } else {
        console.log('Conectado con la base de datos !!!')
    }
})

export default db_con
