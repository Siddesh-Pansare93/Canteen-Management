import React, { useState } from "react";
import MenuItems from "../Components/MenuItems";

const categories = ["All", ...new Set(MenuItems.map((item) => item.category))];

export default function Menu() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("default");
    const [cart, setCart] = useState([]);

    const handleAddToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const filteredItems = MenuItems
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

            {/* Cart Summary */}
            <div className="fixed bottom-4 right-4 bg-white rounded-2xl shadow-xl p-4 w-64 z-50">
                <h3 className="text-lg font-bold text-[#2c2c5b] mb-2">🛒 Cart</h3>
                {cart.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty</p>
                ) : (
                    <ul className="space-y-1 max-h-40 overflow-y-auto">
                        {cart.map((item, idx) => (
                            <li key={idx} className="text-sm text-[#2c2c5b]">
                                {item.name} - ₹{item.price}
                            </li>
                        ))}
                    </ul>
                )}
                {cart.length > 0 && (
                    <div className="mt-2 text-right text-sm font-semibold">
                        Total: ₹{cart.reduce((sum, i) => sum + i.price, 0)}
                    </div>
                )}
            </div>
        </div>
    );
}