'use client';
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Modal,
  Select,
  InputLabel,
  FormControl,
  Typography,
  TextField,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  MenuItem,
  FormHelperText,
  Paper,
  Card,
  Tooltip,
  IconButton,
  Switch,
  TablePagination
} from '@mui/material';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2';
import apiClient from 'network/apiClient';


const tableCellStyle = {
  background: '#ff4c4c',
  padding: '10px 16px',
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
  textTransform: 'uppercase'
};

const MainPage = () => {
  const [rows, setRows] = useState([]);
  const [pageName, setPageName] = useState('');
  const [mainMenuIcon, setMainMenuIcon] = useState('');
  const [edittitleName, setEditTitleName] = useState('');
  const [editedPageUrl, setEditedPageUrl] = useState('');
  const [editedMainId, setEditedMainId] = useState('');
  const [editParentId, setEditParentId] = useState('');
  const [menu, setMenu] = useState('');
  const [menuData, setMenuData] = useState([]);
  const [editedIcon, setEditedIcon] = useState('');

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set default rows per page
  const [MainMenuModalOpen, setMainMenuModalOpen] = useState(false);
  
  const [errors, setErrors] = useState({
    menu: "",
    subMenu: "",
    pageName: "",
    pageUrl: "",
  });

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await apiClient.get("/Menu/GetMainMenuDetails");
      if (response.data && response.data.statuscode === 200) {
        setRows(response.data.data); // Assuming response.data.data is your array of menu items
      } else {
        console.error("Failed to fetch menu data:", response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching menu data:", error);
      Swal.fire({
        title: 'Error',
        text: "Could not fetch menu data. Please try again.",
        icon: 'error',
        confirmButtonColor: 'red',
      });
    }
  };

  const handleSubmit = async () => {
    const payload = {
      Title: pageName,
      Icon: mainMenuIcon,
      ParentId: 0,
      subparentId: 0,
      PageName: null,
      PageUrl: null,
      IsActive: true,
      IsDeleted: false
    };

    try {
      const response = await apiClient.post('/Menu/InsertMenuData', payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.statuscode === 200) {
        const newRow = response.data.data;
        Swal.fire({
          title: 'Success',
          text: 'Added Successfully',
          icon: 'success',
          confirmButtonColor: 'green',
          confirmButtonText: 'OK!'
        });

        setRows(prevRows => [...prevRows, newRow]);
        setPageName('');
        setMainMenuIcon('');
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message || "Failed to add the menu item.",
          icon: 'error',
          confirmButtonColor: 'red',
        });
      }
    } catch (error) {
      console.error("Error inserting menu data:", error);
      Swal.fire({
        title: 'Error',
        text: "There was an error inserting the menu data. Please try again.",
        icon: 'error',
        confirmButtonColor: 'red',
      });
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  const ActiveSubMenu = async (event) => {
    if (!event || event.mainid === undefined) return;
    const objVM = {
      mainid: event.mainid,
      isActive: true,
      IsDeleted: false
    };
    mainSwitch(objVM);
  };

  const deleteMainMenu = async (event) => {
    if (!event || event.mainid === undefined) return;
    const objVM = {
      mainid: event.mainid,
      isActive: false,
      IsDeleted: true
    };
    mainSwitch(objVM);
  };

  const mainSwitch = async (objVM) => {
    try {
      const response = await apiClient.post('/Menu/DeleteMenuData', objVM, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.statuscode === 200) {
        Swal.fire({
          title: 'Success',
          text: objVM.isActive ? 'Menu item Deactivated successfully.' : 'Menu item Activated successfully.',
          icon: 'success',
          confirmButtonColor: 'green',
        });

        // Fetch updated menu data
        fetchMenuData();
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message || "Failed to delete the menu item.",
          icon: 'error',
          confirmButtonColor: 'red',
        });
      }
    } catch (error) {
      console.error("Error updating menu status:", error);
      Swal.fire({
        title: 'Error',
        text: "An error occurred while updating the menu status. Please try again.",
        icon: 'error',
        confirmButtonColor: 'red',
      });
    }
  };

  const UpdateMainMenu = async () => {
    const menuVM = {
      Title: edittitleName,
      PageUrl: editedPageUrl,
      mainid: editedMainId,
      type: 'mainMenu', // Update type if applicable
      ParentId: 0,
      subparentId: 0,
      PageName: null,
      Icon: editedIcon,
      IsActive: true,
      IsDeleted: false
    };

    try {
      const response = await apiClient.post('/Menu/UpdateMenuData', menuVM, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.statuscode === 200) {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Page Menu updated successfully!',
        });

        setPageName('');
        setMainMenuIcon('');
        setMainMenuModalOpen(false);
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: response.data.message || "Failed to update menu.",
        });
      }
    } catch (err) {
      console.error("Error updating menu:", err);
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updating the menu.',
      });
    }
  };

  const EditPageMenu = (item) => {
    if (item) {
      setEditedMainId(item.mainid);
      setEditTitleName(item.title);
      setEditedPageUrl(item.pageUrl);
      setMenu(item.title);
      setMainMenuModalOpen(true);
    }
  };

  const handleMenuChanges = (event) => {
    setMenu(event.target.value);
    const selectedItem = menuData.find(item => item.title === event.target.value);
    if (selectedItem) {
      EditPageMenu(selectedItem);
    }
  };

  // Calculate the current rows to display
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Card sx={{ boxShadow: 'none', borderRadius: '7px', mb: '10px' }} className="rmui-card">
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
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{ fontWeight: 'bold', bgcolor: 'green', '&:hover': { bgcolor: 'green' } }}
              fullWidth
              startIcon={<SendIcon />}
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Card>

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyle}>S.No</TableCell>
              <TableCell sx={tableCellStyle}>Title</TableCell>
              <TableCell sx={tableCellStyle}>Icon</TableCell>
              <TableCell sx={tableCellStyle}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, index) => (
                <TableRow key={row.mainid}>
                  <TableCell sx={{ textAlign: 'center' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.title}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: row.icon }}></TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Tooltip title="Edit" arrow>
                      <IconButton color="secondary" onClick={() => EditPageMenu(row)}>
                        <EditCalendarIcon sx={{ color: 'red' }} />
                      </IconButton>
                    </Tooltip>
                    {row.isDeleted === 0 && (
                      <>
                        <Switch
                          color="secondary"
                          onClick={() => ActiveSubMenu(row)}
                          checked={row.isActive === 1}
                          sx={{
                            '& .MuiSwitch-switchBase': {
                              '&.Mui-checked': {
                                '& .MuiSwitch-thumb': {
                                  background: "linear-gradient(135deg, #4CAF50, #8BC34A)",
                                },
                              },
                              '&:not(.Mui-checked) .MuiSwitch-thumb': {
                                background: 'red', // red color when inactive
                              },
                            },
                          }}
                        />
                      </>
                    )}
                    {row.isDeleted === 1 && (
                      <Switch
                        color="secondary"
                        onClick={() => deleteMainMenu(row)}
                        checked={row.isActive === 1}
                        sx={{
                          '& .MuiSwitch-switchBase': {
                            '&.Mui-checked': {
                              '& .MuiSwitch-thumb': {
                                background: "linear-gradient(135deg, #4CAF50, #8BC34A)",
                              },
                            },
                          },
                        }}
                      />
                    )}
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

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal for editing */}
      <Modal open={MainMenuModalOpen} onClose={() => setMainMenuModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            width: '50%',
            padding: '16px',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              marginBottom: '16px',
              textAlign: 'center',
              color: '#1976D2',
            }}
          >
            Update Sub Menu Details
          </Typography>

          <TextField
            label="Main ID"
            fullWidth
            disabled
            value={editedMainId || ''}
            onChange={(e) => setEditedMainId(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Title Name"
            fullWidth
            value={edittitleName || ''}
            onChange={(e) => setEditTitleName(e.target.value)}
            sx={{ mb: 2 }}
          />

             <TextField
                        label="Icon"
                        fullWidth
                        value={editedIcon || ''}
                        onChange={(e) => setEditedIcon(e.target.value)}
                        sx={{ mb: 2 }}
                    />

          <Box sx={{ textAlign: 'center', marginTop: '16px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={UpdateMainMenu}
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                padding: '8px 16px',
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setMainMenuModalOpen(false)}
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                padding: '8px 16px',
                marginLeft: '8px',
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default MainPage;
