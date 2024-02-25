import express from 'express';
import { create, getEducation, updateEducation } from '../controllers/education.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, create);
router.get('/', verifyToken, getEducation);
router.put('/:educationId', verifyToken, updateEducation);

export default router;