import React from "react"
import Flow2b from "./Flow2b"
import img1 from "../../../assets/property/property-1.jpg"
//import img2 from "../../assets/image/Flow2/img2.png"
import shild from "../../../assets/property/shield.png"
import { MdOutlineStarPurple500 } from "react-icons/md"
import { MdStarOutline } from "react-icons/md"
import { CiShare2 } from "react-icons/ci"
import { IoIosAdd } from "react-icons/io"
import { CiHeart } from "react-icons/ci"
import profile from "../../../assets/property/author.jpg"
import fav from "../../../assets/property/Vector.png"

const Flow2a = () => {
  return (
    <div className="pl-2 pr-4 mx-4">
      {/* image section */}
      <div className="relative pb-2">
        {/* temporary img section start*/}
        <div className="w-full ">
          <img
            src={img1}
            alt=""
            srcset=""
            className="w-full h-80 object-cover"
          />
        </div>
        
        <div className="absolute w-full bottom-0">
          <p className="bg-white inline p-1 px-3 rounded-lg justify-content: center;
">
            Photos | Videos | Property Map
          </p>
        </div>
      </div>
      {/* image portion ended */}

      {/* 2nd div started */}
      <div className="md:flex justify-between	pt-8">
        <div className="">
          <h1 className="text-left text-white text-4xl">
            Flat / Rent{" "}
            <span>
              <img src={shild} alt="" className="h-10 w-10 inline" />
            </span>
          </h1>
          <p className="text-gray-400 block">
            D 801 the woods apartment naubasta Deva road chinhat Lucknow
          </p>

          <div className="flex">
            <MdOutlineStarPurple500 className="text-[#FFC700] mt-1" />
            <MdOutlineStarPurple500 className="text-[#FFC700] mt-1" />
            <MdStarOutline className="text-[#FFFEFE] mt-1" />
            <MdStarOutline className="text-[#FFFEFE] mt-1" />
            <MdStarOutline className="text-[#FFFEFE] mt-1" />
            <p className="ml-2 text-gray-400">12 (Reviews)</p>
          </div>

          <div className="border border-gray-600 rounded-lg flex justify-between pl-3 pr-3">
            <div className="p-1">
              <p className="block text-gray-400">Monthly rent</p>
              <h3 className="text-white text-3xl">Rs. 12000</h3>
            </div>
            <div className="p-1 text-gray-400">
              <p className="block">Bhk</p>
              <h3 className="text-white text-3xl">2 bhk</h3>
            </div>
            <div className="p-1 text-gray-400">
              <p className="block">Availability</p>
              <h3 className="text-white text-3xl">Immediate</h3>
            </div>
          </div>
        </div>

        {/* 2nd div of div2 */}
        <div className="border-1	bg-white rounded-l w-1/4 p-4">
          <div className="flex justify-between">
            <p className="text-black	text-lg font-semibold">Request a visit</p>
            <div className="flex">
              <CiShare2 className="text-[#2E6A64] mt-1" />
              <IoIosAdd className="mt-1" />
              <CiHeart className="text-[#FF0B0B] mt-1" />
            </div>
          </div>
          <div className="flex">
            <img src={profile} alt="" className="h-8 w-8 inline" />
            <p className="pt-1 pl-3 text-gray-800">Deepti rastogi</p>
          </div>
          <div>
            <p className="block text-gray-400">+91 7318413444</p>
          </div>
          <div className="rounded-lg" style={{ backgroundColor: "#40B5A8" }}>
            <button className="flex w-full justify-evenly p-2 font-semibold">
              <img src={fav} alt="" className="inline h-6 w-5" />
              Add To Visit
            </button>
          </div>
        </div>
      </div>
      {/* 2nd div ended */}

      <Flow2b />    
    </div>
  )
}

export default Flow2a
