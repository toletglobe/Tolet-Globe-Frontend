import { Route, Routes } from "react-router-dom";

import { Sidebar, Main, BlogPost, PropertyListing } from "./index";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Admin = () => {
  const [activeLink, setActiveLink] = useState("admin");
  const [showSidebar, setShowSidebar] = useState(false);

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 min-h-screen">
      <div
        className={`fixed inset-0 z-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
          showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-52 transform bg-gray-800 shadow-lg transition-transform duration-300 md:relative md:translate-x-0 md:shadow-none ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <Sidebar
            activeLink={activeLink}
            handleNavLinkClick={handleNavLinkClick}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <button
          className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={toggleSidebar}
        >
          {showSidebar ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
        <div className="flex-1 rounded-lg h-auto pb-20">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/blogpost" element={<BlogPost />} />
            <Route path="/propertylisting" element={<PropertyListing />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
