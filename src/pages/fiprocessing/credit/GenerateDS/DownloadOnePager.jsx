import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Card, FormControl, InputLabel, Select } from '@mui/material';
import Swal from 'sweetalert2';
import DownloadIcon from '@mui/icons-material/Download';

const DownloadOnePager = () => {
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
        Download One Pager
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={5} md={3}>
          <TextField variant="outlined" label="Fi Code" fullWidth />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <FormControl fullWidth>
            <InputLabel id="sub-menu-label">Creator</InputLabel>
            <Select label="Sub Menu" labelId="sub-menu-label" id="sub-menu-select"></Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={1.5}>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(135deg,rgb(8, 103, 20),rgb(2, 88, 8))',
              '& .MuiButton-startIcon': {
                fontSize: '20px'
              }
            }}
            fullWidth
            startIcon={<DownloadIcon />}
          >
            DOWNLOAD
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DownloadOnePager;
