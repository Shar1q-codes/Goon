import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  z-index: 1000;
`;

const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid var(--accent-color);
  border-top: 3px solid transparent;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const LoadingText = styled(motion.p)`
  color: var(--secondary-color);
  font-size: 1.2rem;
  opacity: 0.8;
`;

const IntroContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  z-index: 1000;
`;

const IntroText = styled(motion.h1)`
  font-size: 4rem;
  color: var(--secondary-color);
  text-shadow: 0 0 10px var(--accent-color);
  margin: 1rem 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }): JSX.Element => {
  const [stage, setStage] = useState<'loading' | 'intro'>('loading');
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Lights', 'Camera', 'Awards'];

  useEffect(() => {
    // Loading stage
    const loadingTimer = setTimeout(() => {
      setStage('intro');
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (stage === 'intro') {
      // Intro stage
      const wordTimer = setTimeout(() => {
        if (currentWord < words.length - 1) {
          setCurrentWord(prev => prev + 1);
        } else {
          onComplete();
        }
      }, 1000);

      return () => clearTimeout(wordTimer);
    }
  }, [stage, currentWord, onComplete]);

  return (
    <AnimatePresence>
      {stage === 'loading' ? (
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Spinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <LoadingText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </LoadingText>
        </LoadingContainer>
      ) : (
        <IntroContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {words.map((word, index) => (
            <IntroText
              key={word}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: currentWord >= index ? 1 : 0,
                opacity: currentWord >= index ? 1 : 0,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {word}
            </IntroText>
          ))}
        </IntroContainer>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation; 