import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FooterProps {
  id: string;
}

const FooterContainer = styled.footer`
  padding: 4rem 2rem;
  background: var(--primary-color);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const FooterContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: var(--secondary-color);
  position: relative;
  z-index: 2;
`;

const FooterText = styled(motion.p)`
  font-size: 1.5rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const PoweredBy = styled(motion.div)`
  font-size: 1.2rem;
  color: var(--accent-color);
  margin-top: 2rem;
  font-weight: bold;
`;

const Footer: React.FC<FooterProps> = ({ id }): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <FooterContainer id={id} ref={ref}>
      <FooterContent
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <FooterText
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hyderabad isn't just growing. It's rising. And so are its heroes.
        </FooterText>
        <PoweredBy
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Powered by TOT Awards – Triumphs of Talent
        </PoweredBy>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 