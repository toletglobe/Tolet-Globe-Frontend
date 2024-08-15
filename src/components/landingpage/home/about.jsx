import React from "react";
import image1 from "../../../assets/about/image1.svg";
import image2 from "../../../assets/about/image2.svg";
import image3 from "../../../assets/about/image3.svg";

export const About = () => {
  return (
    <div className="bg-black w-full p-5 mt-[12%] mb-[5%]">
      <h2 className="text-6xl font-bold text-white text-center">About Us</h2>
      <div className="flex flex-col items-center lg:px-40 px-10">
        <div className="flex items-center justify-center lg:pt-[120px] pt-[70px] flex-wrap lg:flex-nowrap">
          <div md={6} className="text-center pb-10">
            <h3 className="font-poppins text-4xl font-normal text-yellow-500 lg:text-left pb-2 text-center lg:pr-14">
              Who We Are
            </h3>
            <p className="font-poppins text-lg font-medium text-white leading-6 lg:text-left text-center lg:pr-14">
              An Online Platform where property owners and tenants can directly
              contact each other with ZERO brokerage.
            </p>
          </div>

          <div md={4} className="text-center pl-0 lg:pl-10">
            <img
              src={image1}
              alt="image1"
              className="w-full max-w-[300px] h-full max-h-[300px] m-auto"
            />
          </div>
        </div>

        <div className="flex items-center justify-center lg:pt-[120px] pt-[70px] lg:flex-nowrap flex-wrap">
          <div md={4} className="text-center lg:order-first order-last">
            <img
              src={image2}
              alt="image2"
              className="w-full max-w-[400px] h-full max-h-[400px] m-auto"
            />
          </div>

          <div md={6} className="pl-0 lg:pl-10 pb-10">
            <h3 className="font-poppins text-4xl font-normal text-[#f6ce3c] pb-2 lg:text-left text-center lg:pl-14">
              Our Vision
            </h3>
            <p className="font-poppins text-lg font-medium text-white leading-6 lg:text-left text-center lg:pl-14">
              To make it simple for people to search for and rent homes in new
              cities while doing so from the comfort of their own homes.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center lg:pt-[120px] pt-[70px]  lg:flex-nowrap flex-wrap">
          <div md={4} className="pb-10">
            <h3 className="font-poppins text-4xl font-normal text-[#f6ce3c] lg:text-left pb-2 text-center lg:pr-14">
              Our Mission
            </h3>
            <p className="font-poppins text-lg font-medium text-white leading-6 lg:text-left text-center lg:pr-14">
              To hold "To-Let" boards at all rental properties available nearby.
            </p>
          </div>

          <div md={4} className="text-center pl-0 lg:pl-10">
            <img
              src={image3}
              alt="image3"
              className="w-full max-w-[300px] h-full max-h-[300px] m-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
