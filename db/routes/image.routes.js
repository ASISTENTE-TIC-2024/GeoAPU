import express from 'express';
import { upload, getImages, uploadFile } from '../controller/image.controller.js';

const router = express.Router();

router.post('/upload', upload, uploadFile);
router.get('/images', getImages);

export default router;