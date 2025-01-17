'use client';

import React, { useEffect, useState, ReactNode } from 'react';
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
  Card,
  Tooltip,
  IconButton,
  FormHelperText,
  Switch,
  Modal,
  TablePagination
} from '@mui/material';

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import SendIcon from '@mui/icons-material/Send';
import AnimateButton from 'components/@extended/AnimateButton';

const SubMenu = () => {
  const [menu, setMenu] = useState('');
  const [pageName, setPageName] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [parentId, setParentId] = useState(null);
  const [mainMenuIcon, setMainMenuIcon] = useState('');
  const [menuListData, setMenuListData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedRow, setSelectedRow] = useState(null);

  const tableCellStyle = {
    background: '#ff4c4c',
    padding: '10px 16px',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  };

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
          Sub Menu
        </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth>
              <InputLabel id="menu-label">Menu</InputLabel>
              <Select label="Menu" labelId="menu-label" id="menu-select"></Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <TextField label="Page Name" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <TextField label="Icon" variant="outlined" fullWidth />
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

      <TableContainer component={Paper} sx={{marginTop:"20px"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyle}>S.No</TableCell>
              <TableCell sx={tableCellStyle}>Menu</TableCell>
              <TableCell sx={tableCellStyle}>Title</TableCell>
              <TableCell sx={tableCellStyle}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuListData.length > 0 ? (
              menuListData.map((item, index) => (
                <TableRow key={item.mainid}>
                  <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{item.menu || 'N/A'}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{item.title || 'N/A'}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleRowEdit(item)} color="primary">
                        <EditCalendarIcon />
                      </IconButton>
                    </Tooltip>
                    <Switch
                      checked={item.isActive}
                      onChange={() => {
                        /* Toggle active state logic */
                      }}
                      color="secondary"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
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

export default SubMenu;
