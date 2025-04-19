import { useState, useEffect } from "react";

import { BsHouseDoor, BsBuildings, BsBriefcase, BsShop } from "react-icons/bs";
import { RiHotelBedLine } from "react-icons/ri";
import { MdOutlineWarehouse } from "react-icons/md";

const Filters = ({
  SetIsOpen,
  updateFilterCount,
  filters,
  setFilters,
  resetFilters,
  fetchAndFilterProperties,
  setCurrentPage,
  city,
  selectedArea,
  selectedLocality,
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
    fetchAndFilterProperties(city, selectedArea, selectedLocality);
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
    if (category === "House" || category === "Flats") {
      handleFilterChange(
        "residential",
        category === "House" ? "+ House" : "+ Flat"
      );
    } else if (category === "PG") {
      handleFilterChange("residential", "+ PG");
    } else if (category === "Office") {
      handleFilterChange("commercial", "+ Office");
      seeResults();
    } else if (category === "Shops") {
      handleFilterChange("commercial", "+ Shop");
      seeResults();
    } else if (category === "Warehouse") {
      handleFilterChange("commercial", "+ Warehouse");
      seeResults();
    }
  };

  return (
    <>
      <div className="w-full lg:w-fit  lg:bg-white  bg-[#232323] p-4 lg:p-1 lg:mt-[19.5rem]  lg:ml-8 mt-[3.9rem] shadow-sm lg:rounded-xl">
        <div className="lg:hidden flex justify-between gap-1 pb-4">
          <p className="text-xl">Select Our Service</p>
          {/* Close Button for Small Screens */}
          <button
            className="relative  right-2 text-white text-xl lg:hidden"
            onClick={() => SetIsOpen(false)}
          >
            ✖
          </button>
        </div>

        <div className="lg:flex gap-4 lg:gap-3 2xl:gap-[1.35rem] grid grid-cols-2 justify-items-center lg:justify-items-start ">
          {[
            { icon: BsHouseDoor, text: "House" },
            { icon: RiHotelBedLine, text: "PG" },
            { icon: BsBuildings, text: "Flats" },
            { icon: BsBriefcase, text: "Office" },
            { icon: BsShop, text: "Shops" },
            { icon: MdOutlineWarehouse, text: "Warehouse" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex lg:flex-col flex-row justify-center items-center lg:w-[100px] w-[140px]  cursor-pointer text-black bg-white  hover:text-[#0c8a7e] lg:hover:bg-[#C8A21C] lg:hover:text-white rounded-xl py-1.5 border-black lg:border-none border gap-2 lg:gap-0 "
              onClick={() => handleCategoryClick(item.text)}
            >
              <item.icon size={24} className="mb-2 " />
              <span className="text-xs pl-1 font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedCategory === "House" && (
        <div className=" w-full lg:bg-white bg-[#232323]  pt-2 shadow-md sm:ml-4 lg:ml-8 lg:my-2 lg:rounded-xl ">
          <div className="flex flex-col flex-wrap gap-5 lg:gap-4">
            <div className="flex flex-col">
              <h3 className="text-left font-medium mb-3 px-4 lg:text-black text-white">
                BHK
              </h3>
              <div className="flex flex-row flex-wrap gap-[2.5rem] pl-[2rem] ">
                {["+ 1 BHK", "+ 2 BHK", "+ 3 BHK", "+ 4 BHK", "+ >4 BHK"].map(
                  (bhk) => (
                    <label
                      key={bhk}
                      className="flex items-center gap-2 cursor-pointer "
                    >
                      <input
                        type="checkbox"
                        name="bhk"
                        value={bhk}
                        checked={filters.bhk.includes(bhk)}
                        onChange={() => handleFilterChange("bhk", bhk)}
                        className="appearance-none w-4 h-4 rounded-full border-2 lg:border-black border-white checked:bg-black checked:border-[#1890FF] checked:border-4 transition-all"
                      />
                      <span className="text-sm lg:text-black text-white overflow-hidden whitespace-nowrap text-ellipsis">
                        {bhk}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col ">
              <h3 className="text-left font-medium mb-3 lg:text-black text-white px-4">
                House Type
              </h3>
              <div className="flex flex-col md:flex-row lg:flex-row gap-4 pl-[2rem]">
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
                        className="appearance-none w-4 h-4 rounded-full border-2 border-white lg:border-black checked:bg-black checked:border-[#1890FF] checked:border-4 transition-all"
                      />
                      <span className="text-sm lg:text-black text-white">
                        {type}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-left font-medium mb-3 lg:text-black text-white px-4">
                Preference
              </h3>
              <div className="flex flex-row  gap-4 pl-[2rem]">
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
                      className="appearance-none w-4 h-4 rounded-full border-2 border-white lg:border-black checked:bg-black checked:border-[#1890FF] checked:border-4 transition-all"
                    />
                    <span className="text-sm lg:text-black text-white">
                      {preference}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between gap-4 p-[1rem] bg-[#1a1a1a] lg:bg-white">
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

      {selectedCategory === "Flats" && (
        <div className="w-full lg:bg-white bg-[#232323]  py-2 shadow-md sm:ml-4 lg:ml-8 lg:my-2 lg:rounded-xl">
          <div className="flex flex-col lg:gap-4 gap-5 ">
            <div className="flex flex-col">
              <h3 className="text-left font-medium mb-3 lg:text-black text-white px-4">
                BHK
              </h3>
              <div className="flex flex-wrap flex-row gap-6 pl-4">
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
                        className="appearance-none w-4 h-4 rounded-full border-2 border-white lg:border-black checked:bg-black checked:border-[#1890FF] checked:border-4 transition-all"
                      />
                      <span className="text-sm lg:text-black text-white overflow-hidden whitespace-nowrap text-ellipsis">
                        {bhk}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-left font-medium mb-3lg:text-black gap-3 text-white lg:text-black px-4">
                Flats Type
              </h3>
              <div className="flex flex-row gap-4 pl-4">
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
                        className="appearance-none w-4 h-4 rounded-full border-2 border-white lg:border-black checked:bg-black checked:border-[#1890FF] checked:border-4 transition-all"
                      />
                      <span className="text-sm lg:text-black text-white">
                        {type}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-left font-medium mb-3 lg:text-black text-white px-4">
                Preference
              </h3>
              <div className="flex flex-row gap-4 pl-4">
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
                      className="appearance-none w-4 h-4 rounded-full border-2 border-white lg:border-black checked:bg-black checked:border-[#1890FF] checked:border-4 transition-all"
                    />
                    <span className="text-sm lg:text-black text-white">
                      {preference}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between gap-4  bg-[#1a1a1a] lg:bg-white">
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

      {selectedCategory === "PG" && (
        <div className="w-full lg:bg-white bg-[#232323]  py-2 shadow-md sm:ml-4 lg:ml-8 lg:my-2 lg:rounded-xl">
          <div className="flex flex-col gap-52 lg:gap-4  ">
            <div className="flex flex-col">
              <h3 className="text-left font-medium mb-8 lg:text-black text-white px-4">
                Preference
              </h3>
              <div className="flex flex-row gap-8 px-4">
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
                      className="appearance-none w-4 h-4 rounded-full border-2 border-white lg:border-black checked:bg-black checked:border-[#1890FF] checked:border-4 transition-all"
                    />
                    <span className="text-sm lg:text-black text-white">
                      {gender}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between gap-4  bg-[#1a1a1a]  lg:bg-white">
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
    </>
  );
};

export default Filters;
