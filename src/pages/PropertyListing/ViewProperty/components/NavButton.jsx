import React from "react";

const NavButton = ({
  selectedButton,
  handleButtonClick,
  buttonClasses,
  property,
}) => {
  return (
    <div className="hidden md:flex lg:flex flex-wrap gap-4 justify-between pt-10 pb-4 sm:items-start">
      <button
        className={`${buttonClasses} ${
          selectedButton === "Features"
            ? "underline decoration-2 decoration-teal-500 underline-offset-8"
            : ""
        }`}
        onClick={() => handleButtonClick("Features")}
      >
        Features
      </button>
      <button
        className={`${buttonClasses} ${
          selectedButton === "About"
            ? "underline decoration-2 decoration-teal-500 underline-offset-8"
            : ""
        }`}
        onClick={() => handleButtonClick("About")}
      >
        About
      </button>
      <button
        className={`${buttonClasses} ${
          selectedButton === "Amenities"
            ? "underline decoration-2 decoration-teal-500 underline-offset-8"
            : ""
        }`}
        onClick={() => handleButtonClick("Amenities")}
      >
        Amenities
      </button>
      {(property.propertyType === "PG" ||
        property.propertyType === "House" ||
        property.propertyType === "Flat") && (
        <button
          className={`${buttonClasses} ${
            selectedButton === "Regulations"
              ? "underline decoration-2 decoration-teal-500 underline-offset-8"
              : ""
          }`}
          onClick={() => handleButtonClick("Regulations")}
        >
          Regulations
        </button>
      )}
      <button
        className={`${buttonClasses} ${
          selectedButton === "Location"
            ? "underline decoration-2 decoration-teal-500 underline-offset-8"
            : ""
        }`}
        onClick={() => handleButtonClick("Location")}
      >
        Location
      </button>
      <button
        className={`${buttonClasses} ${
          selectedButton === "Reviews"
            ? "underline decoration-2 decoration-teal-500 underline-offset-8"
            : ""
        }`}
        onClick={() => handleButtonClick("Reviews")}
      >
        Reviews
      </button>
    </div>
  );
};

export default NavButton;
