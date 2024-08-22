import { useEffect, useState } from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { FaLocationDot, FaRegImage, FaVideo } from "react-icons/fa6";
import { IoAdd, IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { PiGridFour } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import "./listing.css";
import Service from "../../config/config";

const Listing = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  // Fetch data from backend APIp
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertyData= await Service.fetchProperty();
        setProperties(propertyData);
        console.log(propertyData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

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
                  <a href="#">
                    <img
                      src={property.photos[0]}
                      alt={property.propertyType}
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <div
                    className={`card-badge-right absolute top-6 right-6 text-white text-xs uppercase px-3 py-1`}
                    style={{ backgroundColor: "#c8a217" }}
                  >
                    {property.spaceType === "Residential"
                      ? "For Rent"
                      : "For Sale"}
                  </div>
                  <div
                    className={`card-badge-left absolute top-6 left-6 text-white text-xs uppercase px-3 py-1`}
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
                    <h3 className="h3 card-title text-xl font-semibold">
                      <a href="#">{property.propertyType}</a>
                    </h3>
                    <div className="card_icons flex space-x-2">
                      <a href="#">
                        <CiShare2 className="card_icon text-lg border p-1" />
                      </a>
                      <a href="#">
                        <IoAdd className="card_icon text-lg border p-1" />
                      </a>
                      <a href="#">
                        <CiHeart className="card_icon text-lg border p-1" />
                      </a>
                    </div>
                  </div>
                  <div className="card-price text-gray-700 text-sm mt-1">
                    Rs. {property.rent}
                  </div>
                  <p className="card-text text-gray-800 text-sm mt-4">
                    {property.type}, {property.floor}th floor
                  </p>
                  <ul className="card-list flex items-center justify-evenly mt-4">
                    <li className="card-item flex items-center text-gray-800 text-base">
                      <IoBedOutline className="text-xl" />
                      &nbsp;
                      {property.bhk}
                    </li>
                    <li className="card-item flex items-center text-gray-800 text-base">
                      <LuBath className="text-xl" />
                      &nbsp;
                      {property.typeOfWashroom}
                    </li>
                    <li className="card-item flex items-center text-gray-800 text-base">
                      <PiGridFour className="text-xl" />
                      &nbsp;
                      {property.floor} ft²
                    </li>
                  </ul>
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
                      className="card-footer-actions-btn bg-gray-200 text-gray-900 w-28 h-9 grid place-items-center text-sm"
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
