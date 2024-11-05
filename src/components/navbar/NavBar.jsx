import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import userIcon from "../../assets/user-icon.png"; // Fallback image
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { IoMdClose } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import {
  ArrowLeftStartOnRectangleIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

const NavBar = ({ userInfo }) => {
  const [showMenu, setShowMenu] = useState(false);
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    setShowMenu(false);
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out!");
  };

  return (
    <div className="bg-black flex items-center justify-between p-4 mb-5">
      <div>
        <NavLink to="/">
          <img src={logo} alt="Logo" className="h-12" />
        </NavLink>
      </div>
      <ul className="md:flex items-center gap-5 font-medium hidden">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-teal-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/service">
          <li className="py-1">Service</li>
          <hr className="border-none outline-none h-0.5 bg-teal-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/blog">
          <li className="py-1">Blog</li>
          <hr className="border-none outline-none h-0.5 bg-teal-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-teal-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/aboutus">
          <li className="py-1">About Us</li>
          <hr className="border-none outline-none h-0.5 bg-teal-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/property-listing">
          <li className="py-1">Property Listing</li>
          <hr className="border-none outline-none h-0.5 bg-teal-500 w-3/5 m-auto hidden" />
        </NavLink>
        <div>
          {authState.status && token ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                className="w-10 rounded-full"
                src={userInfo?.profilePicture || userIcon}
                alt="User"
              />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-40 bg-gray-50 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => navigate("/landlord-dashboard")}
                    className=" flex items-center py-1 hover:text-black cursor-pointer"
                  >
                    <ComputerDesktopIcon className="w-5 mr-3" />
                    Dashboard
                  </p>
                  <p
                    onClick={handleLogout}
                    className=" flex items-center py-1 hover:text-black cursor-pointer"
                  >
                    <ArrowLeftStartOnRectangleIcon className="w-5 mr-3" />
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-teal-500 text-white px-4 py-1 rounded-full hidden md:block"
            >
              Login
            </button>
          )}
        </div>
      </ul>

      {/* ---- Mobile Menu ---- */}
      <div
        className={`md:hidden fixed inset-0 bg-black text-white z-100 transition-transform transform ${
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
          <NavLink onClick={() => setShowMenu(false)} to="/">
            Home
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/service">
            Service
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/blog">
            Blog
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact">
            Contact
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/aboutus">
            About Us
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/property-listing">
            Property Listing
          </NavLink>

          {/* ---- Profile Information for Mobile View ---- */}
          {authState.status && token ? (
            <div className="flex flex-col items-center mt-5">
              <img
                className="w-16 h-16 rounded-full"
                src={userInfo?.profilePicture || userIcon}
                alt="User"
              />
              <p className="text-base font-medium mt-2">
                {userInfo?.firstName || "User"}
              </p>
              <button
                onClick={() => {
                  navigate("/landlord-dashboard");
                  setShowMenu(false);
                }}
                className="mt-3 bg-gray-200 text-black px-6 py-2 rounded-full "
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="mt-2 bg-red-500 text-white px-6 py-2 rounded-full "
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
              className="mt-3 bg-teal-500 text-white  px-4 py-1 rounded-full"
            >
              Login
            </button>
          )}
        </ul>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="md:hidden flex items-center p-2"
      >
        <HiOutlineMenuAlt3 size={25} />
      </button>
    </div>
  );
};

export default NavBar;
