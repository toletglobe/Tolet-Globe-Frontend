import React, { useState } from "react";
import {
  MdSchool,
  MdRestaurant,
  MdShoppingBag,
  MdLocalCafe,
  MdAccountBalance,
  MdStore,
  MdFitnessCenter,
  MdDirectionsBus,
} from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const LocationComponent = ({ property, selectComp }) => {
  const [selectedCategory, setSelectedCategory] = useState("location");

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
  };

  const getMapSrc = () => {
    switch (selectedCategory) {
      case "school":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.60187910736!2d80.93580081149348!3d26.85664202697483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomtinagar%20map%20school!5e0!3m2!1sen!2sin!4v1724867053652!5m2!1sen!2sin";
      case "restaurant":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.607888975435!2d80.93580075365227!3d26.856630086899923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomti%20nagar%20restaurants!5e0!3m2!1sen!2sin!4v1724867399676!5m2!1sen!2sin";
      case "groceries":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.607888975435!2d80.93580075365227!3d26.856630086899923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomti%20nagar%20GROCERIES!5e0!3m2!1sen!2sin!4v1724867603540!5m2!1sen!2sin";
      case "cafe":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.607888975435!2d80.93580075365227!3d26.856630086899923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomti%20nagar%20cafe!5e0!3m2!1sen!2sin!4v1724867650408!5m2!1sen!2sin";
      case "banks":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.607888975435!2d80.93580075365227!3d26.856630086899923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomti%20nagar%20bank!5e0!3m2!1sen!2sin!4v1724867696805!5m2!1sen!2sin";
      case "shops":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.607888975435!2d80.93580075365227!3d26.856630086899923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomti%20nagar%20shops!5e0!3m2!1sen!2sin!4v1724867727775!5m2!1sen!2sin";
      case "fitness":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.607888975435!2d80.93580075365227!3d26.856630086899923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomti%20nagar%20gym!5e0!3m2!1sen!2sin!4v1724867781416!5m2!1sen!2sin";
      case "transport":
        return "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56951.607888975435!2d80.93580075365227!3d26.856630086899923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgomti%20nagar%20transport!5e0!3m2!1sen!2sin!4v1724867811707!5m2!1sen!2sin";
      default:
        return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.7374841447!2d80.88487084258148!3d26.848163621554857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be314f43454e5%3A0x111085c9b254d27c!2sBLOCK%20B!5e0!3m2!1sen!2sin!4v1724437712311!5m2!1sen!2sin";
    }
  };

  const locationCategories = [
    { icon: <MdSchool size={24} />, label: "School", category: "school" },
    { icon: <MdRestaurant size={24} />, label: "Restaurants", category: "restaurant" },
    { icon: <MdShoppingBag size={24} />, label: "Groceries", category: "groceries" },
    { icon: <MdLocalCafe size={24} />, label: "Cafe", category: "cafe" },
    { icon: <MdAccountBalance size={24} />, label: "Banks", category: "banks" },
    { icon: <MdStore size={24} />, label: "Shops", category: "shops" },
    { icon: <MdFitnessCenter size={24} />, label: "Fitness", category: "fitness" },
    { icon: <MdDirectionsBus size={24} />, label: "Transport", category: "transport" },
  ];

  return (
    <div className="pb-4 bg-white rounded-2xl">
      {/* Header */}
      <div className="px-1 pt-4 pb-2">
        <div className="flex justify-between lg:w-[68%] xl:w-[69%] 2xl:w-[70%] items-start lg:mx-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Location</h2>
            <p className="text-sm text-gray-600">Vinamra Khand 1/35</p>
          </div>
          <p className="text-teal-600 text-sm lg:pt-6">
            Get Direction
          </p>
        </div>
      </div>

        <div className="lg:flex lg:space-x-4 justify-between lg:mx-10">
            {/* Map */}
        <div className="lg:w-[74%] w-full h-64 lg:h-[550px]">
        <div className="w-full lg:w-[60%] xl:w-[69%]  h-64 lg:h-[550px]  absolute backdrop-blur-sm bg-black/40 flex justify-center items-center"><RiLock2Fill color="#ffffff" size={30} /></div>
          <iframe
            src={getMapSrc()}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>

        {/* Categories */}
        <div className="px-3 py-3  justify-between items-center gap-10">
          <div className="grid grid-cols-2  lg:grid-cols-1 gap-x-5 gap-y-3  lg:gap-y-5 text-xs lg:pl-8 items-center  ">
            {locationCategories.map((item, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(item.category)}
                className="flex flex-row lg:flex-row w-full lg:p-2  items-center border border-black  rounded-lg space-y-1 lg:border-[1px] lg:border-black lg:px-14 lg:w-full lg:gap-4"
              >
                <span className="text-gray-950 lg:text-2xl gap-5">{item.icon}</span>
                <span className="lg:text-xl">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        </div>
      
    </div>
  );
};

export default LocationComponent;