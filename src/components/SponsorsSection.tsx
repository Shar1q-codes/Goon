import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SponsorsSectionProps {
  id: string;
}

const SponsorsContainer = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--background-color);
`;

const SponsorsContent = styled(motion.div)`
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

const SponsorsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const SponsorCard = styled(motion.div)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SponsorLogo = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 1.5rem;
  object-fit: contain;
`;

const SponsorName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--accent-color);
`;

const SponsorType = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  opacity: 0.8;
`;

const SponsorDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const SponsorsSection: React.FC<SponsorsSectionProps> = ({ id }): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sponsors = [
    {
      name: "T-Hub",
      type: "Innovation Partner",
      logo: "/images/sponsors/t-hub.png",
      description: "India's largest innovation ecosystem catalyzing entrepreneurship."
    },
    {
      name: "TASK",
      type: "Skill Development Partner",
      logo: "/images/sponsors/task.png",
      description: "Telangana Academy for Skill and Knowledge empowering youth."
    },
    {
      name: "WE Hub",
      type: "Women Entrepreneurship Partner",
      logo: "/images/sponsors/we-hub.png",
      description: "India's first state-led incubator for women entrepreneurs."
    },
    {
      name: "RICH",
      type: "Research Innovation Partner",
      logo: "/images/sponsors/rich.png",
      description: "Research and Innovation Circle of Hyderabad fostering innovation."
    }
  ];

  return (
    <SponsorsContainer id={id} ref={ref}>
      <SponsorsContent
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Our Partners
        </Title>
        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We are proud to collaborate with organizations that share our vision of recognizing and celebrating Hyderabad's changemakers.
        </Description>
        <SponsorsGrid>
          {sponsors.map((sponsor, index) => (
            <SponsorCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            >
              <SponsorLogo src={sponsor.logo} alt={sponsor.name} />
              <SponsorName>{sponsor.name}</SponsorName>
              <SponsorType>{sponsor.type}</SponsorType>
              <SponsorDescription>{sponsor.description}</SponsorDescription>
            </SponsorCard>
          ))}
        </SponsorsGrid>
      </SponsorsContent>
    </SponsorsContainer>
  );
};

export default SponsorsSection; 