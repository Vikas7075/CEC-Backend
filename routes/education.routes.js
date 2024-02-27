import express from 'express';
import { create, deleteEducation, getEducation, updateEducation } from '../controllers/education.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, create);
router.get('/:userId', verifyToken, getEducation);
router.put('/:educationId', verifyToken, updateEducation);
router.delete('/:educationId', verifyToken, deleteEducation);

export default router;