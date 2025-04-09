import React, { useState } from "react";
import { getAuth, updatePassword } from "firebase/auth";

const ChangePassword = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(user, newPassword);
      setMessage("Password changed successfully!");
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2c2c5b] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#2c2c5b]">
          Change Password
        </h2>
        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 border border-[#a3a3b2] rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-[#fec723]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#fec723] hover:bg-[#e5b516] text-[#2c2c5b] font-bold py-2 px-4 rounded-xl transition duration-200"
          >
            Update Password
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
