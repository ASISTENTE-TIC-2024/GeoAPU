import db_con from '../db/db.js'
import express from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import bodyParser from 'body-parser';
import passport from './auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'
import multer from 'multer';
import fs from 'fs-extra'
import dotenv from 'dotenv';

const app = express()

app.use((req, res, next) => {
    req.getConnection = (callback) => {
        db_con.getConnection(callback);
    };
    next();
});

app.use(bodyParser.json());
app.use(passport.initialize()); // Inicializar passport

dotenv.config();
// Configurar CORS
app.use(cors())
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const secretKey = process.env.SECRET_KEY;


// Ruta de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db_con.query('SELECT * FROM usuarios WHERE correo_usuario = ?', [email], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];

            console.log('Usuario encontrado: ', user);

            bcrypt.compare(password, user.contrasena_usuario, (err, isMatch) => {
                if (isMatch) {
                    const token = jwt.sign({ id: user.id_usuario, email: user.correo_usuario, name: user.nombre_usuario, photoPath: user.foto_usuario, role: user.rol_usuario }, secretKey, { expiresIn: '24h' });
                    console.log('Token generado: ', JSON.stringify(token));
                    res.json({ token });
                } else {
                    res.status(401).json({ message: 'Credenciales incorrectas!' });
                }
            });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas!' });
        }
    });
});

// Ruta para verificar el token
app.post('/verify-token', (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado!' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        res.json({ message: 'El token es valido.', user: decoded });
    } catch (err) {
        res.status(400).json({ message: 'El token es invalido!' });
    }
});


app.get('/protected', (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado!' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        res.redirect(`../index.html?token=${token}`);
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
});

// Rutas de OAuth 2.0 y OIDC
app.get('/auth/oidc', passport.authenticate('openidconnect'));

app.get('/callback', passport.authenticate('openidconnect', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect(`../index.html?token=${token}`);
});

// Ruta para verificar la contraseña
app.post('/verify-password', (req, res) => {
    const { plainTextPassword, hashedPassword } = req.body;

    bcrypt.compare(plainTextPassword, hashedPassword, (err, isMatch) => {
        if (err) {
            return res.status(500).json({ message: 'Error verifying password' });
        }

        if (!isMatch) {
            return res.status(401).json({ message: 'Password verification failed' });
        }

        res.json({ message: 'Password verified successfully' });
    });
});


// Configurar multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../images"),
    filename: function (_, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

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


// deleteData - Eliminar datos de la tabla usuarios
app.delete('/deleteUser/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;

    // Primero, obtener la ruta de la foto del usuario
    const getPhotoQuery = `SELECT foto_usuario FROM usuarios WHERE id_usuario = ?`;
    db_con.query(getPhotoQuery, [id_usuario], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            const photoPath = results[0].foto_usuario;

            // Luego, eliminar el usuario de la base de datos
            let deleteQuery = `DELETE FROM usuarios WHERE id_usuario = ?`;
            db_con.query(deleteQuery, [id_usuario], (error, results) => {
                if (error) throw error;

                console.log('Usuario eliminado:', results);

                // Eliminar la foto del usuario de la carpeta images
                if (photoPath) {
                    fs.unlink(path.join(__dirname, photoPath), (err) => {
                        if (err) console.error('Error al eliminar la foto del usuario:', err);
                        else console.log('Foto del usuario eliminada:', photoPath);
                    });
                }

                return res.json({ message: 'Usuario eliminado correctamente' });
            });
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    });
});

app.post('/addUser', multer({ storage }).single('foto_usuario'), (req, res) => {
    const { nombre_usuario, correo_usuario, contrasena_usuario, rol_usuario } = req.body;
    const ruta_foto_usuario = `../images/${req.file.filename}`;

    // Hash the password before storing it in the database
    bcrypt.hash(contrasena_usuario, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error al encriptar la contraseña:', err);
            return res.status(500).send('Error al encriptar la contraseña');
        }

        const query = `INSERT INTO usuarios (foto_usuario, nombre_usuario, correo_usuario, contrasena_usuario, rol_usuario) VALUES (?, ?, ?, ?, ?)`;

        db_con.query(
            query,
            [ruta_foto_usuario, nombre_usuario, correo_usuario, hashedPassword, rol_usuario],
            (err) => {
                if (err) {
                    console.error('Error al agregar usuario:', err);
                    return res.status(500).send('Error al agregar usuario');
                }
                res.send({ message: 'Usuario agregado correctamente' });
            }
        );
    });
});

// updateData - Actualizar datos de la tabla usuarios
app.put('/updateUser/:id_usuario', multer({ storage }).single('foto_usuario'), (req, res) => {

    const { id_usuario } = req.params
    const { nombre_usuario, correo_usuario, contrasena_usuario, rol_usuario } = req.body

    const newImagePath = req.file ? `../images/${req.file.filename}` : null;

    console.log('Nueva ruta de la imagen:', newImagePath);

    const getOldImageQuery = "SELECT foto_usuario, contrasena_usuario FROM usuarios WHERE id_usuario = ?";

    db_con.query(getOldImageQuery, [id_usuario], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        const oldImagePath = results[0].foto_usuario;
        const oldPasswordHash = results[0].contrasena_usuario;

        console.log('Ruta de la imagen antigua:', oldImagePath);

        let updateQuery;
        let queryParams;

        const updateUser = (hashedPassword) => {
            if (newImagePath) {
                updateQuery = `UPDATE usuarios SET foto_usuario = ?, nombre_usuario = ?, correo_usuario = ?, contrasena_usuario = ?, rol_usuario = ? WHERE id_usuario = ?`;
                queryParams = [newImagePath, nombre_usuario, correo_usuario, hashedPassword, rol_usuario, id_usuario];
            } else {
                updateQuery = `UPDATE usuarios SET nombre_usuario = ?, correo_usuario = ?, contrasena_usuario = ?, rol_usuario = ? WHERE id_usuario = ?`;
                queryParams = [nombre_usuario, correo_usuario, hashedPassword, rol_usuario, id_usuario];
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
                    res.json({ message: 'Usuario actualizado correctamente' });
                }
            )
        };

        if (contrasena_usuario) {
            bcrypt.hash(contrasena_usuario, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error al encriptar la contraseña:', err);
                    return res.status(500).send('Error al encriptar la contraseña');
                }
                updateUser(hashedPassword);
            });
        } else {
            updateUser(oldPasswordHash);
        }
    })
})

app.listen(5000, () => {
    console.log(`El servidor está corriendo en el puerto 5000 ...`)
})
