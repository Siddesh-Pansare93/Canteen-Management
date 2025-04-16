// MenuItems.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import pohaImg from "../Assets/Pics/poha.png";
import upmaImg from "../Assets/Pics/upma.png";
import parathaImg from "../Assets/Pics/paratha.png";
import dhoklaImg from "../Assets/Pics/dhokla.png";
import aloopuriImg from "../Assets/Pics/aloopuri.png";
import idliImg from "../Assets/Pics/idli.png";
import masaladosaImg from "../Assets/Pics/masaladosa.png";
import paneersandwichImg from "../Assets/Pics/paneersandwich.png";
import vegcutletImg from "../Assets/Pics/vegcutlet.png";
import breadomeletteImg from "../Assets/Pics/breadomlette.png";

import samosaImg from "../Assets/Pics/samosa.png";
import kachoriImg from "../Assets/Pics/kachori.png";
import springrollImg from "../Assets/Pics/springroll.png";
import friesImg from "../Assets/Pics/frenchfries.png";
import vadapavImg from "../Assets/Pics/vadapav.png";
import pavbhajiImg from "../Assets/Pics/pavbhaji.png";
import bhelpuriImg from "../Assets/Pics/bhelpuri.png";
import sevpuriImg from "../Assets/Pics/shevpuri.png";
import cheeseballsImg from "../Assets/Pics/cheeseballs.png";
import pakoraImg from "../Assets/Pics/pakora.png";

import vegthaliImg from "../Assets/Pics/vegthali.png";
import paneerImg from "../Assets/Pics/paneer.png";
import daltadkaImg from "../Assets/Pics/daltadka.png";
import cholebhatureImg from "../Assets/Pics/cholebhature.png";
import jeerariceImg from "../Assets/Pics/jeerarice.png";
import rajmaImg from "../Assets/Pics/rajma.png";
import aloomatarImg from "../Assets/Pics/aloomatar.png";
import mixvegImg from "../Assets/Pics/mixveg.png";
import bhindifryImg from "../Assets/Pics/bhindifry.png";
import chapatiImg from "../Assets/Pics/chapati.png";

import lassiImg from "../Assets/Pics/lassi.png";
import coldcoffeeImg from "../Assets/Pics/coldcoffee.png";
import chaiImg from "../Assets/Pics/chai.png";
import nimbupaniImg from "../Assets/Pics/nimbupani.png";
import milkshakeImg from "../Assets/Pics/milkshake.png";

import gulabjamunImg from "../Assets/Pics/gulabjamun.png";
import rasgullaImg from "../Assets/Pics/rasgulla.png";
import kheerImg from "../Assets/Pics/kheer.png";
import halwaImg from "../Assets/Pics/halwa.png";
import icecreamImg from "../Assets/Pics/icecream.png";

import saladImg from "../Assets/Pics/salad.png";
import papadImg from "../Assets/Pics/papad.png";
import raitaImg from "../Assets/Pics/raita.png";
import pickleImg from "../Assets/Pics/pickle.png";
import butternaanImg from "../Assets/Pics/butternaan.png";
import tandoorirotiImg from "../Assets/Pics/tandooriroti.png";
import curdImg from "../Assets/Pics/curd.png";
import sweetcornImg from "../Assets/Pics/sweetcorn.png";
import paneerrollImg from "../Assets/Pics/paneerroll.png";
import cakeImg from "../Assets/Pics/cake.png";
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';

// Create a context for menu items
const MenuItemsContext = createContext();

// Initial menu items data
const initialMenuItems = [
  // Breakfast
  { id: 1, name: "Poha", category: "Breakfast", price: 57, image: pohaImg },
  { id: 2, name: "Upma", category: "Breakfast", price: 105, image: upmaImg },
  { id: 3, name: "Paratha", category: "Breakfast", price: 35, image: parathaImg },
  { id: 4, name: "Dhokla", category: "Breakfast", price: 117, image: dhoklaImg },
  { id: 5, name: "Aloo Puri", category: "Breakfast", price: 145, image: aloopuriImg },
  { id: 6, name: "Idli Sambhar", category: "Breakfast", price: 80, image: idliImg },
  { id: 7, name: "Masala Dosa", category: "Breakfast", price: 90, image: masaladosaImg },
  { id: 8, name: "Paneer Sandwich", category: "Breakfast", price: 60, image: paneersandwichImg },
  { id: 9, name: "Veg Cutlet", category: "Breakfast", price: 45, image: vegcutletImg },
  { id: 10, name: "Bread Omelette", category: "Breakfast", price: 50, image: breadomeletteImg },

  // Snacks
  { id: 11, name: "Samosa", category: "Snacks", price: 20, image: samosaImg },
  { id: 12, name: "Kachori", category: "Snacks", price: 25, image: kachoriImg },
  { id: 13, name: "Spring Roll", category: "Snacks", price: 35, image: springrollImg },
  { id: 14, name: "French Fries", category: "Snacks", price: 55, image: friesImg },
  { id: 15, name: "Vada Pav", category: "Snacks", price: 15, image: vadapavImg },
  { id: 16, name: "Pav Bhaji", category: "Snacks", price: 70, image: pavbhajiImg },
  { id: 17, name: "Bhel Puri", category: "Snacks", price: 30, image: bhelpuriImg },
  { id: 18, name: "Sev Puri", category: "Snacks", price: 35, image: sevpuriImg },
  { id: 19, name: "Cheese Balls", category: "Snacks", price: 65, image: cheeseballsImg },
  { id: 20, name: "Pakora", category: "Snacks", price: 40, image: pakoraImg },

  // Lunch
  { id: 21, name: "Veg Thali", category: "Lunch", price: 150, image: vegthaliImg },
  { id: 22, name: "Paneer Butter Masala", category: "Lunch", price: 130, image: paneerImg },
  { id: 23, name: "Dal Tadka", category: "Lunch", price: 90, image: daltadkaImg },
  { id: 24, name: "Chole Bhature", category: "Lunch", price: 100, image: cholebhatureImg },
  { id: 25, name: "Jeera Rice", category: "Lunch", price: 60, image: jeerariceImg },
  { id: 26, name: "Rajma Chawal", category: "Lunch", price: 110, image: rajmaImg },
  { id: 27, name: "Aloo Matar", category: "Lunch", price: 75, image: aloomatarImg },
  { id: 28, name: "Mix Veg", category: "Lunch", price: 95, image: mixvegImg },
  { id: 29, name: "Bhindi Fry", category: "Lunch", price: 85, image: bhindifryImg },
  { id: 30, name: "Chapati", category: "Lunch", price: 10, image: chapatiImg },

  // Beverages
  { id: 31, name: "Lassi", category: "Beverages", price: 35, image: lassiImg },
  { id: 32, name: "Cold Coffee", category: "Beverages", price: 50, image: coldcoffeeImg },
  { id: 33, name: "Masala Chai", category: "Beverages", price: 20, image: chaiImg },
  { id: 34, name: "Nimbu Pani", category: "Beverages", price: 25, image: nimbupaniImg },
  { id: 35, name: "Milkshake", category: "Beverages", price: 60, image: milkshakeImg },

  // Desserts
  { id: 36, name: "Gulab Jamun", category: "Desserts", price: 30, image: gulabjamunImg },
  { id: 37, name: "Rasgulla", category: "Desserts", price: 35, image: rasgullaImg },
  { id: 38, name: "Kheer", category: "Desserts", price: 40, image: kheerImg },
  { id: 39, name: "Halwa", category: "Desserts", price: 35, image: halwaImg },
  { id: 40, name: "Ice Cream", category: "Desserts", price: 50, image: icecreamImg },

  // Extras
  { id: 41, name: "Green Salad", category: "Extras", price: 25, image: saladImg },
  { id: 42, name: "Papad", category: "Extras", price: 10, image: papadImg },
  { id: 43, name: "Raita", category: "Extras", price: 30, image: raitaImg },
  { id: 44, name: "Pickle", category: "Extras", price: 5, image: pickleImg },
  { id: 45, name: "Butter Naan", category: "Extras", price: 25, image: butternaanImg },
  { id: 46, name: "Tandoori Roti", category: "Extras", price: 15, image: tandoorirotiImg },
  { id: 47, name: "Curd", category: "Extras", price: 20, image: curdImg },
  { id: 48, name: "Sweet Corn", category: "Extras", price: 40, image: sweetcornImg },
  { id: 49, name: "Paneer Roll", category: "Extras", price: 60, image: paneerrollImg },
  { id: 50, name: "Chocolate Cake", category: "Desserts", price: 70, image: cakeImg },
];

// Create a provider component
export const MenuItemsProvider = ({ children }) => {
  // Try to load menu items from localStorage, fall back to initialMenuItems
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem('menuItems');
      return savedItems ? JSON.parse(savedItems) : initialMenuItems;
    } catch (error) {
      console.error('Error loading menu items from localStorage:', error);
      return initialMenuItems;
    }
  });
  
  // Try to load the nextId from localStorage, or use 51 as fallback
  const [nextId, setNextId] = useState(() => {
    try {
      const savedNextId = localStorage.getItem('menuNextId');
      return savedNextId ? parseInt(savedNextId) : 51;
    } catch (error) {
      console.error('Error loading nextId from localStorage:', error);
      return 51;
    }
  });
  
  // Save to localStorage whenever menuItems or nextId changes
  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);
  
  useEffect(() => {
    localStorage.setItem('menuNextId', nextId.toString());
  }, [nextId]);
  
  // Add a new menu item
  const addMenuItem = (newItem) => {
    const itemWithId = { ...newItem, id: nextId };
    const updatedItems = [...menuItems, itemWithId];
    setMenuItems(updatedItems);
    setNextId(nextId + 1);
    return itemWithId;
  };
  
  // Update an existing menu item
  const updateMenuItem = (updatedItem) => {
    const updatedItems = menuItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    setMenuItems(updatedItems);
    return updatedItem;
  };
  
  // Delete a menu item
  const deleteMenuItem = (id) => {
    const updatedItems = menuItems.filter(item => item.id !== id);
    setMenuItems(updatedItems);
  };
  
  return (
    <MenuItemsContext.Provider value={{ 
      menuItems, 
      addMenuItem, 
      updateMenuItem, 
      deleteMenuItem 
    }}>
      {children}
    </MenuItemsContext.Provider>
  );
};

// Custom hook for using the menu items context
export const useMenuItems = () => useContext(MenuItemsContext);

// Admin UI for managing menu items
export const MenuItemsAdmin = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useMenuItems();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Breakfast',
    price: '',
    image: null
  });
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['Breakfast', 'Snacks', 'Lunch', 'Beverages', 'Desserts', 'Extras'];
  
  // Filter menu items based on search and category
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
          setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else if (name === 'price') {
      setFormData({ ...formData, [name]: parseFloat(value) || '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.image) {
      alert('Please fill out all fields and upload an image');
      return;
    }

    if (editMode) {
      updateMenuItem({ ...formData, id: editItemId });
      alert('Menu item updated successfully!');
    } else {
      addMenuItem(formData);
      alert('Menu item added successfully!');
    }

    // Reset the form
    setFormData({
      name: '',
      category: 'Breakfast',
      price: '',
      image: null
    });
    setPreviewImage(null);
    setEditMode(false);
    setEditItemId(null);
    setShowForm(false);
  };

  // Initialize edit mode
  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image
    });
    setPreviewImage(item.image);
    setEditMode(true);
    setEditItemId(item.id);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMenuItem(id);
      alert('Menu item deleted successfully!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-[#2c2c5b]">Menu Item Management</h2>
      
      <div className="flex flex-wrap items-center justify-between mb-6">
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#2c2c5b] text-white px-4 py-2 rounded-lg hover:bg-[#fec723] hover:text-[#2c2c5b] transition"
        >
          {showForm ? 'Hide Form' : 'Add New Item'}
        </button>

        <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search items..."
            className="px-3 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="All">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">{editMode ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Item name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Price"
                    min="0"
                    step="5"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full px-3 py-2"
                  accept="image/*"
                />
                
                {previewImage && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preview</label>
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="h-40 w-auto object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                type="submit"
                className="bg-[#2c2c5b] text-white px-4 py-2 rounded-lg hover:bg-[#fec723] hover:text-[#2c2c5b] transition"
              >
                {editMode ? 'Update Item' : 'Add Item'}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditMode(false);
                  setFormData({
                    name: '',
                    category: 'Breakfast',
                    price: '',
                    image: null
                  });
                  setPreviewImage(null);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <FiEdit className="inline mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="inline mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No menu items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// For backward compatibility, export the function to get menu items
export default function getMenuItems() {
  // Try to get from localStorage first
  try {
    const savedItems = localStorage.getItem('menuItems');
    if (savedItems) {
      return JSON.parse(savedItems);
    }
  } catch (error) {
    console.error('Error retrieving menu items from localStorage:', error);
  }
  
  // Fall back to initial items if localStorage fails
  return initialMenuItems;
}
