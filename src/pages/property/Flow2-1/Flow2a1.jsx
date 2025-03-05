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
import Slider from "react-slick"; // Import the slider



const Flow2a = () => {
  const { slug } = useParams();
  const [{ compareProperty }, dispatch] = useStateValue();
  const [property, setProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const maskPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
    const numberStr = phoneNumber.toString();
    const visiblePart = numberStr.slice(0, -8);
    const maskedPart = "--------";
    return `${visiblePart}${maskedPart}`;
  };

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
    setSelectedImage(property?.images[currentIndex]);
  };

  const addToCompare = (property) => {
    const alreadyInCompare = compareProperty.find(
      (item) => item.slug === property.slug
    );

    if (alreadyInCompare) {
      setErrorMessage("This property is already in the compare list!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (compareProperty.length >= 4) {
      setErrorMessage("You can only compare up to 4 properties.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    dispatch({
      type: "ADD_TO_COMPARE",
      item: property,
    });
    setShowPrompt(true);
    setTimeout(() => setShowPrompt(false), 1000);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, 
    nextArrow: <div className="next-arrow text-white text-4xl">&#8594;</div>,
    prevArrow: <div className="prev-arrow text-white text-4xl ">&#8592;</div>, 
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
      {showPrompt && (
        <div
          className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg z-50"
          style={{ transition: "opacity 0.3s ease-in-out" }}
        >
          Property added to compare successfully!
        </div>
      )}

      {errorMessage && (
        <div
          className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-50"
          style={{ transition: "opacity 0.3s ease-in-out" }}
        >
          {errorMessage}
        </div>
      )}

      {property.images.length > 0 ? (
        <div className="relative">
          <div className="hidden lg:flex  gap-2 h-[500px]">
            <div className="w-1/2">
              <img
                src={property.images[0]}
                alt={property.propertyType}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => openModal(property.images[0], 0)}
              />
            </div>

            <div className="w-1/2 grid grid-cols-2 gap-2">
              {property.images.slice(1, 5).map((image, index) => (
                <div key={index + 1} className="relative">
                  <img
                    src={image}
                    alt={`${property.propertyType} ${index + 2}`}
                    className="w-full h-[246px] object-cover rounded-lg cursor-pointer"
                    onClick={() => openModal(image, index + 1)}
                  />
                  {index === 3 && property.images.length > 5 && (
                    <div 
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer rounded-lg"
                      onClick={() => openModal(image, index + 1)}
                    >
                      <span className="text-white text-lg font-medium items-center justify-center">See all</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:hidden">
            <div className="w-full mb-2">
              <img
                src={property.images[0]}
                alt={property.propertyType}
                className="w-full h-[300px] object-cover rounded-lg cursor-pointer"
                onClick={() => openModal(property.images[0], 0)}
              />
            </div>

            {property.images.length > 1 && (
              <div className="grid grid-cols-2 gap-2">
                {property.images.slice(1, 5).map((image, index) => (
                  <div key={index + 1} className="relative">
                    <img
                      src={image}
                      alt={`${property.propertyType} ${index + 2}`}
                      className="w-full h-[150px] object-cover rounded-lg cursor-pointer"
                      onClick={() => openModal(image, index + 1)}
                    />
                    {index === 3 && property.images.length > 5 && (
                      <div 
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer rounded-lg"
                        onClick={() => openModal(image, index + 1)}
                      >
                        <span className="text-white text-lg font-medium">See all</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="py-40 text-center text-4xl font-semibold">
          No Images Available for this Property
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 text-white">
            <h3 className="text-lg font-medium">Images and Videos</h3>
            <button 
              onClick={closeModal}
              className="text-white text-3xl hover:text-gray-300"
            >
                      ✖

            </button>
          </div>
          
          <div className="flex-1 flex overflow-y-auto p-4">
          {/* Image Slider for Large Screens */}
          <div className="lg:flex-1 lg:overflow-y-auto p-10 lg:block hidden relative flex items-center justify-center">
              {property.images.length === 1 ? (
                <div className="w-full flex items-center justify-center">
                  <img
                    src={property.images[0]} 
                    alt={`${property.propertyType} 1`}
                    className="h-[500px] rounded-lg block"
                  />
                </div>
              ) : (
                <Slider {...sliderSettings}>
                  {property.images.map((image, index) => (
                    <div key={index} className="w-full items-center justify-center !flex">
                      <img
                        src={image}
                        alt={`${property.propertyType} ${index + 1}`}
                        className="h-[500px] rounded-lg block"
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </div>


            
            {/* Image Grid for Small Screens */}
          <div className="lg:hidden flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {property.images.map((image, index) => (
                <div key={index} className="w-full">
                  <img
                    src={image}
                    alt={`${property.propertyType} ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          </div>
          
          <div className="p-4 text-center text-white bg-black bg-opacity-50">
            Photos | Videos | Property Map
          </div>
        </div>
      )}

        <div className="text-center -mt-4 relative">
          <p className="bg-white inline-block text-black p-1 px-3 rounded-lg shadow-lg">
            Photos | Videos | Property Map
          </p>
        </div>

        <div className="md:flex justify-between pt-8">
          <div className="lg:w-[40%]">
            <h1 className="text-left text-white lg:text-5xl">
              {property?.propertyType}
              <span>
                <img src={shield} alt="shield" className="h-12 w-12 lg:ml-8 inline" />
              </span>
            </h1>
            <p className="text-gray-400 block lg:text-2xl lg:py-4">
              {property?.address}, {property?.city}
            </p>

            <div className="flex lg:text-2xl lg:pb-4">
              <MdOutlineStarPurple500 className="text-[#FFC700] mt-1" />
              <MdOutlineStarPurple500 className="text-[#FFC700] mt-1" />
              <MdStarOutline className="text-[#FFFEFE] mt-1" />
              <MdStarOutline className="text-[#FFFEFE] mt-1" />
              <MdStarOutline className="text-[#FFFEFE] mt-1" />
              <p className="ml-2 text-gray-400">
                {property?.reviews ? property?.reviews?.length : 0} (Reviews)
              </p>
            </div>
            
                <div className="border border-gray-600 rounded-lg p-3 mb-8 flex flex-col sm:flex-row justify-evenly items-center gap-4 w-full">
                  {/* Monthly Rent Section */}
                  <div className="text-center w-full sm:w-auto">
                    <p className="text-gray-400">Monthly Rent</p>
                    <h3 className="text-white text-2xl sm:text-xl">Rs. {property?.rent}</h3>
                  </div>

                  {/* Divider (Adjusts Based on Screen Size) */}
                  <div className="border-t sm:border-l border-gray-600 w-full sm:w-auto h-[1px] sm:h-[50px]"></div>

                  {/* BHK Section */}
                  <div className="text-center w-full sm:w-auto">
                    <p className="text-gray-400">Bhk</p>
                    <h3 className="text-white text-2xl sm:text-xl">{property?.bhk} Bhk</h3>
                  </div>

                  {/* Divider */}
                  <div className="border-t sm:border-l border-gray-600 w-full sm:w-auto h-[1px] sm:h-[50px]"></div>

                  {/* Floor Section */}
                  <div className="text-center w-full sm:w-auto">
                    <p className="text-gray-400">Floor</p>
                    <h3 className="text-white text-2  xl sm:text-xl">{property?.floor}</h3>
                  </div>
                </div>
          </div>
        <div className="lg:w-[30%] bg-white rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4 lg:mb-8">
            <p className="text-black text-lg font-semibold">Request a visit</p>
            <div className="flex gap-3">
              <CiShare2 className="text-[#2E6A64] text-xl cursor-pointer" />
              <IoIosAdd className="text-xl cursor-pointer" />
              <CiHeart className="text-[#FF0B0B] text-xl cursor-pointer" />
            </div>
          </div>
          
          <div className="flex items-center mb-3 lg:mb-10">
            <img src={profile} alt="owner" className="h-10 w-10 lg:h-16 lg:w-16 rounded-full" />
            <div className="ml-3">
              <p className="text-gray-800 font-medium">
                {property?.firstName} {property?.lastName}
              </p>
              <p className="text-gray-500 font-normal lg:text-xl">+
                {maskPhoneNumber(property?.ownersContactNumber)}
              </p>
            </div>
          </div>
          
          <button
            className="w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-black font-semibold lg:text-xl"
            style={{ backgroundColor: "#40B5A8" }}
            onClick={() => addToCompare(property)}
          >
            <img src={fav} alt="favorite" className="h-6 w-5" />
            Add To Visit
          </button>
        </div>
        </div>


      <Flow2b property={property} />
    </div>
  );
};

export default Flow2a;