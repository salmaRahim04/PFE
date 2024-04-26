import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import './LoginStyle.css'; 
import { Link } from 'react-router-dom';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/register', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error registering user:', error); 
      });
  };

  return (
    <div className="backgroundLogin">
      <div className="shape first-shape"></div>
      <div className="shape second-shape"></div>
    
      <form className="login-form" style={{ height:'590px' }} onSubmit={handleSubmit}>
        <h3 className="form-title">Register Here</h3>

        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" placeholder="Username" id="username" className="form-input" onChange={handleChange} />
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" placeholder="Email" id="email" className="form-input" onChange={handleChange} />
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" placeholder="Password" id="password" className="form-input" onChange={handleChange} />
        
        <button type="submit" className="form-button">Register</button>

        <div className="social">
          <div className="social-login google"> <GoogleIcon/> <div>Google</div></div>
          <div className="social-login facebook"> <FacebookIcon/> <div>Facebook</div></div>
        </div>
        <div className='Switch'>
          Already had an account? <Link to={'/Login'}>Log In</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
