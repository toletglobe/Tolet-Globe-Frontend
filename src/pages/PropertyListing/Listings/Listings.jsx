import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useStateValue } from "../../../StateProvider";
import { ClipLoader } from "react-spinners";

import { FaSearch } from "react-icons/fa";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import drop from "../../../assets/propertyListing/drop.png";
import areas from "./areas";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SelectLocation from "./components/SelectLocation";
import Filters from "./components/Filters";
import Cards from "./components/Cards";
import Pagination from "../../../reusableComponents/Pagination";

import LoginPopup from "./components/LoginPopup/LoginPopup"; // Import the LoginPopup component

import "./listings.css";

import { API } from "../../../config/axios";

const Listing = () => {
  // Add this near the top of your component, with other constants
  const cityCoordinates = {
    Lucknow: { lat: 26.8467, lng: 80.9462 },
    Ayodhya: { lat: 26.7922, lng: 82.1998 },
    Vellore: { lat: 12.9165, lng: 79.1325 },
    Kota: { lat: 25.2138, lng: 75.8648 },
  };

  const localityCoordinates = {
    Lucknow: {
      Kamta: { lat: 26.8868, lng: 81.0586 },
      Nishatganj: { lat: 26.87, lng: 80.95 },
      Hazratganj: { lat: 26.85, lng: 80.95 },
      "Gomti Nagar": { lat: 26.85, lng: 81.0 },
      "Sushant Golf City": { lat: 26.78, lng: 81.02 },
      Khargapur: { lat: 26.83, lng: 81.03 },
      Chinhat: { lat: 26.88, lng: 81.05 },
      "Indira Nagar": { lat: 26.87, lng: 81.0 },
      Aliganj: { lat: 26.88, lng: 80.94 },
      "Vinay Khand": { lat: 26.85, lng: 81.0 },
      "Patrakar Puram": { lat: 26.85, lng: 81.0 },
      "Awadh Vihar Colony": { lat: 26.78, lng: 81.02 },
      "Sunder Nagar": { lat: 26.87, lng: 80.95 },
      "Amity University": { lat: 26.78, lng: 81.02 },
      "Ismail Ganj": { lat: 26.85, lng: 80.95 },
      Rajajipuram: { lat: 26.85, lng: 80.9 },
    },
    Ayodhya: {
      Bakhtiarpur: { lat: 26.7922, lng: 82.1998 },
      Bhadohi: { lat: 26.785, lng: 82.21 },
    },
    Vellore: {
      "Vellore Cantonment": { lat: 12.9461, lng: 79.1789 },
      "Gandhi Nagar": { lat: 12.9547, lng: 79.1407 },
      "Vellore East": { lat: 12.9349, lng: 79.1469 },
      "Vellore West": { lat: 12.9349, lng: 79.1469 },
    },
    Kota: {
      "Kota Cantonment": { lat: 25.18, lng: 75.85 },
      "Kota East": { lat: 25.18, lng: 75.87 },
      "Kota West": { lat: 25.18, lng: 75.83 },
      "Kota Central": { lat: 25.18, lng: 75.85 },
    },
  };

  const { city } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.status);

  // State for managing the login popup
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showCount, setShowCount] = useState(3);

  const [Hamburger, SetHamburger] = useState(false);
  const [isOpen, SetIsOpen] = useState(false);

  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const [Location, setLocation] = useState(false);
  const location = useLocation();
  const [propertiesPerPage] = useState(9);
  const [showSelectCity, setShowSelectCity] = useState(false);
  // let selectedCity = false;
  const [favouriteList, setFavouriteList] = useState([]);
  const [{ compareProperty }, dispatch] = useStateValue();

  const [filterCount, setFilterCount] = useState(0);

  const authState = useSelector((state) => state.auth);
  const [noPropertiesFound, setNoPropertiesFound] = useState(false);
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedArea, setSelectedArea] = useState([]);
  const [moreArea, setMoreArea] = useState(false);
  // const [selectedCity, setSelectedCity] = useState("");
  const [selectedSort, setSelectedSort] = useState("Sort");
  const [availableProperties, setAvailableProperties] = useState([]);
  const [mapCenter, setMapCenter] = useState(cityCoordinates["Lucknow"]);
  const [hovered, setHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Extract query string from the URL
  const queryString = location.search;

  // Decode the query string
  const params = new URLSearchParams(queryString);
  const residential = params.get("residential"); // Example: Get the value of 'param1'
  const commercial = params.get("commercial"); // Example: Get the value of 'param1'

  const [filters, setFilters] = useState({
    bhk: [],
    residential: [],
    commercial: [],
    preferenceHousing: "",
    genderPreference: "",
    houseType: [],
  });

  // To be Updated
  const citylocalities = {
    // Respected Localities of Particular City
    Lucknow: [
      "Gomti Nagar",
      "Aliganj",
      "Indira Nagar",
      "Chinhat",
      "Hazratganj",
      "Aashiana",
      "Aminabad",
      "Surender Nagar",
      "Chowk",
      "Jankipuram",
      "Rajajipuram ",
      "Mahanagar ",
    ],
    Ayodhya: ["ayodhya1", "ayodhya2"],
    Vellore: ["vellore1", "vellore2"],
    Kota: ["kota1", "kota2"],
  };

  // Add this new state for search
  const [searchQuery, setSearchQuery] = useState("");

  // Add new state for search results
  const [searchResults, setSearchResults] = useState({
    localities: [],
    areas: [],
  });
  const [showSearchPanel, setShowSearchPanel] = useState(false);

  // Add this state for tracking window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Add a new ref for the search panel
  const searchPanelRef = useRef(null);

  const sampleLocs = [
    { key: "Kamta", location: { lat: 26.8868, lng: 81.0586 } },
    { key: "Nishatganj", location: { lat: 26.87, lng: 80.95 } },
  ];

  const position = cityCoordinates["Lucknow"];

  const PoiMarkers = (locs) => {
    return (
      // console.log("Rendering markers with locations:", locs),
      <>
        {locs.pois.map(
          (loc) => (
            console.log("Rendering marker for location:", loc),
            (
              <AdvancedMarker
                // ref={markerRef}
                key={loc.key} // Add key for each marker
                position={loc.location} // Use loc to get position
                onClick={() => navigate(`/property/${loc.key}`)}
                onMouseEnter={() => console.log("Marker hovered:", loc.key)} // Handle hover
                // onMouseOut={() => setHoveredMarker(null)} // Clear hovered marker
                // onMouseEnter={() => setHovered(loc.key)}
                // onMouseLeave={() => setHovered(false)}
              >
                <Pin
                  background={"red"}
                  glyphColor={"#000"}
                  borderColor={"#000"}
                />
              </AdvancedMarker>
            )
          )
        )}
      </>
    );
  };

  // const handleClick = useCallback((ev) => {
  //   // if (!map) return;
  //   // if (!ev.latLng) return;
  //   // console.log("marker clicked:", ev.latLng.toString());
  //   console.log("marker clicked:", ev);

  //   // map.panTo(ev.latLng);
  // });

  // Add useEffect to handle clicks outside the panel
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchPanelRef.current &&
        !searchPanelRef.current.contains(event.target)
      ) {
        setShowSearchPanel(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchFavouriteProperties = async () => {
      try {
        if (!authState?.userData?.id) {
          return;
        }

        const token = localStorage.getItem("token");

        const response = await API.post(
          "user/getFavourites",
          {
            userId: authState.userData.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const favouriteList = response.data.favouritesList.favourites;

        console.log(favouriteList);

        setFavouriteList(favouriteList);
      } catch (error) {
        console.log("Error fetching favourite properties:", error);
      }
    };
    fetchFavouriteProperties();
  }, []);

  // Add useEffect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function refresh() {
    window.location.reload(false);
  }

  function handleOpen() {
    SetIsOpen(!isOpen);
  }
  function handleHamburger() {
    SetHamburger(!Hamburger);
  }
  function handleLocation() {
    setLocation(!Location);
    setShowSelectCity(!showSelectCity);
  }
  const { slug } = useParams();
  function handleMode() {
    setMode(!mode);
  }
  function handleShowCity() {
    if (city) {
      setShowCity(!showCity);
    }
  }
  function handleShowArea() {
    if (selectedLocality) {
      setShowArea(!showArea);
    }
  }
  function addLocality(area) {
    setSelectedArea(area);
    if (selectedArea.includes(area)) {
      selectedArea.splice(selectedArea.indexOf(area), 1);
      setSelectedArea([...selectedArea]);
    } else {
      setSelectedArea([...selectedArea, area]);
    }
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

  const sortPropertiesByAvailability = (properties) => {
    return properties.slice().sort((a, b) => {
      const statusA = a.availabilityStatus.trim().toLowerCase();
      const statusB = b.availabilityStatus.trim().toLowerCase();

      if (statusA === "available" && statusB !== "available") {
        return -1;
      } else if (statusA !== "available" && statusB === "available") {
        return 1;
      }
      return 0;
    });
  };

  const fetchAndFilterProperties = async (
    selectedCity,
    selectedArea,
    selectedLocality
  ) => {
    setLoading(true);
    let propertyData = []; // Initialize as an empty array

    try {
      let cleanedFilters = {
        ...filters,
        bhk: filters.bhk.map((bhk) => bhk.replace(/[^0-9]/g, "")),
      };

      if (residential) {
        cleanedFilters = {
          ...filters,
          residential: [residential],
        };
      }

      if (commercial) {
        cleanedFilters = {
          ...filters,
          commercial: [commercial],
        };
      }

      let queryString = Object.keys(cleanedFilters)
        .filter(
          (key) => cleanedFilters[key].length > 0 || cleanedFilters[key] !== ""
        )
        .map((key) => {
          const value = Array.isArray(cleanedFilters[key])
            ? cleanedFilters[key].map(encodeURIComponent).join(",")
            : encodeURIComponent(cleanedFilters[key]);
          return `${encodeURIComponent(key)}=${value}`;
        })
        .join("&");

      if (selectedCity) {
        queryString = queryString + `&city=${encodeURIComponent(selectedCity)}`;
        setMapCenter(cityCoordinates[selectedCity]);
        if (selectedArea.length > 0) {
          queryString =
            queryString +
            `&area=${selectedArea.map(encodeURIComponent).join(",")}`;
        } else if (selectedLocality) {
          queryString =
            queryString + `&locality=${encodeURIComponent(selectedLocality)}`;
          setMapCenter(localityCoordinates[selectedCity][selectedLocality]);
        }
      }

      queryString = queryString + `&page=${currentPage}`;

      const url = `property/filter?${queryString}`;
      // console.log("Request URL:", url); // Log the constructed URL

      try {
        const response = await API.get(url);

        propertyData = response.data.data || [];

        let available = propertyData
          .filter((property) => property.availabilityStatus === "Available")
          .map((property) => ({
            key: property.slug,
            location: {
              lat: parseFloat(property.latitude),
              lng: parseFloat(property.longitude),
            },
          }));

        setAvailableProperties(available);

        console.log("Available properties:", available);

        // Handle fallback logic if no properties are found
        if (
          propertyData.length === 0 &&
          selectedArea.length > 0 &&
          selectedLocality
        ) {
          queryString = queryString.replace(
            /&area=[^&]*/,
            `&locality=${encodeURIComponent(selectedLocality)}`
          );
          const fallbackUrl = `property/filter?${queryString}`;
          const fallbackResponse = await API.get(fallbackUrl);
          propertyData = fallbackResponse.data.data || []; // Ensure fallback data is also an array
        }

        // Sort properties by availability status (available first, then others)
        if (propertyData && Array.isArray(propertyData)) {
          propertyData = sortPropertiesByAvailability(propertyData);
        }

        setProperties(propertyData);
        setTotalPages(response.data.totalPages || 1);
        setNoPropertiesFound(propertyData.length === 0);

        // Handle additional sorting if needed
        const searchParams = new URLSearchParams(location.search);
        const sortType = searchParams.get("sort");
        if (sortType && Array.isArray(propertyData)) {
          propertyData = sortPropertiesByAvailability(propertyData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
    return propertyData; // Return the property data
  };

  const remainingPropertyCount =
    totalPages && (totalPages - currentPage) * propertiesPerPage;

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchAndFilterProperties(city, selectedArea, selectedLocality).then(
        (data) => {
          if (Array.isArray(data)) {
            setProperties((prevProperties) => [...prevProperties, ...data]);
          }
        }
      );
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get("city");
    const areaParam = params.get("area") ? params.get("area").split(",") : [];
    const localityParam = params.get("locality");

    setCurrentPage(1);
    fetchAndFilterProperties(
      cityParam || city,
      areaParam.length > 0 ? areaParam : [],
      localityParam || ""
    );
  }, [city, location.search]); // Add city to the dependency array

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get("city");
    const areaParam = params.get("area") ? params.get("area").split(",") : [];
    const localityParam = params.get("locality");
    setSelectedArea(areaParam || []);
    setSelectedLocality(localityParam || "");

    fetchAndFilterProperties(
      cityParam || city,
      areaParam.length > 0 ? areaParam : [],
      localityParam || ""
    );
  }, [currentPage]);
  
  useEffect(() => {
    // Determine if all required sub-options are selected
    const isHouse = filters.residential.includes("+ House");
    const isFlat = filters.residential.includes("+ Flat");
    const isPG = filters.residential.includes("+ PG");
    const isCommercial = filters.commercial.length > 0;

    let shouldFetch = false;
    if (isHouse) {
      shouldFetch = filters.bhk.length > 0 && filters.houseType.length > 0 && filters.preferenceHousing !== "";
    } else if (isFlat) {
      shouldFetch = filters.bhk.length > 0 && filters.houseType.length > 0 && filters.preferenceHousing !== "";
    } else if (isPG) {
      shouldFetch = filters.genderPreference && filters.genderPreference.length > 0;
    } else if (isCommercial) {
      shouldFetch = true;
    } else {
      shouldFetch = true;
    }

    if (shouldFetch) {
      fetchAndFilterProperties(city, selectedArea, selectedLocality);
    }
    // eslint-disable-next-line
  }, [filters, city, selectedArea, selectedLocality, currentPage]);


  // Sorting logic
  const sortProperties = (properties, sortType) => {
    let sortedProperties = [...properties];

    if (sortType === "price-low-high") {
      sortedProperties.sort((a, b) => a.rent - b.rent);
    } else if (sortType === "price-high-low") {
      sortedProperties.sort((a, b) => b.rent - a.rent);
    } else if (sortType === "most-trending") {
      sortedProperties.sort((a, b) => b.reviews.length - a.reviews.length);
    } else if (sortType === "date-uploaded") {
      sortedProperties.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setProperties(sortedProperties);
  };

  const handleSortClick = (sortType, label) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("sort", sortType);
    navigate(`?${queryParams.toString()}`); // Update URL with new sort query
    setSelectedSort(label);
    setMode(false);
  };

  const handleLocalitySelect = (locality) => {
    setSelectedLocality(locality); // Update selected locality
  };

  // Add this function to handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length === 0) {
      setShowSearchPanel(false);
      return;
    }

    // Filter localities based on selected city
    const matchingLocalities = city
      ? citylocalities[city].filter((locality) =>
          locality.toLowerCase().startsWith(query)
        )
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
  const handleSearchSelection = (value, type) => {
    const queryParams = new URLSearchParams(location.search);

    if (type === "locality") {
      handleLocalitySelect(value);
      queryParams.set("locality", value);
    } else {
      addLocality(value);
      const currentAreas = selectedArea.includes(value)
        ? selectedArea.filter((area) => area !== value)
        : [...selectedArea, value];

      if (currentAreas.length > 0) {
        queryParams.set("area", currentAreas.join(","));
      } else {
        queryParams.delete("area");
      }
    }

    setSearchQuery("");
    setShowSearchPanel(false);

    // Update the URL with the new search parameter
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const handleAddPropertybtn = () => {
    if (authState.status === true && localStorage.getItem("token")) {
      navigate("/landlord-dashboard", { state: { content: "AddProperty" } });
    } else {
      // Show the login popup instead of navigating to the login page
      setShowLoginPopup(true);
    }
  };
  const handleVisit = () => {
    if (!isLoggedIn) {
      // Show the login popup instead of navigating to the login page
      setShowLoginPopup(true);
    } else {
      // Proceed with the visit logic (e.g., show property details)
      compare();
    }
  };
  const compare = () => {
    navigate("/compare-property");
  };
  const updateFilterCount = (count) => {
    setFilterCount(count);
  };
  
  
  if (loading && currentPage === 1) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} />
      </div>
    );
  }
  return (
    <>
      {showLoginPopup && (
        <LoginPopup onClose={() => setShowLoginPopup(false)} />
      )}
      <div
        onClick={() => {
          if (Location === true) setLocation(false);
          if (isOpen === true) SetIsOpen(false);
        }}
        className={`bg-black opacity-80 h-[2600px] absolute z-20 ${
          isOpen || Hamburger || Location ? "block" : "hidden"
        }`}
      ></div>
      <section
        onClick={() => {
          if (mode === true) setMode(false);
          if (Location === true) setLocation(false);
          if (showCity === true) setShowCity(false);
          if (isOpen === true) SetIsOpen(false);
        }}
        className="property h-[100vh] pb-3 lg:px-12 w-full overflow-y-auto"
        id="property"
      >
        <div className="flex flex-col gap-6 pt-6 sticky top-0 z-20 bg-black md:pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-10 gap-4 text-sm md:text-lg">
            <div className="bg-white sm:col-span-8 md:col-span-6 rounded-md lg:w-full w-[96%] mx-[2%] ">
              <div className="flex flex-wrap items-center text-black  text-sm md:text-lg">
                {/* Select city dropdown */}
                <div
                  className="flex items-center gap-4 px-3 py-2 my-1  shrink-0 border-r border-black"
                  onClick={handleLocation}
                >
                  <div className="py-1 px-1 hover:cursor-pointer">
                    <p>{!city || Location ? "Select City" : city}</p>
                  </div>
                  <div className="items-center cursor-pointer">
                    <img src={drop} alt="Dropdown" className="cursor-pointer" />
                  </div>
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

                {/* Select area searchbar */}
                <div className="flex-1 min-w-0 flex items-center gap-2 px-4 lg:px-8 my-1 text-sm md:text-lg">
                  <FaSearch className="text-black shrink-0" />
                  <div className="flex flex-wrap items-center gap-1 py-2 w-full overflow-x-hidden">
                    {selectedLocality && (
                      <div className="flex items-center gap-1 bg-[#EED98B] px-2 py-1 rounded-full shrink-0">
                        <span className="text-sm">{selectedLocality}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => {
                            setSelectedLocality("");

                            const queryParams = new URLSearchParams(
                              location.search
                            );
                            queryParams.delete("locality");
                            navigate(
                              `${location.pathname}?${queryParams.toString()}`
                            );
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
                        className="flex items-center bg-[#EED98B] px-2 py-1 rounded-full shrink-0"
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

                            const queryParams = new URLSearchParams(
                              location.search
                            );
                            if (newAreas.length > 0) {
                              queryParams.set("area", newAreas.join(","));
                            } else {
                              queryParams.delete("area");
                            }
                            navigate(
                              `${location.pathname}?${queryParams.toString()}`
                            );
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
                          ? "Search by Locality or Area..."
                          : "Search by Locality or Area..."
                      }
                      value={searchQuery}
                      onClick={(e) => {
                        if (!city) {
                          toast.error("Please select a city first", {
                            position: "top-center",
                          });
                          return;
                        }
                      }}
                      onChange={(e) => {
                        handleSearch(e);
                      }}
                      className="outline-none bg-transparent text-black placeholder-gray-500 min-w-[100px] flex-1 text-xs lg:text-xl"
                    />
                  </div>

                  {showSearchPanel &&
                    (searchResults.localities.length > 0 ||
                      searchResults.areas.length > 0) && (
                      <div
                        ref={searchPanelRef}
                        className="absolute top-20 left-36 mt-2 lg:w-[32%] w-[52%] xs:w-[59%] bg-white rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto"
                      >
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
                              className="px-2 py-2 hover:bg-gray-100 cursor-pointer text-black flex items-center justify-between"
                              onClick={() =>
                                handleSearchSelection(
                                  item,
                                  isLocality ? "locality" : "area"
                                )
                              }
                            >
                              <span className="text-black">{item}</span>
                              <span className="text-gray-500 min-w-[60px] text-end">
                                {isLocality ? "Locality" : "Area"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                </div>

                {/* Filter and sort in desktop */}
                <div className="hidden lg:flex md:flex">
                  <div
                    className="flex items-center gap-2 border-l px-3 border-black shrink-0 cursor-pointer"
                    onClick={handleOpen}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm md:text-lg whitespace-nowrap">
                        Filters
                      </span>
                      <img
                        src={drop}
                        alt="Dropdown"
                        className="cursor-pointer"
                      />
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-2 border-l pl-3 lg:px-12 border-black shrink-0 cursor-pointer"
                    onClick={handleMode}
                  >
                    <span className="text-sm md:text-lg whitespace-nowrap">
                      {selectedSort}
                    </span>
                    <img
                      src={drop}
                      alt="Dropdown"
                      className={`${
                        mode ? "rotate-180" : "rotate-0"
                      } cursor-pointer`}
                    />
                    <div className="relative text-sm lg:text-lg">
                      <div
                        className={`${
                          mode ? "block" : "hidden"
                        } z-50 absolute bg-white shadow-lg rounded-lg text-center w-40 py-3 top-[30px] left-[-150px] sm:top-[36px] sm:left-[-113px]`}
                      >
                        <p
                          className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            handleSortClick(
                              "price-low-high",
                              "Price: Low to High"
                            );
                          }}
                        >
                          Price: Low to High
                        </p>
                        <p
                          className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            handleSortClick(
                              "price-high-low",
                              "Price: High to Low"
                            );
                          }}
                        >
                          Price: High to Low
                        </p>
                        <p
                          className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            handleSortClick("most-trending", "Most Trending");
                          }}
                        >
                          Most Trending
                        </p>
                        <p
                          className="py-2 font-medium cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            handleSortClick("date-uploaded", "Date Uploaded");
                          }}
                        >
                          Date Uploaded
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* filter and sort in mobiles */}
            <div className="lg:hidden md:hidden flex flex-wrap justify-between w-[96%] mx-[2%] ">
              <div
                className="flex items-center gap-4 border-l pl-4 justify-center border-black shrink-0 cursor-pointer text-black bg-white rounded-lg py-2 "
                onClick={handleMode}
              >
                <span className="text-sm md:text-lg whitespace-nowrap">
                  {selectedSort}
                </span>
                <img
                  src={drop}
                  alt="Dropdown"
                  className={`${
                    mode ? "rotate-180" : "rotate-0"
                  } cursor-pointer`}
                />
                <div className="relative text-sm lg:text-lg">
                  <div
                    className={`${
                      mode ? "block" : "hidden"
                    } z-50 absolute bg-white shadow-lg rounded-lg text-center w-40 py-3 top-[30px] lg:left-[-150px] left-[-85px] sm:top-[36px] sm:left-[-110px]`}
                  >
                    <p
                      className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        handleSortClick("price-low-high", "Price: Low to High");
                      }}
                    >
                      Price: Low to High
                    </p>
                    <p
                      className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        handleSortClick("price-high-low", "Price: High to Low");
                      }}
                    >
                      Price: High to Low
                    </p>
                    <p
                      className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        handleSortClick("most-trending", "Most Trending");
                      }}
                    >
                      Most Trending
                    </p>
                    <p
                      className="py-2 font-medium cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        handleSortClick("date-uploaded", "Date Uploaded");
                      }}
                    >
                      Date Uploaded
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center gap-2 border-l py-3  px-3 border-black shrink-0 cursor-pointer text-black bg-white rounded-lg"
                onClick={handleOpen}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-lg whitespace-nowrap">
                    Filters
                  </span>
                  <img src={drop} alt="Dropdown" className="cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4 md:col-span-4 flex w-fit xs:w-[50%]  items-center justify-center lg:justify-between -mt-[76px] ml-[98px] xs:[96px] lg:ml-4 lg:mt-0">
              {compareProperty.length >= 1 && (
                <div className="compare">
                  <button
                    onClick={handleVisit}
                    className={`bg-white h-11 sm:h-14 w-20 md:w-32 ml-20 md:ml-0 text-black cursor-pointer rounded-lg flex gap-2 lg:gap-5 text-center items-center px-3 sm:px-7 lg:py-7 text-sm font-medium ${
                      compareProperty.length <= 0
                        ? "opacity-50 grayscale cursor-not-allowed"
                        : ""
                    }`}
                    disabled={compareProperty.length <= 0}
                  >
                    Visit
                    <div className="bg-[#EED98B] rounded-full flex items-center justify-center px-2">
                      {compareProperty.length}
                    </div>
                  </button>
                </div>
              )}

              <div className="hidden">
                <a
                  onClick={handleAddPropertybtn}
                  className="bg-white w-30 h-12 sm:h-14 text-black flex items-center justify-center px-5 rounded-lg cursor-pointer"
                >
                  Add a property
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            if (isOpen) SetIsOpen(false);
          }}
          className={`fixed lg:absolute inset-0 z-30 lg:z-50  flex sm:items-center lg:item-center bg-black bg-opacity-50 sm:bg-transparent lg:bg-black/50 transition-opacity duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute top-0  right-0 w-full lg:w-fit h-full lg:h-auto bg-black text-white shadow-lg transition-transform duration-300 ease-in-out transform z-40 
            ${isOpen ? "translate-x-0" : "translate-x-full"} 
            sm:relative sm:w-full sm:h-auto sm:translate-x-0 sm:bg-transparent sm:shadow-none sm:block`}
          >
            <div className="lg:p-0 lg:absolute lg:-top-[35rem] 2xl:-top-[34rem] lg:left-[11rem] 2xl:left-[11rem]">
              <Filters
                SetIsOpen={SetIsOpen}
                setProperties={setProperties}
                city={city}
                updateFilterCount={updateFilterCount}
                filterCount={filterCount}
                setTotalPages={setTotalPages}
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                setCurrentPage={setCurrentPage}
                selectedArea={selectedArea}
                selectedLocality={selectedLocality}
              />
            </div>
          </div>
        </div>

        {/* Pin Location on Map */}
        {/* <div>{renderMap()}</div> */}
        <div className="w-full h-[400px] rounded-md border-[1.5px] border-[#C8C8C8]">
          {" "}
          <Map
            defaultZoom={11}
            defaultCenter={mapCenter}
            mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
            options={{
              maxZoom: 13, // Set the maximum zoom level
            }}
          >
            <PoiMarkers pois={availableProperties} />
          </Map>
          {/* {hovered && (
            <p className="mt-2 text-[#C8C8C8] text-sm">Selected coordinates:</p>
          )} */}
        </div>

        <div className="pt-3">
          {properties.length === 0 ? (
            <p className="text-center text-lg font-semibold mt-10">
              No properties found
            </p>
          ) : (
            <Cards
              properties={properties}
              favouriteList={favouriteList}
              setFavouriteList={setFavouriteList}
            />
          )}
        </div>

        {loading && (
          <div className="flex justify-center my-4">
            <ClipLoader color="#6CC1B6" size={50} />
          </div>
        )}

        
      </section>
    </>
  );
};

export default Listing;
