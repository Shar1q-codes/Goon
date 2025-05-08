import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';

interface WhyNowSectionProps {
  id: string;
}

const WhyNowContainer = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--primary-color);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const WhyNowContent = styled(motion.div)`
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

const TimelineContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rem;
  position: relative;
  padding: 2rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const TimelineItem = styled(motion.div)`
  flex: 1;
  text-align: center;
  padding: 1rem;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -50%;
    width: 100%;
    height: 2px;
    background: var(--accent-color);
    transform: translateY(-50%);

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const TimelineYear = styled.h3`
  font-size: 2rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
`;

const TimelineText = styled.p`
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

const WhyNowSection: React.FC<WhyNowSectionProps> = ({ id }): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineData = [
    { year: '2020', text: 'The year of resilience' },
    { year: '2021', text: 'The year of innovation' },
    { year: '2022', text: 'The year of growth' },
    { year: '2023', text: 'The year of heroes' },
  ];

  return (
    <WhyNowContainer id={id} ref={ref}>
      <ParallaxBackground speed={-20}>
        <div style={{ 
          width: '100%', 
          height: '100%', 
          background: 'radial-gradient(circle, var(--accent-color) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </ParallaxBackground>
      <WhyNowContent
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
            Because real heroes don't wait for applause.
          </Title>
        </Parallax>
        <Parallax speed={-3}>
          <Description
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            While the world scrolls past headlines, we pause to honour the people writing them.
            In classrooms, clinics, kitchens, codebases — they're redefining what it means to lead.
            We're not just telling their stories. We're making sure they echo.
          </Description>
        </Parallax>
        <TimelineContainer
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {timelineData.map((item, index) => (
            <Parallax key={index} speed={-2 + index * 2}>
              <TimelineItem
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              >
                <TimelineYear>{item.year}</TimelineYear>
                <TimelineText>{item.text}</TimelineText>
              </TimelineItem>
            </Parallax>
          ))}
        </TimelineContainer>
      </WhyNowContent>
    </WhyNowContainer>
  );
};

export default WhyNowSection; 