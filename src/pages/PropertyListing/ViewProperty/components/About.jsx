import React from "react";

const About = ({ selectComp, property }) => {
  return (
    <div className={`pb-4 ${selectComp > 2 ? "hidden" : ""}`}>
      <div className={`bg-white w-[65.6vw] ml-[19rem] rounded-lg p-3 pl-4`}>
        <p className="text-black block font-semibold lg:text-2xl  mb-6 tracking-wide">About</p>
        <p className="text-left mb-6">{property?.aboutTheProperty}</p>
      </div>
    </div>
  );
};

export default About;
