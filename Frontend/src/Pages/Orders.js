import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserOrders } from '../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FiRefreshCw, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'active', 'completed'

  const fetchOrders = async (showToast = false) => {
    if (user?.uid) {
      try {
        setRefreshing(true);
        const userOrders = await getUserOrders(user.uid);
        setOrders(userOrders);
        // Only show toast for manual refreshes
        if (showToast) {
          toast.success("Orders refreshed successfully");
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Could not load your orders");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  useEffect(() => {
    fetchOrders(false); // Pass false for automatic fetch on mount
  }, [user?.uid]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Preparing': return 'bg-[#fec723] text-[#2c2c5b] border-amber-400';
      case 'Ready': return 'bg-green-100 text-green-800 border-green-300';
      case 'Completed': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <FiClock className="mr-1" />;
      case 'Preparing': return <FiClock className="mr-1 animate-spin" />;
      case 'Ready': return <FiCheckCircle className="mr-1 text-green-600" />;
      case 'Completed': return <FiCheckCircle className="mr-1" />;
      case 'Cancelled': return <FiAlertCircle className="mr-1 text-red-600" />;
      default: return <FiClock className="mr-1" />;
    }
  };

  const getProgressValue = (status) => {
    switch (status) {
      case 'Pending': return 25;
      case 'Preparing': return 50;
      case 'Ready': return 75;
      case 'Completed': return 100;
      case 'Cancelled': return 100;
      default: return 0;
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-400';
      case 'Preparing': return 'bg-[#fec723]';
      case 'Ready': return 'bg-green-500';
      case 'Completed': return 'bg-blue-500';
      case 'Cancelled': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };
  
  // Filter orders based on active tab
  const filteredOrders = activeTab === 'all' 
    ? orders 
    : activeTab === 'active' 
      ? orders.filter(order => ['Pending', 'Preparing', 'Ready'].includes(order.status))
      : orders.filter(order => ['Completed', 'Cancelled'].includes(order.status));

  // Count active orders for badge
  const activeOrdersCount = orders.filter(order => 
    ['Pending', 'Preparing', 'Ready'].includes(order.status)
  ).length;

  return (
    <motion.div 
      className="max-w-5xl mx-auto mt-10 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#2c2c5b]">My Orders</h1>
        <button 
          onClick={() => fetchOrders(true)} // Pass true for manual refresh button clicks
          disabled={refreshing}
          className="flex items-center gap-2 bg-[#2c2c5b] text-white px-4 py-2 rounded-full hover:bg-[#3a3a77] transition-all disabled:bg-gray-400"
        >
          <FiRefreshCw className={`${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Tab navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`px-6 py-2 relative ${activeTab === 'all' ? 'text-[#2c2c5b] font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('all')}
        >
          All Orders
          {activeTab === 'all' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fec723]"></span>}
        </button>
        <button
          className={`px-6 py-2 relative flex items-center ${activeTab === 'active' ? 'text-[#2c2c5b] font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('active')}
        >
          Active
          {activeOrdersCount > 0 && (
            <span className="ml-2 bg-[#fec723] text-[#2c2c5b] text-xs font-semibold px-2 py-0.5 rounded-full">
              {activeOrdersCount}
            </span>
          )}
          {activeTab === 'active' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fec723]"></span>}
        </button>
        <button
          className={`px-6 py-2 relative ${activeTab === 'completed' ? 'text-[#2c2c5b] font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('completed')}
        >
          History
          {activeTab === 'completed' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fec723]"></span>}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2c2c5b]"></div>
          <p className="mt-2 text-gray-500">Loading your orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow-md">
          <h2 className="text-xl font-medium text-gray-600 mb-4">
            {activeTab === 'all' 
              ? "You haven't placed any orders yet."
              : activeTab === 'active' 
                ? "You don't have any active orders."
                : "You don't have any completed orders."}
          </h2>
          <p className="text-gray-500 mb-6">
            {activeTab === 'all' || activeTab === 'active'
              ? "Browse our menu and place your first order!"
              : "Orders that are completed or cancelled will appear here."}
          </p>
          <Link to="/menu" className="bg-[#2c2c5b] text-white px-6 py-2 rounded-md hover:bg-[#fec723] hover:text-[#2c2c5b] transition">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <motion.div 
              key={order._id} 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                <div>
                  <span className="text-[#fec723] font-semibold">{order.orderNumber}</span>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center border ${getStatusBadgeClass(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Progress Tracker - Only show for active orders */}
              {['Pending', 'Preparing', 'Ready'].includes(order.status) && (
                <div className="px-6 pt-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
                          Order Progress
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          {getProgressValue(order.status)}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressValue(order.status)}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressColor(order.status)}`}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <div className={order.status === 'Pending' ? 'font-bold text-yellow-700' : ''}>Order Placed</div>
                      <div className={order.status === 'Preparing' ? 'font-bold text-[#2c2c5b]' : ''}>Preparing</div>
                      <div className={order.status === 'Ready' ? 'font-bold text-green-700' : ''}>Ready</div>
                      <div>Completed</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="mb-4 border-b pb-4">
                  <h3 className="text-lg font-medium text-[#2c2c5b] mb-2">Items</h3>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              {(order.status === 'Ready') && (
                <div className="bg-green-50 p-4 text-center">
                  <p className="text-green-700 font-medium flex items-center justify-center">
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="inline-block mr-2"
                    >
                      🔔
                    </motion.span>
                    Your order is ready for pickup!
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Orders;
