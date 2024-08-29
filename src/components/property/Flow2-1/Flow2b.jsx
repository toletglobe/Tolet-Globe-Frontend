/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  MdBedroomParent,
  MdOutlineBathroom,
  MdSecurity,
  MdOutlineStarPurple500,
  MdPets,
  MdOutlineAvTimer,
} from "react-icons/md";
import {
  MdDirectionsBus,
  MdFitnessCenter,
  MdLocalCafe,
  MdMoney,
  MdRestaurant,
  MdSchool,
  MdShoppingBag,
  MdStore,
} from "react-icons/md";
import { IoTabletLandscape } from "react-icons/io5";
import { LuParkingCircle, LuFlower2 } from "react-icons/lu";
import { CiMobile4 } from "react-icons/ci";
import { CgGym } from "react-icons/cg";
import { FaHammer } from "react-icons/fa6";
import { GiMicrophone, GiFamilyHouse } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { WiSmoke } from "react-icons/wi";
import { PiStarThin } from "react-icons/pi";
import profile from "../../../assets/property/author7.jpg";

// import map from "../../../assets/property/map.png";
import { PiStarThin } from "react-icons/pi";
import profile from "../../../assets/property/author7.jpg";

// import map from "../../../assets/property/map.png";
import Popup from "./Popup";
// import Property from "../Property";

const Flow2b = (property) => {
  console.log(property);
// import Property from "../Property";

const Flow2b = (property) => {
  console.log(property);

  const [selectedButton, setSelectedButton] = useState("");
  const [selectComp, setSelectComp] = useState(0);
  const [selectedButton, setSelectedButton] = useState("");
  const [selectComp, setSelectComp] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    switch (button) {
      case "Features":
        setSelectComp(1);
        break;
      case "About":
        setSelectComp(2);
        break;
      case "Amenities":
        setSelectComp(3);
        break;
      case "Regulations":
        setSelectComp(4);
        break;
      case "Location":
        setSelectComp(5);
        break;
      case "Reviews":
        setSelectComp(6);
        break;
      default:
        setSelectComp(0);
    }
  };

  const buttonClasses = "text-white font-semibold text-xl";

  return (
    <>
      <div className="text-black">
        <div className="flex flex-wrap gap-4 justify-between pt-10 pb-4 sm:items-start">
          <button
            className={`${buttonClasses} ${
              selectedButton === "Features"
                ? "underline decoration-teal-500"
                : ""
            }`}
            onClick={() => handleButtonClick("Features")}
          >
            Features
          </button>
          <button
            className={`${buttonClasses} ${
              selectedButton === "About" ? "underline decoration-teal-500" : ""
            }`}
            onClick={() => handleButtonClick("About")}
          >
            About
          </button>
          <button
            className={`${buttonClasses} ${
              selectedButton === "Amenities"
                ? "underline decoration-teal-500"
                : ""
            }`}
            onClick={() => handleButtonClick("Amenities")}
          >
            Amenities
          </button>
          <button
            className={`${buttonClasses} ${
              selectedButton === "Regulations"
                ? "underline decoration-teal-500"
                : ""
            }`}
            onClick={() => handleButtonClick("Regulations")}
          >
            Regulations
          </button>
          <button
            className={`${buttonClasses} ${
              selectedButton === "Location"
                ? "underline decoration-teal-500"
                : ""
            }`}
            onClick={() => handleButtonClick("Location")}
          >
            Location
          </button>
    <>
      <div className="text-black">
        <div className="flex flex-wrap gap-4 justify-between pt-10 pb-4 sm:items-start">
          <button
            className={`${buttonClasses} ${
              selectedButton === "Features"
                ? "underline decoration-teal-500"
                : ""
            }`}
            onClick={() => handleButtonClick("Features")}
          >
            Features
          </button>
          <button
            className={`${buttonClasses} ${
              selectedButton === "About" ? "underline decoration-teal-500" : ""
            }`}
            onClick={() => handleButtonClick("About")}
          >
            About
          </button>
          <button
            className={`${buttonClasses} ${
              selectedButton === "Amenities"
                ? "underline decoration-teal-500"
                : ""
            }`}
            onClick={() => handleButtonClick("Amenities")}
          >
            Amenities
          </button>
          <button
            className={`${buttonClasses} ${
              selectedButton === "Regulations"
                ? "underline decoration-teal-500"
                : ""
            }`}
            onClick={() => handleButtonClick("Regulations")}
          >
            Regulations
          </button>
          <button
            className={`${buttonClasses} ${
              selectedButton === "Location"
                ? "underline decoration-teal-500"
                : ""
            }`}
            onClick={() => handleButtonClick("Location")}
          >
            Location
          </button>
          <button
            className={`${buttonClasses} ${
              selectedButton === "Reviews"
                ? "underline decoration-teal-500"
                : ""
              selectedButton === "Reviews"
                ? "underline decoration-teal-500"
                : ""
            }`}
            onClick={() => handleButtonClick("Reviews")}
            onClick={() => handleButtonClick("Reviews")}
          >
            Reviews
            Reviews
          </button>
        </div>
        </div>

        <div className="mb-2">
          <div
            className={`bg-white w-full rounded-lg p-3 mb-4 ${
              selectComp > 1 ? "hidden" : ""
            }`}
          >
            <p className="text-black block font-semibold text-xl">Features</p>
            <div className="flex flex-wrap gap-3">
              <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                <MdBedroomParent className="h-6 w-6 mr-2 text-black bg-white" />
                <p className="inline font-normal">{property.bhk} Bedrooms</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                <MdOutlineBathroom className="h-6 w-6 mr-2 text-black bg-white" />
                <p className="inline font-normal">2 Bathrooms</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                <LuParkingCircle className="h-6 w-6 mr-2 text-black bg-white" />
                <p className="inline font-normal">
                  {property.carParking ? "Yes" : "No"}
                </p>
              </div>

              <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                <IoTabletLandscape className="h-6 w-6 mr-2 text-black bg-white" />
                <p className="inline font-normal">1200 sq ft</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                <CiMobile4 className="h-6 w-6 mr-2 text-black bg-white" />
                <p className="inline font-normal">
                  Appliances - TV, Refrigerator
                </p>
              </div>
        <div className="mb-2">
          <div
            className={`bg-white w-full rounded-lg p-3 mb-4 ${
              selectComp > 1 ? "hidden" : ""
            }`}
          >
            <p className="text-black block font-semibold text-xl">Features</p>
            <div className="flex flex-wrap gap-3">
              <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                <MdBedroomParent className="h-6 w-6 mr-2 text-black bg-white" />
                <p className="inline font-normal">{property.bhk} Bedrooms</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                <MdOutlineBathroom className="h-6 w-6 mr-2 text-black bg-white" />
                <p className="inline font-normal">2 Bathrooms</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                <LuParkingCircle className="h-6 w-6 mr-2 text-black bg-white" />
                <p className="inline font-normal">
                  {property.carParking ? "Yes" : "No"}
                </p>
              </div>

              <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                <IoTabletLandscape className="h-6 w-6 mr-2 text-black bg-white" />
                <p className="inline font-normal">1200 sq ft</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                <CiMobile4 className="h-6 w-6 mr-2 text-black bg-white" />
                <p className="inline font-normal">
                  Appliances - TV, Refrigerator
                </p>
              </div>
            </div>
          </div>

          <div className={`pb-4 ${selectComp > 2 ? "hidden" : ""}`}>
            <div className={`bg-white w-full rounded-lg p-3`}>
              <p className="text-black block font-semibold text-xl">About</p>
              <p className=" text-left mb-0">
                Brand New!! Residential 2 BHK Semi Furnished Flat at 4th floor
                with both Indian and Western bathrooms and Car Parking facility
                great for nuclear family or extra income. Pets are allowed and
                price is negotiable located at D 801 the woods apartment
                naubasta Deva road chinhat Lucknow .
          </div>

          <div className={`pb-4 ${selectComp > 2 ? "hidden" : ""}`}>
            <div className={`bg-white w-full rounded-lg p-3`}>
              <p className="text-black block font-semibold text-xl">About</p>
              <p className=" text-left mb-0">
                Brand New!! Residential 2 BHK Semi Furnished Flat at 4th floor
                with both Indian and Western bathrooms and Car Parking facility
                great for nuclear family or extra income. Pets are allowed and
                price is negotiable located at D 801 the woods apartment
                naubasta Deva road chinhat Lucknow .
              </p>
            </div>
          </div>

          <div className={`pb-4 ${selectComp > 3 ? "hidden" : ""}`}>
            <div className={`bg-white w-full rounded-lg p-3`}>
              <p className="text-black block font-semibold text-xl">
                Amenities
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <MdSecurity className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Security</p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <CgGym className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Gym</p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <LuFlower2 className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Garden</p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <FaHammer className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Maintenance</p>
                </div>

          <div className={`pb-4 ${selectComp > 3 ? "hidden" : ""}`}>
            <div className={`bg-white w-full rounded-lg p-3`}>
              <p className="text-black block font-semibold text-xl">
                Amenities
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <MdSecurity className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Security</p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <CgGym className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Gym</p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <LuFlower2 className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Garden</p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <FaHammer className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Maintenance</p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <GiMicrophone className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Club House</p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <GiFamilyHouse className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Semi furnished</p>
                </div>
                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <GiMicrophone className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Club House</p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <GiFamilyHouse className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Semi furnished</p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <MdOutlineAvTimer className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">24 hrs backup</p>
                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <MdOutlineAvTimer className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">24 hrs backup</p>
                </div>
              </div>
            </div>
          </div>
              </div>
            </div>
          </div>

          {/* Regulation section */}
          <div className={`pb-4 ${selectComp > 4 ? "hidden" : ""}`}>
            <div className={`bg-white w-full rounded-lg p-3`}>
              <p className="text-black block font-semibold text-xl">
                Regulations
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <PiStudentBold className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Student Friendly</p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <MdPets className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">
                    Pets Allowed{property.petsAllowed ? "Yes" : "No"}
                  </p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <FaPeopleGroup className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Guests Allowed</p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <BsPeopleFill className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">
                    Families Allowed{" "}
                    {property.preference === "Family" ? "Yes" : "No"}
                  </p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <WiSmoke className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Smokers Allowed</p>
          {/* Regulation section */}
          <div className={`pb-4 ${selectComp > 4 ? "hidden" : ""}`}>
            <div className={`bg-white w-full rounded-lg p-3`}>
              <p className="text-black block font-semibold text-xl">
                Regulations
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <PiStudentBold className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Student Friendly</p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <MdPets className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">
                    Pets Allowed{property.petsAllowed ? "Yes" : "No"}
                  </p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <FaPeopleGroup className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Guests Allowed</p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <BsPeopleFill className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">
                    Families Allowed{" "}
                    {property.preference === "Family" ? "Yes" : "No"}
                  </p>
                </div>

                <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
                  <WiSmoke className="h-6 w-6 mr-2 text-black bg-white" />
                  <p className="inline font-normal">Smokers Allowed</p>
                </div>
              </div>
            </div>
          </div>
              </div>
            </div>
          </div>

          {/* Location section */}
          <div className={`pb-4 ${selectComp > 5 ? "hidden" : ""}`}>
            <div className={`bg-white w-full rounded-md p-3`}>
              <p className="text-black block font-semibold text-xl">Location</p>

              <div className="w-full md:w-4/5">
                <div className="flex flex-col sm:flex-row justify-between">
                  <p className="text-gray-400">{property.address}</p>
                  <p className="font-semibold text-teal-500 sm:mt-0 mt-2">
                    Get Directions
                  </p>
                </div>
          {/* Location section */}
          <div className={`pb-4 ${selectComp > 5 ? "hidden" : ""}`}>
            <div className={`bg-white w-full rounded-md p-3`}>
              <p className="text-black block font-semibold text-xl">Location</p>

              <div className="w-full md:w-4/5">
                <div className="flex flex-col sm:flex-row justify-between">
                  <p className="text-gray-400">{property.address}</p>
                  <p className="font-semibold text-teal-500 sm:mt-0 mt-2">
                    Get Directions
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-4/5 mb-2">
                  <div className="w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.7374841447!2d80.88487084258148!3d26.848163621554857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be314f43454e5%3A0x111085c9b254d27c!2sBLOCK%20B!5e0!3m2!1sen!2sin!4v1724437712311!5m2!1sen!2sin"
                      // src={property.locationLink}
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Location Map"
                    />
                  </div>
                </div>

                <div className="pl-0 md:pl-4 md:w-1/5">
                  {[
                    { icon: <MdSchool />, label: "School" },
                    { icon: <MdRestaurant />, label: "Restaurants" },
                    { icon: <MdShoppingBag />, label: "Groceries" },
                    { icon: <MdLocalCafe />, label: "Cafe" },
                    { icon: <MdMoney />, label: "Banks" },
                    { icon: <MdStore />, label: "Shops" },
                    { icon: <MdFitnessCenter />, label: "Fitness" },
                    { icon: <MdDirectionsBus />, label: "Transport" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto"
                    >
                      <div className="flex w-1/2 justify-end">
                        <div className="h-6 w-6 mr-2 text-black bg-white">
                          {item.icon}
                        </div>
                      </div>
                      <p className="inline pb-0 mb-0 text-lg">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-4/5 mb-2">
                  <div className="w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.7374841447!2d80.88487084258148!3d26.848163621554857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be314f43454e5%3A0x111085c9b254d27c!2sBLOCK%20B!5e0!3m2!1sen!2sin!4v1724437712311!5m2!1sen!2sin"
                      // src={property.locationLink}
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Location Map"
                    />
                  </div>
                </div>

                <div className="pl-0 md:pl-4 md:w-1/5">
                  {[
                    { icon: <MdSchool />, label: "School" },
                    { icon: <MdRestaurant />, label: "Restaurants" },
                    { icon: <MdShoppingBag />, label: "Groceries" },
                    { icon: <MdLocalCafe />, label: "Cafe" },
                    { icon: <MdMoney />, label: "Banks" },
                    { icon: <MdStore />, label: "Shops" },
                    { icon: <MdFitnessCenter />, label: "Fitness" },
                    { icon: <MdDirectionsBus />, label: "Transport" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto"
                    >
                      <div className="flex w-1/2 justify-end">
                        <div className="h-6 w-6 mr-2 text-black bg-white">
                          {item.icon}
                        </div>
                      </div>
                      <p className="inline pb-0 mb-0 text-lg">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Review section */}

          <div className={`pb-4 ${selectComp > 6 ? "hidden" : ""}`}>
            <div className={`bg-white w-full rounded-lg p-3`}>
              <p className="text-black block font-semibold text-xl">Review</p>

              <div className="md:flex  gap-4">
                <div className="border rounded-lg  p-4 border-black ">
                  <div className="flex">
                    <MdOutlineStarPurple500 className="text-[#FFC700] mt-1 h-8 w-8 mx-2" />
                    <MdOutlineStarPurple500 className="text-[#FFC700] mt-1 h-8 w-8 mx-2" />
                    <MdOutlineStarPurple500 className="text-[#FFC700] mt-1 h-8 w-8 mx-2" />
                    <MdOutlineStarPurple500 className="text-[#FFC700] mt-1 h-8 w-8 mx-2" />
                    <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                  </div>
                  <h2 className="font-semibold text-black pt-3 text-left ml-2 ">
                    4.5 out of 5
                  </h2>
                </div>

                <div className="border rounded-lg  p-4 border-black w-full md:flex justify-between sm:flex-row">
                  <div>
                    <p className="my-0 text-left ml-2 tracking-wide">
                      Rate this property based on
                    </p>
                    <p className="my-0 text-left ml-2 tracking-wide">
                      your experience.
                    </p>
                    <div className="flex pt-3">
                      <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                      <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                      <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                      <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                      <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                    </div>
                  </div>

                  <div className="pr-4">
                    <p className="my-0 tracking-wide">
                      Share details of your experience With
                    </p>
                    <p className="my-0 text-left tracking-wide">
                      This Property.
                    </p>
                    <div
                      className="rounded-lg mt-3"
                      style={{ backgroundColor: "#40B5A8" }}
                    >
                      <button
                        className="flex w-full justify-evenly p-2 font-semibold"
                        onClick={() => {
                          setShowPopup(true);
                        }}
                      >
                        Write a review
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {showPopup && <Popup onClose={() => setShowPopup(false)} />}

              <div className="mt-4 border border-black rounded-lg p-4 w-full">
                <div className="flex">
                  <img src={profile} className="h-16 w-16" alt="" />
                  <div className="ml-4 mt-2">
                    <p className="mx-0 my-0 font-semibold text-lg">
                      Peter Parker
                    </p>
                    <div className="flex mt-1">
                      <MdOutlineStarPurple500 className="text-[#FFC700] h-4 w-4 mr-2" />
                      <MdOutlineStarPurple500 className="text-[#FFC700] h-4 w-4 mr-2" />
                      <MdOutlineStarPurple500 className="text-[#FFC700] mr-2 h-4 w-4" />
                      <MdOutlineStarPurple500 className="text-[#FFC700] mr-2 h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-left mx-0 my-0">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Placeat necessitatibus natus exercitationem eum qui.
                    Numquam, autem officia? Voluptate, ab excepturi? Hic dolor
                    vero saepe ut vitae eum suscipit! Odit, ut!
                  </p>
                </div>
              </div>

              <div className="mt-4 border border-black rounded-lg p-4 w-full">
          {/* Review section */}

          <div className={`pb-4 ${selectComp > 6 ? "hidden" : ""}`}>
            <div className={`bg-white w-full rounded-lg p-3`}>
              <p className="text-black block font-semibold text-xl">Review</p>

              <div className="md:flex  gap-4">
                <div className="border rounded-lg  p-4 border-black ">
                  <div className="flex">
                    <MdOutlineStarPurple500 className="text-[#FFC700] mt-1 h-8 w-8 mx-2" />
                    <MdOutlineStarPurple500 className="text-[#FFC700] mt-1 h-8 w-8 mx-2" />
                    <MdOutlineStarPurple500 className="text-[#FFC700] mt-1 h-8 w-8 mx-2" />
                    <MdOutlineStarPurple500 className="text-[#FFC700] mt-1 h-8 w-8 mx-2" />
                    <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                  </div>
                  <h2 className="font-semibold text-black pt-3 text-left ml-2 ">
                    4.5 out of 5
                  </h2>
                </div>

                <div className="border rounded-lg  p-4 border-black w-full md:flex justify-between sm:flex-row">
                  <div>
                    <p className="my-0 text-left ml-2 tracking-wide">
                      Rate this property based on
                    </p>
                    <p className="my-0 text-left ml-2 tracking-wide">
                      your experience.
                    </p>
                    <div className="flex pt-3">
                      <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                      <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                      <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                      <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                      <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                    </div>
                  </div>

                  <div className="pr-4">
                    <p className="my-0 tracking-wide">
                      Share details of your experience With
                    </p>
                    <p className="my-0 text-left tracking-wide">
                      This Property.
                    </p>
                    <div
                      className="rounded-lg mt-3"
                      style={{ backgroundColor: "#40B5A8" }}
                    >
                      <button
                        className="flex w-full justify-evenly p-2 font-semibold"
                        onClick={() => {
                          setShowPopup(true);
                        }}
                      >
                        Write a review
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {showPopup && <Popup onClose={() => setShowPopup(false)} />}

              <div className="mt-4 border border-black rounded-lg p-4 w-full">
                <div className="flex">
                  <img src={profile} className="h-16 w-16" alt="" />
                  <div className="ml-4 mt-2">
                    <p className="mx-0 my-0 font-semibold text-lg">
                      Peter Parker
                    </p>
                    <div className="flex mt-1">
                      <MdOutlineStarPurple500 className="text-[#FFC700] h-4 w-4 mr-2" />
                      <MdOutlineStarPurple500 className="text-[#FFC700] h-4 w-4 mr-2" />
                      <MdOutlineStarPurple500 className="text-[#FFC700] mr-2 h-4 w-4" />
                      <MdOutlineStarPurple500 className="text-[#FFC700] mr-2 h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-left mx-0 my-0">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Placeat necessitatibus natus exercitationem eum qui.
                    Numquam, autem officia? Voluptate, ab excepturi? Hic dolor
                    vero saepe ut vitae eum suscipit! Odit, ut!
                  </p>
                </div>
              </div>

              <div className="mt-4 border border-black rounded-lg p-4 w-full">
                <div className="flex">
                  <img src={profile} className="h-16 w-16" alt="" />
                  <div className="ml-4 mt-2">
                    <p className="mx-0 my-0 font-semibold text-lg">
                      Peter Parker
                    </p>
                    <div className="flex mt-1">
                      <MdOutlineStarPurple500 className="text-[#FFC700] h-4 w-4 mr-2" />
                      <MdOutlineStarPurple500 className="text-[#FFC700] h-4 w-4 mr-2" />
                      <MdOutlineStarPurple500 className="text-[#FFC700] mr-2 h-4 w-4" />
                      <MdOutlineStarPurple500 className="text-[#FFC700] mr-2 h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-left mx-0 my-0">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Placeat necessitatibus natus exercitationem eum qui.
                    Numquam, autem officia? Voluptate, ab excepturi? Hic dolor
                    vero saepe ut vitae eum suscipit! Odit, ut!
                  <img src={profile} className="h-16 w-16" alt="" />
                  <div className="ml-4 mt-2">
                    <p className="mx-0 my-0 font-semibold text-lg">
                      Peter Parker
                    </p>
                    <div className="flex mt-1">
                      <MdOutlineStarPurple500 className="text-[#FFC700] h-4 w-4 mr-2" />
                      <MdOutlineStarPurple500 className="text-[#FFC700] h-4 w-4 mr-2" />
                      <MdOutlineStarPurple500 className="text-[#FFC700] mr-2 h-4 w-4" />
                      <MdOutlineStarPurple500 className="text-[#FFC700] mr-2 h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-left mx-0 my-0">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Placeat necessitatibus natus exercitationem eum qui.
                    Numquam, autem officia? Voluptate, ab excepturi? Hic dolor
                    vero saepe ut vitae eum suscipit! Odit, ut!
                  </p>
                </div>
              </div>

              <div className="my-4 flex justify-center">
                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white mr-2">
                  <p className="text-center align-middle mx-0 my-0">1</p>
                </div>

                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white mr-2">
                  <p className="text-center align-middle mx-0 my-0">2</p>
                </div>

                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white mr-2">
                  <p className="text-center align-middle mx-0 my-0">3</p>
                </div>

                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white mr-4 ml-2">
                  <p className="text-center align-middle mx-0 my-0"> </p>
                </div>

                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white">
                  <p className="text-center align-middle mx-0 my-0"> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Flow2b;
