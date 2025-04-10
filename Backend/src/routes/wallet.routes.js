import express from 'express';
import { addFunds, deductFunds, getWalletBalance } from '../controllers/wallet.controller.js';

const router = express.Router();

// Add funds to wallet
router.post('/add', addFunds);

// Deduct funds from wallet (for purchases)
router.post('/deduct', deductFunds);

// Get wallet balance
router.get('/:uid', getWalletBalance);

export default router;
