import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LandlordPage = () => {
  // Static data
  const profile = {
    user_id: 1,
    name: "John Doe",
    role: "Property Owner",
    description: "Managing and renting properties since 2010",
    contact: "123-456-7890",
    email: "john.doe@example.com",
    location: "New York",
    searches: [
      {
        id: 1,
        name: "Search1",
        description: "2 Bedroom Apartment in Manhattan",
      },
      { id: 2, name: "Search2", description: "Studio Apartment in Brooklyn" },
      { id: 3, name: "Search3", description: "House with Garden" },
    ],
    inquiries: [
      {
        id: 1,
        name: "Sam Heugen",
        message: "Interested in your listed property in Central Park",
      },
      {
        id: 2,
        name: "Micheal Obama",
        message: "Questions about the rental process",
      },
    ],
  };

  const [searches, setSearches] = useState(profile.searches);
  const [inquiries, setInquiries] = useState(profile.inquiries);

  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // No need for axios call; using static data
    // Set profile, searches, and inquiries from static data
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-white shadow-md w-full min-h-screen flex flex-col">
      <nav className="bg-white shadow-md p-4 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-400 rounded-full mr-2"></div>{" "}
            {/* Placeholder for Logo */}
            <div className="text-xl font-bold whitespace-nowrap text-black">
              To-Let Globe
            </div>
          </div>
          <div className="space-x-6 flex justify-end w-full">
            <a href="/" className="text-gray-600 hover:text-black">
              Home
            </a>
            <a href="/search" className="text-gray-600 hover:text-black">
              Search
            </a>
            <a href="/profile" className="text-gray-600 hover:text-black">
              User Profile
            </a>
            <div className="relative">
              <input
                type="text"
                placeholder="Search in site"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              />
              <button className="absolute right-2 top-2">
                {/* Search icon (optional) */}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col md:flex-row items-start md:items-center bg-gray-800 text-white p-6">
        <div className="w-24 h-24 rounded-full bg-gray-400"></div>{" "}
        {/* Placeholder for Profile Image */}
        <div className="ml-6 mt-2 md:ml-10 flex flex-col">
          <h2 className="text-2xl text-left font-bold">{profile.name}</h2>
          <div className="border p-2 bg-gray-700 text-white mt-2 w-40">
            {profile.role}
          </div>
          <p className="mt-2">{profile.description}</p>
        </div>
        <button className="ml-auto bg-black text-white py-2 px-4 rounded-md mt-4 md:mt-0">
          Edit Profile
        </button>
      </div>

      {/* Divider Line */}
      <div className="my-8 border-t border-gray-300"></div>

      <div>
        <h3 className="text-xl font-bold mb-4 text-center text-black">
          Personal Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span role="img" aria-label="location">
                🏠
              </span>
            </div>
            <p className="mt-2 text-center text-gray-500">Location</p>
            <p className="text-lg font-semibold text-black">
              {profile.location}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span role="img" aria-label="contact">
                📞
              </span>
            </div>
            <p className="mt-2 text-center text-gray-500">Contact</p>
            <p className="text-lg font-semibold text-black">
              {profile.contact}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span role="img" aria-label="email">
                ✉️
              </span>
            </div>
            <p className="mt-2 text-center text-gray-500">Email</p>
            <p className="text-lg font-semibold text-black">{profile.email}</p>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="my-8 border-t border-gray-300"></div>

      <div className="flex flex-col items-center mb-4">
        <h3 className="text-xl font-bold mb-4 text-black ">Saved Searches</h3>
        <button
          className="bg-black text-white py-2 px-4 rounded-md mb-4"
          onClick={() => navigate("/search")} // Navigate to /search on button click
        >
          View All Searches
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black text-center">
          {searches.map((search) => (
            <div
              key={search.id}
              className="p-4 border rounded-md shadow-sm bg-gray-50"
            >
              <p className="font-bold">{search.name}</p>
              <p>{search.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-8 border-t border-gray-300 "></div>

      <div className="mt-8 flex flex-col md:flex-row justify-between text-black">
        <h3 className="text-xl flex items-center justify-center font-bold mb-4 md:w-1/3">
          Property Inquiries
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-2/3">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="w-full p-4 border rounded-md shadow-sm bg-gray-50 flex items-center gap-4" // Added gap-4 for spacing between circle and text
            >
              <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>{" "}
              {/* Placeholder for User Image */}
              <div className="text-left">
                <div className="flex items-center">
                  <p className="font-bold">{inquiry.name}</p>
                  <span className="ml-2 text-yellow-500">★★★★★</span>{" "}
                  {/* Placeholder for rating */}
                </div>
                <p>{inquiry.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-8 border-t border-gray-300"></div>

      <div className="h-40 bg-gray-100 py-8 text-center items-center text-black">
        <Slider {...settings} className="custom-slider">
          <div>
            <p>Find your perfect rental property with To-Let Globe!</p>
          </div>
          <div>
            <p>Discover your new home today!</p>
          </div>
          <div>
            <p>Explore top listings in your area!</p>
          </div>
        </Slider>
      </div>

      <div className="my-8 border-t border-gray-300"></div>

      {/* Footer Links */}
      <div className="flex justify-center space-x-8 text-sm mb-12">
        {" "}
        {/* Added mb-12 to create gap after footer */}
        <a href="#" className="text-gray-500">
          Terms of Service
        </a>
        <a href="#" className="text-gray-500">
          Privacy Policy
        </a>
        <a href="#" className="text-gray-500">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default LandlordPage;
