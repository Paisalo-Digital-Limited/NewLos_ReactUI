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
  Tooltip,
  IconButton,
  Card,
  FormHelperText,
  Switch,
  TablePagination,
  Modal
} from '@mui/material';

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import SendIcon from '@mui/icons-material/Send';
import apiClient from 'network/apiClient';
import Swal from 'sweetalert2';

const initialRows = [
  { id: 1, sNo: 1, menu: 'Dashboard', subMenu: 'Overview', pageName: 'Home', pageUrl: '/home', status: true },
  { id: 2, sNo: 2, menu: 'User Management', subMenu: 'User List', pageName: 'Users', pageUrl: '/users', status: true }
];

const tableHeaders = ['S.No', 'Menu', 'Sub Menu', 'Title', 'Page Url', 'Action'];

const AddMenuMaster = () => {
  const [rows, setRows] = useState(initialRows);
  const [menu, setMenu] = useState('');
  const [menuData, setMenuData] = useState([]);
  const [parentId, setParentId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [menuListData, setMenuListData] = useState([]);
  const [subparentId, setSubparentId] = useState('');
  const [pageName, setPageName] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [subMenuData, setSubMenuData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editedmaiid, setmaiid] = useState('');
  const [edittitleName, setedittitleName] = useState('');
  const [editedIcon, setEditedIcon] = useState('');
  const [editeParentId, seteditParentId] = useState('');
  const [MainMenuModalopen, setMainMenuModalopen] = useState(false);
  const [editedpageurl, setEditedpageurl] = useState('');

  const [errors, setErrors] = useState({
    menu: '',
    subMenu: '',
    pageName: '',
    pageUrl: ''
  });

  useEffect(() => {
    fetchMenuData();
    fetchMenuDataForList();
  }, []);

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
    const selectedMenuItem = menuData.find((item) => item.title === selectedTitle);

    if (selectedMenuItem) {
      setParentId(selectedMenuItem.id);
      // Set subparentId only if it matches parentId,
      // else keep the last selected subparentId to retain its value.
      if (menuListData.find((submenuItem) => submenuItem.id === subparentId && submenuItem.parentId === selectedMenuItem.id)) {
        // The selected submenu is still valid
        return;
      } else {
        // Reset subparentId if the selected menu doesn't contain the current submenu
        setSubparentId('');
      }
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let validationErrors = {
      menu: menu ? '' : 'Menu is required',
      subMenu: subparentId ? '' : 'Sub Menu is required',
      pageName: pageName ? '' : 'Page Name is required',
      pageUrl: pageUrl ? '' : 'Page URL is required'
    };
    setErrors(validationErrors);
    if (validationErrors.menu || validationErrors.pageName || validationErrors.pageUrl) {
      return;
    }

    const menuVM = {
      ParentId: parentId || undefined,
      Title: pageName,
      subparentId: subparentId,
      PageName: pageName,
      PageUrl: pageUrl,
      Icon: null,
      IsActive: true,
      IsDeleted: false
    };

    try {
      const response = await apiClient.post('/Menu/InsertMenuData', menuVM, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.statuscode === 200) {
        const newRow = response.data.data;
        Swal.fire({ title: 'Success', text: 'Added Successfully', icon: 'success' });
        setRows((prevRows) => [...prevRows, newRow]);
        resetForm();
      } else {
        Swal.fire({ title: 'Error', text: response.data.message || 'Failed to add item.', icon: 'error' });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error!', text: 'An error occurred while inserting menu data.' });
    }
  };

  const resetForm = () => {
    setMenu('');
    setSubparentId('');
    setPageName('');
    setPageUrl('');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      PageUrl: editedpageurl,
      mainid: editedmaiid,
      type: 'pagemenu',
      ParentId: parentId,
      SubMenuId: subparentId,
      PageName: pageName,
      Icon: null,
      IsActive: true,
      IsDeleted: false
    };

    try {
      const response = await apiClient.post('/Menu/UpdateMenuData', menuVM, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.data.statuscode === 200) {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Page Menu updated successfully!'
        });
        fetchMenuDataForList();
        setMainMenuModalopen(false);
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: response.data.message || 'Failed to update menu.'
        });
      }
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updating the menu.'
      });
    }
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
  return (
    <>
      <Card sx={{ boxShadow: 'none', borderRadius: '7px', mb: '10px' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
          Page Master
        </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth error={!!errors.menu}>
              <InputLabel id="menu-label">Menu</InputLabel>
              <Select value={menu} onChange={handleMenuChange} label="Menu" labelId="menu-label" id="menu-select">
                {menuData.map((menuItem) => (
                  <MenuItem key={menuItem.id} value={menuItem.title}>
                    {menuItem.title}
                  </MenuItem>
                ))}
              </Select>
              {errors.menu && <FormHelperText>{errors.menu}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth error={!!errors.subMenu}>
              <InputLabel id="sub-menu-label">Sub Menu</InputLabel>
              <Select
                value={subparentId}
                onChange={(e) => setSubparentId(e.target.value)}
                label="Sub Menu"
                labelId="sub-menu-label"
                id="sub-menu-select"
              >
                {/* Filter submenu items based on the selected menu */}
                {menuListData.length > 0 && menu ? (
                  menuListData
                    .filter((submenuItem) => submenuItem.parentId === parentId)
                    .map((submenuItem) => (
                      <MenuItem key={submenuItem.id} value={submenuItem.title}>
                        {submenuItem.title}
                      </MenuItem>
                    ))
                ) : (
                  <MenuItem disabled>No submenus available</MenuItem>
                )}
              </Select>
              {errors.subMenu && <FormHelperText>{errors.subMenu}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <TextField
              label="Page Name"
              variant="outlined"
              fullWidth
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              error={!!errors.pageName}
              helperText={errors.pageName}
            />
          </Grid>

          <Grid item xs={12} sm={3} md={2}>
            <TextField
              label="Page URL"
              variant="outlined"
              fullWidth
              value={pageUrl}
              onChange={(e) => setPageUrl(e.target.value)}
              error={!!errors.pageUrl}
              helperText={errors.pageUrl}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ fontWeight: 'bold', bgcolor: 'green', '&:hover': { bgcolor: 'green' } }}
              fullWidth
              startIcon={<SendIcon />}
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Card>

      <TableContainer component={Paper} sx={{ borderRadius: '5px', marginTop: '20px' }}>
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
            {menuListData.length > 0 ? (
              menuListData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{item.titlename}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{item.title}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{item.pageName}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{item.pageUrl}</TableCell>
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
                <TableCell colSpan={tableHeaders.length} align="center">
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
            width: '50%',
            padding: '16px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              marginBottom: '16px',
              textAlign: 'center',
              color: '#1976D2'
            }}
          >
            Update Page Menu Details
          </Typography>
          <Grid item xs={12} sm={3} md={2} mb={2}>
            <FormControl fullWidth error={!!errors.menu}>
              <InputLabel id="menu-label">Menu</InputLabel>
              <Select value={menu} onChange={handleMenuChange} label="Menu" labelId="menu-label" id="menu-select">
                {menuData.map((menuItem) => (
                  <MenuItem key={menuItem.id} value={menuItem.title}>
                    {menuItem.title}
                  </MenuItem>
                ))}
              </Select>
              {errors.menu && <FormHelperText>{errors.menu}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} mb={2}>
            <FormControl fullWidth error={!!errors.subMenu}>
              <InputLabel id="sub-menu-label">Sub Menu</InputLabel>
              <Select
                value={subparentId}
                onChange={(e) => {
                  const selectedMainId = e.target.value;
                  const selectedSubMenu = menuListData.find((submenuItem) => submenuItem.mainid === selectedMainId); // Find by mainid
                  if (selectedSubMenu) {
                    console.log('Selected Value:', selectedSubMenu.title);
                    console.log('Selected Main ID:', selectedSubMenu.mainid);
                    setSubparentId(selectedMainId);
                  }
                }}
                label="Sub Menu"
                labelId="sub-menu-label"
                id="sub-menu-select"
              >
                {menuListData.length > 0 && menu ? (
                  menuListData
                    .filter((submenuItem) => submenuItem.parentId === parentId)
                    .map((submenuItem) => (
                      <MenuItem key={submenuItem.mainid} value={submenuItem.mainid}>
                        {' '}
                        {/* Use mainid as value */}
                        {submenuItem.title}
                      </MenuItem>
                    ))
                ) : (
                  <MenuItem disabled>No submenus available</MenuItem>
                )}
              </Select>
              {errors.subMenu && <FormHelperText>{errors.subMenu}</FormHelperText>}
            </FormControl>
          </Grid>

          <TextField
            label="Title Name"
            fullWidth
            value={edittitleName || ''}
            onChange={(e) => setedittitleName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="PageUrl"
            fullWidth
            value={editedpageurl || ''}
            onChange={(e) => setEditedpageurl(e.target.value)}
            sx={{ mb: 2 }}
          />

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
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setMainMenuModalopen(false)}
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                padding: '8px 16px',
                marginLeft: '8px'
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

export default AddMenuMaster;
