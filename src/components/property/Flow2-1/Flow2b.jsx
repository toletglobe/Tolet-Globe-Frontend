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
import About from "./Flow2bcomponents/About.jsx";
import Amenities from "./Flow2bcomponents/Amenities.jsx";
import Features from "./Flow2bcomponents/Featurns.jsx";
import Regulation from "./Flow2bcomponents/Regulations .jsx";
import NavButton from "./Flow2bcomponents/Navbar.jsx";
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
        setSelectComp(0);
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
    // Navbuttons for navigation 
        <NavButton
          selectedButton={selectedButton}
          handleButtonClick={handleButtonClick}
          buttonClasses={buttonClasses}
        />
  
        <div className="mb-2">

        {/* // Featurn Component */}
          <Features property={property} selectComp={selectComp} />

         {/* //About component */}
          <About selectComp={selectComp} />

           {/* // Amenities component */}
          <Amenities selectComp={selectComp} />

          {/* Regulation section */}
          <Regulation selectComp={selectComp} property={property} />
        
        {/* Location Component */}
          <LocationComponent />

          {/* Review section */}
          <Reviews reviewData={reviewData} />
        </div>
      </div>
    </>
  );
};

export default Flow2b;
