import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';
import SEO from './SEO';

interface HeroSectionProps {
  id: string;
}

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  position: relative;
  overflow: hidden;
  perspective: 1000px;
`;

const HeroContent = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
  text-align: center;
  color: var(--secondary-color);
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  margin-bottom: 2.5rem;
  color: var(--secondary-color);
  text-shadow: 0 0 10px var(--accent-color);
  line-height: 1.4;
  font-weight: 700;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  line-height: 2;
  margin-bottom: 3rem;
  max-width: 800px;
  opacity: 0.9;
  color: var(--secondary-color);
  text-shadow: 0 0 5px var(--accent-color);
  font-weight: 400;
  letter-spacing: 0.02em;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 2.5rem;
  }
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-color);
  background: var(--secondary-color);
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    background: var(--accent-color);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
  }
`;

const ParallaxLayer = styled(Parallax)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transform-style: preserve-3d;
`;

const CharminarImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateZ(-100px);
  width: 120%;
  max-width: 1400px;
  height: auto;
  object-fit: contain;
  filter: brightness(0.7) contrast(1.2) saturate(1.1);
  mix-blend-mode: luminosity;
  will-change: transform;
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 120%;
  height: 120%;
  object-fit: cover;
  opacity: 0.4;
  filter: brightness(0.6) contrast(1.1);
  transform: translateZ(-200px);
  will-change: transform;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0.85) 100%
  );
  z-index: 1;
`;

const DecorativeElement = styled.div<{ position: 'top' | 'bottom' }>`
  position: absolute;
  ${props => props.position === 'top' ? 'top: 20%;' : 'bottom: 20%;'}
  ${props => props.position === 'top' ? 'right: 10%;' : 'left: 10%;'}
  width: 200px;
  height: 200px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.6;
  filter: brightness(0.8) contrast(1.2);
  mix-blend-mode: overlay;
`;

const HeroSection: React.FC<HeroSectionProps> = ({ id }): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const formSection = document.getElementById('nominate');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO 
        title="Home"
        description="A city isn't built by stone. It's built by spirit. Celebrating the unsung heroes who make Hyderabad extraordinary."
        keywords="Hyderabad, heroes, spirit, city, changemakers, visionaries"
      />
      <HeroContainer id={id} ref={ref}>
        {/* Background layer with city lights */}
        <ParallaxLayer speed={-50}>
          <BackgroundImage 
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80"
            alt="Hyderabad city lights"
          />
        </ParallaxLayer>

        {/* Middle layer with Charminar */}
        <ParallaxLayer speed={-30}>
          <CharminarImage 
            src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80"
            alt="Charminar monument"
          />
        </ParallaxLayer>

        {/* Decorative elements */}
        <ParallaxLayer speed={-20}>
          <DecorativeElement 
            position="bottom"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80)'
            }}
          />
        </ParallaxLayer>

        <ParallaxLayer speed={-25}>
          <DecorativeElement 
            position="top"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80)'
            }}
          />
        </ParallaxLayer>

        <Overlay />

        <HeroContent
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <Parallax speed={-15}>
            <Title
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A city isn't built by stone. It's built by spirit.
            </Title>
          </Parallax>
          <Parallax speed={-10}>
            <Subtitle
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              From quiet changemakers to bold visionaries, Hyderabad pulses with unsung stories.
              We're not just recognizing them — we're giving them a stage, a spotlight, a standing ovation.
            </Subtitle>
          </Parallax>
          <Parallax speed={-5}>
            <CTAButton
              href="#nominate"
              onClick={scrollToForm}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Nominate a Hero
            </CTAButton>
          </Parallax>
        </HeroContent>
      </HeroContainer>
    </>
  );
};

export default HeroSection; 