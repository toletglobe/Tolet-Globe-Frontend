// SelectLocation.js
import React from "react";
import "../listings.css";

const SelectLocation = ({ onLocationSelect }) => {
  return (
    <div className="flex lg:gap-3 z-50">
      <div className="lg:w-[130px] md:min-w-[150px] bg-white text-black flex flex-col justify-center rounded-lg shadow-md">
        {["Lucknow", "Ayodhya", "Vellore", "Kota"].map((city) => (
          <h2
            key={city}
            className="text-sm md:text-lg font-medium cursor-pointer px-4 py-2 hover:bg-gray-100"
            onClick={() => onLocationSelect(city)}
          >
            {city}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default SelectLocation;
