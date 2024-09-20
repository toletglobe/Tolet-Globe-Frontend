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
import { PiStarThin } from "react-icons/pi";
import profile from "../../../assets/property/author7.jpg";

// import map from "../../../assets/property/map.png";
import Popup from "./Popup";
import LocationComponent from "./Location.jsx";
import Reviews from "../../reviews/Reviews.jsx";
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
        setSelectComp(1);
    }
  };
  const reviewData = [
    {
      _id: "6347hjsdvfhvdfdshcvw",
      property: "64f08d4f1c2a4e2a7e2a7f9b", // Replace with a valid ObjectId of a Property
      user: "64f08d4f1c2a4e2a7e2a7f9c", // Replace with a valid ObjectId of a User
      username: "john_doe",
      rating: 5,
      comment: "Amazing property! Had a great stay.",
      // The slug will be generated automatically in the pre-validation hook.
    },
    {
      _id: "6347hjsdvfhdfdvshcvw",
      property: "64f08d4f1c2a4e2a7e2a7f9d", // Replace with a valid ObjectId of a Property
      user: "64f08d4f1c2a4e2a7e2a7f9e", // Replace with a valid ObjectId of a User
      username: "jane_smith",
      rating: 4,
      comment: "Very good location, but the rooms could be cleaner.",
    },
    {
      _id: "6347hjsdvfhvdfdshcvw",
      property: "64f08d4f1c2a4e2a7e2a7f9f", // Replace with a valid ObjectId of a Property
      user: "64f08d4f1c2a4e2a7e2a7fa0", // Replace with a valid ObjectId of a User
      username: "alex_brown",
      rating: 1,
      comment:
        "Average experience, but the price was reasonable.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est, a qui ipsum, recusandae fuga commodi porro quaerat mollitia voluptas possimus perspiciatis. Ea commodi accusantium cupiditate deserunt ipsa eaque saepe animi!",
    },
  ];

  const buttonClasses = "text-white font-semibold text-xl";

  return (
    <>
      <div className="text-black">
        <div className="flex flex-wrap gap-4 justify-between pt-10 pb-4 sm:items-start">
          <button
            className={`${buttonClasses} ${selectedButton === "Features"
                ? "underline decoration-teal-500"
                : "hover:underline hover:decoration-teal-500"
              } `}
            onClick={() => handleButtonClick("Features")}
          >
            Features
          </button>
          <button
            className={`${buttonClasses} ${selectedButton === "About"
                ? "underline decoration-teal-500"
                : "hover:underline hover:decoration-teal-500"
              }`}
            onClick={() => handleButtonClick("About")}
          >
            About
          </button>
          <button
            className={`${buttonClasses} ${selectedButton === "Amenities"
                ? "underline decoration-teal-500"
                : "hover:underline hover:decoration-teal-500"
              }`}
            onClick={() => handleButtonClick("Amenities")}
          >
            Amenities
          </button>
          <button
            className={`${buttonClasses} ${selectedButton === "Regulations"
                ? "underline decoration-teal-500"
                : "hover:underline hover:decoration-teal-500"
              }`}
            onClick={() => handleButtonClick("Regulations")}
          >
            Regulations
          </button>
          <button
            className={`${buttonClasses} ${selectedButton === "Location"
                ? "underline decoration-teal-500"
                : "hover:underline hover:decoration-teal-500"
              }`}
            onClick={() => handleButtonClick("Location")}
          >
            Location
          </button>
          <button
            className={`${buttonClasses} ${selectedButton === "Reviews"
                ? "underline decoration-teal-500"
                : "hover:underline hover:decoration-teal-500"
              }`}
            onClick={() => handleButtonClick("Reviews")}
          >
            Reviews
          </button>
        </div>

        <div className="mb-2">
          <div
            className={`bg-white w-full rounded-lg p-3 mb-4 ${selectComp > 1 ? "hidden" : ""
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
                    Pets Allowed {property.petsAllowed ? "Yes" : "No"}
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
          <div className={`pb-4 ${selectComp > 5 ? "hidden" : ""}`}>
            <LocationComponent />
          </div>
          {/* Review section */}
          <div className={`pb-4 ${selectComp > 6 ? "hidden" : ""}`}>
            <Reviews reviewData={reviewData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Flow2b;
