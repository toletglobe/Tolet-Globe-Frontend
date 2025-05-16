import React, { useState } from "react";
import { plans } from "../../../../constant_pricing/Subscriptions/index";

export const Pricing = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePlanClick = (plan) => {
    setLoading(true);
    console.log("Selected plan:", plan);
    setTimeout(() => {
      setIsSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-14 w-full">

      {/* Horizontal Scroll Container with hidden scrollbar */}
      <div 
        className="flex overflow-x-auto gap-6 max-w-full px-4 hide-scrollbar"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="min-w-[280px] max-w-xs bg-[#1a1f2e] rounded-xl p-4 text-sm shrink-0  hover:bg-white hover:text-[#000]"
          >
            {plan.badge && (
              <div className={`${plan.badgeStyle} text-xs py-1 px-2 rounded mb-2`}>
                {plan.badge}
              </div>
            )}

            <h2 className="text-lg font-semibold mb-1">{plan.title}</h2>

            <div className="flex items-baseline mb-2">
              <span className="text-2xl font-bold text-yellow-400">
                {plan.price}
              </span>
              <span className="text-gray-400 ml-1 text-xs">{plan.period}</span>
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
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors text-sm ${plan.buttonStyle}`}
            >
              {loading ? "Processing..." : "Contact Support"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
