/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";
import {
  FaChevronLeft,
  FaChevronRight,
  FaLocationDot,
  FaRegImage,
  FaVideo,
} from "react-icons/fa6";
import { IoAdd, IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { PiGridFour } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./listing.css";

import Service from "../../config/config";
import author from "../../assets/property/author.jpg";
import hamburger from "../../assets/property/hamburger.png";
import drop from "../../assets/property/drop.png";
import location from "../../assets/property/location.png";
import cross from "../../assets/property/cross.png";
import side from "../../assets/property/side.png";
import axios from "axios";
import { Button } from "../index";

const Listing = () => {
  const [Hamburger, SetHamburger] = useState(false);
  const [isOpen, SetIsOpen] = useState(false);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [propertiesPerPage, setPropertiesPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // Fetch data from backend API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertyData = await Service.fetchProperty();
        setProperties(propertyData || []); // Ensure propertyData is an array
        console.log(propertyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  // Calculate total pages
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  // Get current properties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} />
      </div>
    );
  }

  const [mode, setMode] = useState(false);
  function handleMode() {
    setMode(!mode);
  }

  const [Location, setLocation] = useState(false);
  function handleLocation() {
    setLocation(!Location);
  }
  return (
    <>
      <div
        className={`bg-black opacity-80 w-full h-[2600px] absolute z-20 ${
          isOpen || Hamburger || Location ? "block" : "hidden"
        }`}
      ></div>

      <>
        <section className="property py-24" id="property">
          <div className="container mx-auto px-10">
            <div>
              <div className="flex items-center justify-between px-3 pb-20">
                <p className="lg:text-5xl md:text-4xl text-2xl  text-[#C8A21C] font-bold">
                  Property Listing
                </p>
                <img
                  src={hamburger}
                  alt=""
                  className="cursor-pointer lg:w-12 md:w-11 w-9 h-auto"
                  onClick={handleHamburger}
                />
              </div>
              <div className="absolute z-50 right-0 flex  gap-4 p-4 sm:w-full md:w-[442px] lg:w-[500px] h-fit">
                <div className="">
                  <img
                    src={cross}
                    alt="Close"
                    onClick={handleHamburger}
                    className={`${
                      Hamburger ? "block" : "hidden"
                    } cursor-pointer `}
                  />
                </div>

                <div
                  className={`flex flex-col bg-white text-black py-4 rounded-lg shadow-lg  md:w-full ${
                    Hamburger ? "block" : "hidden"
                  }`}
                >
                  <div className=" flex w-full py-3 px-4 border-b-2 border-[#D9D9D9] ">
                    <p className="lg:text-xl md:text-xl text-lg font-semibold mb-2 w-3/4">
                      Sign in to get a personalized feed!
                    </p>
                    <button className="h-10 w-2/4 rounded-xl bg-[#40B5A8] text-white font-semibold hover:bg-[#36a094] transition">
                      Login
                    </button>
                  </div>

                  <div className="flex items-center  w-full justify-between gap-2 px-5 py-3 border-b-2 border-[#D9D9D9]">
                    <p className=" font-semibold mb-2">Property Services</p>
                    <img src={side} alt="Property Services" className="" />
                  </div>

                  <div className=" flex items-center w-full justify-between gap-2 px-5 py-3 border-b-2 border-[#D9D9D9]">
                    <div className="flex items-center justify-center gap-8">
                      <p className="text-md font-semibold">MB Advice</p>
                      <div className="w-16 h-5 bg-[#FFC100] rounded-full  flex items-center justify-center text-xs font-bold text-black">
                        New
                      </div>
                    </div>
                    <img src={side} alt="MB Advice" className="" />
                  </div>

                  <div className=" flex items-center w-full justify-between gap-2 px-5 py-3 border-b-2 border-[#D9D9D9]">
                    <p className="text-md font-semibold">Help</p>
                    <img src={side} alt="Help" className="" />
                  </div>

                  <div className=" flex items-center w-full justify-between gap-2 px-5 py-3 border-b-2 border-[#D9D9D9]">
                    <p className="text-md font-semibold">Wishlist</p>
                    <img src={side} alt="Wishlist" className="" />
                  </div>

                  <div className=" flex items-center  w-full justify-between gap-2 px-5 py-3 border-b-2 border-[#D9D9D9]">
                    <p className="text-md font-semibold">Visit Properties</p>
                    <img src={side} alt="Visit Properties" className="" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-start gap-3 pb-10 ml-4 flex-col md:flex-row lg:flex-row ">
                <div className="bg-white h-14 w-80 flex items-center justify-between text-black px-4 rounded-2xl ">
                  <div className="w-1/4 flex items-center justify-start gap-4 border-r-2 h-3/4 border-black">
                    <p className="text-black">Buy</p>
                    <img
                      src={drop}
                      alt=""
                      className={`${
                        mode ? "rotate-180" : "rotate-0"
                      } mt-1 cursor-pointer `}
                      onClick={handleMode}
                    />
                    <div
                      className={` ${
                        mode ? "block" : "hidden"
                      } z-50 absolute bg-white shadow-lg rounded-lg text-center w-24 py-3 top-[350px] left-14`}
                    >
                      <p className=" border-b-2 py-1 text-lg font-medium">
                        Buy
                      </p>
                      <p className=" border-b-2 py-1 text-lg font-medium">
                        Sell
                      </p>
                      <p className=" py-1 text-lg font-medium">Rent</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-3/4 gap-4 pl-2">
                    <div className="text-sm py-1 px-4 bg-[#EED98B] rounded-full ">
                      <p>Lucknow</p>
                    </div>
                    <div className="text-[12px]">
                      <p>Add more ..</p>
                    </div>
                    <div>
                      <img
                        src={location}
                        alt=""
                        className="cursor-pointer"
                        onClick={handleLocation}
                      />
                    </div>
                    <div
                      className={`absolute lg:left-28 left-[-20px] flex lg:gap-3 z-50 ${
                        Location ? "block" : "hidden"
                      }`}
                    >
                      <div>
                        <img
                          src={cross}
                          alt=""
                          onClick={handleLocation}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="lg:w-[715px] lg:max-w-full md:min-w-[300px] md:max-w-full  w-screen bg-white text-black flex items-start px-8 flex-col justify-center h-[35vh] rounded-lg shadow-md">
                        <p className="text-2xl font-medium py-4 flex items-center justify-center gap-4 ">
                          Select Location
                        </p>
                        <div className="flex items-center justify-between w-full px-5 py-2 flex-wrap gap-3">
                          <p className="h-8 w-24 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center">
                            Lucknow
                          </p>
                          <p className="h-8 w-24 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center">
                            Ayodhya
                          </p>
                          <p className="h-8 w-24 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center">
                            Vellore
                          </p>
                          <p className="h-8 w-24 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center">
                            Kota
                          </p>
                        </div>
                      </div>
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
                  <div className=" h-full flex items-center justify-center w-1/4  cursor-pointer rounded-full">
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
              className={`min-w-full min-h-fit absolute z-30 top-32 flex items-start justify-center gap-5 ${
                isOpen ? "block" : "hidden"
              } `}
            >
              <div className="">
                <img
                  src={cross}
                  alt=""
                  onClick={handleOpen}
                  className="cursor-pointer lg:static md:static absolute lg:bg-transparent md:bg-transparent bg-black rounded-full  top-3 right-56 w-9 lg:w-20 md:w-20 z-50 "
                />
              </div>
              {isLoading && (
                <div>
                  <p className="text-white font-bold text-2xl"></p>
                </div>
              )}
              {/* filter */}
              <div className="lg:w-[715px] lg:max-w-full md:min-w-[300px] md:max-w-full  w-screen bg-white text-black flex flex-col justify-between rounded-b-2xl shadow-md">
                <div className="text-2xl font-medium py-4 flex items-center justify-center border-b-4">
                  <p>All Filters</p>
                </div>
                <div className="flex flex-col items-start justify-start p-6 sm:px-10 gap-4">
                  <div className="w-full">
                    <p className="text-xl sm:text-xl font-medium text-[#696969] mb-6">
                      Budget
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2">
                      <div className="h-11 w-full sm:w-72 border-2 border-[#4A7F79] flex items-center justify-between px-8 rounded-lg">
                        <p className="font-light">
                          ${filters.minPrice || "8500"}
                        </p>
                        <img src={drop} alt="Dropdown icon" />
                      </div>
                      <div className="h-11 w-full sm:w-72 border-2 border-[#4A7F79] flex items-center justify-between px-8 rounded-lg">
                        <p className="font-light">
                          {filters.maxPrice || "Max"}
                        </p>
                        <img src={drop} alt="Dropdown icon" />
                      </div>
                    </div>
                  </div>
                  <div className="w-3/4 flex items-center justify-center flex-col mx-auto mb-5 mt-8">
                    <input
                      type="range"
                      className=" mb-5 w-full appearance-none cursor-pointer bg-[#40B5A8] rounded-full h-[5px]"
                      min="0"
                      max="10000"
                      step="100"
                      value={filters.minPrice || 0}
                      onChange={(e) =>
                        handleFilterChange("minPrice", e.target.value)
                      }
                    />
                    <div className="w-full flex items-center justify-between">
                      <div>
                        <p className="font-light text-2xl">
                          ${filters.minPrice || "8500"}
                        </p>
                      </div>
                      <div>
                        <p className="font-light text-2xl">
                          {filters.maxPrice || "Max"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mb-6">
                    <p className="text-lg sm:text-xl font-medium text-[#696969] mb-3">
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

                  <div className="w-full mb-6">
                    <p className="text-lg sm:text-xl font-medium text-[#696969] mb-3">
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

                  <div className="w-full mb-6">
                    <p className="text-lg sm:text-xl font-medium text-[#696969] mb-3">
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

                  <div className="w-full mb-6">
                    <p className="text-lg sm:text-xl font-medium text-[#696969] mb-3">
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

                  <div className="w-full mb-6">
                    <p className="text-lg sm:text-xl font-medium text-[#696969] mb-3">
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

                  <div className="w-full mb-6">
                    <p className="text-lg sm:text-xl font-medium text-[#696969] mb-3 ">
                      Move-in Date
                    </p>
                    <div className="hover:cursor-pointer h-12 w-full sm:w-[302px] text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-between px-3">
                      <p>Select one</p>
                      <input
                        type="date"
                        className="text-black bg-white "
                        value={filters.moveInDate}
                        onChange={(e) =>
                          handleFilterChange("moveInDate", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full mb-6">
                    <p className="text-lg sm:text-xl font-medium text-[#696969] mb-3">
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
                  className="property-card bg-white border border-grey-200 shadow-lg"
                >
                  <figure className="card-banner relative aspect-w-2 aspect-h-1.5 overflow-hidden">
                    {property.photos.length > 1 ? (
                      <Slider {...settings}>
                        {property.photos.map((photo, index) => (
                          <div key={index}>
                            {/* <div> */}
                            <img
                              src={photo}
                              alt={property.propertyType}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <div>
                        <img
                          src={property.photos[0]}
                          alt={property.propertyType}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div
                      className="card-badge-left absolute top-6 left-6 text-white text-xs uppercase px-3 py-1"
                      style={{
                        backgroundColor: "#40B5A8",
                        textTransform: "capitalize",
                      }}
                    >
                      {property.propertyType === "Residential"
                        ? "For Rent"
                        : "Available"}
                    </div>
                    <div className="banner-actions absolute bottom-4 left-4 right-4 flex gap-4 justify-between">
                      <div>
                        <button className="banner-actions-btn flex items-center gap-1 text-white">
                          <FaLocationDot className="text-xl" />
                          <address>
                            {" "}
                            {`${property.locality}, ${
                              property.city || "Lucknow"
                            }`}
                          </address>
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
                      <h3 className="card-title text-2xl font-semibold">
                        <a href="#">{property.propertyType}</a>
                      </h3>
                      <div className="icon-box flex space-x-4 p-2">
                        <a href="#">
                          <CiShare2
                            className="card_icon"
                            style={{ color: "#40B5A8" }}
                          />
                        </a>
                        <a href="#">
                          <IoAdd
                            className="card_icon"
                            style={{ color: "#000000", fontSize: "12px" }}
                          />
                        </a>
                        <a href="#">
                          <CiHeart className="card_icon text-red-500" />
                        </a>
                      </div>
                    </div>

                    <div className="card-details flex flex-col items-start">
                      <div className="card-price font-poppins text-s font-normal text-grey-700 mt-1">
                        RS. {property.rent}
                      </div>
                      <div className="card-text font-poppins text-lg font-medium text-black">
                        {property.type}, {property.floor}th floor
                      </div>
                    </div>
                    <ul className="card-list custom-card-list mt-4">
                      <li className="bed card-item flex items-center text-base">
                        <IoBedOutline style={{ fontSize: "1.6rem" }} />{" "}
                        {/* Increased size */}
                        &nbsp;
                        {property.bhk}
                      </li>
                      <li className="bath card-item flex items-center text-base">
                        <LuBath style={{ fontSize: "1.6rem" }} />{" "}
                        {/* Increased size */}
                        &nbsp;
                        {property.typeOfWashroom}
                      </li>
                      <li className="pi card-item flex items-center text-base">
                        <PiGridFour style={{ fontSize: "1.6rem" }} />{" "}
                        {/* Increased size */}
                        &nbsp;
                        {property.floor} ft²
                      </li>
                    </ul>
                    <div className="divider-container">
                      <hr
                        className="custom-hr"
                        style={{
                          border: "none",
                          borderTop: "2.8px solid #ccc",
                          width: "calc(100% + 0.001rem)",
                          marginTop: "1.4rem",
                          marginBottom: "-2.3rem",
                        }}
                      />
                    </div>
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
                        className="card-footer-actions-btn"
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

        <div className="flex justify-center mt-5 mx-auto">
          <div className="bg-white/20 rounded-md px-2 py-1 flex justify-center gap-3">
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="hover:text-[#6CC1B6] rounded-lg  flex items-center"
            >
              <FaChevronLeft className="mr-2" /> Previous
            </Button>
            <div className="flex items-center space-x-2">
              {currentPage > 2 && (
                <>
                  <button
                    onClick={() => onPageChange(1)}
                    className="px-2 py-1 rounded-lg  hover:text-[#6CC1B6]"
                  >
                    1
                  </button>
                  {currentPage > 3 && <span className="px-2">...</span>}
                </>
              )}
              {currentPage > 1 && (
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  className="px-2 py-1 rounded-lg  hover:text-[#6CC1B6]"
                >
                  {currentPage - 1}
                </button>
              )}
              <button
                className="px-2 py-1 rounded-lg text-[#6CC1B6] underline"
                aria-current="page"
              >
                {currentPage}
              </button>
              {currentPage < totalPages && (
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  className="px-2 py-1 rounded-lg hover:text-[#6CC1B6]"
                >
                  {currentPage + 1}
                </button>
              )}
              {currentPage < totalPages - 1 && (
                <>
                  {currentPage < totalPages - 2 && (
                    <span className="px-2">...</span>
                  )}
                  <button
                    onClick={() => onPageChange(totalPages)}
                    className="px-2 py-1 rounded-lg hover:text-[#6CC1B6]"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-1">
              <span className="pt-0.5">|</span>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="hover:text-[#6CC1B6] rounded-lg flex items-center"
              >
                Next <FaChevronRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </>
    </>
  );
  // });
};
// };

export default Listing;
