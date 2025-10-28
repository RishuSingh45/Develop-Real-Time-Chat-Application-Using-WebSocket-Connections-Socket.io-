import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css'; 

const socket = io('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null); 

  const getTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    
    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, []); 

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]); 

  const sendMessage = () => {
    if (currentMessage.trim() && username.trim()) {
      const messageData = {
        user: username,
        text: currentMessage,
        time: getTime(),
      };
      
      socket.emit('sendMessage', messageData);
      setCurrentMessage(''); // Clear the input field
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h1>Real-Time Chat</h1>

      <input
        type="text"
        className="username-input"
        placeholder="Enter your name..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="message-list" ref={messageListRef}>
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.user}</strong> [{msg.time}]: {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;