import React, { useState,useRef,useEffect } from 'react'
import logo from '../assets/Magic Book.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import emailjs from 'emailjs-com';
import 'react-calendar/dist/Calendar.css'; 
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import the CSS for styling
import moment from 'moment';
import './AdminPageStyling.css'
import EventForm from './EventForm';
import Lessons from './Lessons';
import { Link } from 'react-router-dom';
const localizer = momentLocalizer(moment);
const AdminPage = () => {
    const [teacherData,setTeacherData] = useState({
        username:'Salma Rahim',
        profile:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7c9ngFtPN1muATbCoYJ8MJAJS9CTV8PBAZw&usqp=CAU',
        email:'selmaa.rahim@gmail.com'
    })
   const time=new Date().getHours()
    const [events, setEvents] = useState([
        {
          id: 0,
          title: 'Meeting',
          startDate: new Date(2024, 2, 25, 10, 0),
          endDate: new Date(2024, 2, 25, 12, 0),
        },
      ]);
      useEffect(() => {
        const storedTeacherData = localStorage.getItem('loggedInUser');
        if (storedTeacherData) {
          const parsedTeacherData = JSON.parse(storedTeacherData);
          console.log(parsedTeacherData)
          setTeacherData(parsedTeacherData);
          setTeacherData(prevTeacherData => ({
            ...prevTeacherData,
            profile: 'https://qph.cf2.quoracdn.net/main-qimg-3c8d362550687b40929aaa8c1e737b41-pjlq'
          }));        }
        fetchEvents();
        const interval = setInterval(fetchEvents, 60000);
        return () => clearInterval(interval);
      }, []); 

      const fetchEvents = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/events');
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                const parsedEvents = data.events.map(event => ({
                    ...event,
                    startDate: new Date(event.startDate),
                    endDate: new Date(event.endDate)
                }));
                setEvents([...events, ...parsedEvents]);
                sendEmailsForEvents(data.events);

            } else {
                console.error('Failed to fetch events:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching events:', error.message);
        }
    };
    
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

   const onChange = (newDate) => {
    setDate(newDate);
  };
  const handleEventForm = () =>{
    setShow(!show)
 }
  const sendEmailsForEvents = (events) => {
    const currentTime = new Date();
    events.forEach(event => {
        const eventStartTime = new Date(event.startDate);
        const eventEndTime = new Date(event.endDate);
        if (currentTime >= eventStartTime && currentTime <= eventEndTime) {
            sendEmail(event);
        }
    });
};
const sendEmail = (event) => {
    emailjs.send(
        'service_77f2rzg',
        'template_trfucyo',
        {
            to_email: teacherData.email, 
            to_name: teacherData.name,
            from_name: 'EduPedia',
            message: `It's time for the event: ${event.title}`
        },
        'qh7LSXYlvnijkSC6C'
    )
    .then((response) => {
        console.log('Email sent:', response);
    })
    .catch((error) => {
        console.error('Failed to send email:', error);
    });
};
    const [Assignemets,setAssignemets] = useState([
         {
            title:'Programation C',
            isCompleted:true,
            score:80,
            date :'1 august 2023'
         },
         {
            title:'Algorithms',
            isCompleted:false,
            score:'',
            date :'1 august 2023'
         },
         {
            title:'UX designing',
            isCompleted:true,
            score:80,
            date :'1 august 2023'
         }
         
    ])
    const fileInputRef = useRef(null);
    const fileInputcsvRef = useRef(null);
    const [pdfLessons, setPDFLessons] = useState([]);
    const handleUploadPDF = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/upload-pdf', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setPDFLessons([...pdfLessons, { id: pdfLessons.length + 1, name: file.name }]);
                alert("New lesson is added")
            } else {
                console.error('Failed to upload PDF:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading PDF:', error);
        }
    };
    const handleStartCourseClick = () => {
        fileInputRef.current.click();
    };
    const handleImportGradeClick = () => {
        fileInputcsvRef.current.click();
    };
    const addEvent = (newEvent) => {
        setEvents([...events, newEvent]);
      };
      const handleCSVUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          const response = await fetch('http://127.0.0.1:5000/api/upload-csv', {
            method: 'POST',
            body: formData,
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data);
          } else {
            console.error('Failed to upload CSV:', response.statusText);
          }
        } catch (error) {
          console.error('Error uploading CSV:', error);
        }
      };
      

  return (
    <div className='adminComponent'>
   <div className='sideBar'>
    <div className='logoApp'>
        <img src={logo} alt="" />
        <h1 className='title'>EduPedia</h1>
    </div>
    <div className='profile'>
        <img src={teacherData.profile}  alt="profile" />
        <h2>{teacherData.username}</h2>
        <p className='email'>{teacherData.email}</p>
    </div>
    <div>
    <ul className="custom-list">
        <li>
            <DashboardIcon className="icon"/>
            Dashboard
        </li>
       <Link to="/Lessons">
       <li>
            <MenuBookIcon className="icon"/>
            Lessons
        </li>
        </Link>
        <Link to="/ChatPage">
        <li>
            <MessageIcon className="icon"/>
            Messages
        </li>
        </Link>
    </ul>
    </div>
    <div> 
    <div className='importlesson'>
            <input ref={fileInputRef} type="file"  onChange={handleUploadPDF} style={{ display: 'none' }} />
            <div className="start-course" onClick={handleStartCourseClick} >
                <AddCircleIcon />
                <h3>Start a New Course</h3>
            </div>
            <input ref={fileInputcsvRef} type="file" onChange={handleCSVUpload} style={{ display: 'none' }} />
            <div className="start-course" onClick={handleImportGradeClick}>
              <AddCircleIcon />
              <h3>  Import Grades</h3>
            </div>
            <div className="start-course" onClick={handleEventForm} >
                <AddCircleIcon />
                <h3>Add a New Event</h3>
            </div>
            {
                show&&<EventForm addEvent={addEvent} />
            }
          

        </div>
    </div>
  </div>
  <div className='body'>
     <div className='greetings'>
     {time < 12 ? (
          <h1>Good Morning, {teacherData.username}</h1>
        ) : (
          <h1>Good Evening, {teacherData.username}</h1>
        )}
        <div>
            <button>Start a new course</button>
        </div>
     </div>
     <div className='info'>
        <div className='item'>
            <span>500</span>
            <p>Hours spent</p>
        </div>
        <div className='item'>
            <span>21</span>
            <p>Completed lessons</p>
        </div>
        <div className='item'>
            <span>43</span>
            <p>Total students</p>
        </div>
     </div>
     <div className='AssignemetsContainer'>
        <h2>Assignemets</h2>
        <div className='items'>
            {
                Assignemets.map(assignemet =>{
                    return(
                        <div className='item' key={assignemet.title}>
                        <div>
                         <div style={{display:'flex',alignItems:'center'}}>
                            <AssignmentIcon className='AssignmentIcon'/> 
                            <div>
                            <h3> {assignemet.title}</h3>
                            <span style={{marginLeft:''}}>{assignemet.date}</span>
                            </div>
                            </div>
                        
                        </div>
                
                        {
                            assignemet.isCompleted ?
                            <div className='score'>
                            <p>{assignemet.score + '/100'}</p>
                            <span>Your Goals</span>
                            
                        </div>
                            
                            :null
                        }
                           <div className='Completed'>
                               <span>{assignemet.isCompleted ? 'Completed':'In progress'}</span>
                           </div>
                    </div>
                    )
                })
            }
        </div>
     </div>
     <div>
        
     </div>
  </div>
  <div className='schedules'>

       <Calendar
        localizer={localizer}
        events={events}
        startAccessor="startDate"
        endAccessor="endDate"
        style={{ height: 500 }}
      />
  </div>
    </div>
  )
}

export default AdminPage