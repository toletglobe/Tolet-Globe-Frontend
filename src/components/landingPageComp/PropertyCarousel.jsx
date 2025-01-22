import React from "react";
import { Link } from "react-router-dom";
import image1 from "../../assets/property/img1.svg";
import image2 from "../../assets/property/img2.svg";
import image3 from "../../assets/property/img3.svg";
import image4 from "../../assets/property/img4.svg";


const PropertyCarousel = () => {
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

  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="w-full">
      {/* Top Locations Section */}
      <div className="bg-black text-white flex items-center justify-center flex-col p-5 mt-10 mb-10">
        <div className="flex items-center justify-center flex-col gap-3 w-full my-1 mb-1">
          <h1 className="text-4xl text-[#1b5f58] font-bold">Top Locations</h1>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="relative w-11/12 mx-auto">
        <div className="overflow-hidden rounded-lg shadow-lg">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`${
                index === currentSlide ? "block" : "hidden"
              } bg-black`}
            >
              {/* Image Section */}
              <div className="w-full h-64 md:h-96">
                <img
                  src={slide.image}
                  alt={`Property in ${slide.city}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content */}
              <div className="p-6 text-white">
                <h2 className="text-3xl md:text-4xl font-normal mb-2 text-center">
                  Find the best To-Let in {slide.city}
                </h2>
                <p className="text-[#CCB454] mb-4 text-center">
                  With No Brokerage on rental PGs | Flats | Houses | Offices.
                </p>
                <Link
                  to={`/property-listing/${slide.city}`}
                  className="inline-block px-7 py-2 bg-[#d3d3d3] text-black rounded-sm hover:bg-[#bebebe] transition-colors flex items-center justify-center"
                >
                  JOIN US
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/3 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-r"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/3 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-l"
        >
          →
        </button>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-[#1b5f58]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCarousel;