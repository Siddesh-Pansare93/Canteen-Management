import express from 'express';
import { updateSeatData, getSeatData } from '../controllers/seat.controller.js';

const router = express.Router();

// Endpoint for Fast API to send seat data updates
router.post('/update', updateSeatData);

// Endpoint for frontend to fetch latest seat data
router.get('/', getSeatData);

export default router;
