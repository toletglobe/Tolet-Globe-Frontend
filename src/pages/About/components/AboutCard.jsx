import React from "react";

import "./styles/card.css";

export default function AboutCard(props) {
  const containerClass = `container ${props.place}`;
  const line =
    props.place === "left"
      ? "w-[20%] absolute top-[52%] border-t-4 border-[#6cc0c4] right-[0%] hidden md:block "
      : "w-[20%] absolute top-[52%] border-t-4 border-[#6cc0c4] left-[0%] hidden md:block";
  const paddingStyles =
    props.place === "left"
      ? "md:py-2 md:pr-[4%] md:pl-[6%] md:-pl-6 "
      : "md:py-2 md:pr-[4%] md:pl-[6%] md:-pl-6 ";

  // For left cards: keep mobile view unchanged (left-[35px]) and for tablet/laptop, move left by 200px (35 - 200 = -165px)
  const positionStyles =
    props.place === "left"
      ? "left-[35px] md:left-[-1px] xl:left-[36px]"
      : "md:left-[50%] md:left-[3%]";

  return (
    <>
      <div
        className={`${containerClass} ${positionStyles} ${paddingStyles} md:relative md:w-[48%] md:mb-20 md:mt-0 md:ml-0 md:mr-0 sm:mx-6 mb-8 after:hidden md:after:block`}
      >
        <div className="relative z-[2] border-2 border-[#6cc0c4] bg-black rounded-3xl p-4 text-white py-9 px-6 sm:-ml-1 min-w-72 ml-2 lg:min-w-52 md:overflow-hidden">
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-[#E59948] lg:text-[#E8B636] mb-4">
            {props.head}
          </h1>
          <p className="text-base sm:text-lg leading-7 text-white">{props.paragraph}</p>
        </div>
        <span className={line}></span>
      </div>
    </>
  );
}
