import React from "react";
import { Link, useNavigate } from "react-router-dom";
import cross from "../../../assets/property/cross.png";
import "../listing.css";

const SelectLocation = ({ Location, setLocation }) => {
  // const [Location, setLocation] = useState(false);

  function handleLocation() {
    setLocation(!Location);
  }

  function refresh() {
    window.location.reload(false)
  }

  return (
    <div
      className={`absolute lg:left-28 left-[-20px] flex lg:gap-3 z-50 ${Location ? "block" : "hidden"}`}
    >
      <div>
        <img
          src={cross}
          alt="Close"
          onClick={() => { handleLocation(); refresh() }}
          className="cursor-pointer"
        />
      </div>

      <div>
        <div className="lg:w-[715px] lg:max-w-full md:min-w-[300px] md:max-w-full  w-screen bg-white text-black flex items-start px-8 flex-col justify-center h-[35vh] rounded-lg shadow-md">
          <p className="text-2xl font-medium py-4 flex items-center justify-center gap-4 ">
            Select Location
          </p>
          <div className="flex items-center justify-between w-full px-5 py-2 flex-wrap gap-3">
            <Link to={"/property-listing/Lucknow"}>
              <p className="h-8 w-24 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center">
                Lucknow
              </p>
            </Link>
            <Link to={"/property-listing/Ayodhya"}>
              <p className="h-8 w-24 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center">
                Ayodhya
              </p>
            </Link >
            <Link to={"/property-listing/Vellore"}>
              <p className="h-8 w-24 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center">
                Vellore
              </p>
            </Link>
            <Link to={"/property-listing/Kota"}>
              <p className="h-8 w-24 text-xs sm:text-sm font-light border-2 border-[#4A7F79] rounded-lg flex items-center justify-center">
                Kota
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectLocation;
