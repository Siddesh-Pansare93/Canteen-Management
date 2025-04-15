import User from '../models/user.model.js';

/**
 * Register a new user after Firebase authentication
 */
export const registerUser = async (req, res) => {
  try {
    const { uid, email, displayName = '', role = 'user', userType = 'student' } = req.body;

    // Validate required fields
    if (!uid || !email) {
      return res.status(400).json({
        success: false,
        message: "UID and email are required"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ uid }, { email }] });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    // Create new user
    const newUser = await User.create({
      uid,
      email,
      displayName,
      role,
      userType, // Include userType field
      walletBalance: 250, // Starting amount for new users
    });

    if(!newUser){
        res
        .status(401)
        .json({
            success : false , 
            message : "Failed to register User"
        })
    }

    // Return success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser
    });

  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

/**
 * Get user profile by Firebase UID
 */
export const getUserByUid = async (req, res) => {
  try {
    const { uid } = req.params;
    
    if (!uid) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const user = await User.findOne({ uid }).select('-__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
    
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

/**
 * Delete a user account from the database
 */
export const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;
    
    if (!uid) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const deletedUser = await User.findOneAndDelete({ uid });
    
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found in database"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully from database"
    });
    
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
