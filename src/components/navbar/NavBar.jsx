import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import {
  ArrowLeftStartOnRectangleIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatarRef = useRef();

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out!");
  };

  // Handle click outside for avatar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [avatarRef]);

  return (
    <nav className="bg-black z-50 fixed w-full top-0 flex justify-between items-center px-5 py-3 shadow-lg">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-12" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
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

      {/* Nav Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:flex lg:items-center lg:justify-between w-full lg:w-auto lg:static absolute top-16 left-0 lg:top-0 lg:bg-transparent bg-black lg:p-0 p-5 lg:flex-row flex-col items-center`}
      >
        <ul className="lg:flex lg:space-x-6 text-gray-300">
          <li>
            <Link
              to="/"
              className={`block px-5 py-2 ${
                activeLink === "home" ? "text-white bg-teal-500 rounded-md" : ""
              } hover:bg-teal-500 hover:rounded-md`}
              onClick={() => handleNavLinkClick("home")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/service"
              className={`block px-5 py-2 ${
                activeLink === "service"
                  ? "text-white bg-teal-500 rounded-md"
                  : ""
              } hover:bg-teal-500 hover:rounded-md`}
              onClick={() => handleNavLinkClick("service")}
            >
              Service
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className={`block px-5 py-2 ${
                activeLink === "blog" ? "text-white bg-teal-500 rounded-md" : ""
              } hover:bg-teal-500 hover:rounded-md`}
              onClick={() => handleNavLinkClick("blog")}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`block px-5 py-2 ${
                activeLink === "contact"
                  ? "text-white bg-teal-500 rounded-md"
                  : ""
              } hover:bg-teal-500 hover:rounded-md`}
              onClick={() => handleNavLinkClick("contact")}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/aboutus"
              className={`block px-5 py-2 ${
                activeLink === "aboutus"
                  ? "text-white bg-teal-500 rounded-md"
                  : ""
              } hover:bg-teal-500 hover:rounded-md`}
              onClick={() => handleNavLinkClick("aboutus")}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/property"
              className={`block px-5 py-2 ${
                activeLink === "propertyListing"
                  ? "text-white bg-teal-500 rounded-md"
                  : ""
              } hover:bg-teal-500 hover:rounded-md`}
              onClick={() => handleNavLinkClick("propertyListing")}
            >
              Property Listing
            </Link>
          </li>
        </ul>

        {/* User avatar */}
        {authState.status && localStorage.getItem("token") ? (
          <div className="relative mt-4 lg:mt-0" ref={avatarRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-10 h-10 text-white bg-teal-500 rounded-full"
            >
              {authState.userData
                ? authState.userData.username.charAt(0).toUpperCase()
                : "U"}
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <div className="text-center font-bold p-3">
                  {authState.userData
                    ? authState.userData.username.toUpperCase()
                    : "USER"}
                </div>
                <ul className="text-gray-900">
                  <li className="p-3 cursor-pointer hover:bg-gray-100 flex items-center">
                    <ComputerDesktopIcon className="w-5 h-5 mr-2" />
                    Dashboard
                  </li>
                  <li
                    className="p-3 cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={handleLogout}
                  >
                    <ArrowLeftStartOnRectangleIcon className="w-5 h-5 mr-2" />
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className={`block px-5 py-2 ${
              activeLink === "login" ? "text-white bg-teal-500 rounded-md" : ""
            } hover:bg-teal-500 hover:rounded-md`}
            onClick={() => handleNavLinkClick("login")}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
