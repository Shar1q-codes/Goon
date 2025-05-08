import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CategoriesSectionProps {
  id: string;
}

const CategoriesContainer = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--background-color);
`;

const CategoriesContent = styled(motion.div)`
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

const Categories = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Category = styled(motion.div)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CategoryIcon = styled.span`
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
`;

const CategoryDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ id }): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = [
    {
      icon: '🌟',
      title: 'Community Champions',
      description: 'Leaders who create positive change in their neighborhoods'
    },
    {
      icon: '🎨',
      title: 'Cultural Catalysts',
      description: 'Artists and performers preserving our heritage'
    },
    {
      icon: '💡',
      title: 'Innovation Icons',
      description: 'Pioneers driving technological advancement'
    },
    {
      icon: '🌱',
      title: 'Environmental Warriors',
      description: "Defenders of our city's natural resources"
    },
    {
      icon: '❤️',
      title: 'Social Impact Stars',
      description: 'Change-makers addressing social challenges'
    },
    {
      icon: '📚',
      title: 'Education Excellence',
      description: 'Mentors shaping future generations'
    }
  ];

  return (
    <CategoriesContainer id={id} ref={ref}>
      <CategoriesContent
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Award Categories
        </Title>
        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover the diverse categories celebrating excellence across different domains of impact in Hyderabad.
        </Description>
        <Categories>
          {categories.map((category, index) => (
            <Category
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            >
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryTitle>{category.title}</CategoryTitle>
              <CategoryDescription>{category.description}</CategoryDescription>
            </Category>
          ))}
        </Categories>
      </CategoriesContent>
    </CategoriesContainer>
  );
};

export default CategoriesSection; 