import { useState} from "react";
import axios from "axios";
import { API } from "../../config/axios";

import Frm1 from "./AllForms/Frm1";
import Frm2 from "./AllForms/Frm2";
import Frm3 from "./AllForms/Frm3";
import Frm4 from "./AllForms/Frm4";

export default function LandlordDashboardAddProperties() {


  // For changing and showing page number
  const [page, setPage] = useState(0);
  

  // For yellow progress bar
  function yellowBorder(page) {
    let p = page + 1;

    let yellowDivs = [];

    while (p--) {
      yellowDivs.push(<div key={`yellow-${p}`} className="bg-yellow-500 rounded-lg w-[25%] h-2 "></div>)
    }

    return yellowDivs;
  }


  // For white progress bar
  function whiteBorder(page) {
    let p = 4 - (page + 1);

     let whiteDivs = [];

     while (p--) {
       whiteDivs.push(<div key={`white-${p}`} className="bg-white rounded-lg w-[25%] h-2 "></div>);
     }
    return whiteDivs;
  }

  // For storing formData
  const [formData, setFormData] = useState({
    firstName: "", 
    lastName: "",
    ownersContactNumber: "",
    ownersAlternateContactNumber: "",
    pin: "", 
    city: "",
    locality: "", 
    address: "", 
    spaceType: "", 
    petsAllowed: "",
    preference: "",
    bachelors: "",
    type: "",  
    bhk: "",   
    floor: "",    
    nearestLandmark: "",
    typeOfWashroom: "",   
    coolingFacility: "",     
    carParking: true,       
    rent: "",              
    security: "",
    images: [],    
    squareFeetArea: "",  
    appliances: [],   
    amenities: [],    
    aboutTheProperty: "",   
    comments: "", 
  });



  const RenderFormBody = (page)=>{
    if (page == 0) {
      return (
        <div key={`Frm1-${page}`}>
          <Frm1 formData={formData} setFormData={setFormData} />
        </div>
      );
    } else if (page == 1) { 
      return (
        <div key={`Frm2-${page}`}>
          <Frm2 formData={formData} setFormData={setFormData} />
        </div>
      );
    } else if (page == 2) {
      return (
        <div key={`Frm3-${page}`}>
          <Frm3 formData={formData} setFormData={setFormData} />
        </div>
      );
    } else {
      return (
        <div key={`Frm4-${page}`}>
          <Frm4 formData={formData} setFormData={setFormData}/>
        </div>
      );
    }

  }


  // Submitting form Data
  const submitForm = async (formData) => {
    const updatedFormData = {
      ...formData,
      pin: Number(formData.pin),
      petsAllowed: Boolean(formData.petsAllowed),
      bhk: Number(formData.bhk),
      rent: Number(formData.rent),
      security: Number(formData.security),
      squareFeetArea: Number(formData.squareFeetArea),
    };

    // console.log("This is updateFormdata:", updatedFormData);

    const dataToSend = new FormData();

    Object.entries(updatedFormData).forEach(([key, value]) => {
      if (Array.isArray(value)) {

        if (key === "images") {
          value.forEach((image) => dataToSend.append("images", image));
        } else {
          value.forEach((item) => dataToSend.append(key, item));
        }
      } else {
        dataToSend.append(key, value);
      }
    });

    // for (let [key, value] of dataToSend.entries()) {
    //   console.log(`${key}: ${value}`);
    // }


    const token = localStorage.getItem("token");
    console.log("Token: ", token);

    try {
      const { data } = await API.post(
        "property/add-property",
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "token": `${token}`
          },
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    // clearing form fields
    setFormData({
      firstName: "",
      lastName: "",
      ownersContactNumber: "",
      ownersAlternateContactNumber: "",
      pin: "",
      city: "",
      locality: "",
      address: "",
      spaceType: "",
      petsAllowed: "",
      preference: "",
      bachelors: "",
      type: "",
      bhk: "",
      floor: "",
      nearestLandmark: "",
      typeOfWashroom: "",
      coolingFacility: "",
      carParking: true,
      rent: "",
      security: "",
      images: [],
      squareFeetArea: "",
      appliances: [],
      amenities: [],
      aboutTheProperty: "",
      comments: "",
    });

  }

  

  


  return (
    <>
      {/* Form */}

      <div className="">
        {/* ProgressBar */}

        <div className="ml-5 flex flex-col gap-2">
          <h1 className="text-[#FFFFFF] text-[33px] leading-10 font-bold">Add New Property</h1>
          <div className="mt-8 flex gap-4">
            {yellowBorder(page)}
            {whiteBorder(page)}
          </div>
          <div className="text-[#4F7396] text-xs leading-5">{page + 1}/4</div>
        </div>

        
        {/* Form-Container */}
        <form
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            if (page == 2) {
              if (formData.images.length < 5) {
                alert("Please submit at least 5 images");
                return;
              }
            } else if (page == 3) {
              submitForm(formData);
              return;
            }
            setPage((page) => page + 1);
          }}
        >


          <div>


            {/* Form-Body */}
            <div>{RenderFormBody(page)}</div>

            
            {/* Form-footer */}
            <div className="my-10 h-fit flex gap-x-3 justify-end">
              <input
                type="button"
                value="Back"
                className={`border-[0.5px] rounded-md font-bold px-7 py-[10px] ${
                  page == 3
                    ? "bg-[#E8EDF2] text-black"
                    : "border-amber-500  text-white"
                }  `}
                onClick={() => {
                  setPage((page) => page - 1);
                }}
                disabled={page == 0}
                hidden={page == 0}
              />
              <input
                type="submit"
                value="Next"
                className="border-[0.5px] border-amber-500 rounded-md bg-yellow-500 font-bold px-7 py-[10px] text-black"
                disabled={page == 3}
                hidden={page == 3}
              />
              <input
                type="submit"
                value="Submit"
                className="rounded-md bg-[#04AA6D] font-bold px-7 py-[10px] text-gray-200"
                hidden={page != 3}
                disabled={page != 3}
              />
            </div>

          </div>

        </form>
        
      </div>
    </>
  );
}
