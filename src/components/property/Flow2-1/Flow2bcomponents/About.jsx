import React from "react";


const About = ({selectComp}) => {
    return(
        <div className={`pb-4 ${selectComp > 2 ? "hidden" : ""}`}>
        <div className={`bg-white w-full rounded-lg p-3`}>
          <p className="text-black block font-semibold text-xl">About</p>
          <p className=" text-left mb-0">
            Brand New!! Residential 2 BHK Semi Furnished Flat at 4th floor
            with both Indian and Western bathrooms and Car Parking facility
            great for nuclear family or extra income. Pets are allowed and
            price is negotiable located at D 801 the woods apartment
            naubasta Deva road chinhat Lucknow.
          </p>

          
        </div>
      </div>
    )
}

export default About;