import React from "react";

import { CiMobile4 } from "react-icons/ci";
import { IoTabletLandscape } from "react-icons/io5";
import { FaParking } from "react-icons/fa";
import { MdBedroomParent, MdOutlineBathroom } from "react-icons/md";

const Features = ({ selectComp, property }) => {
  return (
    <div
      className={`bg-white w-full rounded-lg p-3 pl-4 mb-4 ${
        selectComp > 1 ? "hidden" : ""
      }`}
    >
      <p className="text-black block font-semibold text-xl mb-2">Features</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 lg:flex lg:flex-wrap lg:gap-10">
        <div className="border flex rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
          <MdBedroomParent className="h-6 w-6 mr-2 text-black bg-white" />
          <p className="inline font-normal text-sm md:text-md lg:text-md">
            {property.bhk} Bedrooms
          </p>
        </div>

        {property.typeOfWashroom && (
          <div className="border flex rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
            <MdOutlineBathroom className="h-6 w-6 mr-2 text-black bg-white" />
            <p className="inline font-normal text-sm md:text-md lg:text-md">
              {property.typeOfWashroom}
            </p>
          </div>
        )}

        <div className="border flex rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
          <FaParking className="h-6 w-6 mr-2 text-black bg-white" />
          <p className="inline font-normal text-sm md:text-md lg:text-md">
            {property.carParking ? "Yes" : "No"}
          </p>
        </div>

        <div className="border flex rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
          <IoTabletLandscape className="h-6 w-6 mr-2 text-black bg-white" />
          <p className="inline font-normal text-sm md:text-md lg:text-md">
            {property.squareFeetArea} sq ft
          </p>
        </div>

        <div className="border flex rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
          <CiMobile4 className="h-6 w-6 mr-2 text-black bg-white" />
          <p className="inline font-normal text-sm md:text-md lg:text-md">
            Appliances - {property.appliances.join(", ") || "NA"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
