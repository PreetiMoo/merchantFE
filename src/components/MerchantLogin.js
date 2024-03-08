import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from 'react-bootstrap';


const MerchantLogin = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    const apiUrl = 'http://localhost:8000/login/merchant/';
  
    axios.post(apiUrl, loginData)
      .then((response) => {
        if (response && response.data) {
          console.log('Merchant Login successful:', response.data);
          setSuccessMessage('Login successful');
  
          const { accessToken, refreshToken } = response.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          
          navigate("/");
  
          // Reload the page
          window.location.reload();
  
          // Add logic for successful login, such as redirecting to a dashboard or updating the UI
        } else {
          setErrorMessage('Invalid response format from the server');
        }
      })
      .catch((error) => {
        console.error('Error:', error.response?.data?.error || error.message);
        if (axios.isAxiosError(error)) {
          if (error.response) {
            const status = error.response.status;
            if (status === 401) {
              setErrorMessage('Invalid credentials. Please check your username and password.');
            } else {
              setErrorMessage(`Server returned an error: ${error.response.data.error}`);
            }
          } else if (error.request) {
            setErrorMessage('No response received from the server');
          } else {
            setErrorMessage(`Error setting up the request: ${error.message}`);
          }
        } else {
          setErrorMessage(`Non-Axios error occurred: ${error.message}`);
        }
      });
  };
  
  
  return (
    <div style={{ height: "88%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className='login-div' style={{ width: "45%",    backgroundColor: "#0b0b0a26", display: "flex", justifyContent: "space-around", alignItems: "center", borderRadius: "50px" }}>
      <h2 style={{flexGrow: "1"}}>Merchant Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleLogin} style={{flexGrow: "2", display: "flex", alignItems: "center", flexDirection: "column"}}>
        {/* Same JSX structure as UserLogin */}
        <label>
          Username:  
          <input
            type="text" name="username" value={loginData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:   
          <input
            type="password" name="password" value={loginData.password} onChange={handleChange} />
        </label>
        <br />
        {/* <button type="submit">Login</button> */}
        <button type="submit" >Login</button>
      </form>
      <div style = {{
    flexGrow: "1",
    textAlign: "center"
}}>
          <Nav className="me-auto">
            <span style={{ marginRight: "10px" }}>Don't have an account?</span>
            
              <Nav as={Link} to="/merchantRegister" style={{ marginRight: "10px" }}>
                Merchant Sign up
              </Nav>
            
          </Nav>
        </div>
    </div>
    </div>
    
  );
};

export default MerchantLogin;