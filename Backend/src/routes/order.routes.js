import express from 'express';
import { 
  createOrder, 
  getOrders, 
  getOrderById, 
  updateOrderStatus,
  getUserOrders
} from '../controllers/order.controller.js';

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Get all orders (with optional filters)
router.get('/', getOrders);

// Get a single order by ID
router.get('/:id', getOrderById);

// Update order status
router.patch('/:id/status', updateOrderStatus);

// Get user's order history
router.get('/user/:uid', getUserOrders);

export default router;
