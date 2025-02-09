import React from "react";
import linkedinLogo from "../../assets/Hiring/linkedin.jpg";
import unstopLogo from "../../assets/Hiring/unstop.jpg";
import apnaLogo from "../../assets/Hiring/apna.jpg";
import pregradLogo from "../../assets/Hiring/pregrad.jpg";
import sunstoneLogo from "../../assets/Hiring/sunstone.jpg";

const images = [
  { src: unstopLogo, title: "Unstop", url: "https://unstop.com" },
  { src: apnaLogo, title: "Apna", url: "https://apna.co" },
  { src: pregradLogo, title: "Pregrad", url: "https://www.pregrad.in/" },
  { src: sunstoneLogo, title: "Sunstone", url: "https://sunstone.in" },
  { src: linkedinLogo, alt: "LinkedIn", url: "https://www.linkedin.com/company/to-let-globe/posts/?feedView=all" },
];

// Duplicate images to create a seamless effect
const repeatedImages = [...images, ...images];

const HiringPartners = () => {
  const handleLogoClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="margin">
      <div className="w-full px-3 py-2 bg-black flex flex-col items-center justify-center relative border border-white rounded-lg shadow-lg">
        <div
          className="bg-black z-20 -mx-2 my-6 inline-block text-center"
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

        {/* Marquee Scrolling Effect */}
        <div className="w-full overflow-hidden relative">
          <div className="flex w-max gap-10 animate-[marquee_25s_linear_infinite]">
            {repeatedImages.map((image, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={image.src}
                  alt={image.title || image.alt}
                  className="w-40 h-40 object-contain cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleLogoClick(image.url)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animation (Inline CSS) */}
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default HiringPartners;
