import propertyimage1 from "../../assets/property/blog-1.png";
import propertyimage2 from "../../assets/property/blog-2.jpg";
import propertyimage3 from "../../assets/property/blog-3.jpg";
import Service from "../../config/config";

import { CiHeart, CiShare2 } from "react-icons/ci";
import { MdMoreVert } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { FaRegCopy } from "react-icons/fa6";

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
          <Popup arrow={false}
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
                      <div className="bg-slate-50 text-black rounded-full flex flex-col shadow-xl py-2 px-2 scale-90 -ml-7">
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
      <div className="mt-8">
        {myProperties.length > 0 ? (
          <div className="grid grid-cols-3">{cards}</div>
        ) : (
          <h6 className="text-gray-400 text-center text-3xl font-bold ">
            You have no properties yet !
          </h6>
        )}
      </div>
    </>
  );
}
