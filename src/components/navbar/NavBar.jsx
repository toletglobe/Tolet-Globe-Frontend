import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="z-0">
      <div className="w-full bg-black top-0 flex justify-between fixed items-center px-3 py-1">
        <div>
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-16 lg:h-12 ml-10 lg:ml-0" />
          </Link>
        </div>
        <div className="flex flex-row">
          <div className=" flex justify-end">
            <button
              className="text-white block lg:hidden"
              onClick={() =>
                document
                  .getElementById("basic-navbar-nav")
                  .classList.toggle("hidden")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          id="basic-navbar-nav"
          className="hidden lg:flex lg:items-center lg:w-auto w-full"
        >
          <ul className="lg:flex lg:items-center lg:justify-between text-base text-gray-300 pt-4 lg:pt-0">
            <li>
              <Link
                to="/"
                className={`block px-5 lg:inline-block mt-4 lg:mt-0 mx-2 ${
                  activeLink === "home"
                    ? "text-white bg-teal-500 rounded-md"
                    : ""
                } hover:bg-[#c8a21c] hover:rounded-md`}
                onClick={() => handleNavLinkClick("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/service"
                className={`block px-5 lg:inline-block mt-4 lg:mt-0 mx-2 ${
                  activeLink === "service"
                    ? "text-white bg-teal-500 rounded-md"
                    : ""
                } hover:bg-[#c8a21c] hover:rounded-md`}
                onClick={() => handleNavLinkClick("service")}
              >
                Service
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={`block px-5 lg:inline-block mt-4 lg:mt-0 mx-2 ${
                  activeLink === "blog"
                    ? "text-white bg-teal-500 rounded-md"
                    : ""
                } hover:bg-[#c8a21c] hover:rounded-md`}
                onClick={() => handleNavLinkClick("blog")}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block px-5 lg:inline-block mt-4 lg:mt-0 mx-2 ${
                  activeLink === "contact"
                    ? "text-white bg-teal-500 rounded-md"
                    : ""
                } hover:bg-[#c8a21c] hover:rounded-md`}
                onClick={() => handleNavLinkClick("contact")}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className={`block px-5 lg:inline-block mt-4 lg:mt-0 mx-2 ${
                  activeLink === "aboutus"
                    ? "text-white bg-teal-500 rounded-md"
                    : ""
                } hover:bg-[#c8a21c] hover:rounded-md`}
                onClick={() => handleNavLinkClick("about")}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/property"
                className={`block px-5 lg:inline-block mt-4 lg:mt-0 ${
                  activeLink === "propertyListing"
                    ? "text-white bg-teal-500 rounded-md"
                    : ""
                } hover:bg-[#c8a21c] hover:rounded-md`}
                onClick={() => handleNavLinkClick("propertyListing")}
              >
                Property Listing
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={`block px-5 lg:inline-block mt-4 lg:mt-0 ${
                  activeLink === "login"
                    ? "text-white bg-teal-500 rounded-md"
                    : ""
                } hover:bg-[#c8a21c] hover:rounded-md`}
                onClick={() => handleNavLinkClick("login")}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
