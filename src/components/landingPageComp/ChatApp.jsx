import React, { useState } from 'react';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import { BsFillSendFill } from 'react-icons/bs';
import { FaRegUserCircle, FaTimes } from 'react-icons/fa';
import chatIcon from '../assets/chat-icon.jpeg'; // Ensure this image is in the assets folder
import { API } from '../../config/axios';

const ChatApp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { text: 'How can I help you?', from: 'bot' }
  ]);

  const handleSendMessage = async () => {
    if (userInput.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userInput, from: 'user' }
      ]);

      try {
        const response = await API.get(`faq=query?message=${encodeURIComponent(userInput)}`);
        const data = response.data;
        const botResponse = data.answer || 'Sorry, I didn’t understand that.';

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, from: 'bot' }
        ]);
      } catch (error) {
        console.error('Error fetching response:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Sorry, something went wrong.', from: 'bot' }
        ]);
      }

      setUserInput('');
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
        <div className="fixed bottom-5 right-5 w-11/12 sm:w-80 md:w-96 lg:w-[400px] xl:w-[450px] h-[500px] bg-black text-white rounded-lg overflow-hidden border-2 border-gray-700 z-50 flex flex-col shadow-lg">
          <Card className="bg-black text-white border-b border-gray-700">
            <Card.Body className="p-2 flex items-center justify-between">
              <div className="flex items-center">
                <FaRegUserCircle size={30} className="mr-2" />
                <Card.Title className="mb-0">To Let Bot</Card.Title>
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
                    message.from === 'user' ? 'bg-gray-800 self-end text-white' : 'bg-gray-600 self-start'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
          </div>

          <div className="p-2 bg-black">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Aa"
                className="bg-black text-white border border-gray-600 rounded-full"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Button variant="dark" className="bg-black text-white" onClick={handleSendMessage}>
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
