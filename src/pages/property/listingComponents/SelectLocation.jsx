import React from "react";
import cross from "../../../assets/property/cross.png";
import "../listing.css";

const SelectLocation = ({ Location, setLocation, onLocationSelect }) => {
  function handleLocation() {
    setLocation(!Location);
  }

  return (
    <div
      className={`absolute lg:-left-6 top-[70px] sm:top-[88px] left-[-20px] flex lg:gap-3 z-50 ${
        Location ? "block" : "hidden"
      }`}
    >
<div>
  <div className="bg-white text-black flex items-start flex-col justify-center rounded-lg shadow-md ml-7 max-w-fit"> {/* Removed fixed widths, added max-w-fit */}
    <div className="flex flex-col items-center justify-around flex-wrap">
      {["Lucknow", "Ayodhya", "Vellore", "Kota"].map((city) => (
        <h2
          key={city}
          className="w-[138px] h-1 sm:h-8 text-sm md:text-lg font-medium rounded-lg flex items-center justify-center cursor-pointer p-6 ml-1" // changed w-35 to w-full
          onClick={() => onLocationSelect(city)}
        >
          {city}
        </h2>
      ))}
    </div>
  </div>
</div>    </div>
  );
};

export default SelectLocation;
