import { FaUtensils, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const features = [
  {
    icon: <FaUtensils className="text-purple-400 text-2xl" />,
    title: 'Quick Ordering',
    description: 'Order ahead and skip the line',
  },
  {
    icon: <FaMapMarkerAlt className="text-purple-400 text-2xl" />,
    title: 'Seat Availability',
    description: '38 of 62 seats available',
  },
  {
    icon: <FaClock className="text-purple-400 text-2xl" />,
    title: 'Preparation Time',
    description: 'Real-time order status updates',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 hover:shadow-xl transition duration-300"
          >
            <div className="bg-purple-200 p-3 rounded-full">
              {feature.icon}
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#2c2c5b]">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
