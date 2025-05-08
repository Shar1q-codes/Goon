import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';

interface EventNightSectionProps {
  id: string;
}

const EventNightContainer = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--background-color);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const EventNightContent = styled(motion.div)`
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

const EventDetails = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const EventCard = styled(motion.div)`
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

const EventTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
`;

const EventText = styled.p`
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

const EventNightSection: React.FC<EventNightSectionProps> = ({ id }): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const eventDetails = [
    {
      title: 'Date & Time',
      text: 'Join us for an unforgettable evening of celebration and recognition.',
    },
    {
      title: 'Venue',
      text: 'A prestigious location in the heart of Hyderabad.',
    },
    {
      title: 'Highlights',
      text: 'Awards ceremony, networking, entertainment, and more.',
    },
    {
      title: 'Dress Code',
      text: 'Black tie optional. Come as you are, but bring your best self.',
    },
  ];

  return (
    <EventNightContainer id={id} ref={ref}>
      <ParallaxBackground speed={-20}>
        <div style={{ 
          width: '100%', 
          height: '100%', 
          background: 'radial-gradient(circle at 50% 50%, var(--accent-color) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </ParallaxBackground>
      <EventNightContent
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
            Event Night – The Celebration
          </Title>
        </Parallax>
        <Parallax speed={-3}>
          <Description
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join us for an evening of celebration, recognition, and inspiration.
            Where the city's brightest stars come together to shine even brighter.
          </Description>
        </Parallax>
        <EventDetails
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {eventDetails.map((item, index) => (
            <Parallax key={index} speed={-2 + index * 2}>
              <EventCard
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              >
                <EventTitle>{item.title}</EventTitle>
                <EventText>{item.text}</EventText>
              </EventCard>
            </Parallax>
          ))}
        </EventDetails>
      </EventNightContent>
    </EventNightContainer>
  );
};

export default EventNightSection; 