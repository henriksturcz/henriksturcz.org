import React from 'react';
import styled from 'styled-components';
import 'typeface-open-sans';

const ContactSection = styled.section`
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  padding: 50px;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center; /* Középre rendezi a linkeket */
  gap: 50px; /* Közötti távolság a linkek között */
  margin-top: 20px;
`;

const Link = styled.a`
font-family: 'Open Sans', sans-serif;
  color: #000;
  text-decoration: none;
  font-size: 1.1rem;
  
  &:hover {
    text-decoration: none;
  }
`;

const Contact = () => {
  return (
    <ContactSection>
      <h2 style={{color:'#000'}}>Contact</h2>
      <LinksContainer>
        <p><Link href="mailto:ludwighone@gmail.com">ludwighone@gmail.com</Link></p>
        <p><Link href="https://linkedin.com/in/henrik-sturcz-90b257351" target="_blank" rel="noopener noreferrer">LinkedIn</Link></p>
        <p><Link href="https://github.com/tegithubod" target="_blank" rel="noopener noreferrer">GitHub</Link></p>
      </LinksContainer>
    </ContactSection>
  );
};

export default Contact;
