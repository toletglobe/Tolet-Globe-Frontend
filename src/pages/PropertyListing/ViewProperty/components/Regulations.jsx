//
import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { MdPets } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";

const Regulations = ({ selectComp, property }) => {
  const getPreferenceText = () => {
    switch (property.bachelors) {
      case "Boys":
        return "Boys";
      case "Girls":
        return "Girls";
      default:
        return "Boys/Girls";
    }
  };

  return (
    <div className={`pb-4 ${selectComp > 4 ? "hidden" : ""}`}>
      <div className={`bg-white lg:w-[65.6vw] lg:ml-[19rem] rounded-lg p-3 pl-4`}>
        <p className="text-black block font-semibold lg:text-2xl mb-6 tracking-wide">
          Regulations
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:flex lg:flex-wrap lg:gap-10 mb-6">
          <div className="border flex rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
            <BsPeopleFill className="h-5 w-5 mr-2 text-black bg-white" />
            <p className="inline font-normal text-sm md:text-md lg:text-lg">
              Bachelors Allowed -{" "}
              {property.preference === "Bachelors" ||
              property.preference === "Both"
                ? "Yes"
                : "No"}
            </p>
          </div>

          {(property.preference === "Bachelors" ||
            property.preference === "Both") && (
            <div className="border flex rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
              <BsPeopleFill className="h-5 w-5 mr-2 text-black bg-white" />
              <p className="inline font-normal text-sm md:text-md lg:text-lg">
                Preference - {getPreferenceText()}
              </p>
            </div>
          )}

          <div className="border flex rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
            <BsPeopleFill className="h-5 w-5 mr-2 text-black bg-white" />
            <p className="inline font-normal text-sm md:text-md lg:text-lg">
              Families Allowed -{" "}
              {property.preference === "Family" ||
              property.preference === "Both"
                ? "Yes"
                : "No"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regulations;
