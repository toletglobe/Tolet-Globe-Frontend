import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../../../redux/store/authSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { MdLockOutline } from "react-icons/md";

export default function LandlordDashboardSidebar() {
  // ----------------- setting direction start -----------------
  const [settingFlag, setSettingFlag] = useState(false);
  function setArrow() {
    setSettingFlag(!settingFlag);
  }
  // ----------------- setting direction end -----------------

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Check if current route is inside settings section
  const isSettingsRoute = location.pathname.includes("settings");

  const authState = useSelector((state) => state.auth);
  const [toggelSetting, setToggelSetting] = useState(isSettingsRoute);
  const settingsRef = useRef(null);

  const linkStyle_1 =
    "sm:rounded-md px-[14px] py-[10px] max-w-[100%] text-xl flex items-center gap-x-4 cursor-pointer md:max-w-[320px] md:min-h-[45px]";

  const linkStyle_2 =
    "sm:rounded-md px-[14px] py-[10px] flex items-center gap-x-4 cursor-pointer";

  useEffect(() => {
    // Sync dropdown open state with route
    setToggelSetting(isSettingsRoute);
    setSettingFlag(isSettingsRoute);

    function handleClickOutside(event) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target) &&
        !isSettingsRoute
      ) {
        setToggelSetting(false);
        setSettingFlag(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [location.pathname]);

  return (
    <>
      {/* sidebar start here  */}
      <div
        className="max-sm:pt-1 w-screen h-[100%] absolute top-[120px] left-[-500px] sm:h-[100%] sm:w-[100%] bg-[#232323] sm:bg-black text-white sm:p-2 flex flex-col sm:relative sm:top-0 sm:left-0 lg:p-5 z-10 pl-0"
        id="sidebar"
      >
        <div className="flex flex-col h-screen w-screen sm:w-auto sm:justify-normal gap-2">
          <div className="w-[100%] sm:w-auto">
            <NavLink
              className={({ isActive }) =>
                ` ${linkStyle_1} ${
                  isActive ? "bg-[#C8A117]" : ""
                } hover:bg-[#C8A117] transition-colors duration-200 mb-2`
              }
              end
              to="/landlord-dashboard"
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
                <span className="text-base sm:block lg:text-xl">Dashboard</span>
              </div>
            </NavLink>

            <NavLink
              to="my-properties"
              className={({ isActive }) =>
                ` ${linkStyle_1} ${
                  isActive ? "bg-[#C8A117]" : ""
                } hover:bg-[#C8A117] transition-colors duration-200 mb-2`
              }
            >
              <div className="flex text-white-700">
                <AiOutlineHome size={27} className="mr-3" />
                <span className="text-base sm:block lg:text-xl">
                  My Properties
                </span>
              </div>
            </NavLink>

            <NavLink
              to="favourites"
              className={({ isActive }) =>
                ` ${linkStyle_1} ${
                  isActive ? "bg-[#C8A117]" : ""
                } hover:bg-[#C8A117] transition-colors duration-200 mb-2`
              }
            >
              <div className="flex text-white-700 ">
                <AiOutlineHeart size={27} className="mr-3" />
                <span className=" text-base sm:block lg:text-xl">
                  Favourites
                </span>
              </div>
            </NavLink>

            <NavLink
              to="add-properties"
              className={({ isActive }) =>
                ` ${linkStyle_1} ${
                  isActive ? "bg-[#C8A117]" : ""
                } hover:bg-[#C8A117] transition-colors duration-200 mb-2`
              }
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
              className="sm:rounded-md max-w-[320px] text-xl relative cursor-pointer"
            >
              <div
                onClick={() => {
                  setToggelSetting((prev) => !prev);
                  setArrow();
                }}
                className="max-sm:w-screen sm:rounded-md px-[14px] py-[10px] flex items-center gap-x-4 h-[45px] hover:bg-[#C8A117] transition-colors duration-200"
              >
                <div className="flex justify-between text-white-700 w-full">
                  <div className="flex items-center">
                    <IoSettingsOutline size={27} className="mr-3" />
                    <span className="text-base sm:block lg:text-xl">
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
              </div>

              {/* Dropdown links */}
              {toggelSetting && (
                <ul className="flex-col max-sm:ml-auto gap-y-[2px] lg:mt-4 lg:ml-8 max-sm:relative max-sm:top-full max-sm:right-0 max-sm:w-[69%] max-sm:bg-black max-sm:z-50 max-sm:justify-around max-sm:p-2">
                  <NavLink
                    to="settings/profile"
                    className={({ isActive }) =>
                      `${linkStyle_2} ${
                        isActive ? "bg-[#C8A117]" : ""
                      } max-sm:flex-1 max-sm:justify-center w-full hover:bg-[#C8A117] transition-colors duration-200 sm:mt-2`
                    }
                    onClick={() => {
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
                    to="settings/account-security"
                    className={({ isActive }) =>
                      `${linkStyle_2} ${
                        isActive ? "bg-[#C8A117]" : ""
                      } max-sm:flex-1 max-sm:justify-center w-full hover:bg-[#C8A117] transition-colors duration-200 sm:mt-2`
                    }
                    onClick={() => {
                      setToggelSetting(false);
                      setArrow();
                    }}
                  >
                    <li className="flex max-sm:justify-center">
                      <MdLockOutline size={27} className="mr-3 max-sm:mr-0" />
                      <span className="text-base sm:block lg:text-xl">
                        Account Security
                      </span>
                    </li>
                  </NavLink>
                </ul>
              )}
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
      {/* sidebar end here */}
    </>
  );
}
