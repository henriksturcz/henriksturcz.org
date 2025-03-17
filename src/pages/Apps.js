import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  overflow: hidden;
  border-radius: 15px;
  margin: 0 20px;
  flex-shrink: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const projects = [
  {
    id: "file-sorter",
    name: "FileSorter",
    description:
      "A C++ program that can sort text and spreadsheet files in a terminal-like environment. It is capable of exporting data to different formats, making it easier to review and process.",
    imageUrl: "https://source.unsplash.com/180x180/?files,code",
    githubUrl: "https://github.com/henriksturcz/FileSorter",
    progress: 9,
  },
  {
    id: "kinematic-simulator",
    name: "Forward Kinematic Simulator",
    description:
      "A basic C++ simulator that helps visualize the movement of robotic arms based on kinematic equations. It can be useful for automation and robotics projects.",
    imageUrl: "https://source.unsplash.com/180x180/?robotics,simulation",
    githubUrl: "https://github.com/henriksturcz/ForwardKinematicSimulator",
    progress: 10,
  },
];

const Apps = () => {
  const navigate = useNavigate();
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
          ⬅ back to Home
      </button>
      <ProjectsList>
        {projects.map((project, index) => (
          <ProjectCard key={project.id}>
            <ImageContainer>
              <Image src={project.imageUrl} alt={project.name} />
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
    </Container>
  );
};

export default Apps;
