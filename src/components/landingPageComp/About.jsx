import React from "react";
import image1 from "../../assets/about/image1.svg";
import image2 from "../../assets/about/image2.svg";
import image3 from "../../assets/about/image3.svg";

const About = () => {
  return (
    <div className="bg-black w-full p-5 mt-[12%] mb-[5%]">
      <h2 className="text-6xl font-bold text-white text-center">About Us</h2>

      <div className="flex flex-col lg:px-20 px-5">
        
        {/* Who We Are */}
        <div className="flex items-center justify-between lg:pt-[120px] pt-[70px] lg:flex-nowrap flex-wrap">
          <div className="w-full lg:w-1/2 text-center lg:text-left pb-10">
            <h3 className="font-poppins text-4xl font-normal text-yellow-500 pb-2">
              Who We Are
            </h3>
            <p className="font-poppins text-lg font-medium text-white leading-6">
              An Online Platform where property owners and tenants can directly contact each other with ZERO brokerage.
            </p>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={image1}
              alt="image1"
              className="w-full max-w-[300px] h-auto justfy-right"
            />
          </div>
        </div>

        {/* Our Vision */}
        <div className="flex items-center justify-between lg:pt-[120px] pt-[70px] lg:flex-nowrap flex-wrap">
          <div className="w-full lg:w-1/2 flex justify-center order-last lg:order-first">
            <img
              src={image2}
              alt="image2"
              className="w-full max-w-[300px] h-auto"
            />
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left pb-10">
            <h3 className="font-poppins text-4xl font-normal text-yellow-500 pb-2">
              Our Vision
            </h3>
            <p className="font-poppins text-lg font-medium text-white leading-6">
              To make it simple for people to search for and rent homes in new cities while doing so from the comfort of their own homes.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="flex items-center justify-between lg:pt-[120px] pt-[70px] lg:flex-nowrap flex-wrap">
          <div className="w-full lg:w-1/2 text-center lg:text-left pb-10">
            <h3 className="font-poppins text-4xl font-normal text-yellow-500 pb-2">
              Our Mission
            </h3>
            <p className="font-poppins text-lg font-medium text-white leading-6">
              To hold To-let Boards At All Rental Properties Available nearby.
            </p>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={image3}
              alt="image3"
              className="w-full max-w-[300px] h-auto justify-right"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;