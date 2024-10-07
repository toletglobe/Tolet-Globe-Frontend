import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faPlus,
  faHouse,
  faChartSimple,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../../store/authSlice";
import profileLogo from "../../assets/landlord/profileLogo.png";
import accountSecurityImg from "../../assets/landlord/accountSecurityImg.png";
import { useState } from "react";

export default function LandlordDashboardSidebar({
  mainContent,
  setMainContent,
  colored,
  setColored,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  const [toggelSetting, setToggelSetting] = useState(false);

  const handleOnClick = (text) => {
    setMainContent((mainContent) => (mainContent = text));
    setColored(text);
  };

  return (
    <>
      <div className="w-[100%] h-[100%] bg-black text-white p-5 flex flex-col">
        <div className="flex flex-col">
          <div
            className={`rounded-md px-[14px] py-[10px] max-w-[320px] min-h-[45px] text-xl flex items-center gap-x-4 cursor-pointer ${
              colored == "Welcome" ? "bg-[#C8A117]" : ""
            } `}
            onClick={() => {
              handleOnClick("Welcome");
            }}
          >
            <FontAwesomeIcon icon={faChartSimple} className="text-xl" />
            <span>Dashboard</span>
          </div>
          <div
            className={`rounded-md px-[14px] py-[10px] max-w-[320px] min-h-[45px] text-xl flex items-center gap-x-4 cursor-pointer ${
              colored == "MyProperty" ? "bg-[#C8A117]" : ""
            } `}
            onClick={() => {
              handleOnClick("MyProperty");
            }}
          >
            <FontAwesomeIcon icon={faHouse} className="text-xl" />
            <span>My Properties</span>
          </div>
          <div
            className={`rounded-md px-[14px] py-[10px] max-w-[320px] min-h-[45px] text-xl flex items-center gap-x-4 cursor-pointer ${
              colored == "AddProperty" ? "bg-[#C8A117]" : ""
            } `}
            onClick={() => {
              handleOnClick("AddProperty");
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
            <span>Add Property</span>
          </div>

          <div
            className={`rounded-md max-w-[320px] min-h-[45px] text-xl cursor-pointer`}
          >
            <div
              className={`rounded-md px-[14px] py-[10px] flex items-center gap-x-4 h-[45px] ${
                colored == "Settings" ? "bg-[#C8A117]" : ""
              } `}
              onClick={() => {
                setColored("Settings");
                setToggelSetting(!toggelSetting);
              }}
            >
              <FontAwesomeIcon icon={faGear} className="text-xl" />
              <span>Settings</span>
            </div>

            {toggelSetting && (
              <ul className="mt-4 ml-8 flex flex-col gap-y-[2px]">
                <li
                  className={`rounded-md px-[14px] py-[10px] flex items-center gap-x-4 cursor-pointer ${
                    colored == "Profile" ? "bg-[#C8A117]" : ""
                  } `}
                  onClick={() => {
                    handleOnClick("Profile");
                  }}
                >
                  <img src={profileLogo} alt="" /> Profile
                </li>
                <li
                  className={`rounded-md px-[14px] py-[10px] flex items-center gap-x-4 cursor-pointer ${
                    colored == "AccountSecurity" ? "bg-[#C8A117]" : ""
                  } `}
                  onClick={() => {
                    handleOnClick("AccountSecurity");
                  }}
                >
                  <img src={accountSecurityImg} alt="" />
                  Account Security
                </li>
              </ul>
            )}
          </div>

          <div
            className={`rounded-md px-[14px] py-[10px] max-w-[320px] min-min-h-[45px] text-xl text-[#FF0000] flex items-center gap-x-4 cursor-pointer ${
              colored == "Logout" ? "bg-[#C8A117]" : ""
            } `}
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
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
}
