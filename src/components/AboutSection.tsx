import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AboutSectionProps {
  id: string;
}

const AboutContainer = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--background-color);
`;

const AboutContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: var(--text-color);
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: var(--accent-color);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AboutSection: React.FC<AboutSectionProps> = ({ id }): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <AboutContainer id={id} ref={ref}>
      <AboutContent
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          About Heroes of Hyderabad
        </Title>
        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Heroes of Hyderabad is a celebration of the extraordinary individuals who make our city truly special. From community leaders and social workers to artists and innovators, we shine a spotlight on those who work tirelessly to make Hyderabad a better place for all.
        </Description>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutSection; 