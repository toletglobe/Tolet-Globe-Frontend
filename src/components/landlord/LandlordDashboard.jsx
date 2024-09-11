import logo from "../../assets/logo.png";
import profilepic from "../../assets/landlord/Round-Profile-Pic.png";
import propertyimage1 from "../../assets/property/blog-1.png";
import propertyimage2 from "../../assets/property/blog-2.jpg";
import propertyimage3 from "../../assets/property/blog-3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShareAlt,
  faEllipsisV,
  faArrowRightFromBracket,
  faPlus,
  faHouse,
  faChartSimple,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const LandlordDashboard = () => {
  // States to track liked status for each property
  const [likedProperties, setLikedProperties] = useState([false, false, false]);

  // Handle like button click
  const handleLikeClick = (index) => {
    const updatedLikes = likedProperties.map((liked, i) =>
      i === index ? !liked : liked
    );
    setLikedProperties(updatedLikes);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-5 flex flex-col">
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="h-16 lg:h-12 ml-10 lg:ml-0" />
        </div>
        <div className="flex flex-col space-y-4">
          <a href="#" className="flex items-center space-x-2 text-yellow-500">
            <FontAwesomeIcon icon={faChartSimple} className="text-xl" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faHouse} className="text-xl" />
            <span>My Properties</span>
          </a>
          <a href="#" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
            <span>Add Property</span>
          </a>
          <a href="#" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faGear} className="text-xl" />
            <span>Settings</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-red-500">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="text-xl"
            />
            <span>Logout</span>
          </a>
        </div>
      </div>

      <div className="flex-1 bg-black text-white p-10">
        {/* Header */}
        <div className="flex justify-end items-center space-x-8">
          <a href="#" className="text-yellow-500">
            Home
          </a>
          <a href="#">Properties Listing</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Blog</a>
          <img
            src={profilepic}
            alt="User"
            className="w-8 h-8 rounded-full ml-2"
          />
        </div>

        {/* Header (Welcome Message) */}
        <div className="p-10">
          <h1 className="text-3xl font-bold -mt-5">
            Welcome to your Landlord Dashboard
          </h1>
        </div>

        {/* Quick Actions */}
        <div className="px-10 space-y-6">
          <h2 className="text-xl font-semibold text-left">Quick Actions</h2>
          <div className="flex justify-between items-center border border-yellow-500 p-6 rounded-xl">
            <div>
              <h2 className="text-xl font-semibold text-left">
                Add a new property
              </h2>
              <p className="text-gray-400">
                Easily add a property to your account
              </p>
            </div>
            <button className="bg-gray-800 text-white py-2 px-6 rounded">
              Add Property
            </button>
          </div>

          <div className="flex justify-between items-center border border-yellow-500 p-6 rounded-xl">
            <div>
              <h2 className="text-xl font-semibold text-left">
                Get help with an issue
              </h2>
              <p className="text-gray-400">
                Need help with something? We're here to help
              </p>
            </div>
            <button className="bg-gray-800 text-white py-2 px-6 rounded flex items-center">
              <span className="mr-2">🎧</span> Contact Support
            </button>
          </div>
        </div>

        {/* Recent Properties */}
        <div className="px-10 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Properties</h2>
          <div className="grid grid-cols-3 gap-6">
            {/* Property Card 1 */}
            <div className="bg-black p-4 rounded-md">
              <img
                src={propertyimage1}
                alt="Property"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Name</h3>
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`cursor-pointer ${
                      likedProperties[0] ? "text-red-500" : "text-gray-500"
                    }`}
                    onClick={() => handleLikeClick(0)}
                  />
                  <FontAwesomeIcon
                    icon={faShareAlt}
                    className="text-green-500"
                  />
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    className="text-gray-500"
                  />
                </div>
              </div>
              <p className="text-gray-400">Gomti Nagar, Lucknow, India</p>
              <p className="text-gray-400">Price</p>
            </div>

            {/* Property Card 2 */}
            <div className="bg-black p-4 rounded-md">
              <img
                src={propertyimage2}
                alt="Property"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Name</h3>
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`cursor-pointer ${
                      likedProperties[1] ? "text-red-500" : "text-gray-500"
                    }`}
                    onClick={() => handleLikeClick(1)}
                  />
                  <FontAwesomeIcon
                    icon={faShareAlt}
                    className="text-green-500"
                  />
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    className="text-gray-500"
                  />
                </div>
              </div>
              <p className="text-gray-400">Gomti Nagar, Lucknow, India</p>
              <p className="text-gray-400">Price</p>
            </div>

            {/* Property Card 3 */}
            <div className="bg-black p-4 rounded-md">
              <img
                src={propertyimage3}
                alt="Property"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Name</h3>
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`cursor-pointer ${
                      likedProperties[2] ? "text-red-500" : "text-gray-500"
                    }`}
                    onClick={() => handleLikeClick(2)}
                  />
                  <FontAwesomeIcon
                    icon={faShareAlt}
                    className="text-green-500"
                  />
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    className="text-gray-500"
                  />
                </div>
              </div>
              <p className="text-gray-400">Gomti Nagar, Lucknow, India</p>
              <p className="text-gray-400">Price</p>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="bg-gray-800 text-white py-2 px-4 rounded">
              View all (3)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
