import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RideHistory = () => {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRideHistory();
  }, []);

  const fetchRideHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/rides/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Ride history:', response.data);
      setRides(response.data);
    } catch (error) {
      console.error('Failed to fetch ride history:', error);
      setError('Failed to fetch ride history');
    }
  };

  // Inline styles with added margin-top
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '100px auto',  // Added margin-top here
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
      color: '#00a2ff',
      fontsize: '32px',
      marginbottom: '30px',
      textalign: 'center',
    },
    error: {
      color: 'red',
      textAlign: 'center',
    },
    rideList: {
      listStyleType: 'none',
      padding: 0,
    },
    rideItem: {
      backgroundColor: '#fff',
      margin: '10px 0',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      fontSize: '16px',
      color: '#333',
    },
    noRidesMessage: {
      textAlign: 'center',
      fontStyle: 'italic',
      color: '#777',
    },
  };
  useEffect(() => {
    // Set the background gradient for the body
    document.body.style.background = 'linear-gradient(to right, #4e6af6, #3a5bd9)';

    // Cleanup function to reset the background when component unmounts
    return () => {
      document.body.style.background = '';
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Ride History</h2>
      {error && <p style={styles.error}>{error}</p>}
      {rides.length === 0 ? (
        <p style={styles.noRidesMessage}>No rides found.</p>
      ) : (
        <ul style={styles.rideList}>
          {rides.map((ride) => (
            <li key={ride._id} style={styles.rideItem}>
              From: {ride.pickup}, To: {ride.destination}, Date: {new Date(ride.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RideHistory;
