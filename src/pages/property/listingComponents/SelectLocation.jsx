import React from "react";
import cross from "../../../assets/property/cross.png";
import "../listing.css";

const SelectLocation = ({ Location, setLocation, onLocationSelect }) => {
  function handleLocation() {
    setLocation(!Location);
  }

  return (
    <div
      className={`absolute lg:left-7 top-48 left-[-20px] flex lg:gap-3 z-50 ${
        Location ? "block" : "hidden"
      }`}
    >
      {/* <div>
        <img
          src={cross}
          alt="Close"
          onClick={handleLocation}
          className="cursor-pointer"
        />
      </div> */}

      <div>
        <div className="lg:w-[450px] md:min-w-[300px] md:max-w-full  w-screen bg-white text-black flex items-start px-4 flex-col justify-center rounded-lg shadow-md">
          <p className="text-2xl font-medium py-2 flex items-center justify-center gap-4 ">
            Select City
          </p>
          <div className="flex items-center justify-between w-full py-4 flex-wrap ">
            {["Lucknow", "Ayodhya", "Vellore", "Kota"].map((city) => (
              <p
                key={city}
                className="h-8 w-20 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center cursor-pointer"
                onClick={() => onLocationSelect(city)}
              >
                {city}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectLocation;
