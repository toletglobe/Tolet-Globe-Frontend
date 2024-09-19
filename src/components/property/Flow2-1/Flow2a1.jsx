import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Service from "../../../config/config";
import Flow2b from "./Flow2b";
import img1 from "../../../assets/property/property-1.jpg";
import img2 from "../../../assets/property/property-2.jpg";
import img3 from "../../../assets/property/property-3.jpg";
import img4 from "../../../assets/property/property-4.png";
import img5 from "../../../assets/property/property-5.jpg";
import shield from "../../../assets/property/shield.png";
import { MdOutlineStarPurple500, MdStarOutline } from "react-icons/md";
import { CiShare2, CiHeart } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import profile from "../../../assets/property/author.jpg";
import fav from "../../../assets/property/Vector.png";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Flow2a = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyList = await Service.fetchPropertyById(id);
        setProperty(propertyList);
        console.log(propertyList);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]);

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
      prevIndex === 0 ? (property?.photos?.length || 1) - 1 : prevIndex - 1
    );
    setSelectedImage(property?.photos[currentIndex] || img1);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % (property?.photos?.length || 1)
    );
    setSelectedImage(property?.photos[currentIndex] || img1);
  };

  if (!property) return <p>Loading...</p>; // Add a loading state

  return (
    <div className="px-4 py-4 relative">
      {/* Image Carousel Section */}
      <div className="flex flex-wrap md:flex-nowrap gap-1 relative">
        {/* Large Image */}
        <div className="w-full md:w-1/2">
          <img
            src={property?.photos[0] || img1}
            alt={property?.propertyType}
            className="w-full h-[383px] object-cover cursor-pointer"
            onClick={() => openModal(property?.photos[0] || img1, 0)}
          />
        </div>

        {/* Grid of Smaller Images */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-1">
          <img
            src={property?.photos[1] || img2}
            alt={property?.propertyType}
            className="w-full h-[193px] object-cover cursor-pointer"
            onClick={() => openModal(property?.photos[1] || img2, 1)}
          />
          <img
            src={property?.photos[2] || img3}
            alt={property?.propertyType}
            className="w-full h-[193px] object-cover cursor-pointer"
            onClick={() => openModal(property?.photos[2] || img3, 2)}
          />
          <img
            src={property?.photos[3] || img4}
            alt={property?.propertyType}
            className="w-full h-[186px] object-cover cursor-pointer"
            onClick={() => openModal(property?.photos[3] || img4, 3)}
          />
          <img
            src={property?.photos[4] || img5}
            alt={property?.propertyType}
            className="w-full h-[186px] object-cover cursor-pointer"
            onClick={() => openModal(property?.photos[4] || img5, 4)}
          />
        </div>
      </div>
      
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
            {property?.propertyType} / Rent{" "}
            <span>
              <img src={shield} alt="shield" className="h-10 w-10 inline" />
            </span>
          </h1>
          <p className="text-gray-400 block">{property?.address}</p>

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
              <p className="block text-center text-gray-400">Monthly rent</p>
              <h3 className="text-white text-center text-3xl md:text-2xl">Rs. {property?.rent}</h3>
            </div>
            <div className="p-1 text-gray-400">
              <p className="block text-center">Bhk</p>
              <h3 className="text-white text-center text-3xl md:text-2xl">{property?.bhk} bhk</h3>
            </div>
            <div className="p-1 text-gray-400">
              <p className="block text-center">Floor</p>
              <h3 className="text-white text-center text-3xl md:text-2xl">{property?.floor}</h3>
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
            <p className="pt-1 pl-3 text-gray-800">{property?.ownerName}</p>
          </div>
          <div>
            <p className="block text-gray-400">
              {property?.ownersContactNumber}
            </p>
          </div>
          <div className="rounded-lg" style={{ backgroundColor: "#40B5A8" }}>
            <button className="flex w-full justify-evenly p-2 font-semibold">
              <img src={fav} alt="favorite" className="inline h-6 w-5" />
              Add To Visit
            </button>
          </div>
        </div>
      </div>

      {/* Flow2b Section */}
      <Flow2b propertyData={property} />

      {/* Modal for Full Image View */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="relative bg-dark p-4">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-7 transform -translate-y-1/2 bg-white text-black text-2xl  p-2 rounded-full"
            >
              <HiChevronLeft />
            </button>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-7 transform -translate-y-1/2 bg-white text-black text-2xl  p-2 rounded-full"
            >
              <HiChevronRight />
            </button>

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-xl bg-gray-300 p-1 rounded-full"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="h-[568px] object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Flow2a;
