import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function BasicTable({ teacher, classe, filiere }) {
    const [grades, setGrades] = useState([
        {
          "Last name": "Alfalfa",
          "First name": "Aloysius",
          "SSN": "123-45-6789",
          "Test1": 40.0,
          "Test2": 90.0,
          "Test3": 100.0,
          "Test4": 83.0,
          "Final": 49.0,
          "Grade": "D-"
        },
        {
          "Last name": "Alfred",
          "First name": "University",
          "SSN": "123-12-1234",
          "Test1": 41.0,
          "Test2": 97.0,
          "Test3": 96.0,
          "Test4": 97.0,
          "Final": 48.0,
          "Grade": "D+"
        },
        {
          "Last name": "Gerty",
          "First name": "Gramma",
          "SSN": "567-89-0123",
          "Test1": 41.0,
          "Test2": 80.0,
          "Test3": 60.0,
          "Test4": 40.0,
          "Final": 44.0,
          "Grade": "C"
        },
      ]);
      

  useEffect(() => {
    // Fetch grades data based on selected teacher, class, or filière
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/grades', {
          params: { teacher, classe, filiere },
        });
        setGrades(response.data.grades);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    //fetchData();
  }, [teacher, classe, filiere]);

  return (
    <TableContainer component={Paper}  style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',marginTop:'40px' }}>
        <style>
  {`
    body {
        margin:40px;
      
      background-color: #fff;
    }
    .table-container{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .table-container {
        margin-top: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
      }
    .table-row:nth-child(even) {
        background-color: #f9f9f9;
      }

    .table-header-cell {
        font-weight: bold;
        background-color: #2f5f19;
        color:#fff;
        font-size:15px
      }
    .table-row:hover {
        background-color: #f5f5f5;
      }
  `}
</style>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="table-row">
            <TableCell className="table-header-cell">Last Name</TableCell>
            <TableCell align="right" className="table-header-cell">First Name</TableCell>
            <TableCell align="right" className="table-header-cell">Test 1</TableCell>
            <TableCell align="right" className="table-header-cell">Test 2</TableCell>
            <TableCell align="right" className="table-header-cell">Test 3</TableCell>
            <TableCell align="right" className="table-header-cell">Test 4</TableCell>
            <TableCell align="right" className="table-header-cell">Final</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {grades.map((grade) => (
            <TableRow key={grade.id}>
              <TableCell component="th" scope="row" className="table-cell">
                {grade['Last name']}
              </TableCell>
              <TableCell align="right" className="table-cell">{grade['First name']}</TableCell>
              <TableCell align="right" className="table-cell">{grade.Test1}</TableCell>
              <TableCell align="right" className="table-cell">{grade.Test2}</TableCell>
              <TableCell align="right" className="table-cell">{grade.Test3}</TableCell>
              <TableCell align="right" className="table-cell">{grade.Test4}</TableCell>
              <TableCell align="right" className="table-cell">{grade.Final}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
