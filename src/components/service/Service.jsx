import warehouse from "../../assets/service/image29.png";
import pg from "../../assets/service/image18.png";
import flat from "../../assets/service/image21.png";
import house from "../../assets/service/image23.png";
import shop from "../../assets/service/image25.png";
import office from "../../assets/service/image27.png";

const Service = () => {
  return (
    <div className="pl-20 my-24 mx-auto w-[90%] bg-black cursor-pointer ">
      <h1 className="text-6xl font-bold text-white mb-3">Services</h1>
      <p className="text-xs text-[#CCB454]">
        SKIP THE MIDDLEMAN : RENT OR LEASE DIRECTLY ON TO-LET GLOBE
      </p>
      <div className="w-full ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 text-black">
          {[
            {
              img: pg,
              title: "Paying Guest",
              bg: "bg-[#6CC1B6]",
              description:
                "Find budget-friendly and convenient paying guest accommodations for a comfortable stay away from home",
            },
            {
              img: flat,
              title: "Flat",
              bg: "bg-[#CCB454]",
              description:
                "Discover a diverse range of apartments for rent, customize to suit your lifestyle and budget",
            },
            {
              img: house,
              title: "House",
              bg: "bg-[#6CC1B6]",
              description:
                "Search for your dream home, available for rent or sale, tailored to your lifestyle and preferences",
            },
            {
              img: shop,
              title: "Shop",
              bg: "bg-[#CCB454]",
              description:
                "Explore a variety of retail spaces and shops available for lease, ideal for growing your business",
            },
            {
              img: office,
              title: "Office",
              bg: "bg-[#6CC1B6]",
              description:
                "Elevate your workspace and productivity with modern office spaces for rent, designed for success",
            },
            {
              img: warehouse,
              title: "Warehouse",
              bg: "bg-[#CCB454]",
              description:
                "Secure the perfect godown space for rent, offering ample storage and logistics solutions",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl w-[80%] transition-shadow duration-300"
            >
              <div className="flex justify-center items-center p-5">
                <img
                  src={service.img}
                  className="h-20 w-auto"
                  alt={service.title}
                />
              </div>
              <div
                className={`p-4 ${service.bg} rounded-b-lg text-center transition-all duration-300 group-hover:bg-opacity-80`}
              >
                <h1 className="text-2xl font-bold">{service.title}</h1>
              </div>
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center p-5 ${service.bg} bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              >
                <h1 className="text-2xl font-bold mb-2">{service.title}</h1>
                <p className="text-center">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
