import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import drop from "../../../assets/property/drop.png";
import background from "../../../assets/background.png";
import SelectLocation from "./SelectLocation";
import { FaSearch } from "react-icons/fa";
import areas from "./areas";

// Typewriter Effect Component
const TypewriterEffect = () => {
  const words = [" PGS", " FLATS", " HOUSES", " OFFICES"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100; // Speed for typing effect
  const deletingSpeed = 50; // Speed for deleting effect
  const delayBetweenWords = 1000; // Delay before erasing

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    if (!isDeleting && displayedText.length < currentWord.length) {
      // Typing effect
      setTimeout(() => {
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting effect
      setTimeout(() => {
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
      }, deletingSpeed);
    } else if (!isDeleting && displayedText.length === currentWord.length) {
      // Pause before deleting
      setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenWords);
    } else if (isDeleting && displayedText.length === 0) {
      // Move to the next word
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }
  }, [displayedText, isDeleting, currentWordIndex]);

  return <span className="text-[#c8a217] font-bold">{displayedText}|</span>;
};

const HomeMobile = () => {
  const [Location, setLocation] = useState(false);
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedArea, setSelectedArea] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchPanel, setShowSearchPanel] = useState(false);
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
      navigate(`/property-listing/?${queryParams.toString()}`);
    } else {
      addLocality(value);
      const currentAreas = selectedArea.includes(value)
        ? selectedArea.filter((area) => area !== value)
        : [...selectedArea, value];

      if (currentAreas.length > 0) {
        queryParams.set("area", currentAreas.join(","));
        navigate(`/property-listing/?${queryParams.toString()}`);
      }
    }
    setSearchQuery("");
    setShowSearchPanel(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query) {
      setShowSearchPanel(false);
      return;
    }
    setShowSearchPanel(true);
  };

  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Main Content */}
      <div className="relative z-10 px-4 pt-20">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mt-12">
            Welcome to To-Let Globe
          </h1>
          <p className="text-[#3cbdb1] text-lg">
            NO BROKERAGES ON 
            <TypewriterEffect /> {/* Integrated Typewriter Effect */}
          </p>
        </div>

        {/* Search Container */}
        <div className="max-w-xl mx-auto mt-8">
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
                  resetFilters();
                  navigate(`/property-listing/${selectedCity}`);
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
              {areas.map((area, index) => (
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
  );
};

export default HomeMobile;
