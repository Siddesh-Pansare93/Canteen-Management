import { useState, useEffect } from "react";
import { getOrders, updateOrderStatus } from "../services/api";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]); // Separate state for all orders (for stats)
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('pending'); // Default to pending
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Convert filter value to proper capitalized status
  const getStatusFromFilter = (filter) => {
    switch(filter) {
      case 'pending': return 'Pending';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return null;
    }
  };

  // Fetch all orders for stats and filtered orders for display
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        // Always fetch all orders for stats
        const allOrdersResponse = await getOrders();
        setAllOrders(allOrdersResponse);
        
        // Fetch filtered orders if not "all"
        if (activeFilter !== 'all') {
          const status = getStatusFromFilter(activeFilter);
          const filteredResponse = await getOrders({ status });
          setFilteredOrders(filteredResponse);
        } else {
          // For "all" view, use the same data
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

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      
      // Refresh both data sets after update
      setRefreshTrigger(prev => prev + 1);
      
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  // Calculate totals for dashboard stats from ALL orders
  const totalOrders = allOrders.length;
  const pendingOrders = allOrders.filter(o => o.status === 'Pending').length;
  const preparingOrders = allOrders.filter(o => o.status === 'Preparing').length;
  const readyOrders = allOrders.filter(o => o.status === 'Ready').length;
  const completedOrders = allOrders.filter(o => o.status === 'Completed').length;
  const cancelledOrders = allOrders.filter(o => o.status === 'Cancelled').length;

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-800",
    Preparing: "bg-[#fec723] text-[#2c2c5b]",
    Ready: "bg-green-200 text-green-700",
    Completed: "bg-gray-200 text-[#2c2c5b]",
    Cancelled: "bg-red-200 text-red-700"
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-[#2c2c5b] mb-6">Admin Dashboard</h1>

      {/* Stats Section - Using allOrders */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Total", value: totalOrders, color: "bg-gray-100", onClick: () => setActiveFilter('all') },
          { label: "Pending", value: pendingOrders, color: "bg-yellow-100", onClick: () => setActiveFilter('pending') },
          { label: "Preparing", value: preparingOrders, color: "bg-[#fef5d6]", onClick: () => setActiveFilter('preparing') },
          { label: "Ready", value: readyOrders, color: "bg-green-100", onClick: () => setActiveFilter('ready') },
          { label: "Completed", value: completedOrders, color: "bg-blue-100", onClick: () => setActiveFilter('completed') },
          { label: "Cancelled", value: cancelledOrders, color: "bg-red-100", onClick: () => setActiveFilter('cancelled') },
        ].map((stat, idx) => (
          <button
            key={idx}
            onClick={stat.onClick}
            className={`${stat.color} border rounded-lg p-4 text-center shadow-sm ${activeFilter === stat.label.toLowerCase() ? 'ring-2 ring-blue-500' : ''} hover:bg-opacity-80 transition-all`}
          >
            <p className="text-sm font-medium">{stat.label}</p>
            <p className="text-xl font-semibold text-[#2c2c5b]">{stat.value}</p>
          </button>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex mb-6 border-b overflow-x-auto">
        <button
          className={`px-4 py-2 whitespace-nowrap ${activeFilter === 'pending' ? 'border-b-2 border-yellow-500 font-medium' : ''}`}
          onClick={() => setActiveFilter('pending')}
        >
          Pending Orders
        </button>
        <button
          className={`px-4 py-2 whitespace-nowrap ${activeFilter === 'preparing' ? 'border-b-2 border-[#fec723] font-medium' : ''}`}
          onClick={() => setActiveFilter('preparing')}
        >
          Preparing
        </button>
        <button
          className={`px-4 py-2 whitespace-nowrap ${activeFilter === 'ready' ? 'border-b-2 border-green-500 font-medium' : ''}`}
          onClick={() => setActiveFilter('ready')}
        >
          Ready for Pickup
        </button>
        <button
          className={`px-4 py-2 whitespace-nowrap ${activeFilter === 'completed' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
          onClick={() => setActiveFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`px-4 py-2 whitespace-nowrap ${activeFilter === 'cancelled' ? 'border-b-2 border-red-500 font-medium' : ''}`}
          onClick={() => setActiveFilter('cancelled')}
        >
          Cancelled
        </button>
        <button
          className={`px-4 py-2 whitespace-nowrap ${activeFilter === 'all' ? 'border-b-2 border-purple-500 font-medium' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Orders
        </button>
      </div>

      {/* Order Flow Diagram */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-md font-medium mb-3">Order Flow:</h3>
        <div className="flex items-center justify-center text-xs md:text-sm">
          <div className="bg-yellow-100 px-3 py-1 rounded">Pending</div>
          <div className="w-5 h-0.5 bg-gray-300"></div>
          <div className="bg-[#fef5d6] px-3 py-1 rounded">Preparing</div>
          <div className="w-5 h-0.5 bg-gray-300"></div>
          <div className="bg-green-100 px-3 py-1 rounded">Ready</div>
          <div className="w-5 h-0.5 bg-gray-300"></div>
          <div className="bg-blue-100 px-3 py-1 rounded">Completed</div>
        </div>
      </div>

      {/* Order Management - Using filteredOrders */}
      <div className="bg-white border border-[#a3a3b2] rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#2c2c5b]">
            {activeFilter === 'all' ? 'All Orders' : 
             activeFilter === 'pending' ? 'Pending Orders' :
             activeFilter === 'preparing' ? 'Orders Being Prepared' :
             activeFilter === 'ready' ? 'Orders Ready for Pickup' :
             activeFilter === 'completed' ? 'Completed Orders' : 'Cancelled Orders'}
            <span className="ml-2 text-base font-normal text-gray-500">
              ({filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''})
            </span>
          </h2>
          <button 
            onClick={() => setRefreshTrigger(prev => prev + 1)} 
            className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="py-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2c2c5b]"></div>
            <p className="mt-2 text-gray-500">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No {activeFilter !== 'all' ? activeFilter : ''} orders found.
          </div>
        ) : (
          <>
            {/* Table Head */}
            <div className="grid grid-cols-7 font-semibold text-[#2c2c5b] border-b pb-2 mb-2">
              <span className="col-span-1">Order #</span>
              <span className="col-span-1">Customer</span>
              <span className="col-span-2">Items</span>
              <span className="col-span-1">Total</span>
              <span className="col-span-1">Status</span>
              <span className="col-span-1">Actions</span>
            </div>

            {/* Table Rows - Using filteredOrders */}
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="grid grid-cols-7 items-center text-sm border-b py-2 text-[#2c2c5b]"
              >
                <span className="col-span-1 text-[#fec723] font-semibold">{order.orderNumber}</span>
                <div className="col-span-1">
                  <p>{order.customerName}</p>
                  <p className="text-xs text-[#a3a3b2]">{order.customerEmail}</p>
                </div>
                <div className="col-span-2">
                  {order.items.map((item, i) => (
                    <p key={i}>{item.name} x{item.quantity}</p>
                  ))}
                </div>
                <span className="col-span-1">₹{order.totalAmount.toFixed(2)}</span>

                {/* Status */}
                <div className="col-span-1">
                  <span
                    className={`text-xs px-2 py-1 rounded-full text-center ${statusColor[order.status]}`}
                  >
                    {order.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Actions - Show only relevant actions based on current status */}
                <div className="col-span-1 flex flex-col gap-1">
                  {order.status === 'Pending' && (
                    <button
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                      onClick={() => handleUpdateStatus(order._id, "Preparing")}
                    >
                      Start Preparing
                    </button>
                  )}

                  {order.status === 'Preparing' && (
                    <>
                      <button
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                        onClick={() => handleUpdateStatus(order._id, "Ready")}
                      >
                        Mark Ready
                      </button>
                      <button
                        className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded hover:bg-red-200"
                        onClick={() => handleUpdateStatus(order._id, "Cancelled")}
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {order.status === 'Ready' && (
                    <button
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                      onClick={() => handleUpdateStatus(order._id, "Completed")}
                    >
                      Mark Completed
                    </button>
                  )}
                  
                  {(order.status === 'Completed' || order.status === 'Cancelled') && (
                    <span className="text-xs text-gray-500">No actions available</span>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
