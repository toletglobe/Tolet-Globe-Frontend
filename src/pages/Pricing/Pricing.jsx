import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { plans } from "../../constant_pricing/index.js"; // path for subscription card
import { useStateValue } from "../../StateProvider.jsx";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the date picker

import { API } from "../../config/axios";

const Pricing = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [{ compareProperty }, dispatch] = useStateValue();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showOptionProfession, setShowOptionProfession] = useState(false);
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    stayingWith: "",
    profession: "",
    college: "",
    company: "",
    business: "",
    dateOfVisit: "",
    timeSlot: "",
  });
  const options = ["Student", "Working Professional", "Business"];

  const timeSlots = [
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
  ];

  const handleSelectTimeSlot = (slot) => {
    setFormData({ ...formData, timeSlot: slot });
    setShowTimeOptions(false);
  };

  const navigate = useNavigate();

  const handlePlanClick = (plan) => {
    if (plan.price === "₹0") {
      // Open Facebook link in a new tab
      window.open("https://www.facebook.com/groups/1036488527571617", "_blank");
      setSelectedPlan(plan);
      // setShowForm(true);
    } else {
      setSelectedPlan(plan);
      setShowForm(true);
    }
  };

  //staying with
  const handleSelect = (option) => {
    setFormData({ ...formData, stayingWith: option });
    setShowOptions(false);
  };
  //profession
  const handleSelects = (options) => {
    setFormData({ ...formData, profession: options });
    setShowOptionProfession(false);
  };
  const handleCancel = () => {
    if (loading) return; // Prevent closing the modal while loading
    setShowForm(false);
    setIsSubmitted(false);
    setSelectedPlan(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      stayingWith: "",
      profession: "",
      college: "",
      company: "",
      business: "",
      dateOfVisit: "",
      timeSlot: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toLocaleDateString("en-GB"); // DD/MM/YYYY format
    setFormData({ ...formData, dateOfVisit: formattedDate });
    setShowCalendar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    const comparePropertyIds = compareProperty.map((item) => item.slug);

    const requestBody = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phone,
      stayingWith: formData.stayingWith,
      profession: formData.profession,
      dateOfVisit: formData.dateOfVisit,
      timeSlot: formData.timeSlot,
      comparePropertyIds,
    };

    if (formData.profession === "Student") {
      requestBody.college = formData.college;
    } else if (formData.profession === "Working Professional") {
      requestBody.company = formData.company;
    } else if (formData.profession === "Business") {
      requestBody.business = formData.business;
    }

    try {
      const response = await API.post("pricing/submit-pricing", requestBody);

      if (response.status === 200) {
        setIsSubmitted(true);
        // toast.success(
        //   "Thank you for booking your visit. Our representative will contact you shortly to confirm the details."
        // );
        setTimeout(() => {
          setShowForm(false); // Close the modal after success
          navigate("/"); // Redirect to the home page
        }, 2000);
      } else {
        toast.error("Submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  return (
    <div className="min-h-screen bg- text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Perfect Plan</h1>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Find your ideal property with our flexible subscription options.
          Whether you're looking for a free experience or premium support, we've
          got you covered.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
  <div
    key={plan.id}
    className="bg-[#1a1f2e] rounded-2xl p-8 relative shadow-xl"
  >
    {plan.badge && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#38f8cf] text-white text-xs font-bold px-4 py-1 rounded-full shadow-md z-10">
        {plan.badge}
      </div>
    )}

    <h2 className="text-2xl font-bold mb-2 text-white">{plan.title}</h2>

    <div className="flex items-baseline justify-center mb-2">
     <div className="flex items-baseline justify-center space-x-1 mb-2">
  {plan.text && (
    <span className="text-sm font-semibold text-gray-400">
      {plan.text}
    </span>
  )}
  <span className="text-3xl font-bold text-yellow-400">
    {plan.price}/-
  </span>
</div>

    </div>

    <p className="text-gray-400 mb-6 text-sm">{plan.description}</p>

    <ul className="space-y-4 mb-8 text-left">
      {plan.features.map((feature, index) => (
        <li key={index} className="flex items-center text-white">
          <img
            src={feature.icon}
            alt="icon"
            className="w-5 h-5 mr-3"
          />
          <span className="text-sm">{feature.text}</span>
        </li>
      ))}
    </ul>

    <button
      onClick={() => handlePlanClick(plan)}
      className="w-full py-3 px-6 rounded-lg font-semibold bg-yellow-400 text-black hover:bg-yellow-300 transition-colors"
    >
      {plan.buttonText}
    </button>
  </div>
))}

        </div>

        {/* Subscription Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-slate-700 bg-opacity-50 flex items-center justify-center z-50">
            {isSubmitted ? (
              <div className=" bg-slate-900 rounded-2xl p-8 w-11/12 md:w-1/3 text-center text-white">
                <div className="flex flex-col items-center ">
                  <div className="bg-green-100 rounded-full p-4 mb-6">
                    <svg
                      className="h-8 w-8 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-lg mb-6 leading-relaxed">
                    Thank you for booking your visit. Our representative will
                    contact you shortly to confirm the details.
                  </p>
                  <button
                    onClick={handleCancel}
                    className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg font-semibold transition duration-200"
                    disabled={loading} // Disable button while loading
                  >
                    OK
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 rounded-3xl p-8 w-11/12 md:w-3/4 lg:w-1/2 relative text-black max-h-[90vh] overflow-y-auto shadow-2xl">
                <button
                  onClick={handleCancel}
                  className="absolute top-4 right-4 text-gray-500 text-3xl hover:text-gray-700 transition"
                  disabled={loading} // Disable close button while loading
                >
                  &times;
                </button>
                <h2 className="text-3xl font-bold mb-4 text-center sm:text-left text-white">
                  {selectedPlan?.title}
                </h2>
                <p className="text-center sm:text-left text-white mb-8">
                  Please fill in your details to start your subscription
                </p>

                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  onSubmit={handleSubmit}
                >
                  {/* Input Fields */}
                  {[
                    { name: "firstName", label: "First Name *", type: "text" },
                    { name: "lastName", label: "Last Name *", type: "text" },
                    { name: "email", label: "Email ID *", type: "email" },
                    { name: "phone", label: "Phone Number *", type: "tel" },
                  ].map(({ name, label, type }) => (
                    <div key={name}>
                      <label className="block text-sm text-left font-semibold text-white mb-1">
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        placeholder={label}
                        required
                      />
                    </div>
                  ))}

                  {/* Staying With */}
                  <div className="relative w-full">
                    <label className="block text-sm text-left font-semibold text-white mb-1">
                      Staying With *
                    </label>

                    <div
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none flex justify-between items-center cursor-pointer"
                      onClick={() => setShowOptions(!showOptions)}
                    >
                      <span className="text-gray-700">
                        {formData.stayingWith || "Select option"}
                      </span>
                      <FaChevronDown className="text-gray-500" />
                    </div>

                    {showOptions && (
                      <div className="absolute top-full text-left left-0 mt-2 w-full z-20 bg-white border border-slate-300 rounded-md shadow-lg">
                        {["Friends", "Family", "Alone"].map((option) => (
                          <div
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Profession */}
                  <div className="relative w-full">
                    <label className="block text-sm text-left font-semibold text-white mb-1">
                      Profession *
                    </label>

                    <div
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none flex justify-between items-center cursor-pointer"
                      onClick={() =>
                        setShowOptionProfession(!showOptionProfession)
                      }
                    >
                      <span className="text-gray-700">
                        {formData.profession || "Select profession"}
                      </span>
                      <FaChevronDown className="text-gray-500" />
                    </div>

                    {showOptionProfession && (
                      <div className="absolute top-full text-left left-0 mt-2 w-full z-20 bg-white border border-slate-300 rounded-md shadow-lg">
                        {options.map((options) => (
                          <div
                            key={options}
                            onClick={() => handleSelects(options)}
                            className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                          >
                            {options}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Conditional Fields */}
                  {formData.profession === "Student" && (
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-left text-sm font-semibold text-white mb-1 ">
                        College Name
                      </label>
                      <input
                        type="text"
                        name="college"
                        value={formData.college || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        placeholder="Enter your college name"
                      />
                    </div>
                  )}

                  {formData.profession === "Working Professional" && (
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm text-left  font-semibold text-white mb-1">
                        About Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        placeholder="Enter your company name"
                      />
                    </div>
                  )}

                  {formData.profession === "Business" && (
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm text-left font-semibold text-white mb-1">
                        About Business
                      </label>
                      <input
                        type="text"
                        name="business"
                        value={formData.business || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        placeholder="Enter your business details"
                      />
                    </div>
                  )}

                  {/* Date */}
                  <div>
                    <label className="block text-sm text-left font-semibold text-white mb-1">
                      Date of Visit
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="dateOfVisit"
                        placeholder="DD/MM/YYYY"
                        value={formData.dateOfVisit}
                        onChange={handleInputChange}
                        className="w-full p-3 pr-10 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        required
                      />
                      <div
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar visibility on icon click
                      >
                        <FaRegCalendarAlt className="h-5 w-5 " />
                      </div>

                      {/* Show the DatePicker when the icon is clicked */}
                      {showCalendar && (
                        <div className="">
                          <DatePicker
                            selected={
                              formData.dateOfVisit
                                ? new Date(
                                    formData.dateOfVisit
                                      .split("/")
                                      .reverse()
                                      .join("-")
                                  )
                                : null
                            }
                            onChange={handleDateChange}
                            inline // Displays calendar inline below the input field
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {/*Time Slot */}
                  <div className="relative w-full mb-4">
                    <label className="block text-sm text-left font-semibold text-white mb-1">
                      Time Slot *
                    </label>

                    <div
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none flex justify-between items-center cursor-pointer"
                      onClick={() => setShowTimeOptions(!showTimeOptions)}
                    >
                      <span className="text-gray-700">
                        {formData.timeSlot || "Select time slot"}
                      </span>
                      <FaChevronDown className="text-gray-500" />
                    </div>

                    {showTimeOptions && (
                      <div className="absolute top-full left-0 mt-2 w-full z-20 bg-white border border-slate-300 rounded-md shadow-lg">
                        {timeSlots.map((slot) => (
                          <div
                            key={slot}
                            onClick={() => handleSelectTimeSlot(slot)}
                            className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                          >
                            {slot}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4 mt-4">
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-semibold transition duration-200"
                      disabled={loading} // Disable submit button while loading
                    >
                      {loading ? "Submitting..." : "Get Started"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-slate-800 font-semibold transition duration-200"
                      disabled={loading} // Disable cancel button while loading
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;