import React, { useState } from "react";
import Forward from '../../assets/testimonial/Forward.png'
import Back from '../../assets/testimonial/Back.png'
import linked_in from "../../assets/testimonial/linked_in.png";
import Facebook from '../../assets/testimonial/Facebook.png';
import telegram from "../../assets/testimonial/telegram.png"
import instagram from "../../assets/testimonial/instagram.png"
import img1 from "../../assets/testimonial/img1.png"
import image2 from "../../assets/testimonial/image2.webp"
import image3 from "../../assets/testimonial/image3.jpg"
import image4 from "../../assets/testimonial/image4.jpg"
import image5 from "../../assets/testimonial/image5.webp"

const TestimonialCard = () => {
  const testimonials = [
    {
      name: "David",
      rating: 4,
      review: "To-Let is a game-changer for professionals like me relocating to new cities. I found a comfortable flat with ease, and the process was incredibly smooth.",
      image: img1,
    },
    {
      name: "Sarah",
      rating: 5,
      review: "The service was exceptional! I relocated to a new city and found a perfect flat thanks to To-Let.",
      image: image2,
    },
    {
      name: "John",
      rating: 3,
      review: "To-Let helped me find an affordable flat, though there were a few hiccups in the process.",
      image: image3,
    },
    {
      name: "Emily",
      rating: 4,
      review: "Great experience! Found a comfortable flat, and the service was smooth throughout.",
      image: image4,
    },
    {
      name: "Michael",
      rating: 5,
      review: "Amazing! I was able to find a beautiful apartment in no time, thanks to To-Let.",
      image: image5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (e) => {
    e.preventDefault();  
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = (e) => {
    e.preventDefault(); 
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full h-screen bg-black">
      <div className="flex flex-col items-center justify-center">
        <h3 className="w-full max-w-[1078.22px] h-auto font-poppins font-medium text-[24px] leading-[36px] text-center text-[#1D5F58] sm:text-[36px] sm:leading-[48px] md:text-[42.6667px] md:leading-[64px]">
          Testimonials
        </h3>
      </div>

      <div className="flex justify-center gap-x-40 mt-20">
        <div className="flex items-center m-10">
          <p className="text-yellow-500 text-2xl md:text-4xl mb-10 py-4 text-center">
            What People Say <br /> About Us
          </p>
        </div>

        <div className="flex flex-col items-center gap-y-2 relative">
          <div className="flex items-center justify-center relative">
            <button onClick={handlePrev} className="ml-4">
              <img
                src={Back}
                alt="Previous"
                className="w-15 h-10 md:w-25 md:h-20 cursor-pointer"
              />
            </button>

            <div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96 text-left">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-full rounded-md mb-4"
              />
              <h3 className="text-black font-bold text-lg">
                {testimonials[currentIndex].name}
              </h3>
              <div className="flex mb-4">
                {Array.from({ length: 5 }, (v, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < testimonials[currentIndex].rating
                        ? 'text-orange-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-black mb-4">
                {testimonials[currentIndex].review}
              </p>

              <div className="flex space-x-1 justify-end">
                <img
                  src={linked_in}
                  alt="LinkedIn"
                  className="w-6 h-6 cursor-pointer bg-[#25ABC3] p-2 rounded-full inline-block ml-10"
                />
                <img
                  src={Facebook}
                  alt="Facebook"
                  className="w-6 h-6 cursor-pointer ml-10"
                />
                <img
                  src={telegram}
                  alt="Telegram"
                  className="w-6 h-6 cursor-pointer ml-10"
                />
                <img
                  src={instagram}
                  alt="Instagram"
                  className="w-6 h-6 cursor-pointer ml-10"
                />
              </div>
            </div>

            <button onClick={handleNext} className="ml-4">
              <img
                src={Forward}
                alt="Next"
                className="w-15 h-10 md:w-25 md:h-20 cursor-pointer"
              />
            </button>
          </div>

          <div className="flex space-x-2 mt-4">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`w-5 h-5 rounded-full ${
                  index === currentIndex ? 'bg-yellow-400' : 'bg-gray-300'
                } cursor-pointer`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;