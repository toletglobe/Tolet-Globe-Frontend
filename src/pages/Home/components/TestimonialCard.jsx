import React, { useState } from "react";
import Slider from "react-slick";

import img1 from "../../../assets/home/testimonial/img1.png";
import image2 from "../../../assets/home/testimonial/image2.webp";
import image3 from "../../../assets/home/testimonial/image3.jpg";
import image4 from "../../../assets/home/testimonial/image4.jpg";
import image5 from "../../../assets/home/testimonial/image5.webp";
import Back from "../../../assets/home/testimonial/Back.png";
import Forward from "../../../assets/home/testimonial/Forward.png";
import linked_in from "../../../assets/home/testimonial/linked_in.png";
import Facebook from "../../../assets/home/testimonial/Facebook.png";
import telegram from "../../../assets/home/testimonial/telegram.png";
import instagram from "../../../assets/home/testimonial/instagram.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialCard = () => {
  const [colored, setColored] = useState(0);
  // Image array
  const images = [
    {
      name: "David",
      rating: 4,
      review:
        "To-Let is a game-changer for professionals like me relocating to new cities. I found a comfortable flat with ease, and the process was incredibly smooth.",
      image: img1,
    },
    {
      name: "Sarah",
      rating: 5,
      review:
        "The service was exceptional! I relocated to a new city and found a perfect flat thanks to To-Let.",
      image: image2,
    },
    {
      name: "John",
      rating: 3,
      review:
        "To-Let helped me find an affordable flat, though there were a few hiccups in the process.",
      image: image3,
    },
    {
      name: "Emily",
      rating: 4,
      review:
        "Great experience! Found a comfortable flat, and the service was smooth throughout.",
      image: image4,
    },
    {
      name: "Michael",
      rating: 5,
      review:
        "Amazing! I was able to find a beautiful apartment in no time, thanks to To-Let.",
      image: image5,
    },
  ];

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div onClick={onClick}>
        <img
          onClick={() => setColored(colored + 1)}
          src={Forward}
          alt="Next"
          className="absolute top-1/2 right-[-30%] transform -translate-y-1/2 text-white p-2 rounded-full"
          // Increased right position from the edge
        />
      </div>
    );
  };

  // Custom Previous Arrow
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div onClick={onClick}>
        <img
          onClick={() => setColored(colored - 1)}
          src={Back}
          alt="Previous"
          className="absolute top-1/2 left-[-30%] transform -translate-y-1/2 text-white p-2 rounded-full"
          // Increased left from 50% (2/4) to 60%
        />
      </div>
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    afterChange: (current) => setColored(current),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto justify-center hidden ">
      <div className="flex flex-col items-center justify-center">
        <h3 className="font-poppins font-medium text-[24px] leading-[36px] text-center text-[#1D5F58] sm:text-[36px] sm:leading-[48px] md:text-[42.6667px] md:leading-[64px]">
          Testimonials
        </h3>
      </div>
      <div className="flex justify-center gap-x-40 mt-10 ">
        <div className="flex items-center ">
          <p className="text-yellow-500 text-2xl md:text-4xl mb-10 py-4 text-center">
            What People Say <br /> About Us
          </p>
        </div>

        {/* Slider */}
        <Slider
          {...settings}
          className="w-[400px] h[500px] px-3 md:px-8  lg:px-1 "
        >
          {images.map((d, index) => (
            <div
              key={index}
              className=" bg-white p-4 rounded-lg shadow-lg w-0 h-[480px]  md:w-[300px] text-left"
            >
              <img
                src={d.image}
                alt={d.name}
                className="w-full h-64 object-cover transition-transform duration-500"
              />
              <h3 className="text-black font-bold text-lg mt-4">{d.name}</h3>
              <div className="flex mb-2">
                {Array.from({ length: 5 }, (v, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < d.rating ? "text-orange-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-black mb-4">{d.review}</p>
              <div className="flex space-x-2 justify-end">
                <img
                  src={linked_in}
                  alt="LinkedIn"
                  className="w-6 h-6 cursor-pointer bg-[#25ABC3] p-2 rounded-full"
                />
                <img
                  src={Facebook}
                  alt="Facebook"
                  className="w-6 h-6 cursor-pointer"
                />
                <img
                  src={telegram}
                  alt="Telegram"
                  className="w-6 h-6 cursor-pointer"
                />
                <img
                  src={instagram}
                  alt="Instagram"
                  className="w-6 h-6 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="absolute bottom-[-5%] left-[73%] transform -translate-x-1/2 flex space-x-2  ">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === colored ? "bg-yellow-400" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
