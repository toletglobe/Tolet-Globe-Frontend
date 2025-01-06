import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import userIcon from "../../assets/user-icon.png"; // Fallback image
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/store/authSlice";
import { IoMdClose } from "react-icons/io";
import { HiOutlineMenuAlt3, HiUser } from "react-icons/hi";
import {
  ArrowLeftStartOnRectangleIcon,
  ComputerDesktopIcon,
  // UserIcon,
} from "@heroicons/react/24/outline";

const NavBar = () => {
  // Move Redux state declarations to the top
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  // Then declare component state
  const [showMenu, setShowMenu] = useState(false);
  const [activeNavbarMenu, setActiveNavbarMenu] = useState("Home");

  // Add this effect to update activeNavbarMenu based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveNavbarMenu("Home");
    } else if (path === "/login") {
      setActiveNavbarMenu("login");
    } else {
      // Get the first segment of the path (ignoring parameters and query strings)
      const baseRoute = path.split("/")[1];
      const pageName = baseRoute
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setActiveNavbarMenu(pageName);
    }
  }, [location]);

  const userInfo = authState?.userData || {}; // Extract userData from authState

  const handleLogout = () => {
    setShowMenu(false);
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out!");
  };

  // Array of navigation links
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Service", path: "/service" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
    { label: "About Us", path: "/aboutus" },
    { label: "Property Listing", path: "/property-listing" },
  ];

  // Add error handling for profile picture
  const [imgError, setImgError] = useState(false);

  const profilePicture =
    imgError || !userInfo?.profilePicture ? userIcon : userInfo.profilePicture;

  return (
    <div className="bg-black flex items-center justify-between p-4">
      {/* Logo */}
      <div>
        <NavLink to="/">
          <img src={logo} alt="Logo" className="h-12" />
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <ul className="lg:flex items-center gap-4 font-medium hidden">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            onClick={() => setActiveNavbarMenu(link.label)}
          >
            <li
              className={`py-1 hover:bg-teal-500 hover:text-white px-3 hover:rounded-full ${
                activeNavbarMenu === link.label
                  ? "bg-teal-500 text-white rounded-full"
                  : ""
              }  `}
            >
              {link.label}
            </li>
          </NavLink>
        ))}
        <div>
          {authState.status && token ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                className="w-10 rounded-full"
                src={profilePicture}
                alt="User"
                onError={() => setImgError(true)}
              />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-700 z-30 hidden group-hover:block">
                <div className="min-w-40 bg-white rounded shadow-lg flex flex-col gap-1 p-4">
                  <p className="flex items-center py-2 px-3 text-black cursor-default bg-gray-200 justify-start rounded">
                    <HiUser size={20} className="w-5 mr-2" />
                    {userInfo.firstName || "User"} {/* Fixed fallback */}
                  </p>
                  <p
                    onClick={() => navigate("/landlord-dashboard")}
                    className="flex items-center py-2 px-3 hover:bg-gray-100 cursor-pointer justify-start rounded"
                  >
                    <ComputerDesktopIcon className="w-5 mr-2" />
                    Dashboard
                  </p>
                  <p
                    onClick={handleLogout}
                    className="flex items-center py-2 px-3 hover:bg-red-100 cursor-pointer justify-start text-red-500 rounded"
                  >
                    <ArrowLeftStartOnRectangleIcon className="w-5 mr-2" />
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setActiveNavbarMenu("login");
                navigate("/login");
              }}
              className={`py-1 hover:bg-teal-500 hover:text-white px-3 hover:rounded-full ${
                activeNavbarMenu === "login"
                  ? "bg-teal-500 text-white rounded-full"
                  : ""
              }  `}
            >
              Login
            </button>
          )}
        </div>
      </ul>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-black text-white z-50 transition-transform transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <img
            src={logo}
            className="h-12 cursor-pointer"
            onClick={() => setShowMenu(false)}
            alt="Logo"
          />
          <button onClick={() => setShowMenu(false)}>
            <IoMdClose size={25} />
          </button>
        </div>
        <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              onClick={() => setShowMenu(false)}
              to={link.path}
            >
              {link.label}
            </NavLink>
          ))}

          {/* Profile Information for Mobile View */}
          {authState.status && token ? (
            <div className="flex flex-col items-center mt-5">
              <img
                className="w-16 h-16 rounded-full"
                src={profilePicture}
                alt="User"
                onError={() => setImgError(true)}
              />
              <p className="text-base font-medium mt-2">
                {userInfo.firstName || "User"}
              </p>
              <button
                onClick={() => {
                  navigate("/landlord-dashboard");
                  setShowMenu(false);
                }}
                className="mt-3 bg-gray-200 text-black px-6 py-2 rounded-full"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="mt-2 bg-red-500 text-white px-6 py-2 rounded-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="mt-3 bg-teal-500 text-white px-4 py-1 rounded-full"
            >
              Login
            </button>
          )}
        </ul>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="lg:hidden flex items-center p-2"
      >
        <HiOutlineMenuAlt3 size={25} />
      </button>
    </div>
  );
};

export default NavBar;
