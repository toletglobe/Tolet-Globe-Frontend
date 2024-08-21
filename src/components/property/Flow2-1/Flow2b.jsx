import React, { useEffect, useState } from "react"
import { MdBedroomParent } from "react-icons/md"
//import map from "../../assets/image/Flow2/map.png"
import { MdOutlineBathroom } from "react-icons/md"
import { IoTabletLandscape } from "react-icons/io5"
import { LuParkingCircle } from "react-icons/lu"
import { CiMobile4 } from "react-icons/ci"
import { MdSecurity } from "react-icons/md"
import { CgGym } from "react-icons/cg"
import { LuFlower2 } from "react-icons/lu"
import { FaFileImport, FaHammer } from "react-icons/fa6"
import { GiMicrophone } from "react-icons/gi"
import { GiFamilyHouse } from "react-icons/gi"
import { MdOutlineAvTimer } from "react-icons/md"
import { PiStudentBold } from "react-icons/pi"
import { MdPets } from "react-icons/md"
import { BsPeopleFill } from "react-icons/bs"
import { FaPeopleGroup } from "react-icons/fa6"
import { WiSmoke } from "react-icons/wi"
import { MdOutlineStarPurple500 } from "react-icons/md"
import { PiStarThin } from "react-icons/pi"
import profile from "../../../assets/property/author7.jpg"
import map from "../../../assets/property/map.png"
import Popup from "./Popup"

const Flow2b = () => {
  const [selectedButton, setSelectedButton] = useState("")
  const [selectComp, setSelectComp] = useState(0)
  const [showPopup, setShowPopup] = useState(false)

  const handleButtonClick = (button) => {
    setSelectedButton(button)
    switch (button) {
      case "Features":
        setSelectComp(1)
        break
      case "About":
        setSelectComp(2)
        break
      case "Amenities":
        setSelectComp(3)
        break
      case "Regulations":
        setSelectComp(4)
        break
      case "Location":
        setSelectComp(5)
        break
      case "Reviews":
        setSelectComp(6)
        break
      default:
        setSelectComp(0)
    }
  }

  const buttonClasses = "text-white font-semibold text-xl"

  return (
    <div>
      <div className="flex justify-between pt-10 pb-4">
        <button
          className={`${buttonClasses} ${
            selectedButton === "Features" ? "underline decoration-teal-500" : ""
          }`}
          onClick={() => handleButtonClick("Features")}
        >
          Features
        </button>
        <button
          className={`${buttonClasses} ${
            selectedButton === "About" ? "underline decoration-teal-500" : ""
          }`}
          onClick={() => handleButtonClick("About")}
        >
          About
        </button>
        <button
          className={`${buttonClasses} ${
            selectedButton === "Amenities"
              ? "underline decoration-teal-500"
              : ""
          }`}
          onClick={() => handleButtonClick("Amenities")}
        >
          Amenities
        </button>
        <button
          className={`${buttonClasses} ${
            selectedButton === "Regulations"
              ? "underline decoration-teal-500"
              : ""
          }`}
          onClick={() => handleButtonClick("Regulations")}
        >
          Regulations
        </button>
        <button
          className={`${buttonClasses} ${
            selectedButton === "Location" ? "underline decoration-teal-500" : ""
          }`}
          onClick={() => handleButtonClick("Location")}
        >
          Location
        </button>
        <button
          className={`${buttonClasses} ${
            selectedButton === "Reviews" ? "underline decoration-teal-500" : ""
          }`}
          onClick={() => handleButtonClick("Reviews")}
        >
          Reviews
        </button> 
      </div>

      <div className="mb-2">
        <div
          className={`bg-white w-full rounded-lg p-3 mb-4 ${
            selectComp > 1 ? "hidden" : ""
          }`}
        >
          <p className="text-black block font-semibold text-xl ">Features</p>
          <div className="flex flex-wrap max-w-full">
            <div className="border flex p-2 rounded-lg border-black mr-8">
              <MdBedroomParent className="h-6 w-6 mr-4 text-black bg-white" />
              <p className="inline pb-0 mb-0 font-normal">2 Bedrooms</p>
            </div>

            <div className="border flex p-2 rounded-lg border-black mr-8">
              <MdOutlineBathroom className="h-6 w-6 mr-4 text-black bg-white" />
              <p className="inline pb-0 mb-0 font-normal">2 Bathrooms</p>
            </div>

            <div className="border flex p-2 rounded-lg border-black mr-8">
              <LuParkingCircle className="h-6 w-6 mr-4 text-black bg-white" />
              <p className="inline pb-0 mb-0 font-normal">Parking</p>
            </div>

            <div className="border flex p-2 rounded-lg border-black mr-8">
              <IoTabletLandscape className="h-6 w-6 mr-4 text-black bg-white" />
              <p className="inline pb-0 mb-0 font-normal">1200 sq ft</p>
            </div>

            <div className="border flex p-2 rounded-lg border-black mr-8">
              <CiMobile4 className="h-6 w-6 mr-4 text-black bg-white" />
              <p className="inline pb-0 mb-0 font-normal">
                Appliances - TV, Refrigerator
              </p>
            </div>
          </div>
        </div>

        <div className={`pb-4 ${selectComp > 2 ? "hidden" : ""}`}>
          <div className={`bg-white w-full rounded-lg p-3`}>
            <p className="text-black block font-semibold text-xl">About</p>
            <p className=" text-left mb-0">
              Brand New!! Residential 2 BHK Semi Furnished Flat at 4th floor
              with both Indian and Western bathrooms and Car Parking facility
              great for nuclear family or extra income. Pets are allowed and
              price is negotiable located at D 801 the woods apartment naubasta
              Deva road chinhat Lucknow .
            </p>
          </div>
        </div>

        <div className={`pb-4 ${selectComp > 3 ? "hidden" : ""}`}>
          <div className={`bg-white w-full rounded-lg p-3`}>
            <p className="text-black block font-semibold text-xl">Amenities</p>
            <div className="flex flex-wrap max-w-full">
              <div className="border flex p-2 rounded-lg border-black mr-8">
                <MdSecurity className="h-6 w-6 mr-4 text-black bg-white" />
                <p className="inline pb-0 mb-0 font-normal">Security</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black mr-8">
                <CgGym className="h-6 w-6 mr-4 text-black bg-white" />
                <p className="inline pb-0 mb-0 font-normal">Gym</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black mr-8">
                <LuFlower2 className="h-6 w-6 mr-4 text-black bg-white" />
                <p className="inline pb-0 mb-0 font-normal">Garden</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black mr-8">
                <FaHammer className="h-6 w-6 mr-4 text-black bg-white" />
                <p className="inline pb-0 mb-0 font-normal">Maintainance</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black mr-8">
                <GiMicrophone className="h-6 w-6 mr-4 text-black bg-white" />
                <p className="inline pb-0 mb-0 font-normal">Club House</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black mr-8">
                <GiFamilyHouse className="h-6 w-6 mr-4 text-black bg-white" />
                <p className="inline pb-0 mb-0 font-normal">Semi furnished</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black mr-8">
                <MdOutlineAvTimer className="h-6 w-6 mr-4 text-black bg-white" />
                <p className="inline pb-0 mb-0 font-normal">24 hrs backup</p>
              </div>
            </div>
          </div>
        </div>

        {/* Regulation section */}
        <div className={`pb-4 ${selectComp > 4 ? "hidden" : ""}`}>
          <div className={`bg-white w-full rounded-lg p-3`}>
            <p className="text-black block font-semibold text-xl">
              Regulations
            </p>
            <div className="flex flex-wrap max-w-full">
              <div className="border flex p-2 rounded-lg border-black mr-8">
                <PiStudentBold className="h-6 w-6 mr-4 text-black bg-white" />
                <p className="inline pb-0 mb-0 font-normal">Student Friendly</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black mr-8">
                <MdPets className="h-6 w-6 mr-4 text-black bg-white" />
                <p className="inline pb-0 mb-0 font-normal">Pets Allowed</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black mr-8">
                <FaPeopleGroup className="h-6 w-6 mr-4 text-black bg-white" />
                <p className="inline pb-0 mb-0 font-normal">Guests Allowed</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black mr-8">
                <BsPeopleFill className="h-6 w-6 mr-4 text-black bg-white" />
                <p className="inline pb-0 mb-0 font-normal">Families allowed</p>
              </div>

              <div className="border flex p-2 rounded-lg border-black mr-8">
                <WiSmoke className="h-6 w-6 mr-4 text-black bg-white" />
                <p className="inline pb-0 mb-0 font-normal">Smokers allowed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location section */}
         <div className={`pb-4 ${selectComp > 5 ? "hidden" : ""}`}>
          <div className={`bg-white w-full rounded-lg p-3`}>
            <p className="text-black block font-semibold text-xl">Location</p>

            <div className="w-4/5">
              <div className="flex justify-between">
                <p className="text-gray-400">Gomti nagar , b block , Lucknow</p>
                <p className="font-semibold text-teal-500">Get Directions</p>
              </div>
            </div>

            <div className="flex">
              <div className="w-4/5 mb-2">
                <div className="bg-red-200 w-full">
                  <img src={map} alt="" className="bg-cover max-h-72" />
                </div>
              </div>

              <div className="pl-4 w-1/5">
                <div className="border flex p-1 w-full justify-center rounded-lg border-black mr-8 mb-2">
                  <MdBedroomParent className="h-5 w-5 mr-4 text-black bg-white" />
                  <p className="inline pb-0 mb-0 text-sm">School</p>
                </div>

                <div className="border flex p-1 w-full justify-center rounded-lg border-black mr-8 mb-2">
                  <MdBedroomParent className="h-5 w-5 mr-4 text-black bg-white" />
                  <p className="inline pb-0 mb-0 text-sm">Restaurants</p>
                </div>

                <div className="border flex p-1 w-full justify-center rounded-lg border-black mr-8 mb-2">
                  <MdBedroomParent className="h-5 w-5 mr-4 text-black bg-white" />
                  <p className="inline pb-0 mb-0 text-sm">Groceries</p>
                </div>

                <div className="border flex p-1 w-full justify-center rounded-lg border-black mr-8 mb-2">
                  <MdBedroomParent className="h-5 w-5 mr-4 text-black bg-white" />
                  <p className="inline pb-0 mb-0 text-sm">Cafe</p>
                </div>

                <div className="border flex p-1 w-full justify-center rounded-lg border-black mr-8 mb-2">
                  <MdBedroomParent className="h-5 w-5 mr-4 text-black bg-white" />
                  <p className="inline pb-0 mb-0 text-sm">Banks</p>
                </div>

                <div className="border flex p-1 w-full justify-center rounded-lg border-black mr-8 mb-2">
                  <MdBedroomParent className="h-5 w-5 mr-4 text-black bg-white" />
                  <p className="inline pb-0 mb-0 text-sm">Shops</p>
                </div>

                <div className="border flex p-1 w-full justify-center rounded-lg border-black mr-8 mb-2">
                  <MdBedroomParent className="h-5 w-5 mr-4 text-black bg-white" />
                  <p className="inline pb-0 mb-0 text-sm">Fintness</p>
                </div>

                <div className="border flex p-1 w-full justify-center rounded-lg border-black mr-8 mb-2">
                  <MdBedroomParent className="h-5 w-5 mr-4 text-black bg-white" />
                  <p className="inline pb-0 mb-0 text-sm">Transport</p>
                </div>
              </div>
            </div>
          </div>
        </div> 

        {/* Review section */}
        
        <div className={`pb-4 ${selectComp > 6 ? "hidden" : ""}`}>
          <div className={`bg-white w-full rounded-lg p-3`}>
            <p className="text-black block font-semibold text-xl">Review</p>

            <div className="flex">
              <div className="border rounded-lg  p-4 border-black">
                <div className="flex">
                  <MdOutlineStarPurple500 className="text-[#FFC700] mt-1 h-8 w-8 mx-2" />
                  <MdOutlineStarPurple500 className="text-[#FFC700] mt-1 h-8 w-8 mx-2" />
                  <MdOutlineStarPurple500 className="text-[#FFC700] mt-1 h-8 w-8 mx-2" />
                  <MdOutlineStarPurple500 className="text-[#FFC700] mt-1 h-8 w-8 mx-2" />
                  <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                </div>
                <h2 className="font-semibold text-black pt-3 text-left ml-2">
                  4.5 out of 5
                </h2>
              </div>

              <div className="border rounded-lg  p-4 border-black w-full ml-4 flex justify-between">
                <div>
                  <p className="my-0 text-left ml-2 tracking-wide">
                    Rate this property based on
                  </p>
                  <p className="my-0 text-left ml-2 tracking-wide">
                    your experience.
                  </p>
                  <div className="flex pt-3">
                    <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                    <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                    <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                    <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                    <PiStarThin className="text-[#000000] mt-1 h-8 w-8 mx-2" />
                  </div>
                </div>

                <div className="pr-4">
                  <p className="my-0 tracking-wide">
                    Share details of your experience With
                  </p>
                  <p className="my-0 text-left tracking-wide">This Property.</p>
                  <div
                    className="rounded-lg mt-3"
                    style={{ backgroundColor: "#40B5A8" }}
                  >
                    <button
                      className="flex w-full justify-evenly p-2 font-semibold"
                      onClick={() => {
                        setShowPopup(true)
                      }}
                    >
                      Write a review
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {showPopup && <Popup onClose={() => setShowPopup(false)} />}

            <div className="mt-4 border border-black rounded-lg p-4 w-full">
              <div className="flex">
                <img src={profile} className="h-16 w-16" alt="" />
                <div className="ml-4 mt-2">
                  <p className="mx-0 my-0 font-semibold text-lg">
                    Peter Parker
                  </p>
                  <div className="flex mt-1">
                    <MdOutlineStarPurple500 className="text-[#FFC700] h-4 w-4 mr-2" />
                    <MdOutlineStarPurple500 className="text-[#FFC700] h-4 w-4 mr-2" />
                    <MdOutlineStarPurple500 className="text-[#FFC700] mr-2 h-4 w-4" />
                    <MdOutlineStarPurple500 className="text-[#FFC700] mr-2 h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-left mx-0 my-0">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Placeat necessitatibus natus exercitationem eum qui. Numquam,
                  autem officia? Voluptate, ab excepturi? Hic dolor vero saepe
                  ut vitae eum suscipit! Odit, ut!
                </p>
              </div>
            </div>

            <div className="mt-4 border border-black rounded-lg p-4 w-full">
              <div className="flex">
                <img src={profile} className="h-16 w-16" alt="" />
                <div className="ml-4 mt-2">
                  <p className="mx-0 my-0 font-semibold text-lg">
                    Peter Parker
                  </p>
                  <div className="flex mt-1">
                    <MdOutlineStarPurple500 className="text-[#FFC700] h-4 w-4 mr-2" />
                    <MdOutlineStarPurple500 className="text-[#FFC700] h-4 w-4 mr-2" />
                    <MdOutlineStarPurple500 className="text-[#FFC700] mr-2 h-4 w-4" />
                    <MdOutlineStarPurple500 className="text-[#FFC700] mr-2 h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-left mx-0 my-0">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Placeat necessitatibus natus exercitationem eum qui. Numquam,
                  autem officia? Voluptate, ab excepturi? Hic dolor vero saepe
                  ut vitae eum suscipit! Odit, ut!
                </p>
              </div>
            </div>

            <div className="my-4 flex justify-center">
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white mr-2">
                <p className="text-center align-middle mx-0 my-0">1</p>
              </div>

              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white mr-2">
                <p className="text-center align-middle mx-0 my-0">2</p>
              </div>

              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white mr-2">
                <p className="text-center align-middle mx-0 my-0">3</p>
              </div>

              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white mr-4 ml-2">
                <p className="text-center align-middle mx-0 my-0">  </p>
              </div>

              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white">
                <p className="text-center align-middle mx-0 my-0">  </p>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default Flow2b
