import React, { useState } from 'react';
import { Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

// icons
import { FormOutlined } from '@ant-design/icons';
import AnimateButton from 'components/@extended/AnimateButton';

const UpdateSanction = () => {
  const [Creator, setCreator] = useState('');
  const [FiCode, setFiCode] = useState('');
  const [Amount, setAmount] = useState('');
  const [SanctionedDate, setSanctionedDate] = useState('');
  const [StartDate, setStartDate] = useState('');

  // Static creator list
  const creatorList = [{ creator: 'John Doe' }, { creator: 'Jane Smith' }, { creator: 'Alice Johnson' }];

  return (
    <>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '7px',
          mb: '10px'
        }}
        className="rmui-card"
      >
        <Typography variant="h5" sx={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '20px' }}>
          Modify Sanction Amount
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={2} sm={6}>
            <FormControl fullWidth>
              <TextField select value={Creator} onChange={(e) => setCreator(e.target.value)} label="Creator" fullWidth>
                {creatorList.map((creatorItem, index) => (
                  <MenuItem key={index} value={creatorItem.creator}>
                    {creatorItem.creator}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          {/* FI Code */}
          <Grid item xs={12} md={2} sm={6}>
            <TextField fullWidth label="FI Code" variant="outlined" value={FiCode} onChange={(e) => setFiCode(e.target.value)} />
          </Grid>

          {/* Sanctioned Date */}
          <Grid item xs={12} md={2} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Sanctioned Date"
              InputLabelProps={{ shrink: true }}
              value={SanctionedDate}
              onChange={(e) => setSanctionedDate(e.target.value)}
            />
          </Grid>

          {/* Start Date */}
          <Grid item xs={12} md={2} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              value={StartDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>

          {/* Update Button */}
          <Grid item xs={12} sm={6} md={2}>
                    <AnimateButton>
                        <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                            fontWeight: 'bold',
                                bgcolor: 'red',
                                '&:hover': { bgcolor: 'red' } // Ensuring it stays green on hover
                            }}
                        fullWidth
                        startIcon={<FormOutlined  />} // Adding Submit Icon
                        >
                        UPDATE
                        </Button>
                        </AnimateButton>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default UpdateSanction;