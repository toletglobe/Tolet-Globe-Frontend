import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faPlus,
  faHouse,
  faChartSimple,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { AiOutlineHome } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { MdLockOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../../../redux/store/authSlice";
import profileLogo from "../../../assets/landlord/profileLogo.png";
import accountSecurityImg from "../../../assets/landlord/accountSecurityImg.png";
import { useState } from "react";

export default function LandlordDashboardSidebar({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const [toggelSetting, setToggelSetting] = useState(false);

  const linkStyle_1 =
    "rounded-md px-[14px] py-[10px] max-w-[46px] text-xl flex items-center gap-x-4 cursor-pointer md:max-w-[320px] md:min-h-[45px]";

  const linkStyle_2 =
    "rounded-md px-[14px] py-[10px] flex items-center gap-x-4 cursor-pointer";

  return (
    <>
      <div className="w-[100%] h-[100%] bg-black text-white p-2 flex flex-col lg:p-5">
        <div className="flex sm:flex-col">
          <NavLink
            className={({ isActive }) =>
              ` ${linkStyle_1} ${isActive ? "bg-[#C8A117]" : ""} `
            }
            end
            to="/landlord-dashboard"
          >
            <div className="flex text-white-700 ">
              <svg
                className="mr-3"
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
              <span className="hidden text-base md:block lg:text-xl">
                Dashboard
              </span>
            </div>
          </NavLink>

          <NavLink
            to="my-properties"
            className={({ isActive }) =>
              ` ${linkStyle_1} ${isActive ? "bg-[#C8A117]" : ""} `
            }
          >
            <div className="flex text-white-700 ">
              <AiOutlineHome size={27} className="mr-3" />
              <span>My Properties</span>
            </div>
          </NavLink>

          <NavLink
            to="add-properties"
            className={({ isActive }) =>
              ` ${linkStyle_1} ${isActive ? "bg-[#C8A117]" : ""} `
            }
          >
            <div className="flex text-white-700 ">
              <IoAddOutline size={27} className="mr-3" />
              <span>Add Property</span>
            </div>
          </NavLink>

          <div
            className={`rounded-md max-w-[320px] min-h-[45px] text-xl min-[320px]:max-sm:flex cursor-pointer`}
          >
            <NavLink
              to="settings/profile"
              className={({ isActive }) =>
                `rounded-md px-[14px] py-[10px] flex items-center gap-x-4 h-[45px] `
              }
              onClick={() => {
                setToggelSetting(!toggelSetting);
              }}
            >
              <div className="flex text-white-700  w-full text-left">
                <IoSettingsOutline size={27} className="mr-3" />{" "}
                <span>Settings</span>
              </div>
            </NavLink>

            {toggelSetting && (
              <ul className="-ml-1 flex sm:flex-col gap-y-[2px] lg:mt-4 lg:ml-8">
                <NavLink
                  to="settings/profile"
                  className={({ isActive }) =>
                    ` ${linkStyle_2} ${isActive ? "bg-[#C8A117]" : ""} `
                  }
                >
                  <li className="flex">
                    <GoPerson size={27} className="mr-3" />
                    <span>Profile</span>
                  </li>
                </NavLink>
                <NavLink
                  to="settings/account-security"
                  className={({ isActive }) =>
                    ` ${linkStyle_2} ${isActive ? "bg-[#C8A117]" : ""} `
                  }
                >
                  <li className="flex">
                    <MdLockOutline size={27} className="mr-3" />
                    <span>Account Security</span>
                  </li>
                </NavLink>
              </ul>
            )}
          </div>

          <div
            className={`rounded-md px-[14px] py-[10px] max-w-[320px] min-min-h-[45px] text-xl text-[#FF0000] flex items-center gap-x-4 cursor-pointer`}
            onClick={() => {
              if (authState.status === true && localStorage.getItem("token")) {
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
            <span className="hidden text-base md:block lg:text-xl">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
}
