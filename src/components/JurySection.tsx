import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface JurySectionProps {
  id: string;
}

const JuryContainer = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--background-color);
`;

const JuryContent = styled(motion.div)`
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

const JuryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const JuryMember = styled(motion.div)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const JuryImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  object-fit: cover;
`;

const JuryName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--accent-color);
`;

const JuryRole = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  opacity: 0.8;
`;

const JuryBio = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const JurySection: React.FC<JurySectionProps> = ({ id }): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const juryMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Social Innovation Expert",
      image: "/images/jury/rajesh-kumar.jpg",
      bio: "Leading researcher in social innovation and community development with 20+ years of experience."
    },
    {
      name: "Priya Reddy",
      role: "Cultural Heritage Specialist",
      image: "/images/jury/priya-reddy.jpg",
      bio: "Renowned curator and advocate for preserving Hyderabad's cultural heritage."
    },
    {
      name: "Mohammed Azhar",
      role: "Tech Entrepreneur",
      image: "/images/jury/mohammed-azhar.jpg",
      bio: "Founder of multiple successful startups and mentor to emerging entrepreneurs."
    },
    {
      name: "Dr. Lakshmi Rao",
      role: "Environmental Scientist",
      image: "/images/jury/lakshmi-rao.jpg",
      bio: "Pioneer in sustainable urban development and environmental conservation."
    }
  ];

  return (
    <JuryContainer id={id} ref={ref}>
      <JuryContent
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Meet Our Jury
        </Title>
        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Our distinguished panel of experts brings diverse perspectives and decades of experience to evaluate and celebrate Hyderabad's heroes.
        </Description>
        <JuryGrid>
          {juryMembers.map((member, index) => (
            <JuryMember
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            >
              <JuryImage src={member.image} alt={member.name} />
              <JuryName>{member.name}</JuryName>
              <JuryRole>{member.role}</JuryRole>
              <JuryBio>{member.bio}</JuryBio>
            </JuryMember>
          ))}
        </JuryGrid>
      </JuryContent>
    </JuryContainer>
  );
};

export default JurySection; 