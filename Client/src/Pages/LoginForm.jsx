import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import './LoginStyle.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      console.log(response.data.data);
      const data =response.data.data;
      localStorage.setItem('loggedInUser', JSON.stringify({ id: data.id, email:data.email, password:data.password,username:data.name }));

    } catch (error) {
      console.error('Login error:', error.response.data);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="backgroundLogin">
      <div className="shape first-shape"></div>
      <div className="shape second-shape"></div>
    
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="form-title">Login Here</h3>

        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" placeholder="Email or Phone" id="email" className="form-input" value={email} onChange={handleEmailChange} />

        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" placeholder="Password" id="password" className="form-input" value={password} onChange={handlePasswordChange} />

        <button type="submit" className="form-button">Log In</button>

        <div className="social">
          <div className="social-login google"> <GoogleIcon/> <div>Google</div></div>
          <div className="social-login facebook"> <FacebookIcon/> <div>Facebook</div></div>
        </div>
        <div className='Switch'>
          Don't have an account yet? <Link to={'/Register'}>Register</Link>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
