// src/pages/Service.jsx
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
    <div className="my-24 mx-auto w-[90%] bg-black cursor-pointer ">
      <h1 className="text-6xl text-center font-bold text-white mb-3">
        Services
      </h1>
      <p className="text-xs text-center text-[#CCB454]">
        SKIP THE MIDDLEMAN : RENT OR LEASE DIRECTLY ON TO-LET GLOBE
      </p>
      <div className="w-full ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 text-black mx-auto justify-items-center">
          {services.map((service, index) => (
            <Card
              key={index}
              img={service.img}
              title={service.title}
              bg={service.bg}
              path={service.path}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
