import React from 'react';
import { useTheme } from '@mui/material/styles';
import logo from './logo.svg'; // Adjust the path as necessary

const Logo = () => {
  const theme = useTheme();

  return (
    
    <img src={logo} alt="Logo" width="100" style={{marginLeft:'1.5rem'}} />
  );
};

export default Logo;