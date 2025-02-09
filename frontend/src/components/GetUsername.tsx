import React, { useContext } from 'react';
import { AppContext } from '@/store/appContext';

const GetUsername: React.FC = () => {
const { state, actions } = useContext(AppContext);
  
  // Expose username on an API route
  React.useEffect(() => {
    const handleRequest = () => {
      fetch('/get_user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('User data:', data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    };

    handleRequest();
  }, [state.username]);

  return <div>{state.username}</div>;
};

export default GetUsername;

