import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./listing.css";
import hamburger from "../../assets/property/hamburger.png";
import drop from "../../assets/property/drop.png";
import loc from "../../assets/property/location.png";
import SelectLocation from "./listingComponents/SelectLocation";
import Filters from "./listingComponents/Filters";
import Cards from "./listingComponents/Cards";
import Pagination from "./listingComponents/Pagination";
import { ClipLoader } from "react-spinners";
import { useStateValue } from "../../StateProvider";
import { BASE_URL } from "../../constant/constant";
import axios from "axios";

const Listing = () => {
  const { city } = useParams();
  const navigate = useNavigate();

  const [Hamburger, SetHamburger] = useState(false);
  const [isOpen, SetIsOpen] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const [Location, setLocation] = useState(false);
  const location = useLocation();
  const propertiesPerPage = 9;

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
  const localityareas = {
    // Respected Area of Particular Locality
    "Gomti Nagar": [
      "Vibhuti Khand",
      "Viram Khand",
      "Vijay Khand",
      "Vikas Khand",
      "Vipul Khand",
      "Vardan Khand",
      "Vinay Khand",
      "Gomti Nagar Extension",
      "Patrakarpuram",
      "Faizabad Road (nearby)",
    ],
    Aliganj: [
      "Sector A",
      "Sector B",
      "Sector C",
      "Sector D",
      "Sector E",
      "Sector F",
      "Purania",
      "Kapoorthala",
      "Tedhi Pulia",
    ],
    "Indira Nagar": [
      "Sector 1",
      "Sector 2",
      "Sector 3",
      "Sector 5",
      "Sector 9",
      "Sector 11",
      "Sector 14",
      "Sector 16",
      "Sector 18",
      "Sector 19",
      "Munshipulia (nearby junction)",
    ],
    Hazratganj: [
      "Ganj Market",
      "Janpath Market",
      "MG Marg (Mahatma Gandhi Marg)",
      "GPO (General Post Office)",
      "Hazratganj Crossing",
      "Sikandar Bagh (nearby)",
    ],
    Aashiana: [
      "Aashiana Phase 1",
      "Aashiana Phase 2",
      "Aashiana Phase 3",
      "LDA Colony",
      "Kanpur Road",
      "Ruchi Khand",
      "Ratan Khand",
      "South City (adjacent)",
    ],
    Aminabad: [
      "Gandhi Market",
      "Pratap Market",
      "Latouche Road",
      "Aminabad Bazaar",
      "Kesar Bagh",
      "Hanuman Temple",
    ],
    Chowk: [
      "Gol Darwaza",
      "Nakhas Market",
      "Tunday Kababi Lane",
      "Akbari Gate",
      "Kashmiri Mohalla",
      "Chikan Market",
    ],
    Jankipuram: [
      "Sector A",
      "Sector B",
      "Sector C",
      "Jankipuram Extension",
      "Kursi Road (nearby)",
      "Engineering College Crossing",
    ],
    Rajajipuram: [
      "Sector 1",
      "Sector 2",
      "Sector 3",
      "Sector 4",
      "Sector 6",
      "Sector 7",
      "C Block",
      "G Block",
      "H Block",
    ],
    Mahanagar: [
      "Mahanagar Extension",
      "Sector A",
      "Sector B",
      "Sector C",
      "Sector D",
      "Gol Market (within Mahanagar)",
      "Nishatganj (adjacent)",
    ],
  };

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

  const fetchAndFilterProperties = async () => {
    setLoading(true);

    try {
      let propertyData = [];

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

      if (city) {
        queryString = queryString + `&city=${city}`;
        if (selectedLocality) {
          queryString = queryString + `&locality=${selectedLocality}`;
          if (selectedArea.length > 0) {
            queryString = queryString + `&area=${selectedArea.join(",")}`;
          }
        }
      }

      queryString = queryString + `&page=${currentPage}`;

      const url = `${BASE_URL}property/filter?${queryString}`;
      console.log("Genr URL: ", url);

      try {
        const response = await axios.get(url);
        setProperties(response.data.data); // Update properties with the filtered results
        setTotalPages(response.data.totalPages || 1);
        // setCurrentPage(1);
        if (response.data.data.length === 0) {
          console.log("No results found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      // Filter by locality if selected
      if (selectedLocality) {
        propertyData = propertyData.filter(
          (property) => property.locality === selectedLocality
        );
      }
      if (selectedArea.length > 0 && selectedLocality) {
        propertyData = propertyData.filter(
          (property) => property.locality === selectedLocality
        );

        propertyData = propertyData.filter((property) =>
          selectedArea.includes(property.area)
        );
      }
      // Sort by created date
      propertyData.properties.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Set filtered properties
      setProperties(filteredProperties);

      // Check if no properties were found
      setNoPropertiesFound(filteredProperties.length === 0);

      // Check for sorting
      const sortType = searchParams.get("sort");
      if (sortType) {
        sortProperties(filteredProperties, sortType);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchAndFilterProperties();
  }, [city, location.search, selectedLocality, selectedArea]); // Add city to the dependency array

  useEffect(() => {
    fetchAndFilterProperties();
  }, [currentPage]);

  // useEffect(() => {
  //   setCurrentPage(1); // Reset to page 1 when these filters change
  // }, [city, selectedLocality, selected Area]);

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

  // Get current properties
  // const indexOfLastProperty = currentPage * propertiesPerPage;
  // const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  // const currentProperties = Array.isArray(properties)
  //   ? properties.slice(indexOfFirstProperty, indexOfLastProperty)
  //   : [];

  const handleSortClick = (sortType) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("sort", sortType);
    navigate(`?${queryParams.toString()}`); // Update URL with new sort query
  };

  const handleLocalitySelect = (locality) => {
    setSelectedLocality(locality); // Update selected locality
    // console.log(locality);
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
        className={`bg-black opacity-80 w-full h-[2600px] absolute z-20 ${
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
        className="property h-[100vh] pb-14 px-10 w-full overflow-y-auto"
        id="property"
      >
        {/* <div className="container mx-auto  px-10"> */}
        <div className="px-3 flex flex-col gap-8 py-6 sticky top-0 z-20 bg-black">
          <div className="flex items-center justify-between">
            <p className="lg:text-[45px] md:text-4xl text-2xl text-[#C8A21C] font-bold">
              Property Listing
            </p>
            <img
              src={hamburger}
              alt="Hamburger Menu"
              className="cursor-pointer lg:w-12 md:w-11 w-9 h-auto"
            />
          </div>
          <div className="flex justify-between gap-14 w-full flex-wrap">
            <div className="flex items-center justify-between gap-20 md:gap-36 lg:gap-36 flex-col md:flex-row lg:flex-row">
              <div className="bg-white h-14 w-64 md:w-fit lg:w-fit flex items-center justify-between text-black px-4 rounded-md">
                <div className="flex items-center justify-start gap-2 md:gap-4 lg:gap-4 border-r-2 h-3/4 border-black">
                  <p className="text-black">Sort</p>
                  <img
                    src={drop}
                    alt="Dropdown"
                    className={`${
                      mode ? "rotate-180" : "rotate-0"
                    } mt-1 cursor-pointer`}
                    onClick={handleMode}
                  />
                  <div className="relative">
                    <div
                      className={`${
                        mode ? "block" : "hidden"
                      } z-50 absolute bg-white shadow-lg rounded-lg text-center w-40 py-3 top-[50px] left-[-110px]`}
                    >
                      <p
                        className="border-b-2 py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          handleSortClick("price-low-high"), setMode(false);
                        }}
                      >
                        Price: Low to High
                      </p>
                      <p
                        className="border-b-2 py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          handleSortClick("price-high-low"), setMode(false);
                        }}
                      >
                        Price: High to Low
                      </p>
                      <p
                        className="py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          handleSortClick("most-trending"), setMode(false);
                        }}
                      >
                        Most Trending
                      </p>
                      <p
                        className="py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          handleSortClick("date-uploaded"), setMode(false);
                        }}
                      >
                        Date Uploaded
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center  gap-4 pl-2">
                  <div className="text-sm py-1 px-4 bg-[#EED98B] rounded-full hover:cursor-pointer">
                    <p onClick={handleLocation}>
                      {!city ? "Select City" : city}
                    </p>
                  </div>
                  <div>
                    <img
                      src={loc}
                      alt="Location"
                      className="hover:cursor-pointer"
                      onClick={handleShowCity}
                    />
                    {showCity ? (
                      <div className="relative">
                        <div
                          className={`z-50 absolute bg-white shadow-lg rounded-lg text-center w-40 top-[25px] left-[-110px]`}
                        >
                          {citylocalities[city].map((locality, index) => {
                            // console.log(area, index);
                            return (
                              <p
                                className="border-b-2 py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                                onClick={() => handleLocalitySelect(locality)}
                                key={index}
                              >
                                {locality}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {selectedLocality ? (
                    <>
                      <div className="text-sm py-1 px-4 bg-[#EED98B] rounded-full hover:cursor-pointer">
                        <p>{selectedLocality}</p>
                      </div>
                      <div>
                        <img
                          src={loc}
                          alt="Location"
                          className="hover:cursor-pointer"
                          onClick={handleShowArea}
                        />
                        {showArea ? (
                          <div className="relative">
                            <div
                              className={`z-50 absolute bg-white shadow-lg rounded-lg text-center w-40 top-[25px] left-[-110px]`}
                            >
                              {localityareas[selectedLocality].map(
                                (area, index) => {
                                  // console.log(locality, index);

                                  return (
                                    <p
                                      className="border-b-2 py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                                      onClick={() => addLocality(area)}
                                      key={index}
                                    >
                                      {area}
                                    </p>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {selectedArea.length > 0 ? (
                    <>
                      {selectedArea.slice(0, 1).map((e, i) => {
                        if (i < 1) {
                          return (
                            <div className="text-sm py-1 px-4 bg-[#EED98B] rounded-full hover:cursor-pointer">
                              <p>{e}</p>
                            </div>
                          );
                        }
                      })}
                      {selectedArea.length > 1 && (
                        <p
                          className="cursor-pointer"
                          onClick={() => setMoreArea(!moreArea)}
                        >
                          +{selectedArea.length - 1}
                          {moreArea && (
                            <div className="relative">
                              <div
                                className={`z-50 absolute bg-white shadow-lg rounded-lg text-center w-40 top-[25px] left-[-110px]`}
                              >
                                {selectedArea
                                  .slice(1, selectedArea.length)
                                  .map((area, index) => {
                                    // console.log(locality, index);

                                    return (
                                      <p
                                        className="py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                                        onClick={() => addLocality(area)}
                                        key={index}
                                      >
                                        {area}
                                      </p>
                                    );
                                  })}
                              </div>
                            </div>
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {/* <div
                    className={`absolute lg:left-28 left-[-20px] flex lg:gap-3 z-50 ${Location ? "block" : "hidden"
                      }`}
                  >
                    <div>
                      <img
                        src={cross}
                        alt="Close"
                        onClick={()=>{handleLocation(); refresh();}}
                        className="cursor-pointer"
                      />
                    </div>
                    <SelectLocation />
                  </div> */}
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
              </div>
              <div className="h-14 w-56 bg-white text-black flex items-start justify-between px-5 rounded-md">
                <div className="flex items-center justify-start gap-4 h-full w-2/4">
                  <div className="h-6 w-6 bg-[#EED98B] rounded-full flex items-center justify-center">
                    {filterCount}
                  </div>
                  <div>Filters</div>
                </div>
                <div className="h-full flex items-center justify-center w-1/4 cursor-pointer rounded-full">
                  <img
                    src={drop}
                    alt="Dropdown"
                    onClick={handleOpen}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="compare" onClick={compare}>
              {compareProperty.length >= 0 && (
                <button
                  className={`bg-white h-14 w-44 text-black rounded-md flex gap-5 text-center items-center py-3 px-6 font-medium ${
                    compareProperty.length <= 1
                      ? "opacity-50 grayscale cursor-not-allowed"
                      : ""
                  }`}
                  disabled={compareProperty.length <= 1}
                >
                  Visit
                  <div className="h-6 w-6 bg-[#EED98B] rounded-full flex items-center justify-center">
                    {compareProperty.length}
                  </div>
                </button>
              )}
            </div>

            <div>
              <a
                onClick={handleAddPropertybtn}
                className="mr-2 bg-white w-44 h-14 text-black flex items-center justify-center px-5 rounded-md cursor-pointer"
              >
                Add a property
              </a>
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            if (isOpen === true) SetIsOpen(false);
          }}
          className={`min-w-full min-h-fit absolute z-30 top-32 flex items-center justify-center ${
            isOpen ? "block" : "hidden"
          } `}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg"
          >
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
            />
            <div className="absolute top-1 right-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                onClick={handleOpen}
                className="cursor-pointer w-5 lg:w-6 md:w-6 z-50 text-red-400 hover:text-red-800 transition-colors duration-300"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {properties.length === 0 ? (
          <p className="text-center text-lg font-semibold mt-10">
            No properties found
          </p>
        ) : (
          <Cards properties={properties} />
        )}
      </section>

      <Pagination
        properties={properties}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default Listing;
