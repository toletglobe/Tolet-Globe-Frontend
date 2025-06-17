import { useState, useEffect, useRef } from "react";
import { plans } from "../../../../constant_pricing/Subscriptions/index";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SupportModal from "./SupportModal";
import { API } from "../../../../config/axios";

export const Pricing = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const { userData } = useSelector((state) => state.auth); // Assuming you have user slice
  const phone = formData?.contactNumber;

  // Function to scroll the active plan into view
  useEffect(() => {
    if (scrollContainerRef.current && formData?.subscriptionPlan) {
      const activePlanCard = scrollContainerRef.current.querySelector(
        `[data-price="${formData.subscriptionPlan}"]`
      );

      if (activePlanCard) {
        activePlanCard.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
  }, [formData?.subscriptionPlan]);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan.price);
    setModalOpen(true);
  };

  const handleModalSubmit = async (query, topic) => {
    const payload = {
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      phone,
      msg: query,
      topic,
      // planTitle: selectedPlan,
    };

    try {
      const res = await API.post("contact/submit-data", payload);

      if (res.status === 200) {
        console.log("Query submitted successfully:", res.data);
        toast.success("Our team will connect with you very soon!");
        setModalOpen(false);
      } else {
        toast.error("Failed to send query.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setModalOpen(false);
    }
  };

  const getPlansByPropertyType = (propertyType) => {
    if (propertyType === "PG") {
      return [plans[0]]; // Return the first element for "PG"
    } else if (propertyType === "Flat" || propertyType === "House") {
      return plans.slice(1, 6); // Return elements from index 1 to 5 for "Flat" or "House"
    } else if (
      propertyType === "Warehouse" ||
      propertyType === "Shop" ||
      propertyType === "Office"
    ) {
      return plans.slice(6); // Return the remaining elements for "Warehouse", "Shop", or "Office"
    } else {
      return []; // Return an empty array for unsupported property types
    }
  };

  return (
    <div className="p-14 w-full">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 max-w-full px-4 hide-scrollbar"
        style={{
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {getPlansByPropertyType(formData.propertyType).map((plan) => {
          const isActive =
            formData?.subscriptionPlan === Number(plan.price.replace("₹", ""));

          return (
            <div
              key={plan.id}
              data-price={plan.price.replace("₹", "")}
              className={`min-w-[280px] max-w-[350px] bg-[#111827] rounded-xl p-8 text-sm shrink-0 transition-all duration-300 scroll-snap-align-center
                  ${isActive ? "scale-105 z-10" : "scale-90 opacity-50"}`}
              style={{
                transform: isActive ? "scale(0.93)" : "scale(0.9)",
                opacity: isActive ? 1 : 0.5,
                transition: "all 0.3s ease",
              }}
            >
              {/* {plan.badge && (
                <div
                  className={`${plan.badgeStyle} text-xs py-1 px-2 rounded mb-2`}
                >
                  {plan.badge}
                </div>
              )} */}

              <div className="flex flex-col items-center mb-4">
                <h2 className="text-lg font-bold mb-1">{plan.title}</h2>

                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold text-yellow-400">
                    {plan.price}
                  </span>
                  {/* <span className="text-gray-400 ml-1 text-xs">
                    {plan.period}
                  </span> */}
                </div>
              </div>

              <p className="text-gray-400 mb-4 text-xs">{plan.description}</p>

              <ul className="space-y-2 mb-4 text-left text-xs">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <img
                      src={feature.icon}
                      alt="icon"
                      className="w-4 h-4 text-green-500 mr-2"
                    />
                    {feature.text}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanClick(plan)}
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors text-sm cursor-pointer 
                    ${
                      isActive
                        ? "bg-yellow-400 text-black"
                        : "border border-yellow-400 text-white"
                    } 
                    `}
                disabled={!isActive}
              >
                {loading ? "Processing..." : "Contact Support"}
              </button>
            </div>
          );
        })}
      </div>
      <SupportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Pricing;
