import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

export default function OurReach() {
  const [isVisibleMobile, setIsVisibleMobile] = useState(false);
  const [isVisibleDesktop, setIsVisibleDesktop] = useState(false);
  const mobileRef = useRef(null);
  const desktopRef = useRef(null);

  const stats = [
    { title: "Partnered Universities", value: 20, suffix: "+" },
    { title: "Team Members", value: 300, suffix: "+" },
    { title: "Internships Offered", value: 1500, suffix: "+" },
    { title: "Satisfied Customers", value: 2000, suffix: "+" },
  ];

  // Observer function
  const useIntersectionObserver = (ref, setIsVisible) => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref, setIsVisible]);
  };

  // Apply observers
  useIntersectionObserver(mobileRef, setIsVisibleMobile);
  useIntersectionObserver(desktopRef, setIsVisibleDesktop);

  return (
    <div className="w-full px-1 py-8 lg:px-20 lg:py-10 flex justify-center items-center">
      {/* Mobile View */}
      <div
        ref={mobileRef}
        className="bg-black px-2.5 sm:px-5 py-4 sm:py-8 border border-red rounded-xl mx-20 w-[95%] sm:w-[50%] h-auto flex flex-col gap-4 sm:gap-8 justify-center items-center lg:hidden"
      >
        <div className="flex gap-4 sm:gap-8 w-full justify-center">
          {stats.slice(0, 2).map((stat, index) => (
            <div
              key={index}
              className="border border-white rounded-lg p-4 min-w-[119.19px] w-[166px] h-[85.75px] flex flex-col justify-center items-start gap-1.5"
            >
              <h3 className="text-white text-xs font-normal leading-5 font-poppins w-full">
                {stat.title}
              </h3>
              <p className="text-white font text-xl w-full">
                {isVisibleMobile ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2}
                    delay={index * 0.2}
                    separator=","
                  />
                ) : (
                  "0"
                )}
                {stat.suffix}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 sm:gap-8 w-full justify-center">
          {stats.slice(2, 4).map((stat, index) => (
            <div
              key={index}
              className="border border-white rounded-lg p-4 min-w-[119.19px] w-[166px] h-[85.75px] flex flex-col justify-center items-start gap-1.5"
            >
              <h3 className="text-white text-xs font-normal leading-5 font-poppins w-full">
                {stat.title}
              </h3>
              <p className="text-white font text-xl w-full">
                {isVisibleMobile ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2}
                    delay={(index + 2) * 0.2}
                    separator=","
                  />
                ) : (
                  "0"
                )}
                {stat.suffix}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Laptop and Tablet View */}
      <div
        ref={desktopRef}
        className="w-[1200px] h-60 bg-black border border-[#C8C8C8] rounded-[10px] px-20 py-14 relative hidden lg:flex justify-center items-center mx-auto"
      >
        <div className="grid grid-cols-4 gap-5 w-full">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="w-[98%] min-w-52 h-32 border border-white rounded-[13.61px] p-[27.22px] flex flex-col gap-2.5 transition-transform duration-300 hover:scale-105"
            >
              <div className="w-48 h-7 flex items-center">
                <h3 className="text-white text-lg font-medium text-center truncate">
                  {stat.title}
                </h3>
              </div>
              <div className="w-48 h-9 flex items-center">
                <p className="text-white text-[27.22px] leading-[34.02px] work-sans font-bold">
                  {isVisibleDesktop ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2}
                      delay={index * 0.2}
                      separator=","
                    />
                  ) : (
                    "0"
                  )}
                  <span className="text-lg ml-1">{stat.suffix}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
