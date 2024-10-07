import React from "react";
import Slider from "react-slick";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
// import { IoAdd, IoBedOutline } from "react-icons/io5";
import { IoAdd, IoBedOutline, IoRemove } from "react-icons/io5";
import Popup from "reactjs-popup";
import { LuBath } from "react-icons/lu";
import { PiGridFour } from "react-icons/pi";
import { FaLocationDot, FaRegImage, FaVideo } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// Custom Arrow Components
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full cursor-pointer z-10 flex items-center justify-center"
    onClick={onClick}
    style={{ width: "40px", height: "40px" }}
  >
    <span className="text-2xl">&#8249;</span>
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full cursor-pointer z-10 flex items-center justify-center"
    onClick={onClick}
    style={{ width: "40px", height: "40px" }}
  >
    <span className="text-2xl">&#8250;</span>
  </div>
);

const Cards = ({
  properties,
  cityName,
  propertyAction,
  handleToggle,
  isInCompareList,
}) => {
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

  return (
    <div>
      <ul className="property-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {normalizedProperties.map((property) => (
          <li
            key={property._id}
            className="property-card bg-white border border-grey-200 shadow-lg relative"
          >
            <figure className="card-banner relative aspect-w-2 aspect-h-1.5 overflow-hidden">
              {property.photos.length > 1 ? (
                <Slider {...settings}>
                  {property.photos.map((photo, index) => (
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
                    src={property.photos[0]}
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
                  backgroundColor: "#40B5A8",
                  textTransform: "capitalize",
                }}
              >
                {propertyAction}
              </div>
              <div className="banner-actions absolute bottom-4 left-4 right-4 flex gap-4 justify-between">
                <div>
                  <button className="banner-actions-btn flex items-center gap-1 text-white">
                    <FaLocationDot className="text-xl" />
                    <address>{`${property.locality}, ${cityName}`}</address>
                  </button>
                </div>
                <div className="flex gap-4">
                  <button className="banner-img_video-btn flex items-center gap-2 text-white">
                    <FaVideo className="text-xl" />
                  </button>
                  <button className="banner-img_video-btn flex items-center gap-2 text-white">
                    <FaRegImage className="text-xl" />
                    {property.photos.length}
                  </button>
                </div>
              </div>
            </figure>
            <div className="card-content p-6">
              <div className="name_icon flex justify-between items-center">
                <h3 className="card-title text-2xl font-semibold">
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
                    nested
                  >
                    {(close) => (
                      <div className="bg-slate-50 text-black px-2 py-2 rounded-full h-full flex flex-col shadow-xl">
                        <div className="flex items-center gap-12 border border-black rounded-3xl px-2">
                          <div className="px-2 py-3 text-sm truncate w-32">
                            {`toletglobe.in/property/${property._id}`}
                          </div>
                          <div>
                            <button
                              className="px-4 py-1 bg-[#40B5A8] text-white rounded-3xl"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `www.toletglobe.in/property/${property._id}`
                                );
                                close();
                              }}
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Popup>

                  <a
                    href="#"
                    onClick={(event) => handleToggle(event, property)}
                    key={property._id}
                  >
                    {isInCompareList(property._id) ? (
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
                <div className="card-price font-poppins text-s font-normal text-grey-700 mt-1">
                  RS. {property.rent}
                </div>
                <div className="card-text font-poppins text-lg font-medium text-black">
                  {property.type}, {property.floor}th floor
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
                    marginBottom: "-2.3rem",
                  }}
                />
              </div>
            </div>
            <div className="card-footer p-6 flex justify-between items-center">
              <div className="card-author flex items-center gap-4">
                <figure className="author-avatar w-10 h-10 overflow-hidden rounded-full">
                  <img
                    src={property.photos[0]}
                    alt={property.ownerName}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div>
                  <p className="author-name text-gray-900 text-sm font-medium">
                    <a href="#">{property.ownerName}</a>
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
