import React from "react";
import { motion } from "framer-motion";

const LoginBanner = () => {
    return (
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center py-10 px-6 bg-gradient-to-r from-[#5f7aff] to-[#4346f2] text-white rounded-xl shadow-2xl w-full  "
        >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                Welcome to QuickBite 🍽️
            </h1>
            <p className="text-lg md:text-xl font-medium">
                Your one-stop app to explore delicious meals, place instant orders, and skip the queue at your campus canteen.
            </p>
            <p className="mt-4 text-md md:text-lg">
                Log in to enjoy a seamless food experience with real-time menu updates, order history, and personalized suggestions!
            </p>
        </motion.div>
    );
};

export default LoginBanner;
