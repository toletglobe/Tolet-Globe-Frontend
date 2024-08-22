import React, { useState } from "react";
import {
  MdBedroomParent,
  MdOutlineBathroom,
  MdSecurity,
  MdOutlineStarPurple500,
  MdPets,
  MdOutlineAvTimer,
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
import map from "../../../assets/property/map.png";
import Popup from "./Popup";

const Flow2b = ({ propertyData = {} }) => {
  const [selectedButton, setSelectedButton] = useState("Features");
  const [selectComp, setSelectComp] = useState(1);
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
    <div>
      <div className="flex justify-between pt-10 pb-4">
        {[
          "Features",
          "About",
          "Amenities",
          "Regulations",
          "Location",
          "Reviews",
        ].map((button) => (
          <button
            key={button}
            className={`${buttonClasses} ${
              selectedButton === button ? "underline decoration-teal-500" : ""
            }`}
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </button>
        ))}
      </div>

      <div className="mb-2">
        {/* Features section */}
        <div
          className={`bg-white w-full rounded-lg p-3 mb-4 ${
            selectComp !== 1 ? "hidden" : ""
          }`}
        >
          <p className="text-black block font-semibold text-xl">Features</p>
          <div className="flex flex-wrap max-w-full">
            <div className="border flex p-2 rounded-lg border-black mr-8">
              <MdBedroomParent className="h-6 w-6 mr-4 text-black bg-white" />
              <p className="inline pb-0 mb-0 font-normal">
                {propertyData.bhk} Bedrooms
              </p>
            </div>
            <div className="border flex p-2 rounded-lg border-black mr-8">
              <MdOutlineBathroom className="h-6 w-6 mr-4 text-black bg-white" />
              <p className="inline pb-0 mb-0 font-normal">
                {propertyData.bathrooms} Bathrooms
              </p>
            </div>
            <div className="border flex p-2 rounded-lg border-black mr-8">
              <LuParkingCircle className="h-6 w-6 mr-4 text-black bg-white" />
              <p className="inline pb-0 mb-0 font-normal">Parking</p>
            </div>
            <div className="border flex p-2 rounded-lg border-black mr-8">
              <IoTabletLandscape className="h-6 w-6 mr-4 text-black bg-white" />
              <p className="inline pb-0 mb-0 font-normal">
                {propertyData.area} sq ft
              </p>
            </div>
            <div className="border flex p-2 rounded-lg border-black mr-8">
              <CiMobile4 className="h-6 w-6 mr-4 text-black bg-white" />
              <p className="inline pb-0 mb-0 font-normal">
                Appliances - {propertyData.appliances}
              </p>
            </div>
          </div>
        </div>

        {/* About section */}
        <div className={`pb-4 ${selectComp !== 2 ? "hidden" : ""}`}>
          <div className="bg-white w-full rounded-lg p-3">
            <p className="text-black block font-semibold text-xl">About</p>
            <p className="text-left mb-0">{propertyData.about}</p>
          </div>
        </div>

        {/* Amenities section */}
        <div className={`pb-4 ${selectComp !== 3 ? "hidden" : ""}`}>
          <div className="bg-white w-full rounded-lg p-3">
            <p className="text-black block font-semibold text-xl">Amenities</p>
            <div className="flex flex-wrap max-w-full">
              {[
                { icon: <MdSecurity />, label: "Security" },
                { icon: <CgGym />, label: "Gym" },
                { icon: <LuFlower2 />, label: "Garden" },
                { icon: <FaHammer />, label: "Maintenance" },
                { icon: <GiMicrophone />, label: "Club House" },
                { icon: <GiFamilyHouse />, label: "Semi furnished" },
                { icon: <MdOutlineAvTimer />, label: "24 hrs backup" },
              ].map(({ icon, label }, index) => (
                <div
                  key={index}
                  className="border flex p-2 rounded-lg border-black mr-8"
                >
                  {icon}
                  <p className="inline pb-0 mb-0 font-normal">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regulations section */}
        <div className={`pb-4 ${selectComp !== 4 ? "hidden" : ""}`}>
          <div className="bg-white w-full rounded-lg p-3">
            <p className="text-black block font-semibold text-xl">
              Regulations
            </p>
            <div className="flex flex-wrap max-w-full">
              {[
                { icon: <PiStudentBold />, label: "Student Friendly" },
                { icon: <MdPets />, label: "Pets Allowed" },
                { icon: <FaPeopleGroup />, label: "Guests Allowed" },
                { icon: <BsPeopleFill />, label: "Families allowed" },
                { icon: <WiSmoke />, label: "Smokers allowed" },
              ].map(({ icon, label }, index) => (
                <div
                  key={index}
                  className="border flex p-2 rounded-lg border-black mr-8"
                >
                  {icon}
                  <p className="inline pb-0 mb-0 font-normal">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location section */}
        <div className={`pb-4 ${selectComp !== 5 ? "hidden" : ""}`}>
          <div className="bg-white w-full rounded-lg p-3">
            <p className="text-black block font-semibold text-xl">Location</p>
            <div className="w-4/5">
              <div className="flex justify-between">
                <p className="text-gray-400">{propertyData.location}</p>
                <p className="font-semibold text-teal-500">Get Directions</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-4/5 mb-2">
                <img
                  src={propertyData.mapImage || map}
                  alt="Map"
                  className="bg-cover max-h-72"
                />
              </div>
              <div className="pl-4 w-1/5">
                {[
                  "School",
                  "Restaurants",
                  "Groceries",
                  "Cafe",
                  "Banks",
                  "Shops",
                  "Fitness",
                  "Transport",
                ].map((place, index) => (
                  <div
                    key={index}
                    className="border flex p-1 w-full justify-center rounded-lg border-black mr-8 mb-2"
                  >
                    <MdBedroomParent className="h-5 w-5 mr-4 text-black bg-white" />
                    <p className="inline pb-0 mb-0 text-sm">{place}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className={`pb-4 ${selectComp !== 6 ? "hidden" : ""}`}>
          <div className="bg-white w-full rounded-lg p-3">
            <p className="text-black block font-semibold text-xl">Review</p>
            <div className="flex">
              <div className="border rounded-lg p-4 border-black">
                <div className="flex">
                  <MdOutlineStarPurple500 className="text-[#FFC700] mt-1 h-6 w-6" />
                  <p className="font-semibold text-[#FFC700] text-xl ml-2">
                    {propertyData.rating} Stars
                  </p>
                </div>
                <p className="text-gray-400 text-sm">{propertyData.reviews}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Flow2b;
