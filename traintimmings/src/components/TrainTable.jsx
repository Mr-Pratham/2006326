import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography} from '@mui/material';

function TrainTable() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get('http://20.244.56.144/train/trains')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error('Error fetching trains:', error);
        setTrains([]);
      });
  }, []);

  if (!Array.isArray(trains)) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center">
        All Trains Schedule
      </Typography>
    </Container>
  );
}

export default TrainTable;
