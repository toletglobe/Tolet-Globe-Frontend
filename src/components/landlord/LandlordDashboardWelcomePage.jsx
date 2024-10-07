import propertyimage1 from "../../assets/property/blog-1.png";
import propertyimage2 from "../../assets/property/blog-2.jpg";
import propertyimage3 from "../../assets/property/blog-3.jpg";

import { CiHeart, CiShare2 } from "react-icons/ci";
import { MdMoreVert } from "react-icons/md";

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";

const LandlordDashboard = () => {
  const phoneRef = useRef(null);
  const navigate = useNavigate();
  const phone = 8707727347;
  const [showNumber, setShowNumber] = useState(false);

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (phoneRef.current && !event.target.closest(".contact-support-box")) {
        setShowNumber(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // States to track liked status for each property
  const [likedProperties, setLikedProperties] = useState([false, false, false]);

  // Handle like button click
  // const handleLikeClick = (index) => {
  //   const updatedLikes = likedProperties.map((liked, i) =>
  //     i === index ? !liked : liked
  //   );
  //   setLikedProperties(updatedLikes);
  // };

  const cardContent = [
    {
      id: 1,
      image: propertyimage1,
      name: "Name",
      location: "Gomti Nagar, Lucknow, India",
      price: "Price",
    },
    {
      id: 2,
      image: propertyimage2,
      name: "Name",
      location: "Gomti Nagar, Lucknow, India",
      price: "Price",
    },
    {
      id: 3,
      image: propertyimage3,
      name: "Name",
      location: "Gomti Nagar, Lucknow, India",
      price: "Price",
    },
    {
      id: 4,
      image: propertyimage3,
      name: "Name",
      location: "Gomti Nagar, Lucknow, India",
      price: "Price",
    },
    {
      id: 5,
      image: propertyimage2,
      name: "Name",
      location: "Gomti Nagar, Lucknow, India",
      price: "Price",
    },
    {
      id: 6,
      image: propertyimage1,
      name: "Name",
      location: "Gomti Nagar, Lucknow, India",
      price: "Price",
    },
    {
      id: 7,
      image: propertyimage1,
      name: "Name",
      location: "Gomti Nagar, Lucknow, India",
      price: "Price",
    },
  ];

  const cards = cardContent.map((card) => (
    <div key={card.id} className=" bg-black p-4 rounded-md">
      <img
        src={card.image}
        alt="Property"
        className=" relative  h-[200px] w-full object-cover rounded-md  mb-4"
      />
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{card.name}</h3>

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
      <p className="text-gray-400">{card.location}</p>
      <p className="text-gray-400 mt-1">{card.price}</p>
    </div>
  ));

  return (
    <div className="flex-1 bg-black text-white">
      {/* Header (Welcome Message) */}
      <div className="mt-5 mb-8">
        <h1 className="text-4xl font-bold">
        {authState.userData ? authState.userData.firstName?.charAt(0).toUpperCase() + authState.userData.firstName?.slice(1).toLowerCase() : "User"}! Welcome to your Landlord Dashboard
        </h1>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-col gap-y-8">
        <h2 className="text-xl font-bold text-left">Quick Actions</h2>
        <div className="flex justify-between items-center border-[1.13px] border-[#C8A117] p-[22.5px] rounded-xl">
          <div>
            <h2 className="text-lg font-bold text-left">Add a new property</h2>
            <p className="text-gray-400">
              Easily add a property to your account
            </p>
          </div>
          <button
            className="bg-gray-800 text-white py-2 px-6 rounded cursor-pointer"
            onClick={() => {
              navigate("/landlord-dashboard", {
                state: { content: "AddProperty" },
              });
            }}
          >
            Add Property
          </button>
        </div>

        <div className="flex justify-between items-center border-[1.13px] border-[#C8A117] p-[22.5px] rounded-xl">
          <div>
            <h2 className="text-lg font-bold text-left">
              Get help with an issue
            </h2>
            <p className="text-lg leading-7 text-[#ABADB0]">
              Need help with something? We're here to help
            </p>
          </div>
          <div className="relative">
            <button
              className="bg-gray-800 text-white py-2 px-6 rounded flex items-center cursor-pointer contact-support-box"
              onClick={() => {
                setShowNumber(!showNumber);
              }}
            >
              <span className="mr-2">🎧</span> Contact Support
            </button>

            {showNumber && (
              <div
                ref={phoneRef}
                className="absolute w-[100%] h-[100%] border-[1.5px] border-gray-500 bg-gray-800 text-white py-2 px-6 rounded flex justify-between"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                {phone}
                <FontAwesomeIcon
                  icon={faCopy}
                  className="mt-[2px] cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(`${phone}`);
                    setShowNumber(false);
                  }}
                ></FontAwesomeIcon>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Recent Properties */}
      <div className="mt-8">
        <h2 className="text-2xl text-left font-semibold mb-4">
          Recent Properties
        </h2>
        <div className="grid grid-cols-3">
          {cards}

          {/* import MyProperty */}
          {/* <MyProperty /> */}
        </div>
        <div className="flex justify-end mt-6">
          <button className="bg-gray-800 text-white py-2 px-4 rounded">
            View all (3)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
