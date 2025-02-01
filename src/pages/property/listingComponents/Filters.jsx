/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../../constant/constant";
import {
  BsHouseDoor,
  BsBuilding,
  BsPeople,
  BsBriefcase,
  BsShop,
  BsBox,
} from "react-icons/bs";

const Filters = ({
  SetIsOpen,
  // setProperties,
  updateFilterCount,
  // city,
  // setTotalPages,
  filters,
  setFilters,
  resetFilters,
  fetchAndFilterProperties,
  setCurrentPage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const countAppliedFilters = (filters) => {
      return Object.values(filters).reduce((count, filterValue) => {
        if (Array.isArray(filterValue)) {
          return count + (filterValue.length > 0 ? 1 : 0);
        } else {
          return count + (filterValue ? 1 : 0);
        }
      }, 0);
    };
    const totalFilters = countAppliedFilters(filters);
    updateFilterCount(totalFilters);
  }, [filters, updateFilterCount]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => {
      if (Array.isArray(prevFilters[key])) {
        if (prevFilters[key].includes(value)) {
          return {
            ...prevFilters,
            [key]: prevFilters[key].filter((item) => item !== value),
          };
        } else {
          return {
            ...prevFilters,
            [key]: [...prevFilters[key], value],
          };
        }
      } else {
        const newFilters = {
          ...prevFilters,
          [key]: prevFilters[key] === value ? "" : value,
        };
        if (key === "preferenceHousing" && value === "Family") {
          newFilters.genderPreference = "";
        }
        return newFilters;
      }
    });
    console.log(filters);
  };

  const seeResults = async () => {
    setCurrentPage(1);
    fetchAndFilterProperties();
    SetIsOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);

    // Reset all filters first
    setFilters((prev) => ({
      ...prev,
      residential: [],
      commercial: [],
      bhk: [],
      houseType: [],
      preferenceHousing: "",
      genderPreference: "",
    }));

    // Update filters based on category
    if (category === "HOUSES" || category === "FLATS") {
      handleFilterChange(
        "residential",
        category === "HOUSES" ? "+ House" : "+ Flat"
      );
    } else if (category === "PAYING GUESTS") {
      handleFilterChange("residential", "+ PG");
    } else if (category === "OFFICES") {
      handleFilterChange("commercial", "+ Office");
      seeResults();
    } else if (category === "SHOPS") {
      handleFilterChange("commercial", "+ Shop");
      seeResults();
    } else if (category === "WAREHOUSES") {
      handleFilterChange("commercial", "+ Warehouse");
      seeResults();
    }
  };

  return (
    <>
      <div className="w-fit bg-white p-2 mb-4 shadow-sm ml-4 mt-4 rounded-xl">
        <div className="flex gap-6">
          {[
            { icon: BsHouseDoor, text: "HOUSES" },
            { icon: BsBuilding, text: "FLATS" },
            { icon: BsPeople, text: "PAYING GUESTS" },
            { icon: BsBriefcase, text: "OFFICES" },
            { icon: BsShop, text: "SHOPS" },
            { icon: BsBox, text: "WAREHOUSES" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-[100px] cursor-pointer text-black hover:text-white hover:bg-[#c8a018] rounded-xl py-3"
              onClick={() => handleCategoryClick(item.text)}
            >
              <item.icon size={24} className="mb-2" />
              <span className="text-xs text-center font-medium">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {selectedCategory === "HOUSES" && (
        <div className="w-fit bg-white p-4 shadow-md ml-4 rounded-xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h3 className="text-left font-medium mb-3 text-black">BHK</h3>
              <div className="flex flex-row gap-4">
                {["+ 1 BHK", "+ 2 BHK", "+ 3 BHK", "+ 4 BHK", "+ 5 BHK"].map(
                  (bhk) => (
                    <label
                      key={bhk}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name="bhk"
                        value={bhk}
                        checked={filters.bhk.includes(bhk)}
                        onChange={() => handleFilterChange("bhk", bhk)}
                        className="appearance-none w-4 h-4 rounded-full border-2 border-black checked:bg-black checked:border-[#4A7F79] checked:border-4 transition-all"
                      />
                      <span className="text-sm text-black">{bhk}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-left font-medium mb-3 text-black">
                House Type
              </h3>
              <div className="flex flex-row gap-4">
                {["Fully Furnished", "Semi Furnished", "Not Furnished"].map(
                  (type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name="houseType"
                        value={type}
                        checked={filters.houseType.includes(type)}
                        onChange={() => handleFilterChange("houseType", type)}
                        className="appearance-none w-4 h-4 rounded-full border-2 border-black checked:bg-black checked:border-[#4A7F79] checked:border-4 transition-all"
                      />
                      <span className="text-sm text-black">{type}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-left font-medium mb-3 text-black">
                Preference
              </h3>
              <div className="flex flex-row gap-4">
                {["Family", "Bachelors"].map((preference) => (
                  <label
                    key={preference}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="preferenceHousing"
                      value={preference}
                      checked={filters.preferenceHousing === preference}
                      onChange={() =>
                        handleFilterChange("preferenceHousing", preference)
                      }
                      className="appearance-none w-4 h-4 rounded-full border-2 border-black checked:bg-black checked:border-[#4A7F79] checked:border-4 transition-all"
                    />
                    <span className="text-sm text-black">{preference}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-2">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear
              </button>
              <button
                onClick={seeResults}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedCategory === "FLATS" && (
        <div className="w-fit bg-white p-4 shadow-md ml-4 rounded-xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h3 className="text-left font-medium mb-3 text-black">BHK</h3>
              <div className="flex flex-row gap-4">
                {["+ 1 BHK", "+ 2 BHK", "+ 3 BHK", "+ 4 BHK", "+ 5 BHK"].map(
                  (bhk) => (
                    <label
                      key={bhk}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name="bhk"
                        value={bhk}
                        checked={filters.bhk.includes(bhk)}
                        onChange={() => handleFilterChange("bhk", bhk)}
                        className="appearance-none w-4 h-4 rounded-full border-2 border-black checked:bg-black checked:border-[#4A7F79] checked:border-4 transition-all"
                      />
                      <span className="text-sm text-black">{bhk}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-left font-medium mb-3 text-black">
                Flats Type
              </h3>
              <div className="flex flex-row gap-4">
                {["Fully Furnished", "Semi Furnished", "Not Furnished"].map(
                  (type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name="houseType"
                        value={type}
                        checked={filters.houseType.includes(type)}
                        onChange={() => handleFilterChange("houseType", type)}
                        className="appearance-none w-4 h-4 rounded-full border-2 border-black checked:bg-black checked:border-[#4A7F79] checked:border-4 transition-all"
                      />
                      <span className="text-sm text-black">{type}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-left font-medium mb-3 text-black">
                Preference
              </h3>
              <div className="flex flex-row gap-4">
                {["Family", "Bachelors"].map((preference) => (
                  <label
                    key={preference}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="preferenceHousing"
                      value={preference}
                      checked={filters.preferenceHousing === preference}
                      onChange={() =>
                        handleFilterChange("preferenceHousing", preference)
                      }
                      className="appearance-none w-4 h-4 rounded-full border-2 border-black checked:bg-black checked:border-[#4A7F79] checked:border-4 transition-all"
                    />
                    <span className="text-sm text-black">{preference}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-2">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear
              </button>
              <button
                onClick={seeResults}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedCategory === "PAYING GUESTS" && (
        <div className="w-fit bg-white p-4 shadow-md ml-4 rounded-xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h3 className="text-left font-medium mb-3 text-black">
                Preference
              </h3>
              <div className="flex flex-row gap-4">
                {["Girls", "Boys"].map((gender) => (
                  <label
                    key={gender}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      // checked={filters.gender.includes(gender)}
                      onChange={() =>
                        handleFilterChange("genderPreference", [gender])
                      }
                      className="appearance-none w-4 h-4 rounded-full border-2 border-black checked:bg-black checked:border-[#4A7F79] checked:border-4 transition-all"
                    />
                    <span className="text-sm text-black">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-2">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear
              </button>
              <button
                onClick={seeResults}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <div className="lg:w-[450px] md:w-[380px] w-[320px] bg-white text-black flex flex-col justify-between rounded-b-2xl shadow-md">
        <div className="text-xl font-medium py-3 flex items-center justify-center border-b-2">
          <p>All Filters</p>
        </div>
        <div className="flex flex-col items-start justify-start p-4 gap-3">
          <div className="w-full mb-3">
            <p className="text-base font-medium text-[#696969] mb-2">BHK</p>
            <div className="flex flex-wrap items-start gap-2 hover:cursor-pointer">
              {["+ 1 BHK", "+ 2 BHK", "+ 3 BHK", "+ 4 BHK", "+ 5 BHK"].map(
                (bhk, index) => (
                  <div
                    key={index}
                    className={`h-7 w-20 text-xs font-light border border-[#4A7F79] rounded-md flex items-center justify-center ${
                      filters.bhk.includes(bhk) ? "bg-[#4A7F79] text-white" : ""
                    }`}
                    onClick={() => handleFilterChange("bhk", bhk)}
                  >
                    {bhk}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="w-full mb-3">
            <p className="text-base font-medium text-[#696969] mb-2">
              Residential
            </p>
            <div className="flex flex-wrap gap-2">
              {["+ Flat", "+ House", "+ PG"].map((type, index) => (
                <div
                  key={index}
                  className={`hover:cursor-pointer h-7 w-24 text-xs font-light border border-[#4A7F79] rounded-md flex items-center justify-center ${
                    filters.residential.includes(type)
                      ? "bg-[#4A7F79] text-white"
                      : ""
                  }`}
                  onClick={() => handleFilterChange("residential", type)}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mb-3">
            <p className="text-base font-medium text-[#696969] mb-2">
              Commercial
            </p>
            <div className="flex flex-wrap items-start gap-2">
              {["+ Office", "+ Shop", "+ Warehouse"].map((type, index) => (
                <div
                  key={index}
                  className={`hover:cursor-pointer h-7 w-32 text-xs font-light border border-[#4A7F79] rounded-md flex items-center justify-center ${
                    filters.commercial.includes(type)
                      ? "bg-[#4A7F79] text-white"
                      : ""
                  }`}
                  onClick={() => handleFilterChange("commercial", type)}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mb-3">
            <p className="text-base font-medium text-[#696969] mb-2">
              Preference Housing
            </p>
            <div className="flex flex-wrap gap-2 hover:cursor-pointer">
              <select
                className="h-7 w-28 text-xs font-light border border-[#4A7F79] rounded-md bg-white"
                value={filters.preferenceHousing}
                onChange={(e) =>
                  handleFilterChange("preferenceHousing", e.target.value)
                }
              >
                <option value="">Select one</option>
                <option value="Family">Family</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Any">Any</option>
              </select>
              <select
                className={`h-7 w-28 text-xs font-light border rounded-md ${
                  filters.preferenceHousing === "Family" ||
                  filters.preferenceHousing === "Any"
                    ? "border-gray-300 text-gray-400 bg-gray-100"
                    : "border-[#4A7F79] text-black bg-white"
                }`}
                value={filters.genderPreference}
                onChange={(e) =>
                  handleFilterChange("genderPreference", e.target.value)
                }
                disabled={
                  filters.preferenceHousing === "Family" ||
                  filters.preferenceHousing === "Any"
                }
              >
                <option value="">
                  {filters.preferenceHousing === "Family"
                    ? "N/A for Family"
                    : filters.preferenceHousing === "Any"
                    ? "N/A for Any"
                    : "Select Gender"}
                </option>
                {filters.preferenceHousing !== "Family" && (
                  <>
                    <option value="Boys">Male</option>
                    <option value="Girls">Female</option>
                    <option value="Others">Others</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="w-full mb-3">
            <p className="text-base font-medium text-[#696969] mb-2">
              House Type
            </p>
            <div className="flex flex-wrap items-start gap-2">
              {["Fully Furnished", "Semi Furnished", "Not Furnished"].map(
                (type, index) => (
                  <div
                    key={index}
                    className={`hover:cursor-pointer h-7 w-28 text-xs font-light border border-[#4A7F79] rounded-md flex items-center justify-center ${
                      filters.houseType.includes(type)
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

        <div className="w-full text-sm font-light flex items-center justify-center gap-5">
          <button
            onClick={resetFilters}
            className="h-10 w-24 text-[#4A7F79] border border-[#4A7F79] rounded-md"
          >
            Reset
          </button>
          <button
            onClick={seeResults}
            className="h-10 w-24 bg-[#4A7F79] text-white rounded-md"
          >
            See Results
          </button>
        </div>
      </div> */}

      {/* Keep the residential and commercial filter UI for reference/additional filtering */}
      {/* <div className="w-full mb-3">
        <p className="text-base font-medium text-[#696969] mb-2">
          Residential
        </p>
        <div className="flex flex-wrap gap-2">
          {["+ Flat", "+ House", "+ PG"].map((type, index) => (
            <div
              key={index}
              className={`hover:cursor-pointer h-7 w-24 text-xs font-light border border-[#4A7F79] rounded-md flex items-center justify-center ${
                filters.residential?.includes(type)
                  ? "bg-[#4A7F79] text-white"
                  : ""
              }`}
              onClick={() => handleFilterChange("residential", type)}
            >
              {type}
            </div>
          ))}
        </div>
      </div> */}

      {/* <div className="w-full mb-3">
        <p className="text-base font-medium text-[#696969] mb-2">
          Commercial
        </p>
        <div className="flex flex-wrap items-start gap-2">
          {["+ Office", "+ Shop", "+ Warehouse"].map((type, index) => (
            <div
              key={index}
              className={`hover:cursor-pointer h-7 w-32 text-xs font-light border border-[#4A7F79] rounded-md flex items-center justify-center ${
                filters.commercial?.includes(type)
                  ? "bg-[#4A7F79] text-white"
                  : ""
              }`}
              onClick={() => handleFilterChange("commercial", type)}
            >
              {type}
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default Filters;
