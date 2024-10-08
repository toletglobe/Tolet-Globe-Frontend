import propertyimage1 from "../../assets/property/blog-1.png";
import propertyimage2 from "../../assets/property/blog-2.jpg";
import propertyimage3 from "../../assets/property/blog-3.jpg";

import { useNavigate } from "react-router-dom";

import { CiHeart, CiShare2 } from "react-icons/ci";
import { MdMoreVert } from "react-icons/md";

export default function MyProperties() {
  
  const navigate = useNavigate();
  const handleAddPropertybtn = () => {
      navigate("/landlord-dashboard", { state: { content: "AddProperty" } });
  };
  const cardContent = [
    {
      id: 1,
      image: propertyimage1,
      name: "Name",
      location: "Gomti Nagar, Lucknow, India",
      price: "Price",
    },
    {
      id: 2,
      image: propertyimage2,
      name: "Name",
      location: "Gomti Nagar, Lucknow, India",
      price: "Price",
    },
    {
      id: 3,
      image: propertyimage3,
      name: "Name",
      location: "Gomti Nagar, Lucknow, India",
      price: "Price",
    },
    {
      id: 4,
      image: propertyimage3,
      name: "Name",
      location: "Gomti Nagar, Lucknow, India",
      price: "Price",
    },
    {
      id: 5,
      image: propertyimage2,
      name: "Name",
      location: "Gomti Nagar, Lucknow, India",
      price: "Price",
    },
    {
      id: 6,
      image: propertyimage1,
      name: "Name",
      location: "Gomti Nagar, Lucknow, India",
      price: "Price",
    },
    {
      id: 7,
      image: propertyimage1,
      name: "Name",
      location: "Gomti Nagar, Lucknow, India",
      price: "Price",
    },
  ];

  const cards = cardContent.map((card) => (
    <div key={card.id} className=" bg-black p-4 rounded-md">
      <img
        src={card.image}
        alt="Property"
        className=" relative  h-[200px] w-full object-cover rounded-md  mb-4"
      />
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{card.name}</h3>

        {/* Icons Section */}
        <div className="icon-box flex mr-6 p-2">
          <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "10px" }}
          >
            <CiHeart className="card_icon text-red-500 bg-[#3E3E3E4D] relative" />
          </a>
          <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "20px" }}
          >
            <CiShare2
              className="card_icon bg-[#3E3E3E4D]"
              style={{ color: "#40B5A8" }}
            />
          </a>
          <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "30px" }}
          >
            <MdMoreVert
              className="card_icon bg-[#3E3E3E4D]"
              style={{ color: "#808080", fontSize: "16px" }} // Adjust size if needed
            />
          </a>
        </div>
      </div>
      <p className="text-gray-400">{card.location}</p>
      <p className="text-gray-400 mt-1">{card.price}</p>
    </div>
  ));
  return (
    <>
    <div className="flex justify-between p-4">
      <h2 className="text-4xl font-bold">Your Properties</h2>
      <button className="px-4 bg-[#212629] rounded-md text-base font-medium" onClick={handleAddPropertybtn}>Add Property</button>
    </div>
      <div className="">
        <div className="grid grid-cols-3">
          {cards}

          {/* import MyProperty */}
          {/* <MyProperty /> */}
        </div>
      </div>
      <div className="flex justify-end p-4">
      <button className="p-3 bg-[#212629] rounded-md text-base font-medium">View all (3)</button>
    </div>
    </>
  );
}
