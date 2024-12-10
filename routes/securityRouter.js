import express from 'express';
import SecurityController from '../controllers/securityController.js';

const router = express.Router();

router.post('/authentication', SecurityController.authenticate);

export default router;
