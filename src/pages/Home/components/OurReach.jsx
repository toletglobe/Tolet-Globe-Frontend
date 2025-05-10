import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";


const useVisibility = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
};

const StatCard = ({ title, value, suffix, delay, isVisible }) => (
<div className="border border-white rounded-xl p-4 h-[86px] lg:h-32 flex flex-col justify-center items-start gap-1.5 min-w-[119px] w-full lg:max-w-60 hover:scale-105 transition-transform duration-200 ease-in-out">
    <h3 className="text-white text-xs md:text-sm lg:text-lg font-normal font-poppins w-full truncate">
      {title}
    </h3>
    <p className="text-white text-xl xl:text-2xl xl:font-bold w-full">
      {isVisible ? (
        <CountUp start={0} end={value} duration={2} delay={delay} separator="," />
      ) : (
        "0"
      )}
      {suffix}
    </p>
  </div>
);

export default function OurReach() {
  const [ref, isVisible] = useVisibility();

  const stats = [
    { title: "Partnered Universities", value: 20, suffix: "+" },
    { title: "Team Members", value: 300, suffix: "+" },
    { title: "Internships Offered", value: 1500, suffix: "+" },
    { title: "Satisfied Customers", value: 2000, suffix: "+" },
  ];

  return (
    <div className="w-full px-1 py-8 lg:px-0 xl:px-20 lg:py-10 flex justify-center items-center">
      <div
        ref={ref}
        className="bg-black px-2.5 sm:px-8 lg:px-2 xl:px-16 py-4 sm:py-12 lg:py-16 border border-[#C8C8C8] rounded-xl mx-4 sm:mx-10 lg:mx-4 w-[95%] max-w-[1200px]"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-1 xl:gap-5 sm:gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              {...stat}
              delay={index * 0.2}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  );
}