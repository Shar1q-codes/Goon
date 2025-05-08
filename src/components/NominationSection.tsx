import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface NominationSectionProps {
  id: string;
}

const NominationContainer = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--background-color);
`;

const NominationContent = styled(motion.div)`
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

const Form = styled(motion.form)`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
`;

const Label = styled.label`
  font-size: 1.1rem;
  color: var(--accent-color);
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-color);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-color);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const Select = styled.select`
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-color);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  background: var(--accent-color);
  color: var(--background-color);
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const NominationSection: React.FC<NominationSectionProps> = ({ id }): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <NominationContainer id={id} ref={ref}>
      <NominationContent
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Nominate a Hero
        </Title>
        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Know someone making a difference in Hyderabad? Nominate them for the Heroes of Hyderabad Awards.
        </Description>
        <Form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <FormGroup>
            <Label>Nominee's Name</Label>
            <Input type="text" required />
          </FormGroup>
          <FormGroup>
            <Label>Category</Label>
            <Select required>
              <option value="">Select a category</option>
              <option value="community">Community Champions</option>
              <option value="cultural">Cultural Catalysts</option>
              <option value="innovation">Innovation Icons</option>
              <option value="environmental">Environmental Warriors</option>
              <option value="social">Social Impact Stars</option>
              <option value="education">Education Excellence</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Why are you nominating them?</Label>
            <TextArea required placeholder="Tell us about their impact..." />
          </FormGroup>
          <FormGroup>
            <Label>Your Name</Label>
            <Input type="text" required />
          </FormGroup>
          <FormGroup>
            <Label>Your Email</Label>
            <Input type="email" required />
          </FormGroup>
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Nomination
          </SubmitButton>
        </Form>
      </NominationContent>
    </NominationContainer>
  );
};

export default NominationSection; 