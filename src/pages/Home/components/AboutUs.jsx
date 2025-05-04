import React from "react";

import image1 from "../../../assets/home/aboutUs/image1.svg";
import image2 from "../../../assets/home/aboutUs/image2.svg";
import image3 from "../../../assets/home/aboutUs/image3.svg";

const aboutData = [
  {
    img: image1,
    title: "Who We Are",
    text: "An Online Platform Where Property Owners And Tenants Can Directly Contact Each Other With ZERO Brokerage.",
  },
  {
    img: image2,
    title: "Our Vision",
    text: "To Make It Simple For People To Search For And Rent Homes In New Cities While Doing So From The Comfort Of Their Own Homes.",
  },
  {
    img: image3,
    title: "Our Mission",
    text: "To Hold To-Let Boards At All Rental Properties Available Nearby.",
  },
];

const About = () => {
  return (
    <div className="bg-black w-full px-6 sm:px-12 lg:px-20 py-12 mt-[75px]">
      {/* About Us Heading (Shared Across All Views) */}
      <h2 className="text-[40px] md:text-7xl font-medium leading-[50px] md:leading-[96px] text-[#1D5F58] md:text-left text-center mb-[54px] max-lg:text-[47.88px] max-lg:text-white">
        About Us
      </h2>

      {/* Desktop & Tablet View */}
      <div className="hidden md:flex flex-col gap-[72px]">
        {aboutData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            {/* Text Section */}
            <div
              className={`w-[55%] max-w-2xl text-left ${
                index % 2 !== 0 ? "order-2 ml-[50px]" : ""
              }`}
            >
              <h3 className="text-5xl font-semibold text-yellow-500 mb-4">
                {item.title}
              </h3>
              <p className="text-3xl font-medium text-white leading-10">
                {item.text}
              </p>
            </div>

            {/* Image Section */}
            <div className="w-[30%] max-w-xs mx-auto">
              <img src={item.img} alt={item.title} className="w-full h-auto" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View (Fully Responsive) */}
      <div className="md:hidden w-[90%] max-w-[366px] mx-auto flex flex-col gap-[50px]">
        {aboutData.map((item, index) => (
          <div
            key={index}
            className="w-full flex flex-col items-center gap-[45px]"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full max-w-[362.7px] h-auto"
            />
            <div className="w-full max-w-[361.9px] text-left mx-auto">
              <h3 className="text-[32px] font-semibold text-yellow-500">
                {item.title}
              </h3>
              <p className="text-lg text-white leading-6">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
