import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Contact from './Contact';
import Bio from '../components/Bio';

const Home = () => {
  return (
    <>
      <Hero />
      <Bio />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
