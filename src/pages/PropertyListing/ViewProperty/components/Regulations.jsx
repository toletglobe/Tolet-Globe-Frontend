import React from "react";

import { BsPeopleFill } from "react-icons/bs";
import { MdPets } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";

const Regulations = ({ selectComp, property }) => {
  return (
    <div className={`pb-4 ${selectComp > 4 ? "hidden" : ""}`}>
      <div className={`bg-white w-full rounded-lg p-3 pl-4`}>
        <p className="text-black block font-semibold text-xl mb-2">
          Regulations
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:flex lg:flex-wrap lg:gap-10">
          <div className="border flex rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
            <PiStudentBold className="h-5 w-5 mr-2 text-black bg-white" />
            <p className="inline font-normal text-sm md:text-md lg:text-lg">
              Student Friendly -{" "}
              {property.preference === "Family" ? "No" : "Yes"}
            </p>
          </div>

          <div className="border flex rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
            <MdPets className="h-5 w-5 mr-2 text-black bg-white" />
            <p className="inline font-normal text-sm md:text-md lg:text-lg">
              Pets Allowed - {property.petsAllowed ? "Yes" : "No"}
            </p>
          </div>

          <div className="border flex rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
            <BsPeopleFill className="h-5 w-5 mr-2 text-black bg-white" />
            <p className="inline font-normal text-sm md:text-md lg:text-lg">
              Families Allowed -{" "}
              {property.preference === "Family" ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regulations;
