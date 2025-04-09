import { FiPlus } from "react-icons/fi";
import pohaImg from "../Assets/Pics/poha.png";
import masalaDosaImg from "../Assets/Pics/masaladosa.png";
import vegThaliImg from "../Assets/Pics/vegthali.png";
import idliImg from "../Assets/Pics/idli.png";

const dishes = [
    {
      name: "Poha",
      desc: "Flattened rice with onions, peanuts and spices",
      price: 40,
      time: "10 mins",
      tag: "Popular",
      img: pohaImg,
    },
    {
      name: "Masala Dosa",
      desc: "Crispy rice crepe served with potato filling and chutneys",
      price: 60,
      time: "15 mins",
      tag: "Popular",
      img: masalaDosaImg,
    },
    {
      name: "Veg Thali",
      desc: "Complete meal with roti, rice, dal, sabzi, curd and pickle",
      price: 120,
      time: "20 mins",
      tag: "Popular",
      img: vegThaliImg,
    },
    {
      name: "Idli Sambhar",
      desc: "Soft steamed idlis with hot sambhar and chutneys",
      price: 35,
      time: "12 mins",
      tag: "Popular",
      img: idliImg,
    },
  ];
  

const PopularItems = () => {
  return (
    <section className="py-8 px-4 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-agnel-dark">Popular Items</h2>
        <a href="#" className="text-purple-500 font-semibold hover:underline">
          View All →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dishes.map((dish, idx) => (
          <div
            key={idx}
            className="rounded-xl border p-4 hover:shadow-md transition-all"
          >
            <div className="relative">
              <img
                src={dish.img}
                alt={dish.name}
                className="rounded-lg w-full h-60 object-cover"
              />
              <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {dish.tag}
              </span>
            </div>

            <div className="mt-4 space-y-1">
              <h4 className="text-lg font-semibold text-gray-900">{dish.name}</h4>
              <p className="text-sm text-gray-500">{dish.desc}</p>
              <p className="text-sm text-gray-400">{dish.time}</p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-purple-500 font-semibold text-base">₹{dish.price}</p>
              <button className="flex items-center gap-1 bg-purple-500 hover:bg-yellow-400 text-white hover:text-black text-sm font-semibold px-4 py-2 rounded">
                <FiPlus size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularItems;
