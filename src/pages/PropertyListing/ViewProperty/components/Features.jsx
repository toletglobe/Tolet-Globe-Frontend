// import React from "react";

// // Icons
// import Bedrooms from "./assets/Features/Bedrooms.svg"
// import Bathrooms from "./assets/Features/Bathrooms.svg"
// import Parking from "./assets/Features/Parking.svg"
// import SqFt from "./assets/Features/SqFt.svg"
// import Appliances from "./assets/Features/Appliances.svg"

// const Features = ({ selectComp, property }) => {
//   return (
//     <div
//       className={`bg-white w-full rounded-lg p-3 pl-4 mb-4 ${
//         selectComp > 1 ? "hidden" : ""
//       }`}
//     >
//       <p className="text-black block font-semibold text-xl mb-2">Features</p>
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-3 lg:flex lg:flex-wrap lg:gap-10">
//         <div className="border flex justify-between rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
//           <img src={Bedrooms} className="h-6 w-6 mr-4 my-auto" />
//           <p className="inline font-normal text-sm md:text-md lg:text-lg">
//             {property.bhk} Bedrooms
//           </p>
//         </div>

//         {property.typeOfWashroom && (
//           <div className="border flex justify-between rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
//             <img src={Bathrooms} className="h-6 w-6 mr-4 my-auto" />
//             <p className="inline font-normal text-sm md:text-md lg:text-lg">
//               {property.typeOfWashroom}
//             </p>
//           </div>
//         )}

//         <div className="border flex justify-between rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
//           <img src={Parking} className="h-6 w-6 mr-4 my-auto" />
//           <p className="inline font-normal text-sm md:text-md lg:text-lg">
//             {property.carParking ? "Yes" : "No"}
//           </p>
//         </div>

//         <div className="border flex justify-between rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
//           <img src={SqFt} className="h-6 w-6 mr-4 my-auto" />
//           <p className="inline font-normal text-sm md:text-md lg:text-lg">
//             {property.squareFeetArea} sq ft
//           </p>
//         </div>
//         <div className="border flex justify-between rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
//           <img src={Appliances} className="h-6 w-6 mr-4 my-auto" />
//           <p className="inline font-normal text-sm md:text-md lg:text-lg">
//             Appliances - {property.appliances.join(", ") || "NA"}
//           </p>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Features;

import React from "react";

// Icons
import Bedrooms from "./assets/Features/Bedrooms.svg";
import Bathrooms from "./assets/Features/Bathrooms.svg";
import Parking from "./assets/Features/Parking.svg";
import SqFt from "./assets/Features/SqFt.svg";
import Appliances from "./assets/Features/Appliances.svg";

const locationLabels = {
  same_property: "Lives on property",
  same_city: "Lives in same city",
  different_city: "Lives in different city"
};

const Features = ({ selectComp, property }) => {
  // Helper function to check if a value should be displayed
  const shouldDisplay = (value) => {
    return value !== null && value !== undefined && value !== "NA";
  };

  return (
    <div
      className={`bg-white lg:w-[65.6vw] lg:ml-[19rem] rounded-lg p-3 pl-4 mb-4 ${
        selectComp > 1 ? "hidden" : ""
      }`}
    >

      <p className="text-black block font-semibold lg:text-2xl mb-6 tracking-wide">Features</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 lg:flex lg:flex-wrap lg:gap-10 mb-6">
        <div className="border flex justify-between rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
          <img src={Bedrooms} className="h-6 w-6 mr-4 my-auto" />
          <p className="inline font-normal text-sm md:text-md lg:text-lg">
            {property.bhk} Bedrooms
          </p>
        </div>

        {property.typeOfWashroom && (

          <div className="border flex justify-between rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
            <img src={Bathrooms} className="h-6 w-6 mr-4 my-auto" />
            <p className="inline font-normal text-sm md:text-md lg:text-lg">
              {property.typeOfWashroom}
            </p>
          </div>
        )}

        {shouldDisplay(property.carParking) && (
          <div className="border flex justify-between rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
            <img src={Parking} className="h-6 w-6 mr-4 my-auto" />
            <p className="inline font-normal text-sm md:text-md lg:text-lg">
              {property.carParking ? "Yes" : "No"}
            </p>
          </div>
        )}

        {shouldDisplay(property.squareFeetArea) && (
          <div className="border flex justify-between rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
            <img src={SqFt} className="h-6 w-6 mr-4 my-auto" />
            <p className="inline font-normal text-sm md:text-md lg:text-lg">
              {property.squareFeetArea} sq ft
            </p>
          </div>
        )}
        
        {shouldDisplay(property.ownerLocation) && (
  <div className="border flex justify-between rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
    <img src={Bedrooms} className="h-6 w-6 mr-4 my-auto" />
    <p className="inline font-normal text-sm md:text-md lg:text-lg">
      {locationLabels[property.ownerLocation] || "Unknown location"}
    </p>
  </div>
)}

        {shouldDisplay(property.appliances) &&
          property.appliances.length > 0 && (
            <div className="border flex justify-between rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
              <img src={Appliances} className="h-6 w-6 mr-4 my-auto" />
              <p className="inline font-normal text-sm md:text-md lg:text-lg">
                Appliances - {property.appliances.join(", ")}
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Features;
