'use client';
import React, { useState, useEffect, ReactNode } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Card,
  Tooltip,
  IconButton,
  Switch,
  Modal
} from '@mui/material';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import SendIcon from '@mui/icons-material/Send';
import AnimateButton from 'components/@extended/AnimateButton';

// Sample static data for menu
const staticRows = [
  { id: 1, mainid: 1, title: 'Home', icon: 'home', isActive: true, isDeleted: false },
  { id: 2, mainid: 2, title: 'Users', icon: 'people', isActive: true, isDeleted: false }
];

const tableCellStyle = {
  background: '#ff4c4c',
  padding: '10px 16px',
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
  textTransform: 'uppercase'
};

const MainPage = () => {
  const [rows, setRows] = useState(staticRows);
  const [pageName, setPageName] = useState('');
  const [mainMenuIcon, setMainMenuIcon] = useState('');
  const [mainMenuModalOpen, setMainMenuModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
          Main Menu
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField label="Page Name" variant="outlined" value={pageName} onChange={(e) => setPageName(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField label="Icon" variant="outlined" value={mainMenuIcon} onChange={(e) => setMainMenuIcon(e.target.value)} fullWidth />
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
      </Card>

      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyle}>S.No</TableCell>
              <TableCell sx={tableCellStyle}>Title</TableCell>
              <TableCell sx={tableCellStyle}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={row.mainid}>
                  <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.title}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Tooltip title="Edit" arrow>
                      <IconButton color="secondary" onClick={() => handleEdit(row)}>
                        <EditCalendarIcon sx={{ color: 'red' }} />
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
                <TableCell colSpan={5} align="center">
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

export default MainPage;
