import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import image1 from "../../../assets/property/img1.svg";
import image2 from "../../../assets/property/img2.svg";
import image3 from "../../../assets/property/img3.svg";
import image4 from "../../../assets/property/img4.svg";

// Custom Next Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-[-23px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white text-[50px]"
      onClick={onClick}
    >
      &gt;
    </div>
  );
};

// Custom Previous Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-[-23px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white text-[50px]"
      onClick={onClick}
    >
      &lt;
    </div>
  );
};

export const PropertyCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />, // Use custom right arrow
    prevArrow: <PrevArrow />, // Use custom left arrow
  };
  return (
    <div className="bg-black text-white flex items-center justify-center flex-col p-5 mt-10 mb-10 w-full">
      <div className="flex items-center justify-center flex-col gap-3 w-full my-5 mb-8">
        {/* Heading */}
        <h1 className="text-4xl text-[#6CC1B6] font-bold">Top Locations</h1>
        {/* Subheading */}
        <p className="w-full md:w-2/4 text-[14px] text-[#CCB454] text-center">
          We proudly offer our services in these major cities, having successfully connected with numerous satisfied members along the way.
        </p>
      </div>
  
      <Slider {...settings} className="w-full px-3 md:px-8 lg:px-1">
        {/* Slide 1: Lucknow */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Image (on the left side) */}
          <div className="w-full md:w-1/2">
            <img src={image1} alt="Property in Lucknow" className="w-full h-auto" />
          </div>
          {/* Text (on the right side) */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6 items-start">
            <h2 className="text-[32px] md:text-[40px] font-normal">Find the best To-Let in Lucknow</h2>
            <p className="text-[#CCB454]">
              With No Brokerage on rental PGs | Flats | Houses | Offices.
            </p>
            <Link to={"/property-listing/Lucknow"} className="px-5 py-2 bg-[#d3d3d3] text-black rounded-lg">
              JOIN US
            </Link>
          </div>
        </div>
  
        {/* Slide 2: Ayodhya */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Image (on the left side) */}
          <div className="w-full md:w-1/2">
            <img src={image2} alt="Property in Ayodhya" className="w-full h-auto" />
          </div>
          {/* Text (on the right side) */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6 items-start">
            <h2 className="text-[32px] md:text-[40px] font-normal">Find the best To-Let in Ayodhya</h2>
            <p className="text-[#CCB454]">
              With No Brokerage on rental PGs | Flats | Houses | Offices.
            </p>
            <Link to={"/property-listing/Ayodhya"} className="px-5 py-2 bg-[#d3d3d3] text-black rounded-lg">
              JOIN US
            </Link>
          </div>
        </div>
  
        {/* Slide 3: Vellore */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Image (on the left side) */}
          <div className="w-full md:w-1/2">
            <img src={image3} alt="Property in Vellore" className="w-full h-auto" />
          </div>
          {/* Text (on the right side) */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6 items-start">
            <h2 className="text-[32px] md:text-[40px] font-normal">Find the best To-Let in Vellore</h2>
            <p className="text-[#CCB454]">
              With No Brokerage on rental PGs | Flats | Houses | Offices.
            </p>
            <Link to={"/property-listing/Vellore"} className="px-5 py-2 bg-[#d3d3d3] text-black rounded-lg">
              JOIN US
            </Link>
          </div>
        </div>
  
        {/* Slide 4: Kota */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Image (on the left side) */}
          <div className="w-full md:w-1/2">
            <img src={image4} alt="Property in Kota" className="w-full h-auto" />
          </div>
          {/* Text (on the right side) */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6 items-start">
            <h2 className="text-[32px] md:text-[40px] font-normal">Find the best To-Let in Kota</h2>
            <p className="text-[#CCB454]">
              With No Brokerage on rental PGs | Flats | Houses | Offices.
            </p>
            <Link to={"/property-listing/Kota"} className="px-5 py-2 bg-[#d3d3d3] text-black rounded-lg">
              JOIN US
            </Link>
          </div>
        </div>
      </Slider>
    </div>
  );
};