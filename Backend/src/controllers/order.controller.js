import Order from '../models/order.model.js';
import User from '../models/user.model.js';

/**
 * Create a new order
 */
export const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    
    if (!userId || !items || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "User ID, items, and total amount are required"
      });
    }
    
    // Find the user to get their information
    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    // Check if user has enough balance
    if (user.walletBalance < totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient wallet balance"
      });
    }
    
    // Deduct the amount from user's wallet
    user.walletBalance -= totalAmount;
    await user.save();
    
    // Create the order
    const newOrder = await Order.create({
      userId: user.uid,
      customerName: user.displayName || 'User',
      customerEmail: user.email,
      items,
      totalAmount,
      status: 'Pending'
    });
    
    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
      walletBalance: user.walletBalance
    });
    
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

/**
 * Get all orders
 * Can filter by status and userId
 */
export const getOrders = async (req, res) => {
  try {
    const { status, userId } = req.query;
    const filter = {};
    
    // Add filters if provided
    if (status) filter.status = status;
    if (userId) filter.userId = userId;
    
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 }) // Most recent first
      .limit(req.query.limit ? parseInt(req.query.limit) : 100);
    
    return res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

/**
 * Get a single order by ID
 */
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    
    return res.status(200).json({
      success: true,
      order
    });
    
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required"
      });
    }
    
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return updated document
    );
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    
    // If order is cancelled, refund the amount back to user's wallet
    if (status === 'Cancelled') {
      const user = await User.findOne({ uid: order.userId });
      if (user) {
        user.walletBalance += order.totalAmount;
        await user.save();
      }
    }
    
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order
    });
    
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

/**
 * Get user's order history
 */
export const getUserOrders = async (req, res) => {
  try {
    const { uid } = req.params;
    
    if (!uid) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }
    
    const orders = await Order.find({ userId: uid })
      .sort({ createdAt: -1 }); // Most recent first
    
    return res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
    
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
