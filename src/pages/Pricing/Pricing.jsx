import React, { useState } from "react";
import { plans } from "../../constant_pricing/index.js"; // path for subscription card
import { useStateValue } from "../../StateProvider.jsx";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";



const Pricing = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [{ compareProperty }, dispatch] = useStateValue();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    stayingWith: "",
    profession: "",
    college:"",
    company: "",
    business:"",
    dateOfVisit: "",
    timeSlot: "",
  });

  const handlePlanClick = (plan) => {
    if (plan.price === "₹0") {
      // Open Facebook link in a new tab
      window.open("https://www.facebook.com/toletglobe/?_rdr", "_blank");
      setSelectedPlan(plan);
      setShowForm(true);
    } else {
      setSelectedPlan(plan);
      setShowForm(true);
    }
  };
  

  const handleCancel = () => {
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
      college:"",
      company: "",
      business:"",
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
  const handleSubmit = async (e) => {
    e.preventDefault();
  
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
      const response = await fetch("http://localhost:8000/api/v1/pricing/submit-pricing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json(); // parse the response body
  
      if (response.status === 200) {
        setIsSubmitted(true);
        window.location.href = "https://www.facebook.com/toletglobe/?_rdr";
      } else {
        alert(data.msg || "Submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg- text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Perfect Plan</h1>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Find your ideal property with our flexible subscription options. Whether you're
          looking for a free experience or premium support, we've got you covered.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-[#1a1f2e] rounded-2xl p-8 relative">
              {plan.badge && (
                <div className={plan.badgeStyle}>{plan.badge}</div>
              )}
              <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-4xl font-bold text-yellow-400">
                  {plan.price}
                </span>
                <span className="text-gray-400 ml-1">{plan.period}</span>
              </div>
              <p className="text-gray-400 mb-6">{plan.description}</p>

              <ul className="space-y-4 mb-8 text-left">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <img
                      src={feature.icon}
                      alt="icon"
                      className="w-5 h-5 text-green-500 mr-3"
                    />
                    {feature.text}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanClick(plan)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg mb-6 leading-relaxed">
                  Thank you for booking your visit. Our representative will contact you shortly to confirm the details.
                </p>
                <button
                  onClick={handleCancel}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg font-semibold transition duration-200"
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
              >
                &times;
              </button>
              <h2 className="text-3xl font-bold mb-4 text-center sm:text-left text-white">
                {selectedPlan?.title} 
              </h2>
              <p className="text-center sm:text-left text-white mb-8">
                Please fill in your details to start your subscription
              </p>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                {/* Input Fields */}
                {[
                  { name: "firstName", label: "First Name", type: "text" },
                  { name: "lastName", label: "Last Name", type: "text" },
                  { name: "email", label: "Email ID", type: "email" },
                  { name: "phone", label: "Phone Number", type: "tel" },
                ].map(({ name, label, type }) => (
                  <div key={name}>
                    <label className="block text-sm font-semibold text-white mb-1">{label}</label>
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
                <div>
                  <label className="block text-sm font-semibold text-white mb-1">Staying With</label>
                  <select
                    name="stayingWith"
                    value={formData.stayingWith}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    required
                  >
                    <option value="">Select option</option>
                    <option>Friends</option>
                    <option>Family</option>
                    <option>Alone</option>
                  </select>
                </div>

                {/* Profession */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-1">Profession *</label>
                  <select
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    required
                  >
                    <option value="">Select profession</option>
                    <option>Student</option>
                    <option>Working Professional</option>
                    <option>Business</option>
                  </select>
                </div>

                {/* Conditional Fields */}
                {formData.profession === "Student" && (
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-white mb-1 ">College Name</label>
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
                    <label className="block text-sm font-semibold text-white mb-1">About Company</label>
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
                    <label className="block text-sm font-semibold text-white mb-1">About Business</label>
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

              

                {/* Date & Time */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-1">Date of Visit</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateOfVisit"
                      value={formData.dateOfVisit}
                      onChange={handleInputChange}
                      className="w-full p-3 pr-10 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                      required
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                      <FaRegCalendarAlt className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-1">Time Slot</label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    required
                  >
                    <option value="">Select time slot</option>
                    <option>10:00 AM - 12:00 PM</option>
                    <option>12:00 PM - 2:00 PM</option>
                    <option>2:00 PM - 4:00 PM</option>
                    <option>4:00 PM - 6:00 PM</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4 mt-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-semibold transition duration-200"
                  >
                    {selectedPlan?.buttonText || "Get Started"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-slate-800 font-semibold transition duration-200"
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
