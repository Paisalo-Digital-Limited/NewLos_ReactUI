import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import AnimateButton from 'components/@extended/AnimateButton';

const UpdateScheme = () => {
  const [creator, setCreator] = useState('');
  const [fiCode, setCode] = useState('');
  const [tableData, setTableData] = useState([]);

  // Static creator list
  const creatorList = [{ creator: 'John Doe' }, { creator: 'Jane Smith' }, { creator: 'Alice Johnson' }];

  // Static table data
  const staticTableData = [
    {
      fiCode: 'FI123',
      creator: 'John Doe',
      aadharId: '1234-5678-9101',
      p_Phone: 'XXXXX1234',
      permanentAddress: '123 Street, City',
      loanAmount: '$10,000',
      loanReason: 'Home Renovation',
      loanDuration: '5 years'
    },
    {
      fiCode: 'FI456',
      creator: 'Alice Johnson',
      aadharId: '9101-1121-3141',
      p_Phone: 'XXXXX5678',
      permanentAddress: '456 Avenue, City',
      loanAmount: '$20,000',
      loanReason: 'New Car',
      loanDuration: '3 years'
    }
  ];
  return (
    <>
      <Box
        sx={{
          borderRadius: '7px',
          mb: '10px'
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
          Update Scheme Code
        </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: '5px' }}>
          <Grid item xs={12} md={3} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="creator-label">Creator</InputLabel>
              <Select value={creator} onChange={(e) => setCreator(e.target.value)} label="Creator" fullWidth>
                {creatorList.map((creatorItem, index) => (
                  <MenuItem key={index} value={creatorItem.creator}>
                    {creatorItem.creator}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3} sm={4}>
            <TextField
              fullWidth
              label="Fi Code"
              variant="outlined"
              size="medium"
              id="Code"
              value={fiCode}
              onChange={(e) => setCode(e.target.value)}
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
                  bgcolor: 'green',
                  '&:hover': { bgcolor: 'green' } // Ensuring it stays green on hover
                }}
                fullWidth
                startIcon={<SendIcon />} // Adding Submit Icon
              >
                SUBMIT
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                textTransform: 'uppercase',
                background: '#ff4c4c',
                color: 'white',
                textAlign: 'center',
                fontSize: '10px'
              }}
            >
              <TableCell sx={{ color: 'white' }}>S.No</TableCell>
              <TableCell sx={{ color: 'white' }}>Code</TableCell>
              <TableCell sx={{ color: 'white' }}>Creator Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Aadhar ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Scheme Code</TableCell>
              <TableCell sx={{ color: 'white' }}>Address</TableCell>
              <TableCell sx={{ color: 'white' }}>Loan Amount</TableCell>
              <TableCell sx={{ color: 'white' }}>Loan Reason</TableCell>
              <TableCell sx={{ color: 'white' }}>Loan Duration</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.fiCode}</TableCell>
                  <TableCell>{row.creator}</TableCell>
                  <TableCell>{row.aadharId}</TableCell>
                  <TableCell>{row.p_Phone}</TableCell>
                  <TableCell>{row.permanentAddress}</TableCell>
                  <TableCell>{row.loanAmount}</TableCell>
                  <TableCell>{row.loanReason}</TableCell>
                  <TableCell>{row.loanDuration}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        background: '#64B5F6',
                        '&:hover': { background: '#2196F3' }
                      }}
                      // onClick={() => handleAction(row.fiCode)} // Un-comment and implement if needed
                    >
                      Action
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UpdateScheme;
