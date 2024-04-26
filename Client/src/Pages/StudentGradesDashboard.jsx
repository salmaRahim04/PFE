import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import MenuAppBar from '../Components/Header';

const StudentGradesDashboard = () => {
  const grades = [
    { id: 1, className: 'Mathematics', Note: '16', passed: true },
    { id: 2, className: 'Science', Note: '17', passed: true },
    { id: 3, className: 'History', Note: '10', passed: false },
    { id: 4, className: 'English', Note: '10', passed: false },
  ];

  const [selectedGrade, setSelectedGrade] = React.useState(null);

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
  };

  const handleCloseModal = () => {
    setSelectedGrade(null);
  };

  return (
    <div className="grades-container">
          <MenuAppBar/>
      <style>
        {`
          body {
            margin: 40px;
            background-color: #f2f2f2;
            font-family: Arial, sans-serif;
          }
          
          h2 {
            margin-bottom: 20px;
            color: #333;
          }
          .table-container {
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            margin-Top:60px
          }
          .table {
            width: 100%;
            border-collapse: collapse;
          }
          .table th, .table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          .table th {
            background-color: #f5f5f5;
            color: #333;
          }
          .table td {
            background-color: #fff;
          }
          .modal {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .modal-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;
            outline: none;
          }
          .pdf-viewer {
            width: 100%;
            max-width: 800px;
            height: 600px;
            border: 1px solid #ddd;
          }
          .action-button {
            display: flex;
            align-items: center;
            justify-content:center;
            border-radius:10px;
            background-color:#2f5f19;
            width:200px;
            color:#fff;
            padding:5px 0;

          }
          .action-icon {
            margin-right: 5px;
          }
        `}
      </style>
      <h2>Student Houda Lamrabet Grades</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{fontSize:'20px',fontWeight:'bold'}}>Class</TableCell>
              <TableCell style={{fontSize:'20px',fontWeight:'bold'}}>Grade</TableCell>
              <TableCell style={{fontSize:'20px',fontWeight:'bold'}}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.map(grade => (
              <TableRow key={grade.id} onClick={() => handleGradeClick(grade)}>
                <TableCell>{grade.className}</TableCell>
                <TableCell>{grade.Note}</TableCell>
                <TableCell>
                  {grade.passed ? <CheckIcon className="grade-icon" /> : <ClearIcon className="grade-icon" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={selectedGrade !== null}
        onClose={handleCloseModal}
        className="modal"
      >
        <div className="modal-content">
          {selectedGrade && (
            <div>
              <h3>Class: {selectedGrade.className}</h3>
              <p>Grade: {selectedGrade.Note}</p>
              {selectedGrade.passed ? (
                <p>Status: Passed</p>
              ) : (
                <p>Status: Failed</p>
              )}
              <Button onClick={handleCloseModal}>Close</Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default StudentGradesDashboard;
