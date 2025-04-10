import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import DeleteAccount from '../Components/DeleteAccount';
import { Link } from 'react-router-dom';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'security', label: 'Security' },
    { id: 'danger', label: 'Danger Zone' },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-[#2c2c5b] mb-6">Account Settings</h1>
      
      <div className="flex border-b mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab.id
                ? 'border-b-2 border-[#fec723] text-[#2c2c5b]'
                : 'text-gray-500 hover:text-[#2c2c5b]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md">
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center">
                <span className="w-32 text-gray-600 font-medium">Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center">
                <span className="w-32 text-gray-600 font-medium">Name:</span>
                <span>{user?.displayName || user?.name || 'Not set'}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center">
                <span className="w-32 text-gray-600 font-medium">Role:</span>
                <span className="capitalize">{user?.role || 'User'}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center">
                <span className="w-32 text-gray-600 font-medium">Wallet Balance:</span>
                <span className="font-semibold text-green-600">₹{user?.walletBalance || 0}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Security</h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Password</h3>
              <p className="text-gray-600 mb-4">
                You can change your password to keep your account secure.
              </p>
              <Link 
                to="/change-password"
                className="bg-[#2c2c5b] text-white px-4 py-2 rounded hover:bg-[#3a3a77] inline-block"
              >
                Change Password
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'danger' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
            <DeleteAccount />
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
