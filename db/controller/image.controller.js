import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file URL and convert it to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your existing code
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../images"),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Create the multer upload middleware
const upload = multer({ storage }).single('foto'); // Adjust the field name as needed

const uploadFile = (req, res) => {
    req.getConnection((err, conn) => {

        if (err) return res.status(500).send(err);

        const imagePath = `/images/${req.file.filename}`;
        const query = "INSERT INTO usuarios (foto, nombre_usuario, correo_usuario, contraseña, rol) VALUES (?, ?, ?, ?, ?)";
        const { nombre_usuario, correo_usuario, contraseña, rol } = req.body;
        conn.query(query, [imagePath, nombre_usuario, correo_usuario, contraseña, rol], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send({ message: 'Usuario agregado correctamente' });
        });


    });
};

const getImages = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        const query = "SELECT * FROM usuarios";
        conn.query(query, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    });
};

export { upload, getImages, uploadFile };