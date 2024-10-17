import React, { useEffect, useState } from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { FaLocationDot, FaRegCopy, FaRegImage, FaVideo } from "react-icons/fa6";
import Popup from "reactjs-popup";
import { IoAdd, IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { PiGridFour } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";

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

  // Check if a column has differences between properties
  const hasDifferences = (key) => {
    const firstValue = compareProperty[0][key];
    return compareProperty.some((property) => property[key] !== firstValue);
  };

  const filteredPropertyKeys = [
    { key: "locality", label: "Location" },
    { key: "spaceType", label: "Space type" },
    { key: "propertyType", label: "Property Type" },
    { key: "preference", label: "Preference" },
    { key: "bachelors", label: "If Bachelors" },
    { key: "type", label: "Type" },
    { key: "bhk", label: "BHK" },
    { key: "rent", label: "Budget" },
  ];

  const filteredProperties = (showOnlyDifferences
    ? filteredPropertyKeys.filter(({ key }) => hasDifferences(key))
    : filteredPropertyKeys);

  return (
    <>
      <div className="flex flex-col items-end p-6 space-y-8">
        <div
          className={`w-full max-w-8xl grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-5`}
        >
          <div className="relative">
            <h4 className="text-2xl font-semibold absolute top-8">Compare property with other properties</h4>
            <div className="flex items-stretch gap-4 absolute bottom-4">
              <input type="checkbox" checked={showOnlyDifferences} onChange={(e) => setShowOnlyDifferences(e.target.checked)} />
              <span>Show only differences</span>
            </div>
          </div>
          {compareProperty.map((property, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 relative"
            >
              <span
                className="w-5 h-5 text-sm bg-[#40B5A8] text-white rounded-full absolute top-0 right-0 text-center font-semibold cursor-pointer"
                onClick={() => handleRemoveProperty(property)} // Remove property on click
              >
                X
              </span>
              <figure className="card-banner relative overflow-hidden h-[200px]">
                <div>
                  <img
                    src={property.images[0]}
                    alt={property.propertyType}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="card-badge-left absolute top-3 left-3 text-white text-xs uppercase px-3 py-1"
                  style={{
                    backgroundColor: "#40B5A8",
                    textTransform: "capitalize",
                  }}
                >
                  {property.propertyType === "Residential"
                    ? "For Rent"
                    : "Available"}
                </div>
                <div className="banner-actions absolute bottom-1 left-4 right-4 flex gap-4 justify-between items-center">
                  <div>
                    <button className="banner-actions-btn flex items-center gap-1 text-white">
                      <FaLocationDot className="text-sm" />
                      <address className="text-xs">
                        {`${property.locality}, ${property.city || "Lucknow"}`}
                      </address>
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <button className="banner-img_video-btn flex items-center gap-2 text-white">
                      <FaVideo className="text-md" />
                    </button>
                    <button className="banner-img_video-btn flex text-md items-center gap-2 text-white">
                      <FaRegImage className="text-md" />
                      {property.images.length}
                    </button>
                  </div>
                </div>
              </figure>
              <div className="card-content md:py-4 md:px-2 p-6">
                <div className="name_icon flex justify-between items-center">
                  <h3 className="card-title text-lg sm:text-2xl font-semibold text-black">
                    <a href="#">{property.propertyType}</a>
                  </h3>
                  <div className="icon-box flex space-x-4 p-2">
                  <Popup
                    trigger={
                      <button>
                        <CiShare2
                          className="card_icon"
                          style={{ color: "#40B5A8" }}
                        />
                      </button>
                    }
                    position={"bottom center"}
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
                    <a href="#" onClick={() => { }}>
                      <IoAdd
                        className="card_icon"
                        style={{ color: "#000000", fontSize: "12px" }}
                      />
                    </a>
                    <a href="#">
                      <CiHeart className="card_icon text-red-500" />
                    </a>
                  </div>
                </div>

                <div className="card-details flex flex-col items-start">
                  <div className="card-price font-poppins text-sm sm:text-base font-normal text-grey-700 mt-1">
                    RS. {property.rent}
                  </div>
                  <div className="card-text font-poppins text-sm sm:text-lg font-medium text-black">
                    {property.type}, {property.floor}th floor
                  </div>
                </div>
                <ul className="card-list custom-card-list mt-4">
                  <li className="bed card-item flex items-center text-base">
                    <IoBedOutline style={{ fontSize: "1.6rem" }} /> &nbsp;
                    {property.bhk}
                  </li>
                  <li className="bath card-item flex items-center text-base">
                    <LuBath style={{ fontSize: "1.6rem" }} /> &nbsp;
                    {property.typeOfWashroom}
                  </li>
                  <li className="pi card-item flex items-center text-base">
                    <PiGridFour style={{ fontSize: "1.6rem" }} /> &nbsp;
                    {property.floor} ft²
                  </li>
                </ul>
                <div className="divider-container">
                  <hr
                    className="custom-hr"
                    style={{
                      border: "none",
                      borderTop: "2.8px solid #ccc",
                      width: "calc(100% + 0.001rem)",
                      marginTop: "1.4rem",
                      marginBottom: "-1rem",
                    }}
                  />
                </div>
              </div>
              <div className="card-footer md:p-2 p-6 flex justify-between items-center">
                <div className="card-author flex items-center gap-2">
                  <figure className="author-avatar w-8 h-8 sm:w-10 sm:h-10 overflow-hidden rounded-full">
                    <img
                      src={property.images[0]}
                      alt={property.firstName}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div>
                    <p className="author-name text-gray-900 text-xs sm:text-sm font-medium">
                      <a href="#">{property.firstName}</a>
                    </p>
                  </div>
                </div>
                <div className="card-footer-actions">
                  <button
                    onClick={() => navigate(`/property/${property.slug}`)}
                    className="card-footer-actions-btn md:text-xs text-base"
                  >
                    SHOW MORE
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* {compareProperty.length < 4 && (
            <div
              className="bg-gray-100 shadow-md rounded-lg p-4 flex items-center justify-center cursor-pointer"
              onClick={() => {
                navigate("/property-listing");
              }}
            >
              <IoAdd className="text-6xl text-gray-500" />
            </div>
          )} */}
          {(compareProperty.length < 4 && compareProperty.length > 2) &&
            Array(1)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 shadow-md rounded-lg p-4 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    navigate("/property-listing");
                  }}
                >
                  <IoAdd className="text-6xl text-gray-500" />
                </div>
              ))}
          {(compareProperty.length < 3 && compareProperty.length > 1) &&
            Array(2)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 shadow-md rounded-lg p-4 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    navigate("/property-listing");
                  }}
                >
                  <IoAdd className="text-6xl text-gray-500" />
                </div>
              ))}
          {(compareProperty.length < 2 && compareProperty.length > 0) &&
            Array(3)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 shadow-md rounded-lg p-4 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    navigate("/property-listing");
                  }}
                >
                  <IoAdd className="text-6xl text-gray-500" />
                </div>
              ))}
        </div>

        {/* Difference Table div with different Components  */}
        {/* <div className="bg-white w-full max-w-8xl mt-8 pt-4 overflow-x-auto">
          <table className="min-w-full bg-white overflow-hidden">
            <thead className="bg-gray-200 text-[#40B5A8] text-sm sm:text-md">
              <tr>
                <th className="py-2 px-6 text-left">Location</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm sm:text-md flex justify-evenly">
              {compareProperty.map((property, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-6 w-64 text-center">
                    {property.locality}, {property.city || "Lucknow"}
                  </td>
                </tr>
              ))}
            </tbody>
            <thead className="bg-gray-200 text-[#40B5A8] text-sm sm:text-md">
              <tr>
                <th className="py-2 px-6 text-left">Space type</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm sm:text-md flex justify-evenly">
              {compareProperty.map((property, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-6 text-center w-64">{property.spaceType}</td>
                </tr>
              ))}
            </tbody>
            <thead className="bg-gray-200 text-[#40B5A8] text-sm sm:text-md">
              <tr>
                <th className="py-2 px-6 text-left">Property Type</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm sm:text-md flex justify-evenly">
              {compareProperty.map((property, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-6 text-center w-64">
                    {property.propertyType}
                  </td>
                </tr>
              ))}
            </tbody>
            <thead className="bg-gray-200 text-[#40B5A8] text-sm sm:text-md">
              <tr>
                <th className="py-2 px-6 text-left">Preference</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm sm:text-md flex justify-evenly">
              {compareProperty.map((property, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-6 text-center w-64">
                    {property.preference}
                  </td>
                </tr>
              ))}
            </tbody>
            <thead className="bg-gray-200 text-[#40B5A8] text-sm sm:text-md">
              <tr>
                <th className="py-2 px-6 text-left">If Bachelors</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm sm:text-md flex justify-evenly">
              {compareProperty.map((property, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-6 text-center w-64">{property.bachelors}</td>
                </tr>
              ))}
            </tbody>
            <thead className="bg-gray-200 text-[#40B5A8] text-sm sm:text-md">
              <tr>
                <th className="py-2 px-6 text-left">Type</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm sm:text-md flex justify-evenly">
              {compareProperty.map((property, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-6 text-center w-64">{property.type}</td>
                </tr>
              ))}
            </tbody>
            <thead className="bg-gray-200 text-[#40B5A8] text-sm sm:text-md">
              <tr>
                <th className="py-2 px-6 text-left">BHK</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm sm:text-md flex justify-evenly">
              {compareProperty.map((property, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-6 text-center w-64">{property.bhk}</td>
                </tr>
              ))}
            </tbody>
            <thead className="bg-gray-200 text-[#40B5A8] text-sm sm:text-md">
              <tr>
                <th className="py-2 px-6 text-left">Budget</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm sm:text-md flex justify-evenly">
              {compareProperty.map((property, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-6 text-center w-64">{property.rent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

        {/* New */}
        <div className="bg-white w-full max-w-8xl mt-8 pt-4 overflow-x-auto">
          <table className="min-w-full bg-white overflow-hidden">
            {filteredProperties.map(({ key, label }) => (
              <React.Fragment key={key}>
                <thead className="bg-gray-200 text-[#40B5A8] text-sm">
                  <tr>
                    <th className="py-2 px-6 text-left">{label}</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm flex justify-evenly">
                  {compareProperty.map((property, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-2 px-6 text-center">
                        {property[key]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </React.Fragment>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}