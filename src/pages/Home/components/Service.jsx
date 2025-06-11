import warehouse from "../../../assets/home/service/warehouse.png";
import pg from "../../../assets/home/service/pg.png";
import flat from "../../../assets/home/service/flat.png";
import house from "../../../assets/home/service/house.png";
import shop from "../../../assets/home/service/shop.png";
import office from "../../../assets/home/service/office.png";

import ServiceCard from "./ServiceCard";

const Service = () => {
  const services = [
    {
      img: pg,
      title: "Paying Guest",
      bg: "bg-[#6CC1B6]",
      path: "/property-listing?residential=PG",
      description:
        "Find budget-friendly and convenient paying guest accommodations for a comfortable stay away from home.",
    },
    {
      img: flat,
      title: "Flat",
      bg: "bg-[#CCB454]",
      path: "/property-listing?residential=Flat",
      description:
        "Discover a diverse range of apartments for rent, customize to suit your lifestyle and budget.",
    },
    {
      img: house,
      title: "House",
      bg: "bg-[#6CC1B6]",
      path: "/property-listing?residential=House",
      description:
        "Search for your dream home, available for rent or sale, tailored to your lifestyle and preferences.",
    },
    {
      img: shop,
      title: "Shop",
      bg: "bg-[#CCB454]",
      path: "/property-listing?commercial=Shop",
      description:
        "Explore a variety of retail spaces and shops available for lease, ideal for growing your business.",
    },
    {
      img: office,
      title: "Office",
      bg: "bg-[#6CC1B6]",
      path: "/property-listing?commercial=Office",
      description:
        "Elevate your workspace and productivity with modern office spaces for rent, designed for success.",
    },
    {
      img: warehouse,
      title: "Warehouse",
      bg: "bg-[#CCB454]",
      path: "/property-listing?commercial=Warehouse",
      description:
        "Secure the perfect godown space for rent, offering ample storage and logistics solutions.",
    },
  ];

  return (
    <div className="w-full mx-auto max-lg:pt-0 max-lg:mt-0 px-5 sm:px-12 xl:px-20  bg-black">
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-8 py-8">
        <h1 className="text-white font-medium text-5xl sm:text-7xl lg:text-[clamp(78px,5vw,96px)] leading-tight">
          Services
        </h1>
        <p className="text-[#C8A21C] font-[Poppins] font-medium text-xs md:text-sm mt-1 md:mt-2 max-w-xl">
          SKIP THE MIDDLEMAN: RENT OR LEASE DIRECTLY ON TO-LET GLOBE
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-2 gap-y-9 mt-12 md:px-16 lg:px-2 xl:px-36">
        {services.map((service, index) => (
          <div key={index} className="w-full flex justify-center">
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
