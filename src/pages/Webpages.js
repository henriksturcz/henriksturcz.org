import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Lightbox from "../components/Lightbox"; 

import imageCodexy2 from "../pics/React App - Opera 2025. 03. 18. 19_15_13.png";
import imageCodexy from "../pics/React App - Opera 2025. 03. 18. 19_14_34.png"

import imageNumerix from "../pics/React App - Opera 2025. 03. 23. 17_47_08.png";
import imageNumerix2 from "../pics/React App - Opera 2025. 03. 23. 17_47_32.png";
import imageNumerix3 from "../pics/React App - Opera 2025. 03. 23. 17_48_31.png";
import imageNumerix4 from "../pics/React App - Opera 2025. 03. 23. 17_47_49.png";

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
  border: 3px solid black; /* 🔥 Fekete szegély */
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

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background: #eee;
  border-radius: 5px;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: ${({ progress }) =>
    progress < 4 ? "#eee" : 
    progress < 7 ? "black" : 
    "  #076585"};
  width: ${({ progress }) => progress * 10}%;
  transition: width 0.5s ease-in-out;
`;

const ProgressLabel = styled.span`
  display: block;
  text-align: left;
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
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

// 🔹 Weboldal projektek adatai
const projects = [
  {
    id: "codexy",
    name: "Codexy",
    description:
      "This is an exciting webpage featuring various animated and interactive elements. The theme revolves around programming languages, providing useful facts and job requirements to inspire and motivate!",
    images: [imageCodexy,imageCodexy2],
    githubUrl: "https://github.com/henriksturcz/Codexy",
    progress: 9,
  },
  {
    id: "numerix",
    name: "Numerix",
    description:
      "Numerix is an interactive web app with animated calculators designed for solving math problems. Its sleek interface makes complex calculations fun and easy!",
    images: [imageNumerix, imageNumerix2, imageNumerix3, imageNumerix4],
    githubUrl: "https://github.com/henriksturcz/Numerix",
    progress: 9,
  }
];

const Webpages = () => {
  const navigate = useNavigate();
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setCurrentIndex(index);
  };

  return (
    <Container>
      <Title>Webpage Projects</Title>
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
              <MagnifyIcon style={{ fontSize: "20pt" }}>⌕</MagnifyIcon>
            </ImageContainer>
            <Content>
              <ProjectTitle>{project.name}</ProjectTitle>
              <Description>{project.description}</Description>
              <ProgressBarContainer>
                <ProgressBar progress={project.progress} />
              </ProgressBarContainer>
              <ProgressLabel>Progress: {project.progress} / 10</ProgressLabel>
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

export default Webpages;
