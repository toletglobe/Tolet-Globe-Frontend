import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useStateValue } from "../../../StateProvider";
import { ClipLoader } from "react-spinners";

import { FaSearch } from "react-icons/fa";

import drop from "../../../assets/propertyListing/drop.png";
import areas from "./areas";

import SelectLocation from "./components/SelectLocation";
import Filters from "./components/Filters";
import Cards from "./components/Cards";
import Pagination from "../../../reusableComponents/Pagination";

import "./listings.css";

import { API } from "../../../config/axios";

const Listing = () => {
  const { city } = useParams();
  const navigate = useNavigate();

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
  const propertiesPerPage = 9;
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

  // Extract query string from the URL
  const queryString = location.search;

  // Decode the query string
  const params = new URLSearchParams(queryString);
  const residential = params.get("residential"); // Example: Get the value of 'param1'
  const commercial = params.get("commercial"); // Example: Get the value of 'param1'

  // console.log("Got the type", residential, commercial);

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
        if (selectedArea.length > 0) {
          queryString =
            queryString +
            `&area=${selectedArea.map(encodeURIComponent).join(",")}`;
        } else if (selectedLocality) {
          queryString =
            queryString + `&locality=${encodeURIComponent(selectedLocality)}`;
        }
      }

      queryString = queryString + `&page=${currentPage}`;

      const url = `property/filter?${queryString}`;
      // console.log("Request URL:", url); // Log the constructed URL

      try {
        const response = await API.get(url);
        let propertyData = response.data.data;

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
          propertyData = fallbackResponse.data.data;
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
          sortProperties(propertyData, sortType);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
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

    fetchAndFilterProperties(
      cityParam || city,
      areaParam.length > 0 ? areaParam : [],
      localityParam || ""
    );
  }, [currentPage]);

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

  const handleSortClick = (sortType) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("sort", sortType);
    navigate(`?${queryParams.toString()}`); // Update URL with new sort query
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

    // Trigger fetchAndFilterProperties with the selected city and new search parameter
    fetchAndFilterProperties(
      city,
      queryParams.get("area") ? queryParams.get("area").split(",") : [],
      queryParams.get("locality") || ""
    );
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} />
      </div>
    );
  }
  const handleAddPropertybtn = () => {
    if (authState.status === true && localStorage.getItem("token")) {
      navigate("/landlord-dashboard", { state: { content: "AddProperty" } });
    } else {
      // toast.error("Please Log In first");
      navigate("/login");
    }
  };
  const compare = () => {
    navigate("/compare-property");
  };
  const updateFilterCount = (count) => {
    setFilterCount(count);
  };

  return (
    <>
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
        className="property h-[100vh] pb-14 lg:px-12 w-full overflow-y-auto"
        id="property"
      >
        <div className="flex flex-col gap-6 pt-6 sticky top-0 z-20 bg-black">
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

                            fetchAndFilterProperties(city, selectedArea);
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

                            fetchAndFilterProperties(
                              city,
                              newAreas,
                              selectedLocality
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
                          alert("Please select a city first");
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
                      Sort
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
                            handleSortClick("price-low-high"), setMode(false);
                          }}
                        >
                          Price: Low to High
                        </p>
                        <p
                          className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            handleSortClick("price-high-low"), setMode(false);
                          }}
                        >
                          Price: High to Low
                        </p>
                        <p
                          className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            handleSortClick("most-trending"), setMode(false);
                          }}
                        >
                          Most Trending
                        </p>
                        <p
                          className="py-2 font-medium cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            handleSortClick("date-uploaded"), setMode(false);
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

            <div className="lg:hidden md:hidden flex flex-wrap justify-between w-[96%] mx-[2%] ">
              <div
                className="flex items-center gap-4 border-l pl-4 justify-center border-black shrink-0 cursor-pointer text-black bg-white rounded-lg py-2 "
                onClick={handleMode}
              >
                <span className="text-sm md:text-lg whitespace-nowrap">
                  Sort
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
                        handleSortClick("price-low-high"), setMode(false);
                      }}
                    >
                      Price: Low to High
                    </p>
                    <p
                      className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        handleSortClick("price-high-low"), setMode(false);
                      }}
                    >
                      Price: High to Low
                    </p>
                    <p
                      className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        handleSortClick("most-trending"), setMode(false);
                      }}
                    >
                      Most Trending
                    </p>
                    <p
                      className="py-2 font-medium cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        handleSortClick("date-uploaded"), setMode(false);
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
                <div className="compare" onClick={compare}>
                  <button
                    className={`bg-white h-11 sm:h-14 w-32 text-black cursor-pointer rounded-lg flex gap-5 text-center items-center px-6 lg:py-7 font-medium ${
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
                fetchAndFilterProperties={fetchAndFilterProperties}
                setCurrentPage={setCurrentPage}
                selectedArea={selectedArea}
                selectedLocality={selectedLocality}
              />
            </div>
          </div>
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
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Listing;
