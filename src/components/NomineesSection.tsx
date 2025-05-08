import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';

interface NomineesSectionProps {
  id: string;
}

const NomineesContainer = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--background-color);
  position: relative;
  overflow: hidden;
  perspective: 1000px;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const NomineesContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: var(--text-color);
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  margin-bottom: 3rem;
  color: #000000;
  text-shadow: 0 0 10px var(--accent-color), 0 0 20px var(--accent-color);
  line-height: 1.4;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 2;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: #000000;
  opacity: 0.9;
  font-weight: 500;
  letter-spacing: 0.02em;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 2.5rem;
  }
`;

const CriteriaGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const CriteriaCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  will-change: transform;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-10px) scale(1.02);
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
`;

const CriteriaTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #000000;
  text-shadow: 0 0 5px var(--accent-color), 0 0 10px var(--accent-color);
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.02em;
`;

const CriteriaText = styled.p`
  font-size: 1rem;
  color: #000000;
  opacity: 0.9;
  font-weight: 500;
  line-height: 1.8;
  letter-spacing: 0.02em;
`;

const ParallaxBackground = styled(Parallax)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transform-style: preserve-3d;
`;

const NomineesSection: React.FC<NomineesSectionProps> = ({ id }): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const criteriaData = [
    {
      title: 'Impact',
      text: 'Individuals who have made a significant positive impact in their field or community.',
    },
    {
      title: 'Innovation',
      text: 'Those who have introduced new ideas, methods, or solutions to existing challenges.',
    },
    {
      title: 'Leadership',
      text: 'People who inspire and guide others through their actions and vision.',
    },
    {
      title: 'Resilience',
      text: 'Individuals who have overcome significant obstacles to achieve their goals.',
    },
  ];

  return (
    <NomineesContainer id={id} ref={ref}>
      <ParallaxBackground speed={-40}>
        <div style={{ 
          width: '120%', 
          height: '120%', 
          background: 'linear-gradient(45deg, var(--accent-color) 25%, transparent 25%, transparent 75%, var(--accent-color) 75%, var(--accent-color))',
          backgroundSize: '60px 60px',
          transform: 'translateZ(-100px)',
          opacity: 0.1
        }} />
      </ParallaxBackground>
      <NomineesContent
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <Parallax speed={-20}>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Who Gets Nominated?
          </Title>
        </Parallax>
        <Parallax speed={-15}>
          <Description
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Our nominees are the unsung heroes of Hyderabad - the ones who make a difference
            without seeking recognition. They come from all walks of life, united by their
            commitment to excellence and positive change.
          </Description>
        </Parallax>
        <CriteriaGrid
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {criteriaData.map((item, index) => (
            <Parallax key={index} speed={-10 + index * 5}>
              <CriteriaCard
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                style={{ transform: `translateZ(${index * 20}px)` }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <CriteriaTitle>{item.title}</CriteriaTitle>
                <CriteriaText>{item.text}</CriteriaText>
              </CriteriaCard>
            </Parallax>
          ))}
        </CriteriaGrid>
      </NomineesContent>
    </NomineesContainer>
  );
};

export default NomineesSection; 