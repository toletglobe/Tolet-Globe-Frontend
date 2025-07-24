// import React, { useEffect, useState } from "react";
// import { CiHeart, CiShare2 } from "react-icons/ci";
// import { FaLocationDot, FaRegCopy, FaRegImage, FaVideo } from "react-icons/fa6";
// import Popup from "reactjs-popup";
// import { MdOutlineSpaceDashboard, MdRoomPreferences } from "react-icons/md";
// import { BsGenderAmbiguous } from "react-icons/bs";
// import { RiBuilding2Line } from "react-icons/ri";
// import { IoAdd, IoBedOutline, IoLocationOutline } from "react-icons/io5";
// import { LuBath } from "react-icons/lu";
// import { PiGridFour, PiBuildingLight } from "react-icons/pi";
// import { useNavigate } from "react-router-dom";
// import { useStateValue } from "../../../StateProvider";
// import preferences from "../../../assets/property/preferences.png";
// import bhk from "../../../assets/property/bhk.png";
// import budget from "../../../assets/property/budget.png";

// export default function CompareProperty() {
//   const navigate = useNavigate();
//   const [{ compareProperty }, dispatch] = useStateValue();
//   const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);

//   useEffect(() => {
//     if (!compareProperty.length) {
//       navigate("/property-listing");
//     }
//   }, [compareProperty, navigate]);

//   const handleRemoveProperty = (property) => {
//     dispatch({
//       type: "REMOVE_FROM_COMPARE",
//       item: property,
//     });
//   };

//   const hasDifferences = (key) => {
//     const firstValue = compareProperty[0][key];
//     return compareProperty.some((property) => property[key] !== firstValue);
//   };

//   const filteredPropertyKeys = [
//     { key: "locality", label: "Location", icon: <IoLocationOutline /> },
//     {
//       key: "spaceType",
//       label: "Space type",
//       icon: <MdOutlineSpaceDashboard />,
//     },
//     {
//       key: "propertyType",
//       label: "Property Type",
//       icon: <RiBuilding2Line className="text-xl text-black" />,
//     },
//     {
//       key: "preference",
//       label: "Preference",
//       icon: <img src={preferences} alt="preferences" width={25} height={25} />,
//     },
//     { key: "bachelors", label: "If Bachelors", icon: <BsGenderAmbiguous /> },
//     { key: "type", label: "Type", icon: <RiBuilding2Line /> },
//     {
//       key: "bhk",
//       label: "BHK",
//       icon: <img src={bhk} alt="preferences" width={25} height={25} />,
//     },
//     {
//       key: "rent",
//       label: "Budget",
//       icon: <img src={budget} alt="preferences" width={25} height={25} />,
//     },
//   ];

//   const filteredProperties = showOnlyDifferences
//     ? filteredPropertyKeys.filter(({ key }) => hasDifferences(key))
//     : filteredPropertyKeys;

//   return (
//     <>
//       <div className="flex flex-col  xl:pt-6 xl:pb-24  px-6 space-y-4">
//         <div className="w-full flex justify-start mb-6  relative ">
//           <h4
//             className="text-3xl md:text-4xl lg:text-5xl pl-7 pt-10 font-bold"
//             style={{
//               color: "#C8A21C",
//               textShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               margin: "1rem 0",
//               lineHeight: "1.2",
//             }}
//           >
//             Compare with similar properties
//           </h4>
//         </div>
//         {/* Property Cards */}
//         <div className="w-full max-w-8xl grid gap-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 overflow-x-auto pl-20 pr-20 ">
//           {compareProperty.map((property, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-md rounded-lg p-3 relative flex flex-col overflow-hidden"
//               style={{
//                 width: "298.926px",
//                 height: "386.523px",
//                 boxSizing: "border-box",
//               }}
//             >
//               <span
//                 className="w-7 h-7 bg-[#FF0000] text-white absolute top-0 right-0 z-10 text-center flex items-center justify-center shadow-md text-[44px] pb-2 cursor-pointer"
//                 onClick={() => handleRemoveProperty(property)}
//               >
//                 ×
//               </span>

//               <figure
//                 className="card-banner relative overflow-hidden flex-shrink-0"
//                 style={{ height: "174.64px" }}
//               >
//                 <div>
//                   <img
//                     src={property.images[0]}
//                     alt={property.propertyType}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div
//                   className="absolute top-3 left-3 text-white text-xs font-semibold uppercase px-3 pr-5 py-1 bg-[#40B5A8] [clip-path:polygon(0_0,100%_0,100%_0%,90%_50%,100%_100%,100%_100%,0_100%)]"
//                   style={{
//                     backgroundColor: "#40B5A8",
//                     textTransform: "capitalize",
//                   }}
//                 >
//                   {property.propertyType === "Residential"
//                     ? "For Rent"
//                     : "Available"}
//                 </div>
//                 <div className="banner-actions absolute bottom-1 left-3 right-3 flex gap-4 justify-between items-center">
//                   <div>
//                     <button className="banner-actions-btn flex items-center gap-1 text-white">
//                       <FaLocationDot className="text-sm" />
//                       <address className="text-xs">
//                         {`${property.locality}, ${property.city || "Lucknow"}`}
//                       </address>
//                     </button>
//                   </div>
//                   <div className="flex gap-2">
//                     <button className="banner-img_video-btn flex items-center gap-2 text-white">
//                       <FaVideo className="text-sm" />
//                     </button>
//                     <button className="banner-img_video-btn flex text-md items-center gap-2 text-white">
//                       <FaRegImage className="text-sm" />
//                       {property.images.length}
//                     </button>
//                   </div>
//                 </div>
//               </figure>
//               <div className="flex-1 flex flex-col justify-between pt-1 min-h-0">
//                 <div className="card-content md:px-0 px-2 space-y-0">
//                   <div className="name_icon flex justify-between items-center gap-2">
//                     <h3 className="card-title text-base sm:text-lg font-semibold text-black line-clamp-2">
//                       <a href="#">
//                         {property.bhk} BHK, {property.propertyType}
//                       </a>
//                     </h3>
//                     <div className="icon-box flex space-x-2 py-0">
//                       <Popup
//                         trigger={
//                           <button>
//                             <CiShare2
//                               className="card_icon"
//                               style={{ color: "#40B5A8" }}
//                             />
//                           </button>
//                         }
//                         position={"bottom center"}
//                       >
//                         {(close) => (
//                           <div className="bg-slate-50 text-black rounded-full flex flex-col shadow-xl py-2 px-2 scale-90">
//                             <div className="flex items-center gap-12 border border-black rounded-3xl px-2">
//                               <div className="px-2 py-2 text-sm truncate w-32">
//                                 {`toletglobe.in/property/${property.slug}`}
//                               </div>
//                               <div>
//                                 <button
//                                   className="px-2 py-2 bg-[#40B5A8] text-white rounded-full"
//                                   onClick={() => {
//                                     navigator.clipboard.writeText(
//                                       `www.toletglobe.in/property/${property.slug}`
//                                     );
//                                     close();
//                                   }}
//                                 >
//                                   <FaRegCopy />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </Popup>
//                       <a href="#">
//                         <CiHeart className="card_icon text-red-500" />
//                       </a>
//                     </div>
//                   </div>

//                   <div className="card-details flex flex-col items-start mt-0 ">
//                     <div className="card-price font-poppins text-sm font-normal text-grey-700 leading-none mb-0 ">
//                       RS. {parseInt(property.rent, 10).toLocaleString("en-IN")}
//                     </div>
//                     <div className="card-text font-poppins text-sm font-medium text-black">
//                       {property.type}, {property.floor}
//                     </div>
//                   </div>

//                   <ul className="card-list custom-card-list mt-0 flex align-left space-x-2">
//                     <li className="bed card-item items-center">
//                       <IoBedOutline style={{ fontSize: "1rem" }} /> &nbsp;
//                       <span className="text-xs">{property.bhk}</span>
//                     </li>
//                     <li className="bath card-item items-center">
//                       <LuBath style={{ fontSize: "1rem" }} /> &nbsp;
//                       <span className="text-xs">{property.typeOfWashroom}</span>
//                     </li>
//                     <li className="pi card-item items-center">
//                       <PiGridFour style={{ fontSize: "1rem" }} /> &nbsp;
//                       <span className="text-xs">
//                         {property.squareFeetArea} ft²
//                       </span>
//                     </li>
//                   </ul>
//                 </div>

//                 <div className="card-footer py-1  flex justify-between items-center border-t-2 border-[#7C7C7C80]">
//                   <div className="card-author flex items-center gap-2">
//                     <figure className="author-avatar w-6 h-6 overflow-hidden rounded-full">
//                       <img
//                         src={property.images[0]}
//                         alt={property.firstName}
//                         className="w-full h-full object-cover"
//                       />
//                     </figure>
//                     <div>
//                       <p className="author-name text-gray-900 text-xs font-medium">
//                         <a href="#">{property.firstName}</a>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="card-footer-actions">
//                     <button
//                       onClick={() => navigate(`/property/${property.slug}`)}
//                       className="text-[#FFFFFF] text-xs font-medium hover:underline rounded py-1 px-3 bg-[#40B5A8]"
//                     >
//                       SHOW MORE
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {compareProperty.length < 4 &&
//             Array(4 - compareProperty.length)
//               .fill(null)
//               .map((_, index) => (
//                 <div
//                   key={index}
//                   className="bg-[#D9D9D9] shadow-md flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-[#40B5A8] transition-colors"
//                   style={{
//                     width: "298.926px",
//                     height: "386.523px",
//                     boxSizing: "border-box",
//                   }}
//                   onClick={() => navigate("/property-listing")}
//                 >
//                   <div className="w-50 h-50 border flex items-center justify-center rounded-lg p-0 bg-white">
//                     <IoAdd className="text-[#7C7C7C80] text-[100px]" />
//                   </div>
//                   <span className="text-[#000000] font-medium mt-2 text-[23px]">
//                     Add Property
//                   </span>
//                 </div>
//               ))}
//         </div>

//         <div className="w-full ml-10">
//           <div className="flex  items-center gap-4 mt-4 py-5 ">
//             <input
//               type="checkbox"
//               checked={showOnlyDifferences}
//               onChange={(e) => setShowOnlyDifferences(e.target.checked)}
//               className="appearance-none h-5 w-5 border-2 border-white bg-black cursor-pointer relative checked:after:content-['✓'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center"
//             />
//             <span className="text-white text-lg font-medium">
//               Show only differences
//             </span>
//           </div>

//           {/* Comparison Table */}
//           <div className="bg-white pt-8">
//             <table className="min-w-full bg-white overflow-hidden space-y-2">
//               {filteredProperties.map(({ key, label, icon }) => (
//                 <React.Fragment key={key}>
//                   <tr className="px-6 py-4 bg-gray-200 flex">
//                     <th className="px-4 text-xl font-semibold text-left w-[221px] h-[57px] flex items-center border-r border-black">
//                       <div className="flex items-center justify-between w-full">
//                         <span className="text-[#40B5A8] xl:text-2xl md:text-base text-sm">
//                           {label}
//                         </span>
//                         <div className="flex items-center ml-2 text-black">
//                           {icon}
//                         </div>
//                       </div>
//                     </th>
//                     {compareProperty.map((property, index) => (
//                       <td
//                         key={index}
//                         className="border-b border-gray-200 w-1/5"
//                       >
//                         <div className="py-2 px-6 text-xl font-medium items-center text-center text-black">
//                           {property[key]}
//                         </div>
//                       </td>
//                     ))}
//                   </tr>
//                   <tbody className="py-[13px] text-gray-700 text-sm flex justify-evenly"></tbody>
//                 </React.Fragment>
//               ))}
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { FaLocationDot, FaRegCopy, FaRegImage, FaVideo } from "react-icons/fa6";
import Popup from "reactjs-popup";
import { MdOutlineSpaceDashboard, MdRoomPreferences } from "react-icons/md";
import { BsGenderAmbiguous } from "react-icons/bs";
import { RiBuilding2Line } from "react-icons/ri";
import { IoAdd, IoBedOutline, IoLocationOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { PiGridFour, PiBuildingLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";
import preferences from "../../../assets/property/preferences.png";
import bhk from "../../../assets/property/bhk.png";
import budget from "../../../assets/property/budget.png";

export default function CompareProperty() {
  const navigate = useNavigate();
  const [{ compareProperty }, dispatch] = useStateValue();
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);

  useEffect(() => {
    if (!compareProperty.length) {
      navigate("/property-listing");
    }
  }, [compareProperty, navigate]);

  const handleRemoveProperty = (property) => {
    dispatch({
      type: "REMOVE_FROM_COMPARE",
      item: property,
    });
  };

  const hasDifferences = (key) => {
    const firstValue = compareProperty[0][key];
    return compareProperty.some((property) => property[key] !== firstValue);
  };

  const filteredPropertyKeys = [
    { key: "locality", label: "Location", icon: <IoLocationOutline /> },
    {
      key: "spaceType",
      label: "Space type",
      icon: <MdOutlineSpaceDashboard />,
    },
    {
      key: "propertyType",
      label: "Property Type",
      icon: <RiBuilding2Line className="text-xl text-black" />,
    },
    {
      key: "preference",
      label: "Preference",
      icon: <img src={preferences} alt="preferences" width={25} height={25} />,
    },
    { key: "bachelors", label: "If Bachelors", icon: <BsGenderAmbiguous /> },
    { key: "type", label: "Type", icon: <RiBuilding2Line /> },
    {
      key: "bhk",
      label: "BHK",
      icon: <img src={bhk} alt="preferences" width={25} height={25} />,
    },
    {
      key: "rent",
      label: "Budget",
      icon: <img src={budget} alt="preferences" width={25} height={25} />,
    },
  ];

  const filteredProperties = showOnlyDifferences
    ? filteredPropertyKeys.filter(({ key }) => hasDifferences(key))
    : filteredPropertyKeys;

  return (
    <>
      <div className="flex flex-col  xl:pt-6 xl:pb-24  lg:px-6 space-y-4">
        <div className="w-full flex justify-between relative pt-10">
          <h4
            className="text-3xl md:text-4xl lg:text-5xl pl-7 font-bold"
            style={{
              color: "#C8A21C",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              margin: "1rem 0",
              lineHeight: "1.2",
            }}
          >
            Compare with similar properties
          </h4>
          <div className="text-2xl text-white flex items-center font-bold mr-10">
            <button className="bg-teal-500 px-6 py-2 rounded-md">Proceed To Visit</button>
          </div>
        </div>
        {/* Property Cards */}
        <div className="w-full lg:max-w-8xl  lg:px-20 flex justify-center items-center justify-items-start ">
          {/* Flex container for small screens and grid for large screens */}
          <div className="flex flex-row gap-8 flex-wrap justify-center">
            {compareProperty.map((property, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-3 relative flex flex-col overflow-hidden ml-4 lg:ml-0"
                style={{
                  width: "298.926px", // Ensure consistent width
                  height: "386.523px",
                  boxSizing: "border-box",
                }}
              >
                <span
                  className="w-7 h-7 bg-[#FF0000] text-white absolute top-0 right-0 z-10 text-center flex items-center justify-center shadow-md text-[44px] pb-2 cursor-pointer"
                  onClick={() => handleRemoveProperty(property)}
                >
                  ×
                </span>

                <figure
                  className="card-banner relative overflow-hidden flex-shrink-0"
                  style={{ height: "174.64px" }}
                >
                  <div>
                    <img
                      src={property.images[0]}
                      alt={property.propertyType}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
  className="absolute top-3 left-3 text-white text-xs font-semibold uppercase px-3 pr-5 py-1 [clip-path:polygon(0_0,100%_0,100%_0%,90%_50%,100%_100%,100%_100%,0_100%)]"
  style={{
    backgroundColor:
      property.availabilityStatus === "Rented Out"
        ? "#FF4C4C" // Red for unavailable
        : "#40B5A8", // Green for available
    textTransform: "capitalize",
  }}
>
  {property.availabilityStatus || "NA"}
</div>

                  <div className="banner-actions absolute bottom-1 left-3 right-3 flex gap-4 justify-between items-center">
                    <div>
                      <button className="banner-actions-btn flex items-center gap-1 text-white">
                        <FaLocationDot className="text-sm" />
                        <address className="text-xs">
                          {`${property.locality}, ${
                            property.city || "Lucknow"
                          }`}
                        </address>
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button className="banner-img_video-btn flex items-center gap-2 text-white">
                        <FaVideo className="text-sm" />
                      </button>
                      <button className="banner-img_video-btn flex text-md items-center gap-2 text-white">
                        <FaRegImage className="text-sm" />
                        {property.images.length}
                      </button>
                    </div>
                  </div>
                </figure>
                <div className="flex-1 flex flex-col lg:justify-between pt-1 min-h-0">
                  <div className="card-content md:px-0 px-2 space-y-0">
                    <div className="name_icon flex justify-between items-center gap-2 pb-2 lg-pb-0">
                      <h3 className="card-title text-base sm:text-lg font-semibold text-black line-clamp-2">
                        <a href="#">
                          {property.bhk} BHK, {property.propertyType}
                        </a>
                      </h3>
                      <div className="icon-box flex space-x-2 py-0">
                        <Popup
                          trigger={
                            <button>
                              <CiShare2
                                className="card_icon"
                                style={{ color: "#40B5A8" }}
                              />
                            </button>
                          }
                          position={"bottom right"}
                        >
                          {(close) => (
                            <div className="bg-slate-50 text-black rounded-full flex flex-col shadow-xl py-2 px-2 scale-90">
                              <div className="flex items-center gap-12 border border-black rounded-3xl px-2">
                                <div className="px-2 py-2 text-sm truncate w-32">
                                  {`toletglobe.in/property/${property.slug}`}
                                </div>
                                <div>
                                  <button
                                    className="px-2 py-2 bg-[#40B5A8] text-white rounded-full"
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        `www.toletglobe.in/property/${property.slug}`
                                      );
                                      close();
                                    }}
                                  >
                                    <FaRegCopy />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Popup>
                        <a href="#">
                          <CiHeart className="card_icon text-red-500" />
                        </a>
                      </div>
                    </div>

                    <div className="card-details flex flex-col items-start mt-0 gap-4 lg:gap-0">
                      <div className="card-price font-poppins lg:text-sm text-xs -mt-2 lg:mt-0 font-normal text-grey-700 leading-none mb-0 ">
                        RS.{" "}
                        {parseInt(property.rent, 10).toLocaleString("en-IN")}
                      </div>
                      <div className="card-text font-poppins text-sm font-medium text-black">
                        {property.type}, {property.floor}
                      </div>
                    </div>

                    <ul className="card-list custom-card-list mt-0 flex align-left space-x-2 py-5 lg:py-0">
                      <li className="bed card-item items-center">
                        <IoBedOutline style={{ fontSize: "1rem" }} /> &nbsp;
                        <span className="text-xs">{property.bhk}</span>
                      </li>
                      <li className="bath card-item items-center">
                        <LuBath style={{ fontSize: "1rem" }} /> &nbsp;
                        <span className="text-xs">
                          {property.typeOfWashroom}
                        </span>
                      </li>
                      <li className="pi card-item items-center">
                        <PiGridFour style={{ fontSize: "1rem" }} /> &nbsp;
                        <span className="text-xs">
                          {property.squareFeetArea} ft²
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="card-footer py-1 lg:pt-2  pt-4  flex justify-between items-center border-t-2 border-[#7C7C7C80]">
                    <div className="card-author flex items-center gap-2">
                      <figure className="author-avatar w-6 h-6 overflow-hidden rounded-full">
                        <img
                          src={property.images[0]}
                          alt={property.firstName}
                          className="w-full h-full object-cover"
                        />
                      </figure>
                      <div>
                        <p className="author-name text-gray-900 text-xs font-medium">
                          <a href="#">{property.firstName}</a>
                        </p>
                      </div>
                    </div>
                    <div className="card-footer-actions">
                      <button
                        onClick={() => navigate(`/property/${property.slug}`)}
                        className="text-[#FFFFFF] text-xs font-medium hover:underline rounded py-1 px-3 bg-[#40B5A8]"
                      >
                        SHOW MORE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {compareProperty.length < 4 &&
              Array(4 - compareProperty.length)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-[#D9D9D9] shadow-md flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-[#40B5A8] transition-colors"
                    style={{
                      width: "298.926px",
                      height: "386.523px",
                      boxSizing: "border-box",
                    }}
                    onClick={() => navigate("/property-listing")}
                  >
                    <div className="w-50 h-50 border flex items-center justify-center rounded-lg p-0 bg-white">
                      <IoAdd className="text-[#7C7C7C80] text-[100px]" />
                    </div>
                    <span className="text-[#000000] font-medium mt-2 text-[23px]">
                      Add Property
                    </span>
                  </div>
                ))}
          </div>
        </div>

          {/* comparison table container */}
        <div className="w-full  sm:mx-10 lg:ml-10 px-3 md:px-14 lg:px-0 sm:mb-10 space-y-0">
          <div className="flex  items-center gap-4 mt-4 py-5 ">
            <input
              type="checkbox"
              checked={showOnlyDifferences}
              onChange={(e) => setShowOnlyDifferences(e.target.checked)}
              className="appearance-none h-5 w-5 border-2 border-white bg-black cursor-pointer relative checked:after:content-['✓'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center"
            />
            <span className="text-white text-lg font-medium">
              Show only differences
            </span>
          </div>

          {/* Comparison Table */}
          <div className="bg-white pt-8 lg:mr-16 overflow-scroll w-full">
            <table className="min-w-full w-full bg-white overflow-hidden space-y-2">
              {filteredProperties.map(({ key, label, icon }) => (
                <React.Fragment key={key}>
                  <tr className="lg:px-6 lg:py-4 bg-gray-200 flex">
                    <th className="lg:px-4 px-3 text-xl font-semibold text-left lg:w-[221px] w-[170px] h-[57px] flex items-center border-r border-black">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[#40B5A8] xl:text-2xl md:text-base text-xs font-bold">
                          {label}
                        </span>
                        <div className="flex items-center ml-2 text-black">
                          {icon}
                        </div>
                      </div>
                    </th>
                    {compareProperty.map((property, index) => (
                      <td
                        key={index}
                        className="border-b border-gray-200 px-3 lg:px-0 flex justify-center items-center sm:w-1/5"
                      >
                        <div className="py-2 lg:px-6 text-[10.8px] lg:text-xl font-medium items-center text-center text-black">
                          {property[key]}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tbody className="py-[13px] text-gray-700 text-sm flex justify-evenly"></tbody>
                </React.Fragment>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
