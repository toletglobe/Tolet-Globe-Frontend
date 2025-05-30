import React, { useEffect, useRef, useState } from "react";

import linkedinLogo from "../../../assets/home/hiringPartners/linkedin.jpg";
import unstopLogo from "../../../assets/home/hiringPartners/unstop.jpg";
import apnaLogo from "../../../assets/home/hiringPartners/apna.jpg";
import pregradLogo from "../../../assets/home/hiringPartners/pregrad.jpg";
import sunstoneLogo from "../../../assets/home/hiringPartners/sunstone.jpg";

const images = [
  {
    src: linkedinLogo,
    alt: "LinkedIn",
    url: "https://www.linkedin.com/company/to-let-globe/posts/?feedView=all",
  },
  {
    src: unstopLogo,
    title: "Unstop",
    url: "https://unstop.com/c/to-let-globe-911784",
  },
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

  useEffect(() => {
    if (scrollRef.current && window.innerWidth < 768) {
      // Scroll to third item
      const itemWidth = 120; // width of each item
      const gap = 30; // gap between items
      scrollRef.current.scrollLeft = (itemWidth + gap) * 2 + (itemWidth / 1) - (window.innerWidth / 3); // Center the Apna item
    }
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
      <div className="w-full px-6 py-8 md:py-10 bg-black flex flex-col items-center justify-center relative border border-white rounded-lg shadow-lg">
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
            className="text-[#1b5f58] text-2xl md:text-5xl font-bold whitespace-nowrap md:whitespace-normal"
          >
            Our Hiring Partners
          </h2>
        </div>

        {/* Images Container – pushed down by half the heading's height */}
        <div
          className="w-full text-center overflow-hidden"
          style={{
            marginTop: headingHeight / 2,
          }}
        >
          {/* Desktop View – Static Row with Rectangular Images */}
          <div className="hidden md:flex justify-center items-center gap-[40px] px-3 py-9">
            {images.map((image, idx) => (
              <div
                key={idx}
                className="flex justify-center items-center bg-white rounded-lg p-2"
                style={{ width: "220px", height: "100px" }} // Rectangular aspect ratio
              >
                <img
                  src={image.src}
                  alt={image.title || image.alt}
                  className="w-auto h-full object-contain cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => window.open(image.url, "_blank")}
                />
              </div>
            ))}
          </div>

          {/* Mobile View – Scrollable List */}
          <div
            ref={scrollRef}
            className="flex md:hidden overflow-x-scroll cursor-grab whitespace-nowrap items-center scroll-smooth px-[20%]"
            onMouseDown={startDrag}
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={startDrag}
            onTouchMove={onDrag}
            onTouchEnd={stopDrag}
            style={{
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="flex gap-[26px]">
              {images.map((image, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 m-0 p-0.5 bg-white rounded-lg flex items-center justify-center"
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
