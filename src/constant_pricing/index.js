import checkmark from "../assets/pricing/checkmark.svg";
import property from "../assets/pricing/property.svg";
import filter from "../assets/pricing/filter.svg";
import payafter from "../assets/pricing/payafter.svg";
import nobrokerage from "../assets/pricing/nobrokerage.svg";
import timesaving from "../assets/pricing/timesaving.svg";

export const plans = [
  {
    id: 1,
    title: "Free Subscription",
    price: "₹0",
    period: "/month",
    text:" ",
    description: "Perfect for getting started",
    buttonText: "Get Started Free",
    buttonStyle: "bg-white text-yellow-400 hover:bg-gray-100",
    features: [
      { icon: checkmark, text: "Direct connection with property owners" },
      { icon: checkmark, text: "No brokerage fees" },
      { icon: checkmark, text: "Post requirements to get qualified Property Owners" },
      { icon: checkmark, text: "Post approval within 24 hours" },
      { icon: checkmark, text: "Find a flatmate for your Rental Property" },
    ],
  },
  {
    id: 2,
    title: "Post-Paid Subscription",
    price: "₹299",
    period: "/month",
    text:"Starting with",
    textStyle:"text-gray text-lg",
    description: "For serious property seekers",
    buttonText: "Get Started Premium",
    badge: "Most Popular",
    badgeStyle: "absolute -top-3 right-[38%] bg-[#38f8cf] text-white font-bold px-4 py-1 rounded-full text-sm",
    buttonStyle: "bg-yellow-400 text-white hover:bg-yellow-300",
    features: [
      { icon: property, text: "Property tours" },
      { icon: filter, text: "Filtered properties" },
      { icon: payafter, text: "Pay after finalizing property" },
      { icon: nobrokerage, text: "No brokerage fees" },
      { icon: timesaving, text: "Time saving" },
    ],
  },
];