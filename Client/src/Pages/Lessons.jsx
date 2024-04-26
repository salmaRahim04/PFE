import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal } from '@mui/material';
import MenuAppBar from '../Components/Header';
import { Visibility as VisibilityIcon } from '@mui/icons-material';

const Lessons = () => {
  const [pdfLessons, setPDFLessons] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);

  useEffect(() => {
    fetchPDFLessons();
  }, []);

  const fetchPDFLessons = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/get-pdf-lessons');
      setPDFLessons(response.data.pdfLessons);
    } catch (error) {
      console.error('Error fetching PDF lessons:', error.message);
    }
  };

  const handlePDFClick = (pdf) => {
    setSelectedPDF(pdf);
  };

  const handleCloseModal = () => {
    setSelectedPDF(null);
  };

  return (
    <div className="lessons-container">
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
      <h2>PDF Lessons List</h2>
      <TableContainer component={Paper} className="table-container">
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontSize:'20px',fontWeight:'bold'}}>Name</TableCell>
              <TableCell style={{fontSize:'20px',fontWeight:'bold'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pdfLessons.map(pdf => (
              <TableRow key={pdf.id}>
                <TableCell>{pdf.name}</TableCell>
                <TableCell>
                  <div className="action-button">
                    <VisibilityIcon className="action-icon" />
                    <Button onClick={() => handlePDFClick(pdf)} style={{color:'#fff'}}>View Content</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={selectedPDF !== null}
        onClose={handleCloseModal}
        className="modal"
      >
        <div className="modal-content">
          {selectedPDF && (
            <embed className="pdf-viewer" src={`data:application/pdf;base64,${selectedPDF.content}`} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Lessons;
