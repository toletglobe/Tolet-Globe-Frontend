import React from "react";

const SelectLocation = () => {
  return (
    <div>
      <div className="lg:w-[715px] lg:max-w-full md:min-w-[300px] md:max-w-full  w-screen bg-white text-black flex items-start px-8 flex-col justify-center h-[35vh] rounded-lg shadow-md">
        <p className="text-2xl font-medium py-4 flex items-center justify-center gap-4 ">
          Select Location
        </p>
        <div className="flex items-center justify-between w-full px-5 py-2 flex-wrap gap-3">
          <p className="h-8 w-24 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center">
            Lucknow
          </p>
          <p className="h-8 w-24 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center">
            Ayodhya
          </p>
          <p className="h-8 w-24 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center">
            Vellore
          </p>
          <p className="h-8 w-24 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center">
            Kota
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectLocation;
