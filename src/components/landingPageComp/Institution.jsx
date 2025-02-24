import React, { useRef } from "react";
import ibs from "../../assets/Institution/ibs.svg";
import ipcpsimg from "../../assets/Institution/IpcpsImg.svg";
import UniversityOgLakhnaw from "../../assets/Institution/UniversityOfLakhnaw.svg";
import NPGC from "../../assets/Institution/NPGC.svg";
import RCD from "../../assets/Institution/RCd.svg";
import SSDC from "../../assets/Institution/SSCD.svg";
import NMIMS from "../../assets/Institution/NMIMS.svg";
import IIM from "../../assets/Institution/IIM.svg";
import Jaipiria from "../../assets/Institution/Jaipuria.svg";
import MSITD from "../../assets/Institution/MSITD.svg";
import IMT from "../../assets/Institution/IMT-Nagpur.svg";

const Institution = () => {
  const images = [
    { src: IMT, title: "IMT Nagpur", link: "https://www.imtnagpur.ac.in/" },
    { src: ibs, title: "IBS, Hyderabad", link: "https://general.ibsindia.org/" },
    { src: UniversityOgLakhnaw, title: "Lucknow University, Lucknow", link: "https://www.lkouniv.ac.in/" },
    { src: NPGC, title: "National PG College, Lucknow", link: "https://www.npgc.in/" },
    { src: MSITD, title: "Institute of Technology, Delhi", link: "#" },
    { src: SSDC, title: "Swami Shraddhanand College, Delhi", link: "https://ss.du.ac.in/" },
    { src: RCD, title: "Ramjas College, Delhi", link: "https://ramjas.du.ac.in/" },
    { src: NMIMS, title: "NMIMS, Mumbai", link: "https://mba.nmims.edu/" },
    { src: IIM, title: "IIM Kashipur", link: "https://www.iimkashipur.ac.in/" },
    {
      src: ipcpsimg,
      title: "Public College of Professional Studies, Lucknow",
      className: "bg-white",
      link: "https://lpcps.org.in/",
    },
    { src: Jaipiria, title: "Jaipuria College, Lucknow", link: "https://www.jaipuria.ac.in/" },
  ];

  const marqueeRef = useRef(null);

  const handleMouseEnter = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = "paused";
    }
  };

  const handleMouseLeave = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <div className="margin">
      <div className="flex flex-col items-center justify-center">
        <h3 className="w-full max-w-[1078.22px] h-auto font-poppins font-semibold text-[26px] leading-[38px] text-center text-[#1D5F58] sm:text-[38px] sm:leading-[50px] md:text-[45px] md:leading-[65px]">
          Partnered Universities
        </h3>

        <p className="w-full max-w-[1078.22px] h-auto font-poppins font-medium text-[10px] leading-[14px] text-center text-[#C8A117] sm:text-[11px] sm:leading-[16px]">
          We are proud to collaborate with some of the most prestigious colleges
          and universities across the country for college placements, including:
        </p>
      </div>

      <div className="overflow-hidden relative mt-[35px] sm:mt-[107px]">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            animation: "marquee 70s linear infinite", // Slower animation for smooth effect
            display: "flex",
            width: "fit-content",
          }}
        >
          {[...images, ...images].map((image, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center px-[40px]">
              {/* Image inside an <a> tag for clickable links */}
              <a href={image.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={image.src}
                  alt={image.title}
                  className="max-w-[900px] max-h-[900px] cursor-pointer hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default Institution;
