import express from 'express'
import { create } from '../controllers/experiance.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, create)

export default router;