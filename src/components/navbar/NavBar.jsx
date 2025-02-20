import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import userIcon from "../../assets/user-icon.png";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/store/authSlice";
import { IoMdClose } from "react-icons/io";
import { HiOutlineMenuAlt3, HiUser } from "react-icons/hi";
import { Bars3Icon, ComputerDesktopIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

const NavBar = () => {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [activeNavbarMenu, setActiveNavbarMenu] = useState(null); // ✅ Added missing state

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
    { label: "Properties Listing", path: "/property-listing" },
    { label: "About", path: "/aboutus" },
    { label: "Contact", path: "/contact" },
    { label: "Blog", path: "/blog" },
  ];

  return (
    <div className="bg-[#232323] lg:bg-black flex items-center justify-between p-4 mx-auto relative z-[999]">
      {/* Mobile Menu Toggle Button */}
      <button onClick={() => setShowMenu(!showMenu)} className="lg:hidden flex items-center p-1 -ml-3">
        <Bars3Icon className="text-white h-6 w-6" />
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
          <NavLink key={index} to={link.path} onClick={() => setActiveNavbarMenu(link.label)}>
            <li
              className={`py-1 hover:text-yellow-500 text-lg px-3 hover:rounded-full ${
                activeNavbarMenu === link.label ? "text-yellow-500 rounded-full" : ""
              }`}
            >
              {link.label}
            </li>
          </NavLink>
        ))}
        <div>
          {authState.status ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img className="h-12 w-12 mr-5 rounded-full" src={userIcon} alt="User" />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-700 z-30 hidden group-hover:block">
                <div className="min-w-40 bg-white rounded shadow-lg flex flex-col gap-1 p-4">
                  <p className="flex items-center py-2 px-3 text-black cursor-default bg-gray-200 justify-start rounded">
                    <HiUser size={20} className="w-5 mr-2" />
                    {authState.user?.firstName || "User"}
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
                activeNavbarMenu === "login" ? "bg-teal-500 text-white rounded-full" : ""
              }`}
            >
              Login
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
        <div className="bg-[#1a1a1a] flex items-center justify-between p-4">
          <div className="w-8"></div>
          <img src={logo} className="h-12 cursor-pointer" onClick={() => setShowMenu(false)} alt="Logo" />
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
