import React from "react";
import linkedinLogo from "../../assets/Hiring/linkedin.jpg";
import unstopLogo from "../../assets/Hiring/unstop.jpg";
import apnaLogo from "../../assets/Hiring/apna.jpg";
import pregradLogo from "../../assets/Hiring/pregrad.jpg"; // Add more logos as needed
import sunstoneLogo from "../../assets/Hiring/sunstone.jpg";

const images = [
  {
    src: linkedinLogo,
    alt: "LinkedIn",
    url: "https://www.linkedin.com/company/to-let-globe/posts/?feedView=all",
  },
  {
    src: unstopLogo,
    title: "Unstop",
    url: "https://unstop.com",
  },
  {
    src: apnaLogo,
    title: "Apna",
    url: "https://apna.co",
  },
  {
    src: pregradLogo,
    title: "Pregrad",
    url: "https://www.pregrad.in/",
  },
  {
    src: sunstoneLogo,
    title: "Sunstone",
    url: "https://sunstone.in",
  },
  {
    src: linkedinLogo,
    alt: "LinkedIn",
    url: "https://www.linkedin.com/company/to-let-globe/posts/?feedView=all",
  },
  {
    src: unstopLogo,
    title: "Unstop",
    url: "https://unstop.com",
  },
];

const HiringPartners = () => {
  const handleLogoClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="margin">
      <div className=" w-full px-10 py-2 bg-black  flex flex-col items-center justify-center relative border border-white rounded-lg shadow-lg">
        <div
          className="bg-black z-20 -mx-2 my-6  inline-block text-center "
          style={{
            width: "fit-content",
            padding: "0 16px",
            borderRadius: "10px",
            position: "relative",
            top: "-56px",
          }}
        >
          <h2 className="text-[#2e7766] text-2xl md:text-4xl font-bold">
            Our Hiring Partners
          </h2>
        </div>
        <div className="w-full text-center overflow-hidden">
          <div className=" animate-marquee flex justify-center items-center flex-wrap gap-10 md:gap-10  ">
            <div className="marquee ">
              {images.concat(images).map((image, idy) => (
                <div
                  key={idy}
                  className="flex flex-col justify-center mx-9 my-5"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="max-w-[900px] max-h-[900px]"
                    onClick={() => handleLogoClick(`${image.url}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringPartners;
