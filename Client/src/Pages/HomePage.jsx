import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import logo from '../assets/Magic Book.png'
import '../App.css'
import { TextField } from "@mui/material";
const HomePage = () => {
  return (
    <div className="HomePage">
      <div className="header">
        <div className="logo">
        <img src={logo} alt="code"/>
        </div>
        <div className="menu-list">
          <ul>
            <li>Home</li>
            <li>contact</li>
            <li>Discover</li>
            <li>
              <Button variant="contained">
                Login
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <div className="content">
        <div>
           <h1>Welcome to EduPedia <br /> Platform!</h1>
            <div className="contentInput">
           <input type="text" placeholder="Search"/>
             <Button variant="contained">
                Search
              </Button>
           </div>
        </div>
        <div>
           <img src="https://media-public.canva.com/eEkwI/MAEiwVeEkwI/1/s.png" alt="" />   
         </div>
      </div>
    </div>
  );
};

export default HomePage;
