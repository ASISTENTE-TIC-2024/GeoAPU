import express from 'express';
import { upload, getImages, uploadFile } from '../controller/image.controller.js';

const routes = express.Router();

routes.post(
    "/images/:tabla",
    upload,
    uploadFile
);

routes.get("/images", getImages);

export default routes;