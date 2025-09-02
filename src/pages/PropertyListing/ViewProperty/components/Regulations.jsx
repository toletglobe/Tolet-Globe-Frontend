// Import React
import React from "react";

// Import icons from react-icons
import { BsPeopleFill } from "react-icons/bs";   // People icon
import { MdPets } from "react-icons/md";        // Pets icon
import { PiStudentBold } from "react-icons/pi"; // Student icon

// Example component
const Regulations = () => {
  return (
    <div style={{ padding: "20px", fontSize: "20px" }}>
      <h2>Property Regulations</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><BsPeopleFill /> Family Allowed</li>
        <li><MdPets /> Pets Allowed</li>
        <li><PiStudentBold /> Students Allowed</li>
      </ul>
    </div>
  );
};


      className={`pb-4 ${
        selectComp > 4 ||
        ["Office", "Shop", "Warehouse"].includes(property.propertyType)
          ? "hidden"
          : ""
      }`}
    >
      <div className="bg-white w-full rounded-lg p-3 pl-4">
        <p className="text-black block font-semibold text-xl mb-2">
          Regulations
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:flex lg:flex-wrap lg:gap-10">
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
