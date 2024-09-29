import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faPlus,
  faHouse,
  faChartSimple,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";


export default function LandlordDashboardSidebar({ mainContent, setMainContent }) {
  
  const [colored, setColored] = useState("Dashboard");
  

  return (
    <>
      <div className="w-[100%] h-[100%] bg-black text-white p-5 flex flex-col">
        <div className="flex flex-col space-y-4">
          <a
            className={`rounded-md px-[14px] py-[10px] max-w-[320px] h-[45px] text-xl flex items-center gap-x-4 ${
              colored == "Dashboard" ? "bg-[#C8A117]" : ""
            } `}
            onClick={() => {
              setMainContent((mainContent) => (mainContent = "Welcome"));
              setColored("Dashboard");
            }}
          >
            <FontAwesomeIcon icon={faChartSimple} className="text-xl" />
            <span>Dashboard</span>
          </a>
          <a
            className={`rounded-md px-[14px] py-[10px] max-w-[320px] h-[45px] text-xl flex items-center gap-x-4 ${
              colored == "My Properties" ? "bg-[#C8A117]" : ""
            } `}
            onClick={() => {
              setMainContent((mainContent) => (mainContent = "MyProperty"));
              setColored("My Properties");
            }}
          >
            <FontAwesomeIcon icon={faHouse} className="text-xl" />
            <span>My Properties</span>
          </a>
          <a
            className={`rounded-md px-[14px] py-[10px] max-w-[320px] h-[45px] text-xl flex items-center gap-x-4 ${
              colored == "Add Property" ? "bg-[#C8A117]" : ""
            } `}
            onClick={() => {
              setMainContent((mainContent) => (mainContent = "AddProperty"));
              setColored("Add Property")
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
            <span>Add Property</span>
          </a>
          <a
            className={`rounded-md px-[14px] py-[10px] max-w-[320px] h-[45px] text-xl flex items-center gap-x-4 ${
              colored == "Settings" ? "bg-[#C8A117]" : ""
            } `}
            onClick={() => {
              setMainContent((mainContent) => (mainContent = "Settings"));
              setColored("Settings")
            }}
          >
            <FontAwesomeIcon icon={faGear} className="text-xl" />
            <span>Settings</span>
          </a>
          <a
            className={`rounded-md px-[14px] py-[10px] max-w-[320px] h-[45px] text-xl text-[#FF0000] flex items-center gap-x-4 ${colored == "Logout" ? "bg-[#C8A117]" : ""} `}
            onClick={() => {
              setMainContent((mainContent) => (mainContent = "Logout"));
            }}
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="text-xl "
            />
            <span>Logout</span>
          </a>
        </div>
      </div>
    </>
  );
}
