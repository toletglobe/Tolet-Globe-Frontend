import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../assets/property/img1.svg";
import image2 from "../../assets/property/img2.svg";
import image3 from "../../assets/property/img3.svg";
import image4 from "../../assets/property/img4.svg";

// Add these imports for custom arrow icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PropertyCarousel = () => {
  // Custom arrow components
  
  const CustomPrevArrow = ({ onClick }) => (
    <div onClick={onClick} className="custom-arrow custom-prev-arrow">
      <FaChevronLeft size={30} />
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div onClick={onClick} className="custom-arrow custom-next-arrow">
      <FaChevronRight size={30} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const slides = [
    {
      image: image1, // Replace with your image URL
      city: "Lucknow",
    },
    {
      image: image2, // Replace with your image URL
      city: "Ayodhya",
    },
    {
      image: image3, // Replace with your image URL
      city: "Vellore",
    },
    {
      image: image4, // Replace with your image URL
      city: "Kota",
    },
  ];

  return (
    <>
      <div className="bg-black text-white flex items-center justify-center flex-col p-5 mt-10 mb-10 w-full">
        <div className="flex items-center justify-center flex-col gap-3 w-full my-5 mb-8">
          {/* Heading */}
          <h1 className="text-4xl text-[#1b5f58] font-bold">Top Locations</h1>
          {/* Subheading */}
          <p className="w-full md:w-3/4 text-[14px] text-[#CCB454] text-center">
            We proudly offer our services in these major cities, having
            successfully connected with numerous satisfied members along the
            way.
          </p>
        </div>
      </div>
      <div className="w-[85%] mx-auto px-4 py-8 custom-slider-container">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="bg-black shadow-lg rounded-lg overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image on the left */}
                <div className="w-full md:w-1/2 h-64 md:h-auto">
                  <img
                    src={slide.image}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Text on the right */}
                <div className="w-full md:w-1/2 pl-8 flex flex-col justify-between items-start space-y-4">
                  <div>
                    <h2 className="text-[32px] md:text-[40px] font-normal text-left">
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
      <style>{`
        .custom-slider-container :global(.slick-prev),
        .custom-slider-container :global(.slick-next) {
          display: none !important;
        }
        .custom-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          cursor: pointer;
        }
        .custom-prev-arrow {
          left: -40px;
        }
        .custom-next-arrow {
          right: -40px;
        }
      `}</style>
    </>
  );
};

export default PropertyCarousel;
