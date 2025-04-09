import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="pt-20 bg-gradient-to-r from-[#5959b8] to-[#3333ec] text-white py-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Agnel Eats</h1>
      <p className="text-lg md:text-xl mb-8">
        Your college canteen companion for hassle-free ordering and dining
      </p>
      
    </div>
  );
};

export default Banner;
