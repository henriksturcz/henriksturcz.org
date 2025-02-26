import React, { useRef } from "react";
import { motion } from "framer-motion";
import GridBackground from "./GridBackground"; // ✅ Eredeti háttér megtartva
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "typeface-open-sans";

const Section = styled.section`
  font-family: "Open Sans", sans-serif;
  padding: 50px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin: 50px auto;
  position: relative;
  overflow: hidden;
  background: #1a1a1a;
  border-radius: 50px;
  box-shadow: 14px 14px 28px #bebebe, -14px -14px 28px #bebebe;
`;

const Title = styled.h2`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
  z-index: 1;
  position: relative;
  color: #555;
`;

const ProjectCard = styled(motion.div)`
  background: linear-gradient(135deg, #076585, #ddd);
  padding: 20px;
  margin: 20px;
  width: 48%;
  max-width: 400px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  z-index: 1;

  &:hover {
    transform: scale(1.05);
  }

  .notititle {
    color: #fff;
    padding: 0.65rem;
    font-weight: 500;
    font-size: 1.1rem;
  }

  .notibody {
    color: #fff;
    padding: 0 1.25rem;
  }

  /* ✨ Eredeti animációk visszaépítve ✨ */
  &:after {
    position: absolute;
    content: "";
    width: 0.25rem;
    inset: 0.65rem auto 0.65rem 0.5rem;
    border-radius: 25px;
    background: linear-gradient(to bottom, #fff, #fff, #fff);
    transition: transform 300ms ease;
    z-index: 4;
  }

  &:hover:after {
    transform: translateX(0.15rem);
  }

  &:hover .notititle {
    transform: translateX(0.15rem);
  }

  &:hover .notibody {
    transform: translateX(0.25rem);
  }

  .notiglow,
  .notiborderglow {
    position: absolute;
    width: 20rem;
    height: 20rem;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle closest-side at center, white, transparent);
    opacity: 0;
    transition: opacity 300ms ease;
  }

  .notiglow {
    z-index: 3;
  }

  .notiborderglow {
    z-index: 1;
  }

  &:hover .notiglow {
    opacity: 0.1;
  }

  &:hover .notiborderglow {
    opacity: 0.1;
  }
`;

const projects = [
  { title: "Webpages", description: "React, JavaScript, HTML, CSS", path: "/" },
  { title: "Apps", description: "C++", path: "/apps" },
  { title: "AI", description: "Python", path: "/ai" }, // ✅ AI oldalra navigálás
  { title: "Robotics and Sensors", path: "/robotics" },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.location.reload(); // ⬅️ Kényszeríti az oldal frissítését
  };

  return (
    <Section ref={sectionRef}>
      <GridBackground parentRef={sectionRef} />
      <Title>Projects</Title>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.3 }}
          onClick={() => handleNavigation(project.path)} // ✅ Most frissít is!
        >
          <h3 className="notititle">{project.title}</h3>
          <p className="notibody">{project.description}</p>
        </ProjectCard>
      ))}
    </Section>
  );
};

export default Projects;
