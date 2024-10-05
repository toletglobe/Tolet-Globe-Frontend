import React, { useState } from "react";
import drop from "../../../assets/property/drop.png";
import axios from "axios";
const Filters = ({SetIsOpen, setProperties}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bhk: "",
    residential: "",
    commercial: "",
    others: "",
    preferenceHousing: "",
    moveInDate: "",
    houseType: "",
  });
  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      bhk: "",
      residential: "",
      commercial: "",
      others: "",
      preferenceHousing: "",
      moveInDate: "",
      houseType: "",
    });
  };
  const seeResults = async () => {
    setIsLoading(true);

    // Clean filter values
    const cleanedFilters = {
      ...filters,
      bhk: filters.bhk.replace(/[^0-9]/g, ""), // Remove non-numeric characters
    };

    const queryString = Object.keys(cleanedFilters)
      .filter(
        (key) => cleanedFilters[key] !== "" && cleanedFilters[key] !== null
      ) // Exclude empty or null values
      .map((key) => {
        const value = Array.isArray(cleanedFilters[key])
          ? cleanedFilters[key].map(encodeURIComponent).join(",") // Encode array values
          : encodeURIComponent(cleanedFilters[key]); // Encode single value
        return `${encodeURIComponent(key)}=${value}`;
      })
      .join("&");

    console.log(queryString);

    const url = `http://localhost:8000/api/v1/property/filter?${queryString}`;

    try {
      const response = await axios.get(url);
      console.log(response.data);
      setProperties(response.data.data); // Update properties with the filtered results
      if (response.data.data.length === 0) {
        // Handle no results
        console.log("No results found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
      SetIsOpen(false);
    }
  };
  return (
    <>
      {isLoading && (
        <div>
          <p className="text-white font-bold text-2xl"></p>
        </div>
      )}
      {/* filter */}
      <div className="lg:w-[715px] lg:max-w-full md:min-w-[300px] md:max-w-full  w-screen bg-white text-black flex flex-col justify-between rounded-b-2xl shadow-md">
        <div className="text-2xl font-medium py-4 flex items-center justify-center border-b-4">
          <p>All Filters</p>
        </div>
        <div className="flex flex-col items-start justify-start p-6 sm:px-10 gap-4">
          <div className="w-full">
            <p className="text-xl sm:text-xl font-medium text-[#696969] mb-6">
              Budget
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2">
              <div className="h-11 w-full sm:w-72 border-2 border-[#4A7F79] flex items-center justify-between px-8 rounded-lg">
                <p className="font-light">${filters.minPrice || "8500"}</p>
                <img src={drop} alt="Dropdown icon" />
              </div>
              <div className="h-11 w-full sm:w-72 border-2 border-[#4A7F79] flex items-center justify-between px-8 rounded-lg">
                <p className="font-light">{filters.maxPrice || "Max"}</p>
                <img src={drop} alt="Dropdown icon" />
              </div>
            </div>
          </div>
          <div className="w-3/4 flex items-center justify-center flex-col mx-auto mb-5 mt-8">
            <input
              type="range"
              className=" mb-5 w-full appearance-none cursor-pointer bg-[#40B5A8] rounded-full h-[5px]"
              min="0"
              max="10000"
              step="100"
              value={filters.minPrice || 0}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            />
            <div className="w-full flex items-center justify-between">
              <div>
                <p className="font-light text-2xl">
                  ${filters.minPrice || "8500"}
                </p>
              </div>
              <div>
                <p className="font-light text-2xl">
                  {filters.maxPrice || "Max"}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mb-6">
            <p className="text-lg sm:text-xl font-medium text-[#696969] mb-3">
              BHK
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 hover:cursor-pointer">
              {["+ 1 BHK", "+ 2 BHK", "+ 3 BHK", "+ 4 BHK", "+ >4 BHK"].map(
                (bhk, index) => (
                  <div
                    key={index}
                    className={`h-8 w-28 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                      filters.bhk === bhk ? "bg-[#4A7F79] text-white" : ""
                    }`}
                    onClick={() => handleFilterChange("bhk", bhk)}
                  >
                    {bhk}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="w-full mb-6">
            <p className="text-lg sm:text-xl font-medium text-[#696969] mb-3">
              Residential
            </p>
            <div className="flex flex-wrap gap-2">
              <div
                className={`hover:cursor-pointer h-8 w-24 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                  filters.residential === "Flat"
                    ? "bg-[#4A7F79] text-white"
                    : ""
                }`}
                onClick={() => handleFilterChange("residential", "Flat")}
              >
                + Flat
              </div>
              <div
                className={`hover:cursor-pointer h-8 w-32 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                  filters.residential === "House"
                    ? "bg-[#4A7F79] text-white"
                    : ""
                }`}
                onClick={() =>
                  handleFilterChange("residential", "House")
                }
              >
                + House
              </div>
              <div
                className={`hover:cursor-pointer h-8 w-32 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                  filters.residential === "Villa"
                    ? "bg-[#4A7F79] text-white"
                    : ""
                }`}
                onClick={() =>
                  handleFilterChange("residential", "Villa")
                }
              >
                + Villa
              </div>
            </div>
          </div>

          <div className="w-full mb-6">
            <p className="text-lg sm:text-xl font-medium text-[#696969] mb-3">
              Commercial
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2">
              {[
                "Office Space",
                "Shop",
                "ShowRoom",
                "Warehouse",
                "Godown",
                "Building",
                "Complex"
              ].map((type, index) => (
                <div
                  key={index}
                  className={`hover:cursor-pointer h-9 w-44 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                    filters.commercial === type ? "bg-[#4A7F79] text-white" : ""
                  }`}
                  onClick={() => handleFilterChange("commercial", type)}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mb-6">
            <p className="text-lg sm:text-xl font-medium text-[#696969] mb-3">
              Others
            </p>
            <div
              className={`hover:cursor-pointer w-32 h-10 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                filters.others === "Farm house"
                  ? "bg-[#4A7F79] text-white"
                  : ""
              }`}
              onClick={() => handleFilterChange("others", "Farm house")}
            >
              + Farm house
            </div>
          </div>

          <div className="w-full mb-6">
            <p className="text-lg sm:text-xl font-medium text-[#696969] mb-3">
              Preference Housing
            </p>
            <div className="flex flex-wrap gap-2 hover:cursor-pointer">
              <div className="h-9 w-36 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ">
                <select
                  className="text-black bg-white w-full h-full rounded-lg hover:cursor-pointer"
                  value={filters.preferenceHousing}
                  onChange={(e) =>
                    handleFilterChange("preferenceHousing", e.target.value)
                  }
                >
                  <option value="">Select one</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div
                className={`h-9 w-36 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                  filters.preferenceHousing === "Family"
                    ? "bg-[#4A7F79] text-white"
                    : ""
                }`}
                onClick={() =>
                  handleFilterChange("preferenceHousing", "Family")
                }
              >
                Family
              </div>
            </div>
          </div>

          <div className="w-full mb-6">
            <p className="text-lg sm:text-xl font-medium text-[#696969] mb-3 ">
              Move-in Date
            </p>
            <div className="hover:cursor-pointer h-12 w-full sm:w-[302px] text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-between px-3">
              <p>Select one</p>
              <input
                type="date"
                className="text-black bg-white "
                value={filters.moveInDate}
                onChange={(e) =>
                  handleFilterChange("moveInDate", e.target.value)
                }
              />
            </div>
          </div>

          <div className="w-full mb-6">
            <p className="text-lg sm:text-xl font-medium text-[#696969] mb-3">
              House Type
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2">
              {["Full-Furnished", "Semi-Furnished", "Non-Furnished"].map(
                (type, index) => (
                  <div
                    key={index}
                    className={`hover:cursor-pointer h-9 w-36 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                      filters.houseType === type
                        ? "bg-[#4A7F79] text-white"
                        : ""
                    }`}
                    onClick={() => handleFilterChange("houseType", type)}
                  >
                    {type}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="border-t-4 py-5 px-6 sm:px-10 flex items-center justify-between">
          <button
            className="h-12 w-36 sm:w-44 border-2 rounded-md border-[#40B5A8] text-[#40b5a8] font-light"
            onClick={resetFilters}
          >
            Reset filters
          </button>
          <button
            className="h-12 w-36 sm:w-44 border-2 rounded-md bg-[#40B5A8] border-[#4A7F79] text-white font-light"
            onClick={seeResults}
          >
            See Results
          </button>
        </div>
      </div>
      {/* filter end*/}
    </>
  );
};

export default Filters;
