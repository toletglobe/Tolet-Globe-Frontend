import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import userIcon from "../../assets/user-icon.png";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/store/authSlice";
import { IoMdClose } from "react-icons/io";
import { HiUser } from "react-icons/hi";
import {
  Bars3Icon,
  ComputerDesktopIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

const NavBar = () => {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [showMenu, setShowMenu] = useState(false);
  const [activeNavbarMenu, setActiveNavbarMenu] = useState(null);

  const userInfo = authState?.userData || {};
  const [imgError, setImgError] = useState(false);
  const profilePicture =
    imgError || !userInfo?.profilePicture ? userIcon : userInfo.profilePicture;

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  const handleLogout = () => {
    setShowMenu(false);
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out!");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/aboutus" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
    { label: "Property Listing", path: "/property-listing" },
  ];

  return (
    <div className="fixed top-0 w-full bg-[#232323] lg:bg-black flex items-center justify-between p-4 z-50 h-[63px] lg:h-[87px]">
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="lg:hidden flex items-center p-1 -ml-3"
      >
        <Bars3Icon className="text-white h-6 w-6" />
      </button>

      {/* Logo */}
      <div className="flex-shrink-0">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="h-14 lg:h-16" />
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center font-medium lg:text-sm space-x-6">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            onClick={() => setActiveNavbarMenu(link.label)}
          >
            <li
              className={`py-1 hover:bg-teal-500 hover:text-white hover:rounded-md text-md px-3 ${
                activeNavbarMenu === link.label
                  ? "bg-teal-500 text-white rounded-md"
                  : ""
              }`}
            >
              {link.label}
            </li>
          </NavLink>
        ))}
        <div>
          {authState.status ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                className="h-10 w-10 lg:h-12 lg:w-12 rounded-full"
                src={profilePicture}
                alt="User"
              />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-700 z-30 hidden group-hover:block">
                <div className="min-w-40 bg-white rounded flex flex-col gap-1 p-4">
                  <p className="flex items-center py-2 px-3 text-black cursor-default bg-gray-200 justify-start rounded">
                    <HiUser size={20} className="w-5 mr-2" />
                    {userInfo.firstName || "User"}
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
              className={`py-1 hover:bg-teal-500 hover:text-white px-3 hover:rounded-md text-md ${
                activeNavbarMenu === "login"
                  ? "bg-teal-500 text-white rounded-md"
                  : ""
              }`}
            >
              Login / Signup
            </button>
          )}
        </div>
      </ul>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#232323] text-white z-[1000] transition-transform transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-[#1a1a1a] flex items-center justify-between p-4 h-[63px]">
          <div className="w-8"></div>
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
    </div>
  );
};

export default NavBar;
