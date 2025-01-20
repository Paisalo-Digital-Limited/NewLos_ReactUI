import React from 'react';
import './LandingPage.scss';
import LogoImage from '../../assets/logo.png';
import Login from './loginnnnn';
import LottieAnimation from './LottieAnimation';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="navbar">
        <img src={LogoImage} alt="Logo" className="logo" />
        {/* You can add additional navigation items here */}
        <div className="marquee">
          <div className="marquee-text">AB RUKNA NAHI... &nbsp; अब रुकना नहीं...</div>
        </div>
      </div>
      <div className="content-container">
        <div className="lottie-container">
          <LottieAnimation />
        </div>
        <div className="login-form">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
