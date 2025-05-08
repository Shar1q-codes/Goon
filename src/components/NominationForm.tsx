import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';

interface FormData {
  name: string;
  designation: string;
  organization: string;
  phone: string;
  email: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  about: string;
  profilePicture: File | null;
}

interface FormErrors {
  name?: string;
  designation?: string;
  organization?: string;
  phone?: string;
  email?: string;
  about?: string;
  profilePicture?: string;
}

interface LabelProps {
  required?: boolean;
  children: React.ReactNode;
}

const FormContainer = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--background-color);
  position: relative;
  overflow: hidden;
  perspective: 1000px;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const FormContent = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #000000;
  text-shadow: 0 0 10px var(--accent-color), 0 0 20px var(--accent-color);
  text-align: center;
  line-height: 1.4;
  letter-spacing: -0.02em;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label<LabelProps>`
  color: #000000;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: '*';
    color: var(--accent-color);
    display: ${props => props.required ? 'block' : 'none'};
  }
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: #000000;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(var(--accent-color-rgb), 0.2);
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: #000000;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(var(--accent-color-rgb), 0.2);
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const FileInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FileInputLabel = styled.label`
  padding: 1rem 2rem;
  background: var(--accent-color);
  color: #000000;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const FileName = styled.span`
  color: #000000;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: var(--accent-color);
  color: #000000;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.span`
  color: #ff4444;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const ParallaxBackground = styled(Parallax)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.1;
  pointer-events: none;
`;

const NominationForm: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    designation: '',
    organization: '',
    phone: '',
    email: '',
    linkedin: '',
    instagram: '',
    facebook: '',
    about: '',
    profilePicture: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.about.trim()) newErrors.about = 'About section is required';
    // if (!formData.profilePicture) newErrors.profilePicture = 'Profile picture is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      
      // Append all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch('https://formspree.io/f/myzwjlkg', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Reset form after successful submission
        setFormData({
          name: '',
          designation: '',
          organization: '',
          phone: '',
          email: '',
          linkedin: '',
          instagram: '',
          facebook: '',
          about: '',
          profilePicture: null,
        });
        setFileName('');
        alert('Thank you for your nomination! We will review it shortly.');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your nomination. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, profilePicture: file }));
    setFileName(file ? file.name : '');
    if (errors.profilePicture) {
      setErrors(prev => ({ ...prev, profilePicture: undefined }));
    }
  };

  return (
    <FormContainer id="nominate" ref={ref}>
      <ParallaxBackground speed={-20}>
        <div style={{ 
          width: '100%', 
          height: '100%', 
          background: 'linear-gradient(45deg, var(--accent-color) 25%, transparent 25%, transparent 75%, var(--accent-color) 75%, var(--accent-color))',
          backgroundSize: '60px 60px',
          pointerEvents: 'none'
        }} />
      </ParallaxBackground>
      <FormContent
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <Parallax speed={-5} style={{ pointerEvents: 'auto' }}>
          <Title>Nominate a Hero</Title>
        </Parallax>
        <Parallax speed={-3} style={{ pointerEvents: 'auto' }}>
          <Description
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Know someone who deserves recognition? Nominate them for the Heroes of Hyderabad Awards.
            Your nomination could be the first step in celebrating their extraordinary contributions.
          </Description>
        </Parallax>
        <Form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 3 }}>
          <FormGroup>
            <Label required>Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter nominee's full name"
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label required>Designation</Label>
            <Input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter nominee's designation"
            />
            {errors.designation && <ErrorMessage>{errors.designation}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label required>Organization</Label>
            <Input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Enter organization name"
            />
            {errors.organization && <ErrorMessage>{errors.organization}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label required>Phone</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label required>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>LinkedIn</Label>
            <Input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="Enter LinkedIn profile URL"
            />
          </FormGroup>

          <FormGroup>
            <Label>Instagram</Label>
            <Input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="Enter Instagram profile URL"
            />
          </FormGroup>

          <FormGroup>
            <Label>Facebook</Label>
            <Input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="Enter Facebook profile URL"
            />
          </FormGroup>

          <FormGroup>
            <Label required>About You</Label>
            <TextArea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell us about the nominee's achievements and impact"
            />
            {errors.about && <ErrorMessage>{errors.about}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Profile Picture</Label>
            <FileInput>
              <FileInputLabel>
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </FileInputLabel>
              <FileName>
                {fileName || 'No file chosen'}
              </FileName>
            </FileInput>
            {errors.profilePicture && <ErrorMessage>{errors.profilePicture}</ErrorMessage>}
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