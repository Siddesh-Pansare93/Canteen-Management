import React from 'react';
import Banner from '../Components/Banner';
import HowItWorks from '../Components/HowItWorks';
import PopularItems from '../Components/PopularItems';
import FeaturesSection from '../Components/FeaturesSection';

const Home = () => {
  return (
    <div className="bg-white text-gray-800">
      <Banner />
      <HowItWorks />
      <PopularItems />
      <FeaturesSection />
    </div>
  );
};

export default Home;
