import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const BookingContainer = styled.div`
  max-width: 600px;
  margin: 100px auto;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #00a2ff;
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #00a2ff;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0081cc;
  }
`;

const Message = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
`;

const SuccessMessage = styled(Message)`
  background-color: #d4edda;
  color: #155724;
`;

const ErrorMessage = styled(Message)`
  background-color: #f8d7da;
  color: #721c24;
`;

const BookingDetails = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Set the background gradient for the body
    document.body.style.background = 'linear-gradient(to right, #4e6af6, #3a5bd9)';

    // Cleanup function to reset the background when component unmounts
    return () => {
      document.body.style.background = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/rides/book', 
        { pickup, destination },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Ride booked:', response.data);
      setSuccessMessage('Ride booked successfully!');
      setErrorMessage('');
      setPickup('');
      setDestination('');
    } catch (error) {
      console.error('Error booking ride:', error);
      setErrorMessage('Failed to book ride. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <BookingContainer>
      <Title>Book Your Ride</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="pickup">Pickup Location</Label>
          <Input
            type="text"
            id="pickup"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
            placeholder="Enter pickup location"
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="destination">Destination</Label>
          <Input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            placeholder="Enter destination"
          />
        </InputGroup>
        <Button type="submit">Book Ride</Button>
      </Form>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </BookingContainer>
  );
};

export default BookingDetails;
