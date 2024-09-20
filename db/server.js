import express from 'express'
import cors from 'cors'
import multer from 'multer';
import db_con from '../db/db.js'
import path from 'path';
import fs from 'fs-extra'
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const app = express()

app.use((req, res, next) => {
    req.getConnection = (callback) => {
        db_con.getConnection(callback);
    };
    next();
});

app.use(bodyParser.json());

// Configurar CORS
app.use(cors())
app.use(express.static('public'));

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

// Ruta que maneja multipart/form-data
app.post('/upload', multer({ storage }).single('foto_usuario'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo.');
    }
    res.send('Archivo subido exitosamente');
});


// updateData - Actualizar datos de la tabla usuarios
app.put('/updateUser/:id_usuario', multer({ storage }).single('foto_usuario'), (req, res) => {

    const { id_usuario } = req.params
    const { nombre_usuario, correo_usuario, contrasena_usuario, rol_usuario } = req.body

    const newImagePath = req.file ? `../images/${req.file.filename}` : null;

    const getOldImageQuery = "SELECT foto_usuario FROM usuarios WHERE id_usuario = ?";

    db_con.query(getOldImageQuery, [id_usuario], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        const oldImagePath = results[0].foto_usuario;

        let updateQuery;
        let queryParams;

        if (newImagePath) {
            updateQuery = `UPDATE usuarios SET foto_usuario = ?, nombre_usuario = ?, correo_usuario = ?, contrasena_usuario = ?, rol_usuario = ? WHERE id_usuario = ?`;
            queryParams = [newImagePath, nombre_usuario, correo_usuario, contrasena_usuario, rol_usuario, id_usuario];
        } else {
            updateQuery = `UPDATE usuarios SET nombre_usuario = ?, correo_usuario = ?, contrasena_usuario = ?, rol_usuario = ? WHERE id_usuario = ?`;
            queryParams = [nombre_usuario, correo_usuario, contrasena_usuario, rol_usuario, id_usuario];
        }

        db_con.query(
            updateQuery,
            queryParams,
            (error, results) => {
                if (error) throw error
                // Delete the old image file if a new one was uploaded
                if (newImagePath && oldImagePath) {
                    fs.unlink(path.join(__dirname, oldImagePath), (err) => {
                        if (err) console.error(err);
                    });
                }

                console.log('Usuario actualizado:', results)
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

})


app.listen(5000, () => {
    console.log(`El servidor está corriendo en el puerto 5000 ...`)
})