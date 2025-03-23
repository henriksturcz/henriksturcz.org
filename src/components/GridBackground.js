import React, { useState, useEffect } from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  background: #fff;
  color: #999;
  font-family: monospace;
  font-size: 16px;
  line-height: 20px;
  pointer-events: none;
  border-radius: 50px;
box-shadow:  14px 14px 28px #bebebe,
             -14px -14px 28px #ffffff;
  overflow: hidden;
  z-index: 0;
`;

const GridBackground = ({ parentRef }) => {
  const gridSize = 20;
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 });
  const [smoothMousePos, setSmoothMousePos] = useState({ x: -1, y: -1 });
  const [gridDims, setGridDims] = useState({ width: 0, height: 0, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const updateGridSize = () => {
      if (parentRef.current) {
        const rect = parentRef.current.getBoundingClientRect();
        setGridDims({
          width: rect.width,
          height: parentRef.current.offsetHeight,
          offsetX: rect.left + window.scrollX,
          offsetY: rect.top + window.scrollY,
        });
      }
    };

    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, [parentRef]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({
        x: event.pageX - gridDims.offsetX,
        y: event.pageY - gridDims.offsetY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [gridDims]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (parentRef.current) {
        const rect = parentRef.current.getBoundingClientRect();
        setGridDims({
          width: rect.width,
          height: parentRef.current.offsetHeight,
          offsetX: rect.left + window.scrollX,
          offsetY: rect.top + window.scrollY,
        });
      }
    });

    if (parentRef.current) {
      observer.observe(parentRef.current, { childList: true, subtree: true, attributes: true });
    }

    return () => observer.disconnect();
  }, [parentRef]);

  useEffect(() => {
    let animationFrame;
    const smoothUpdate = () => {
      setSmoothMousePos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.3,
        y: prev.y + (mousePos.y - prev.y) * 0.3,
      }));
      animationFrame = requestAnimationFrame(smoothUpdate);
    };

    animationFrame = requestAnimationFrame(smoothUpdate);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos]);

  const getSymbol = (x, y) => {
    const dx = x - smoothMousePos.x;
    const dy = y - smoothMousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 20) return "o";
    if (distance < 40) return dx * dy > 0 ? "\\" : "/";
    if (distance < 60) return "|";
    if (distance < 80) return "+";
    return "+";
  };

  return (
    <GridContainer
      style={{
        gridTemplateColumns: `repeat(${Math.ceil(gridDims.width / gridSize)}, ${gridSize}px)`,
        gridTemplateRows: `repeat(${Math.ceil(gridDims.height / gridSize)}, ${gridSize}px)`,
      }}
    >
      {Array.from({
        length: Math.ceil(gridDims.width / gridSize) * Math.ceil(gridDims.height / gridSize),
      }).map((_, index) => {
        const x = (index % Math.ceil(gridDims.width / gridSize)) * gridSize + gridSize / 2;
        const y = Math.floor(index / Math.ceil(gridDims.width / gridSize)) * gridSize + gridSize / 2;
        return (
          <div key={index} style={{ textAlign: "center" }}>{getSymbol(x, y)}</div>
        );
      })}
    </GridContainer>
  );
};

export default GridBackground;
