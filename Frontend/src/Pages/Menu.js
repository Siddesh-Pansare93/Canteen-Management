import React, { useState } from "react";
import { useMenuItems } from "../Components/MenuItems";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Menu() {
    const { menuItems } = useMenuItems();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("default");
    
    // Get unique categories from current menu items
    const categories = ["All", ...new Set(menuItems.map((item) => item.category))];
    
    // Use the cart context
    const { addToCart } = useCart();

    const handleAddToCart = (item) => {
        addToCart(item);
        toast.success(`Added ${item.name} to cart!`);
    };

    const filteredItems = menuItems
        .filter((item) =>
            selectedCategory === "All" ? true : item.category === selectedCategory
        )
        .filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === "price-asc") return a.price - b.price;
            if (sortOption === "price-desc") return b.price - a.price;
            if (sortOption === "name") return a.name.localeCompare(b.name);
            return 0;
        });

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fefcea] to-[#f1da36] px-6 py-10">
            <h1 className="text-5xl font-bold text-center text-[#2c2c5b] mb-10">
                Our Menu 🍽️
            </h1>

            {/* Filter Controls */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`px-4 py-2 rounded-full font-semibold border ${
                          selectedCategory === cat
                            ? "bg-[#2c2c5b] text-white"
                            : "bg-white text-[#2c2c5b] hover:bg-[#fec723]"
                        } transition`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 max-w-6xl mx-auto">
                <input
                    type="text"
                    placeholder="Search items..."
                    className="w-full md:w-1/3 px-4 py-2 rounded-full outline-none border border-[#ccc]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="w-full md:w-1/5 px-4 py-2 rounded-full border border-[#ccc]"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="default">Sort by</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                </select>
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 w-full mx-auto">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-xl mb-3"
                        />
                        <h2 className="text-xl font-semibold text-[#2c2c5b]">
                            {item.name}
                        </h2>
                        <p className="text-sm text-gray-500 mb-1">
                            {item.category}
                        </p>
                        <div className="flex justify-between items-center mt-3">
                            <span className="text-lg font-bold text-[#ff8c00]">
                                ₹{item.price}
                            </span>
                            <button
                                onClick={() => handleAddToCart(item)}
                                className="bg-[#2c2c5b] text-white px-4 py-1 rounded-full hover:bg-[#fec723] hover:text-[#2c2c5b] transition"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}