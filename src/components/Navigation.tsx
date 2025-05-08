import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface NavProps {
  scrolled: boolean;
}

const Nav = styled.nav<NavProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
  background: ${props => props.scrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.a)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--secondary-color);
  text-decoration: none;
  text-shadow: 0 0 10px var(--accent-color);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-color);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--secondary-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  padding: 2rem;
  z-index: 1001;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const MobileNavLink = styled(motion.a)`
  color: var(--secondary-color);
  text-decoration: none;
  font-size: 1.5rem;
  margin: 1rem 0;
  font-weight: 500;
`;

const Navigation: React.FC = (): JSX.Element => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Nav scrolled={scrolled}>
      <NavContainer>
        <Logo href="#hero">Heroes of Hyderabad</Logo>
        <NavLinks>
          <NavLink href="#hero">Home</NavLink>
          <NavLink href="#nominees">Nominees</NavLink>
          <NavLink href="#event-night">Event</NavLink>
          <NavLink href="#jury">Jury</NavLink>
          <NavLink href="#guests">Guests</NavLink>
          <NavLink href="#advisory-board">Advisory</NavLink>
          <NavLink href="#nominate">Nominate</NavLink>
        </NavLinks>
        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </NavContainer>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <MobileNavLink href="#hero" onClick={toggleMobileMenu}>Home</MobileNavLink>
            <MobileNavLink href="#nominees" onClick={toggleMobileMenu}>Nominees</MobileNavLink>
            <MobileNavLink href="#event-night" onClick={toggleMobileMenu}>Event</MobileNavLink>
            <MobileNavLink href="#jury" onClick={toggleMobileMenu}>Jury</MobileNavLink>
            <MobileNavLink href="#guests" onClick={toggleMobileMenu}>Guests</MobileNavLink>
            <MobileNavLink href="#advisory-board" onClick={toggleMobileMenu}>Advisory</MobileNavLink>
            <MobileNavLink href="#nominate" onClick={toggleMobileMenu}>Nominate</MobileNavLink>
          </MobileMenu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navigation; 