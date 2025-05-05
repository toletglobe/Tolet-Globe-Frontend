import React from "react";
import "../../../PropertyListing/Listings/listings.css";

const SelectLocation = ({ Location, setLocation, onLocationSelect }) => {
  function handleLocation() {
    setLocation(!Location);
  }

  return (
    <div
      className={`absolute top-[17.3rem] sm:top-[55px] flex lg:gap-3 z-50 ${
        Location ? "block" : "hidden"
      }`}
    >
      <div>
        <div className="lg:w-[calc(130px-8px)] md:min-w-[calc(130px-5px)] md:max-w-full bg-white text-black flex items-start flex-col justify-center rounded-lg shadow-md -ml-3">
          <div className="flex flex-col items-center justify-around flex-wrap">
            {["Lucknow", "Ayodhya", "Vellore", "Kota"].map((city) => (
              <h2
                key={city}
                className="w-full h-8 text-sm md:text-lg font-medium rounded-lg flex items-center justify-center cursor-pointer p-2 md:p-6"
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
