import { useState } from "react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([
    {
      id: "order-3",
      customer: "Student User",
      role: "Student",
      items: ["Samosa x 2"],
      total: 40,
      status: "Preparing",
    },
    {
      id: "order-2",
      customer: "Teacher User",
      role: "Teacher",
      items: ["Veg Thali x 1", "Coffee x 1"],
      total: 140,
      status: "Ready",
    },
    {
      id: "order-1",
      customer: "Student User",
      role: "Student",
      items: ["Masala Dosa x 1", "Masala Chai x 1"],
      total: 75,
      status: "Completed",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const statusColor = {
    Pending: "text-gray-500",
    Preparing: "bg-[#fec723] text-[#2c2c5b]",
    Ready: "bg-green-200 text-green-700",
    Completed: "bg-gray-200 text-[#2c2c5b]",
  };

  const filteredOrders = orders; // for tabs in future

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-[#2c2c5b] mb-6">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Orders", value: orders.length },
          {
            label: "Pending Orders",
            value: orders.filter((o) => o.status === "Pending").length,
          },
          {
            label: "Preparing",
            value: orders.filter((o) => o.status === "Preparing").length,
          },
          {
            label: "Ready for Pickup",
            value: orders.filter((o) => o.status === "Ready").length,
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#a3a3b2] rounded-lg p-4 text-center shadow-sm"
          >
            <p className="text-[#a3a3b2] text-sm">{stat.label}</p>
            <p className="text-xl font-semibold text-[#2c2c5b]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Order Management */}
      <div className="bg-white border border-[#a3a3b2] rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-[#2c2c5b] mb-1">Order Management</h2>
        <p className="text-sm text-[#a3a3b2] mb-4">Manage all customer orders</p>

        {/* Table Head */}
        <div className="grid grid-cols-6 font-semibold text-[#2c2c5b] border-b pb-2 mb-2">
          <span>Order ID</span>
          <span>Customer</span>
          <span className="col-span-2">Items</span>
          <span>Total</span>
          <span>Status</span>
        </div>

        {/* Table Rows */}
        {filteredOrders.map((order, idx) => (
          <div
            key={order.id}
            className="grid grid-cols-6 items-center text-sm border-b py-2 text-[#2c2c5b]"
          >
            <span className="text-[#fec723] font-semibold">#{order.id}</span>
            <div>
              <p>{order.customer}</p>
              <p className="text-xs text-[#a3a3b2]">{order.role}</p>
            </div>
            <div className="col-span-2">
              {order.items.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
            <span>₹{order.total}</span>

            {/* Status + Actions */}
            <div className="flex flex-col gap-1">
              <span
                className={`text-xs px-2 py-1 rounded-full text-center ${statusColor[order.status]}`}
              >
                {order.status}
              </span>

              {order.status === "Preparing" && (
                <div className="flex gap-1">
                  <button
                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                    onClick={() => updateStatus(order.id, "Ready")}
                  >
                    Mark Ready
                  </button>
                  <button
                    className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded"
                    onClick={() => updateStatus(order.id, "Cancelled")}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {order.status === "Ready" && (
                <button
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                  onClick={() => updateStatus(order.id, "Completed")}
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
