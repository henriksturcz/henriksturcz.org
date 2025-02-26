import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const BioSection = styled.section`
  width: 90%;
  margin-left: 75px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 80px;
  background: rgba(255, 255, 255, 0.1); /* Fehér áttetsző háttér */
  color: #fff;
  font-family: "Open Sans", sans-serif;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px); /* Ha szeretnéd az elmosódott hátteret */
`;

const BioContent = styled.div`
  max-width: 600px;
  text-align: left;
`;

const BioTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 15px;
  color: #fff;
`;

const BioText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #fff;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 50px;
`;

const SkillItem = styled(motion.div)`
  width: 250px;
  background: rgba(255, 255, 255, 0.7); /* Fehér áttetsző háttér */
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
`;

const SkillBar = styled(motion.div)`
  height: 8px;
  background: #076585;
  border-radius: 5px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const SkillText = styled.span`
  font-size: 1.1rem;
  color: #222;
  z-index: 2;
  position: relative;
`;

const skills = [
  { name: "Python", level: 5 },
  { name: "JavaScript", level: 8 },
  { name: "C++", level: 6 },
  { name: "HTML & CSS", level: 9 },
  { name: "Java", level: 1},
];

const Bio = () => {
  return (
    <BioSection>
      {/* Bal oldal: Szöveg */}
      <BioContent>
        <BioTitle>About Me</BioTitle>
        <BioText
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hi there! My main passion lies in <strong>sensors</strong> and 
          <strong> robotics</strong>, where I love designing and building 
          intelligent systems.Besides that, I truly enjoy <strong>web and application design & 
          development</strong>, crafting modern and interactive user experiences.
          I'm also interested in <strong>artificial intelligence</strong> and 
          how it can enhance automation and smart technologies.
        </BioText>
      </BioContent>

      {/* Jobb oldal: Programozási nyelvek */}
      <SkillsContainer>
        {skills.map((skill, index) => (
          <SkillItem
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <SkillText>{skill.name}</SkillText>
            <SkillBar
              initial={{ width: "0%" }}
              animate={{ width: `${skill.level * 10}%` }}
              transition={{ duration: 1 }}
            />
          </SkillItem>
        ))}
      </SkillsContainer>
    </BioSection>
  );
};

export default Bio;
