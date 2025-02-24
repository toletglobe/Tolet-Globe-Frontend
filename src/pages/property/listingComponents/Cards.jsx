import React, { useEffect } from "react";
import Slider from "react-slick";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa6";
import { IoAdd, IoBedOutline, IoRemove } from "react-icons/io5";
import Popup from "reactjs-popup";
import { LuBath } from "react-icons/lu";
import { PiGridFour } from "react-icons/pi";
import { FaLocationDot, FaRegImage, FaVideo } from "react-icons/fa6";
import { useStateValue } from "../../../StateProvider";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import defaultHouse from "../../../assets/defaultHouse/defaultHouse.webp";
import { BASE_URL } from "../../../constant/constant";
import { FaHeart } from "react-icons/fa";
// import { useEffect } from "react";

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

// Component Card
const Cards = ({ properties, favouriteList, setFavouriteList }) => {
  const [{ compareProperty }, dispatch] = useStateValue();

  const addToCompare = (property) => {
    if (compareProperty.length < 4 && !isInCompareList(property)) {
      dispatch({
        type: "ADD_TO_COMPARE",
        item: property,
      });
    }
  };

  const removeFromCompare = (property) => {
    dispatch({
      type: "REMOVE_FROM_COMPARE",
      item: property,
    });
  };

  const isInCompareList = (property) => {
    return compareProperty.some((item) => item._id === property._id);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    draggable: false,
  };

  const normalizedProperties = Array.isArray(properties)
    ? properties
    : [properties]; // Ensure properties is an array

  let norm = normalizedProperties[0].properties || normalizedProperties;

  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const addToFavourites = async (propertyId) => {
    console.log(authState);

    try {
      if (!authState.status) {
        toast.error("Login First!");
        return navigate("/login", { replace: true });
      }

      console.log(authState.userData.id);

      const token = localStorage.getItem("token");

      const updateddata = await axios.post(
        `${BASE_URL}user/addToFavourites`,
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

      await axios.post(
        `${BASE_URL}user/removeFromFavourites`,
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

  // Add this new function to handle broken images
  const handleImageError = (e) => {
    e.target.src = defaultHouse; // Replace with your fallback image path
  };

  return (
    <div>
      <ul className="property-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12 p-4">
        {norm.map((property) => (
          <li
            key={property._id}
            className="property-card rounded-[8px] overflow-hidden shadow-lg border border-gray-200 bg-white lg:p-4 p-2.5 "
          >
            <figure className="card-banner relative aspect-w-2 aspect-h-1.5 overflow-hidden w-full lg:h-[350px] h-[180px] sm:h-[200px]">
              {property.images?.length > 1 ? (
                <Slider {...settings}>
                  {property.images.map((photo, index) => (
                    <div key={index}>
                      <img
                        src={photo}
                        alt={property.propertyType}
                        className="w-full h-[180px] object-cover lg:h-[350px] sm:h-[180px]"
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
                    className="w-full h-[180px] sm:h-[200px] md:h-[400px] lg:h-full object-cover"
                    onError={handleImageError}
                  />
                  <PrevArrow onClick={() => {}} />
                  <NextArrow onClick={() => {}} />
                </div>
              )}
              <div
                className="card-badge-left absolute top-2 left-2 text-white/75 lg:text-white text-xs lg:text-base uppercase px-1 lg:px-3 py-1"
                style={{
                  backgroundColor:
                    property.availabilityStatus === "Available"
                      ? "#236b62" // Green for available
                      : property.availabilityStatus === "Rented Out"
                      ? "#c71221" // Red for rented
                      : "#999999", // Gray for not available (NA)
                  textTransform: "capitalize",
                }}
              >
                {property.availabilityStatus === "Available"
                  ? "Available"
                  : property.availabilityStatus === "Rented Out"
                  ? "Rent Out"
                  : "NA"}
              </div>
              <div className="banner-actions absolute bottom-0.5 left-2 right-4 flex  justify-between">
                <div className="item-center">
                  <button className="banner-actions-btn flex items-center text-white">
                    <FaLocationDot className="text-xs lg:text-base drop-shadow-2xl shadow-black" />
                    <address className="text-xs lg:text-base p-0  shadow-black text-shadow">
                      {`${property.locality}, ${property.city}`}
                    </address>
                  </button>
                </div>
                <div className="flex gap-4 text-sm">
                  <button className="banner-img_video-btn flex items-center gap-2 text-white drop-shadow shadow-black">
                    <FaVideo className="lg:text-xl text-xs " />
                  </button>
                  <button className="banner-img_video-btn flex items-center gap-2 text-white drop-shadow shadow-black">
                    <FaRegImage className="lg:text-xl text-xs " />
                    {property.images?.length}
                  </button>
                </div>
              </div>
            </figure>
            <div className="card-content lg:p-1 sm:p-1">
              <div className="name_icon flex justify-between pt-2 ">
                <h3 className="card-title lg:text-[24px] text-[14px] lg:font-semibold font-medium font-poppins ">
                  <a href="#">
                    {property.bhk} BHK, {property.propertyType}, On Rent
                  </a>
                </h3>

                <div className="icon-box flex items-start space-x-1 md:space-x-4 p-1 ">
                  <Popup
                    arrow={false}
                    trigger={
                      <button>
                        <CiShare2
                          className="card_icon  "
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

                  {/* SHORTLIST FOR VISIT */}
                  <Popup
                    trigger={
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (isInCompareList(property)) {
                            removeFromCompare(property);
                          } else {
                            addToCompare(property);
                          }
                        }}
                        key={property._id}
                      >
                        {isInCompareList(property) ? (
                          <IoRemove
                            className="card_icon"
                            style={{ color: "#ff0000", fontSize: "12px" }}
                          />
                        ) : (
                          <IoAdd
                            className="card_icon"
                            style={{ color: "#000000", fontSize: "12px" }}
                          />
                        )}
                      </a>
                    }
                    position="top center"
                    on="hover"
                    arrow={true}
                  >
                    <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm">
                      Shortlist for Visit
                    </div>
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
                    arrow={true}
                  >
                    <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm">
                      Favourite
                    </div>
                  </Popup>
                </div>
              </div>

              <div className="card-details flex flex-col items-start">
                <div className="card-price font-poppins text-xs font-normal text-[#808080] -mt-2 lg:mt-1">
                  RS. {parseInt(property.rent, 10).toLocaleString("en-IN")}
                </div>
                <div className="card-text font-poppins lg:text-[24px] text-xs py-3 font-normal text-[#505050]">
                  {property.type}, {property.floor}
                </div>
              </div>
              <ul className="card-list custom-card-list py-2 lg:py-2 ">
                <li className="bed card-item flex items-center text-base">
                  <IoBedOutline className="text-lg lg:text-3xl" />
                  &nbsp;
                  {property.bhk}
                </li>
                <li className="bath card-item flex items-center text-base">
                  <LuBath className="text-lg lg:text-3xl" />
                  &nbsp;
                  {property.typeOfWashroom}
                </li>
                <li className="pi card-item flex items-center text-base">
                  <PiGridFour className="text-lg lg:text-3xl" />
                  &nbsp;
                  {property.squareFeetArea} ft²
                </li>
              </ul>
            </div>
            <div className="card-footer lg:py-8 pt-6 flex justify-between ">
              <div className="card-author flex items-center gap-1">
                <figure className="author-avatar lg:w-8 lg:h-8 w-6 h-6 overflow-hidden rounded-full">
                  <img
                    src={property.images[0]}
                    alt={property.ownerName}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </figure>
                <div>
                  <p className="author-name text-[10px] lg:text-lg sm:font-light lg:font-medium">
                    <a href="#">
                      {property.firstName} {property.lastName}
                    </a>
                  </p>
                </div>
              </div>
              <div className="card-footer-actions">
                <button
                  onClick={() => navigate(`/property/${property.slug}`)}
                  className="card-footer-actions-btn w-[95px] h-[24px] lg:w-[150px] lg:h-[36px]"
                >
                  SHOW MORE
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cards;
