import React, { useEffect, useState } from "react";
import TopBg from "./TopBg";

const HomeUp = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 5) {
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
    <div className="relative w-full h-screen overflow-hidden">
      <div className=" flex justify-center items-center h-full">
        <div className="w-full relative">
          <h1
            className={`absolute -top-20 left-0 right-0 text-center text-white sm:text-4xl md:text-[2.6rem] text-3xl font-normal font-sans tracking-[0.3rem] transition-all duration-[1800ms] ease-in-out ${
              isScrolled
                ? "transform -translate-x-80 scale-75 opacity-0"
                : "transform translate-x-0 scale-100 opacity-100"
            }`}
          >
            Welcome to To-Let Globe
          </h1>
          <h6
            className={`absolute top-2/3 left-0 right-0 text-center text-[#c8a21c] font-light capitalize transition-all duration-[1800ms] ease-in-out ${
              isScrolled
                ? "transform -translate-x-80 scale-75 opacity-0"
                : "transform translate-x-0 scale-100 opacity-100"
            }`}
          >
            NO BROKERAGE ON PGS | FLATS | HOUSES | OFFICES
          </h6>

          <TopBg />
        </div>
      </div>
    </div>
  );
};

export default HomeUp;
