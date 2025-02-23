import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../assets/property/img1.svg";
import image2 from "../../assets/property/img2.svg";
import image3 from "../../assets/property/img3.svg";
import image4 from "../../assets/property/img4.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PropertyCarousel = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  // Slides data
  const slides = [
    { image: image1, city: "Lucknow" },
    { image: image2, city: "Ayodhya" },
    { image: image3, city: "Vellore" },
    { image: image4, city: "Kota" },
  ];

  // Navigation functions for mobile view
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Custom arrows for desktop slider (positioned outside the carousel container)
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

  // Slider settings for desktop view
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <>
      {/* Desktop (Laptop) View */}
      <div className="hidden min-[768px]:block min-w-[768px]">
        <div className="bg-black text-white flex items-center justify-center flex-col p-5 mt-10 mb-10 w-full">
          <div className="flex items-center justify-center flex-col gap-3 w-full my-5 mb-8">
            <h1 className="text-4xl text-[#1b5f58] font-bold">Top Locations</h1>
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
                      <h2 className="text-[40px] font-normal text-white text-left">
                        Find the best To-Let <br />
                        in {slide.city}
                      </h2>
                      <p className="text-[#CCB454] text-left pt-2">
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
        <div className="bg-black text-white flex items-center justify-center flex-col p-5 mt-10 mb-10">
          <div className="flex items-center justify-center flex-col gap-3 w-full my-1 mb-1">
            <h1 className="text-4xl text-[#1b5f58] font-bold">Top Locations</h1>
          </div>
        </div>

        <div className="relative w-10/12 mx-auto">
          <div className="overflow-hidden rounded-lg shadow-lg">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${
                  index === currentSlide ? "block" : "hidden"
                } bg-black`}
              >
                <div className="w-full h-64">
                  <img
                    src={slide.image}
                    alt={`Property in ${slide.city}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="py-4 text-white bg-[#232323] text-center">
                  <h2 className="text-2xl font-normal mb-2">
                    Find the best To-Let in {slide.city}
                  </h2>
                  <p className="text-[#CCB454] mb-4 text-xs">
                    With No Brokerage on rental PGs | Flats | Houses | Offices.
                  </p>
                  <Link
                    to={`/property-listing/${slide.city}`}
                    className="mx-auto px-4 py-2  my-4 bg-[#d3d3d3] text-black rounded-sm hover:bg-[#bebebe] transition-colors inline-block"
                  >
                    Explore Now
                  </Link>
                </div>
              </div>
            ))}
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
                onClick={() => setCurrentSlide(index)}
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
