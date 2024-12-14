import { Link } from "react-router-dom";
import image1 from "../../assets/property/img1.svg";
import image2 from "../../assets/property/img2.svg";
import image3 from "../../assets/property/img3.svg";
// import image4 from "../../assets/property/img4.svg";
const Property = () => {
  return (
    <>
      <div className="text-white flex items-center justify-center flex-col p-5 mt-10 mb-10 w-full">
        <div className="flex items-center justify-center flex-col gap-3 w-full my-5 mb-8">
          <h1 className="text-3xl">Find Your Dream Rental Property</h1>
          <p className="w-2/4 text-[14px] text-[#8a8a8a] text-center">
            we are recognized for exceeding client expectation and delivering
            great results through dedication, ease of process, and extraordinary
            services to our landlords and tenant
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row items-start justify-between my-10 px-4 md:px-10 lg:px-16">
          <div className="flex flex-col gap-6 md:gap-8 items-center md:items-start">
            {/* <div className="flex flex-col gap-6 md:gap-8 items-center"> */}
            <div>
              <h2 className="text-[40px] text-start">
                Find the best To-Let in Lucknow
              </h2>
              <p className="text-[#CCB454]">
                With No Brokerage on rental PGs | Flats | Houses | Offices.
              </p>
            </div>
            <Link
              to={"/property-listing/Lucknow"}
              className="px-5 py-2 bg-white text-black rounded-md"
            >
              Join Us
            </Link>
          </div>
          <div>
            <img src={image1} alt="PropImage" />
          </div>
        </div>
        <div className="w-full flex flex-col-reverse md:flex-row items-start justify-between my-10 px-4 md:px-10 lg:px-16">
          <div>
            <img src={image2} alt="PropImage" />
          </div>
          <div className="flex flex-col gap-6 md:gap-8 items-center md:items-end ">
            <div className="text-end">
              <h2 className="text-[40px]">Find the best To-Let in Ayodhya </h2>
              <p className="text-[#CCB454]">
                With No Brokerage on rental PGs | Flats | Houses | Offices.
              </p>
            </div>
            <Link
              to={"/property-listing/Ayodhya"}
              className="px-5 py-2 bg-white text-black rounded-md"
            >
              Join Us
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row items-start justify-between my-10 px-4 md:px-10 lg:px-16">
          <div className="flex flex-col gap-6 md:gap-8 items-center md:items-start">
            <div>
              <h2 className="text-[40px]">Find the best To-Let in Vellore</h2>
              <p className="text-[#CCB454]">
                With No Brokerage on rental PGs | Flats | Houses | Offices.
              </p>
            </div>
            <Link
              to={"/property-listing/Vellore"}
              className="px-5 py-2 bg-white text-black rounded-md"
            >
              Join Us
            </Link>
          </div>
          <div>
            <img src={image3} alt="PropImage" />
          </div>
        </div>
        <div className="w-full flex flex-col-reverse md:flex-row items-start justify-between my-10 px-4 md:px-10 lg:px-16">
          <div>
            <img src={image2} alt="PropImage" />
          </div>
          <div className="flex flex-col gap-6 md:gap-8 items-center md:items-end">
            <div className="text-end">
              <h2 className="text-[40px]">Find the best To-Let in Kota</h2>
              <p className="text-[#CCB454]">
                With No Brokerage on rental PGs | Flats | Houses | Offices.
              </p>
            </div>
            <Link
              to={"/property-listing/Kota"}
              className="px-5 py-2 bg-white text-black rounded-md"
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Property;
