import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Chip, Card, FormControl, InputLabel, Select } from '@mui/material';

const DeleteEsign = () => {
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
        Delete Second ESign
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
            type="search"
            variant="contained"
            size="medium"
            sx={{
              bgcolor: 'linear-gradient(135deg, #2196F3, #64B5F6)'
            }}
            fullWidth
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={5} sm={1} md={1}>
        <Chip
          label="OR"
          sx={{
            fontWeight: 'bold',
            fontSize: '14px',
            background: 'none',
            borderBottom: '2px solid red',
            marginLeft: '25%',
            marginTop: '20px'
          }}
        />
      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={5} md={3} sx={{ marginTop: '30px' }}>
          <TextField variant="outlined" label="SM Code" fullWidth />
        </Grid>
        <Grid item xs={12} sm={5} md={1.5}>
          <Button
            variant="contained"
            size="medium"
            sx={{
              background: '#D22B2B',
              marginTop: '30px'
            }}
            fullWidth
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DeleteEsign;
