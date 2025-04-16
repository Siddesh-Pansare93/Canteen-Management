import React from 'react';
import { MenuItemsProvider, MenuItemsAdmin } from '../Components/MenuItems';

const AdminMenuManagement = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2c2c5b]">Menu Management</h1>
          <p className="text-gray-600 mt-2">Add, edit, and delete items from your canteen menu.</p>
        </div>
        
        <MenuItemsProvider>
          <MenuItemsAdmin />
        </MenuItemsProvider>
      </div>
    </div>
  );
};

export default AdminMenuManagement;
