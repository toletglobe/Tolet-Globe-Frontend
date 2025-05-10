import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import drop from "../../../../assets/propertyListing/drop.png";
// import background from "../../../assets/background.png";
import SelectLocation from "./SelectLocation";
import { FaSearch } from "react-icons/fa";
import areas from "./areas";
import "./style/mobileBackground.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// -----------Birds Img------------
import bird1 from "../../../../assets/home/landingAnimation/birds/bird1.svg";
import bird2 from "../../../../assets/home/landingAnimation/birds/bird2.svg";

// -----------Cloud IMG------------
import cloud1 from "../../../../assets/home/landingAnimation/cloud/cloud1.svg";
import cloud2 from "../../../../assets/home/landingAnimation/cloud/cloud2.svg";
import cloud3 from "../../../../assets/home/landingAnimation/cloud/cloud3.svg";

//------------Hand IMG--------------
import hand from "../../../../assets/home/landingAnimation/hand/hand.svg";

// ------------House Img-------------
import chimney from "../../../../assets/home/landingAnimation/house/chimney.svg";
import wall1 from "../../../../assets/home/landingAnimation/house/wall-1.svg";
import wall2 from "../../../../assets/home/landingAnimation/house/wall-2.svg";
import roof1 from "../../../../assets/home/landingAnimation/house/roof.svg";
import roof2 from "../../../../assets/home/landingAnimation/house/roof-top.svg";
import roof3 from "../../../../assets/home/landingAnimation/house/backroof.svg";
import roof4 from "../../../../assets/home/landingAnimation/house/rooftop1.svg";
import gate from "../../../../assets/home/landingAnimation/house/gate.svg";
import frontw1 from "../../../../assets/home/landingAnimation/house/window1.svg";
import frontw2 from "../../../../assets/home/landingAnimation/house/window2.svg";
import frontw3 from "../../../../assets/home/landingAnimation/house/window3.svg";
import frontw4 from "../../../../assets/home/landingAnimation/house/window4.svg";
import frontw5 from "../../../../assets/home/landingAnimation/house/window5.svg";
import frontw6 from "../../../../assets/home/landingAnimation/house/window6.svg";

// ---------- Plant Img----------
import plant1 from "../../../../assets/home/landingAnimation/plant/plant1.svg";
import plant2 from "../../../../assets/home/landingAnimation/plant/plant2.svg";

//--------------Sun IMG-------------
import sun from "../../../../assets/home/landingAnimation/sun/sun.svg";

// ---------- Background Img----------
import bg1 from "../../../../assets/home/landingAnimation/background/grey.svg";
import bg2 from "../../../../assets/home/landingAnimation/background/black.svg";

const citylocalities = {
  Lucknow: ["Gomti Nagar", "Aliganj", "Indira Nagar", "Chinhat", "Hazratganj"],
  Delhi: ["Connaught Place", "Saket", "Dwarka", "Rohini", "Karol Bagh"],
  Mumbai: ["Andheri", "Bandra", "Juhu", "Dadar", "Colaba"],
  // Add more cities and their localities here
};

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
    <div className="mobile-view-container">
      <ToastContainer />
      <div className="h-screen relative">
        {/* Main Content */}
        <div className="relative z-10 px-4 pt-20">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mt-12">
              Welcome to To-Let Globe
            </h1>
            <p className="text-[#3cbdb1] text-base md:text-lg ml-1 md:ml-0">
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
                      toast.error("Please select a city first",
                        { position: "top-center", }
                      );
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
                    onClick={() => handleSearchSelection(locality, "locality")}
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

        {/* Mobile Background Components - always in final position */}
        <div className="mobile-bottom-bg">
          <div className="hand">
            <img src={hand} alt="hand" />
          </div>
          <div className="bg-1">
            <img src={bg1} alt="background-1" />
          </div>
          <div className="bg-2">
            <img src={bg2} alt="background-2" />
          </div>

          {/* Sun */}
          <div className="sun-circle">
            <img src={sun} alt="sun" />
          </div>
          {/* Plants */}
          <div className="plant-1">
            <img src={plant1} alt="plant-1" />
          </div>
          <div className="plant-2">
            <img src={plant2} alt="plant-2" />
          </div>

          {/* Walls */}
          <div className="wall-1">
            <img src={wall1} alt="wall-1" />
          </div>
          <div className="wall-2">
            <img src={wall2} alt="wall-2" />
          </div>

          {/* Windows */}
          <div className="window-1">
            <img src={frontw1} alt="window-1" />
          </div>
          <div className="window-2">
            <img src={frontw2} alt="window-2" />
          </div>
          <div className="window-3">
            <img src={frontw3} alt="window-3" />
          </div>
          <div className="window-4">
            <img src={frontw4} alt="window-4" />
          </div>
          <div className="window-5">
            <img src={frontw5} alt="window-5" />
          </div>
          <div className="window-6">
            <img src={frontw6} alt="window-6" />
          </div>

          {/* Gate */}
          <div className="gate">
            <img src={gate} alt="gate" />
          </div>

          {/* Chimney */}
          <div className="chimney">
            <img src={chimney} alt="chimney" />
          </div>

          {/* Roofs */}
          <div className="roof-1">
            <img src={roof1} alt="roof-1" />
          </div>
          <div className="roof-2">
            <img src={roof2} alt="roof-2" />
          </div>
          <div className="roof-3">
            <img src={roof3} alt="roof-3" />
          </div>
          <div className="roof-4">
            <img src={roof4} alt="roof-4" />
          </div>

          {/* Birds */}
          <div className="bird-1">
            <img src={bird1} alt="bird-1" />
          </div>
          <div className="bird-2">
            <img src={bird2} alt="bird-2" />
          </div>

          {/* Clouds */}
          <div className="cloud-1">
            <img src={cloud1} alt="cloud-1" />
          </div>
          <div className="cloud-2">
            <img src={cloud2} alt="cloud-2" />
          </div>
          <div className="cloud-3">
            <img src={cloud3} alt="cloud-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMobile;
