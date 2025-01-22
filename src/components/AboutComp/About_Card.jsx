import React from "react";
import "./styles/card.css";
import logo from "../../assets/logo.png";
export default function About_Card(props) {
  const containerClass = `container ${props.place}`;
  // const line = `${props.place + "line"}`
  const line =
    props.place === "left"
      ? "w-[19%] absolute top-[52%] border-t-4 border-[#6cc0c4] right-[0%] hidden md:block "
      : "w-[20%] absolute top-[52%] border-t-4 border-[#6cc0c4] left-[0%] hidden md:block";
  const paddingStyles =
    props.place === "left"
      ? "md:py-2 md:pr-[10%] md:pl-[4.2%] "
      : "md:py-2 md:pr-[4.2%] md:pl-[10%] ";

  // Dynamic position styles
  const positionStyles = props.place === "left" ? "left-0" : "left-[50%]";

  return (
    <>
      <div
        className={`${containerClass} ${positionStyles} ${paddingStyles} md:relative md:w-[50.5%] md:mb-20 md:mt-0 md:ml-0 md:mr-0  sm:mx-6 mb-8 after:hidden md:after:block  `}
      >
        <div className="text-box py-9  px-6 relative rounded-3xl border-2 border-[#6cc0c4]  sm:min-w-72 md:min-w-36 lg:min-w-52 md:overflow-hidden">
          <h1 className="text-center text-[#e59948] font-bold text-4xl sm:text-2xl">
            {props.head}
          </h1>
          <p className="text-xl text-white mt-3">{props.paragraph}</p>
        </div>
        <span className={line}></span>
      </div>
    </>
  );
}
