import express from 'express'
import cors from 'cors'
import multer from 'multer';
import bodyParser from 'body-parser';
import db_con from '../db/db.js'
import routes from './routes/image.routes.js';

const app = express()

const upload = multer({ storage: multer.memoryStorage() });


// Middleware to add getConnection to req object
app.use((req, res, next) => {
    req.getConnection = (callback) => {
        db_con.getConnection(callback);
    };
    next();
});


// Configurar body-parser
app.use(bodyParser.json());

// Configurar CORS
app.use(cors())

app.use('/', routes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// useData - Usar la base de datos GeoAPU
app.get('/useData', (_, res) => {
    let useQuery = `USE geoapu`
    db_con.query(useQuery, (error) => {
        if (error) throw error

        console.log('Usando la base de datos GeoAPU')

        return res.send(`Usando APU`)
    })
})

// selectData - Seleccionar datos de la tabla usuarios
app.get('/selectData', (_, res) => {
    let selectQuery = `SELECT * FROM usuarios`
    db_con.query(selectQuery, (error, results) => {
        if (error) throw error

        console.log('Datos seleccionados:', results)
        return res.json(results) // Devuelve los resultados como JSON
    })
})

// updateData - Actualizar datos de la tabla usuarios
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

// deleteData - Eliminar datos de la tabla usuarios
app.delete('/deleteUser/:id_usuario', (req, res) => {
    const { id_usuario } = req.params
    let deleteQuery = `DELETE FROM usuarios WHERE id_usuario = ?`
    db_con.query(deleteQuery, [id_usuario], (error, results) => {
        if (error) throw error

        console.log('Usuario eliminado:', results)
        return res.json({ message: 'Usuario eliminado correctamente' })
    })
})

// addData - Agregar datos a la tabla usuarios

// Obtener __dirname en módulos ES
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

app.post('/addUser', upload.single('foto'), (req, res) => {

    const { nombre_usuario, correo_usuario, contraseña, rol } = req.body;
    const foto = req.file ? req.file.buffer.toString('base64') : null;

    const query = `INSERT INTO usuarios (foto, nombre_usuario, correo_usuario, contraseña, rol) VALUES (?, ?, ?, ?, ?)`;

    db_con.query(
        query,
        [foto, nombre_usuario, correo_usuario, contraseña, rol],
        (err, result) => {
            if (err) {
                console.error('Error al agregar usuario:', err);
                return res.status(500).send('Error al agregar usuario');
            }
            res.send({ message: 'Usuario agregado correctamente' });
        }
    );
});

app.listen(5000, () => {
    console.log(`El servidor está corriendo en el puerto 5000 ...`)
})