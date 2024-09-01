import React, { useState, useRef } from "react";
import {
  MdBedroomParent,
  MdOutlineBathroom,
  MdSecurity,
  MdOutlineStarPurple500,
  MdPets,
  MdOutlineAvTimer,
} from "react-icons/md";

// import {
//   MdDirectionsBus,
//   MdFitnessCenter,
//   MdLocalCafe,
//   MdMoney,
//   MdRestaurant,
//   MdSchool,
//   MdShoppingBag,
//   MdStore,
// } from "react-icons/md";

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


// const Flow2b = ({ propertyData = {} }) => {
//   const [selectedSection, setSelectedSection] = useState(null);

import LocationComponent from "./Location.jsx";
// import Property from "../Property";

const Flow2b = (property) => {
  console.log(property);

  // const [displayContent, setDisplayContent] = useState('location'); // 'location' is default
  // const handleIconClick = (content) => {
  //   setDisplayContent(content);
  // };
  const [selectedButton, setSelectedButton] = useState("");
  const [selectComp, setSelectComp] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  
  // Create refs for each section
  const sectionRefs = {
    Features: useRef(null),
    About: useRef(null),
    Amenities: useRef(null),
    Regulations: useRef(null),
    Location: useRef(null),
    Reviews: useRef(null),
  };

  const handleButtonClick = (button) => {
    if (button === selectedSection) {
      // Collapse the section if it's already selected
      setSelectedSection(null);
    } else {
      // Scroll to the clicked section and set it as the selected section
      sectionRefs[button].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSelectedSection(button);
    }
  };

  const renderSection = (section) => {
    switch (section) {
      case "Features":
        return (
          <div ref={sectionRefs.Features} className="bg-white w-full rounded-lg p-3 mb-4">
            <p className="text-black block font-semibold text-xl">Features</p>
            <div className="flex flex-wrap max-w-full">
              {propertyData.bhk && (
                <div className="border flex p-2 rounded-lg border-black mr-8">
                  <MdBedroomParent className="h-6 w-6 mr-4 text-black bg-white" />
                  <p className="inline pb-0 mb-0 font-normal">{propertyData.bhk} Bedrooms</p>
                </div>
              )}
              {propertyData.bathrooms && (
                <div className="border flex p-2 rounded-lg border-black mr-8">
                  <MdOutlineBathroom className="h-6 w-6 mr-4 text-black bg-white" />
                  <p className="inline pb-0 mb-0 font-normal">{propertyData.bathrooms} Bathrooms</p>
                </div>
              )}
              <div className="border flex p-2 rounded-lg border-black mr-8">
                <LuParkingCircle className="h-6 w-6 mr-4 text-black bg-white" />
                <p className="inline pb-0 mb-0 font-normal">Parking</p>
              </div>
              {propertyData.area && (
                <div className="border flex p-2 rounded-lg border-black mr-8">
                  <IoTabletLandscape className="h-6 w-6 mr-4 text-black bg-white" />
                  <p className="inline pb-0 mb-0 font-normal">{propertyData.area} sq ft</p>
                </div>
              )}
              {propertyData.appliances && (
                <div className="border flex p-2 rounded-lg border-black mr-8">
                  <CiMobile4 className="h-6 w-6 mr-4 text-black bg-white" />
                  <p className="inline pb-0 mb-0 font-normal">Appliances - {propertyData.appliances}</p>
                </div>
              )}
            </div>
          </div>
        );
      case "About":
        return (
          <div ref={sectionRefs.About} className="pb-4">
            <div className="bg-white w-full rounded-lg p-3">
              <p className="text-black block font-semibold text-xl">About</p>
              <p className="text-left mb-0">{propertyData.about}</p>
            </div>
          </div>
        );
      case "Amenities":
        return (
          <div ref={sectionRefs.Amenities} className="pb-4">
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
                  <div key={label} className="border flex p-2 rounded-lg border-black mr-8">
                    {icon}
                    <p className="inline pb-0 mb-0 font-normal">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "Regulations":
        return (
          <div ref={sectionRefs.Regulations} className="pb-4">
            <div className="bg-white w-full rounded-lg p-3">
              <p className="text-black block font-semibold text-xl">Regulations</p>
              <div className="flex flex-wrap max-w-full">
                {[
                  { icon: <PiStudentBold />, label: "Student Friendly" },
                  { icon: <MdPets />, label: "Pets Allowed" },
                  { icon: <FaPeopleGroup />, label: "Guests Allowed" },
                  { icon: <BsPeopleFill />, label: "Families allowed" },
                  { icon: <WiSmoke />, label: "Smokers allowed" },
                ].map(({ icon, label }, index) => (
                  <div key={label} className="border flex p-2 rounded-lg border-black mr-8">
                    {icon}
                    <p className="inline pb-0 mb-0 font-normal">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        );
      case "Location":
        return (
          <div ref={sectionRefs.Location} className="pb-4">
            <div className="bg-white w-full rounded-lg p-3">


          {/* Location section */}
          {/* <div className={`pb-4 ${selectComp > 5 ? "hidden" : ""}`}>
            <div className={`bg-white w-full rounded-md p-3`}>
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
                  ].map((place) => (
                    <div key={place} className="border flex p-1 w-full justify-center rounded-lg border-black mr-8 mb-2">
                      <MdBedroomParent className="h-5 w-5 mr-4 text-black bg-white" />
                      <p className="inline pb-0 mb-0 text-sm">{place}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        );
      case "Reviews":
        return (
          <div ref={sectionRefs.Reviews} className="pb-4">
            <div className="bg-white w-full rounded-lg p-3">
              <p className="text-black block font-semibold text-xl">Reviews</p>
              <div className="flex">
                <MdOutlineStarPurple500 className="h-8 w-8 text-black bg-white" />
                <p className="text-black font-semibold pl-2 text-lg">4.7</p>
                <p className="text-gray-400 pl-2 text-lg">25 reviews</p>

          </div> */}
          {/**<LocationComponent/> */}
          <LocationComponent />

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
              <button
                className="border-2 border-teal-500 font-semibold rounded-lg px-5 py-2 mt-2"
                onClick={() => setShowPopup(true)}
              >
                Write a Review
              </button>
            </div>
            {showPopup && <Popup onClose={() => setShowPopup(false)} />}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between pt-10 pb-4 ">
        {["Features", "About", "Amenities", "Regulations", "Location", "Reviews"].map(
          (button) => (
            <button
              key={button}
              className={`text-white font-semibold text-xl ${selectedSection === button ? "underline decoration-teal-500" : ""}`}
              onClick={() => handleButtonClick(button)}
            >
              {button}
            </button>
          )
        )}
      </div>

      <div className="mb-2 flex flex-col">
        {["Features", "About", "Amenities", "Regulations", "Location", "Reviews"].map((section) => (
          <React.Fragment key={section}>
            {renderSection(section)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Flow2b;
