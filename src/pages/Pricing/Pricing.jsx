import React, { useState } from "react";
import { plans } from "../../constant_pricing/index.js"; // path for subscription card

const Pricing = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    stayingWith: "",
    profession: "",
    dateOfVisit: "",
    timeSlot: "",
  });

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setShowForm(true);
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
  
    try {
      //change Backend Url
      const response = await fetch("/api/v1/pricing/submit-pricing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phone, // Match backend field name
          stayingWith: formData.stayingWith,
          profession: formData.profession,
          dateOfVisit: formData.dateOfVisit,
          timeSlot: formData.timeSlot,
        }),
      });
  
      if (response.ok) {
        console.log("Form submitted successfully!");
        setIsSubmitted(true); // Show success popup
      } else {
        const data = await response.json();
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
          Find your ideal property with our flexible subscription options.
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
              <div className="bg-slate-900 rounded-2xl p-8 w-11/12 md:w-1/3 text-center text-white">
                <div className="flex flex-col items-center">
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
                  <p className="text-lg mb-6">
                    Thank you for booking your visit. Our representative will contact you shortly to confirm the details.
                  </p>
                  <button
                    onClick={handleCancel}
                    className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg font-semibold"
                  >
                    OK
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 rounded-2xl p-8 w-11/12 md:w-3/4 lg:w-1/2 relative text-black max-h-[90vh] overflow-y-auto">
                <button
                  onClick={handleCancel}
                  className="absolute top-2 right-2 text-gray-500 text-2xl"
                >
                  &times;
                </button>
                <h2 className="text-2xl text-white font-bold mb-6">
                  {selectedPlan?.title} Subscription
                </h2>
                <p className="text-white p-4">Please fill in your details to start your subscription</p>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                  {[
                    { name: "firstName", label: "First Name", type: "text" },
                    { name: "lastName", label: "Last Name", type: "text" },
                    { name: "email", label: "Email ID", type: "email" },
                    { name: "phone", label: "Phone Number", type: "tel" },
                  ].map(({ name, label, type }) => (
                    <div key={name}>
                      <label className="block mb-1 text-white">{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border bg-white"
                        placeholder={label}
                        required
                      />
                    </div>
                  ))}

                  {/* Staying with */}
                  <div>
                    <label className="block mb-1 text-white">Staying with</label>
                    <select
                      name="stayingWith"
                      value={formData.stayingWith}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border bg-white"
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
                    <label className="block mb-1 text-white">Profession</label>
                    <select
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border bg-white"
                      required
                    >
                      <option value="">Select profession</option>
                      <option>Student</option>
                      <option>Working Professional</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Date and Time */}
                  <div>
                    <label className="block mb-1 text-white">Date of Visit</label>
                    <input
                      type="date"
                      name="dateOfVisit"
                      value={formData.dateOfVisit}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-white">Time Slot</label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border bg-white"
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
                  <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4 mt-6">
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-semibold"
                    >
                      {selectedPlan?.buttonText || "Get Started"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold"
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
