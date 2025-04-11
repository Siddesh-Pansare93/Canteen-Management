const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

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

/**
 * Create a new order
 */
export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create order');
    }
    
    return data;
  } catch (error) {
    console.error('API Error in createOrder:', error);
    throw error;
  }
};

/**
 * Get all orders with optional filters
 * @param {Object} filters - { status, userId, limit }
 */
export const getOrders = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Add filters to query parameters if they exist
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.userId) queryParams.append('userId', filters.userId);
    if (filters.limit) queryParams.append('limit', filters.limit);
    
    const response = await fetch(`${API_BASE_URL}/orders?${queryParams.toString()}`);
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch orders');
    }
    
    return data.orders;
  } catch (error) {
    console.error('API Error in getOrders:', error);
    throw error;
  }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update order status');
    }
    
    return data.order;
  } catch (error) {
    console.error('API Error in updateOrderStatus:', error);
    throw error;
  }
};

/**
 * Get user's order history
 */
export const getUserOrders = async (uid) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/user/${uid}`);
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user orders');
    }
    
    return data.orders;
  } catch (error) {
    console.error('API Error in getUserOrders:', error);
    throw error;
  }
};

/**
 * Get latest seat availability data
 */
export const getSeatAvailability = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/seats`);
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch seat data');
    }
    
    return data.data;
  } catch (error) {
    console.error('API Error in getSeatAvailability:', error);
    throw error;
  }
};
