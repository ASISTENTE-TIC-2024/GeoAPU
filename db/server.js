import express from 'express'
import cors from 'cors'
import multer from 'multer';
import bodyParser from 'body-parser';
import db_con from '../db/db.js'
import imageRoutes from './routes/image.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';


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

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', imageRoutes);

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


// Get the current file URL and convert it to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your existing code
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../images"),
    filename: function (_, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.post('/addUser', multer({ storage }).single('foto_usuario'), (req, res) => {

    const { nombre_usuario, correo_usuario, contrasena_usuario, rol_usuario } = req.body;
    const ruta_foto_usuario = `../images/${req.file.filename}`;
    const query = `INSERT INTO usuarios (foto_usuario, nombre_usuario, correo_usuario, contrasena_usuario, rol_usuario) VALUES (?, ?, ?, ?, ?)`;

    db_con.query(
        query,
        [ruta_foto_usuario, nombre_usuario, correo_usuario, contrasena_usuario, rol_usuario],
        (err) => {
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