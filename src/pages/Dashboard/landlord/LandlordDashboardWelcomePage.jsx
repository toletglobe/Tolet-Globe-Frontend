// import propertyimage1 from "../../../assets/property/blog-1.png";
// import propertyimage2 from "../../../assets/property/blog-2.jpg";
// import propertyimage3 from "../../../assets/property/blog-3.jpg";

import { CiHeart, CiShare2 } from "react-icons/ci";
import { MdMoreVert } from "react-icons/md";

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCopy } from "@fortawesome/free-solid-svg-icons";
// import {Link} from "react-router-dom"
import { useSelector } from "react-redux";
import Service from "../../../config/config";

const LandlordDashboardWelcomePage = () => {
  const [myProperties, setMyProperties] = useState([]);
  const authState = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        if (!authState?.userData?.id) {
          return;
        }
        const properties = await Service.fetchMyProperties(
          authState.userData.id
        );
        setMyProperties(properties); // Store the fetched data in backendData
      } catch (error) {
        console.log("this is the error", error);
      }
    };

    fetchMyProperties();
  }, [authState?.userData?.id]);

  const phoneRef = useRef(null);
  const navigate = useNavigate();
  const phone = 8707727347;
  const [showNumber, setShowNumber] = useState(false);

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

  const cards = myProperties.map((property) => (
    <div key={property._id} className=" bg-black p-4 rounded-md sm:px-1 py-4">
      <img
        src={property.images[0]}
        alt="Property"
        className=" relative  h-[200px] w-full object-cover rounded-md  mb-4 hover:cursor-pointer"
        onClick={() => navigate(`/property/${property.slug}`)}
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
    <div className="bg-black text-white">
      {/* Header (Welcome Message) */}
      <div className="mb-8 sm:text-center xl:mt-10 xl:mb-6">
        <h1 className="text-4xl font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-left">
          {authState.userData
            ? authState.userData.firstName?.charAt(0).toUpperCase() +
              authState.userData.firstName?.slice(1).toLowerCase()
            : "User"}
          ! Welcome to your Dashboard.
        </h1>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-col gap-y-8 xl:gap-y-7">
        <h2 className="text-xl font-bold sm:text-lg text-center md:text-xl lg:text-2xl xl:text-left xl:text-lg">
          Quick Actions
        </h2>
        <div className="flex justify-between items-center border-[1.13px] border-[#C8A117] p-[22.5px] rounded-xl sm:flex-col lg:flex-row lg:w-[100%] lg:p-2 xl:p-4">
          <div>
            <h2 className="text-lg font-bold text-left sm:text-center lg:text-xl xl:text-base xl:text-left px-2">
              Add a new property
            </h2>
            <p className="text-gray-400 py-2 sm:text-sm text-center md:text-base lg:text-lg xl:text-sm xl:text-left px-2 xl:py-1">
              Easily add a property to your account
            </p>
          </div>
          <Link
            to="add-properties"
            className="bg-gray-800 text-white py-2 px-6 rounded cursor-pointer"
          >
            Add Property
          </Link>
        </div>

        <div className="flex justify-between items-center border-[1.13px] border-[#C8A117] p-[22.5px] rounded-xl sm:flex-col lg:flex-row lg:w-[100%] lg:p-2 xl:p-4">
          <div>
            <h2 className="text-lg font-bold text-left sm:text-center lg:text-xl xl:text-base xl:text-left px-2">
              Get help with an issue
            </h2>
            <p className="text-lg leading-7 text-gray-400 py-2 sm:text-sm text-center md:text-base lg:text-lg px-2 xl:text-sm xl:text-left xl:py-1">
              Need help with something? We're here to help
            </p>
          </div>
          <div className="relative">
            <button
              className="bg-gray-800 text-white py-2 px-6 rounded flex items-center cursor-pointer contact-support-box"
              onClick={() => {
                navigate("/contact");
              }}
            >
              <span className="mr-2">🎧</span>
              <span className="sm:text-sm md:text-base lg:text-lg xl:text-sm">
                {" "}
                Contact Support{" "}
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Recent Properties */}
      <div className="mt-8">
        <h2 className="text-2xl text-left font-semibold mb-4 sm:text-center xl:text-lg xl:text-left">
          Recent Properties
        </h2>
        {myProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-2 gap-2 xl:grid-cols-3">
              {cards.slice(0, 3)}

              {/* import MyProperty */}
              {/* <MyProperty /> */}
            </div>
            <div className="flex justify-end mt-6">
              <Link
                to="my-properties"
                className="bg-gray-800 text-white py-2 px-4 rounded"
              >
                View all ({myProperties.length})
              </Link>
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center text-2xl text-bold py-4 sm:text-lg md:text-xl xl:text-xl">
            You have no properties yet !
          </p>
        )}
      </div>
    </div>
  );
};

export default LandlordDashboardWelcomePage;
