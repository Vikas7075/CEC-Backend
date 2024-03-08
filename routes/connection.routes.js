import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { acceptConnectionRequest, getConnections, rejectConnectionrequest, sendConnectionRequest } from '../controllers/connectionController.js';
const router = express();

//sending connection request
router.post('/connect/:userId', verifyToken, sendConnectionRequest);
//accepting connection request
router.put('/connect/:requestId/accept', verifyToken, acceptConnectionRequest);
//rejecting connection request
router.put('/connect/:requestId/reject', verifyToken, rejectConnectionrequest);
//fetching user connections
router.get('/connections/:userId', verifyToken, getConnections);

export default router;