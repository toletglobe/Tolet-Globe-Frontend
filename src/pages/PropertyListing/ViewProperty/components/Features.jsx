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


const shouldDisplay = (value) => {
  // Return true if value is not null/undefined/empty string/empty array
  if (Array.isArray(value)) return value.length > 0;
  return value !== null && value !== undefined && value !== "";
};


const Features = ({ selectComp, property }) => {
  return (
    <div
      className={`bg-white w-full rounded-lg p-3 pl-4 mb-4 ${
        selectComp > 1 ? "hidden" : ""
      }`}
    >
      <p className="text-black block font-semibold text-xl mb-2">Features</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 lg:flex lg:flex-wrap lg:gap-10">
        {shouldDisplay(property.bhk) && (
          <div className="border flex justify-between rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
            <img src={Bedrooms} className="h-6 w-6 mr-4 my-auto" />
            <p className="inline font-normal text-sm md:text-md lg:text-lg">
              {property.bhk} Bedrooms
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

        {shouldDisplay(property.typeOfWashroom) && (
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

        <div className="border flex justify-between rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
          <img src={SqFt} className="h-6 w-6 mr-4 my-auto" />
          <p className="inline font-normal text-sm md:text-md lg:text-lg">
            {property.squareFeetArea} sq ft
          </p>
        </div>
        <div className="border flex justify-between rounded-lg border-black p-2 w-full sm:w-fit items-center px-3 py-1">
          <img src={Appliances} className="h-6 w-6 mr-4 my-auto" />
          <p className="inline font-normal text-sm md:text-md lg:text-lg">
            Appliances - {property.appliances.join(", ") || "NA"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;