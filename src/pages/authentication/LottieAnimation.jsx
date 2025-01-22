import React from 'react';
import Lottie from 'lottie-react';
// import animationData from '../assets/relaxing.json'; // Import your animation JSON file
import animationData from '../../assets/relaxing.json';

const LottieAnimation = () => {
  return (
    <div className="lottie-animation">
      <Lottie animationData={animationData} />
    </div>
  );
};

export default LottieAnimation;
