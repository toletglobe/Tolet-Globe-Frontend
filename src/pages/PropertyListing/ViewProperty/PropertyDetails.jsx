import React, { useState } from "react";

import Location from "./components/Location.jsx";
import Reviews from "./components/NewReviews.jsx";
import Features from "./components/Features.jsx";
import About from "./components/About.jsx";
import Amenities from "./components/Amenities.jsx";
import Regulations from "./components/Regulations.jsx";
import NavButton from "./components/NavButton.jsx";

const PropertyDetails = ({ property }) => {
  const [selectedButton, setSelectedButton] = useState("");
  const [selectComp, setSelectComp] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  console.log("FETCHED", property);

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

  const buttonClasses = "text-white font-semibold text-xl";

  return (
    <>
      <div className="text-black px-4 py-4 relative">
        {/* Navbar component for navigation */}
        <NavButton
          selectedButton={selectedButton}
          handleButtonClick={handleButtonClick}
          buttonClasses={buttonClasses}
          property={property}
        />

        <div className="mb-2">
          {/* Feature component */}
          <Features selectComp={selectComp} property={property} />

          {/* About component */}
          <About selectComp={selectComp} property={property} />

          {/* Amenitie component */}
          <Amenities selectComp={selectComp} property={property} />

          {/* Regulation section */}
          <Regulations selectComp={selectComp} property={property} />

          {/* Location component */}
          <div className={`pb-4 ${selectComp > 5 ? "hidden" : ""}`}>
            <Location property={property} selectComp={selectComp} />
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

export default PropertyDetails;
