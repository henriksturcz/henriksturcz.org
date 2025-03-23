import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const arrowHover = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1000;
  animation: ${fadeIn} 0.4s ease-in-out;
`;

const ImageContainer = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 80%;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: auto;
  max-width: 100%;
  max-height: 80vh;
  display: block;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
  animation: ${slideIn} 0.3s ease-in-out;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
`;

const ArrowContainer = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.6);
    animation: ${arrowHover} 0.3s ease-in-out;
  }
`;

const Arrow = styled.span`
  font-size: 24px;
  color: white;
  font-weight: bold;
`;

const Lightbox = ({ images, currentIndex, setCurrentIndex, close }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, close, setCurrentIndex]);

  return (
    <Overlay onClick={close}>
      <ImageContainer onClick={(e) => e.stopPropagation()}>
        <Image src={images[currentIndex]} alt="Project Screenshot" />
      </ImageContainer>
      {images.length > 1 && (
        <Controls>
          <ArrowContainer
            onClick={(e) => {
              e.stopPropagation(); 
              setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
            }}
          >
            <Arrow>◀</Arrow>
          </ArrowContainer>
          <ArrowContainer
            onClick={(e) => {
              e.stopPropagation(); 
              setCurrentIndex((prev) => (prev + 1) % images.length);
            }}
          >
            <Arrow>▶</Arrow>
          </ArrowContainer>
        </Controls>
      )}
    </Overlay>
  );
};

export default Lightbox;
