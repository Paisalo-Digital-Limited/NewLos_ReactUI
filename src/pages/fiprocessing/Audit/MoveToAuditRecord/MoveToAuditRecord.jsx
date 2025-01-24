import React from 'react';
import { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Card,
  TableFooter,
  TablePagination
} from '@mui/material';
import { CheckCircle, HourglassBottom } from '@mui/icons-material';
//import apiClient from '../../../network/apiClient';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
const MoveToAuditRecord = () => {
  const [status, setStatus] = React.useState('');
  const [fromDate, setFromDate] = React.useState('');
  const [toDate, setToDate] = React.useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleStatusChange = (event) => {
    debugger;
    setStatus(event.target.value);
  };

  const handleSearch = () => {
    fetchData();
    console.log('Searching with:', { status, fromDate, toDate });
  };
  const fetchData = async () => {
    debugger;
    //     setErrorsearch({ fiCode: '', creator: '',fromDate:'',toDate:'' });

    //   if (!fiCode && !creator) {
    //     setErrorsearch({
    //         fiCode: fiCode ? '' : 'FiCode is required.',
    //         creator: creator ? '' : 'Creator is required.',
    //     });
    //     return;
    //}

    //  if (!fromDate && !toDate) {
    //     setErrorsearch({
    //         fromDate: fromDate ? '' : 'fromDate is required.',
    //         toDate: toDate ? '' : 'toDate is required.',
    //     });
    //     return;
    // }
    debugger;
    //setLoading(true);
    try {
      const response = await axios.get(
        //`https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/GetFiPostSanctionDateWise`,
        `https://localhost:7030/api/FiPostSanction/GetPostSanctionMoveToAudit`,
        {
          params: {
            Status: status,
            pageSize: 5,
            pageNumber: 1,
            fromdate: fromDate,
            todate: toDate
          },
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            // Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.status === 200) {
        setData(response.data.data || []);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        boxShadow: 'none',
        borderRadius: '7px',
        mb: '10px',
        padding: '20px'
      }}
      className="rmui-card"
    >
      <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
        Post Sanction Move to Audit
      </Typography>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="select-status-label">Select Status</InputLabel>
            <Select labelId="select-status-label" value={status} onChange={handleStatusChange} label="Select Status">
              <MenuItem value="0">All</MenuItem>
              <MenuItem value="6">In Branch</MenuItem>
              <MenuItem value="7">In Audit</MenuItem>
              <MenuItem value="8">For NEFT</MenuItem>
              <MenuItem value="9">NEFT Done</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="From Date"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="To Date"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              fontWeight: 'bold',
              bgcolor: 'primary',
              marginLeft: '20px',
              '&:hover': { bgcolor: 'primary' } // Ensuring it stays green on hover
            }}
            fullWidth
            startIcon={<SearchIcon />}
            onClick={handleSearch}
          >
            Search
          </Button>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            fullWidth
            startIcon={<SearchIcon/>}
                  onClick={handleSearch}
          >
            Search
          </Button> */}
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ borderRadius: '4px', marginTop: '1rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              {['SmCode', 'FiCode', 'Creator', 'Branch Code', 'Group Code', '2nd Esign', 'Comments', 'Action'].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    background: '#ff4c4c',
                    color: 'white',
                    textAlign: 'center'
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((item, index) => (
              <TableRow key={index} hover>
                <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.smCode || 'download one pager'}</TableCell>
                <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.fiCode}</TableCell>
                <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.creator}</TableCell>
                <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.branch_code}</TableCell>
                <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.group_code}</TableCell>
                <TableCell
                  sx={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: item.borrSignStatus === 'Y' ? 'green' : 'red'
                  }}
                >
                  {item.borrSignStatus === 'Y' ? (
                    <CheckCircle sx={{ color: 'green', fontSize: '20px' }} />
                  ) : (
                    <HourglassBottom sx={{ color: 'red', fontSize: '20px' }} />
                  )}
                </TableCell>
                <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Card>
  );
};
export default MoveToAuditRecord;
