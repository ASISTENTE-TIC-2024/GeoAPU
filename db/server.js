import express from 'express'
import cors from 'cors'
import db_con from '../db/db.js'

const app = express()

// Configurar CORS
app.use(cors())

// Middleware para parsear JSON
app.use(express.json())

app.listen(5000, () => {
    console.log(`El servidor está corriendo en el puerto 5000 ...`)
})

app.get('/useData', (_, res) => {
    let useQuery = `USE geoapu`
    db_con.query(useQuery, (error) => {
        if (error) throw error

        console.log('Usando la base de datos GeoAPU')

        return res.send(`Usando APU`)
    })
})

app.get('/selectData', (_, res) => {
    let selectQuery = `SELECT * FROM usuarios`
    db_con.query(selectQuery, (error, results) => {
        if (error) throw error

        console.log('Datos seleccionados:', results)
        return res.json(results) // Devuelve los resultados como JSON
    })
})

app.put('/updateUser/:id_usuario', (req, res) => {
    const { id_usuario } = req.params
    const { nombre_usuario, correo_usuario, contraseña, rol } = req.body

    let updateQuery = `UPDATE usuarios SET nombre_usuario = ?, correo_usuario = ?, contraseña = ?, rol = ? WHERE id_usuario = ?`
    db_con.query(
        updateQuery,
        [nombre_usuario, correo_usuario, contraseña, rol, id_usuario],
        (error, results) => {
            if (error) throw error

            console.log('Usuario actualizado:', results)
            return res.json({ message: 'Usuario actualizado correctamente' })
        }
    )
})

app.delete('/deleteUser/:id_usuario', (req, res) => {
    const { id_usuario } = req.params
    let deleteQuery = `DELETE FROM usuarios WHERE id_usuario = ?`
    db_con.query(deleteQuery, [id_usuario], (error, results) => {
        if (error) throw error

        console.log('Usuario eliminado:', results)
        return res.json({ message: 'Usuario eliminado correctamente' })
    })
})

app.post('/addUser', (req, res) => {
    const { nombre_usuario, correo_usuario, contraseña, rol } = req.body

    const query = `INSERT INTO usuarios (nombre_usuario, correo_usuario, contraseña, rol) VALUES (?, ?, ?, ?)`

    db_con.query(
        query,
        [nombre_usuario, correo_usuario, contraseña, rol],
        (err, result) => {
            if (err) {
                console.error('Error al agregar usuario:', err)
                return res.status(500).send('Error al agregar usuario')
            }
            res.send({ message: 'Usuario agregado correctamente' })
        }
    )
})
