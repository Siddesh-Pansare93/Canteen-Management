import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserOrders } from '../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.uid) {
        try {
          setLoading(true);
          const userOrders = await getUserOrders(user.uid);
          setOrders(userOrders);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
          toast.error("Could not load your orders");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user?.uid]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Preparing': return 'bg-[#fec723] text-[#2c2c5b]';
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-[#2c2c5b] mb-6">My Orders</h1>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2c2c5b]"></div>
          <p className="mt-2 text-gray-500">Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow-md">
          <h2 className="text-xl font-medium text-gray-600 mb-4">You haven't placed any orders yet.</h2>
          <p className="text-gray-500 mb-6">Browse our menu and place your first order!</p>
          <Link to="/menu" className="bg-[#2c2c5b] text-white px-6 py-2 rounded-md hover:bg-[#fec723] hover:text-[#2c2c5b] transition">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                <div>
                  <span className="text-[#fec723] font-semibold">{order.orderNumber}</span>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

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
                  <p className="text-green-700 font-medium">
                    Your order is ready for pickup!
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
