import ibs from "../../assets/Institution/ibs.svg";
import ipcpsimg from "../../assets/Institution/IpcpsImg.svg";
// import ipcpsText from "../../assets/Institution/IpcpText.svg";
import UniversityOgLakhnaw from "../../assets/Institution/UniversityOfLakhnaw.svg";
import NPGC from "../../assets/Institution/NPGC.svg";
import RCD from "../../assets/Institution/RCd.svg";
import SSDC from "../../assets/Institution/SSCD.svg";

import NMIMS from "../../assets/Institution/NMIMS.svg";
import IIM from "../../assets/Institution/IIM.svg";
import Jaipiria from "../../assets/Institution/Jaipuria.svg";
import MSITD from "../../assets/Institution/MSITD.svg";
import IMT from "../../assets/Institution/IMT-Nagpur.svg";
import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Institution = () => {
  const images = [
    { src: IMT, title: "IMT Nagpur" },
    { src: Jaipiria, title: "Jaipuria College, Lucknow" },
    { src: ibs, title: "IBS, Hyderabad" },
    {
      src: ipcpsimg,
      title: "Public College of Professional Studies, Lucknow",
      className: "bg-white",
    },
    { src: UniversityOgLakhnaw, title: "Lucknow University, Lucknow" },
    { src: NPGC, title: "National PG College, Lucknow" },
    { src: MSITD, title: " Institute of Technology, Delhi" },
    { src: SSDC, title: "Swami Shraddhanand College, Delhi" },
    { src: RCD, title: "Ramjas College, Delhi" },
    { src: NMIMS, title: "NMIMS, Mumbai" },
    { src: IIM, title: "IIM Kashipur" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Initial index

  // Max number of images to display at a time
  const imagesPerPage = 4;
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       handleNext();
  //     }, 3000); // Change images every 3 seconds

  //     return () => clearInterval(interval); // Cleanup interval on component unmount
  //   }, [currentIndex]);

  // Navigate to the next set of images
  const handleNext = () => {
    if (currentIndex + imagesPerPage < images.length) {
      setCurrentIndex(currentIndex + imagesPerPage);
    }
  };

  // Navigate to the previous set of images
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - imagesPerPage);
    }
  };

  // Get the currently visible images based on index
  const visibleImages = images.slice(
    currentIndex,
    currentIndex + imagesPerPage
  );
  return (
    <div className="m-5">
      <div className="flex flex-col items-center justify-cente">
        <h3 className="w-full max-w-[1078.22px] h-auto font-poppins font-medium text-[24px] leading-[36px] text-center text-[#1D5F58] sm:text-[36px] sm:leading-[48px] md:text-[42.6667px] md:leading-[64px]">
          Partnered Institutions
        </h3>

        <p className="w-full max-w-[1078.22px] h-auto font-poppins font-medium text-[11.5556px] leading-[17px] text-center text-[#C8A117] sm:w-[1078.22px]">
          We are proud to collaborate with some of the most prestigious colleges
          and universities across the country for college placements, including:
        </p>
      </div>

      {/* <div className="relative w-full max-w-[1200px]  mx-auto">
      {/* Image container */}
      {/* <div className="flex justify-around flex-wrap items-start  mt-20 transition-transform duration-500 ease-in-out">
        {visibleImages.map((image, idx) => (
          <div key={idx} className="flex flex-col "> */}

      {/* <img src={image.src} alt={image.title} className="w-full h-auto " />
         
            <h3 className="text-center text-sm max-w-[160px] ">{image.title}</h3>
          </div>
        ))}
      </div> */}

      {/* Left "<" Text for Navigation */}
      {/* <span
        onClick={handlePrev}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer ${
          currentIndex === 0 ? "text-gray-300 cursor-not-allowed" : "text-white-700 hover:text-yellow-500"
        }`}
      >
        <BiChevronLeft className="text-5xl " />
      </span> */}

      {/* Right ">" Text for Navigation */}
      {/* <span
        onClick={handleNext}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer ${
          currentIndex + imagesPerPage >= images.length ? "text-gray-300 cursor-not-allowed" : "text-white-700 hover:text-yellow-500"
        }`}
      >
        <BiChevronRight className="text-5xl" />
      </span>
    </div> */}

      <div className="  mt-10">
        <div className="flex animate-marquee whitespace-wrap items-center justify-center">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center  mx-5 my-5"
            >
              <img
                src={image.src}
                alt={image.title}
                className="max-w-[2000px] max-h-[3900px]"
              />

              <p className="text-sm text-center  break-words max-w-[200px]">
                {image.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Institution;
