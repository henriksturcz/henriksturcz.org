import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import 'typeface-open-sans';

const HeroSection = styled.section`
  font-family: 'Open Sans', sans-serif;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 300; 
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-top: 10px;
  font-weight: 300; 
`;

const Hero = () => {
  return (
    <HeroSection>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Hi, I'm Henrik Sturcz!
      </Title>
      <Subtitle
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Software Engineer & Computer Scientist 
      </Subtitle>
    </HeroSection>
  );
};

export default Hero;
