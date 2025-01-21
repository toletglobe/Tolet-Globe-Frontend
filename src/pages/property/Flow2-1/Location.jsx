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
      <div className="px-4 pt-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Location</h2>
            <p className="text-sm text-gray-600">Vinamra Khand 1/35</p>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              property?.address || "Vinamra Khand 1/35"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 text-sm"
          >
            Get Direction ▲
          </a>
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-64">
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
      <div className="px-4 py-3">
        <div className="grid grid-cols-4 gap-x-2 gap-y-3 text-xs">
          {locationCategories.map((item, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(item.category)}
              className="flex flex-col items-center space-y-1"
            >
              <span className="text-gray-600">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationComponent;