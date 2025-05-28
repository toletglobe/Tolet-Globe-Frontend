import React, { useRef } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import image1 from "../../../assets/home/propertyCarousal/img1.svg";
import image2 from "../../../assets/home/propertyCarousal/img2.svg";
import image3 from "../../../assets/home/propertyCarousal/img3.svg";
import image4 from "../../../assets/home/propertyCarousal/img4.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PropertyCarousel = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    { image: image1, city: "Lucknow" },
    { image: image2, city: "Ayodhya" },
    { image: image3, city: "Vellore" },
    { image: image4, city: "Kota" },
  ];

  const nextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  const goToSlide = (index) => {
    sliderRef.current?.slickGoTo(index);
  };

  const CustomPrevArrow = ({ onClick, style, className }) => (
    <div
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 text-white z-10 cursor-pointer"
      style={{ ...style, left: "-50px" }}
    >
      <FaChevronLeft size={30} />
    </div>
  );

  const CustomNextArrow = ({ onClick, style, className }) => (
    <div
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 text-white z-10 cursor-pointer"
      style={{ ...style, right: "-50px" }}
    >
      <FaChevronRight size={30} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden min-[768px]:block min-w-[768px]">
        <div className="bg-black text-white flex items-center justify-center flex-col p-5 mt-10 mb-10 w-full">
          <div className="flex items-center justify-center flex-col gap-3 w-full my-5 mb-8">
            <h1 className="text-5xl text-[#1b5f58] font-bold">Top Locations</h1>
            <p className="w-3/4 text-[14px] text-[#CCB454] text-center">
              We proudly offer our services in these major cities, having
              successfully connected with numerous satisfied members along the
              way.
            </p>
          </div>
        </div>
        <div className="w-[86%] ml-20 px-4 py-8 custom-slider-container mt-[10px] relative">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className="bg-black shadow-lg rounded-lg overflow-hidden"
              >
                <div className="flex flex-row h-[280px]">
                  <div className="w-1/2 h-full">
                    <img
                      src={slide.image}
                      className="object-cover w-full h-full"
                      alt={slide.city}
                    />
                  </div>
                  <div className="w-1/2 pl-8 flex flex-col justify-between items-start">
                    <div>
                      <h2 className="text-5xl font-normal text-white text-left">
                        Find the best To-Let <br />
                        in {slide.city}
                      </h2>
                      <p className="text-[#CCB454] text-xl text-left pt-2">
                        With No Brokerage on rental PGs | Flats | Houses |
                        Offices.
                      </p>
                    </div>
                    <Link
                      to={`/property-listing/${slide.city}`}
                      className="px-7 py-2 bg-[#d3d3d3] text-black rounded-sm mt-4"
                    >
                      JOIN US
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block min-[768px]:hidden max-w-[450px]">
        <div className="bg-black text-white flex items-center justify-center flex-col p-5 mt-10 mb-4">
          <div className="flex items-center justify-center flex-col gap-3 w-full my-1 ">
            <h1 className="text-3xl text-[#1b5f58] font-semibold">
              Top Locations
            </h1>
            <p className="text-[#C8A21C] text-xs text-center leading-[25px]">
              We proudly offer our services in these major cities, having
              successfully connected with numerous satisfied members along the
              way.
            </p>
          </div>
        </div>

        <div className="relative w-10/12 mx-auto">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <Slider ref={sliderRef} {...settings}>
              {slides.map((slide, index) => (
                <div key={index} className="bg-[#232323]">
                  <img
                    src={slide.image}
                    alt={`Property in ${slide.city}`}
                    className="w-full h-[200px] object-cover block"
                  />
                  <div className="bg-[#232323] text-center h-[180px] flex flex-col justify-between">
                    <div className="pt-3 pb-3 text-white flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-normal mb-2 line-clamp-2">
                          Find the best To-Let in {slide.city}
                        </h2>
                        <p className="text-[#CCB454] text-xs mb-4">
                          With No Brokerage on rental PGs | Flats | Houses |
                          Offices.
                        </p>
                      </div>
                      <Link
                        to={`/property-listing/${slide.city}`}
                        className="mx-auto px-6 py-[7.25px] mb-4 bg-[#FFF] text-black rounded-[3px] hover:bg-[#bebebe] transition-colors inline-block"
                      >
                        Join Us
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <button
            onClick={prevSlide}
            className="absolute -left-7 top-1/2 transform -translate-y-1/2 text-white z-10"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-7 top-1/2 transform -translate-y-1/2 text-white z-10"
          >
            <FaChevronRight size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? "bg-[#1b5f58]" : "bg-[#1a1a1a]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCarousel;
