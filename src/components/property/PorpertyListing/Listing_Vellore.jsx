import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../listing.css";
import Service from "../../../config/config";
// import author from "../../assets/property/author.jpg";
import hamburger from "../../../assets/property/hamburger.png";
import drop from "../../../assets/property/drop.png";
import location from "../../../assets/property/location.png";
import cross from "../../../assets/property/cross.png";
import SideOpt from "../listingComponents/SideOpt";
import SelectLocation from "../listingComponents/SelectLocation";
import Filters from "../listingComponents/Filters";
import Cards from "../listingComponents/Cards";
import Pagination from "../listingComponents/Pagination";

const Listing = () => {
  const [Hamburger, SetHamburger] = useState(false);
  const [isOpen, SetIsOpen] = useState(false);
  //   const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [propertiesPerPage, setPropertiesPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function handleOpen() {
    SetIsOpen(!isOpen);
  }
  function handleHamburger() {
    SetHamburger(!Hamburger);
  }

  // Fetch data from backend API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertyData = await Service.fetchProperty();
        setProperties(propertyData || []); // Ensure propertyData is an array
        console.log(propertyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  // Get current properties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} />
      </div>
    );
  }

  const [mode, setMode] = useState(false);
  function handleMode() {
    setMode(!mode);
  }

  const [Location, setLocation] = useState(false);
  function handleLocation() {
    setLocation(!Location);
  }
  return (
    <>
      <div
        className={`bg-black opacity-80 w-full h-[2600px] absolute z-20 ${
          isOpen || Hamburger || Location ? "block" : "hidden"
        }`}
      ></div>

      <>
        <section className="property py-24" id="property">
          <div className="container mx-auto px-10">
            {/* property listing top starts */}
            <div>
              <div className="flex items-center justify-between px-3 pb-20">
                <p className="lg:text-5xl md:text-4xl text-2xl  text-[#C8A21C] font-bold">
                  Property Listing
                </p>
                <img
                  src={hamburger}
                  alt=""
                  className="cursor-pointer lg:w-12 md:w-11 w-9 h-auto"
                  onClick={handleHamburger}
                />
              </div>
              <div className="absolute z-50 right-0 flex  gap-4 p-4 sm:w-full md:w-[442px] lg:w-[500px] h-fit">
                <div className="">
                  <img
                    src={cross}
                    alt="Close"
                    onClick={handleHamburger}
                    className={`${
                      Hamburger ? "block" : "hidden"
                    } cursor-pointer `}
                  />
                </div>

                <div
                  className={`flex flex-col bg-white text-black py-4 rounded-lg shadow-lg  md:w-full ${
                    Hamburger ? "block" : "hidden"
                  }`}
                >
                  {/* hamburger option */}
                  <SideOpt />
                </div>
              </div>
              {/* property listing top ends */}
              {/* filters start */}
              <div className="flex items-center justify-start gap-3 pb-10 ml-4 flex-col md:flex-row lg:flex-row ">
                <div className="bg-white h-14 w-80 flex items-center justify-between text-black px-4 rounded-2xl ">
                  <div className="w-1/4 flex items-center justify-start gap-4 border-r-2 h-3/4 border-black">
                    <p className="text-black">Rent</p>
                    {/* <img
                      src={drop}
                      alt=""
                      className={`${
                        mode ? "rotate-180" : "rotate-0"
                      } mt-1 cursor-pointer `}
                      onClick={handleMode}
                    /> */}
                    {/* <div
                      className={` ${
                        mode ? "block" : "hidden"
                      } z-50 absolute bg-white shadow-lg rounded-lg text-center w-24 py-3 top-[350px] left-14`}
                    >
                      <p className=" border-b-2 py-1 text-lg font-medium">
                        Buy
                      </p>
                      <p className=" border-b-2 py-1 text-lg font-medium">
                        Sell
                      </p>
                      <p className=" py-1 text-lg font-medium">Rent</p>
                    </div> */}
                  </div>
                  <div className="flex items-center justify-center w-3/4 gap-4 pl-2">
                    <div className="text-sm py-1 px-4 bg-[#EED98B] rounded-full ">
                      <p>Vellore</p>
                    </div>
                    <div className="text-[12px]">
                      <p>Add more ..</p>
                    </div>
                    <div>
                      <img
                        src={location}
                        alt=""
                        className="cursor-pointer"
                        onClick={handleLocation}
                      />
                    </div>
                    <div
                      className={`absolute lg:left-28 left-[-20px] flex lg:gap-3 z-50 ${
                        Location ? "block" : "hidden"
                      }`}
                    >
                      <div>
                        <img
                          src={cross}
                          alt=""
                          onClick={handleLocation}
                          className="cursor-pointer"
                        />
                      </div>
                      {/* location options */}
                      <SelectLocation />
                    </div>
                  </div>
                </div>
                <div className="h-14 w-56 bg-white text-black flex items-start justify-between px-5 rounded-2xl">
                  <div className="flex items-center justify-start gap-4  h-full w-2/4 ">
                    <div className="h-6 w-6 bg-[#EED98B] rounded-full flex items-center justify-center">
                      2
                    </div>
                    <div>Filters</div>
                  </div>
                  <div className=" h-full flex items-center justify-center w-1/4  cursor-pointer rounded-full">
                    <img
                      src={drop}
                      alt=""
                      onClick={handleOpen}
                      className=" cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`min-w-full min-h-fit absolute z-30 top-32 flex items-center justify-center ${
                isOpen ? "block" : "hidden"
              } `}
            >
              <div className="relative w-full max-w-lg">
                <Filters />
                <div className="absolute top-1 right-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    onClick={handleOpen}
                    className="cursor-pointer w-5 lg:w-6 md:w-6 z-50 text-red-400 hover:text-red-800 transition-colors duration-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* filters ends */}
            {/* cards starts */}
            <Cards
              properties={properties}
              cityName="Vellore"
              propertyAction="Available"
            />
            {/* cards ends */}
          </div>
        </section>
        {/* pagination starts */}
        <Pagination properties={properties} />
        {/* pagination ends */}
      </>
    </>
  );
};

export default Listing;
