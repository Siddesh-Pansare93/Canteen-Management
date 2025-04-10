import express from 'express';
import { registerUser, getUserByUid, deleteUser } from '../controllers/auth.controller.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Get user by Firebase UID
router.get('/user/:uid', getUserByUid);

// Delete user by Firebase UID
router.delete('/user/:uid', deleteUser);

export default router;
