import React from "react";


const NavButton = ({ selectedButton, handleButtonClick, buttonClasses }) => {
  
    return(
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
          }`}
          onClick={() => handleButtonClick("Reviews")}
        >
          Reviews
        </button>
      </div>
    )
}

export default NavButton;