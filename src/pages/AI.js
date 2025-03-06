import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Chatbox from "../components/Chatbox";

const Container = styled.div`
  text-align: center;
  margin: 20px auto;
  width: 90%;
  background: rgba(255, 255, 255, 0.4);
  padding: 50px;
  border-radius: 25px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  color: black;
  transition: 0.3s;
  &:hover {
    background: #ddd;
  }
`;

const aiServices = [
  { id: "chatbot", name: "Use AI" },
];

const Ai = () => {
  const navigate = useNavigate();
  const [selectedAi, setSelectedAi] = useState(null);

  return (
    <>
      <Container>
        <h1 style={{ color: "black" }}>AI Projects</h1>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            border: "none",
            background: "#222",
            color: "white",
          }}
        >
          ⬅ back to Home
        </button>
      </Container>
      <Container>
        <Grid>
          {aiServices.map((ai) => (
            <Card key={ai.id} onClick={() => setSelectedAi(ai.id)}>
              <h3>{ai.name}</h3>
            </Card>
          ))}
        </Grid>
        <Grid>
          {selectedAi === "chatbot" && <Chatbox aiId="chatbot" onClose={() => setSelectedAi(null)} />}
        </Grid>
      </Container>
    </>
  );
};

export default Ai;
