import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "../redux/store/authSlice";

import {
  IoIosClose,
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { HiUser, HiOutlineDocumentText } from "react-icons/hi";
import { CiHome } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import { FaRss } from "react-icons/fa";
import {
  Bars3Icon,
  ComputerDesktopIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { MdLockOutline } from "react-icons/md";

import logo from "../assets/navbar/logo.png";
import userIcon from "../assets/propertyListing/user-icon.png";
import guestIcon from "../assets/navbar/guestProfile.webp";

const Navbar = () => {
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
    localStorage.clear();
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out!");
  };

  const handleAddProperty = () => {
    if (authState.status) {
      // User is logged in, navigate to Add Property page
      navigate("/landlord-dashboard/add-properties");
    } else {
      // User is not logged in, navigate to Login page
      navigate("/login");
      toast.error("Please log in to add a property!");
    }
  };

  const navLinks = [
    { label: "Home", path: "/", icon: CiHome },
    {
      label: "About Us",
      path: "/aboutus",
      icon: IoIosInformationCircleOutline,
    },
    { label: "Blog", path: "/blog", icon: FaRss },
    { label: "Contact", path: "/contact", icon: LuPhone },
    {
      label: "Property Listing",
      path: "/property-listing",
      icon: HiOutlineDocumentText,
    },
    {
      label: "+Add New Property",
      path: "/landlord-dashboard/add-properties",
      icon: IoAddOutline,
    },
  ];

  // sidebar start
  const linkStyle_1 =
    "sm:rounded-md px-3.5 py-2.5 max-w-full text-xl flex items-center gap-x-4 cursor-pointer md:max-w-80 md:min-h-11";

  const linkStyle_2 =
    "sm:rounded-md px-3.5 py-2.5 flex items-center gap-x-4 cursor-pointer";

  const [toggelSetting, setToggelSetting] = useState(false);
  const settingsRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        // setToggelSetting(false);
      }
    }
    console.log("setting :", toggelSetting);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [toggelSetting]);

  // ----------------- sidebar operations start -----------------
  const [sidebar, setSidebar] = useState(false);
  // ----------------- sidebar operations end -----------------

  // ----------------- setting direction start -----------------
  const [settingFlag, setSettingFlag] = useState(false);
  function setArrow() {
    setSettingFlag(!settingFlag);
  }
  // ----------------- setting direction end -----------------

  // sidebar end

  return (
    <div className="fixed top-0 w-full bg-[#232323] lg:bg-black flex items-center p-4 z-50 h-16 justify-between pt-6">
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => {
          setShowMenu(!showMenu);
          setSidebar(false);
        }}
        className="sm:hidden flex items-center p-1 -ml-3"
      >
        <Bars3Icon className="text-white h-6 w-6" />
      </button>

      {/* Logo */}
      <div className="max-sm:mx-auto">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="h-14 lg:h-16" />
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex items-center font-medium lg:text-sm space-x-6">
          {navLinks.map((link, index) => (
            <NavLink
                key={index}
                to={link.path}
                onClick={() => {
                  if (link.label === "+Add New Property") {
                    handleAddProperty();
                  } else {
                    setActiveNavbarMenu(link.label);
                  }
                }}
              >
             <li
              className={`py-1 hover:bg-[#5AA7A0] hover:text-white hover:rounded-md text-md px-3 ${
                link.label === "+Add New Property"
                  ? activeNavbarMenu === link.label
                    ? "bg-[rgb(200 161 23 / var(--tw-bg-opacity))]  text-white rounded-md"
                    : "bg-[#C8A117] text-white rounded-md hover:bg-[#f1d029]" // example inactive bg color for Add Property
                  : activeNavbarMenu === link.label
                  ? "bg-[#5AA7A0] text-white rounded-md"
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
              className={`py-1 hover:bg-[#1BADA0] bg-[#0D8A7F] text-white px-3 rounded-md text-md ${
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
        className={` w-[90%] sm:hidden fixed inset-0 bg-[#232323] text-white z-[1000] transition-transform ${
          showMenu ? "translate-x-0 " : "-translate-x-full"
        }`}
      >
        <div className="">
          <div
            className={`max-sm:pt-1 w-full h-full absolute sm:h-full sm:w-full bg-[#232323] sm:bg-black text-white sm:p-2 flex flex-col sm:relative sm:top-0 sm:left-0 lg:p-5 z-50 pl-0  transition-all duration-200 ${
              sidebar
                ? "translate-x-[0%] w-[100%] visible"
                : "translate-x-[100%] invisible w-0"
            }`}
          >
            <div
              className={`flex flex-col h-screen w-[100%] sm:w-auto sm:justify-normal `}
            >
              <div className="w-[100%] sm:w-auto">
                <div
                  className={`flex text-white-700 ${linkStyle_1}`}
                  onClick={() => {
                    setSidebar(false);
                    setSettingFlag(false);
                    setToggelSetting(false);
                  }}
                >
                  <IoIosArrowBack size={27} className="mr-3" />
                  <span className=" text-base sm:block lg:text-xl">Menu</span>
                </div>

                <NavLink
                  className={({ isActive }) =>
                    ` ${linkStyle_1} ${
                      isActive ? "bg-[#C8A117]" : ""
                    } hover:bg-[#C8A117] transition-colors duration-200`
                  }
                  end
                  to="/landlord-dashboard"
                  onClick={() => {
                    setSettingFlag(false);
                    setToggelSetting(false);
                  }}
                >
                  <div className="flex text-white-700 ">
                    <svg
                      className="mr-[1.1rem]"
                      width="22"
                      height="21"
                      viewBox="0 0 22 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.9688 19.4376C21.9688 19.9036 21.591 20.2813 21.125 20.2813H0.875C0.40901 20.2813 0.0312502 19.9036 0.0312502 19.4376C0.0312502 18.9716 0.40901 18.5938 0.875 18.5938H1.71875V11.8438C1.71875 11.3778 2.09651 11.0001 2.5625 11.0001H5.09375C5.55974 11.0001 5.9375 11.3778 5.9375 11.8438V18.5938H7.625V6.78131C7.625 6.31532 8.00276 5.93756 8.46875 5.93756H11.8438C12.3097 5.93756 12.6875 6.31532 12.6875 6.78131V18.5938H14.375V1.71881C14.375 1.25282 14.7528 0.875062 15.2188 0.875062H19.4375C19.9035 0.875062 20.2813 1.25282 20.2813 1.71881V18.5938H21.125C21.591 18.5938 21.9688 18.9716 21.9688 19.4376Z"
                        fill="white"
                      />
                    </svg>
                    {/* <span className="hidden text-base md:block lg:text-xl"> */}
                    <span className="w-28 sm:w-32 text-base sm:block lg:text-xl">
                      Dashboard
                    </span>
                  </div>
                </NavLink>

                {
                  <NavLink
                    to="/landlord-dashboard/my-properties"
                    className={({ isActive }) =>
                      ` ${linkStyle_1} ${
                        isActive ? "bg-[#C8A117]" : ""
                      } hover:bg-[#C8A117] transition-colors duration-200 `
                    }
                    onClick={() => {
                      setSettingFlag(false);
                      setToggelSetting(false);
                    }}
                  >
                    <div className="flex text-white-700">
                      <AiOutlineHome size={27} className="mr-3" />
                      <span className="w-28 sm:w-32 text-base sm:block lg:text-xl">
                        My Properties
                      </span>
                    </div>
                  </NavLink>
                }

                <NavLink
                  to="/landlord-dashboard/favourites"
                  className={({ isActive }) =>
                    ` ${linkStyle_1} ${
                      isActive ? "bg-[#C8A117]" : ""
                    } hover:bg-[#C8A117] transition-colors duration-200`
                  }
                  onClick={() => {
                    setSettingFlag(false);
                    setToggelSetting(false);
                  }}
                >
                  <div className="flex text-white-700 ">
                    <AiOutlineHeart size={27} className="mr-3" />
                    <span className=" text-base sm:block lg:text-xl">
                      Favourites
                    </span>
                  </div>
                </NavLink>

                <NavLink
                  to="/landlord-dashboard/add-properties"
                  className={({ isActive }) =>
                    ` ${linkStyle_1} ${
                      isActive ? "bg-[#C8A117]" : ""
                    } hover:bg-[#C8A117] transition-colors duration-200`
                  }
                  onClick={() => {
                    setSettingFlag(false);
                    setToggelSetting(false);
                  }}
                >
                  <div className="flex text-white-700 ">
                    <IoAddOutline size={27} className="mr-3" />
                    <span className="w-28 sm:w-32 text-base sm:block lg:text-xl">
                      Add Property
                    </span>
                  </div>
                </NavLink>

                <div
                  ref={settingsRef}
                  className={`sm:rounded-md max-w-[320px] min-h-[45px] text-xl relative cursor-pointer `}
                >
                  <NavLink
                    to="/landlord-dashboard/settings/profile"
                    className={({ isActive }) =>
                      ` max-sm:w-[100%] sm:rounded-md px-[14px] py-[10px] flex items-center gap-x-4 h-[45px] ${
                        isActive ? "bg-[#C8A117]" : ""
                      } hover:bg-[#C8A117] transition-colors duration-200`
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      if (toggelSetting) setToggelSetting(false);
                      else setToggelSetting(true);
                      setArrow();
                    }}
                  >
                    <div className="flex justify-between text-white-700 w-[100%]">
                      <div className="flex items-center">
                        <IoSettingsOutline size={27} className="mr-3" />
                        <span className=" text-base sm:block lg:text-xl">
                          Settings
                        </span>
                      </div>
                      <div>
                        {settingFlag ? (
                          <i
                            className="fa-solid fa-angle-up"
                            id="settingDirect"
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-angle-down"
                            id="settingDirect"
                          ></i>
                        )}
                      </div>
                    </div>
                  </NavLink>

                  {/* setting start */}
                  <div id="settingMenus" className="relative transition-all ">
                    {toggelSetting && (
                      <ul className="flex-col max-sm:ml-auto gap-y-[2px] lg:mt-4 lg:ml-8 relative max-sm:top-full max-sm:right-0 max-sm:w-[69%] max-sm:bg-black max-sm:z-50 max-sm:justify-around max-sm:p-2 ">
                        <NavLink
                          to="/landlord-dashboard/settings/profile"
                          className={({ isActive }) =>
                            `${linkStyle_2} ${
                              isActive ? "bg-[#C8A117]" : ""
                            } max-sm:flex-1 max-sm:justify-center w-full hover:bg-[#C8A117] transition-colors duration-200`
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            setToggelSetting(false);
                            setArrow();
                          }}
                        >
                          <li className="flex max-sm:justify-center">
                            <GoPerson size={27} className="mr-3 max-sm:mr-0" />
                            <span className="text-base sm:block lg:text-xl">
                              Profile
                            </span>
                          </li>
                        </NavLink>

                        <NavLink
                          onClick={(e) => {
                            e.stopPropagation();
                            // setToggelSetting(false);
                          }}
                          to="/landlord-dashboard/settings/account-security"
                          className={({ isActive }) =>
                            `${linkStyle_2} ${
                              isActive ? "bg-[#C8A117]" : ""
                            } max-sm:flex-1 max-sm:justify-center w-full hover:bg-[#C8A117] transition-colors duration-200`
                          }
                        >
                          <li className="flex max-sm:justify-center">
                            <MdLockOutline
                              size={27}
                              className="mr-3 max-sm:mr-0"
                            />
                            <span className="text-base sm:block lg:text-xl">
                              Account Security
                            </span>
                          </li>
                        </NavLink>
                      </ul>
                    )}
                  </div>
                  {/* setting end  */}
                </div>
              </div>

              <div className="flex flex-col ">
                <hr className="mt-3 h-[2.1px] bg-[#8080804d] border border-none sm:hidden" />
                <div
                  className={`sm:rounded-md px-[14px] py-[10px] max-w-[320px] min-min-h-[45px] text-xl text-[#FF0000] flex items-center gap-x-4 cursor-pointer mt-1 sm:mt-0 border border-[#232323] sm:border-black hover:border-[#FF0000]`}
                  onClick={() => {
                    if (
                      authState.status === true &&
                      localStorage.getItem("token")
                    ) {
                      localStorage.removeItem("token");
                      dispatch(logout());
                      navigate("/login");
                      toast.success("Logged Out!");
                    } else {
                      toast.error("Please login first!");
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="text-xl "
                  />
                  <span className=" text-base md:block lg:text-xl">Logout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* sidebar end here */}

        <div
          className={`bg-[#272727] flex items-center justify-between py-4 relative`}
        >
          <div
            className={`absolute z-[999] transition-all top-3 left-1 ${
              showMenu ? "ml-[100%]" : ""
            } rounded-2xl border border-white`}
            onClick={() => {
              setShowMenu(false);
              if (sidebar) {
                setSidebar(false);
              }
            }}
          >
            <IoIosClose size={25} />
          </div>

          <div className="w-3"></div>

          {authState.status && token ? (
            <div className={`flex mr-auto items-center gap-x-3`}>
              <img
                className="w-16 h-16 rounded-full"
                src={profilePicture}
                alt="User"
                onError={() => setImgError(true)}
              />
              <div>
                <p className="font-medium text-[18px]">
                  Hi, {userInfo.firstName || "User"}
                </p>
                <p>Welcome back</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full px-1 py-2">
              <div className="flex items-start  w-full gap-x-2">
                {/* profile */}
                <img
                  src={guestIcon}
                  alt="Guest Profile"
                  className="w-20 h-20 filter invert brightness-0"
                />

                <div className="my-auto">
                  <p className="text-lg font-semibold">Guest Profile</p>
                  <p className="text-sm font-normal">Welcome</p>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate("/login");
                  setShowMenu(false);
                }}
                className="mt-3 bg-teal-500 text-white w-full px-1 py-1.5 rounded-lg"
              >
                Login / Register
              </button>
            </div>
          )}

          {authState.status ? (
            <button
              onClick={() => {
                setSidebar(true);
              }}
              className={`${userInfo.firstName ? "" : "pb-10"}`}
            >
              <IoIosArrowForward size={25} />
            </button>
          ) : (
            ""
          )}
        </div>

        <ul className="flex flex-col gap-5 mt-5 px-5 text-lg">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              onClick={() => {
                if (link.label === "Add Property") {
                  handleAddProperty();
                } else {
                  setShowMenu(false);
                  navigate(link.path);
                }
              }}
              to={link.path}
            >
              <div className="flex items-center gap-x-3 hover:text-teal-500">
                <p>
                  <link.icon size={25} />
                </p>
                <p>{link.label}</p>
              </div>
            </NavLink>
          ))}

          {authState.status ? (
            <div
              className="flex items-center gap-x-3 text-red-500"
              onClick={handleLogout}
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="text-xl "
              />
              <p>Logout</p>
            </div>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
