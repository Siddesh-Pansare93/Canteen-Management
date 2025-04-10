const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Register a new user in the backend after Firebase registration
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to register user');
    }
    
    return data;
  } catch (error) {
    console.error('API Error in registerUser:', error);
    throw error;
  }
};

/**
 * Fetch user data from backend using Firebase UID
 */
export const getUserByUid = async (uid) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/user/${uid}`);
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user');
    }
    
    return data.user;
  } catch (error) {
    console.error('API Error in getUserByUid:', error);
    throw error;
  }
};

/**
 * Delete user account from backend database
 */
export const deleteUserFromDb = async (uid) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/user/${uid}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete user from database');
    }
    
    return data;
  } catch (error) {
    console.error('API Error in deleteUserFromDb:', error);
    throw error;
  }
};

/**
 * Add funds to user's wallet
 */
export const addFundsToWallet = async (uid, amount) => {
  try {
    const response = await fetch(`${API_BASE_URL}/wallet/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, amount }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add funds to wallet');
    }
    
    return data;
  } catch (error) {
    console.error('API Error in addFundsToWallet:', error);
    throw error;
  }
};

/**
 * Process a payment by deducting funds from user's wallet
 */
export const processWalletPayment = async (uid, amount) => {
  try {
    const response = await fetch(`${API_BASE_URL}/wallet/deduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, amount }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Payment failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error in processWalletPayment:', error);
    throw error;
  }
};

/**
 * Get user's current wallet balance
 */
export const getWalletBalance = async (uid) => {
  try {
    const response = await fetch(`${API_BASE_URL}/wallet/${uid}`);
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch wallet balance');
    }
    
    return data.walletBalance;
  } catch (error) {
    console.error('API Error in getWalletBalance:', error);
    throw error;
  }
};
