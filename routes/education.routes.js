import express from 'express';
import { create } from '../controllers/education.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', verifyToken, create);

export default router;