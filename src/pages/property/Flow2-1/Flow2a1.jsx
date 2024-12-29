import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Service from "../../../config/config";
import Flow2b from "./Flow2b";
import { MdOutlineStarPurple500, MdStarOutline } from "react-icons/md";
import { CiShare2, CiHeart } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import profile from "../../../assets/property/author.jpg";
import fav from "../../../assets/property/Vector.png";
import shield from "../../../assets/property/shield.png";
import { useStateValue } from "../../../StateProvider";

const Flow2a = () => {
  const { slug } = useParams();
  const [{ compareProperty }, dispatch] = useStateValue();
  const [property, setProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false); // state to show prompt
  const [errorMessage, setErrorMessage] = useState(""); // state to show error message when property is already added to compare

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyList = await Service.fetchPropertyBySlug(slug);
        setProperty(propertyList);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchProperty();
  }, [slug]);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (property?.images?.length || 1) - 1 : prevIndex - 1
    );
    setSelectedImage(property?.images[currentIndex]);
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (property?.images?.length || 1)
    );
    setSelectedImage(property.images[currentIndex]);
  };

  // Handle adding to compare and showing the prompt
  const addToCompare = (property) => {
    // Check if property is already in compare list
    const alreadyInCompare = compareProperty.find(
      (item) => item.slug === property.slug
    );

    // Show error message if property is already in compare list
    if (alreadyInCompare) {
      setErrorMessage("This property is already in the compare list!");
      setTimeout(() => setErrorMessage(""), 3000); // Clear error message after 3 seconds
      return;
    }

    // Check if there are already 4 properties in the compare list
    if (compareProperty.length >= 4) {
      setErrorMessage("You can only compare up to 4 properties.");
      setTimeout(() => setErrorMessage(""), 3000); // Clear error message after 3 seconds
      return;
    }

    // Add property to compare list
    dispatch({
      type: "ADD_TO_COMPARE",
      item: property,
    });
    setShowPrompt(true); // Show the prompt for successful addition
    setTimeout(() => setShowPrompt(false), 1000); // Hide the prompt after 1 second
  };

  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} />
      </div>
    );
  }

  return (
    <div className="px-4 py-4 relative">
      {/* Show success prompt message when property is added */}
      {showPrompt && (
        <div
          className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg z-50"
          style={{ transition: "opacity 0.3s ease-in-out" }}
        >
          Property added to compare successfully!
        </div>
      )}

      {/* Show error message if property is already in compare */}
      {errorMessage && (
        <div
          className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-50"
          style={{ transition: "opacity 0.3s ease-in-out" }}
        >
          {errorMessage}
        </div>
      )}

      {/* Image Carousel Section */}
      {property.images.length > 0 ? (
        <div className="flex flex-wrap md:flex-nowrap gap-1 relative">
          {/* Main Image */}
          <div
            className={`w-full ${property.images.length > 1 ? "md:w-1/2" : ""}`}
          >
            <img
              src={property.images[0]}
              alt={property.propertyType}
              className="w-full h-[400px] object-cover cursor-pointer"
              onClick={() => openModal(property.images[0], 0)}
            />
          </div>

          {/* Additional Images */}
          {property.images.length > 1 && (
            <div
              className={`w-full md:w-1/2 grid ${
                property.images.length === 2 ? "grid-cols-1" : "grid-cols-2"
              } gap-1`}
            >
              {property.images.slice(1, 5).map((image, index) => (
                <img
                  key={index + 1}
                  src={image}
                  alt={`${property.propertyType} ${index + 2}`}
                  className={`w-full ${property.images.length <= 3 ? "h-[400px]" : "h-[200px]"} object-cover cursor-pointer`}
                  onClick={() => openModal(image, index + 1)}
                />
              ))}
              {property.images.length > 5 && (
                <div
                  className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full cursor-pointer"
                  onClick={() => openModal(property.images[4], 4)}
                >
                  +{property.images.length - 5} more
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="py-40 text-center text-4xl font-semibold">
          No Images Available for this Property
        </div>
      )}

      {/* Caption Section */}
      <div className="text-center -mt-4 relative">
        <p className="bg-white inline-block text-black p-1 px-3 rounded-lg shadow-lg">
          Photos | Videos | Property Map
        </p>
      </div>

      {/* Property Details Section */}
      <div className="md:flex justify-between pt-8">
        <div>
          <h1 className="text-left text-white text-4xl">
            {property?.propertyType}
            <span>
              <img src={shield} alt="shield" className="h-10 w-10 inline" />
            </span>
          </h1>
          <p className="text-gray-400 block">
            {property?.address}, {property?.city}
          </p>

          <div className="flex">
            <MdOutlineStarPurple500 className="text-[#FFC700] mt-1" />
            <MdOutlineStarPurple500 className="text-[#FFC700] mt-1" />
            <MdStarOutline className="text-[#FFFEFE] mt-1" />
            <MdStarOutline className="text-[#FFFEFE] mt-1" />
            <MdStarOutline className="text-[#FFFEFE] mt-1" />
            <p className="ml-2 text-gray-400">
              {property?.reviews ? property?.reviews?.length : 0} (Reviews)
            </p>
          </div>

          <div className="border border-gray-600 rounded-lg flex justify-between gap-x-4 pl-3 pr-3 mb-4 md:mb-0">
            <div className="p-1">
              <p className="block text-center text-gray-400">Monthly Rent</p>
              <h3 className="text-white text-center text-3xl md:text-2xl">
                Rs. {property?.rent}
              </h3>
            </div>
            <div className="border-l border-gray-600 mx-4 h-[50px] mt-[10px]"></div>
            <div className="p-1 text-gray-400">
              <p className="block text-center">Bhk</p>
              <h3 className="text-white text-center text-3xl md:text-2xl">
                {property?.bhk} Bhk
              </h3>
            </div>
            <div className="border-l border-gray-600 mx-4 h-[50px] mt-[10px]"></div>
            <div className="p-1 text-gray-400">
              <p className="block text-center">Floor</p>
              <h3 className="text-white text-center text-3xl md:text-2xl">
                {property?.floor}
              </h3>
            </div>
          </div>
        </div>

        {/* Request Visit Section */}
        <div className="border-1 bg-white rounded-lg lg:w-1/4 md:w-1/2 p-4">
          <div className="flex justify-between">
            <p className="text-black text-lg font-semibold">Request a visit</p>
            <div className="flex">
              <CiShare2 className="text-[#2E6A64] mt-1" />
              <IoIosAdd className="mt-1" />
              <CiHeart className="text-[#FF0B0B] mt-1" />
            </div>
          </div>
          <div className="flex">
            <img src={profile} alt="owner" className="h-8 w-8 inline" />
            <p className="pt-1 pl-3 text-gray-800">
              {property?.firstName} {property?.lastName}
            </p>
          </div>
          <div>
            <p className="block text-gray-400">{property?.ownersContactNumber}</p>
          </div>
          <div className="rounded-lg" style={{ backgroundColor: "#40B5A8" }}>
            <button
              className="flex w-full justify-evenly p-2 font-semibold"
              onClick={() => addToCompare(property)}
            >
              <img src={fav} alt="favorite" className="inline h-6 w-5" />
              Add To Visit
            </button>
          </div>
        </div>
      </div>

      {/* Flow2b Section */}
      <Flow2b property={property} />
    </div>
  );
};

export default Flow2a;
