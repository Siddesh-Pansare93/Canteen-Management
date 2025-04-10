import { useState, useEffect } from "react";
import { getOrders, updateOrderStatus } from "../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { 
  FiRefreshCw, FiClock, FiCheckCircle, 
  FiTruck, FiShoppingBag, FiFilter, FiSearch, FiX 
} from "react-icons/fi";

const AdminDashboard = () => {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('pending');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const getStatusFromFilter = (filter) => {
    switch(filter) {
      case 'pending': return 'Pending';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready';
      case 'completed': return 'Completed';
      default: return null;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const allOrdersResponse = await getOrders();
        setAllOrders(allOrdersResponse);
        if (activeFilter !== 'all') {
          const status = getStatusFromFilter(activeFilter);
          const filteredResponse = await getOrders({ status });
          setFilteredOrders(filteredResponse);
        } else {
          setFilteredOrders(allOrdersResponse);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [activeFilter, refreshTrigger]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const lowercasedSearch = searchTerm.toLowerCase();
    const results = allOrders.filter(order => 
      order.orderNumber.toLowerCase().includes(lowercasedSearch) ||
      order.customerName.toLowerCase().includes(lowercasedSearch) ||
      order.customerEmail.toLowerCase().includes(lowercasedSearch) ||
      order.items.some(item => item.name.toLowerCase().includes(lowercasedSearch))
    );
    setSearchResults(results);
  }, [searchTerm, allOrders]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(
        <div className="flex items-center">
          <span className="mr-2">Order status updated to</span>
          <span className={`px-2 py-0.5 rounded-full text-sm ${getStatusColor(newStatus)}`}>
            {newStatus}
          </span>
        </div>, 
        { position: "bottom-right" }
      );
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Preparing': return 'bg-[#fec723] text-[#2c2c5b]';
      case 'Ready': return 'bg-green-100 text-green-700';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <FiClock />;
      case 'Preparing': return <FiTruck className="animate-pulse" />;
      case 'Ready': return <FiShoppingBag className="text-green-600" />;
      case 'Completed': return <FiCheckCircle className="text-blue-600" />;
      default: return <FiClock />;
    }
  };

  const totalOrders = allOrders.length;
  const pendingOrders = allOrders.filter(o => o.status === 'Pending').length;
  const preparingOrders = allOrders.filter(o => o.status === 'Preparing').length;
  const readyOrders = allOrders.filter(o => o.status === 'Ready').length;
  const completedOrders = allOrders.filter(o => o.status === 'Completed').length;

  const displayedOrders = isSearching ? searchResults : filteredOrders;

  return (
    <motion.div 
      className="max-w-7xl mx-auto mt-10 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-[#2c2c5b] mb-6">Order Management Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Total Orders", value: totalOrders, color: "bg-gray-100", icon: "📊", onClick: () => setActiveFilter('all') },
          { label: "Pending", value: pendingOrders, color: "bg-yellow-100", icon: "⏱️", onClick: () => setActiveFilter('pending') },
          { label: "Preparing", value: preparingOrders, color: "bg-[#fef5d6]", icon: "👨‍🍳", onClick: () => setActiveFilter('preparing') },
          { label: "Ready", value: readyOrders, color: "bg-green-100", icon: "✅", onClick: () => setActiveFilter('ready') },
          { label: "Completed", value: completedOrders, color: "bg-blue-100", icon: "🏁", onClick: () => setActiveFilter('completed') },
        ].map((stat, idx) => (
          <motion.button
            key={idx}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={stat.onClick}
            className={`${stat.color} border rounded-lg p-4 text-center shadow-sm ${activeFilter === stat.label.toLowerCase() ? 'ring-2 ring-blue-500' : ''} hover:bg-opacity-80 transition-all`}
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <p className="text-sm font-medium">{stat.label}</p>
            <motion.p 
              className="text-2xl font-semibold text-[#2c2c5b]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {stat.value}
            </motion.p>
          </motion.button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
            <FiFilter className="mr-2 text-[#2c2c5b]" />
            <button
              className={`px-3 py-1 mr-2 rounded-full text-sm ${activeFilter === 'pending' ? 'bg-yellow-100 text-yellow-800 font-medium' : 'bg-gray-100'}`}
              onClick={() => setActiveFilter('pending')}
            >
              Pending
            </button>
            <button
              className={`px-3 py-1 mr-2 rounded-full text-sm ${activeFilter === 'preparing' ? 'bg-[#fec723] text-[#2c2c5b] font-medium' : 'bg-gray-100'}`}
              onClick={() => setActiveFilter('preparing')}
            >
              Preparing
            </button>
            <button
              className={`px-3 py-1 mr-2 rounded-full text-sm ${activeFilter === 'ready' ? 'bg-green-100 text-green-700 font-medium' : 'bg-gray-100'}`}
              onClick={() => setActiveFilter('ready')}
            >
              Ready
            </button>
            <button
              className={`px-3 py-1 mr-2 rounded-full text-sm ${activeFilter === 'completed' ? 'bg-blue-100 text-blue-600 font-medium' : 'bg-gray-100'}`}
              onClick={() => setActiveFilter('completed')}
            >
              Completed
            </button>
            <button
              className={`px-3 py-1 mr-2 rounded-full text-sm ${activeFilter === 'all' ? 'bg-purple-100 text-purple-600 font-medium' : 'bg-gray-100'}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
          </div>

          <div className="flex items-center w-full md:w-auto">
            <div className="relative flex-grow md:max-w-xs">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search orders..."
                className="w-full px-3 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c2c5b]"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              {searchTerm && (
                <button 
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setSearchTerm('')}
                >
                  <FiX className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setRefreshTrigger(prev => prev + 1)} 
              className="flex items-center gap-2 bg-[#2c2c5b] text-white ml-2 px-4 py-2 rounded-md hover:bg-[#3d3d7a] transition"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      <motion.div 
        className="mb-8 p-4 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-md font-medium mb-4">Order Processing Flow</h3>
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center">
          <div className="flex flex-col items-center px-4 py-2 relative">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-xl">⏱️</div>
            <p className="mt-2 text-sm font-medium">Pending</p>
            <p className="text-xs text-gray-500">New orders</p>
          </div>
          
          <motion.div 
            className="w-8 h-1 bg-gray-300 hidden md:block"
            animate={{ width: [0, 32] }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          
          <div className="flex flex-col items-center px-4 py-2">
            <div className="w-12 h-12 rounded-full bg-[#fef5d6] flex items-center justify-center text-xl">👨‍🍳</div>
            <p className="mt-2 text-sm font-medium">Preparing</p>
            <p className="text-xs text-gray-500">In the kitchen</p>
          </div>
          
          <motion.div 
            className="w-8 h-1 bg-gray-300 hidden md:block"
            animate={{ width: [0, 32] }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />
          
          <div className="flex flex-col items-center px-4 py-2">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">✅</div>
            <p className="mt-2 text-sm font-medium">Ready</p>
            <p className="text-xs text-gray-500">For pickup</p>
          </div>
          
          <motion.div 
            className="w-8 h-1 bg-gray-300 hidden md:block"
            animate={{ width: [0, 32] }}
            transition={{ duration: 0.5, delay: 0.9 }}
          />
          
          <div className="flex flex-col items-center px-4 py-2">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">🏁</div>
            <p className="mt-2 text-sm font-medium">Completed</p>
            <p className="text-xs text-gray-500">Delivered to customer</p>
          </div>
        </div>
      </motion.div>

      <div className="bg-white border border-[#a3a3b2] rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#2c2c5b] flex items-center">
            {isSearching ? (
              <>
                <FiSearch className="mr-2" /> Search Results
              </>
            ) : (
              <>
                {activeFilter === 'pending' && <FiClock className="mr-2 text-yellow-500" />}
                {activeFilter === 'preparing' && <FiTruck className="mr-2 text-amber-500" />}
                {activeFilter === 'ready' && <FiShoppingBag className="mr-2 text-green-500" />}
                {activeFilter === 'completed' && <FiCheckCircle className="mr-2 text-blue-500" />}
                {activeFilter === 'all' && "All Orders"}
                {activeFilter === 'pending' && "Pending Orders"}
                {activeFilter === 'preparing' && "Orders Being Prepared"}
                {activeFilter === 'ready' && "Orders Ready for Pickup"}
                {activeFilter === 'completed' && "Completed Orders"}
              </>
            )}
            <span className="ml-2 text-base font-normal text-gray-500">
              ({displayedOrders.length} order{displayedOrders.length !== 1 ? 's' : ''})
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="py-8 text-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="inline-block rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2c2c5b]"
            ></motion.div>
            <p className="mt-2 text-gray-500">Loading orders...</p>
          </div>
        ) : displayedOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {isSearching ? (
              <div>
                <FiSearch className="inline-block text-4xl mb-3 text-gray-400" />
                <p>No orders found matching "{searchTerm}"</p>
              </div>
            ) : (
              <div>
                <p>No {activeFilter !== 'all' ? activeFilter : ''} orders found.</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <div className="grid grid-cols-12 font-semibold text-[#2c2c5b] border-b pb-2 mb-2">
                <span className="col-span-1">Order #</span>
                <span className="col-span-2">Customer</span>
                <span className="col-span-4">Items</span>
                <span className="col-span-1">Total</span>
                <span className="col-span-2">Status</span>
                <span className="col-span-2">Actions</span>
              </div>

              {displayedOrders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="grid grid-cols-12 items-center text-sm border-b py-3 hover:bg-gray-50 text-[#2c2c5b]"
                >
                  <span className="col-span-1 text-[#fec723] font-semibold">{order.orderNumber}</span>
                  <div className="col-span-2">
                    <p>{order.customerName}</p>
                    <p className="text-xs text-[#a3a3b2]">{order.customerEmail}</p>
                    <p className="text-xs text-[#a3a3b2]">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="col-span-4 max-h-20 overflow-auto">
                    {order.items.map((item, i) => (
                      <p key={i} className="text-xs py-0.5">
                        <span className="font-medium text-sm">{item.quantity}x</span> {item.name} 
                        <span className="text-[#a3a3b2] ml-1">₹{item.price}</span>
                      </p>
                    ))}
                  </div>
                  <span className="col-span-1 font-semibold">₹{order.totalAmount.toFixed(2)}</span>

                  <div className="col-span-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </span>
                  </div>

                  <div className="col-span-2 flex gap-1">
                    {order.status === 'Pending' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                        onClick={() => handleUpdateStatus(order._id, "Preparing")}
                      >
                        Start Preparing
                      </motion.button>
                    )}

                    {order.status === 'Preparing' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                        onClick={() => handleUpdateStatus(order._id, "Ready")}
                      >
                        Mark Ready
                      </motion.button>
                    )}

                    {order.status === 'Ready' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                        onClick={() => handleUpdateStatus(order._id, "Completed")}
                      >
                        Mark Completed
                      </motion.button>
                    )}
                    
                    {(order.status === 'Completed') && (
                      <span className="text-xs text-gray-500">No actions available</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="md:hidden space-y-4">
              {displayedOrders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="border rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                    <span className="text-[#fec723] font-semibold">{order.orderNumber}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </span>
                  </div>
                  
                  <div className="p-3">
                    <div className="mb-2">
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-[#a3a3b2]">{order.customerEmail}</p>
                      <p className="text-xs text-[#a3a3b2]">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    
                    <div className="border-t border-b py-2 my-2">
                      <p className="text-xs font-medium mb-1">Items:</p>
                      {order.items.map((item, i) => (
                        <p key={i} className="text-xs py-0.5 flex justify-between">
                          <span><span className="font-medium">{item.quantity}x</span> {item.name}</span>
                          <span>₹{item.price}</span>
                        </p>
                      ))}
                      <p className="text-sm font-semibold flex justify-between mt-2 pt-2 border-t">
                        <span>Total</span>
                        <span>₹{order.totalAmount.toFixed(2)}</span>
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {order.status === 'Pending' && (
                        <button
                          className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-200 flex-1"
                          onClick={() => handleUpdateStatus(order._id, "Preparing")}
                        >
                          Start Preparing
                        </button>
                      )}

                      {order.status === 'Preparing' && (
                        <button
                          className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full hover:bg-green-200 flex-1"
                          onClick={() => handleUpdateStatus(order._id, "Ready")}
                        >
                          Mark Ready
                        </button>
                      )}

                      {order.status === 'Ready' && (
                        <button
                          className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-200 w-full"
                          onClick={() => handleUpdateStatus(order._id, "Completed")}
                        >
                          Mark Completed
                        </button>
                      )}
                      
                      {(order.status === 'Completed') && (
                        <span className="text-xs text-gray-500 py-1">No actions available</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
