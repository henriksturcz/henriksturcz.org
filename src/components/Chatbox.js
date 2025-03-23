import React, { useState } from "react";
import styled from "styled-components";

const Chatbox = ({ aiId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [underConstruction] = useState(true);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);

    try {
      const response = await fetch(`http://localhost:5000/${aiId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages([...messages, newMessage, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Hiba történt!", error);
    }

    setInput("");
  };

  return (
    <ChatContainer>
      <CloseButton onClick={onClose}>×</CloseButton>
        <h3>{aiId.toUpperCase()}</h3>

        {underConstruction ? (
          <UnderConstructionMessage>🚧 Sorry! This feature is under construction 🚧</UnderConstructionMessage>
        ) : (
          <>
            <ChatMessages>
              {messages.map((msg, index) => (
                <Message key={index} sender={msg.sender}>
                  {msg.text}
                </Message>
              ))}
            </ChatMessages>

            <ChatInput>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write something..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); 
                    sendMessage();
                  }
                }}
              />
              <button onClick={sendMessage}>➤</button>
            </ChatInput>
          </>
        )}
    </ChatContainer>
  );
};

export default Chatbox;


const ChatContainer = styled.div`
  font-family: "Open Sans", sans-serif;
  background: white;
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  max-width: 1300px;
  margin: 20px auto;
  color: black;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.div`
  font-family: "Open Sans", sans-serif;
  position: absolute;
  right: 15px;
  top: 3px;
  cursor: pointer;
  font-size: 30px;
`;

const UnderConstructionMessage = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  color: black;
  margin-top: 20px;
  padding: 15px;
  background-color: ##11a7d9;
  border-radius: 10px;
  text-align: center;
`;

const ChatMessages = styled.div`
  font-family: "Open Sans", sans-serif;
  height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;

const Message = styled.p`
  font-family: "Open Sans", sans-serif;
  background: ${(props) => (props.sender === "user" ? " #11a7d9" : "#fff")};
  color: ${(props) => (props.sender === "user" ? "white" : "black")};
  padding: ${(props) => (props.sender === "user" ? "12px" : "8px")};
  border-radius: 10px;
  margin-bottom: 5px;
  text-align: ${(props) => (props.sender === "user" ? "right" : "left")};
  width: ${(props) => (props.sender === "user" ? "auto" : "fit-content")};
  max-width: 500px;
  margin-left: ${(props) => (props.sender === "user" ? "auto" : "0")};
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const ChatInput = styled.div`
  font-family: "Open Sans", sans-serif;
  display: flex;
  gap: 10px;

  textarea {
    flex: 1;
    border-radius:10px;
    padding: 8px;
    resize: none;  
    height: 50px;  
  }

  button {
    background: #11a7d9;
    border-radius:10px;
    color: white;
    border: none;
    padding: 8px;
    cursor: pointer;
  }
`;
