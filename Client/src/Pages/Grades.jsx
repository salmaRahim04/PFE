import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import BasicTable from './BasicTable';
import MenuAppBar from '../Components/Header';

export default function GradesPage() {
  const [fillieres, setFillieres] = useState([
    'IT',
    'Biology'
  ]);
  const [selectedFilliere, setSelectedFilliere] = useState('');
  const [classes, setClasses] = useState([
    'GI',
    'SIR'
  ]);
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    // Fetch fillières
    const fetchFillieres = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fillieres');
        setFillieres(response.data.fillieres);
      } catch (error) {
        console.error('Error fetching fillières:', error);
      }
    };

    fetchFillieres();
  }, []);

  const handleFilliereChange = async (event) => {
    const filliere = event.target.value;
    setSelectedFilliere(filliere);
    
    // Fetch classes for the selected fillière
    try {
      const response = await axios.get('http://localhost:5000/api/classes', {
        params: { filliere },
      });
      setClasses(response.data.classes);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleClassChange = (event) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
  };

  return (
    <div>
         <MenuAppBar/>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
     
      <style>
  {`
    body {
        margin:40px;

      background-color: #fff;
    }
    .table-container{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  `}
</style>
        <InputLabel id="filliere-label">Fillière</InputLabel>
        <Select
          labelId="filliere-label"
          id="filliere-select"
          value={selectedFilliere}
          onChange={handleFilliereChange}
          style={{width: '200px'}}
        >
          {fillieres.map((filliere) => (
            <MenuItem key={filliere} value={filliere}>{filliere}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="class-label">Class</InputLabel>
        <Select
          labelId="class-label"
          id="class-select"
          value={selectedClass}
          onChange={handleClassChange}
          disabled={!selectedFilliere}
          style={{width: '200px'}}
        >
          {classes.map((className) => (
            <MenuItem key={className} value={className}>{className}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedClass && (
        <BasicTable filliere={selectedFilliere} classe={selectedClass} />
      )}
    </div>
  );
}

