import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Card,
  Paper,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { CheckBox as CheckBoxIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import AnimateButton from 'components/@extended/AnimateButton';
// Static Data
const roles = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Editor' },
  { id: 3, name: 'Viewer' },
];

const subMenus = [
  { id: 1, title: 'Dashboard' },
  { id: 2, title: 'Settings' },
  { id: 3, title: 'Profile' },
];

const Permission = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [userId, setUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedSubMenu, setSelectedSubMenu] = useState('');

  const handleSelectRow = (id) => {
    const newSelectedRows = selectedRows.includes(id) ? selectedRows.filter((rowId) => rowId !== id) : [...selectedRows, id];
    setSelectedRows(newSelectedRows);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    toast.info(`Role changed to ${event.target.value}`);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubMenuChange = (event) => {
    setSelectedSubMenu(event.target.value);
  };

  const handleSearch = () => {
    if (!userId || !selectedRole || !selectedSubMenu) {
      toast.error('Please select Role, User ID, and Sub Menu.');
    } else {
      toast.success('Search executed. Data filtered.');
    }
  };

  return (
    <>
      <ToastContainer />
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "10px",
        }}
        className="rmui-card"
      >
        <Typography variant="h5"  sx={{ marginBottom: "20px", fontWeight: "bold" }}>
          Role Permission
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select value={selectedRole} onChange={handleRoleChange} label="Role">
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>User ID</InputLabel>
              <Select value={userId} onChange={handleUserIdChange} label="User ID">
                {[
                  { id: 1, email: 'user1@example.com' },
                  { id: 2, email: 'user2@example.com' }
                ].map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sub Menu</InputLabel>
              <Select value={selectedSubMenu} onChange={handleSubMenuChange} label="Sub Menu">
                {subMenus.map((submenu) => (
                  <MenuItem key={submenu.id} value={submenu.id}>
                    {submenu.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3} md={3}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
        <AnimateButton>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSearch}
            fullWidth
            startIcon={<SearchIcon />} // Adding Search Icon
          >
            Search
          </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={6}>
        <AnimateButton>
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            sx={{
              fontWeight: 'bold',
              bgcolor: 'green',
              '&:hover': { bgcolor: 'primary.success' }
            }}
            fullWidth
            startIcon={<SendIcon />} // Adding Submit Icon
          >
           SUBMIT
          </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </Grid>

        </Grid>
      </Card>

        {/* <Grid container spacing={2} marginTop={5}>
          {subMenus.map((submenu) => (
            <Grid item xs={12} sm={6} md={4} key={submenu.id}>
              <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: '5px' , justifyContent:"space-between"}}>
              <Typography variant="body1">{submenu.title}</Typography>
                <Checkbox
                  checked={selectedRows.includes(submenu.id)}
                  onChange={() => handleSelectRow(submenu.id)}
                  color="success"
                />
                
              </Paper>
            </Grid>
          ))}
        </Grid> */}
    </>
  );
};

export default Permission;


// import React, { useState } from 'react';
// import { Grid, Typography, TextField, Button, Card, Paper, FormControl, InputLabel, Select, Table, TableCell, TableHead, TableRow, TableContainer, TableBody, FormGroup, FormControlLabel, Radio } from '@mui/material';

// const DeleteSmCode = () => {
//     const [fiCode, setFiCode] = useState('');
//     const [creator, setCreator] = useState('');
//     const [option, setOption] = useState('deleteCode'); // default option

//     const handleSearch = () => {
//         // Your search logic here
//         console.log('Search:', { fiCode, creator });
//     }

//     const handleUpdate = () => {
//         // Your update logic here
//         console.log('Update:', { fiCode, creator, option });
//     }

//     return (
//         <Card sx={{ boxShadow: 'none', borderRadius: '7px', mb: '10px' }} className="rmui-card">
//             <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
//                 Update Fi
//             </Typography>
//             <Grid sx={{ marginLeft: "5px", marginTop: "20px" }}>
//                 <FormGroup sx={{ display: "inline-block" }}>
//                     <FormControlLabel 
//                         control={<Radio checked={option === 'deleteCode'} onChange={() => setOption('deleteCode')} />} 
//                         label="Delete Sm Code" 
//                         sx={{ fontSize: "27px" }} 
//                     />
//                     <FormControlLabel 
//                         control={<Radio checked={option === 'sanction'} onChange={() => setOption('sanction')} />} 
//                         label="Sanction" 
//                         sx={{ fontSize: "27px" }} 
//                     />
//                 </FormGroup>
//             </Grid>

//             <Grid container spacing={2} mt={1}>
//                 <Grid item xs={12} sm={5} md={3}>
//                     <TextField
//                         variant="outlined"
//                         label="Fi Code"
//                         fullWidth
//                         value={fiCode}
//                         onChange={(e) => setFiCode(e.target.value)}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={5} md={3}>
//                     <FormControl fullWidth>
//                         <InputLabel id="sub-menu-label">Creator</InputLabel>
//                         <Select
//                             label="Sub Menu"
//                             labelId="sub-menu-label"
//                             id="sub-menu-select"
//                             value={creator}
//                             onChange={(e) => setCreator(e.target.value)}
//                         >
//                             {/* Add Menu Items here */}
//                         </Select>
//                     </FormControl>
//                 </Grid>

//                 {option === 'sanction' ? (
//                     <Grid item xs={12} md={1.5}>
//                         <Button
//                             type="button"
//                             variant="contained"
//                             size="medium"
//                             sx={{
//                                 bgcolor: 'linear-gradient(135deg, #2196F3, #64B5F6)'
//                             }}
//                             fullWidth
//                             onClick={handleSearch}
//                         >
//                             Search
//                         </Button>
//                     </Grid>
//                 ) : (
//                     <Grid item xs={12} md={3}>
//                         <Button
//                             type="button"
//                             variant="contained"
//                             size="medium"
//                             sx={{
//                                 background: 'linear-gradient(135deg, #E91E63, #F06292)'
//                             }}
//                             fullWidth
//                             onClick={handleUpdate}
//                         >
//                             Update
//                         </Button>
//                     </Grid>
//                 )}

//                 {option === 'sanction' ? (
//                     <TableContainer component={Paper} sx={{ marginTop: '25px', width: '100%' }}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell sx={{ background: 'linear-gradient(90deg,#ed1c24,#ed1c24)', padding: '10px 16px', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>SchemeCode</TableCell>
//                                     <TableCell sx={{ background: 'linear-gradient(90deg,#ed1c24,#ed1c24)', padding: '10px 16px', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Sanction Amount</TableCell>
//                                     <TableCell sx={{ background: 'linear-gradient(90deg,#ed1c24,#ed1c24)', padding: '10px 16px', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Finance Date</TableCell>
//                                     <TableCell sx={{ background: 'linear-gradient(90deg,#ed1c24,#ed1c24)', padding: '10px 16px', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>smCode</TableCell>
//                                     <TableCell sx={{ background: 'linear-gradient(90deg,#ed1c24,#ed1c24)', padding: '10px 16px', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Action</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {/* Map through your data here and render TableRow for each item */}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 ) : (
//                     ''
//                 )}
//             </Grid>
//         </Card>
//     );
// };

// export default DeleteSmCode;