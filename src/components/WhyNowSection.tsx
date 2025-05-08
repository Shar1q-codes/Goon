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
  background: var(--background-color);
  position: relative;
  overflow: hidden;
  perspective: 1000px;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const WhyNowContent = styled(motion.div)`
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
  color: var(--secondary-color);
  text-shadow: 0 0 10px var(--accent-color);
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
  opacity: 0.9;
  letter-spacing: 0.02em;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 2.5rem;
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
  padding: 2rem;
  position: relative;
  margin: 1rem 0;

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
  margin-bottom: 1.5rem;
  line-height: 1.4;
`;

const TimelineText = styled.p`
  font-size: 1rem;
  opacity: 0.8;
  line-height: 1.6;
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
      <ParallaxBackground speed={-40}>
        <div style={{ 
          width: '120%', 
          height: '120%', 
          background: 'radial-gradient(circle, var(--accent-color) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'translateZ(-100px)'
        }} />
      </ParallaxBackground>
      <WhyNowContent
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
            Because real heroes don't wait for applause.
          </Title>
        </Parallax>
        <Parallax speed={-15}>
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
            <Parallax key={index} speed={-10 + index * 5}>
              <TimelineItem
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                style={{ transform: `translateZ(${index * 20}px)` }}
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