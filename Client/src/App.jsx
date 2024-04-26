import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import AdminPage from './Pages/AdminPage';
import LoginForm from './Pages/LoginForm';
import RegisterForm from './Pages/Register';
import ChatsPage from './Pages/messages';
import StudentPage from './Pages/StudentPage';
import Lessons from './Pages/Lessons';
import GradesPage from './Pages/Grades';
import StudentGradesDashboard from './Pages/StudentGradesDashboard';

function App() {

  return (
   <div>
      <Router>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/AddUser" element={<Login/>}/>
          <Route path="/AdminPage" element={<AdminPage/>}/>
          <Route path="/Login" element={<LoginForm/>}/>
          <Route path="/Register" element={<RegisterForm/>}/>
          <Route path="/ChatPage" element={<ChatsPage/>} username={'Salma'} user={'Salma'}/>
          <Route path="/StudentPage" element={<StudentPage/>}/>
          <Route path="/Lessons" element={<Lessons/>}/>
          <Route path="/Dashboard" element={<GradesPage/>}/>
          <Route path="/StudentGrades" element={<StudentGradesDashboard/>}/>
        </Routes>
      </Router>
   </div>
  )
}

export default App
