import React from "react";

const About = ({ selectComp, property }) => {
  return (
    <div className={`pb-4 ${selectComp > 2 ? "hidden" : ""}`}>
      <div className={`bg-white w-full rounded-lg p-3 pl-4`}>
        <p className="text-black block font-semibold text-xl">About</p>
        <p className=" text-left mb-0">{property?.aboutTheProperty}</p>
      </div>
    </div>
  );
};

export default About;
