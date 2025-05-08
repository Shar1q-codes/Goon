import React, { useState } from 'react';
import styled from 'styled-components';
import { ParallaxProvider } from 'react-scroll-parallax';
import { HelmetProvider } from 'react-helmet-async';
import GlobalStyles from './styles/GlobalStyles';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WhyNowSection from './components/WhyNowSection';
import NomineesSection from './components/NomineesSection';
import DifferenceSection from './components/DifferenceSection';
import EventNightSection from './components/EventNightSection';
import JurySection from './components/JurySection';
import GuestsSection from './components/GuestsSection';
import AdvisoryBoardSection from './components/AdvisoryBoardSection';
import SponsorsSection from './components/SponsorsSection';
import NominationForm from './components/NominationForm';
import Footer from './components/Footer';
import LoadingAnimation from './components/LoadingAnimation';
import SEO from './components/SEO';

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--background-color);
`;

const App: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <HelmetProvider>
      <SEO 
        title="Home"
        description="Celebrating the unsung heroes who make Hyderabad extraordinary. From innovators to educators, from artists to entrepreneurs, these are the stories that inspire us all."
        keywords="Hyderabad, heroes, awards, recognition, innovators, educators, artists, entrepreneurs"
      />
      <ParallaxProvider>
        <GlobalStyles />
        <AppContainer>
          {isLoading ? (
            <LoadingAnimation onComplete={handleLoadingComplete} />
          ) : (
            <>
              <Navigation />
              <HeroSection id="hero" />
              <AboutSection id="about" />
              <WhyNowSection id="why-now" />
              <NomineesSection id="nominees" />
              <DifferenceSection id="difference" />
              <EventNightSection id="event-night" />
              <JurySection id="jury" />
              <GuestsSection id="guests" />
              <AdvisoryBoardSection id="advisory-board" />
              <SponsorsSection id="sponsors" />
              <NominationForm id="nominate" />
              <Footer id="footer" />
            </>
          )}
        </AppContainer>
      </ParallaxProvider>
    </HelmetProvider>
  );
};

export default App; 