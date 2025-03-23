import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Lightbox from "../components/Lightbox"; 

import image1 from "../pics/FIleSorter.PNG";
import image2 from "../pics/Kinematic.PNG";
import image3 from "../pics/PathFind1.PNG";
import image4 from "../pics/PathFind2.PNG";

const Container = styled.div`
  text-align: center;
  margin: 20px auto;
  width: 90%;
  background: rgba(255, 255, 255, 0.4);
  padding: 50px;
  border-radius: 25px;
`;

const Title = styled.h1`
  color: black;
  font-size: 2rem;
`;

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
`;

const ProjectCard = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition: 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.02);
  }

  &:nth-child(odd) {
    flex-direction: row;
  }

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
`;

const ImageContainer = styled.div`
  width: 180px;
  height: 180px;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  margin: 0 20px;
  flex-shrink: 0;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 3px solid black;
  border-radius: 25px;
`;

const MagnifyIcon = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 2px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.5rem;
  color: #222;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
`;

const GitHubLink = styled.a`
  display: inline-block;
  margin-top: 15px;
  background: #11a7d9;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  transition: 0.3s;

  &:hover {
    background: #222;
  }
`;

const projects = [
  {
    id: "file-sorter",
    name: "FileSorter",
    description: "A C++ program that can sort text and spreadsheet files in a terminal-like environment. It is capable of exporting data to different formats, making it easier to review and process.",
    images: [image1],
    githubUrl: "https://github.com/henriksturcz/FileSorter",
  },
  {
    id: "kinematic-simulator",
    name: "Forward Kinematic Simulator",
    description: "A basic C++ simulator that helps visualize the movement of robotic arms based on kinematic equations. It can be useful for automation and robotics projects.",
    images: [image2],
    githubUrl: "https://github.com/henriksturcz/ForwardKinematicSimulator",
  },
  {
    id: "path-finder",
    name: "Path Finder",
    description: "A C++ simulator that visualize the movement of robots in maps and find paths. It can be useful for robotic movement and try simulating pathfinding with algorithms.",
    images: [image3, image4],
    githubUrl: "https://github.com/henriksturcz/PathFinder",
  },
];

const Apps = () => {
  const navigate = useNavigate();
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setCurrentIndex(index);
  };

  return (
    <Container>
      <Title>My C++ Projects</Title>
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
        ⬅ Back to Home
      </button>
      <ProjectsList>
        {projects.map((project) => (
          <ProjectCard key={project.id}>
            <ImageContainer onClick={() => openLightbox(project.images, 0)}>
              <Image src={project.images[0]} alt={project.name} />
              <MagnifyIcon style={{fontSize:'20pt'}}>⌕</MagnifyIcon>
            </ImageContainer>
            <Content>
              <ProjectTitle>{project.name}</ProjectTitle>
              <Description>{project.description}</Description>
              <GitHubLink href={project.githubUrl} target="_blank">
                View on GitHub
              </GitHubLink>
            </Content>
          </ProjectCard>
        ))}
      </ProjectsList>
      {lightboxImages.length > 0 && (
        <Lightbox
          images={lightboxImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          close={() => setLightboxImages([])}
        />
      )}
    </Container>
  );
};

export default Apps;
