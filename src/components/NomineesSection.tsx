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
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  color: var(--primary-color);
  text-shadow: 0 0 10px var(--accent-color);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CriteriaGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const CriteriaCard = styled(motion.div)`
  background: var(--primary-color);
  padding: 2rem;
  border-radius: 10px;
  color: var(--secondary-color);
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CriteriaTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
`;

const CriteriaText = styled.p`
  font-size: 1rem;
  opacity: 0.8;
`;

const ParallaxBackground = styled(Parallax)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.1;
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
      <ParallaxBackground speed={-20}>
        <div style={{ 
          width: '100%', 
          height: '100%', 
          background: 'linear-gradient(45deg, var(--accent-color) 25%, transparent 25%, transparent 75%, var(--accent-color) 75%, var(--accent-color))',
          backgroundSize: '60px 60px'
        }} />
      </ParallaxBackground>
      <NomineesContent
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <Parallax speed={-5}>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Who Gets Nominated?
          </Title>
        </Parallax>
        <Parallax speed={-3}>
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
            <Parallax key={index} speed={-2 + index * 2}>
              <CriteriaCard
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
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