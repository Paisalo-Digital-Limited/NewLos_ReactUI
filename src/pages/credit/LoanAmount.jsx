import React, { useState } from 'react';
import { Card, Grid, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Button } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
// assets
import { FormOutlined } from '@ant-design/icons';
// icons
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import AnimateButton from 'components/@extended/AnimateButton';

const LoanAmount = () => {
  const [beforeLoanCreator, setBeforeLoanCreator] = useState('');
  const [afterSanctionCreator, setAfterSanctionCreator] = useState('');
  const [fiCode, setFiCode] = useState('');
  const [fiId, setFiId] = useState('');
  const [amount, setAmount] = useState('');
  const [showSanctionDetails, setShowSanctionDetails] = useState(false);

  // Static creator list
  const creatorList = [{ creator: 'John Doe' }, { creator: 'Jane Smith' }, { creator: 'Alice Johnson' }];

  // Static sanction amount data
  const staticSanctionData = {
    123: {
      sanctionedAmt: 25000
    },
    456: {
      sanctionedAmt: 15000
    }
  };

  return (
    <>
      {/* Card for modifying before loan amount */}
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '7px',
          mb: '10px'
        }}
        className="rmui-card"
      >
        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
          Modify Before Loan Amount
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: '5px' }}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="FI Code"
              value={fiCode}
              onChange={(e) => setFiCode(e.target.value)}
              variant="outlined"
              size="medium"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="before-loan-creator-label">Creator</InputLabel>
              <Select value={beforeLoanCreator} onChange={(e) => setBeforeLoanCreator(e.target.value)} label="Creator">
                {creatorList.map((creatorItem, index) => (
                  <MenuItem key={index} value={creatorItem.creator}>
                    {creatorItem.creator}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Sanction Amount"
              value={amount}
              variant="outlined"
              size="medium"
              disabled // disable because it is static
            />
          </Grid>

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
                startIcon={<FormOutlined />} // Adding Submit Icon
              >
                UPDATE
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </Card>

      {/* Card for modifying after sanction amount */}
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '7px',
          mb: '10px'
        }}
        className="rmui-card"
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '20px', marginTop: '30px' }}>
          Modify After Sanction Amount
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="after-loan-creator-label">Creator</InputLabel>
              <Select value={afterSanctionCreator} onChange={(e) => setAfterSanctionCreator(e.target.value)} label="Creator">
                {creatorList.map((creatorItem, index) => (
                  <MenuItem key={index} value={creatorItem.creator}>
                    {creatorItem.creator}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField fullWidth label="FI_Id" variant="outlined" size="medium" value={fiId} onChange={(e) => setFiId(e.target.value)} />
          </Grid>

          <Grid item xs={12} sm={8} md={2}>
            <Grid item>
              <AnimateButton>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: 'primary',
                    '&:hover': { bgcolor: 'primary' } // Ensuring it stays green on hover
                  }}
                  fullWidth
                  startIcon={<SearchIcon />} // Adding Submit Icon
                >
                  SERACH
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </Grid>

        {showSanctionDetails && (
          <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginTop: '20px' }}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                size="medium"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  padding: '10px 12px',
                  fontSize: '15px',
                  background: '#ff4c4c',
                  borderRadius: '8px'
                }}
                startIcon={<BrowserUpdatedIcon />}
                onClick={handleUpdate}
              >
                UPDATE
              </Button>
            </Grid>

            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  padding: '10px 12px',
                  fontSize: '15px',
                  background: 'linear-gradient(135deg, rgb(233, 30, 30), rgb(206, 22, 22))',
                  borderRadius: '8px'
                }}
                startIcon={<DeleteOutlineIcon />}
                onClick={handleDelete}
              >
                DELETE
              </Button>
            </Grid>
          </Grid>
        )}
      </Card>
    </>
  );
};

export default LoanAmount;
