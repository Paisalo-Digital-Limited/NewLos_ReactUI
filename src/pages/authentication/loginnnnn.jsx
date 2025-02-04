import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './Login.css';
import apiClient from 'network/apiClient';
import LogoImage from '../../assets/paisalo-white-logo.png';
import Swal from 'sweetalert2';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const Root = styled.main`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorSignIn, setErrorSignIn] = useState({ email: '', password: '' });
  const [errorSignUp, setErrorSignUp] = useState({ email: '', password: '' });
  const [isSignUp, setIsSignUp] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorSignIn({ email: '', password: '' });

    if (!email || !password) {
      setErrorSignIn({
        email: email ? '' : 'Email is required.',
        password: password ? '' : 'Password is required.'
      });
      return;
    }

    if (!validateEmail(email)) {
      setErrorSignIn({ email: 'Invalid email format.', password: '' });
      return;
    }

    await login();
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    setErrorSignUp({ email: '', password: '' });

    if (!email || !password) {
      setErrorSignUp({
        email: email ? '' : 'Email is required.',
        password: password ? '' : 'Password is required.'
      });
      return;
    }

    if (!validateEmail(email)) {
      setErrorSignUp({ email: 'Invalid email format.', password: '' });
      return;
    }

    // Add signup logic here when ready
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!validateEmail(resetEmail)) {
      Swal.fire('Error', 'Invalid email format.', 'error');
      return;
    }

    try {
      // Make the API request
      const response = await apiClient.get(`https://apiuat.paisalo.in:4015/admin/api/User/ForGotPassword?Email=${resetEmail}`);

      // Check the response status code
      if (response.data.statuscode === 200) {
        setOtpValue(response.data.data.otp); // Store the OTP
        setShowOtpModal(true); // Open the OTP modal
        setShowResetModal(false); // Close the reset modal
      } else {
        Swal.fire('Error', 'Failed to reset password. Please try again.', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otpInput !== otpValue) {
      Swal.fire('Error', 'Invalid OTP. Please try again.', 'error');
      return;
    }

    setShowOtpModal(false); // Close the OTP modal
    setShowPasswordModal(true); // Open password modal
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      Swal.fire('Error', 'Please fill out all fields.', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire('Error', 'Passwords do not match.', 'error');
      return;
    }

    try {
      // Make the API request using apiClient with the necessary data
      const response = await apiClient.post('https://apiuat.paisalo.in:4015/admin/api/User/ChangePassword', {
          Password: newPassword,
          Email: resetEmail // Include the user's email in the request if required
      });

      // Check the response status code
      if (response.data.statuscode === 200) {
          Swal.fire('Success', response.data.message, 'success');
          setShowPasswordModal(false);  // Close password modal
          setResetEmail('');            // Clear reset email
          setNewPassword('');           // Clear new password input
          setConfirmPassword('');       // Clear confirm password input
      } else {
          Swal.fire('Error', 'Failed to change password. Please try again.', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
    }
  };

  return (
    <Root>
      <main className="main">
        <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
          {/* Sign Up Form */}
          <div className="form-container sign-up">
            <form onSubmit={handleSignUp}>
              <h1>Create Account</h1>
              <span>use your email for registration</span>
              <label>Email:</label>
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              {errorSignUp.email && <div className="error-message">{errorSignUp.email}</div>}
              <label>Password:</label>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              {errorSignUp.password && <div className="error-message">{errorSignUp.password}</div>}
              <button className="button">Sign Up</button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className="form-container sign-in">
            <form onSubmit={handleLogin}>
              <h1 className="Sign_in">Sign In</h1>
              <span> use your email password</span>
              <label>Email:</label>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errorSignIn.email && <div className="error-message">{errorSignIn.email}</div>}
              <label>Password:</label>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errorSignIn.password && <div className="error-message">{errorSignIn.password}</div>}
              <a className="forget" href="#" onClick={() => { 
                    setResetEmail(email); // Autofill the reset email with the current input email
                    setShowResetModal(true); 
                }}>
                    Forget Your Password?
                </a>
              <button className="button" type="submit">
                Sign In
              </button>
            </form>
          </div>

          {/* Toggle Container */}
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <img src={LogoImage} alt="Logo" className="logo" />
                <h1>अर्थ: समाजस्य न्यास:</h1>
                <p>WEALTH – WORLDLY THINGS – SOCIETY TRUST Thus, Wealth owned by Paisalo Digital Limited is Trust property of Society.</p>
                <button className="hidden" onClick={() => setIsSignUp(false)}>
                  Login for Employee
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <img src={LogoImage} alt="Logo" className="logo" />
                <h1>अर्थ: समाजस्य न्यास:</h1>
                <p>WEALTH – WORLDLY THINGS – SOCIETY TRUST Thus, Wealth owned by Paisalo Digital Limited is Trust property of Society.</p>
                <button className="hidden" onClick={() => setIsSignUp(true)}>
                  Login for Dealer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Password Modal */}
        <Dialog open={showResetModal} onClose={() => setShowResetModal(false)}>
            <DialogTitle style={{ color: 'red', fontWeight: 'bold' }}>Reset Password</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowResetModal(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleResetPassword} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>

        {/* OTP Modal */}
        <Dialog open={showOtpModal} onClose={() => setShowOtpModal(false)}>
            <DialogTitle style={{ color: 'red', fontWeight: 'bold' }}>Enter OTP</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="OTP"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowOtpModal(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleVerifyOtp} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>

        {/* New Password Modal */}
        <Dialog open={showPasswordModal} onClose={() => setShowPasswordModal(false)}>
            <DialogTitle style={{ color: 'red', fontWeight: 'bold' }}>Set New Password</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="New Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowPasswordModal(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handlePasswordSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
      </main>
    </Root>
  );

  async function login() {
    try {
      const response = await apiClient.post(
        'admin/api/User/GetToken',
        {
          emailId: email,
          password: password,
          errormsg: 'string',
          isValidate: true
        },
        { requireAuth: false, checkTokenInResponse: false }
      );

      if (response.data.statuscode === 200) {
        localStorage.setItem('authToken', response.data.data.tokenDetails.token);
        navigate('/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Please try again later.'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please try again later.'
      });
    }
  }
};

export default Login;