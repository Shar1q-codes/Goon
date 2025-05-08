import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface GuestsSectionProps {
  id: string;
}

const GuestsContainer = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--background-color);
`;

const GuestsContent = styled(motion.div)`
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
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const GuestsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Guest = styled(motion.div)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const GuestImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  object-fit: cover;
`;

const GuestName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--accent-color);
`;

const GuestRole = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  opacity: 0.8;
`;

const GuestBio = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const GuestsSection: React.FC<GuestsSectionProps> = ({ id }): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const guests = [
    {
      name: "Anand Mahindra",
      role: "Chairman, Mahindra Group",
      image: "/images/guests/anand-mahindra.jpg",
      bio: "Visionary business leader and advocate for social entrepreneurship."
    },
    {
      name: "Sudha Murty",
      role: "Author & Philanthropist",
      image: "/images/guests/sudha-murty.jpg",
      bio: "Renowned author and chairperson of the Infosys Foundation."
    },
    {
      name: "Pullela Gopichand",
      role: "Chief National Coach",
      image: "/images/guests/pullela-gopichand.jpg",
      bio: "Badminton champion and mentor to Olympic medalists."
    },
    {
      name: "Shantha Biotech",
      role: "Healthcare Pioneer",
      image: "/images/guests/shantha-biotech.jpg",
      bio: "Revolutionary force in making vaccines accessible to all."
    }
  ];

  return (
    <GuestsContainer id={id} ref={ref}>
      <GuestsContent
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Special Guests
        </Title>
        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Join us in welcoming distinguished personalities who have made significant contributions to various fields and continue to inspire the next generation.
        </Description>
        <GuestsGrid>
          {guests.map((guest, index) => (
            <Guest
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            >
              <GuestImage src={guest.image} alt={guest.name} />
              <GuestName>{guest.name}</GuestName>
              <GuestRole>{guest.role}</GuestRole>
              <GuestBio>{guest.bio}</GuestBio>
            </Guest>
          ))}
        </GuestsGrid>
      </GuestsContent>
    </GuestsContainer>
  );
};

export default GuestsSection; 