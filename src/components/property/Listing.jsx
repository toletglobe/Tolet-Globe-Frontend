import { useEffect, useState } from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { IoAdd, IoBedOutline } from "react-icons/io5";
import { FaLocationDot, FaRegImage, FaVideo } from "react-icons/fa6";
import { LuBath } from "react-icons/lu";
import { PiGridFour } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./listing.css";
import Service from "../../config/config";

const Listing = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertyData = await Service.fetchProperty();
        setProperties(propertyData);
        console.log(propertyData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <section className="property py-24" id="property">
        <div className="container mx-auto px-10">
          <ul className="property-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <li
                key={property._id}
                className="property-card bg-white border border-gray-200 shadow-lg"
              >
                <figure className="card-banner relative aspect-w-2 aspect-h-1.5 overflow-hidden">
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
                  <div
                    className="card-badge-right absolute top-6 right-6 text-white text-xs uppercase px-3 py-1"
                    style={{ backgroundColor: "#c8a217" }}
                  >
                    {property.spaceType === "Residential"
                      ? "For Rent"
                      : "For Sale"}
                  </div>
                  <div
                    className="card-badge-left absolute top-6 left-6 text-white text-xs uppercase px-3 py-1"
                    style={{ backgroundColor: "#137a60" }}
                  >
                    {property.propertyType}
                  </div>
                  <div className="banner-actions absolute bottom-4 left-4 right-4 flex gap-4 justify-between">
                    <div>
                      <button className="banner-actions-btn flex items-center gap-1 text-white">
                        <FaLocationDot className="text-xl" />
                        <address>{property.locality}</address>
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
                    <div className="card_icons flex space-x-4">
                      <a href="#">
                        <CiShare2 className="card_icon" /> {/* Share icon */}
                      </a>
                      <a href="#">
                        <IoAdd className="card_icon" /> {/* Plus icon */}
                      </a>
                      <a href="#">
                        <CiHeart className="card_icon text-red-500" /> {/* Heart icon */}
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
                      <IoBedOutline style={{ fontSize: "1.6rem" }} /> {/* Increased size */}
                      &nbsp;
                      {property.bhk}
                    </li>
                    <li className="bath card-item flex items-center text-base">
                      <LuBath style={{ fontSize: "1.6rem" }} /> {/* Increased size */}
                      &nbsp;
                      {property.typeOfWashroom}
                    </li>
                    <li className="pi card-item flex items-center text-base">
                      <PiGridFour style={{ fontSize: "1.6rem" }} /> {/* Increased size */}
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
                      onClick={() => navigate(`/property/${property._id}`)}
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
      </section>
    </>
  );
};

export default Listing;
