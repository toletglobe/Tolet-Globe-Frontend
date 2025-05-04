import React from "react";

export default function Flip(props) {
  return (
    <>
      <div>
        <div className="relative text-center transition-transform duration-700 flex justify-center h-[100px] md:h-[250px] w-[100px] md:w-[250px] [perspective:1000px] group">
          <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div className="absolute flex justify-center items-center w-full h-full">
              <img
                className="border-[3px] border-[#6cc0c4] rounded-3xl object-cover h-full w-full"
                src={props.image}
                alt="Founder"
              />
            </div>
            <div className="absolute w-full h-full bg-black text-white border-[3px] border-[#6cc0c4] rounded-3xl flex justify-center items-center flex-col [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <a
                href={props.linkedin}
                className="no-underline text-white text-sm md:text-3xl"
              >
                <h2 className="font-semibold">{props.name}</h2>
                <p className="font-medium">{props.post}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
