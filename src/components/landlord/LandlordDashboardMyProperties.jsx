import propertyimage1 from "../../assets/property/blog-1.png";
import propertyimage2 from "../../assets/property/blog-2.jpg";
import propertyimage3 from "../../assets/property/blog-3.jpg";
import Service from "../../config/config";

import { CiHeart, CiShare2 } from "react-icons/ci";
import { MdMoreVert } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyProperties({ myProperties }) {
  const navigate = useNavigate();
  const cards = myProperties.map((property) => (
    <div
      key={property._id}
      className=" bg-black p-4 rounded-md hover:cursor-pointer"
      onClick={() => navigate(`/property/${property.slug}`)}
    >
      <img
        src={property.images[0]}
        alt="Property"
        className=" relative  h-[200px] w-full object-cover rounded-md  mb-4"
      />
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {property?.firstName} {property?.lastName}
        </h3>

        {/* Icons Section */}
        <div className="icon-box flex mr-6 p-2">
          <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "10px" }}
          >
            <CiHeart className="card_icon text-red-500 bg-[#3E3E3E4D] relative" />
          </a>
          <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "20px" }}
          >
            <CiShare2
              className="card_icon bg-[#3E3E3E4D]"
              style={{ color: "#40B5A8" }}
            />
          </a>
          <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "30px" }}
          >
            <MdMoreVert
              className="card_icon bg-[#3E3E3E4D]"
              style={{ color: "#808080", fontSize: "16px" }} // Adjust size if needed
            />
          </a>
        </div>
      </div>
      <p className="text-gray-400">
        {property.locality}, {property.city}, India
      </p>
      <p className="text-gray-400 mt-1">Rs. {property.rent}</p>
    </div>
  ));

  return (
    <>
      <div className="mt-8 flex justify-start space-x-4 mb-6">
        {/* Filter Buttons */}
        <button className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600">
          Available
        </button>
        <button className="px-4 py-2 bg-white text-black font-semibold rounded-md border border-gray-400 hover:bg-gray-200">
          Rent Out
        </button>
      </div>

      <div className="mt-8">
        {myProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{cards}</div>
        ) : (
          <h6 className="text-gray-400 text-center text-3xl font-bold ">
            You have no properties yet!
          </h6>
        )}
      </div>
    </>
  );
}
