import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsHouseDoor, BsBuildings, BsBriefcase, BsShop } from "react-icons/bs";
import { RiHotelBedLine } from "react-icons/ri";
import { MdOutlineWarehouse } from "react-icons/md";

const Filters = ({
  isOpen,
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

  const navigate = useNavigate();

  // useEffect(() => {
  //   const countAppliedFilters = (filters) => {
  //     return Object.values(filters).reduce((count, filterValue) => {
  //       if (Array.isArray(filterValue)) {
  //         return count + (filterValue.length > 0 ? 1 : 0);
  //       } else {
  //         return count + (filterValue ? 1 : 0);
  //       }
  //     }, 0);
  //   };
  //   const totalFilters = countAppliedFilters(filters);
  //   updateFilterCount(totalFilters);
  // }, [filters, updateFilterCount]);
  const [pendingFilters, setPendingFilters] = useState(filters);

  const handlePendingFilterChange = (key, value) => {
    setPendingFilters((prev) => {
      if (Array.isArray(prev[key])) {
        return {
          ...prev,
          [key]: prev[key].includes(value)
            ? prev[key].filter((v) => v !== value)
            : [...prev[key], value],
        };
      } else {
        return {
          ...prev,
          [key]: prev[key] === value ? "" : value,
        };
      }
    });
  };

  const seeResults = async () => {
    setCurrentPage(1);
    fetchAndFilterProperties(city, selectedArea, selectedLocality);
    SetIsOpen(false);
  };

  const handleCategoryClick = (category) => {
    // Just toggle the subfilter view for PG, Flats, House
    if (["PG", "Flats", "House"].includes(category)) {
      setSelectedCategory(selectedCategory === category ? null : category);
      return;
    }

    // For other categories (Office, Shops, Warehouse), apply filters immediately
    setSelectedCategory(null);

    const queryParams = new URLSearchParams();

    if (category === "Office") {
      queryParams.set("commercial", "Office");
      queryParams.delete("residential");
    } else if (category === "Shops") {
      queryParams.set("commercial", "Shop");
      queryParams.delete("residential");
    } else if (category === "Warehouse") {
      queryParams.set("commercial", "Warehouse");
      queryParams.delete("residential");
    }

    // Always clear gender preference when switching
    queryParams.delete("genderPreference");

    // Navigate to update the URL
    navigate(`?${queryParams.toString()}`);

    // Reset filters (since these categories don't have subfilters)
    setFilters({
      bhk: [],
      residential: [],
      commercial: [],
      preferenceHousing: "",
      genderPreference: "",
      houseType: [],
    });

    // Optionally trigger result fetch for these direct categories
    setCurrentPage(1);
    fetchAndFilterProperties(city, selectedArea, selectedLocality);
    SetIsOpen(false);
  };

  return (
    <>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        }w-full lg:w-fit  lg:bg-white  bg-[#232323] p-4 lg:p-1 top-full left-0 mt-1 
 shadow-sm lg:rounded-xl`}
      >
        <div className="lg:hidden flex justify-between gap-1 pb-4">
          <p className="text-xl">Select Our Service</p>
          {/* Close Button for Small Screens */}
          <button
            className="relative  right-2 text-white text-xl lg:hidden"
            onClick={(e) => SetIsOpen(false)}
          >
            ✖
          </button>
        </div>

        <div className="lg:flex gap-4 lg:gap-3 2xl:gap-[1.35rem] grid grid-cols-2 justify-items-center lg:justify-items-start  ">
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
              className="flex lg:flex-col flex-row justify-center items-center lg:w-[100px] w-[140px]  cursor-pointer text-black bg-white  hover:text-[#0c8a7e] lg:hover:bg-[#C8A21C] lg:hover:text-white rounded-xl py-1.5 border-black lg:border-none border gap-2 lg:gap-0"
              onClick={() => handleCategoryClick(item.text)}
              onMouseEnter={() => {
                if (
                  item.text === "PG" ||
                  item.text === "Flats" ||
                  item.text === "House"
                ) {
                  setSelectedCategory(item.text);
                } else {
                  setSelectedCategory(null);
                }
              }}
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
                        checked={pendingFilters.bhk.includes(bhk)}
                        onChange={() => handlePendingFilterChange("bhk", bhk)}
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
                        checked={pendingFilters.houseType.includes(type)}
                        onChange={() =>
                          handlePendingFilterChange("houseType", type)
                        }
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
                      checked={pendingFilters.preferenceHousing === preference}
                      onClick={() =>
                        handlePendingFilterChange(
                          "preferenceHousing",
                          preference
                        )
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
                type="button"
                onClick={() => {
                  setFilters(pendingFilters);
                  let queryParams = new URLSearchParams();
                  queryParams.set("residential", "House");
                  queryParams.delete("commercial");

                  if (filters.bhk.length > 0)
                    queryParams.set("bhk", filters.bhk.join(","));
                  if (filters.houseType.length > 0)
                    queryParams.set("houseType", filters.houseType.join(","));
                  if (filters.preferenceHousing)
                    queryParams.set(
                      "preferenceHousing",
                      filters.preferenceHousing
                    );

                  navigate(`?${queryParams.toString()}`);
                  setCurrentPage(1);
                  fetchAndFilterProperties(
                    city,
                    selectedArea,
                    selectedLocality
                  );
                  SetIsOpen(false);
                }}
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
                        checked={pendingFilters.bhk.includes(bhk)}
                        onChange={() => handlePendingFilterChange("bhk", bhk)}
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
                        checked={pendingFilters.houseType.includes(type)}
                        onChange={() =>
                          handlePendingFilterChange("houseType", type)
                        }
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
                      checked={pendingFilters.preferenceHousing === preference}
                      onChange={() =>
                        handlePendingFilterChange(
                          "preferenceHousing",
                          preference
                        )
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
                onClick={() => {
                  setFilters(pendingFilters);
                  let queryParams = new URLSearchParams();
                  queryParams.set("residential", "Flat");
                  queryParams.delete("commercial");

                  if (filters.bhk.length > 0)
                    queryParams.set("bhk", filters.bhk.join(","));
                  if (filters.houseType.length > 0)
                    queryParams.set("houseType", filters.houseType.join(","));
                  if (filters.preferenceHousing)
                    queryParams.set(
                      "preferenceHousing",
                      filters.preferenceHousing
                    );

                  navigate(`?${queryParams.toString()}`);
                  setCurrentPage(1);
                  fetchAndFilterProperties(
                    city,
                    selectedArea,
                    selectedLocality
                  );
                  SetIsOpen(false);
                }}
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
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h3 className="text-left font-medium mb-3 lg:text-black text-white px-4">
                Preference
              </h3>
              <div className="flex flex-row gap-4 px-4">
                {["Girls", "Boys", "Any"].map((gender) => (
                  <label
                    key={gender}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="genderPreference"
                      value={gender}
                      checked={pendingFilters.genderPreference === gender}
                      onChange={() =>
                        handlePendingFilterChange("genderPreference", gender)
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
                onClick={() => {
                  setFilters(pendingFilters);
                  // When Done is clicked, apply the PG filter and gender preference
                  let queryParams = new URLSearchParams();
                  queryParams.set("residential", "PG");
                  queryParams.delete("commercial");
                  if (filters.genderPreference) {
                    queryParams.set(
                      "genderPreference",
                      filters.genderPreference
                    );
                  }
                  navigate(`?${queryParams.toString()}`);
                  setCurrentPage(1);
                  fetchAndFilterProperties(
                    city,
                    selectedArea,
                    selectedLocality
                  );
                  SetIsOpen(false);
                }}
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
