import React from "react";
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
      className: "bg-white", link: "https://lpcps.org.in/"
    },
    { src: Jaipiria, title: "Jaipuria College, Lucknow", link: "https://www.jaipuria.ac.in/" },
  ];

  return (
    <div className="margin">
      <div className="flex flex-col items-center justify-center">
        <h3 className="w-full max-w-[1078.22px] h-auto font-poppins font-medium text-[24px] leading-[36px] text-center text-[#1D5F58] sm:text-[36px] sm:leading-[48px] md:text-[42.6667px] md:leading-[64px] mobile-text">
          Partnered Universities
        </h3>

        {/* Added margin-top to create gap between title and subtitle */}
        <p className="w-full max-w-[1078.22px] h-auto font-poppins font-small text-[11.5556px] leading-[17px] text-center text-[#C8A117] mt-4">
          We are proud to collaborate with some of the most prestigious colleges
          and universities across the country for college placements, including:
        </p>
      </div>

      <div className="overflow-hidden mt-[107px]">
        <div className="flex" style={{ animation: "marquee 25s linear infinite", width: "200%" }}>
          {images.concat(images).map((image, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center px-[40px]"
            >
              <img
                src={image.src}
                alt={image.title}
                className="max-w-[900px] max-h-[900px] cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          /* Mobile-specific styles */
          @media (max-width: 768px) {
            .overflow-hidden {
              margin-top: 41.67px; /* Adjust the gap for mobile view */
            }

            /* Increase the width of the "Partnered Universities" title */
            .mobile-text {
              width: 100%; /* Make the text take up the full width */
              max-width: none; /* Remove the max-width constraint */
              font-size: 32px; /* Adjust the font size to fit well */
            }

            /* Reduce text size further for mobile */
            .text-small-mobile {
              font-size: 6px; /* Adjusted to make the text even smaller */
              line-height: 9px; /* Adjusted line height */
            }
          }
        `}
      </style>
    </div>
  );
};

export default Institution;
