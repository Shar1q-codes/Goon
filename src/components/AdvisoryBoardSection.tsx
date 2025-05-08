import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AdvisoryBoardSectionProps {
  id: string;
}

const AdvisoryBoardContainer = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--background-color);
`;

const AdvisoryBoardContent = styled(motion.div)`
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

const AdvisorsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Advisor = styled(motion.div)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const AdvisorImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  object-fit: cover;
`;

const AdvisorName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--accent-color);
`;

const AdvisorRole = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  opacity: 0.8;
`;

const AdvisorBio = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const AdvisoryBoardSection: React.FC<AdvisoryBoardSectionProps> = ({ id }): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const advisors = [
    {
      name: "Dr. Raghunath Mashelkar",
      role: "Former Director General, CSIR",
      image: "/images/advisors/raghunath-mashelkar.jpg",
      bio: "Eminent scientist and innovation champion with numerous accolades."
    },
    {
      name: "Kiran Mazumdar-Shaw",
      role: "Executive Chairperson, Biocon",
      image: "/images/advisors/kiran-mazumdar.jpg",
      bio: "Pioneer in biotechnology and advocate for accessible healthcare."
    },
    {
      name: "Jayesh Ranjan",
      role: "Principal Secretary, IT & Industries",
      image: "/images/advisors/jayesh-ranjan.jpg",
      bio: "Key architect of Telangana's industrial and IT policies."
    },
    {
      name: "Sangita Reddy",
      role: "Joint Managing Director, Apollo Hospitals",
      image: "/images/advisors/sangita-reddy.jpg",
      bio: "Healthcare visionary transforming medical services in India."
    }
  ];

  return (
    <AdvisoryBoardContainer id={id} ref={ref}>
      <AdvisoryBoardContent
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Advisory Board
        </Title>
        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Meet our esteemed advisory board members who guide the Heroes of Hyderabad initiative with their vast experience and expertise.
        </Description>
        <AdvisorsGrid>
          {advisors.map((advisor, index) => (
            <Advisor
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            >
              <AdvisorImage src={advisor.image} alt={advisor.name} />
              <AdvisorName>{advisor.name}</AdvisorName>
              <AdvisorRole>{advisor.role}</AdvisorRole>
              <AdvisorBio>{advisor.bio}</AdvisorBio>
            </Advisor>
          ))}
        </AdvisorsGrid>
      </AdvisoryBoardContent>
    </AdvisoryBoardContainer>
  );
};

export default AdvisoryBoardSection; 