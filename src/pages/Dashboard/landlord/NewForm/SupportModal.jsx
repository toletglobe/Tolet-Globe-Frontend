import React, { useState } from "react";
import { API } from "../../../../config/axios";


const SupportModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    query: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async () => {
  const { name, phone, email, query } = form;

  if (!name || !phone || !email || !query) {
    return alert("Please fill in all required fields.");
  }

  try {
    const response = await API.post("/property/purchasequery", {
      username: name,
      phone,
      email,
      query,
    });

    // Optional: handle based on response data
    if (response.status === 200) {
      alert("Your query has been submitted successfully!");
      onSubmit(query, "General Support");
      onClose();
      setForm({ name: "", phone: "", email: "", query: "" }); // Reset form
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert(error?.response?.data?.message || "Submission failed.");
  }
};



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-[#121212] text-white rounded-2xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-4 right-4 text-2xl text-white"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-6 text-center">Contact Form</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full px-4 py-2 mt-1 bg-transparent border border-gray-500 rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 mt-1 bg-transparent border border-gray-500 rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Email Id<span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email id"
              className="w-full px-4 py-2 mt-1 bg-transparent border border-gray-500 rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              General Query<span className="text-red-500">*</span>
            </label>
            <textarea
              name="query"
              value={form.query}
              onChange={handleChange}
              placeholder="Describe your problem"
              rows="4"
              className="w-full px-4 py-2 mt-1 bg-transparent border border-gray-500 rounded-md focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              className="bg-gray-200 text-black px-5 py-2 rounded-md font-medium"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-5 py-2 rounded-md font-medium"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;
