import "animate.css";
import BottomBg from "./BottomBg";
import React, { useEffect, useState } from "react";
import drop from "../../../assets/property/drop.png";
import SelectLocation from "../../../pages/property/listingComponents/SelectLocation";

const HomeDown = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [city, setCity] = useState("");
  const handleScroll = () => {
    if (window.scrollY > 1) {
      setIsScrolled(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-screen">
      <div className="flex justify-center items-center h-full mb-20 mt-16">
        <div className="w-10/12 md:w-8/12 lg:w-6/12">
          <h1
            className={`absolute transform max-sm:top-32 max-sm:text-center max-sm text-2xl font-extrabold sm:font-light sm:text-3xl sm:text-[2.3rem]  text-white tracking-widest transition-all lg:duration-[2000ms] md:duration-[1000ms] sm:duration-[700ms] duration-[500ms]  ease-in-out ${
              isScrolled
                ? "left-[5%] top-[12.5rem] lg:top-[19rem] opacity-100"
                : "left-[30%] top-[12.5rem] lg:top-[19rem] opacity-0"
            } `}
          >
            Welcome to To-Let Globe
          </h1>
          <h6
            className={`absolute transform max-sm:top-44 max-sm:text-xs mt-1 text-center text-[#c8a21c] font-light transition-all lg:duration-[2000ms] md:duration-[1000ms] sm:duration-[700ms] duration-[500ms] ease-in-out ${
              isScrolled
                ? "max-sm:left-[27%] max-sm:top-[22%] left-[5%] top-[17rem] lg:left-[8%] lg:top-[23rem] opacity-100"
                : "left-[30%] top-[17rem] lg:top-[23rem] opacity-0"
            } `}
          >
            <span className="max-sm:block">NO BROKERAGE ON </span>
            <span className="max-sm:block">PGS | FLATS | HOUSES | OFFICES</span>
          </h6>
          <div
            className={` absolute transform transition-all max-sm:top-52 g:duration-[2000ms] md:duration-[1000ms] sm:duration-[700ms] duration-[500ms] ease-in-out w-[20%] ${
              isScrolled
                ? "left-[5%] w-[20%] top-[42%] lg:top-[59%] lg:w-[33%] opacity-100"
                : "left-[30%] w-[20%] top-[39%] lg:top-[56%] lg:w-[33%] opacity-0"
            } `}
            id="inputGroup"
          >
            <div className="flex">
              <input
                className="flex-1 py-2 px-4 border border-gray-300 bg-white rounded-l-md"
                placeholder="Search PG, Flats and Houses"
                aria-label="Search PG, Flats and Houses"
              />
              <button
                className="bg-[#40b5a8] text-white rounded-r-md px-4"
                onClick={() => console.log("connect")}
              >
                Search
              </button>

              {/* <div className="flex items-center justify-between gap-20 md:gap-36 lg:gap-36 flex-col md:flex-row lg:flex-row">
                <div className="bg-white h-16 w-[40vw] md:w-[74vw] lg:w-[50vw] flex items-center justify-between text-black px-2 rounded-xl">
                   */}
              {/* Location Logic */}
              {/* <div className="flex items-center justify-center gap-4 p-2 border-r border-black">
                    <div className="text-lg py-1 px-1 hover:cursor-pointer whitespace-nowrap">
                      <p>{!city ? "Select Your City" : city}</p>
                    </div>
                    <div className="h-full flex items-center justify-center w-1/4 cursor-pointer rounded-full">
                      <img
                        src={drop}
                        alt="Dropdown"
                        onClick={setCity}
                        className="cursor-pointer"
                      />
                    </div> */}
              {/* 
                    <SelectLocation
                      Location={city}
                      setLocation={setCity}
                      onLocationSelect={(selectedCity) => {
                        resetFilters();
                        navigate(`/property-listing/${selectedCity}`);
                        setCity(selectedCity);
                      }}
                    />
                  </div> */}
              {/* Search Input */}
              {/* <div className="flex items-center gap-2 px-4 relative">
                    <FaSearch className="text-black" />
                    <div className="flex flex-wrap gap-2 items-center w-64">
                      {selectedLocality && (
                        <div className="flex items-center gap-1 bg-[#EED98B] px-2 py-1 rounded-full">
                          <span className="text-sm">{selectedLocality}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => {
                              setSelectedLocality("");
                              setSelectedArea([]); // Clear areas when locality is cleared
                            }}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                      {selectedArea.map((area) => (
                        <div
                          key={area}
                          className="flex items-center gap-1 bg-[#EED98B] px-2 py-1 rounded-full"
                        >
                          <span className="text-sm">{area}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => {
                              const newAreas = selectedArea.filter(
                                (a) => a !== area
                              );
                              setSelectedArea(newAreas);
                            }}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ))}
                      <input
                        type="text"
                        placeholder={
                          windowWidth < 768
                            ? "Search..."
                            : "Search by locality or area..."
                        }
                        value={searchQuery}
                        onChange={handleSearch}
                        className="outline-none flex-1 min-w-[100px] text-lg bg-transparent text-black placeholder-gray-500"
                      />
                    </div> */}

              {/* Search Results Panel */}
              {/* {showSearchPanel &&
                      (searchResults.localities.length > 0 ||
                        searchResults.areas.length > 0) && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto">
                          {[
                            ...searchResults.localities,
                            ...searchResults.areas,
                          ].map((item, index) => {
                            const isLocality =
                              searchResults.localities.includes(item);
                            return (
                              <div
                                key={`${
                                  isLocality ? "locality" : "area"
                                }-${index}`}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-black flex items-center justify-between"
                                onClick={() =>
                                  handleSearchSelection(
                                    item,
                                    isLocality ? "locality" : "area"
                                  )
                                }
                              >
                                <span className="text-black">{item}</span>
                                <span className="text-gray-500 min-w-[60px]">
                                  {isLocality ? "Locality" : "Area"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )} */}
              {/* </div> */}
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      <BottomBg />
    </div>
  );
};

export default HomeDown;
