import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import AnimateButton from 'components/@extended/AnimateButton';
import { getVehicleTypes, createVehicleType, updateVehicleType, toggleVehicleTypeStatus } from '../../../../api/apiVheicle';

const VehicleType = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [loading, setLoading] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [fetchError, setFetchError] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const tableCellStyle = {
    background: '#ff4c4c',
    padding: '10px 16px',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  };

  const validateInputs = () => {
    let isValid = true;
    setNameError('');
    setDescriptionError('');

    if (!name.trim()) {
      setNameError('Vehicle Name is required.');
      isValid = false;
    }
    if (!description.trim()) {
      setDescriptionError('Description is required.');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    try {
      const vehicleTypeData = { name: name.trim(), description: description.trim() };
      await createVehicleType(vehicleTypeData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Vehicle type created successfully.',
        confirmButtonText: 'OK',
      });
      setName('');
      setDescription('');
      fetchVehicleTypes();
    } catch (apiError) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: apiError.message || 'An error occurred while creating the vehicle type.',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicleTypes = async () => {
    setLoading(true);
    try {
      const data = await getVehicleTypes();
      if (data.statuscode === 200) {
        setVehicleTypes(data.data);
      } else {
        setFetchError(data.message || 'Failed to fetch vehicle types.');
      }
    } catch (error) {
      setFetchError(error.message || 'An error occurred while fetching vehicle types.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  const handleEdit = (rowData) => {
    setEditData(rowData);
    setName(rowData.name);
    setDescription(rowData.description);
    setEditDialogOpen(true);
  };

  const saveEdit = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      const updatedData = { id: editData.id, name: name.trim(), description: description.trim() };
      const response = await updateVehicleType(updatedData);

      if (response.statuscode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Vehicle type updated successfully.',
          confirmButtonText: 'OK',
        });
        setEditDialogOpen(false);
        fetchVehicleTypes();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.message || 'Failed to update the vehicle type.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'An error occurred while updating the vehicle type.',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (rowData) => {
    setLoading(true);
    try {
      const result = await toggleVehicleTypeStatus(rowData.id);
      if (result.statuscode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `Vehicle type has been ${!rowData.isActive ? 'activated' : 'deactivated'}.`,
          confirmButtonText: 'OK',
        });
        fetchVehicleTypes();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.message || 'Failed to update vehicle type status.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'An error occurred while updating vehicle type status.',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  const actionTemplate = (rowData) => {
    return (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent:'center' }}>
        <EditIcon
          onClick={() => handleEdit(rowData)}
          sx={{
            fontSize: '24px',
            color: '#1976d2',
            cursor: 'pointer',
            '&:hover': {
              color: '#115293',
            },
          }}
        />
        <Switch
          checked={rowData.isActive}
          onChange={() => toggleStatus(rowData)}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#4caf50',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#81c784',
            },
            '& .MuiSwitch-track': {
              backgroundColor: rowData.isActive ? '#81c784' : '#ef9a9a',
            },
          }}
        />
      </div>
    );
  };

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: '15px', fontWeight: 'bold', color: 'black' }}>
        Vehicle Master
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: '5px' }}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Vehicle Name"
            variant="outlined"
            fullWidth
            size="md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!nameError}
            helperText={nameError}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!descriptionError}
            helperText={descriptionError}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <AnimateButton>
          <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                fontWeight: 'bold',
                    bgcolor: 'green',
                    '&:hover': { bgcolor: 'green' } // Ensuring it stays green on hover
                  }}
              startIcon={<CheckBoxIcon />} // Adding Submit Icon
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
            </AnimateButton>
        </Grid>
      </Grid>
      {fetchError && <Typography color="error">{fetchError}</Typography>}
      <Box sx={{ marginTop: '10px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell  sx={tableCellStyle}>Sr. No.</TableCell>
                <TableCell  sx={tableCellStyle}>ID</TableCell>
                <TableCell  sx={tableCellStyle}>Vehicle Name</TableCell>
                <TableCell  sx={tableCellStyle}>Description</TableCell>
                <TableCell  sx={tableCellStyle}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? vehicleTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : vehicleTypes
              ).map((rowData, index) => (
                <TableRow key={rowData.id}>
                  <TableCell  sx={{ textAlign: 'center' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{rowData.id}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{rowData.name}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{rowData.description}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{actionTemplate(rowData)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={vehicleTypes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
         </TableContainer>
      </Box>
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Vehicle Type</DialogTitle>
        <DialogContent>
          <TextField
            label="Vehicle Name"
            variant="outlined"
            fullWidth
            size="medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="medium"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!descriptionError}
            helperText={descriptionError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={saveEdit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VehicleType;