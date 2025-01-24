import React, { useEffect, useState } from 'react';
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
import apiClient from 'network/apiClient';
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';
const SubMenu = () => {
  const [rows, setRows] = useState([]);
  const [menu, setMenu] = useState('');
  const [pageName, setPageName] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [parentId, setParentId] = useState(null);
  const [mainMenuIcon, setMainMenuIcon] = useState('');
  const [menuListData, setMenuListData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [MainMenuModalopen, setMainMenuModalopen] = useState(false);
  const [editedmaiid, setmaiid] = useState('');
  const [edittitleName, setedittitleName] = useState('');
  const [editedIcon, setEditedIcon] = useState('');
  const [editeParentId, seteditParentId] = useState('');
  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set default rows per page

  const tableCellStyle = {
    background: '#ff4c4c',
    padding: '10px 16px',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  };

  useEffect(() => {
    fetchMenuData();
    fetchMenuDataForList();
  }, [pageNo, rowsPerPage]);

  const fetchMenuData = async () => {
    try {
      const response = await apiClient.get('/Menu/GetMainMenu');
      if (response.status === 200) {
        setMenuData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };
  const fetchMenuDataForList = async () => {
    try {
      const params = {
        pageSize: rowsPerPage,
        pageNumber: pageNo
      };
      debugger;
      const response = await apiClient.get('/Menu/GetMainMenuDetails');
      if (response.data && response.data.statuscode === 200) {
        // Make sure to handle totalCount logic correctly
        setMenuListData(response.data.data);
        //setTotalCount(response.data[0].totalCount);
        setTotalPages(Math.ceil(response.totalCount / rowsPerPage));
      } else {
        console.error('Failed to fetch menu data:', response.data.message || 'Unknown error');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Could not fetch menu data. Please try again.',
        icon: 'error',
        confirmButtonColor: 'red'
      });
    }
  };
  const handleMenuChange = (event) => {
    const selectedTitle = event.target.value;
    setMenu(selectedTitle);
    const selectedMenuItem = menuData.find((menuItem) => menuItem.title === selectedTitle);
    if (selectedMenuItem) {
      setParentId(selectedMenuItem.id);
    }
  };

  const [errors, setErrors] = React.useState({
    menu: '',
    pageName: ''
  });

  const handleSubmit = async () => {
    let validationErrors = {
      menu: menu ? '' : 'Menu is required',
      pageName: pageName ? '' : 'Page Name is required'
    };
    setErrors(validationErrors);

    // Check for validation errors
    if (!validationErrors.menu && !validationErrors.pageName) {
      const newRow = {
        id: filteredRows.length + 1,
        sNo: filteredRows.length + 1,
        menu,
        pageName
      };

      // TO DO: Add logic to create a new menu item
      // For now, just log the new row data to the console
      console.log(newRow);
    }
    // Create a menu item object
    const menuVM = {
      ParentId: parentId === null ? undefined : parentId,
      Title: pageName,
      Icon: mainMenuIcon,
      IsActive: true,
      IsDeleted: false
    };
    try {
      const response = await apiClient.post('/Menu/InsertMenuData', menuVM, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.statuscode === 200) {
        const newRow = response.data.data; // This should be the new menu item
        Swal.fire({
          title: 'Success',
          text: 'Added Successfully',
          icon: 'success',
          confirmButtonColor: 'green',
          confirmButtonText: 'OK!'
        });

        setRows((prevRows) => [...prevRows, newRow]); // Add the new item to the existing rows
        setPageName('');
        setMainMenuIcon('');
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message || 'Failed to add the menu item.',
          icon: 'error',
          confirmButtonColor: 'red'
        });
      }
    } catch (error) {
      console.error('Error inserting menu data:', error);
      Swal.fire({
        title: 'Error',
        text: 'There was an error inserting the menu data. Please try again.',
        icon: 'error',
        confirmButtonColor: 'red'
      });
    }
  };
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
    const deletedMainId = event.mainid;
    const objVM = {
      mainid: deletedMainId,
      isActive: true,
      IsDeleted: false
    };
    mainSwitch(objVM);
  };
  const deleteMainMenu = async (event) => {
    if (!event || event.mainid === undefined) return;
    const deletedMainId = event.mainid;
    const objVM = {
      mainid: deletedMainId,
      isActive: false,
      IsDeleted: true
    };
    mainSwitch(objVM);
  };
  const mainSwitch = async (objVM) => {
    try {
      const response = await apiClient.post('/Menu/DeleteMenuData', objVM, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.statuscode === 200) {
        if (objVM.isActive == true) {
          Swal.fire({
            title: 'Success',
            text: 'Menu item DeActive successfully.',
            icon: 'success',
            confirmButtonColor: 'red'
          });
        } else {
          Swal.fire({
            title: 'Success',
            text: 'Menu item Active successfully.',
            icon: 'success',
            confirmButtonColor: 'green'
          });
        }
        // Fetch updated menu data after deletion
        fetchMenuData();
        fetchMenuDataForList();
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message || 'Failed to delete the menu item.',
          icon: 'error',
          confirmButtonColor: 'red'
        });
        fetchMenuData();
        fetchMenuDataForList();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while deleting the menu item. Please try again.',
        icon: 'error',
        confirmButtonColor: 'red'
      });
      console.error('Error deleting menu data:', error);
    }
  };
  const handleMenuChanges = (event) => {
    debugger;
    const selectedMenu = event.target.value;
    setMenu(selectedMenu);
    const selectedItem = menuData.find((item) => item.title === selectedMenu);
    if (selectedItem) {
      EditSubMenu(selectedItem);
    }
  };
  const EditSubMenu = (item) => {
    if (item) {
      setSelectedRow(item);
      setmaiid(item.mainid);
      setedittitleName(item.title);
      setEditedIcon(item.icon);
      seteditParentId(item.parentId);
      setMenu(item.menu);
      setMainMenuModalopen(true);
    } else {
      console.warn('No item selected');
    }
  };
  const UpdateSubMenu = async () => {
    const menuVM = {
      Title: edittitleName,
      Icon: editedIcon,
      mainid: editedmaiid,
      type: 'submenu'
    };

    try {
      const response = await apiClient.post('/Menu/UpdateMenuData', menuVM, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.statuscode === 200) {
        // Use SweetAlert for success message
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Sub Menu updated successfully!'
        });
        fetchMenuData();
        fetchMenuDataForList();
        setMainMenuModalopen(false);
      } else {
        // Show an error message
        await Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: response.data.message || 'Failed to update menu.'
        });
      }
    } catch (err) {
      console.error('Error updating permission:', err);
      // Show an error alert using SweetAlert
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updating the menu.'
      });
    }
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
              <Select label="Menu" labelId="menu-label" id="menu-select" value={menu} onChange={handleMenuChange}>
                {menuData.map((menuItem) => (
                  <MenuItem key={menuItem.id} value={menuItem.title}>
                    {menuItem.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <TextField
              label="Page Name"
              variant="outlined"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              fullWidth
              error={!!errors.pageName}
              helperText={errors.pageName}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <TextField label="Icon" variant="outlined" value={mainMenuIcon} onChange={(e) => setMainMenuIcon(e.target.value)} fullWidth />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{
                fontWeight: 'bold',
                bgcolor: 'green',
                '&:hover': { bgcolor: 'green' }
              }}
              fullWidth
              startIcon={<SendIcon />}
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Card>

      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
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
                  <TableCell sx={{ textAlign: 'center' }}>{page * rowsPerPage + index + 1}</TableCell>
                  {/* <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell> */}
                  <TableCell sx={{ textAlign: 'center' }}>{item.titlename || 'N/A'}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{item.title || 'N/A'}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Tooltip title="Edit" arrow>
                      <IconButton color="secondary" onClick={() => EditSubMenu(item)}>
                        <EditCalendarIcon sx={{ color: 'red' }} />
                      </IconButton>
                    </Tooltip>
                    {item.isDeleted === 0 && (
                      <>
                        <Switch
                          color="secondary"
                          onClick={() => ActiveSubMenu(item)} // Handling deletion
                          checked={item.isActive === 1} // Switch checked if isActive is 1
                          //onChange={() => toggleStatus(row.mainid)} // Toggle active state
                          sx={{
                            '& .MuiSwitch-switchBase': {
                              '&.Mui-checked': {
                                '& .MuiSwitch-thumb': {
                                  background: 'linear-gradient(135deg, #4CAF50, #8BC34A)'
                                }
                              },
                              '&:not(.Mui-checked) .MuiSwitch-thumb': {
                                background: 'red' // red color when inactive
                              },
                              '&.Mui-checked + .MuiSwitch-track': {
                                border: '1px solid black'
                              },
                              '&:not(.Mui-checked) + .MuiSwitch-track': {
                                backgroundColor: 'red' // red color when inactive
                              }
                            },
                            '& .MuiSwitch-switchBase + .MuiSwitch-track': {
                              border: 'none'
                            }
                          }}
                        />
                        <span style={{ marginLeft: '10px' }}>{item.isActive === 1 ? '' : ''}</span>
                      </>
                    )}
                    {item.isDeleted === 1 && item.isActive === 0 && (
                      <span style={{ color: 'gray', marginLeft: '10px' }}>
                        <Switch
                          color="secondary"
                          onClick={() => deleteMainMenu(item)}
                          //checked={item.isDeleted === 1}
                          // onChange={() => toggleStatus(row.mainid)}
                          sx={{
                            '& .MuiSwitch-switchBase': {
                              '&.Mui-checked': {
                                '& .MuiSwitch-thumb': {
                                  background: 'linear-gradient(135deg, #4CAF50, #8BC34A)'
                                }
                              },
                              '&:not(.Mui-checked) .MuiSwitch-thumb': {
                                background: 'red' // red color when inactive
                              },
                              '&.Mui-checked + .MuiSwitch-track': {
                                border: '1px solid black'
                              },
                              '&:not(.Mui-checked) + .MuiSwitch-track': {
                                backgroundColor: 'red' // red color when inactive
                              }
                            },
                            '& .MuiSwitch-switchBase + .MuiSwitch-track': {
                              border: 'none'
                            }
                          }}
                        />
                        {item.isDeleted === 1 ? '' : ''}
                      </span>
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
          rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
          component="div"
          count={rows.length} // Total number of rows
          rowsPerPage={rowsPerPage} // Rows per page
          page={page} // Current page
          onPageChange={handleChangePage} // Handle page change
          onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
        />
      </TableContainer>

      <Modal open={MainMenuModalopen} onClose={() => setMainMenuModalopen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            width: { xs: '90%', sm: '80%', md: '50%' }, // Responsive width
            padding: '16px'
            // position: 'relative', // Set the position to relative for the close icon positioning
          }}
        >
          {/* Close Icon */}
          <CloseIcon
            sx={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              cursor: 'pointer',
              '&:hover': {
                color: '#d21919' // Optional: Change color on hover
              }
            }}
            onClick={() => setMainMenuModalopen(false)} // Close the modal when clicked
          />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              marginBottom: '16px',
              textAlign: 'left',
              color: '#d21919'
            }}
          >
            Update Sub Menu Details
          </Typography>

          <Grid container spacing={2} mb={2}>
            {/* Row 1: Two inputs */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.menu}>
                <InputLabel id="menu-label">Menu</InputLabel>
                <Select value={menu} onChange={handleMenuChanges} label="Menu" labelId="menu-label" id="menu-select">
                  {menuData.map((menuItem) => (
                    <MenuItem key={menuItem.id} value={menuItem.title}>
                      {menuItem.title}
                    </MenuItem>
                  ))}
                </Select>
                {errors.menu && <FormHelperText>{errors.menu}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} mb={2}>
              <TextField label="Main ID" fullWidth value={editedmaiid || ''} onChange={(e) => setmaiid(e.target.value)} />
            </Grid>

            {/* Row 2: Two inputs */}
            <Grid item xs={12} sm={6} mb={2}>
              <TextField label="Title Name" fullWidth value={edittitleName || ''} onChange={(e) => setedittitleName(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6} mb={2}>
              <TextField label="Icon" fullWidth value={editedIcon || ''} onChange={(e) => setEditedIcon(e.target.value)} />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', marginTop: '16px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={UpdateSubMenu}
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                padding: '8px 16px'
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SubMenu;
