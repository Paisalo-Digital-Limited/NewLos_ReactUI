'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Tooltip,
  IconButton,
  Card,
  Switch
} from '@mui/material';

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import SendIcon from '@mui/icons-material/Send';
import AnimateButton from 'components/@extended/AnimateButton';

const initialRows = [
  { id: 1, sNo: 1, menu: 'Dashboard', subMenu: 'Overview', pageName: 'Home', pageUrl: '/home', status: true },
  { id: 2, sNo: 2, menu: 'User Management', subMenu: 'User List', pageName: 'Users', pageUrl: '/users', status: true }
];

const tableHeaders = ['S.No', 'Menu', 'Sub Menu', 'Title', 'Page Url', 'Action'];

const AddMenuMaster = () => {
  const [rows] = useState(initialRows);

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
        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
          Page Master
        </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel id="menu-label">Menu</InputLabel>
              <Select label="Menu" labelId="menu-label" id="menu-select"></Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel id="sub-menu-label">Sub Menu</InputLabel>
              <Select label="Sub Menu" labelId="sub-menu-label" id="sub-menu-select"></Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3} md={2}>
            <TextField label="Page Name" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12} sm={3} md={2}>
            <TextField label="Page URL" variant="outlined" fullWidth />
          </Grid>

         <Grid item xs={12} sm={4} md={2}>
           
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
      </Card>

      <TableContainer component={Paper} sx={{ borderRadius: '5px' , marginTop:"20px"}}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    background: '#ff4c4c',
                    padding: '10px 16px',
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
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.menu}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.subMenu}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.pageName}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.pageUrl}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Tooltip title="Edit" arrow>
                      <IconButton sx={{ padding: '4px' }} onClick={() => editMenu(row)}>
                        <EditCalendarIcon sx={{ fontSize: '24px', color: 'red' }} />
                      </IconButton>
                    </Tooltip>
                    <Switch
                      // checked={role.isActive}
                      checked={true}
                      // onChange={() => handleToggleActive(role.id, role.isActive)}
                      onChange={() => handleToggleActive(role.id, true)}
                      color="success"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableHeaders.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AddMenuMaster;
