// import { useState, useEffect } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import logo from "../../assets/logo.png";
// import userIcon from "../../assets/user-icon.png";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../redux/store/authSlice";
// import { IoMdClose } from "react-icons/io";
// import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import userIcon from "../../assets/user-icon.png";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/store/authSlice";
import { IoMdClose } from "react-icons/io";
import { HiOutlineMenuAlt3, HiUser } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

const NavBar = () => {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

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
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
    { label: "About Us", path: "/aboutus" },
    { label: "Property Listing", path: "/property-listing" },
  ];

  return (
    <div className="bg-gray-800 lg:bg-black fixed top-0 left-0 w-full z-[999] flex items-center justify-between px-[43px] h-[81px]">
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="lg:hidden flex items-center p-2"
      >
        <HiOutlineMenuAlt3 size={25} className="text-white" />
      </button>

      {/* Logo */}
      <div className="flex-shrink-0">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="h-12" />
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center font-medium lg:text-sm space-x-6">
        {navLinks.map((link, index) => (
          <NavLink key={index} to={link.path} className="hover:text-teal-400">
            <li>{link.label}</li>
          </NavLink>
        ))}
      </ul>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-800 text-white z-[1000] transition-transform transform ${
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
            <NavLink key={index} onClick={() => setShowMenu(false)} to={link.path}>
              {link.label}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
