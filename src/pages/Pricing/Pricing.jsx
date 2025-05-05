import React from "react";

import checkmark from "../../assets/pricing/checkmark.svg";
import property from "../../assets/pricing/property.svg";
import filter from "../../assets/pricing/filter.svg";
import payafter from "../../assets/pricing/payafter.svg";
import nobrokerage from "../../assets/pricing/nobrokerage.svg";
import timesaving from "../../assets/pricing/timesaving.svg";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Perfect Plan</h1>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Find your ideal property with our flexible subscription options.
          Whether you're looking for a free experience or premium support, we've
          got you covered.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Subscription Card */}
          <div className="bg-[#1a1f2e] rounded-2xl p-8 relative">
            <h2 className="text-2xl font-bold mb-2">Free Subscription</h2>
            <div className="flex items-baseline justify-center mb-2">
              <span className="text-4xl font-bold text-yellow-400">₹0</span>
              <span className="text-gray-400 ml-1">/month</span>
            </div>
            <p className="text-gray-400 mb-6">Perfect for getting started</p>

            <ul className="space-y-4 mb-8 text-left">
              <li className="flex items-center">
                <img
                  src={checkmark}
                  alt="checkmark"
                  className="w-5 h-5 text-green-500 mr-3"
                />
                Direct connection with property owners
              </li>
              <li className="flex items-center">
                <img
                  src={checkmark}
                  alt="checkmark"
                  className="w-5 h-5 text-green-500 mr-3"
                />
                No brokerage fees
              </li>
              <li className="flex items-center">
                <img
                  src={checkmark}
                  alt="checkmark"
                  className="w-5 h-5 text-green-500 mr-3"
                />
                Post requirements to get qualified Property Owners
              </li>
              <li className="flex items-center">
                <img
                  src={checkmark}
                  alt="checkmark"
                  className="w-5 h-5 text-green-500 mr-3"
                />
                Post approval within 24 hours
              </li>
              <li className="flex items-center">
                <img
                  src={checkmark}
                  alt="checkmark"
                  className="w-5 h-5 text-green-500 mr-3"
                />
                Find a flatmate for your Rental Property
              </li>
            </ul>

            <button className="w-full py-3 px-6 rounded-lg bg-white text-yellow-400 font-semibold hover:bg-gray-100 transition-colors">
              Get Started Free
            </button>
          </div>

          {/* Premium Subscription Card */}
          <div className="bg-[#1a1f2e] rounded-2xl p-8 relative">
            <div className="absolute -top-3 right-[38%] bg-[#38f8cf] text-white font-bold px-4 py-1 rounded-full text-sm">
              Most Popular
            </div>
            <h2 className="text-2xl font-bold mb-2">Post-Paid Subscription</h2>
            <div className="flex items-baseline justify-center mb-2">
              <span className="text-4xl font-bold text-yellow-400">₹299</span>
              <span className="text-gray-400 ml-1">/month</span>
            </div>
            <p className="text-gray-400 mb-6">For serious property seekers</p>

            <ul className="space-y-4 mb-8 text-left">
              <li className="flex items-center">
                <img
                  src={property}
                  alt="checkmark"
                  className="w-5 h-5 text-[#38bdf8] mr-3"
                />
                Property tours
              </li>
              <li className="flex items-center">
                <img
                  src={filter}
                  alt="checkmark"
                  className="w-5 h-5 text-[#38bdf8] mr-3"
                />
                filtered properties
              </li>
              <li className="flex items-center">
                <img
                  src={payafter}
                  alt="checkmark"
                  className="w-5 h-5 text-[#38bdf8] mr-3"
                />
                Pay after finalizing property
              </li>
              <li className="flex items-center">
                <img
                  src={nobrokerage}
                  alt="checkmark"
                  className="w-5 h-5 text-[#38bdf8] mr-3"
                />
                No brokerage fees
              </li>
              <li className="flex items-center">
                <img
                  src={timesaving}
                  alt="checkmark"
                  className="w-5 h-5 text-[#38bdf8] mr-3"
                />
                Time saving
              </li>
            </ul>

            <button className="w-full py-3 px-6 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-300 transition-colors">
              Get Started Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
