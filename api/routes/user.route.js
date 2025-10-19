import express from 'express';
import { test,updateUser } from '../controllers/user.controller.js';
import { VerifyToken } from '../utils/verifyUser.js';
const router =  express.Router();

router.get('/test',test);
router.post('/update/:id',VerifyToken,updateUser);

export default router;