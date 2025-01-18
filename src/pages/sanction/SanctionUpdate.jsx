import React, { useState } from 'react';
import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdate';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const SanctionUpdate = () => {
  const [creator, setCreator] = useState('');
  const [code, setCode] = useState('');
 

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
        {/* Form Header */}
        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
          Sanction Update
        </Typography>
        {/* First Row */}
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: '5px' }}>
          <Grid item xs={12} md={2} sm={4}>
            <FormControl fullWidth size="medium">
              <InputLabel id="ddlCreator">Creator</InputLabel>
              <Select
                id="ddlCreator"
                label="creator type "
                labelId="creator-label"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              >
                <MenuItem value="">--Select Creator--</MenuItem>
                {/* Add more options dynamically if needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} sm={4}>
            <TextField
              fullWidth
              label="Fi code"
              variant="outlined"
              size="medium"
              id="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <DatePicker
                  label="Disbursement Date"
                  // value={searchParams.fromDate}
                  // onChange={(newValue) => {
                  //     handleInputChange("fromDate", newValue);
                  //     setErrors((prev) => ({ ...prev, fromDate: "" })); // Clear error on change
                  // }}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        fullWidth
                        // error={!!errors.fromDate}
                        // helperText={errors.fromDate}
                      />
                    )
                  }}
                />
              </Box>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <DatePicker
                  label="Start Date"
                  // value={searchParams.fromDate}
                  // onChange={(newValue) => {
                  //     handleInputChange("fromDate", newValue);
                  //     setErrors((prev) => ({ ...prev, fromDate: "" })); // Clear error on change
                  // }}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        fullWidth
                        // error={!!errors.fromDate}
                        // helperText={errors.fromDate}
                      />
                    )
                  }}
                />
              </Box>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={2}>
          <Button
              variant="contained"
              size="medium"
              sx={{
                padding: '6px 18px',
                fontSize: '15px',
                background: 'linear-gradient(135deg, #E91E63, #F06292)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: 'linear-gradient(135deg,rgb(175, 57, 96),rgb(187, 65, 106) )',
                  boxShadow: '0px 8px 15px rgba(245, 213, 213, 0.4)',
                  transform: 'scale(1.05)'
                },
                // Base properties for the icon
                '& .MuiButton-startIcon': {
                  fontSize: '24px'
                }
              }}
              startIcon={<SecurityUpdateGoodIcon />}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};
export default SanctionUpdate;
