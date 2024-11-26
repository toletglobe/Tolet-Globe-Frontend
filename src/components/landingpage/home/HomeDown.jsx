import "animate.css";
import BottomBg from "./BottomBg";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

const HomeDown = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 1) {
      setIsScrolled(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-screen">
      <div className="flex justify-center items-center h-full mb-20 mt-16">
        <div className="sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto">
          <h1
            className={`absolute transform text-3xl text-center sm:text-[2.3rem] font-light text-white tracking-widest transition-all lg:duration-[2000ms] md:duration-[1000ms] sm:duration-[700ms] duration-[500ms]  ease-in-out ${
              isScrolled
                ? "left-[5.5%] top-[10rem] sm:top-[12rem] md:top-[10rem] lg:left-[5%] lg:top-[17rem] opacity-100"
                : "left-[30%] top-[12rem] sm:top-[14rem] md:top-[10rem] lg:top-[19rem] opacity-0"
            } `}
          >
            Welcome to To-Let Globe
          </h1>
          <h6
            className={`absolute transform text-center text-[#c8a21c] font-light transition-all lg:duration-[2000ms] md:duration-[1000ms] sm:duration-[700ms] duration-[500ms]  ease-in-out ${
              isScrolled
                ? "left-[5.5%] top-[14.8rem] sm:top-[15.2rem] md:top-[14rem] lg:left-[5%] lg:top-[21rem] opacity-100"
                : 
                "left-[30%] top-[14rem] sm:top-[16rem] md:top-[14rem] lg:top-[23rem] opacity-0"
            } `}
          >
            NO BROKERAGE ON PGS | FLATS | HOUSES | OFFICES
          </h6>
          <div
            className={` absolute transform items-center transition-all lg:duration-[2000ms] md:duration-[1000ms] sm:duration-[700ms] duration-[500ms] ease-in-out w-[20%] ${
              isScrolled
                ? "left-[5.5%] sm:w-[25%] top-[39%] lg:top-[53%] lg:w-[31%] opacity-100"
                : "left-[30%] sm:w-[20%] top-[39%] lg:top-[56%] lg:w-[32%] opacity-0"
            } `}
            id="inputGroup"
          >
            <div className="flex">
              <input
                className="flex-1 py-2 px-4 border text-black border-gray-300 bg-white rounded-l-md  sm:py-2 sm:px-2 md:py-3 md:px-4 lg:py-2 lg:px-6"
                placeholder="Search PG, Flats and Houses"
                aria-label="Search PG, Flats and Houses"
              />
              <button
                className="bg-[#40b5a8] text-white rounded-r-md px-4"
                onClick={() => console.log("connect")}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <BottomBg />
    </div>
  );
};

export default HomeDown;
