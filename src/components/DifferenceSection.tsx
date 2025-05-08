import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';

interface DifferenceSectionProps {
  id: string;
}

const DifferenceContainer = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--primary-color);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const DifferenceContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: var(--secondary-color);
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  color: var(--secondary-color);
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

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
`;

const FeatureText = styled.p`
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

const DifferenceSection: React.FC<DifferenceSectionProps> = ({ id }): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const featuresData = [
    {
      title: 'Community-Driven',
      text: 'Our awards are nominated and voted by the community, ensuring genuine recognition.',
    },
    {
      title: 'Transparent Process',
      text: 'Clear criteria, open voting, and an independent jury make our process fair and transparent.',
    },
    {
      title: 'Beyond Trophies',
      text: 'We provide mentorship, networking, and growth opportunities to all nominees.',
    },
    {
      title: 'Lasting Impact',
      text: 'Our winners become part of a growing network of change-makers in Hyderabad.',
    },
  ];

  return (
    <DifferenceContainer id={id} ref={ref}>
      <ParallaxBackground speed={-20}>
        <div style={{ 
          width: '100%', 
          height: '100%', 
          background: 'repeating-linear-gradient(45deg, var(--accent-color) 0, var(--accent-color) 1px, transparent 0, transparent 50%)',
          backgroundSize: '30px 30px'
        }} />
      </ParallaxBackground>
      <DifferenceContent
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
            What Makes TOT Awards Different?
          </Title>
        </Parallax>
        <Parallax speed={-3}>
          <Description
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We're not just another awards ceremony. We're a movement that celebrates
            real impact and genuine achievement. Here's what sets us apart.
          </Description>
        </Parallax>
        <FeaturesGrid
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {featuresData.map((item, index) => (
            <Parallax key={index} speed={-2 + index * 2}>
              <FeatureCard
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              >
                <FeatureTitle>{item.title}</FeatureTitle>
                <FeatureText>{item.text}</FeatureText>
              </FeatureCard>
            </Parallax>
          ))}
        </FeaturesGrid>
      </DifferenceContent>
    </DifferenceContainer>
  );
};

export default DifferenceSection; 