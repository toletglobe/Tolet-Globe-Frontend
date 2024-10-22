import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatarRef = useRef();

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Close the dropdown when a nav link is clicked
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out!");
    setIsMenuOpen(false); // Close the dropdown when logging out
  };

  // Handling click outside avatar dropdown
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

  const handleDropdownSelection = (path) => {
    navigate(path); // Navigate to the desired path
    setIsMenuOpen(false); // Close the dropdown when a selection is made
  };

  return (
    <nav className="z-50">
      <div className="w-full bg-black top-0 flex justify-between fixed items-center px-5 lg:px-20 py-8">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-12 lg:h-16" // Larger on web and smaller on mobile
            />
          </Link>
        </div>

        {/* Navigation buttons on the right side for desktop */}
        <div className="hidden lg:flex space-x-6 items-center ml-24"> {/* Added ml-24 for fixed large space between logo and buttons */}
          <Link
            to="/"
            className={`block px-5 text-gray-300 ${
              activeLink === "home" ? "text-white bg-teal-500 rounded-md" : ""
            }`}
            onClick={() => handleNavLinkClick("home")}
          >
            Home
          </Link>
          <Link
            to="/service"
            className={`block px-5 text-gray-300 ${
              activeLink === "service" ? "text-white bg-teal-500 rounded-md" : ""
            }`}
            onClick={() => handleNavLinkClick("service")}
          >
            Service
          </Link>
          <Link
            to="/blog"
            className={`block px-5 text-gray-300 ${
              activeLink === "blog" ? "text-white bg-teal-500 rounded-md" : ""
            }`}
            onClick={() => handleNavLinkClick("blog")}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className={`block px-5 text-gray-300 ${
              activeLink === "contact" ? "text-white bg-teal-500 rounded-md" : ""
            }`}
            onClick={() => handleNavLinkClick("contact")}
          >
            Contact
          </Link>
          <Link
            to="/aboutus"
            className={`block px-5 text-gray-300 ${
              activeLink === "aboutus" ? "text-white bg-teal-500 rounded-md" : ""
            }`}
            onClick={() => handleNavLinkClick("aboutus")}
          >
            About
          </Link>
          <Link
            to="/property"
            className={`block px-5 text-gray-300 ${
              activeLink === "propertyListing" ? "text-white bg-teal-500 rounded-md" : ""
            }`}
            onClick={() => handleNavLinkClick("propertyListing")}
          >
            Property Listing
          </Link>
          {authState.status === true && localStorage.getItem("token") ? (
            <Link
              to="/landlord-dashboard"
              className={`block px-5 text-gray-300 ${
                activeLink === "dashboard" ? "text-white bg-teal-500 rounded-md" : ""
              }`}
              onClick={() => handleNavLinkClick("dashboard")}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className={`block px-5 text-gray-300 ${
                activeLink === "login" ? "text-white bg-teal-500 rounded-md" : ""
              }`}
              onClick={() => handleNavLinkClick("login")}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu toggle button */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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

        {/* Mobile dropdown menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:hidden absolute top-24 right-0 bg-black w-full p-4 z-40`}
        >
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                to="/"
                className={`block px-5 text-gray-300 hover:bg-teal-500 hover:text-white rounded-md`}
                onClick={() => handleDropdownSelection("/")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/service"
                className={`block px-5 text-gray-300 hover:bg-teal-500 hover:text-white rounded-md`}
                onClick={() => handleDropdownSelection("/service")}
              >
                Service
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={`block px-5 text-gray-300 hover:bg-teal-500 hover:text-white rounded-md`}
                onClick={() => handleDropdownSelection("/blog")}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block px-5 text-gray-300 hover:bg-teal-500 hover:text-white rounded-md`}
                onClick={() => handleDropdownSelection("/contact")}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className={`block px-5 text-gray-300 hover:bg-teal-500 hover:text-white rounded-md`}
                onClick={() => handleDropdownSelection("/aboutus")}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/property"
                className={`block px-5 text-gray-300 hover:bg-teal-500 hover:text-white rounded-md`}
                onClick={() => handleDropdownSelection("/property")}
              >
                Property Listing
              </Link>
            </li>
            {authState.status === true && localStorage.getItem("token") ? (
              <li>
                <Link
                  to="/landlord-dashboard"
                  className={`block px-5 text-gray-300 hover:bg-teal-500 hover:text-white rounded-md`}
                  onClick={() => handleDropdownSelection("/landlord-dashboard")}
                >
                  Dashboard
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className={`block px-5 text-gray-300 hover:bg-teal-500 hover:text-white rounded-md`}
                  onClick={() => handleDropdownSelection("/login")}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
