import "animate.css";
import BottomBg from "./BottomBg";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import drop from "../../../assets/property/drop.png";
import SelectLocation from "./SelectLocation";
import { FaSearch } from "react-icons/fa";
import areas from "./areas";

const citylocalities = {
  Lucknow: ["Gomti Nagar", "Aliganj", "Indira Nagar", "Chinhat", "Hazratganj"],
  Delhi: ["Connaught Place", "Saket", "Dwarka", "Rohini", "Karol Bagh"],
  Mumbai: ["Andheri", "Bandra", "Juhu", "Dadar", "Colaba"],
  // Add more cities and their localities here
};

const HomeLap = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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

  const [Location, setLocation] = useState(false);
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedArea, setSelectedArea] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [searchResults, setSearchResults] = useState({
    localities: [],
    areas: [],
  });
  const searchPanelRef = useRef(null);
  const [city, setCity] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLocalitySelect = (locality) => {
    setSelectedLocality(locality);
  };

  function addLocality(area) {
    setSelectedArea((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  }

  const resetFilters = () => {
    setFilters({
      bhk: [],
      residential: [],
      commercial: [],
      preferenceHousing: "",
      genderPreference: "",
      houseType: [],
    });
  };

  const [filters, setFilters] = useState({
    bhk: [],
    residential: [],
    commercial: [],
    preferenceHousing: "",
    genderPreference: "",
    houseType: [],
  });

  function handleLocation() {
    setLocation(!Location);
  }

  const handleSearchSelection = (value, type) => {
    const queryParams = new URLSearchParams(location.search);
    if (type === "locality") {
      handleLocalitySelect(value);
      queryParams.set("locality", value);
      navigate(`/property-listing/${city}?${queryParams.toString()}`);
    } else {
      addLocality(value);
      const currentAreas = selectedArea.includes(value)
        ? selectedArea.filter((area) => area !== value)
        : [...selectedArea, value];

      if (currentAreas.length > 0) {
        queryParams.set("area", currentAreas.join(","));
        navigate(`/property-listing/${city}?${queryParams.toString()}`);
      }
    }
    setSearchQuery("");
    setShowSearchPanel(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length === 0) {
      setShowSearchPanel(false);
      return;
    }

    // Filter localities based on selected city
    const matchingLocalities = city
      ? citylocalities[city]?.filter((locality) =>
          locality.toLowerCase().startsWith(query)
        ) || []
      : [];

    // Filter areas
    const matchingAreas = areas.filter((area) =>
      area.toLowerCase().startsWith(query)
    );

    setSearchResults({
      localities: matchingLocalities,
      areas: matchingAreas,
    });
    setShowSearchPanel(true);
  };

  return (
    <div className="relative overflow-hidden w-full h-screen">
      <div className="flex justify-center items-center h-full mb-20 mt-16">
        <div className="w-10/12 md:w-8/12 lg:w-6/12">
          <h1
            className={`absolute transform max-sm:top-32 max-sm:text-center text-4xl sm:text-5xl font-extrabold sm:font-light text-white tracking-widest transition-all lg:duration-[2000ms] md:duration-[1000ms] sm:duration-[700ms] duration-[500ms]  ease-in-out ${
              isScrolled
                ? "left-[5%] top-[12.5rem] lg:top-[19rem] opacity-100"
                : "left-[30%] top-[12.5rem] lg:top-[19rem] opacity-0"
            } `}
          >
            Welcome to To-Let Globe
          </h1>
          <h6
            className={`absolute transform max-sm:top-44 max-sm:text-xs text-xl mt-1 text-center text-[#40b5a8] font-light transition-all lg:duration-[2000ms] md:duration-[1000ms] sm:duration-[700ms] duration-[500ms] ease-in-out ${
              isScrolled
                ? "max-sm:left-[27%] max-sm:top-[22%] left-[5%] top-[17rem] lg:top-[23rem] opacity-100"
                : "left-[30%] top-[17rem] lg:top-[23rem] opacity-0"
            } `}
          >
            <span className="max-sm:block">NO BROKERAGE ON </span>
            <span className="max-sm:block">PGS | FLATS | HOUSES | OFFICES</span>
          </h6>
          <div
            className={` absolute transform transition-all max-sm:top-52 g:duration-[2000ms] md:duration-[1000ms] sm:duration-[700ms] duration-[500ms] ease-in-out w-[20%] ${
              isScrolled
                ? "left-[5%] w-[30%]  top-[53%] lg:w-[33%] opacity-100"
                : "left-[30%] w-[20%] top-[39%] lg:top-[56%] lg:w-[33%] opacity-0"
            } `}
            id="inputGroup"
          >
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-lg flex items-center p-1">
                {/* City Selection */}
                <div
                  className="flex items-center gap-4 p-2 border-r border-black cursor-pointer"
                  onClick={handleLocation}
                >
                  <span className="text-gray-700">{city || "Select City"}</span>
                  <img src={drop} alt="Dropdown" className="w-3 h-2" />
                  <SelectLocation
                    Location={Location}
                    setLocation={setLocation}
                    onLocationSelect={(selectedCity) => {
                      setCity(selectedCity);
                      resetFilters();
                      setLocation(false);
                    }}
                  />
                </div>

                {/* Search Input */}
                <div className="flex-1 flex items-center px-2">
                  <FaSearch className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search House, PG, Flats, etc"
                    value={searchQuery}
                    onClick={(e) => {
                      if (!city) {
                        alert("Please select a city first");
                        return;
                      }
                    }}
                    onChange={handleSearch}
                    className="w-full outline-none py-2 text-gray-700 placeholder-gray-400 bg-transparent"
                  />
                </div>
              </div>

              {/* Search Results Panel */}
              {showSearchPanel && (
                <div
                  ref={searchPanelRef}
                  className="bg-white rounded-2xl shadow-lg mt-2 max-h-[300px] overflow-y-auto"
                >
                  {searchResults.localities.map((locality, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center justify-between"
                      onClick={() =>
                        handleSearchSelection(locality, "locality")
                      }
                    >
                      <span>{locality}</span>
                      <span className="text-gray-500 text-sm">Locality</span>
                    </div>
                  ))}
                  {searchResults.areas.map((area, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center justify-between"
                      onClick={() => handleSearchSelection(area, "area")}
                    >
                      <span>{area}</span>
                      <span className="text-gray-500 text-sm">Area</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomBg />
    </div>
  );
};

export default HomeLap;
