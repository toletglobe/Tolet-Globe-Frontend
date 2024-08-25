import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Service from "../../../config/config";
import Flow2b from "./Flow2b";
import img1 from "../../../assets/property/property-1.jpg";
import shield from "../../../assets/property/shield.png";
import { MdOutlineStarPurple500, MdStarOutline } from "react-icons/md";
import { CiShare2, CiHeart } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import profile from "../../../assets/property/author.jpg";
import fav from "../../../assets/property/Vector.png";

const Flow2a = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyList = await Service.fetchPropertyById(id);
        setProperty(propertyList);
        // console.log(propertyList);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, []);

  if (!property) return <p>Loading...</p>; // Add a loading state

  return (
    <>
      <div className="pl-2 pr-4 mx-4">
        {/* image section */}
        <div className="relative pb-2">
          {/* temporary img section start*/}
          <div className="w-full ">
            <img
              src={property.photos[0]}
              alt=""
              srcset=""
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="absolute w-full flex justify-center bottom-0">
            <p className="bg-white text-black inline p-1 px-3 rounded-lg">
              Photos | Videos | Property Map
            </p>
          </div>
        </div>
        {/* image portion ended */}

        {/* 2nd div started */}
        <div className="md:flex justify-between	pt-8">
          <div className="">
            <h1 className="text-left text-white text-4xl">
              Flat / Rent{" "}
              <span>
                <img src={shield} alt="" className="h-10 w-10 inline" />
              </span>
            </h1>
            <p className="text-gray-400 block">
              Beautiful, Ground Floor Accomodation
            </p>

            <div className="flex my-4">
              <MdOutlineStarPurple500 className="text-[#FFC700] mt-1" />
              <MdOutlineStarPurple500 className="text-[#FFC700] mt-1" />
              <MdStarOutline className="text-[#FFFEFE] mt-1" />
              <MdStarOutline className="text-[#FFFEFE] mt-1" />
              <MdStarOutline className="text-[#FFFEFE] mt-1" />
              <p className="ml-2 text-gray-400">12 (Reviews)</p>
            </div>

            <div className="border border-gray-600 rounded-lg flex justify-between pl-3 pr-3">
              <div className="p-1">
                <p className="block text-gray-400">Monthly rent</p>
                <h3 className="text-white text-xl">Rs. {property.rent}</h3>
              </div>
              <div className="p-1 text-gray-400">
                <p className="block">Bhk</p>
                <h3 className="text-white text-xl">{property.bhk} bhk</h3>
              </div>
              <div className="p-1 text-gray-400">
                <p className="block">Availability</p>
                <h3 className="text-white text-xl">Immediate</h3>
              </div>
            </div>
          </div>

          {/* 2nd div of div2 */}
          <div className="border bg-white rounded-l p-4 sm:w-full md:w-1/2 lg:w-1/4 my-4">
            <div className="flex justify-between">
              <p className="text-black text-lg font-semibold">
                Request a visit
              </p>
              <div className="flex">
                <CiShare2 className="text-[#2E6A64] mt-1" />
                <IoIosAdd className="mt-1 mx-2" />{" "}
                {/* Added mx-2 for spacing */}
                <CiHeart className="text-[#FF0B0B] mt-1" />
              </div>
            </div>
            <div className="flex items-center">
              {" "}
              {/* Added items-center to align content */}
              <img src={profile} alt="" className="h-8 w-8 my-4" />
              <p className="pl-3 text-gray-800">Deepti Rastogi</p>
            </div>
            <div>
              <p className="text-gray-400">+91 7318413444</p>
            </div>
            <div
              className="rounded-lg my-4"
              style={{ backgroundColor: "#40B5A8" }}
            >
              <button className="flex w-full justify-center p-2 font-semibold text-white">
                {" "}
                {/* Added text-white */}
                <img src={fav} alt="" className="h-6 w-5 mx-4" />
                Add To Visit
              </button>
            </div>
          </div>
        </div>
        {/* 2nd div ended */}
        <Flow2b propertyData={property} />

        {/* <Flow2b /> */}
      </div>

      {/* <div className="pl-2 pr-4 mx-4">
        <div className="relative pb-2">
          <div className="w-full">
            <img
              src={property.photos[0] || img1}
              alt={property.propertyType}
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="absolute w-full bottom-0">
            <p className="bg-white inline p-1 px-3 rounded-lg">
              Photos | Videos | Property Map
            </p>
          </div>
        </div>

        <div className="md:flex justify-between pt-8">
          <div>
            <h1 className="text-left text-white text-4xl">
              {property.propertyType} / Rent{" "}
              <span>
                <img src={shield} alt="shield" className="h-10 w-10 inline" />
              </span>
            </h1>
            <p className="text-gray-400 block">{property.address}</p>

            <div className="flex">
              <MdOutlineStarPurple500 className="text-[#FFC700] mt-1" />
              <MdOutlineStarPurple500 className="text-[#FFC700] mt-1" />
              <MdStarOutline className="text-[#FFFEFE] mt-1" />
              <MdStarOutline className="text-[#FFFEFE] mt-1" />
              <MdStarOutline className="text-[#FFFEFE] mt-1" />
              <p className="ml-2 text-gray-400">
                {property.reviews ? property.reviews.length : 0} (Reviews)
              </p>
            </div>

            <div className="border border-gray-600 rounded-lg flex justify-between pl-3 pr-3">
              <div className="p-1">
                <p className="block text-gray-400">Monthly rent</p>
                <h3 className="text-white text-3xl">Rs. {property.rent}</h3>
              </div>
              <div className="p-1 text-gray-400">
                <p className="block">Bhk</p>
                <h3 className="text-white text-3xl">{property.bhk} bhk</h3>
              </div>
              <div className="p-1 text-gray-400">
                <p className="block">Floor</p>
                <h3 className="text-white text-3xl">{property.floor}</h3>
              </div>
            </div>
          </div>

          <div className="border-1 bg-white rounded-lg w-1/4 p-4">
            <div className="flex justify-between">
              <p className="text-black text-lg font-semibold">
                Request a visit
              </p>
              <div className="flex">
                <CiShare2 className="text-[#2E6A64] mt-1" />
                <IoIosAdd className="mt-1" />
                <CiHeart className="text-[#FF0B0B] mt-1" />
              </div>
            </div>
            <div className="flex">
              <img src={profile} alt="owner" className="h-8 w-8 inline" />
              <p className="pt-1 pl-3 text-gray-800">{property.ownerName}</p>
            </div>
            <div>
              <p className="block text-gray-400">
                {property.ownersContactNumber}
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

        <Flow2b propertyData={property} />
      </div> */}
    </>
  );
};

export default Flow2a;
