import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";
import { useSelector } from "react-redux";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";

import defaultUser from "../../../assets/propertyListing/user-icon.png";

import { FaHeart } from "react-icons/fa";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { FaLocationDot, FaRegCopy, FaRegImage, FaVideo } from "react-icons/fa6";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsGenderAmbiguous } from "react-icons/bs";
import { RiBuilding2Line } from "react-icons/ri";
import { IoAdd, IoBedOutline, IoLocationOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { PiGridFour } from "react-icons/pi";

import preferences from "../../../assets/propertyListing/preferences.png";
import bhk from "../../../assets/propertyListing/bhk.png";
import budget from "../../../assets/propertyListing/budget.png";

import { API } from "../../../config/axios";

export default function CompareProperty({
  favouriteList = [], 
  setFavouriteList
}) {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const [{ compareProperty }, dispatch] = useStateValue();
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  [favouriteList, setFavouriteList] = useState([]);

  const addToFavourites = async (propertyId) => {
    console.log(authState);

    try {
      if (!authState.status) {
        toast.error("Login First!");
        return navigate("/login", { replace: true });
      }

      console.log(authState.userData.id);

      const token = localStorage.getItem("token");

      const updateddata = await API.post(
        `user/addToFavourites`,
        {
          userId: authState.userData.id,
          propertyId: propertyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to favorites!");
      setFavouriteList([...favouriteList, propertyId]);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to favorites");
    }
  };

  const removeFromFavourites = async (propertyId) => {
    try {
      if (!authState.status) {
        toast.error("Login First!");
        return navigate("/login", { replace: true });
      }

      const token = localStorage.getItem("token");

      await API.post(
        "user/removeFromFavourites",
        {
          userId: authState.userData.id,
          propertyId: propertyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Removed from favorites!");
      setFavouriteList(favouriteList.filter((id) => id !== propertyId));
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove from favorites");
    }
  };

  useEffect(() => {
    const fetchFavouriteProperties = async () => {
      try {
        if (!authState?.userData?.id) {
          return;
        }

        const token = localStorage.getItem("token");

        const response = await API.post(
          "user/getFavourites",
          {
            userId: authState.userData.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const favouriteList = response.data.favouritesList.favourites;

        console.log(favouriteList);

        setFavouriteList(favouriteList);
      } catch (error) {
        console.log("Error fetching favourite properties:", error);
      }
    };
    fetchFavouriteProperties();
  }, []);


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
        <div className="w-full flex flex-nowrap justify-between items-center pt-10 px-2 sm:px-6">
          <h4
            className="text-xl sm:text-3xl lg:text-5xl font-bold flex-shrink w-auto "
            style={{
              color: "#C8A21C",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              margin: "1rem 0",
              lineHeight: "1.2",
            }}
          >
            Compare with similar properties
          </h4>
          <div className="text-sm sm:text-lg text-white font-bold ml-4">
            <button
              className="bg-teal-500 px-3 py-1 sm:px-6 sm:py-2 rounded-md whitespace-nowrap"
              onClick={() => {
                if (
                  authState.status === true &&
                  localStorage.getItem("token")
                ) {
                  navigate("/pricing");
                } else {
                  toast.error("Please Log In first");
                  navigate("/login");
                }
              }}
            >
              Proceed To Visit
            </button>
          </div>
        </div>

        {/* Property Cards */}
        <div className="w-full lg:max-w-8xl flex justify-center items-center justify-items-start ">
          {/* Flex container for small screens and grid for large screens */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-start sm:items-center gap-4 lg:gap-4 pt-10 px-2 sm:px-6 xl:px-20">
            {compareProperty.map((property, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-3 relative flex flex-col overflow-hidden w-full lg:w-[298.926px] h-[386.523px] box-border lg:ml-0"
                // style={{
                //   width: "298.926px", // Ensure consistent width
                //   height: "386.523px",
                //   boxSizing: "border-box",
                // }}
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
                    className="absolute top-3 left-3 text-white text-xs  uppercase px-3 pr-3 py-1  bg-teal-700 rounded"
                    style={{
                      
                      textTransform: "capitalize",
                    }}
                  >
                    {property.propertyType === "Residential"
                      ? "For Rent"
                      : "Available"}
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

                        {/* ADD TO FAVOURITES */}
                        <Popup
                          trigger={
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (favouriteList.includes(property._id)) {
                                  removeFromFavourites(property._id);
                                } else {
                                  addToFavourites(property._id);
                                }
                              }}
                            >
                              {favouriteList.includes(property._id) ? (
                                <FaHeart className="card_icon text-red-500" />
                              ) : (
                                <CiHeart className="card_icon text-red-500" />
                              )}
                            </a>
                          }
                          position="top center"
                          on="hover"
                          arrow={false}
                        >
                          <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm">
                            Favourite
                          </div>
                        </Popup>
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
                         src={property.ownerProfilePicture || defaultUser}
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
                        className="text-[#FFFFFF] text-xs font-medium hover:underline rounded py-1 px-3 bg-black"
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
                    className="bg-[#D9D9D9] rounded-md shadow-md flex w-full lg:w-[298.926px] h-[386.523px] flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-[#40B5A8] transition-colors"
                    //bg-white shadow-md rounded-lg p-3 relative flex flex-col overflow-hidden w-full lg:w-[298.926px] h-[386.523px] box-border lg:ml-0
                    // style={{
                    //   width: "298.926px",
                    //   height: "386.523px",
                    //   boxSizing: "border-box",
                    // }}
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
        <div className="w-full  sm:mx-10 lg:ml-10 px-3 md:px-14 sm:mb-10 space-y-0">
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
          <div className="bg-white pt-8 lg:mr-16 overflow-x-auto">
            <table className="min-w-full bg-white overflow-hidden space-y-2">
              {filteredProperties.map(({ key, label, icon }) => (
                <React.Fragment key={key}>
                  <tr className="lg:px-6 lg:py-4 bg-[#e5e5e5] flex">
                    <th className="lg:px-4 px-3 text-xl font-semibold text-left lg:w-[221px] w-[170px] h-[57px] flex items-center border-r border-black shrink-0">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[#40B5A8] xl:text-2xl md:text-base text-xs font-bold">
                          {label}
                        </span>
                        <div className="flex items-center ml-2 text-black">
                          {icon}
                        </div>
                      </div>
                    </th>
                    <div className="flex flex-1 ">
                      {compareProperty.map((property, index) => (
                        <td
                          key={index}
                          className=" px-3 lg:px-0 flex-1 flex justify-center items-center"
                        >
                          <div className="py-2 lg:px-6 text-[10.8px] lg:text-xl font-medium text-center text-black w-full">
                            {property[key]}
                          </div>
                        </td>
                      ))}
                    </div>
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