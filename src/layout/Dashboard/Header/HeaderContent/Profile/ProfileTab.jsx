import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditOutlined from '@ant-design/icons/EditOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import Swal from 'sweetalert2';
import apiClient from 'network/apiClient';
import { useNavigate } from 'react-router-dom';
export default function ProfileTab({ handleLogout }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState(''); // Fixed variable name
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };
  const handleLogoutClick = () => {
    Swal.fire({
      title: 'Confirm Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        if (handleLogout) {
          handleLogout();
        }
        navigate('/');
      }
    });
  };
  const handleChangePasswordClick = () => {
    setOpenChangePasswordDialog(true);
  };
  const handleSubmitChangePassword = async () => {
    let valid = true;
    setPasswordError('');
    setConfirmPasswordError('');
    // Validate password fields
    if (newPassword === '') {
        setPasswordError('Password cannot be empty');
        valid = false;
    }
    if (confirmPassword === '') {
        setConfirmPasswordError('Confirm Password cannot be empty');
        valid = false;
    }
    if (newPassword !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        valid = false;
    }
    if (!valid) return; // Exit if validation failed
    try {
        // Make the API request using apiClient
        const response = await apiClient.post('https://apiuat.paisalo.in:4015/admin/api/User/ChangePassword', {
            Password: newPassword,
            OldPassword: oldPassword, // Include the old password in the request
        });
        // Check the response status code
        if (response.data.statuscode === 200) {
            Swal.fire('Success', response.data.message, 'success');
            handleCloseDialog();
        } else {
            Swal.fire('Error', 'Failed to change password. Please try again.', 'error');
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        Swal.fire('Error', 'An error occurred while changing the password', 'error');
    }
};
  const handleCloseDialog = () => {
    setOpenChangePasswordDialog(false);
    setNewPassword('');
    setOldPassword(''); // Reset the old password field on close
    setConfirmPassword('');
    setPasswordError('');
    setConfirmPasswordError('');
  };
  return (
    <>
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
        <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(0)}>
          <ListItemIcon>
            <EditOutlined />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(1)}>
          <ListItemIcon>
            <UserOutlined />
          </ListItemIcon>
          <ListItemText primary="View Profile" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 2} onClick={handleChangePasswordClick}>
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 3} onClick={handleLogoutClick}>
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
      <Dialog open={openChangePasswordDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ color: 'red', fontWeight: 'bold' }}>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Old Password"
            type="password"
            fullWidth
            variant="outlined"
            value={oldPassword} // Corrected capitalization
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={!!passwordError} // Highlight error state
            helperText={passwordError} // Show error message
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!confirmPasswordError} // Highlight error state
            helperText={confirmPasswordError} // Show error message
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitChangePassword} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
ProfileTab.propTypes = { handleLogout: PropTypes.func };