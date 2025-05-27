import db_con from './views/config/db-connection.js';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import passport from './views/config/auth.js';
import cors from 'cors';
import fs from 'fs-extra';
import dotenv, { config } from 'dotenv';
import { PORT } from './views/config/config.js';
import { fileURLToPath } from 'url';
import path from 'path';
import cloudinaryPkg from 'cloudinary';
const { v2: cloudinary } = cloudinaryPkg;
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


/* SERVIDOR */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use((req, res, next) => {
    req.getConnection = (callback) => {
        db_con.getConnection(callback);
    };
    next();
});

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'pages')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'middleware')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize()); // Inicializar passport

dotenv.config();

// Configurar CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const secretKey = process.env.SECRET_KEY;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Nombre de la carpeta en Cloudinary
        format: async (req, file) => 'jpg', // Formato de las imágenes
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    }
});

const upload = multer({ storage: storage });


// Ruta de login
app.post('/login', (req, res) => {

    const { email, password } = req.body;

    db_con.query(
        'SELECT * FROM usuarios WHERE correo_usuario = ?',
        [email],
        (err, results) => {

            if (err) throw err;

            if (results.length > 0) {
                const user = results[0];
                bcrypt.compare(
                    password,
                    user.contrasena_usuario,
                    (err, isMatch) => {
                        if (isMatch) {
                            const token = jwt.sign(
                                {
                                    id: user.id_usuario,
                                    email: user.correo_usuario,
                                    name: user.nombre_usuario,
                                    photoPath: user.foto_usuario,
                                    role: user.rol_usuario,
                                },
                                secretKey,
                                { expiresIn: '3d' },
                            );

                            res.send(`<script>
                                localStorage.setItem('token', '${token}');
                                window.location.href = '/pages/main.html';
                            </script>`);

                        } else {
                            res.send(`<script>alert('Credenciales incorrectas!'); window.location.href = '/index.html';</script>`);
                        }
                    },
                );
            } else {
                res.send(`<script>alert('Credenciales incorrectas!'); window.location.href = '/index.html';</script>`);

            }
        },
    );
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

// Ruta protegida
app.get('/protected', (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado!' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        res.redirect(`../../index.html?token=${token}`);
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
});

// Rutas de OAuth 2.0 y OIDC
app.get('/auth/oidc', passport.authenticate('openidconnect'));

// Ruta de callback para autenticación OIDC
app.get(
    '/callback',
    passport.authenticate('openidconnect', {
        failureRedirect: '/',
    }),
    (req, res) => {
        res.redirect(`../../index.html?token=${token}`);
    },
);

// Ruta para verificar la contraseña
app.post('/verify-password', (req, res) => {
    const { plainTextPassword, hashedPassword } = req.body;

    bcrypt.compare(plainTextPassword, hashedPassword, (err, isMatch) => {
        if (err) {
            return res
                .status(500)
                .json({ message: 'Error verifying password' });
        }

        if (!isMatch) {
            return res
                .status(401)
                .json({ message: 'Password verification failed' });
        }

        res.json({ message: 'Password verified successfully' });
    });
});

// useData - Usar la base de datos GeoAPU
app.get('/useData', (_, res) => {
    let useQuery = `USE geoapu`;
    db_con.query(useQuery, (error) => {
        if (error) throw error;

        console.log('Usando la base de datos GeoAPU');

        return res.send(`Usando APU`);
    });
});

/* ------------------------------------------------------- APARTADO DE LA TABLA USUARIOS ---------------------------------------------------- */

// selectData - Seleccionar datos de la tabla usuarios
app.get('/selectUserData', (_, res) => {
    let selectQuery = `SELECT * FROM usuarios`;
    db_con.query(selectQuery, (error, results) => {
        if (error) throw error;

        console.log('Datos seleccionados:', results);
        return res.json(results); // Devuelve los resultados como JSON
    });
});

// addData - Agregar datos a la tabla usuarios
app.post('/addUser', upload.single('foto_usuario'), (req, res) => {

    const { nombre_usuario, correo_usuario, contrasena_usuario, rol_usuario } =
        req.body;

    const ruta_foto_usuario = req.file.path;

    // Hash the password before storing it in the database
    bcrypt.hash(contrasena_usuario, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error al encriptar la contraseña:', err);
            return res.status(500).send('Error al encriptar la contraseña');
        }

        const query = `INSERT INTO usuarios (foto_usuario, nombre_usuario, correo_usuario, contrasena_usuario, rol_usuario) VALUES (?, ?, ?, ?, ?)`;

        db_con.query(
            query,
            [
                ruta_foto_usuario,
                nombre_usuario,
                correo_usuario,
                hashedPassword,
                rol_usuario,
            ],
            (err) => {
                if (err) {
                    console.error('Error al agregar usuario:', err);
                    return res.status(500).send('Error al agregar usuario');
                }
                res.send({ message: 'Usuario agregado correctamente' });
            },
        );
    });
});

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

                // Eliminar la foto del usuario de la carpeta images
                if (photoPath) {
                    fs.unlink(path.join(__dirname, photoPath), (err) => {
                        if (err)
                            console.error(
                                'Error al eliminar la foto del usuario:',
                                err,
                            );
                        else
                            console.log(
                                'Foto del usuario eliminada:',
                                photoPath,
                            );
                    });
                }

                return res.json({ message: 'Usuario eliminado correctamente' });
            });
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    });
});

// updateData - Actualizar datos de la tabla usuarios
app.put(
    '/updateUser/:id_usuario',
    upload.single('foto_usuario'),
    (req, res) => {

        const { id_usuario } = req.params;

        const {
            nombre_usuario,
            correo_usuario,
            contrasena_usuario,
            rol_usuario,
        } = req.body;

        const newImagePath = req.file.path;

        console.log('Nueva ruta de la imagen:', newImagePath);

        const getOldImageQuery =
            'SELECT foto_usuario, contrasena_usuario FROM usuarios WHERE id_usuario = ?';

        console.log('Imagen anterior', getOldImageQuery);

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
                    queryParams = [
                        newImagePath,
                        nombre_usuario,
                        correo_usuario,
                        hashedPassword,
                        rol_usuario,
                        id_usuario,
                    ];
                } else {
                    updateQuery = `UPDATE usuarios SET nombre_usuario = ?, correo_usuario = ?, contrasena_usuario = ?, rol_usuario = ? WHERE id_usuario = ?`;
                    queryParams = [
                        nombre_usuario,
                        correo_usuario,
                        hashedPassword,
                        rol_usuario,
                        id_usuario,
                    ];
                }

                db_con.query(updateQuery, queryParams, (error, results) => {
                    if (error) throw error;

                    // Delete the old image file if a new one was uploaded
                    if (newImagePath && oldImagePath) {
                        fs.unlink(path.join(__dirname, oldImagePath), (err) => {
                            if (err) console.error(err);
                        });
                    }

                    console.log('Usuario actualizado:', results);
                    res.json({ message: 'Usuario actualizado correctamente' });
                });
            };

            if (contrasena_usuario) {
                bcrypt.hash(contrasena_usuario, 10, (err, hashedPassword) => {
                    if (err) {
                        console.error('Error al encriptar la contraseña:', err);
                        return res
                            .status(500)
                            .send('Error al encriptar la contraseña');
                    }
                    updateUser(hashedPassword);
                });
            } else {
                updateUser(oldPasswordHash);
            }
        });
    },
);

/* ------------------------------------------------------- APARTADO DE LA TABLA EQUIPOS ---------------------------------------------------- */

// selectData - Seleccionar datos de la tabla equipos
app.get('/selectEquipoData', (_, res) => {
    let selectQuery = `SELECT * FROM equipos`;

    db_con.query(selectQuery, (error, results) => {
        if (error) throw error;

        console.log('Datos seleccionados:', results);
        return res.json(results); // Devuelve los resultados como JSON
    });
});

// addData - Agregar datos a la tabla equipos
app.post(
    '/addEquipo',
    upload.single('foto_equipo'),
    (req, res) => {

        const {
            descripcion_equipo,
            marca_equipo,
            tipo_equipo,
            tarifa_dia_equipo,
        } = req.body;

        console.log('Datos del equipo:', req.body);

        const ruta_foto_equipo = req.file.path;

        console.log('Ruta de la foto del equipo:', ruta_foto_equipo);

        const query = `
            INSERT INTO equipos (
                foto_equipos,
                descripcion_equipos,
                marca_equipos,
                tipo_equipos,
                tarifa_dia_equipos
            ) VALUES (
                ?,
                ?,
                ?,
                ?,
                ?
            );
        `;

        db_con.query(
            query,
            [
                ruta_foto_equipo,
                descripcion_equipo,
                marca_equipo,
                tipo_equipo,
                tarifa_dia_equipo,
            ],
            (err) => {
                if (err) {
                    console.error('Error al agregar equipo:', err);
                    return res.status(500).send('Error al agregar equipo');
                }
                res.send({ message: 'Equipo agregado correctamente' });
            },
        );
    },
);

// deleteData - Eliminar datos de la tabla equipos
app.delete('/deleteEquipo/:id_equipos', (req, res) => {

    const { id_equipos } = req.params;

    // Primero, obtener la ruta de la foto del usuario
    const getPhotoQuery = `SELECT foto_equipos FROM equipos WHERE id_equipos = ?`;
    db_con.query(getPhotoQuery, [id_equipos], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            const photoPath = results[0].foto_equipos;

            // Luego, eliminar el usuario de la base de datos
            let deleteQuery = `DELETE FROM equipos WHERE id_equipos = ?`;
            db_con.query(deleteQuery, [id_equipos], (error, results) => {
                if (error) throw error;

                console.log('Equipo eliminado:', results);

                // Eliminar la foto del usuario de la carpeta images
                if (photoPath) {
                    fs.unlink(path.join(__dirname, photoPath), (err) => {
                        if (err)
                            console.error(
                                'Error al eliminar la foto del equipo:',
                                err,
                            );
                        else
                            console.log(
                                'Foto del equipo eliminada:',
                                photoPath,
                            );
                    });
                }

                return res.json({ message: 'Equipo eliminado correctamente' });
            });
        } else {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
    });
});

// updateData - Actualizar datos de la tabla equipos

app.put(
    '/updateEquipo/:id_equipos',
    upload.single('foto_equipo'),
    (req, res) => {

        const { id_equipos } = req.params;

        const {
            descripcion_equipos,
            marca_equipos,
            tipo_equipos,
            tarifa_dia_equipos,
        } = req.body;

        const newImagePath = req.file.path;

        console.log('Nueva ruta de la imagen:', newImagePath);

        const getOldImageQuery =
            'SELECT foto_equipos FROM equipos WHERE id_equipos = ?';

        db_con.query(getOldImageQuery, [id_equipos], (err, results) => {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const oldImagePath = results[0].foto_equipos;

            console.log('Ruta de la imagen antigua:', oldImagePath);

            let updateQuery;
            let queryParams;

            if (newImagePath) {

                updateQuery = `UPDATE equipos SET
                                    foto_equipos = ?,
                                    descripcion_equipos = ?,
                                    marca_equipos = ?,
                                    tipo_equipos = ?,
                                    tarifa_dia_equipos = ?
                                WHERE
                                    id_equipos = ?`;
                queryParams = [
                    newImagePath,
                    descripcion_equipos,
                    marca_equipos,
                    tipo_equipos,
                    tarifa_dia_equipos,
                    id_equipos,
                ];
            } else {
                updateQuery = `UPDATE equipos SET
                                    descripcion_equipos = ?,
                                    marca_equipos = ?,
                                    tipo_equipos = ?,
                                    tarifa_dia_equipos = ?
                                WHERE
                                    id_equipos = ?`;
                queryParams = [
                    descripcion_equipos,
                    marca_equipos,
                    tipo_equipos,
                    tarifa_dia_equipos,
                    id_equipos,
                ];
            }

            db_con.query(updateQuery, queryParams, (error, results) => {

                if (error) {
                    return res.status(500).json({ error: error.message });
                }

                if (newImagePath && oldImagePath) {
                    fs.unlink(path.join(__dirname, oldImagePath), (err) => {
                        if (err) console.error(err);
                    });
                }

                console.log('Equipo actualizado:', results);

                res.status(200).json({
                    message: 'Equipo actualizado correctamente',
                });

            });
        });
    },
);

/* ------------------------------------------------------- APARTADO DE LA TABLA MATERIALES ---------------------------------------------------- */

// selectData - Seleccionar datos de la tabla materiales
app.get('/selectMaterialData', (_, res) => {
    let selectQuery = `SELECT * FROM materiales`;
    db_con.query(selectQuery, (error, results) => {
        if (error) throw error;

        console.log('Datos seleccionados:', results);
        return res.json(results); // Devuelve los resultados como JSON
    });
});

// addData - Agregar datos a la tabla materiales
app.post(
    '/addMaterial',
    upload.single('foto_material'),
    (req, res) => {
        const {
            descripcion_material,
            tipo_moneda_material,
            unidad_medida_material,
            valor_unitario_material,
            fabricacion_material,
            margen_material,
            costo_unitario_material,
            dimension_material,
            unidad_material,
            precio_producto_material,
            proveedor_material,
        } = req.body;

        console.log('Datos del material:', req.body);

        const ruta_foto_material = req.file.path;

        console.log('Ruta de la foto del material:', ruta_foto_material);

        const query = `INSERT INTO materiales (
        foto_materiales,
        descripcion_materiales,
        tipo_moneda_materiales,
        unidad_medida_materiales,
        valor_unitario_materiales,
        fabricacion_materiales,
        margen_materiales,
        porcentaje_margen_materiales,
        costo_unitario_materiales,
        dimension_materiales,
        unidad_materiales,
        precio_producto_materiales,
        proveedor_materiales
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db_con.query(
            query,
            [
                ruta_foto_material,
                descripcion_material,
                tipo_moneda_material,
                unidad_medida_material,
                valor_unitario_material,
                fabricacion_material,
                margen_material,
                0,
                costo_unitario_material,
                dimension_material,
                unidad_material,
                precio_producto_material,
                proveedor_material,
            ],
            (err) => {
                if (err) {
                    console.error('Error al agregar material:', err);
                    return res.status(500).send('Error al agregar material');
                }
                res.send({ message: 'Material agregado correctamente' });
            },
        );
    },
);

// deleteData - Eliminar datos de la tabla materiales
app.delete('/deleteMaterial/:id_materiales', (req, res) => {
    const { id_materiales } = req.params;

    // Primero, obtener la ruta de la foto del usuario
    const getPhotoQuery = `SELECT foto_materiales FROM materiales WHERE id_materiales = ?`;
    db_con.query(getPhotoQuery, [id_materiales], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            const photoPath = results[0].foto_materiales;

            // Luego, eliminar el usuario de la base de datos
            let deleteQuery = `DELETE FROM materiales WHERE id_materiales = ?`;
            db_con.query(deleteQuery, [id_materiales], (error, results) => {
                if (error) throw error;

                console.log('Material eliminado eliminado:', results);

                // Eliminar la foto del usuario de la carpeta images
                if (photoPath) {
                    fs.unlink(path.join(__dirname, photoPath), (err) => {
                        if (err)
                            console.error(
                                'Error al eliminar la foto del material:',
                                err,
                            );
                        else
                            console.log(
                                'Foto del material eliminada:',
                                photoPath,
                            );
                    });
                }

                return res.json({
                    message: 'Material eliminado correctamente',
                });
            });
        } else {
            return res.status(404).json({ message: 'Material no encontrado' });
        }
    });
});

// updateData - Actualizar datos de la tabla materiales
app.put(
    '/updateMaterial/:id_materiales',
    upload.single('foto_material'),
    (req, res) => {

        const { id_materiales } = req.params;

        const {
            descripcion_materiales,
            tipo_moneda_materiales,
            unidad_medida_materiales,
            valor_unitario_materiales,
            fabricacion_materiales,
            margen_materiales,
            costo_unitario_materiales,
            dimension_materiales,
            unidad_materiales,
            precio_producto_materiales,
            proveedor_materiales,
        } = req.body;

        const newImagePath = req.file.path;

        console.log('Nueva ruta de la imagen:', newImagePath);

        const getOldImageQuery =
            'SELECT foto_materiales FROM materiales WHERE id_materiales = ?';

        db_con.query(getOldImageQuery, [id_materiales], (err, results) => {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const oldImagePath = results[0].foto_materiales;

            console.log('Ruta de la imagen antigua:', oldImagePath);

            let updateQuery;
            let queryParams;

            if (newImagePath) {
                updateQuery = `UPDATE materiales SET
                                    foto_materiales = ?,
                                    descripcion_materiales = ?,
                                    tipo_moneda_materiales = ?,
                                    unidad_medida_materiales = ?,
                                    valor_unitario_materiales = ?,
                                    fabricacion_materiales = ?,
                                    margen_materiales = ?,
                                    costo_unitario_materiales = ?,
                                    dimension_materiales = ?,
                                    unidad_materiales = ?,
                                    precio_producto_materiales = ?,
                                    proveedor_materiales = ?
                                WHERE
                                    id_materiales = ?`;
                queryParams = [
                    newImagePath,
                    descripcion_materiales,
                    tipo_moneda_materiales,
                    unidad_medida_materiales,
                    valor_unitario_materiales,
                    fabricacion_materiales,
                    margen_materiales,
                    costo_unitario_materiales,
                    dimension_materiales,
                    unidad_materiales,
                    precio_producto_materiales,
                    proveedor_materiales,
                    id_materiales,
                ];
            } else {
                updateQuery = `UPDATE materiales SET
                                    descripcion_materiales = ?,
                                    tipo_moneda_materiales = ?,
                                    unidad_medida_materiales = ?,
                                    valor_unitario_materiales = ?,
                                    fabricacion_materiales = ?,
                                    margen_materiales = ?,
                                    costo_unitario_materiales = ?,
                                    dimension_materiales = ?,
                                    unidad_materiales = ?,
                                    precio_producto_materiales = ?,
                                    proveedor_materiales = ?
                                WHERE
                                    id_materiales = ?`;
                queryParams = [
                    descripcion_materiales,
                    tipo_moneda_materiales,
                    unidad_medida_materiales,
                    valor_unitario_materiales,
                    fabricacion_materiales,
                    margen_materiales,
                    costo_unitario_materiales,
                    dimension_materiales,
                    unidad_materiales,
                    precio_producto_materiales,
                    proveedor_materiales,
                    id_materiales,
                ];
            }

            db_con.query(updateQuery, queryParams, (error, results) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }

                // Delete the old image file if a new one was uploaded
                if (newImagePath && oldImagePath) {
                    fs.unlink(path.join(__dirname, oldImagePath), (err) => {
                        if (err) console.error(err);
                    });
                }

                console.log('Material actualizado:', results);

                res.status(200).json({
                    message: 'Material actualizado correctamente',
                });
            });
        });
    },
);

/* ------------------------------------------------------- APARTADO DE LA TABLA TRANSPORTES ---------------------------------------------------- */

// selectData - Seleccionar datos de la tabla transportes
app.get('/selectTransporteData', (_, res) => {

    let selectQuery = `SELECT * FROM transportes`;

    db_con.query(selectQuery, (error, results) => {
        if (error) throw error;
        console.log('Datos seleccionados:', results);
        return res.json(results); // Devuelve los resultados como JSON
    });
});

app.post(
    '/addTransporte',
    upload.single('foto_transporte'),
    (req, res) => {
        const {
            descripcion_transporte,
            unidad_transporte,
            distancia_transporte,
            precio_unitario_transporte,
        } = req.body;

        console.log('Datos del transporte:', req.body);

        const query = `
        INSERT INTO transportes (
            descripcion_transportes,
            unidad_transportes,
            distancia_transportes,
            precio_unitario_transportes
        ) VALUES (?, ?, ?, ?)`;

        db_con.query(
            query,
            [
                descripcion_transporte,
                unidad_transporte,
                distancia_transporte,
                precio_unitario_transporte,
            ],
            (err) => {
                if (err) {
                    console.error('Error al agregar transporte:', err);
                    return res.status(500).send('Error al agregar transporte');
                }
                res.send({ message: 'Transporte agregado correctamente' });
            },
        );
    },
);

// deleteData - Eliminar datos de la tabla transportes
app.delete('/deleteTransporte/:id_transportes', (req, res) => {
    const { id_transportes } = req.params;

    const getQuery = `SELECT * FROM transportes WHERE id_transportes = ?`;
    db_con.query(getQuery, [id_transportes], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            let deleteQuery = `DELETE FROM transportes WHERE id_transportes = ?`;
            db_con.query(deleteQuery, [id_transportes], (error, results) => {
                if (error) throw error;

                console.log('Transporte eliminado correctamente:', results);

                return res.json({
                    message: 'Transporte eliminado correctamente',
                });
            });
        } else {
            return res
                .status(404)
                .json({ message: 'Transporte no encontrado' });
        }
    });
});

// updateData - Actualizar datos de la tabla transportes
app.put('/updateTransporte/:id_transportes', (req, res) => {

    const { id_transportes } = req.params;

    const {
        descripcion_transportes,
        unidad_transportes,
        distancia_transportes,
        precio_unitario_transportes,
    } = req.body;

    const updateQuery = `
        UPDATE transportes SET
            descripcion_transportes = ?,
            unidad_transportes = ?,
            distancia_transportes = ?,
            precio_unitario_transportes = ?
        WHERE id_transportes = ?`;

    const queryParams = [
        descripcion_transportes,
        unidad_transportes,
        distancia_transportes,
        precio_unitario_transportes,
        id_transportes,
    ];

    db_con.query(updateQuery, queryParams, (err, results) => {
        if (err) {
            console.error('Error al actualizar transporte:', err);
            return res.status(500).json({ error: 'Error al actualizar transporte' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Transporte no encontrado' });
        }

        res.json({ message: 'Transporte actualizado correctamente' });
    });
});

/* ------------------------------------------------------- APARTADO DE LA TABLA EMPLEADOS ---------------------------------------------------- */

// selectData - Seleccionar datos de la tabla transportes
app.get('/selectEmpleadoData', (_, res) => {
    let selectQuery = `SELECT * FROM empleados`;

    db_con.query(selectQuery, (error, results) => {
        if (error) throw error;
        console.log('Datos seleccionados:', results);
        return res.json(results); // Devuelve los resultados como JSON
    });
});

app.post(
    '/addEmpleado',
    upload.single('foto_empleado'),
    (req, res) => {

        const {
            cargo_empleados,
            salario_base_empleados,
        } = req.body;

        console.log('Datos del empleado:', req.body);

        const query = `
        INSERT INTO empleados (
            cargo_empleados,
            salario_base_empleados
        ) VALUES (?, ?)`;

        db_con.query(
            query,
            [
                cargo_empleados,
                salario_base_empleados
            ],
            (err) => {
                if (err) {
                    console.error('Error al agregar empleado:', err);
                    return res.status(500).send('Error al agregar empleado');
                }
                res.send({ message: 'Empleado agregado correctamente' });
            },
        );
    },
);

// deleteData - Eliminar datos de la tabla transportes
app.delete('/deleteEmpleado/:id_empleados', (req, res) => {

    const { id_empleados } = req.params;

    const getQuery = `SELECT * FROM empleados WHERE id_empleados = ?`;

    db_con.query(getQuery, [id_empleados], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            const checkForeignKeyQuery = `SELECT * FROM gastos_diarios WHERE id_empleados = ?`;

            db_con.query(checkForeignKeyQuery, [id_empleados], (error, foreignKeyResults) => {
                if (error) throw error;

                if (foreignKeyResults.length > 0) {
                    return res.status(400).json({ message: 'No se puede eliminar el empleado porque tiene gastos asociados.' });
                } else {
                    let deleteQuery = `DELETE FROM empleados WHERE id_empleados = ?`;

                    db_con.query(deleteQuery, [id_empleados], (error, results) => {
                        if (error) throw error;

                        console.log('Empleado eliminado correctamente:', results);

                        return res.json({
                            message: 'Empleado eliminado correctamente',
                        });
                    });
                }
            });
        } else {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
    });
});

// updateData - Actualizar datos de la tabla empleados
app.put('/updateEmpleado/:id_empleados', (req, res) => {

    const { id_empleados } = req.params;

    const {
        cargo_empleados,
        salario_base_empleados
    } = req.body;

    const updateQuery = `
        UPDATE empleados SET
            cargo_empleados = ?,
            salario_base_empleados = ?
        WHERE id_empleados = ?`;

    const queryParams = [
        cargo_empleados,
        salario_base_empleados,
        id_empleados
    ];

    db_con.query(updateQuery, queryParams, (err, results) => {
        if (err) {
            console.error('Error al actualizar empleados:', err);
            return res.status(500).json({ error: 'Error al actualizar empleado' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        res.json({ message: 'Empleado actualizado correctamente' });
    });
});

/* ------------------------------------------------------- APARTADO DE LA TABLA GASTOS DIARIOS ---------------------------------------------------- */

// selectData - Seleccionar datos de la tabla transportes
app.get('/selectGastoData', (_, res) => {
    let selectQuery = `SELECT * FROM gastos_diarios`;

    db_con.query(selectQuery, (error, results) => {
        if (error) throw error;
        console.log('Datos seleccionados:', results);
        return res.json(results); // Devuelve los resultados como JSON
    });
});


// addData - Agregar datos a la tabla gastos_diarios
app.post('/addGasto', upload.single('foto_gasto'), (req, res) => {

    const {
        id_empleados,
        zona_diario,
        salario_diario,
        carga_prestacional_diario,
        desayuno_diario,
        almuerzo_diario,
        cena_diario,
        refrigerio_diario,
        hidratacion_diario,
        hielo_diario,
        hotel_diario,
        lavanderia_diario,
        transporte_diario,
        epp_diario,
        kit_bioseguridad_diario,
        requerimiento_ingreso_diario
    } = req.body;

    console.log(req.body);

    const query = `INSERT INTO gastos_diarios (
        id_empleados,
        zona_diario,
        salario_diario,
        carga_prestacional_diario,
        desayuno_diario,
        almuerzo_diario,
        cena_diario,
        refrigerio_diario,
        hidratacion_diario,
        hielo_diario,
        hotel_diario,
        lavanderia_diario,
        transporte_diario,
        epp_diario,
        kit_bioseguridad_diario,
        requerimiento_ingreso_diario
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


    db_con.query(
        query,
        [
            id_empleados,
            zona_diario,
            salario_diario,
            carga_prestacional_diario,
            desayuno_diario,
            almuerzo_diario,
            cena_diario,
            refrigerio_diario,
            hidratacion_diario,
            hielo_diario,
            hotel_diario,
            lavanderia_diario,
            transporte_diario,
            epp_diario,
            kit_bioseguridad_diario,
            requerimiento_ingreso_diario
        ],
        (err) => {
            if (err) {
                console.error('Error al agregar gasto:', err);
                return res.status(500).send('Error al agregar gasto');
            }
            res.send({ message: 'Gasto agregado correctamente' });
        },
    );
});

// deleteData - Eliminar datos de la tabla gastos_diarios
app.delete('/deleteGasto/:id_gastos', (req, res) => {

    const { id_gastos } = req.params;

    const deleteQuery = `DELETE FROM gastos_diarios WHERE id_gastos = ?`;

    db_con.query(deleteQuery, [id_gastos], (error, results) => {
        if (error) throw error;

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Gasto diario no encontrado' });
        }

        console.log('Gasto diario eliminado:', results);
        return res.json({ message: 'Gasto diario eliminado correctamente' });
    });
});

// updateData - Actualizar datos de la tabla gastos_diarios
app.put('/updateGasto/:id_gastos', (req, res) => {

    const { id_gastos } = req.params;

    const {
        zona_diario,
        salario_diario,
        carga_prestacional_diario,
        desayuno_diario,
        almuerzo_diario,
        cena_diario,
        refrigerio_diario,
        hidratacion_diario,
        hielo_diario,
        hotel_diario,
        lavanderia_diario,
        transporte_diario,
        epp_diario,
        kit_bioseguridad_diario,
        requerimiento_ingreso_diario,
    } = req.body;

    const updateQuery = `
    UPDATE gastos_diarios SET
        zona_diario = ?,
        salario_diario = ?,
        carga_prestacional_diario = ?,
        desayuno_diario = ?,
        almuerzo_diario = ?,
        cena_diario = ?,
        refrigerio_diario = ?,
        hidratacion_diario = ?,
        hielo_diario = ?,
        hotel_diario = ?,
        lavanderia_diario = ?,
        transporte_diario = ?,
        epp_diario = ?,
        kit_bioseguridad_diario = ?,
        requerimiento_ingreso_diario = ?
    WHERE id_gastos = ?
`;

    const queryParams = [
        zona_diario,
        salario_diario,
        carga_prestacional_diario,
        desayuno_diario,
        almuerzo_diario,
        cena_diario,
        refrigerio_diario,
        hidratacion_diario,
        hielo_diario,
        hotel_diario,
        lavanderia_diario,
        transporte_diario,
        epp_diario,
        kit_bioseguridad_diario,
        requerimiento_ingreso_diario,
        id_gastos,
    ];

    db_con.query(updateQuery, queryParams, (err, results) => {
        if (err) {
            console.error('Error al actualizar gasto diario:', err);
            return res.status(500).json({ error: 'Error al actualizar gasto diario' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Gasto diario no encontrado' });
        }

        res.json({ message: 'Gasto diario actualizado correctamente' });
    });
});

/* -------------------------- APARTADO DE MANO DE OBRA EN LAS APU ---------------------------------- */

app.get('/totalGastos/:id_gastos', (req, res) => {

    const { id_gastos } = req.params;

    console.log('ID de gastos:', id_gastos);

    const query = `
    SELECT 
        (salario_diario + 
        carga_prestacional_diario + 
        desayuno_diario + 
        almuerzo_diario + 
        cena_diario + 
        refrigerio_diario + 
        hidratacion_diario + 
        hielo_diario + 
        hotel_diario + 
        lavanderia_diario + 
        transporte_diario + 
        epp_diario + 
        kit_bioseguridad_diario + 
        requerimiento_ingreso_diario) AS total_gastos
    FROM 
        gastos_diarios
    WHERE 
        id_gastos = ?;
`;

    console.log('Query:', query);


    db_con.query(query, [id_gastos], (err, results) => {

        if (err) {
            console.error('Error al obtener el total de gastos:', err);
            return res.status(500).send('Error al obtener el total de gastos');
        }

        console.log('Total de gastos:', results);

        if (results.length === 0) {
            return res.status(404).send('Gasto no encontrado');
        }

        res.json({ total_gastos: results[0].total_gastos });

    });
});

const startServer = (PORT) => {

    const server = app.listen(PORT, () => {
        console.log(`El servidor está corriendo en el puerto ${PORT} ...`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`El puerto ${PORT} está en uso, intentando con el puerto ${PORT + 1}...`);
            PORT += 1;
            startServer(PORT);
        } else {
            console.error('Error al iniciar el servidor:', err);
        }
    });
};

startServer(PORT);
