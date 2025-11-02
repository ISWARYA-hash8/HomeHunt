import express from 'express';
import { VerifyToken } from '../utils/verifyUser.js';
import { createListing } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create',VerifyToken,createListing);

export default router;