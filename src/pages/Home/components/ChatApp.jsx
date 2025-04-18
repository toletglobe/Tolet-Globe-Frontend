import React, { useEffect, useState, useRef } from "react";
import { Card, Form, InputGroup, Button } from "react-bootstrap";

import { BsFillSendFill } from "react-icons/bs";
import { FaRegUserCircle, FaTimes } from "react-icons/fa";
// import React, { useEffect, useRef } from 'react';
import chatIcon from "../../../assets/home/chatApp/chatbot-icon.png"; // Ensure this image is in the assets folder

import { API } from "../../../config/axios";

const ChatApp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "How can I help you?", from: "bot" },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (userInput.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userInput, from: "user" },
      ]);

      try {
        const response = await API.get(
          `faq?query=${encodeURIComponent(userInput)}`
        );

        const data = response.data;

        const botResponse = data.answer || "Sorry, I didn't understand that.";

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, from: "bot" },
        ]);
      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Sorry, something went wrong.", from: "bot" },
        ]);
      }

      setUserInput("");
    }
  };

  return (
    <>
      {!isChatOpen && (
        <img
          src={chatIcon}
          alt="Chat Icon"
          className="fixed bottom-5 right-5 w-16 h-16 rounded-full cursor-pointer z-50 transition-transform duration-200 ease-in-out transform hover:scale-110 hover:shadow-lg active:scale-95"
          onClick={() => setIsChatOpen(true)}
        />
      )}

      {isChatOpen && (
        <div className="fixed bottom-5 right-5 w-11/12 md:w-80 lg:w-[400px] xl:w-[450px] h-[500px] bg-black text-white rounded-lg overflow-hidden border-2 border-gray-700 z-50 flex flex-col shadow-lg">
          <Card className="bg-black text-white border-b border-gray-700">
            <Card.Body className="p-2 flex items-center justify-between">
              <div className="flex items-center">
                <FaRegUserCircle size={30} className="mr-2" />
                <Card.Title>To Let Bot</Card.Title>
              </div>
              <FaTimes
                size={20}
                className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-red-500"
                onClick={() => setIsChatOpen(false)}
              />
            </Card.Body>
          </Card>

          <div className="flex-1 overflow-y-auto p-2">
            <div className="flex flex-col">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] p-2 mb-2 rounded-xl ${
                    message.from === "user"
                      ? "bg-gray-800 self-end text-white"
                      : "bg-gray-600 self-start"
                  }`}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="m-2">
            <InputGroup>
              <Form.Control
                type="text"
                className="bg-black p-3 text-white border border-gray-600 rounded-full w-[83%] h-10"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(); // Call the function to send the message
                  }
                }}
              />
              <Button
                variant="dark"
                className="bg-black text-white mx-2"
                onClick={handleSendMessage}
              >
                <BsFillSendFill size={20} />
              </Button>
            </InputGroup>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatApp;
