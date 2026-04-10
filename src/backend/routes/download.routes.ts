import express from 'express';
import { download } from '../controllers/DownloadController';

const router = express.Router();

router.get('/:id', download);

export const downloadRoutes = router;
