import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'; 

function EventForm({ addEvent }) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      startDate,
      endDate,
    };

    try {
      const userId = JSON.parse(localStorage.getItem('loggedInUser')).id;
      const response = await axios.post('http://localhost:5000/api/events',{
        ...newEvent,
        userId: userId
      });
      if (response.status === 201) {
        addEvent(newEvent);
        setTitle('');
        setStartDate('');
        setEndDate('');
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="eventFormContainer">
      <h4>Add an Event</h4>
      <form onSubmit={handleSubmit}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <TextField
          id="start"
          type="datetime-local"
          variant="outlined"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <br />
        <TextField
          id="end"
          type="datetime-local"
          variant="outlined"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <br />
        <Button variant="contained" type="submit" color="primary">
          Add Event
        </Button>
      </form>
    </div>
  );
}

export default EventForm;
