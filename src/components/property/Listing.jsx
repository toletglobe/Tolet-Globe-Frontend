import { useEffect, useState } from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight, FaLocationDot, FaRegImage, FaVideo } from "react-icons/fa6";
import { IoAdd, IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { PiGridFour } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import "./listing.css";
import Service from "../../config/config"; // Assuming Service is defined in config.js
import author from "../../assets/property/author.jpg"; // Ensure this path is correct
import { ClipLoader } from "react-spinners";

const Listing = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const propertiesPerPage = 6; // Number of properties per page

  // Fetch data from backend API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertyData = await Service.fetchProperty();
        setProperties(propertyData || []); // Ensure propertyData is an array
        console.log(propertyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  // Get current properties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const onPageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} />
      </div>
    );
  }

  return (
    <>
      <section className="property py-24" id="property">
        <div className="container mx-auto px-10">
          <ul className="property-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProperties.map((property) => (
              <li
                key={property._id}
                className="property-card bg-white border border-gray-200 shadow-lg"
              >
                {/* Property Card Content */}
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
                    For rent
                  </div>
                  <div
                    className={`card-badge-left absolute top-6 left-6 text-white text-xs uppercase px-3 py-1`}
                    style={{ backgroundColor: "#137a60" }}
                  >
                    Featured
                  </div>
                  <div className="banner-actions absolute bottom-4 left-4 right-4 flex gap-4 justify-between">
                    <div>
                      <button className="banner-actions-btn flex items-center gap-1 text-white">
                        <FaLocationDot className="text-xl" />
                        <address>{property.address}</address>
                      </button>
                    </div>
                    <div className="flex gap-4">
                      <button className="banner-img_video-btn flex items-center gap-2 text-white">
                        <FaVideo className="text-xl" />
                      </button>
                      <button className="banner-img_video-btn flex items-center gap-2 text-white">
                        <FaRegImage className="text-xl" />6
                      </button>
                    </div>
                  </div>
                </figure>
                <div className="card-content p-6">
                  <div className="name_icon flex justify-between items-center">
                    <h3 className="h3 card-title text-xl font-semibold">
                      <a href="#">Property for Rent</a>
                    </h3>
                    <div className="card_icons flex space-x-2">
                      <a href="#">
                        <CiShare2 className="card_icon text-lg border p-1" />
                      </a>
                      <a href="#">
                        <IoAdd className="card_icon text-lg border p-1" />
                      </a>
                      <a href="#">
                        <CiHeart className="card_icon text-lg border p-1  " />
                      </a>
                    </div>
                  </div>
                  <div className="card-price text-gray-700 text-sm mt-1">
                    {property.rent}
                  </div>
                  <p className="card-text text-gray-800 text-sm mt-4">
                    Beautiful, Ground Floor Accommodation
                  </p>
                  <ul className="card-list flex items-center justify-evenly mt-4">
                    <li className="card-item flex items-center text-gray-800 text-base">
                      <IoBedOutline className="text-xl" />
                      &nbsp;
                      {property.bhk}
                    </li>
                    <li className="card-item flex items-center text-gray-800 text-base">
                      <LuBath className="text-xl" />
                      &nbsp;2
                    </li>
                    <li className="card-item flex items-center text-gray-800 text-base">
                      <PiGridFour className="text-xl" />
                      &nbsp;1800
                    </li>
                  </ul>
                </div>
                <div className="card-footer p-6 flex justify-between items-center">
                  <div className="card-author flex items-center gap-4">
                    <figure className="author-avatar w-10 h-10 overflow-hidden rounded-full">
                      <img
                        src={author}
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
          <div className="flex justify-center mt-5 mx-20">
            <div className="bg-white/20 rounded-md px-2 py-1 flex justify-between gap-3">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="hover:text-[#6CC1B6] rounded-lg flex items-center"
              >
                <FaChevronLeft className="mr-2" /> Previous
              </button>
              <div className="flex items-center space-x-2">
                {currentPage > 2 && (
                  <>
                    <button
                      onClick={() => onPageChange(1)}
                      className="px-2 py-1 rounded-lg  hover:text-[#6CC1B6]"
                    >
                      1
                    </button>
                    {currentPage > 3 && <span className="px-2">...</span>}
                  </>
                )}
                {currentPage > 1 && (
                  <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="px-2 py-1 rounded-lg  hover:text-[#6CC1B6]"
                  >
                    {currentPage - 1}
                  </button>
                )}
                <button
                  className="px-2 py-1 rounded-lg text-[#6CC1B6] underline"
                  aria-current="page"
                >
                  {currentPage}
                </button>
                {currentPage < totalPages && (
                  <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="px-2 py-1 rounded-lg hover:text-[#6CC1B6]"
                  >
                    {currentPage + 1}
                  </button>
                )}
                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && (
                      <span className="px-2">...</span>
                    )}
                    <button
                      onClick={() => onPageChange(totalPages)}
                      className="px-2 py-1 rounded-lg hover:text-[#6CC1B6]"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="hover:text-[#6CC1B6] rounded-lg flex items-center"
              >
                Next <FaChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Listing;
