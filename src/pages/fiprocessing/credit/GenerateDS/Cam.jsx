import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Card, FormControl, InputLabel, Select } from '@mui/material';
import Swal from 'sweetalert2';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';

const Cam = () => {
  return (
    <Card
      sx={{
        boxShadow: 'none',
        borderRadius: '7px',
        mb: '10px'
      }}
      className="rmui-card"
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Cam Generation
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={5} md={3}>
          <FormControl fullWidth>
            <InputLabel id="sub-menu-label">Creator</InputLabel>
            <Select label="Sub Menu" labelId="sub-menu-label" id="sub-menu-select"></Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <FormControl fullWidth>
            <InputLabel id="sub-menu-label">Branch Code</InputLabel>
            <Select label="Sub Menu" labelId="sub-menu-label" id="sub-menu-select"></Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <FormControl fullWidth>
            <InputLabel id="sub-menu-label">Group Code</InputLabel>
            <Select label="Sub Menu" labelId="sub-menu-label" id="sub-menu-select"></Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={1.5}>
          <Button
            type="search"
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'linear-gradient(135deg, #2196F3, #64B5F6)',
              '& .MuiButton-startIcon': {
                fontSize: '20px'
              }
            }}
            fullWidth
            startIcon={<SearchIcon />}
          >
            SEARCH
          </Button>
        </Grid>
        <Grid item xs={12} md={1.5}>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(135deg,rgb(172, 93, 9),rgb(143, 92, 4))',
              '& .MuiButton-startIcon': {
                fontSize: '20px'
              }
            }}
            fullWidth
            startIcon={<DownloadIcon />}
          >
            EXPORT
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Cam;
