import React from "react";
import { motion } from "framer-motion";
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
    { src: ipcpsimg, title: "Public College of Professional Studies, Lucknow", link: "https://lpcps.org.in/" },
    { src: Jaipiria, title: "Jaipuria College, Lucknow", link: "https://www.jaipuria.ac.in/" },
  ];

  return (
    <div className="margin">
      <div className="flex flex-col items-center justify-center">
        <h3 className="w-full max-w-[1078.22px] font-poppins font-medium text-[24px] leading-[36px] text-center text-[#1D5F58] sm:text-[36px] md:text-[42.6667px]">
          Partnered Universities
        </h3>
        <p className="w-full max-w-[1078.22px] font-poppins font-medium text-[11.5556px] leading-[17px] text-center text-[#C8A117]">
          We are proud to collaborate with some of the most prestigious colleges
          and universities across the country for college placements, including:
        </p>
      </div>

      <div className="overflow-hidden mt-10">
        <motion.div
          className="flex items-center justify-center"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          <div className="flex">
            {images.concat(images).map((image, idx) => (
              <a href={image.link} key={idx} className="mx-9 my-5">
                <img
                  src={image.src}
                  alt={image.title}
                  className="max-w-[200px] max-h-[200px] cursor-pointer hover:opacity-80 transition-opacity"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Institution;
