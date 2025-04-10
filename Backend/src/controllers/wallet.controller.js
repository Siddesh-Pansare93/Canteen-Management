import User from '../models/user.model.js';

/**
 * Add funds to user wallet
 */
export const addFunds = async (req, res) => {
  try {
    const { uid, amount } = req.body;

    if (!uid || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid UID and positive amount are required"
      });
    }

    const user = await User.findOne({ uid });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Update wallet balance
    user.walletBalance += Number(amount);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Funds added successfully",
      walletBalance: user.walletBalance
    });
  } catch (error) {
    console.error("Error adding funds:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

/**
 * Deduct funds from user wallet for purchase
 */
export const deductFunds = async (req, res) => {
  try {
    const { uid, amount } = req.body;

    if (!uid || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid UID and positive amount are required"
      });
    }

    const user = await User.findOne({ uid });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if user has sufficient balance
    if (user.walletBalance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient wallet balance"
      });
    }

    // Deduct from wallet balance
    user.walletBalance -= Number(amount);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Payment successful",
      walletBalance: user.walletBalance
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

/**
 * Get user's current wallet balance
 */
export const getWalletBalance = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const user = await User.findOne({ uid });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      walletBalance: user.walletBalance
    });
    
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
