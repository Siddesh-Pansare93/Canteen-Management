import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getUserOrders } from '../services/api';
import Banner from '../Components/Banner';
import HowItWorks from '../Components/HowItWorks';
import PopularItems from '../Components/PopularItems';
import FeaturesSection from '../Components/FeaturesSection';

const Home = () => {
  const { user, isLoggedIn } = useAuth();
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      if (isLoggedIn && user?.uid) {
        try {
          setLoading(true);
          const orders = await getUserOrders(user.uid);
          // Get only recent orders (last 3)
          setRecentOrders(orders.slice(0, 3));
        } catch (error) {
          console.error("Failed to fetch recent orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecentOrders();
  }, [isLoggedIn, user?.uid]);

  return (
    <div className="bg-white text-gray-800">
      <Banner />
      <HowItWorks />
      
      {/* Recent Orders Section for Logged-in Users */}
      {isLoggedIn && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#2c2c5b]">Your Recent Orders</h2>
            <Link to="/orders" className="text-[#fec723] hover:underline flex items-center">
              View All <span className="ml-1">→</span>
            </Link>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2c2c5b]"></div>
            </div>
          ) : recentOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentOrders.map(order => (
                <Link 
                  key={order._id} 
                  to="/orders" 
                  className="bg-white rounded-lg border p-4 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#fec723] font-semibold">{order.orderNumber}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Preparing' ? 'bg-[#fec723] text-[#2c2c5b]' :
                      order.status === 'Ready' ? 'bg-green-100 text-green-800' :
                      order.status === 'Completed' ? 'bg-blue-100 text-blue-600' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="font-medium mt-2">₹{order.totalAmount.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
              <Link to="/menu" className="bg-[#2c2c5b] text-white px-4 py-2 rounded hover:bg-[#fec723] hover:text-[#2c2c5b] transition">
                Browse Menu
              </Link>
            </div>
          )}
        </div>
      )}
      
      <PopularItems />
      <FeaturesSection />
    </div>
  );
};

export default Home;
