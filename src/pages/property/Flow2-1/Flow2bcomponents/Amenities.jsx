import React from "react";
import { CgGym } from "react-icons/cg";
import { FaHammer } from "react-icons/fa6";
import { GiFamilyHouse, GiMicrophone } from "react-icons/gi";
import { LuFlower2 } from "react-icons/lu";
import { MdSecurity, MdOutlineAvTimer } from "react-icons/md";
import { FaSwimmer } from "react-icons/fa"; // Pool icon
import { MdBalcony } from "react-icons/md"; // Balcony icon
import { GiElevator } from "react-icons/gi"; // Elevator icon
import { WiSnowflakeCold } from "react-icons/wi";

const Amenities = ({ selectComp, property }) => {
  return (
    // component for Amenities
    <div className={`pb-4 ${selectComp > 3 ? "hidden" : ""}`}>
      <div className={`bg-white w-full rounded-lg p-3`}>
        <p className="text-black block font-semibold text-xl">Amenities</p>
        <div className="flex flex-wrap gap-3">
          {property.security && (
            <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
              <MdSecurity className="h-6 w-6 mr-2 text-black bg-white" />
              <p className="inline font-normal">
                Security - Rs. {property.security}
              </p>
            </div>
          )}

          {property.amenities && property.amenities.includes("gym") && (
            <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
              <CgGym className="h-6 w-6 mr-2 text-black bg-white" />
              <p className="inline font-normal">Gym</p>
            </div>
          )}

          {property.amenities && property.amenities.includes("garden") && (
            <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
              <LuFlower2 className="h-6 w-6 mr-2 text-black bg-white" />
              <p className="inline font-normal">Garden</p>
            </div>
          )}
          {/* 
          <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
            <FaHammer className="h-6 w-6 mr-2 text-black bg-white" />
            <p className="inline font-normal">Maintenance</p>
          </div> */}

          {property.amenities && property.amenities.includes("clubhouse") && (
            <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto }">
              <GiMicrophone className="h-6 w-6 mr-2 text-black bg-white" />
              <p className="inline font-normal">Club House</p>
            </div>
          )}

          <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
            <GiFamilyHouse className="h-6 w-6 mr-2 text-black bg-white" />
            <p className="inline font-normal">{property.type}</p>
          </div>

          {property.amenities && property.amenities.includes("24hrssupply") && (
            <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
              <MdOutlineAvTimer className="h-6 w-6 mr-2 text-black bg-white" />
              <p className="inline font-normal">24 hrs backup</p>
            </div>
          )}

          {property.amenities && property.amenities.includes("elevator") && (
            <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
              <GiElevator className="h-6 w-6 mr-2 text-black bg-white" />
              <p className="inline font-normal">Elevator</p>
            </div>
          )}

          {property.amenities && property.amenities.includes("pool") && (
            <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
              <FaSwimmer className="h-6 w-6 mr-2 text-black bg-white" />
              <p className="inline font-normal">Pool</p>
            </div>
          )}

          {property.amenities && property.amenities.includes("balcony") && (
            <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
              <MdBalcony className="h-6 w-6 mr-2 text-black bg-white" />
              <p className="inline font-normal">Balcony</p>
            </div>
          )}

          {property.coolingFacility && (
            <div className="border flex p-2 rounded-lg border-black sm:mr-4 lg:mr-8 w-full sm:w-auto">
              <WiSnowflakeCold className="h-6 w-6 mr-2 text-black bg-white" />
              <p className="inline font-normal">{property.coolingFacility}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Amenities;
