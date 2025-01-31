import { BsChatRightDots } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { useState } from "react";
import { API } from "../config/axios";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
    topic: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (evt) => {
    setFormData((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      msg: "",
      topic: "",
    });
  };

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      setLoading(true);
      const response = await API.post("contact/submit-data", formData);
      handleReset();
      toast.success("Enquiry Sent! We will  with you shortly.");
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-8 lg:space-y-0">
          {/* Contact Details Section */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-white text-3xl md:text-4xl font-semibold leading-tight">
                Contact Us, We're Ready to Help!
              </h1>
              <div className="space-y-2">
                <p className="text-gray-400">
                  We strive to provide you with the best experience and the best platform to find your choice.
                </p>
                <p className="text-gray-400">
                  Post us any queries and we'll get back to you.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <BsChatRightDots className="text-white text-2xl md:text-3xl flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h2 className="text-white text-xl md:text-2xl">Chat with us !!</h2>
                  <p className="text-gray-400">Our friendly team is here to help</p>
                  <p className="text-[#6CC1B6] hover:underline cursor-pointer">
                    hello@toletglobe.in
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <IoCallOutline className="text-white text-2xl md:text-3xl flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h2 className="text-white text-xl md:text-2xl">Call us...</h2>
                  <p className="text-gray-400">Mon - Sat, 8 AM to 10 PM</p>
                  <p className="text-[#6CC1B6] hover:underline cursor-pointer">
                    +91 8707727347
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="topic" className="block text-gray-400">
                  Topic
                </label>
                <select
                  id="topic"
                  value={formData.topic}
                  name="topic"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-transparent text-gray-300 focus:ring-2 focus:ring-[#6CC1B6] focus:border-transparent transition-colors"
                >
                  <option value="" className="bg-gray-900">Select a topic</option>
                  <option value="Residential" className="bg-gray-900">Residential</option>
                  <option value="Commercial" className="bg-gray-900">Commercial</option>
                  <option value="Others" className="bg-gray-900">Others</option>
                </select>
              </div>

              {[
                { id: 'name', label: 'Name', type: 'text', placeholder: 'John Doe' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'name@provider.com' },
                { id: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 8945678323' }
              ].map((field) => (
                <div key={field.id} className="space-y-2">
                  <label htmlFor={field.id} className="block text-gray-400">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    value={formData[field.id]}
                    onChange={handleChange}
                    required={field.id !== 'phone'}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-transparent text-gray-300 focus:ring-2 focus:ring-[#6CC1B6] focus:border-transparent transition-colors"
                  />
                </div>
              ))}

              <div className="space-y-2">
                <label htmlFor="msg" className="block text-gray-400">
                  Message
                </label>
                <textarea
                  id="msg"
                  name="msg"
                  rows="4"
                  placeholder="Type your message..."
                  value={formData.msg}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-transparent text-gray-300 focus:ring-2 focus:ring-[#6CC1B6] focus:border-transparent transition-colors resize-y min-h-[100px]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-[#6CC1B6] text-black font-medium hover:bg-[#5AA99E] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#6CC1B6] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Submit Query'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;