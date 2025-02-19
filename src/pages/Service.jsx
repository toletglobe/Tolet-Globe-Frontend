import warehouse from "../assets/service/image29.png";
import pg from "../assets/service/image18.png";
import flat from "../assets/service/image21.png";
import house from "../assets/service/image23.png";
import shop from "../assets/service/image25.png";
import office from "../assets/service/image27.png";
import { Card } from "../components/index";

const Service = () => {
  const services = [
    {
      img: pg,
      title: "Paying Guest",
      bg: "bg-[#6CC1B6]",
      path: "/property-listing?residential=PG",
      description:
        "Find budget-friendly and convenient paying guest accommodations for a comfortable stay away from home",
    },
    {
      img: flat,
      title: "Flat",
      bg: "bg-[#CCB454]",
      path: "/property-listing?residential=Flat",
      description:
        "Discover a diverse range of apartments for rent, customize to suit your lifestyle and budget",
    },
    {
      img: house,
      title: "House",
      bg: "bg-[#6CC1B6]",
      path: "/property-listing?residential=House",
      description:
        "Search for your dream home, available for rent or sale, tailored to your lifestyle and preferences",
    },
    {
      img: shop,
      title: "Shop",
      bg: "bg-[#CCB454]",
      path: "/property-listing?commercial=Shop",
      description:
        "Explore a variety of retail spaces and shops available for lease, ideal for growing your business",
    },
    {
      img: office,
      title: "Office",
      bg: "bg-[#6CC1B6]",
      path: "/property-listing?commercial=Office",
      description:
        "Elevate your workspace and productivity with modern office spaces for rent, designed for success",
    },
    {
      img: warehouse,
      title: "Warehouse",
      bg: "bg-[#CCB454]",
      path: "/property-listing?commercial=Warehouse",
      description:
        "Secure the perfect godown space for rent, offering ample storage and logistics solutions",
    },
  ];

  return (
    <div className="w-full mx-auto px-6 sm:px-12 lg:px-20 lg:py-10 bg-black relative">
      <div className="relative">
        <h1 className="text-white font-[Poppins] font-medium text-[48px] leading-[72px] text-center sm:hidden">
          Services
        </h1>
        <h1 className="text-white font-[Poppins] font-medium text-[96px] leading-[144px] text-center sm:text-left w-full sm:w-[900px] mx-auto lg:absolute lg:w-[403px] lg:h-[107px] lg:left-[115px] lg:top-[117px] lg:whitespace-nowrap lg:text-[clamp(48px,5vw,96px)] sm:block hidden">
          Choose a Service
        </h1>
        <p className="text-[#C8A21C] font-[Poppins] font-medium text-[10px] sm:text-[12px] leading-[18px] text-center sm:text-left mt-[4px] w-full sm:w-[400px] mx-auto lg:absolute lg:w-[383px] lg:h-[18px] lg:left-[115px] lg:top-[234px] lg:whitespace-nowrap">
          SKIP THE MIDDLEMAN: RENT OR LEASE DIRECTLY ON TO-LET GLOBE
        </p>
      </div>

      {/* Mobile View - Kept column gap unchanged */}
      <div className="relative mt-0 sm:mt-0 md:mt-0 lg:mt-[90px] grid grid-cols-2 gap-x-8 gap-y-0 place-items-center sm:grid-cols-2 md:grid-cols-2 lg:hidden">
        {services.map((service, index) => (
          <div key={index} className="w-full sm:w-[55%] m-0 p-0">
            <Card {...service} />
          </div>
        ))}
      </div>

      {/* Laptop View - Unchanged */}
      <div className="relative hidden lg:flex justify-center flex-wrap lg:mt-[320px]">
        {services.map((service, index) => (
          <div key={index} className="w-[277px] h-[280px] lg:w-[277px] lg:h-[280px] md:w-[169.88px] md:h-[126.34px] sm:w-[169.88px] sm:h-[126.34px] lg:m-[36.5px]">
            <Card {...service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
