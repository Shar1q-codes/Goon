import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Nomination {
  id: string;
  name: string;
  designation: string;
  organization: string;
  phone: string;
  email: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  about: string;
  profilePicture: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: var(--background-color);
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #000000;
  font-size: 2.5rem;
  text-shadow: 0 0 10px var(--accent-color);
`;

const LogoutButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: var(--accent-color);
  color: #000000;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const Card = styled(motion.div)`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  color: #000000;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const CardText = styled.p`
  color: #000000;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled(motion.button)<{ variant: 'accept' | 'reject' }>`
  padding: 0.8rem 1.5rem;
  background: ${props => props.variant === 'accept' ? '#4CAF50' : '#f44336'};
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
`;

const AdminDashboard: React.FC = () => {
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    // Fetch nominations from Formspree
    fetchNominations();
  }, [navigate]);

  const fetchNominations = async () => {
    try {
      const response = await fetch('https://formspree.io/f/myzwjlkg/submissions', {
        headers: {
          'Authorization': 'Bearer YOUR_FORMSPREE_API_KEY' // You'll need to get this from Formspree
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setNominations(data.map((submission: any) => ({
          id: submission.id,
          name: submission.data.name,
          designation: submission.data.designation,
          organization: submission.data.organization,
          phone: submission.data.phone,
          email: submission.data.email,
          linkedin: submission.data.linkedin,
          instagram: submission.data.instagram,
          facebook: submission.data.facebook,
          about: submission.data.about,
          profilePicture: submission.data.profilePicture,
          status: 'pending'
        })));
      }
    } catch (error) {
      console.error('Error fetching nominations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  const handleAction = async (nominationId: string, action: 'accept' | 'reject') => {
    try {
      const nomination = nominations.find(n => n.id === nominationId);
      if (!nomination) return;

      // Send email notification
      await fetch('https://formspree.io/f/myzwjlkg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _replyto: nomination.email,
          _subject: `Your nomination has been ${action}ed`,
          message: `Dear ${nomination.name},\n\nYour nomination has been ${action}ed. ${
            action === 'accept' 
              ? 'Congratulations! We will contact you soon with further details.'
              : 'Thank you for your interest. We encourage you to apply again in the future.'
          }\n\nBest regards,\nHeroes of Hyderabad Team`
        })
      });

      // Update nomination status
      setNominations(prev => 
        prev.map(n => 
          n.id === nominationId 
            ? { ...n, status: action === 'accept' ? 'accepted' : 'rejected' }
            : n
        )
      );
    } catch (error) {
      console.error('Error processing action:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Admin Dashboard</Title>
        <LogoutButton
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </LogoutButton>
      </Header>

      <CardsContainer>
        {nominations.map((nomination) => (
          <Card
            key={nomination.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardImage src={nomination.profilePicture} alt={nomination.name} />
            <CardTitle>{nomination.name}</CardTitle>
            <CardText><strong>Designation:</strong> {nomination.designation}</CardText>
            <CardText><strong>Organization:</strong> {nomination.organization}</CardText>
            <CardText><strong>Email:</strong> {nomination.email}</CardText>
            <CardText><strong>Phone:</strong> {nomination.phone}</CardText>
            <CardText><strong>About:</strong> {nomination.about}</CardText>
            
            {nomination.status === 'pending' && (
              <ButtonGroup>
                <ActionButton
                  variant="accept"
                  onClick={() => handleAction(nomination.id, 'accept')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Accept
                </ActionButton>
                <ActionButton
                  variant="reject"
                  onClick={() => handleAction(nomination.id, 'reject')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reject
                </ActionButton>
              </ButtonGroup>
            )}
            
            {nomination.status !== 'pending' && (
              <CardText>
                <strong>Status:</strong>{' '}
                <span style={{ 
                  color: nomination.status === 'accepted' ? '#4CAF50' : '#f44336'
                }}>
                  {nomination.status.charAt(0).toUpperCase() + nomination.status.slice(1)}
                </span>
              </CardText>
            )}
          </Card>
        ))}
      </CardsContainer>
    </DashboardContainer>
  );
};

export default AdminDashboard; 