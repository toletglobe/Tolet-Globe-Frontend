import { useEffect, useState } from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { FaLocationDot, FaRegImage, FaVideo } from "react-icons/fa6";
import { IoAdd, IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { PiGridFour } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import "./listing.css";
import Service from "../../config/config";
import author from "../../assets/property/author.jpg";
import hamburger from "../../assets/property/hamburger.png";
import drop from "../../assets/property/drop.png";
import location from "../../assets/property/location.png";
import cross from "../../assets/property/cross.png";
import side from "../../assets/property/side.png";
import axios from "axios";

const Listing = () => {
  const [Hamburger, SetHamburger] = useState(false);
  const [isOpen, SetIsOpen] = useState(false);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  {
    /*filter*/
  }
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bhk: "",
    residential: "",
    commercial: "",
    others: "",
    preferenceHousing: "",
    moveInDate: "",
    houseType: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      bhk: "",
      residential: "",
      commercial: "",
      others: "",
      preferenceHousing: "",
      moveInDate: "",
      houseType: "",
    });
  };

  const seeResults = async () => {
    setIsLoading(true);

    // Clean filter values
    const cleanedFilters = {
      ...filters,
      bhk: filters.bhk.replace(/[^0-9]/g, ""), // Remove non-numeric characters
    };

    const queryString = Object.keys(cleanedFilters)
      .filter(
        (key) => cleanedFilters[key] !== "" && cleanedFilters[key] !== null
      ) // Exclude empty or null values
      .map((key) => {
        const value = Array.isArray(cleanedFilters[key])
          ? cleanedFilters[key].map(encodeURIComponent).join(",") // Encode array values
          : encodeURIComponent(cleanedFilters[key]); // Encode single value
        return `${encodeURIComponent(key)}=${value}`;
      })
      .join("&");

    console.log(queryString);

    const url = `http://localhost:8000/api/v1/property/filter?${queryString}`;

    try {
      const response = await axios.get(url);
      console.log(response.data);
      setProperties(response.data.data); // Update properties with the filtered results
      if (response.data.data.length === 0) {
        // Handle no results
        console.log("No results found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
      SetIsOpen(false);
    }
  };

  {
    /*filter end*/
  }

  function handleOpen() {
    SetIsOpen(!isOpen);
  }
  function handleHamburger() {
    SetHamburger(!Hamburger);
  }

  // Fetch data from backend APIp
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertyData = await Service.fetchProperty();
        setProperties(propertyData);
        console.log(propertyData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // const badgeRight = "For Rent";
  // const badgeLeft = "Featured";

  return (
    <>
      <div
        className={`bg-black opacity-80 w-full h-[2600px] absolute z-20 ${
          isOpen || Hamburger ? "block" : "hidden"
        }`}
      ></div>

      <>
        <section className="property py-24" id="property">
          <div className="container mx-auto px-10">
            <div>
              <div className="flex items-center justify-between px-3 pb-20">
                <p className="text-5xl text-[#C8A21C] font-bold">
                  Property Listing
                </p>
                <img
                  src={hamburger}
                  alt=""
                  className="cursor-pointer"
                  onClick={handleHamburger}
                />
              </div>
              <div className="absolute z-50 right-0 flex flex-col gap-4 p-4 sm:w-full md:w-[442px] lg:w-[500px]">
                <div className="flex justify-end">
                  <img
                    src={cross}
                    alt="Close"
                    onClick={handleHamburger}
                    className={`${
                      Hamburger ? "block" : "hidden"
                    } cursor-pointer w-6 h-6 md:w-8 md:h-8`}
                  />
                </div>

                <div
                  className={`flex flex-col bg-white text-black rounded-lg shadow-lg p-4 md:w-full ${
                    Hamburger ? "block" : "hidden"
                  }`}
                >
                  <div className="mb-4">
                    <p className="text-lg font-semibold mb-2">
                      Sign in to get a personalized feed!
                    </p>
                    <button className="h-10 w-full rounded-xl bg-[#40B5A8] text-white font-semibold hover:bg-[#36a094] transition">
                      Login
                    </button>
                  </div>

                  <div className="flex mb-4 gap-2">
                    <p className="text-md font-medium mb-2">
                      Property Services
                    </p>
                    <img
                      src={side}
                      alt="Property Services"
                      className="w-2 h-2 md:w-2 md:h-2 mt-2"
                    />
                  </div>

                  <div className="mb-4 flex items-center gap-2">
                    <p className="text-md font-medium">MB Advice</p>
                    <div className="w-16 h-5 bg-[#FFC100] rounded-full flex items-center justify-center text-xs font-bold text-black">
                      New
                    </div>
                    <img
                      src={side}
                      alt="MB Advice"
                      className="w-2 h-2 md:w-2 md:h-2"
                    />
                  </div>

                  <div className="mb-4 flex items-center gap-2">
                    <p className="text-md font-medium">Help</p>
                    <img
                      src={side}
                      alt="Help"
                      className="w-2 h-2 md:w-2 md:h-2"
                    />
                  </div>

                  <div className="mb-4 flex items-center gap-2">
                    <p className="text-md font-medium">Wishlist</p>
                    <img
                      src={side}
                      alt="Wishlist"
                      className="w-2 h-2 md:w-2 md:h-2"
                    />
                  </div>

                  <div className="mb-4 flex items-center gap-2">
                    <p className="text-md font-medium">Visit Properties</p>
                    <img
                      src={side}
                      alt="Visit Properties"
                      className="w-2 h-2 md:w-2 md:h-2"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-start gap-3 pb-14">
                <div className="bg-white h-14 w-80 flex items-center justify-between text-black px-4 rounded-2xl ">
                  <div className="w-1/4 flex items-center justify-start gap-4 border-r-2 h-3/4 border-black">
                    <p className="text-black">Buy</p>
                    <img src={drop} alt="" className="mt-1" />
                  </div>
                  <div className="flex items-center justify-center w-3/4 gap-4 pl-2">
                    <div className="text-sm py-1 px-4 bg-[#EED98B] rounded-full ">
                      <p>Lucknow</p>
                    </div>
                    <div className="text-[12px]">
                      <p>Add more ..</p>
                    </div>
                    <div>
                      <img src={location} alt="" />
                    </div>
                  </div>
                </div>
                <div className="h-14 w-56 bg-white text-black flex items-start justify-between px-5 rounded-2xl">
                  <div className="flex items-center justify-start gap-4  h-full w-2/4 ">
                    <div className="h-6 w-6 bg-[#EED98B] rounded-full flex items-center justify-center">
                      2
                    </div>
                    <div>Filters</div>
                  </div>
                  <div className=" h-full flex items-center justify-center w-1/4 hover:bg-gray-200 p-1 cursor-pointer rounded-full">
                    <img
                      src={drop}
                      alt=""
                      onClick={handleOpen}
                      className=" cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`min-w-[827px] min-h-[683px] absolute z-30 top-[420px] left-[271px] flex items-start justify-center gap-5 ${
                isOpen ? "block" : "hidden"
              } `}
            >
              <div>
                <img
                  src={cross}
                  alt=""
                  onClick={handleOpen}
                  className="cursor-pointer hover:bg-slate-200 p-2 rounded-full"
                />
              </div>
              {isLoading && (
                <div>
                  <p className="text-white font-bold text-2xl">Loading...</p>
                </div>
              )}
              {/* filter */}
              <div className="min-w-[300px] max-w-full sm:min-w-[715px] bg-white text-black flex flex-col justify-between rounded-b-2xl shadow-md">
                <div className="text-xl font-medium py-3 flex items-center justify-center border-b-4">
                  <p>All Filters</p>
                </div>
                <div className="flex flex-col items-start justify-start p-6 sm:px-10 gap-4">
                  <div className="w-full">
                    <p className="text-lg sm:text-xl font-medium text-[#696969]">
                      Budget
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2">
                      <div className="h-11 w-full sm:w-72 border-2 border-[#4A7F79] flex items-center justify-between px-3 rounded-lg">
                        <p>${filters.minPrice || "8500"}</p>
                        <img src={drop} alt="Dropdown icon" />
                      </div>
                      <div className="h-11 w-full sm:w-72 border-2 border-[#4A7F79] flex items-center justify-between px-3 rounded-lg">
                        <p>{filters.maxPrice || "Max"}</p>
                        <img src={drop} alt="Dropdown icon" />
                      </div>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="w-full mt-2 hover:cursor-pointer"
                    min="0"
                    max="10000"
                    step="100"
                    value={filters.minPrice || 0}
                    onChange={(e) =>
                      handleFilterChange("minPrice", e.target.value)
                    }
                  />

                  <div className="w-full">
                    <p className="text-lg sm:text-xl font-medium text-[#696969]">
                      BHK
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 hover:cursor-pointer">
                      {[
                        "+ 1 BHK",
                        "+ 2 BHK",
                        "+ 3 BHK",
                        "+ 4 BHK",
                        "+ >4 BHK",
                      ].map((bhk, index) => (
                        <div
                          key={index}
                          className={`h-8 w-28 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                            filters.bhk === bhk ? "bg-[#4A7F79] text-white" : ""
                          }`}
                          onClick={() => handleFilterChange("bhk", bhk)}
                        >
                          {bhk}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full">
                    <p className="text-lg sm:text-xl font-medium text-[#696969]">
                      Residential
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <div
                        className={`hover:cursor-pointer h-8 w-24 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                          filters.residential === "+ Flat"
                            ? "bg-[#4A7F79] text-white"
                            : ""
                        }`}
                        onClick={() =>
                          handleFilterChange("residential", "+ Flat")
                        }
                      >
                        + Flat
                      </div>
                      <div
                        className={`hover:cursor-pointer h-8 w-32 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                          filters.residential === "+ House/Villa"
                            ? "bg-[#4A7F79] text-white"
                            : ""
                        }`}
                        onClick={() =>
                          handleFilterChange("residential", "+ House/Villa")
                        }
                      >
                        + House/Villa
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <p className="text-lg sm:text-xl font-medium text-[#696969]">
                      Commercial
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {[
                        "+ Office Space",
                        "+ Shop/Showroom",
                        "+ Warehouse/Godown",
                        "+ Building/Complex",
                      ].map((type, index) => (
                        <div
                          key={index}
                          className={`hover:cursor-pointer h-9 w-44 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                            filters.commercial === type
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

                  <div className="w-full">
                    <p className="text-lg sm:text-xl font-medium text-[#696969]">
                      Others
                    </p>
                    <div
                      className={`hover:cursor-pointer w-32 h-10 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                        filters.others === "+ Farm house"
                          ? "bg-[#4A7F79] text-white"
                          : ""
                      }`}
                      onClick={() =>
                        handleFilterChange("others", "+ Farm house")
                      }
                    >
                      + Farm house
                    </div>
                  </div>

                  <div className="w-full">
                    <p className="text-lg sm:text-xl font-medium text-[#696969]">
                      Preference Housing
                    </p>
                    <div className="flex flex-wrap gap-2 hover:cursor-pointer">
                      <div className="h-9 w-36 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ">
                        <select
                          className="text-black bg-white w-full h-full rounded-lg hover:cursor-pointer"
                          value={filters.preferenceHousing}
                          onChange={(e) =>
                            handleFilterChange(
                              "preferenceHousing",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select one</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div
                        className={`h-9 w-36 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                          filters.preferenceHousing === "Family"
                            ? "bg-[#4A7F79] text-white"
                            : ""
                        }`}
                        onClick={() =>
                          handleFilterChange("preferenceHousing", "Family")
                        }
                      >
                        Family
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <p className="text-lg sm:text-xl font-medium text-[#696969] ">
                      Move-in Date
                    </p>
                    <div className="hover:cursor-pointer h-12 w-full sm:w-[302px] text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-between px-3">
                      <p>Select one</p>
                      <input
                        type="date"
                        className="text-black bg-white"
                        value={filters.moveInDate}
                        onChange={(e) =>
                          handleFilterChange("moveInDate", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <p className="text-lg sm:text-xl font-medium text-[#696969]">
                      House Type
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {[
                        "Full-Furnished",
                        "Semi-Furnished",
                        "Non-Furnished",
                      ].map((type, index) => (
                        <div
                          key={index}
                          className={`hover:cursor-pointer h-9 w-36 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center ${
                            filters.houseType === type
                              ? "bg-[#4A7F79] text-white"
                              : ""
                          }`}
                          onClick={() => handleFilterChange("houseType", type)}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t-4 py-5 px-6 sm:px-10 flex items-center justify-between">
                  <button
                    className="h-12 w-36 sm:w-44 border-2 rounded-md border-[#40B5A8] text-[#40b5a8] font-light"
                    onClick={resetFilters}
                  >
                    Reset filters
                  </button>
                  <button
                    className="h-12 w-36 sm:w-44 border-2 rounded-md bg-[#40B5A8] border-[#4A7F79] text-white font-light"
                    onClick={seeResults}
                  >
                    See Results
                  </button>
                </div>
              </div>
              {/* filter end*/}
            </div>

            <ul className="property-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <li
                  key={property._id}
                  className="property-card bg-white border border-gray-200 shadow-lg"
                >
                  <figure className="card-banner relative aspect-w-2 aspect-h-1.5 overflow-hidden">
                    <a href="#">
                      <img
                        src={property.photos[0]}
                        alt={property.propertyType}
                        className="w-full h-full object-cover"
                      />
                    </a>
                    <div
                      className={`card-badge-right  absolute top-6 right-6 text-white text-xs uppercase px-3 py-1`}
                      style={{ backgroundColor: "#c8a217" }}
                    >
                      For rent
                    </div>
                    <div
                      className={`card-badge-left absolute top-6 left-6 text-white text-xs uppercase px-3 py-1`}
                      style={{ backgroundColor: "#137a60" }}
                    >
                      Featured
                    </div>
                    <div className="banner-actions absolute bottom-4 left-4 right-4 flex gap-4 justify-between">
                      <div>
                        <button className="banner-actions-btn flex items-center gap-1 text-white">
                          <FaLocationDot className="text-xl" />
                          <address>{property.address}</address>
                        </button>
                      </div>
                      <div className="flex gap-4">
                        <button className="banner-img_video-btn flex items-center gap-2 text-white">
                          <FaVideo className="text-xl" />
                        </button>
                        <button className="banner-img_video-btn flex items-center gap-2 text-white">
                          <FaRegImage className="text-xl" />6
                        </button>
                      </div>
                    </div>
                  </figure>
                  <div className="card-content p-6">
                    <div className="name_icon flex justify-between items-center">
                      <h3 className="h3 card-title text-xl font-semibold">
                        {/* <a href="#">{property.title}</a> */}
                        <a href="#">Property for Rent</a>
                      </h3>
                      <div className="card_icons flex space-x-2">
                        <a href="#">
                          <CiShare2 className="card_icon text-lg border p-1" />
                        </a>
                        <a href="#">
                          <IoAdd className="card_icon text-lg border p-1" />
                        </a>
                        <a href="#">
                          <CiHeart className="card_icon text-lg border p-1  " />
                        </a>
                      </div>
                    </div>
                    <div className="card-price text-gray-700 text-sm mt-1">
                      {property.rent}
                    </div>
                    <p className="card-text text-gray-800 text-sm mt-4">
                      {/* {property.description} */}
                      Beautiful, Ground Floor Accomodation
                    </p>
                    <ul className="card-list flex  items-center justify-evenly mt-4">
                      <li className="card-item flex items-center text-gray-800 text-base">
                        <IoBedOutline className="text-xl" />
                        &nbsp;
                        {property.bhk}
                      </li>
                      <li className="card-item flex items-center text-gray-800 text-base">
                        <LuBath className="text-xl" />
                        &nbsp;
                        {/* {property.baths} */}2
                      </li>
                      <li className="card-item flex items-center text-gray-800 text-base">
                        <PiGridFour className="text-xl" />
                        &nbsp;
                        {/* {property.area} */}
                        1800
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer p-6 flex justify-between items-center">
                    <div className="card-author flex items-center gap-4">
                      <figure className="author-avatar w-10 h-10 overflow-hidden rounded-full">
                        <img
                          src={author}
                          alt={property.ownerName}
                          className="w-full h-full object-cover"
                        />
                      </figure>
                      <div>
                        <p className="author-name text-gray-900 text-sm font-medium">
                          <a href="#">{property.ownerName}</a>
                        </p>
                      </div>
                    </div>
                    <div className="card-footer-actions">
                      {/* onClick={() => navigate(property.location)} */}
                      <button
                        // onClick={() => navigate(property.location)}
                        onClick={() => navigate(`/property/${property._id}`)}
                        className="card-footer-actions-btn bg-gray-200 text-gray-900 w-28 h-9 grid place-items-center text-sm"
                      >
                        SHOW MORE
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </>
    </>
  );
};

export default Listing;

{
  /* <section className="property py-24" id="property">

        <div className="container mx-auto px-10">
          <ul className="property-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <li
                key={property._id}
                className="property-card bg-white border border-gray-200 shadow-lg"
              >
                <figure className="card-banner relative aspect-w-2 aspect-h-1.5 overflow-hidden">
                  <a href="#">
                    <img
                      src={property.photos[0]}
                      alt={property.propertyType}
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <div
                    className={`card-badge-right absolute top-6 right-6 text-white text-xs uppercase px-3 py-1`}
                    style={{ backgroundColor: "#c8a217" }}
                  >
                    {property.spaceType === "Residential"
                      ? "For Rent"
                      : "For Sale"}
                  </div>
                  <div
                    className={`card-badge-left absolute top-6 left-6 text-white text-xs uppercase px-3 py-1`}
                    style={{ backgroundColor: "#137a60" }}
                  >
                    {property.propertyType}
                  </div>
                  <div className="banner-actions absolute bottom-4 left-4 right-4 flex gap-4 justify-between">
                    <div>
                      <button className="banner-actions-btn flex items-center gap-1 text-white">
                        <FaLocationDot className="text-xl" />
                        <address>{property.locality}</address>
                      </button>
                    </div>
                    <div className="flex gap-4">
                      <button className="banner-img_video-btn flex items-center gap-2 text-white">
                        <FaVideo className="text-xl" />
                      </button>
                      <button className="banner-img_video-btn flex items-center gap-2 text-white">
                        <FaRegImage className="text-xl" />
                        {property.photos.length}
                      </button>
                    </div>
                  </div>
                </figure>
                <div className="card-content p-6">
                  <div className="name_icon flex justify-between items-center">
                    <h3 className="h3 card-title text-xl font-semibold">
                      <a href="#">{property.propertyType}</a>
                    </h3>
                    <div className="card_icons flex space-x-2">
                      <a href="#">
                        <CiShare2 className="card_icon text-lg border p-1" />
                      </a>
                      <a href="#">
                        <IoAdd className="card_icon text-lg border p-1" />
                      </a>
                      <a href="#">
                        <CiHeart className="card_icon text-lg border p-1" />
                      </a>
                    </div>
                  </div>
                  <div className="card-price text-gray-700 text-sm mt-1">
                    Rs. {property.rent}
                  </div>
                  <p className="card-text text-gray-800 text-sm mt-4">
                    {property.type}, {property.floor}th floor
                  </p>
                  <ul className="card-list flex items-center justify-evenly mt-4">
                    <li className="card-item flex items-center text-gray-800 text-base">
                      <IoBedOutline className="text-xl" />
                      &nbsp;
                      {property.bhk}
                    </li>
                    <li className="card-item flex items-center text-gray-800 text-base">
                      <LuBath className="text-xl" />
                      &nbsp;
                      {property.typeOfWashroom}
                    </li>
                    <li className="card-item flex items-center text-gray-800 text-base">
                      <PiGridFour className="text-xl" />
                      &nbsp;
                      {property.floor} ft²
                    </li>
                  </ul>
                </div>
                <div className="card-footer p-6 flex justify-between items-center">
                  <div className="card-author flex items-center gap-4">
                    <figure className="author-avatar w-10 h-10 overflow-hidden rounded-full">
                      <img
                        src={property.photos[0]}
                        alt={property.ownerName}
                        className="w-full h-full object-cover"
                      />
                    </figure>
                    <div>
                      <p className="author-name text-gray-900 text-sm font-medium">
                        <a href="#">{property.ownerName}</a>
                      </p>
                    </div>
                  </div>
                  <div className="card-footer-actions">
                    <button
                      onClick={() => navigate(`/property/${property._id}`)}
                      className="card-footer-actions-btn bg-gray-200 text-gray-900 w-28 h-9 grid place-items-center text-sm"
                    >
                      SHOW MORE
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section> */
}