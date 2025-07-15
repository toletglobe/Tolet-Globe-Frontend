import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";
import { useSelector } from "react-redux";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";
import Slider from "react-slick";

import { FaHeart } from "react-icons/fa";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { FaLocationDot, FaRegCopy, FaRegImage, FaVideo } from "react-icons/fa6";
import { MdOutlineSpaceDashboard, MdOutlineMyLocation } from "react-icons/md";
import { BsGenderAmbiguous } from "react-icons/bs";
import { RiBuilding2Line } from "react-icons/ri";
import { IoAdd, IoBedOutline, IoLocationOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { PiGridFour } from "react-icons/pi";

import preferences from "../../../assets/propertyListing/preferences.png";
import bhk from "../../../assets/propertyListing/bhk.png";
import budget from "../../../assets/propertyListing/budget.png";
import defaultHouse from "../../../assets/propertyListing/defaultHouse.png";
import defaultUser from "../../../assets/propertyListing/user-icon.png";

import { API } from "../../../config/axios";

// Custom Arrow Components
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-1 transform -translate-y-1/2  bg-white/30 hover:bg-slate-200 text-black  rounded-full cursor-pointer z-10 flex items-end justify-center w-5 h-5 lg:w-9 lg:h-9"
    onClick={onClick}
  >
    <span className="text-2xl leading-none justify-center flex items-center lg:text-5xl">
      &#8249;
    </span>
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-1  transform -translate-y-1/2 bg-white/30  hover:bg-slate-200 text-black rounded-full cursor-pointer z-10 flex items-end justify-center w-5 h-5 lg:w-9 lg:h-9"
    onClick={onClick}
  >
    <span className="text-2xl leading-none justify-center flex items-center lg:text-5xl">
      &#8250;
    </span>
  </div>
);

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

  // Add this new function to handle broken images
  const handleImageError = (e) => {
    e.target.src = defaultHouse;
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    draggable: false,
  };

  return (
    <>
      <div className="flex flex-col xl:pt-6 xl:pb-24 lg:px-6 space-y-4">
        <div className="w-full flex flex-nowrap justify-between items-center pt-10 px-2 sm:px-6">
          <h4
            className="text-xl sm:text-3xl lg:text-5xl font-bold flex-shrink w-auto"
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
        <div className="w-full lg:max-w-8xl flex justify-center items-center justify-items-start">
          <div className="w-full flex flex-col lg:flex-row justify-between items-start sm:items-center gap-4 lg:gap-4 pt-10 px-2 sm:px-6 xl:px-20">
            {compareProperty.map((property, index) => (
              <div
                key={index}
                className="property-card rounded-[8px] overflow-hidden shadow-lg border border-gray-200 bg-white lg:p-4 p-2.5 w-full lg:w-[298.926px] h-[386.523px] flex flex-col relative"
              >
                <span
                  className="w-7 h-7 bg-[#FF0000] text-white absolute top-0 right-0 z-10 text-center flex items-center justify-center shadow-md text-[44px] pb-2 cursor-pointer"
                  onClick={() => handleRemoveProperty(property)}
                >
                  ×
                </span>

                <figure className="card-banner relative aspect-w-2 h-[180px] lg:h-[174px] overflow-hidden w-full">
                  {property.images?.length > 1 ? (
                    <Slider {...settings}>
                      {property.images.map((photo, index) => (
                        <div key={index}>
                          <img
                            src={photo}
                            alt={property.propertyType}
                            className="w-full h-[180px] lg:h-[174px] object-cover"
                            onError={handleImageError}
                          />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <div className="relative">
                      <img
                        src={property.images[0]}
                        alt={property.propertyType}
                        className="w-full h-[180px] lg:h-[174px] object-cover"
                        onError={handleImageError}
                      />
                      <PrevArrow onClick={() => {}} />
                      <NextArrow onClick={() => {}} />
                    </div>
                  )}
                  
                  <div
                    className="absolute top-3 left-3 text-white text-xs font-semibold uppercase px-3 pr-5 py-1 [clip-path:polygon(0_0,100%_0,100%_0%,90%_50%,100%_100%,100%_100%,0_100%)]"
                    style={{
                      backgroundColor:
                        property.availabilityStatus === "Rented Out"
                          ? "#FF4C4C"
                          : "#40B5A8",
                      textTransform: "capitalize",
                    }}
                  >
                    {property.availabilityStatus || "NA"}
                  </div>

                  <div className="banner-actions absolute bottom-1 left-2 right-4 flex justify-between">
                    <div className="item-center">
                      <button className="banner-actions-btn flex items-center text-white">
                        <MdOutlineMyLocation className="text-xs lg:text-sm drop-shadow-2xl shadow-black" />
                        <address className="text-[10px] lg:text-sm p-1 shadow-black text-shadow">
                          {`${property.area || property.locality}, ${property.city || "Lucknow"}`}
                        </address>
                      </button>
                    </div>
                    <div className="flex gap-1 text-sm">
                      <button className="banner-img_video-btn flex items-center gap-1 text-white drop-shadow shadow-black">
                        <FaVideo className="lg:text-sm text-xs" />
                      </button>
                      <button className="banner-img_video-btn flex items-center gap-1 text-white drop-shadow shadow-black">
                        <FaRegImage className="lg:text-sm text-xs" />
                        {property.images?.length}
                      </button>
                    </div>
                  </div>
                </figure>

                <div className="card-content lg:p-1 sm:p-1 flex-1 flex flex-col">
                  <div className="name_icon flex justify-between pt-2">
                    <h3 className="card-title lg:text-xl text-[14px] lg:font-semibold font-medium font-poppins">
                      <a href="#">
                        {property.bhk} BHK {property.propertyType} On Rent
                      </a>
                    </h3>

                    <div className="icon-box flex items-start space-x-1 md:space-x-2 p-1">
                      <Popup
                        arrow={false}
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
                                {`www.toletglobe.in/property/${property.slug}`}
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
                        arrow={true}
                      >
                        <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm">
                          Favourite
                        </div>
                      </Popup>
                    </div>
                  </div>

                  <div className="card-details flex flex-col items-center">
                    <div className="card-price font-poppins text-xs lg:text-base font-normal text-[#808080] -mt-1 lg:mt-0">
                      RS. {parseInt(property.rent, 10).toLocaleString("en-IN")}
                    </div>
                    <div className="card-text font-poppins py-3 lg:text-lg text-xs font-semibold text-[#505050]">
                      {property.type}, {property.floor}
                    </div>
                  </div>

                  <ul className="card-list custom-card-list pb-3 lg:py-2">
                    <li className="bed card-item flex items-center text-base">
                      <IoBedOutline className="text-lg lg:text-3xl" />
                      &nbsp;
                      <span className="text-sm">{property.bhk}</span>
                    </li>
                    <li className="bath card-item flex items-center text-base">
                      <LuBath className="text-lg lg:text-3xl" />
                      &nbsp;
                      <span className="text-sm">{property.typeOfWashroom}</span>
                    </li>
                    <li className="pi card-item flex items-center text-base">
                      <PiGridFour className="text-lg lg:text-3xl" />
                      &nbsp;
                      <span className="text-sm">{property.squareFeetArea} ft²</span>
                    </li>
                  </ul>
                </div>

                <div className="card-footer pt-3 lg:pt-3 flex justify-between border-t-2 mt-auto">
                  <div className="card-author flex items-center gap-1">
                    <figure className="author-avatar lg:w-8 lg:h-8 w-6 h-6 overflow-hidden rounded-full">
                      <img
                        src={property.ownerProfilePicture || defaultUser}
                        alt={property.ownerName || property.firstName}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </figure>
                    <div>
                      <p className="author-name text-[10px] lg:text-sm sm:font-light lg:font-medium">
                        <a href="#">
                          {property.firstName} {property.lastName}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="card-footer-actions">
                    <button
                      onClick={() => navigate(`/property/${property.slug}`)}
                      className="card-footer-actions-btn w-[95px] h-[24px] lg:w-[120px] lg:h-[28px] text-sm text-[#FFFFFF] font-medium hover:underline rounded py-1 px-3 bg-[#40B5A8]"
                    >
                      SHOW MORE
                    </button>
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
        <div className="w-full sm:mx-10 lg:ml-10 px-3 md:px-14 sm:mb-10 space-y-0">
          <div className="flex items-center gap-4 mt-4 py-5">
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
                    <div className="flex flex-1">
                      {compareProperty.map((property, index) => (
                        <td
                          key={index}
                          className="px-3 lg:px-0 flex-1 flex justify-center items-center"
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