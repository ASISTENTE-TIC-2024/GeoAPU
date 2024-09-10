import multer from 'multer';
import path from 'path';
import fs from 'fs';
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
const upload = multer({ storage }).single('file'); // Adjust the field name as needed

const uploadFile = (req, res) => {
    req.getConnection((err, conn) => {

        if (err) return res.status(500).send(err);

        const tipo_images = req.file.mimetype;
        const nombre_images = req.file.originalname;
        const imagePath = `/images/${req.file.filename}`;

        conn.query(
            "INSERT INTO " + req.params.tabla + " set ?",
            [{ tipo_images, nombre_images, imagePath }],
            (err, rows) => {
                console.log(
                    err
                        ? "Err INSERT INTO " + req.params.tabla + " " + err
                        : req.params.tabla + ": Image added!"
                );
                res.json(
                    err
                        ? { err: "Error al cargar la imagen" }
                        : { msg: "Imagen cargada satisfactoriamente" }
                );
            }
        );


    });
};

const getImages = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
        const query = "SELECT * FROM images";
        conn.query(query, (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    });
};

export { upload, getImages, uploadFile };