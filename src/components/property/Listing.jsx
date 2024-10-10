import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import "./listing.css";
import Service from "../../config/config";
import author from "../../assets/property/author.jpg";
import hamburger from "../../assets/property/hamburger.png";
import drop from "../../assets/property/drop.png";
import loc from "../../assets/property/location.png";
import cross from "../../assets/property/cross.png";
import SideOpt from "./listingComponents/SideOpt";
import SelectLocation from "./listingComponents/SelectLocation";
import Filters from "./listingComponents/Filters";
import Cards from "./listingComponents/Cards";
import Pagination from "./listingComponents/Pagination";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { IoAdd, IoBedOutline, IoRemove } from "react-icons/io5";

const Listing = (props) => {
  const { city } = useParams();

  const [Hamburger, SetHamburger] = useState(false);
  const [isOpen, SetIsOpen] = useState(false);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [Location, setLocation] = useState(false);
  const location = useLocation();
  const propertiesPerPage = 9;

  const [filterCount, setFilterCount] = useState(0);

  const authState = useSelector((state) => state.auth);

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
    setShowCity(!showCity);
  }

  useEffect(() => {
    const fetchAndFilterProperties = async () => {
      setLoading(true);
      try {
        let propertyData= [];
        if(city){
          propertyData = await Service.fetchPropertyByCity(city);
          setProperties(propertyData || []); // Ensure propertyData is an array
        }
        else {
          propertyData = await Service.fetchProperty();
          setProperties(propertyData || []);
        }

        propertyData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setProperties(propertyData); // Ensure propertyData is an array

        // Check for filters
        const searchParams = new URLSearchParams(location.search);
        const type = searchParams.get("type");
        console.log("Type of property:", type);

        // Apply filtering based on type
        if (type === "Flat") {
          setProperties(propertyData.filter((a) => a.propertyType === "Flat"));
        } else if (type === "House/Villa") {
          setProperties(
            propertyData.filter(
              (a) => a.propertyType === "House" || a.propertyType === "Villa"
            )
          );
        } else if (type === "Shop") {
          setProperties(propertyData.filter((a) => a.propertyType === "Shop"));
        } else if (type === "Office") {
          setProperties(
            propertyData.filter((a) => a.propertyType === "Office")
          );
        } else if (type === "Warehouse") {
          setProperties(
            propertyData.filter((a) => a.propertyType === "Ware house")
          );
        } else if (type === "PayingGuest") {
          setProperties(
            propertyData.filter((a) => a.propertyType === "Paying Guest")
          );
        }

        // Check for sorting
        const sortType = searchParams.get("sort");
        if (sortType) {
          sortProperties(propertyData, sortType);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchAndFilterProperties();
  }, [location.search]);

  //filter counting
  // const countAppliedFilters = (filters) => {
  //   return Object.values(filters).reduce((count, filterValue) => {
  //     if (Array.isArray(filterValue)) {
  //       return count + (filterValue.length > 0 ? 1 : 0);
  //     } else {
  //       return count + (filterValue ? 1 : 0);
  //     }
  //   }, 0);    
  // };

  // const filterCount = countAppliedFilters(filters);

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
  // Calculate total pages
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  // Get current properties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = Array.isArray(properties)
    ? properties.slice(indexOfFirstProperty, indexOfLastProperty)
    : [];

  const handleSortClick = (sortType) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("sort", sortType);
    navigate(`?${queryParams.toString()}`); // Update URL with new sort query
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
      toast.error("Please Log In first");
    }
  };

  // Property Add and remove function to compare Property
  const handleToggle = (event, property) => {
    event.preventDefault();

    props.setcompareData((prev) => {
      // Check if the property is already in the selected list
      const isAlreadySelected = prev.some((p) => p._id === property._id);

      // If the property is already selected, remove it
      if (isAlreadySelected) {
        return prev.filter((p) => p._id !== property._id);
      }

      // If the property is not selected and the list has fewer than 4 items, add it
      if (prev.length < 4) {
        return [...prev, property];
      } else {
        return prev;
      }
    });
  };

  const isInCompareList = (propertyId) => {
    return props.compareData.some((p) => p._id === propertyId);
  };

  const compare = () => {
    navigate("/compare-property");
  };

  // const totalProperties = properties.length;
  // const indexOfLastProperty = currentPage * propertiesPerPage;
  // const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  // const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
  // const totalPages = Math.ceil(totalProperties / propertiesPerPage);

  const handleViewBlog = (slug) => {
    navigate(`/blog/${slug}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const onPageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const updateFilterCount = (count) => {
    setFilterCount(count);
  };

  return (
    <>
      <div
        className={`bg-black opacity-80 w-full h-[2600px] absolute z-20 ${isOpen || Hamburger || Location ? "block" : "hidden"
          }`}
      ></div>

      <section className="property h-[100vh] pb-14 px-10 w-full overflow-y-auto" id="property">
        {/* <div className="container mx-auto  px-10"> */}
        <div className="px-3 flex flex-col gap-12 py-12 sticky top-0 z-30 bg-black">
          <div className="flex items-center justify-between">
            <p className="lg:text-5xl md:text-4xl text-2xl text-[#C8A21C] font-bold">
              Property Listing
            </p>
            <img
              src={hamburger}
              alt="Hamburger Menu"
              className="cursor-pointer lg:w-12 md:w-11 w-9 h-auto"
            // onClick={handleHamburger}
            />
          </div>
          {/* <div className="absolute z-50 top-[50%] right-5 flex gap-4 p-4 sm:w-full md:w-[442px] lg:w-[500px] h-fit">
              <div>
                <img
                  src={cross}
                  alt="Close"
                  onClick={handleHamburger}
                  className={`${Hamburger ? "block" : "hidden"} cursor-pointer`}
                />
              </div>

              <div
                className={`flex flex-col bg-white text-black py-4 rounded-lg shadow-lg md:w-full ${
                  Hamburger ? "block" : "hidden"
                }`}
              >
                <SideOpt />
              </div>
            </div> */}

          <div className="flex justify-between gap-14 w-full flex-wrap">
            <div className="flex items-center justify-between gap-20 md:gap-36 lg:gap-36 ml-4 flex-col md:flex-row lg:flex-row">
              <div className="bg-white h-14 w-64 md:w-80 lg:w-80 flex items-center justify-between text-black px-4 rounded-md">
                <div className="w-1/4 flex items-center justify-start gap-2 md:gap-4 lg:gap-4 border-r-2 h-3/4 border-black">
                  <p className="text-black">Sort</p>
                  <img
                    src={drop}
                    alt="Dropdown"
                    className={`${mode ? "rotate-180" : "rotate-0"
                      } mt-1 cursor-pointer`}
                    onClick={handleMode}
                  />
                  <div className="relative">
                    <div
                      className={`${mode ? "block" : "hidden"
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
                <div className="flex items-center justify-center w-3/4 gap-4 pl-2">
                  <div className="text-sm py-1 px-4 bg-[#EED98B] rounded-full">
                    <p onClick={handleLocation}>{city}</p>
                  </div>
                  <div>
                    <img
                      src={loc}
                      alt="Location"
                      className="cursor-pointer"
                      onClick={handleShowCity}
                    />
                    <div className="relative">
                      <div
                        className={`${showCity ? "block" : "hidden"
                          } z-50 absolute bg-white shadow-lg rounded-lg text-center w-40 top-[25px] left-[-110px]`}
                      >
                        <p
                          className="border-b-2 py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                        >
                          Gomati Nagar
                        </p>
                        <p
                          className="border-b-2 py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                        >
                          Kharagpur
                        </p>
                        <p
                          className="border-b-2 py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                        >
                          Kamta
                        </p>
                        <p
                          className="border-b-2 py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                        >
                          Nishat Ganj
                        </p>
                        <p
                          className="border-b-2 py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                        >
                          Chinhat
                        </p>
                        <p
                          className="border-b-2 py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                        >
                          Hazratganj
                        </p>
                        <p
                          className="border-b-2 py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                        >
                          Indira Nagar
                        </p>
                        <p
                          className="border-b-2 py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                        >
                          Sunder Nagar
                        </p>
                        <p
                          className="border-b-2 py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                        >
                          Surender Nagar
                        </p>
                        <p
                          className="border-b-2 py-2 text-lg font-medium cursor-pointer hover:bg-gray-100"
                        >
                          Aliganj
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`absolute lg:left-28 left-[-20px] flex lg:gap-3 z-50 ${Location ? "block" : "hidden"
                      }`}
                  >
                    <div>
                      <img
                        src={cross}
                        alt="Close"
                        onClick={handleLocation}
                        className="cursor-pointer"
                      />
                    </div>
                    <SelectLocation />
                  </div>
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
              {props.compareData.length >= 1 && (
                <button
                  className={`bg-white h-14 w-44 text-black rounded-md flex gap-5 text-center items-center py-3 px-6 font-medium ${props.compareData.length <= 1
                    ? "opacity-50 grayscale cursor-not-allowed"
                    : ""
                    }`}
                  disabled={props.compareData.length <= 1}
                >
                  Compare
                  <div className="h-6 w-6 bg-[#EED98B] rounded-full flex items-center justify-center">
                    {props.compareData.length}
                  </div>
                </button>
              )}
            </div>

            <div>
              <a
                onClick={handleAddPropertybtn}
                className="mr-2 bg-white w-44 h-14 text-black flex items-center justify-center px-5 rounded-md cursor-pointer"
              >
                Add Property
              </a>
            </div>
          </div>
        </div>

        <div
          className={`min-w-full min-h-fit absolute z-30 top-32 flex items-center justify-center ${isOpen ? "block" : "hidden"
            } `}
        >
          <div className="relative w-full max-w-lg">
            <Filters
              SetIsOpen={SetIsOpen}
              setProperties={setProperties}
              city={city}
              updateFilterCount={updateFilterCount}
              filterCount={filterCount}
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

        <Cards
          properties={properties}
          handleToggle={handleToggle}
          isInCompareList={isInCompareList}
        />
        {/* </div> */}
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
