import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography } from '@mui/material';

function SingleTrain() {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    axios.get(`http://20.244.56.144/train/trains/${2344}`) 
      .then(response => setTrain(response.data))
      .catch(error => console.error(error));
  }, [trainId]);

  if (!train) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center"  >
        {train.name} Schedule
      </Typography>
      <Typography variant="subtitle1"  >
        Departure Time: {train.departureTime}
      </Typography>
      <Typography variant="subtitle1"  >
        Arrival Time: {train.arrivalTime}
      </Typography>
      <Typography variant="subtitle1"  >
        Delay: {train.delay} minutes
      </Typography>
      <Typography variant="subtitle1"  >
        Seat Availability: {train.seatAvailability}
      </Typography>
      <Typography variant="subtitle1"  >
        Train Class: {train.trainClass}
      </Typography>
    </Container>
  );
}

export default SingleTrain;
