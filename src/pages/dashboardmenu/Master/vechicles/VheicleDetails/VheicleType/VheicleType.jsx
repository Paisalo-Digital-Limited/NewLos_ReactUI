import React, { useState, useEffect } from 'react';
import { Typography, Grid, TextField, Button, Dialog, DialogActions,IconButton, DialogContent, DialogTitle, Box, Switch } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Swal from 'sweetalert2';
import { getVehicleTypes, createVehicleType, updateVehicleType, toggleVehicleTypeStatus } from 'api/apiVheicle';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import AnimateButton from 'components/@extended/AnimateButton';
import CloseIcon from "@mui/icons-material/Close";

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
  const [first] = useState(0);

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
        confirmButtonText: 'OK'
      });
      setName('');
      setDescription('');
      fetchVehicleTypes();
    } catch (apiError) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: apiError.message || 'An error occurred while creating the vehicle type.',
        confirmButtonText: 'OK'
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
        setVehicleTypes(data.data.map((item, index) => ({ id: index + 1, ...item })));
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
    // setName(rowData.name);
    // setDescription(rowData.description);
    setEditDialogOpen(true);
  };

  const saveEdit = async () => {
    if (!editData?.name.trim() || !editData?.description.trim()) {
      Swal.fire("Warning", "Both fields are required!", "warning");
      return;
    }

    setLoading(true);
    try {
      const response = await updateVehicleType({
        Id: editData.id,
        Name: editData.name,
        Description: editData.description,
      });
      if (response.statuscode === 200) {
        Swal.fire("Success", response.message, "success");
        fetchVehicleTypes();
        setEditDialogOpen(false);
      } else {
        Swal.fire("Error", response.message || "Failed to update fuel type.", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "An error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (rowData) => {
     const toggleTo = !rowData.isActive; // Determine the new state
     Swal.fire({
       title: 'Are you sure?',
       text: `Do you want to ${rowData.isActive ? 'deactivate' : 'activate'} this vehicle?`,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Yes',
       cancelButtonText: 'No'
     }).then(async (result) => {
       if (result.isConfirmed) {
         try {
           setLoading(true); // Start loading
           const response = await toggleVehicleTypeStatus(rowData.id); // Call the API
           if (response.statuscode === 200) {
             Swal.fire('Success', rowData.isActive ? 'Vehicle deactivated successfully!' : 'Vehicle activated successfully!', 'success');
 
             // Update local state to reflect the change
             setVehicleTypes((prevModels) => prevModels.map((model) => (model.id === rowData.id ? { ...model, isActive: toggleTo } : model)));
           } else {
             Swal.fire('Error', response.message || 'Failed to toggle status.', 'error');
           }
         } catch (error) {
           Swal.fire('Error', error.message || 'An error occurred.', 'error');
         } finally {
           setLoading(false); // Stop loading
         }
       }
     });
   };

  const actionTemplate = (rowData) => {
    return (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <EditCalendarIcon
          onClick={() => handleEdit(rowData)}
          sx={{
            fontSize: '24px',
            color: 'red',
            cursor: 'pointer',
            '&:hover': {
              color: '#115293'
            }
          }}
        />
        <Switch
          checked={rowData.isActive}
          onChange={() => toggleStatus(rowData)}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#4caf50'
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#81c784'
            },
            '& .MuiSwitch-track': {
              backgroundColor: rowData.isActive ? '#81c784' : '#ef9a9a'
            }
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
              startIcon={<SendIcon />} // Adding Submit Icon
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>

      {fetchError && <Typography color="error">{fetchError}</Typography>}
      <Box className="card" sx={{ marginTop: '10px' }}>
        <DataTable
          value={vehicleTypes}
          paginator
          paginatorPosition="bottom"
          paginatorTemplate="RowsPerPageDropdown CurrentPageReport PrevPageLink PageLinks NextPageLink"
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          responsiveLayout="scroll"
          loading={loading}
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          style={{ textAlign: 'left' }}
        >
          <Column
            header="Sr. No."
            body={(rowData, { rowIndex }) => first + rowIndex + 1}
            style={{ width: '100px' }}
            headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }} // Set header background to red
          />
          <Column
            field="id"
            header="ID"
            headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }} // Set header background to red
          />
          <Column
            field="name"
            header="Vehicle Name"
            headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }} // Set header background to red
          />
          <Column
            field="description"
            header="Description"
            headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }} // Set header background to red
          />
          <Column
            header="Actions"
            body={actionTemplate}
            headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }} // Set header background to red
          />
        </DataTable>
      </Box>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
        sx={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'black',
          padding: '14px 20px',
        }}>
        
        Edit Vehicle Type</DialogTitle>
        <IconButton  onClick={() => setEditDialogOpen(false)} style={{ position: 'absolute', top: '8px', right: '8px' }}>
          <CloseIcon sx={{ color: 'red' }} />
        </IconButton>
        <DialogContent>
          <TextField
            label="Vehicle Name"
            variant="outlined"
            fullWidth
            size="medium"
            value={editData?.name || ""}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, name: e.target.value }))
            }
         
            sx={{mb:2}}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="medium"
            value={editData?.description || ""}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, description: e.target.value }))
            }
           
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveEdit} variant="contained" sx={{marginRight:"10px", marginBottom:"10px"}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VehicleType;
