import React, { useState,useRef} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GradingIcon from '@mui/icons-material/Grading';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import logo from '../assets/Magic Book.png'
import HelpIcon from '@mui/icons-material/Help';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import EventForm from './EventForm';
import { Box, Modal, TextField,Typography } from '@mui/material';
const StudentPage = () => {
    const fileInputRef = useRef(null);

    const handleStartCourseClick = () => {
        fileInputRef.current.click();
    };
    const [studentData,setstudentData] = useState({
        username:'Houda Lamrabet',
        profile:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Sz57ZIfSqeOur2pfJ6Q6OpeMrTgVGcfpfs1mdZKbtIeQqk-zWbfk-aCi-sEkImDsx7U&usqp=CAU',
        email:'Houda.lamrabet@gmail.com'
    })
  const [events, setEvents] = useState([
    { title: 'Cours de francais', start: '2024-04-02T10:00:00', end: '2024--04-02T12:00:00' },
    { title: 'Soft skillls', start: '2024-04-03T08:00:00', end: '2024--04-03T12:00:00' },
    { title: 'Programmation C', start: '2024-04-26T14:00:00', end: '2024-03-26T16:00:00' }
  ]);
  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };
  const [show, setShow] = useState(false);
  const handleEventForm = () =>{
    setShow(!show)
 }
  const handleDateClick = (arg) => {
    const title = prompt('Please enter event title:');
    if (title) {
      setEvents([...events, { title, start: arg.dateStr, end: arg.dateStr }]);
    }
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
 const [modalOpen, setModalOpen] = useState(false);
 const [message, setMessage] = useState('');

 const handleModalOpen = () => {
     setModalOpen(true);
 };

 const handleModalClose = () => {
     setModalOpen(false);
 };

 const sendMessage = () => {
     // Placeholder function to send the message to the teacher
     console.log('Message sent:', message);
     // You can implement your logic to send the message here
     setModalOpen(false); // Close the modal after sending the message
 };

  return (
   <div className='adminComponent' style={{backgroundColor:'#CCC'}}>
    <div className='sideBar'>
    <div className='logoApp'>
        <img src={logo} alt="" />
        <h1 className='title'>EduPedia</h1>
    </div>
    <div className='profile'>
        <img src={studentData.profile}  alt="profile" />
        <h2>{studentData.username}</h2>
        <p className='email'>{studentData.email}</p>
    </div>
    <div>
        <h2>Menu</h2>
    <ul className="custom-list">
       <li>
        <ChatBubbleIcon className="icon"/> Chat
       </li>
       <li>
       <EventNoteIcon className="icon"/> Events
       </li>
       <li>
       <GradingIcon className="icon"/>  Grades
       </li>
    </ul>
    </div>
    <div className='importlesson'>
            <div className="start-course" onClick={handleEventForm}>
                <AddCircleIcon />
                <h3>Add a New Event</h3>
            </div>
            <div className="start-course"  onClick={handleModalOpen}>
                <HelpIcon />
                <h3> Help from the teacher</h3>
            </div>
            <div className="start-course" >
                <FindInPageIcon />
                <h3>Look for your grades</h3>
            </div>
            <Button variant="contained"><LogoutIcon/>Logout</Button>
            {
                show&&<EventForm addEvent={addEvent} />
            }
          
        </div>
        </div>
   
    <div style={{ backgroundColor: '#fff',width:'100%',margin:'15px',padding:'20px',borderRadius:'14PX' }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
    </div>
    <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Contactez votre enseignant          
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Email de l'enseignant</Typography>
                    <TextField
          id="Email"
          label="Email"
          variant="outlined"
          required
          style={{width:'100%', margin:'20px 0'}}
        />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Message </Typography>
                    <TextField
          id="Message"
          label="Message"
          variant="outlined"
          required
          style={{width:'100%', margin:'20px 0'}}
        />
            <div style={{display:'flex',justifyContent:'flex-end'}}>
            <Button variant="outlined" onClick={handleModalClose}>Fermer</Button>
            <Button variant="contained" style={{marginLeft:'30px'}} onClick={handleModalClose}>Send</Button>

            </div>
                </Box>
            </Modal>
  
   </div>
  );
};

export default StudentPage;
