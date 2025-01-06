import React from "react";
import Slider from "react-slick";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa6";
import { IoAdd, IoBedOutline, IoRemove } from "react-icons/io5";
import Popup from "reactjs-popup";
import { LuBath } from "react-icons/lu";
import { PiGridFour } from "react-icons/pi";
import { FaLocationDot, FaRegImage, FaVideo } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";

// Custom Arrow Components
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white opacity-50 hover:bg-slate-200 text-black p-2 rounded-full cursor-pointer z-10 flex items-center justify-center"
    onClick={onClick}
    style={{ width: "40px", height: "40px" }}
  >
    <span className="text-2xl">&#8249;</span>
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white opacity-50 hover:bg-slate-200 text-black p-2 rounded-full cursor-pointer z-10 flex items-center justify-center"
    onClick={onClick}
    style={{ width: "40px", height: "40px" }}
  >
    <span className="text-2xl">&#8250;</span>
  </div>
);

const Cards = ({ properties, propertyAction }) => {
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

  const navigate = useNavigate();
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

  return (
    <div>
      <ul className="property-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {norm.map((property) => (
          <li
            key={property._id}
            className="property-card bg-white border border-grey-200 shadow-lg relative p-2 md:p-4"
          >
            <figure className="card-banner relative aspect-w-2 aspect-h-1.5 overflow-hidden">
              {property.images?.length > 1 ? (
                <Slider {...settings}>
                  {property.images.map((photo, index) => (
                    <div key={index}>
                      <img
                        src={photo}
                        alt={property.propertyType}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="relative">
                  <img
                    src={property.images[0]}
                    alt={property.propertyType}
                    className="w-full h-full object-cover"
                  />
                  <PrevArrow onClick={() => {}} />
                  <NextArrow onClick={() => {}} />
                </div>
              )}
              <div
                className="card-badge-left absolute top-6 left-6 text-white text-xs uppercase px-3 py-1"
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
              <div className="banner-actions absolute bottom-10 left-4 right-4 flex gap-4 justify-between">
                <div>
                  <button className="banner-actions-btn flex items-center gap-1 text-white">
                    <FaLocationDot className="text-base" />
                    <address>{`${property.locality}, ${property.city}`}</address>
                  </button>
                </div>
                <div className="flex gap-4">
                  <button className="banner-img_video-btn flex items-center gap-2 text-white">
                    <FaVideo className="text-base" />
                  </button>
                  <button className="banner-img_video-btn flex items-center gap-2 text-white">
                    <FaRegImage className="text-base" />
                    {property.images?.length}
                  </button>
                </div>
              </div>
            </figure>
            <div className="card-content p-6">
              <div className="name_icon flex justify-between items-center">
                <h3 className="card-title text-[20px] font-semibold">
                  <a href="#">
                    {property.bhk} BHK, {property.propertyType}, On Rent
                  </a>
                </h3>
                <div className="icon-box flex space-x-2 md:space-x-4 p-2">
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
                  <a href="#">
                    <CiHeart className="card_icon text-red-500" />
                  </a>
                </div>
              </div>

              <div className="card-details flex flex-col items-start">
                <div className="card-price font-poppins text-sm font-normal text-grey-700 mt-1">
                  RS. {parseInt(property.rent, 10).toLocaleString("en-IN")}
                </div>
                <div className="card-text font-poppins text-lg font-medium text-black">
                  {property.type}, {property.floor}
                </div>
              </div>
              <ul className="card-list custom-card-list mt-4">
                <li className="bed card-item flex items-center text-base">
                  <IoBedOutline style={{ fontSize: "1.6rem" }} />
                  &nbsp;
                  {property.bhk}
                </li>
                <li className="bath card-item flex items-center text-base">
                  <LuBath style={{ fontSize: "1.6rem" }} />
                  &nbsp;
                  {property.typeOfWashroom}
                </li>
                <li className="pi card-item flex items-center text-base">
                  <PiGridFour style={{ fontSize: "1.6rem" }} />
                  &nbsp;
                  {property.squareFeetArea} ft²
                </li>
              </ul>
            </div>
            <div className="card-footer p-6 flex justify-between items-center">
              <div className="card-author flex items-center gap-4">
                <figure className="author-avatar w-10 h-10 overflow-hidden rounded-full">
                  <img
                    src={property.images[0]}
                    alt={property.ownerName}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div>
                  <p className="author-name text-gray-900 text-sm font-medium">
                    <a href="#">
                      {property.firstName} {property.lastName}
                    </a>
                  </p>
                </div>
              </div>
              <div className="card-footer-actions">
                <button
                  onClick={() => navigate(`/property/${property.slug}`)}
                  className="card-footer-actions-btn"
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
