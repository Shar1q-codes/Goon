import React from 'react';
import styled from 'styled-components';
import { Parallax } from 'react-scroll-parallax';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxWrapper = styled(Parallax)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  speed = -10,
  className 
}) => {
  return (
    <ParallaxWrapper speed={speed} className={className}>
      {children}
    </ParallaxWrapper>
  );
};

export default ParallaxSection; 