import React from "react";
import { CiMobile4 } from "react-icons/ci";
import { IoTabletLandscape } from "react-icons/io5";
import { LuParkingCircle } from "react-icons/lu";
import { MdBedroomParent, MdOutlineBathroom } from "react-icons/md";

const Features = ({ selectComp, property }) => {
  return (
    <div
      className={`bg-white w-full rounded-lg p-3 mb-4 ${
        selectComp > 1 ? "hidden" : ""
      }`}
    >
      <p className="text-black block font-semibold text-xl">Features</p>
      <div className="flex flex-wrap gap-3">
        <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
          <MdBedroomParent className="h-6 w-6 mr-2 text-black bg-white" />
          <p className="inline font-normal">{property.bhk} Bedrooms</p>
        </div>

        {property.typeOfWashroom && (
          <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
            <MdOutlineBathroom className="h-6 w-6 mr-2 text-black bg-white" />
            <p className="inline font-normal">{property.typeOfWashroom}</p>
          </div>
        )}

        <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
          <LuParkingCircle className="h-6 w-6 mr-2 text-black bg-white" />
          <p className="inline font-normal">
            {property.carParking ? "Yes" : "No"}
          </p>
        </div>

        <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
          <IoTabletLandscape className="h-6 w-6 mr-2 text-black bg-white" />
          <p className="inline font-normal">{property.squareFeetArea} sq ft</p>
        </div>

        <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
          <CiMobile4 className="h-6 w-6 mr-2 text-black bg-white" />
          <p className="inline font-normal">
            Appliances - {property.appliances.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
