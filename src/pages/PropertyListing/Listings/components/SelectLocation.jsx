import React from "react";

import "../listings.css";

const SelectLocation = ({ Location, setLocation, onLocationSelect }) => {
  function handleLocation() {
    setLocation(!Location);
  }

  return (
    <div
      className={`absolute lg:-left-6 top-[80px] sm:top-[88px] left-[-20px] flex lg:gap-3 z-50 ${
        Location ? "block" : "hidden"
      }`}
    >
      <div>
        <div className="lg:w-[130px] md:min-w-[150px] md:max-w-full  bg-white text-black flex items-start flex-col justify-center rounded-lg shadow-md ml-7 lg:ml-9">
          <div className="flex flex-col items-center justify-around flex-wrap ">
            {["Lucknow", "Ayodhya", "Vellore", "Kota"].map((city) => (
              <h2
                key={city}
                className="h-1 sm:h-8 w-35 lg:w-40  text-sm md:text-lg  font-medium rounded-lg flex items-center justify-center cursor-pointer py-6 px-8 "
                onClick={() => onLocationSelect(city)}
              >
                {city}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectLocation;
