import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';

interface NominationFormProps {
  id: string;
}

const FormContainer = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--background-color);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const FormContent = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  color: var(--text-color);
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  color: var(--primary-color);
  text-shadow: 0 0 10px var(--accent-color);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 3rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Form = styled(motion.form)`
  display: grid;
  gap: 2rem;
  text-align: left;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.1rem;
  color: var(--primary-color);
  font-weight: 500;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  font-size: 1rem;
  background: transparent;
  color: var(--text-color);
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  font-size: 1rem;
  background: transparent;
  color: var(--text-color);
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: var(--accent-color);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ParallaxBackground = styled(Parallax)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.1;
`;

const NominationForm: React.FC<NominationFormProps> = ({ id }): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    nomineeName: '',
    nomineeEmail: '',
    category: '',
    reason: '',
    nominatorName: '',
    nominatorEmail: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Nomination submitted successfully!');
      setFormData({
        nomineeName: '',
        nomineeEmail: '',
        category: '',
        reason: '',
        nominatorName: '',
        nominatorEmail: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting nomination. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer id={id} ref={ref}>
      <ParallaxBackground speed={-20}>
        <div style={{ 
          width: '100%', 
          height: '100%', 
          background: 'linear-gradient(45deg, var(--accent-color) 25%, transparent 25%, transparent 75%, var(--accent-color) 75%, var(--accent-color))',
          backgroundSize: '60px 60px'
        }} />
      </ParallaxBackground>
      <FormContent
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <Parallax speed={-5}>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Nominate Now. Join the Movement.
          </Title>
        </Parallax>
        <Parallax speed={-3}>
          <Description
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Know someone who deserves recognition? Nominate them for the Heroes of Hyderabad Awards.
            Your nomination could be the first step in celebrating their extraordinary contributions.
          </Description>
        </Parallax>
        <Form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <Label htmlFor="nomineeName">Nominee's Name</Label>
            <Input
              type="text"
              id="nomineeName"
              name="nomineeName"
              value={formData.nomineeName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="nomineeEmail">Nominee's Email</Label>
            <Input
              type="email"
              id="nomineeEmail"
              name="nomineeEmail"
              value={formData.nomineeEmail}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="category">Category</Label>
            <Input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="reason">Why are you nominating them?</Label>
            <TextArea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="nominatorName">Your Name</Label>
            <Input
              type="text"
              id="nominatorName"
              name="nominatorName"
              value={formData.nominatorName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="nominatorEmail">Your Email</Label>
            <Input
              type="email"
              id="nominatorEmail"
              name="nominatorEmail"
              value={formData.nominatorEmail}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Nomination'}
          </SubmitButton>
        </Form>
      </FormContent>
    </FormContainer>
  );
};

export default NominationForm; 