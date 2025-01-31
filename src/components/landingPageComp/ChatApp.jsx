import React, { useState } from 'react';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import { BsFillSendFill } from 'react-icons/bs';
import { FaRegUserCircle, FaTimes } from 'react-icons/fa';
import chatIcon from '../assets/chatbot/chat.jpeg'; // Ensure this image is in the assets folder

const ChatApp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!isChatOpen && (
        <img 
          src={chatIcon} 
          alt="Chat Icon" 
          className="fixed bottom-5 right-5 w-16 h-16 rounded-full cursor-pointer z-50 transition-transform duration-200 ease-in-out transform hover:scale-110 hover:shadow-lg active:scale-95" 
          onClick={() => setIsChatOpen(true)} 
        />
      )}

      {/* Chat Box */}
      {isChatOpen && (
        <div className="fixed bottom-5 right-5 w-full sm:w-80 md:w-96 lg:w-96 xl:w-96 h-96 sm:h-80 md:h-[450px] lg:h-[500px] xl:h-[600px] bg-black text-white rounded-lg overflow-hidden border-2 border-violet-500 z-50 flex flex-col shadow-lg">
          {/* Chat Header */}
          <Card className="bg-black text-white border-b border-gray-700">
            <Card.Body className="p-2 flex items-center justify-between">
              <div className="flex items-center">
                <FaRegUserCircle size={30} className="mr-2" />
                <Card.Title className="mb-0">To Let Bot</Card.Title>
              </div>
              <FaTimes size={20} className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-red-500" onClick={() => setIsChatOpen(false)} />
            </Card.Body>
          </Card>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-2">
            <p className="text-center text-gray-400">Time</p>
            <div className="flex flex-col">
              <div className="max-w-[80%] p-2 mb-2 rounded-xl bg-gray-600 self-start">How can I help you?</div>
              <div className="max-w-[80%] p-2 mb-2 rounded-xl bg-darkslategray self-end text-white">I need to know the rent amount in my area.</div>
              <div className="max-w-[80%] p-2 mb-2 rounded-xl bg-darkslategray self-end text-white">And one more thing.</div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-2 bg-black">
            <InputGroup>
              <Form.Control type="text" placeholder="Aa" className="bg-black text-white border border-gray-600 rounded-full" />
              <Button variant="dark" className="bg-black text-white">
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