//import React from 'react';
import { Container, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { BsPlus, BsFillSendFill } from 'react-icons/bs';
import { FaRegUserCircle, FaCommentDots } from 'react-icons/fa';
import '../component/Chat.css';
const ChatApp = () => {
  return (
    <>
    <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      {/* Mobile Screen Container */}
      <div className="chat-screen border border-primary rounded position-relative" style={{ width: '360px', height: '640px' }}>
        
        {/* Chat Header */}
        <Card className="text-light bg-black rounded-top">
          <Card.Body className="p-2 d-flex align-items-center">
            <FaRegUserCircle size={30} className="me-2" />
            <Card.Title className="mb-0">To let bot</Card.Title>
          </Card.Body>
        </Card>

        {/* Chat Messages */}
        <div className="chat-body bg-black text-light p-3" style={{ height: '80%', overflowY: 'auto' }}>
          <p className="text-center text-muted">Time</p>
          <div className="d-flex flex-column">
            <div className="align-self-start bg-secondary p-2 rounded my-1">How can I Help You</div>
            <div className="align-self-end bg-dark text-light p-2 rounded my-1 border">I need to know the rent amount in my area</div>
            <div className="align-self-end bg-dark text-light p-2 rounded my-1 border">And one more thing.</div>
          </div>
        </div>

        {/* Message Input */}
        <div className="chat-footer bg-black p-2 d-flex align-items-center">
          <Button variant="dark" className="me-1"><BsPlus size={20} /></Button>
          <InputGroup>
            <Form.Control type="text" placeholder="Aa" className="bg-dark text-light border-secondary" />
            <Button variant="dark"><BsFillSendFill size={20} /></Button>
          </InputGroup>
        </div>

        {/* Floating Chat Icon */}
        <div className="position-absolute bottom-0 end-0 m-3">
          
        </div>
      </div>
      <FaCommentDots className='position-absolute bottom-0 end-0 m-5' color="white" size={40} />
    </Container>

    </>
  );
};

export default ChatApp;