

import React, { useEffect, useRef, useState } from "react";
import linkedinLogo from "../../assets/Hiring/linkedin.jpg";
import unstopLogo from "../../assets/Hiring/unstop.jpg";
import apnaLogo from "../../assets/Hiring/apna.jpg";
import pregradLogo from "../../assets/Hiring/pregrad.jpg";
import sunstoneLogo from "../../assets/Hiring/sunstone.jpg";

const images = [
  { src: linkedinLogo, alt: "LinkedIn", url: "https://www.linkedin.com/company/to-let-globe/posts/?feedView=all" },
  { src: unstopLogo, title: "Unstop", url: "https://unstop.com/c/to-let-globe-911784" },
  { src: apnaLogo, title: "Apna", url: "https://apna.co" },
  { src: pregradLogo, title: "Pregrad", url: "https://www.pregrad.in/" },
  { src: sunstoneLogo, title: "Sunstone", url: "https://sunstone.in" },
];

const HiringPartners = () => {
  const headingRef = useRef(null);
  const [headingHeight, setHeadingHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // For mobile dragging
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (headingRef.current) {
      setHeadingHeight(headingRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (headingRef.current) {
        setHeadingHeight(headingRef.current.clientHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div className="margin">
      {/* Outer (white bordered) container with increased vertical padding */}
      <div className="w-full px-3 py-6 md:py-8 bg-black flex flex-col items-center justify-center relative border border-white rounded-lg shadow-lg">
        {/* Absolutely positioned heading container */}
        <div
          className="bg-black z-20 inline-block text-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            padding: "0 16px",
            borderRadius: "10px",
          }}
        >
          <h2
            ref={headingRef}
            className="text-[#2e7766] text-2xl md:text-4xl font-bold whitespace-nowrap md:whitespace-normal"
          >
            Our Hiring Partners
          </h2>
        </div>

        {/* Images Container – pushed down by half the heading’s height */}
        <div
          className="w-full text-center overflow-hidden"
          style={{
            marginTop: headingHeight / 2,
          }}
        >
          {/* Desktop View – Marquee Effect */}
          <div className="hidden md:flex animate-marquee justify-center items-center gap-0">
            {images.concat(images).map((image, idx) => (
              <div
                key={idx}
                className={`flex flex-col justify-center mx-9 my-5 ${idx === 0 ? "ml-[26.61px]" : ""} ${idx === images.length - 1 ? "mr-[26.61px]" : ""}`}
              >
                <img
                  src={image.src}
                  alt={image.title || image.alt}
                  className="max-w-[900px] max-h-[900px] cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => window.open(image.url, "_blank")}
                />
              </div>
            ))}
          </div>

          {/* Mobile View – Scrollable List with 26px gap */}
          <div
            ref={scrollRef}
            className="flex md:hidden overflow-x-scroll cursor-grab whitespace-nowrap items-center scroll-smooth"
            onMouseDown={startDrag}
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={startDrag}
            onTouchMove={onDrag}
            onTouchEnd={stopDrag}
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex gap-[26px] px-5">
              {images.map((image, idx) => (
                <div
                  key={idx}
                  className="inline-block m-0 p-0.5 bg-white rounded-lg flex items-center justify-center"
                >
                  <img
                    src={image.src}
                    alt={image.title || image.alt}
                    className="max-w-[120px] max-h-[120px] object-contain cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => window.open(image.url, "_blank")}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringPartners;
