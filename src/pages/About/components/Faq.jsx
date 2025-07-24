import { useState } from "react";
import "./styles/faq.css";

const faqData = [
  {
    question: "What are To-Let's operating hours?",
    answer:
      "To-Let operates during standard business hours, providing assistance and support to our clients. Our current opening hours are from 9:00 AM to 9:00 PM, Monday to Saturday. Please note that these hours may be subject to change, and we recommend checking our official website or contacting our customer service for the most up-to-date information on our operating hours. We strive to be accessible to address your property management needs effectively.",
  },
  {
    question: "What is To-Let's cancellation policy?",
    answer:
      "To-Let understands that circumstances may change, and we aim to accommodate our clients to the best of our ability. Our cancellation policy varies depending on the specific service or arrangement. We recommend referring to your service agreement or contacting our customer service for detailed information tailored to your situation...",
  },
  {
    question: "Are To-Let's services safe to use?",
    answer:
      "Yes, To-Let is committed to ensuring the safety and security of our clients throughout their property management journey. We prioritize the protection of sensitive information, privacy, and the overall well-being of our clients...",
  },
  {
    question: "Can I speak directly to the real owner at To-Let?",
    answer:
      "At To-Let, we value open communication and transparency. While our team is readily available to assist you with any inquiries or concerns, direct communication with the property owner may depend on the specific circumstances and the owner's preferences...",
  },
  {
    question: "What is To-Let's mission?",
    answer:
      "To-Let's mission is to simplify and elevate the property management experience for property owners and tenants alike. We are dedicated to redefining industry standards by envisioning a future where seamless, efficient, and client-focused property management is the norm...",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="faq-container bg-black w-[90%] m-auto">
      <div className="row">
        <div className="faq-wrapper">

          {/* FAQ heading */}
          <div className="header rounded-t-xl md:rounded-t-3xl py-2 sm:py-8 text-2xl bg-[#409890] text-white w-full flex items-center justify-center -mb-0.5">
            <h1 className="px-2 text-[22px] sm:text-4xl font-semibold sm:font-bold text-center tracking-wider">
              FAQs
            </h1>
          </div>

          <div className="faqinner border-2 border-[#489890] cursor-pointer py-3">
            {faqData.map((faq, index) => (
              <div key={index}>
                <div
                  className="question py-1 px-2 sm:px-5 text-[18px] text-white flex items-center justify-between gap-6"
                  onClick={() => toggleFAQ(index)}
                >
                  <h4 className="sm:text-xl">{faq.question}</h4>
                  <h1
                    className={`icon text-white text-4xl transition-transform duration-200 flex py-2 items-center ${
                      openIndex === index ? "active" : ""
                    }`}
                  >
                    <i
                      className={`fa-solid font-normal sm:font-extrabold ${
                        openIndex === index ? "fa-minus" : "fa-plus"
                      }`}
                      style={{ color: "white", fontSize: "1.3rem" }}
                    ></i>
                  </h1>
                </div>

                <div
                  className={`answer text-white overflow-hidden max-h-0 mx-7 text-left ${
                    openIndex === index ? "active" : ""
                  }`}
                >
                  <p className="leading-6 text-[#6cc0c4]">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
