import express from 'express'
import { create, deleteExperience, getExperience, updatedExperience } from '../controllers/experiance.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, create)
router.get('/:userId', verifyToken, getExperience)
router.put('/:experienceId', verifyToken, updatedExperience)
router.delete('/:experienceId', verifyToken, deleteExperience)

export default router;