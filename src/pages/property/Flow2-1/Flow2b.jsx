/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import LocationComponent from "./Location.jsx";
import Reviews from "../../../components/PropertyComp/Reviews.jsx";
// import Reviews from "../../../components/index.js";
import Features from "./Flow2bcomponents/Features.jsx";
import About from "./Flow2bcomponents/About.jsx";
import Amenities from "./Flow2bcomponents/Amenities.jsx";
import Regulation from "./Flow2bcomponents/Regulations .jsx";
import NavButton from "./Flow2bcomponents/Navbar.jsx";
// import Property from "../Property";

const Flow2b = ({ property }) => {
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
  // const reviewData = [
  //   {
  //     _id: "6347hjsdvfhvdfdshcvw",
  //     property: "64f08d4f1c2a4e2a7e2a7f9b", // Replace with a valid ObjectId of a Property
  //     user: "64f08d4f1c2a4e2a7e2a7f9c", // Replace with a valid ObjectId of a User
  //     username: "john_doe",
  //     rating: 5,
  //     comment: "Amazing property! Had a great stay.",
  //     // The slug will be generated automatically in the pre-validation hook.
  //   },
  //   {
  //     _id: "6347hjsdvfhdfdvshcvw",
  //     property: "64f08d4f1c2a4e2a7e2a7f9d", // Replace with a valid ObjectId of a Property
  //     user: "64f08d4f1c2a4e2a7e2a7f9e", // Replace with a valid ObjectId of a User
  //     username: "jane_smith",
  //     rating: 4,
  //     comment: "Very good location, but the rooms could be cleaner.",
  //   },
  //   {
  //     _id: "6347hjsdvfhvdfdshcvw",
  //     property: "64f08d4f1c2a4e2a7e2a7f9f", // Replace with a valid ObjectId of a Property
  //     user: "64f08d4f1c2a4e2a7e2a7fa0", // Replace with a valid ObjectId of a User
  //     username: "alex_brown",
  //     rating: 1,
  //     comment:
  //       "Average experience, but the price was reasonable.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est, a qui ipsum, recusandae fuga commodi porro quaerat mollitia voluptas possimus perspiciatis. Ea commodi accusantium cupiditate deserunt ipsa eaque saepe animi!",
  //   },
  // ];

  const buttonClasses = "text-white font-semibold text-xl";

  return (
    <>
      <div className="text-black">
        {/* Navbar component for navigation */}
        <NavButton
          selectedButton={selectedButton}
          handleButtonClick={handleButtonClick}
          buttonClasses={buttonClasses}
        />

        <div className="mb-2">
          {/* Feature component */}
          <Features selectComp={selectComp} property={property} />

          {/* About component */}
          <About selectComp={selectComp} property={property} />

          {/* Amenitie component */}
          <Amenities selectComp={selectComp} property={property} />

          {/* Regulation section */}
          <Regulation selectComp={selectComp} property={property} />

          {/* Location component */}
          <div className={`pb-4 ${selectComp > 5 ? "hidden" : ""}`}>
            <LocationComponent property={property} selectComp={selectComp} />
          </div>

          {/* Review section */}
          <div className={`pb-4 ${selectComp > 6 ? "hidden" : ""}`}>
            <Reviews property={property} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Flow2b;
