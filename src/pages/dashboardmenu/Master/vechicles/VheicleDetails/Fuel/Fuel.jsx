import React, { useState, useEffect } from 'react';
import { Typography, Grid, TextField, Button, Box, Dialog,IconButton, DialogTitle, DialogContent, DialogActions, Switch } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Swal from 'sweetalert2';
import { createFuelType, getFuelTypeDetails, updateFuelType, deleteFuelType } from 'api/apiVheicle';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CloseIcon from "@mui/icons-material/Close";
import AnimateButton from 'components/@extended/AnimateButton';
import SendIcon from '@mui/icons-material/Send';

const FuelType = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFuelType, setEditFuelType] = useState(null);

  const fetchFuelTypes = async () => {
    setLoading(true);
    try {
      const response = await getFuelTypeDetails();
      if (response.statuscode === 200) {
        setFuelTypes(response.data);
      } else {
        Swal.fire('Error', response.message || 'Failed to fetch data.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message || 'An error occurred.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuelTypes();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim()) {
      Swal.fire('Warning', 'Both fields are required!', 'warning');
      return;
    }

    setLoading(true);

    try {
      const response = await createFuelType({ Name: name, Description: description });
      if (response.statuscode === 200) {
        Swal.fire('Success', response.message, 'success');
        fetchFuelTypes(); // Refresh the table data
        setName('');
        setDescription('');
      } else if (response.StatusCode === 203) {
        Swal.fire('Info', response.message, 'info');
      } else {
        Swal.fire('Error', response.message || 'Failed to create fuel type.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message || 'An error occurred.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (fuelType) => {
    setEditFuelType(fuelType);
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    if (!editFuelType?.name.trim() || !editFuelType?.description.trim()) {
      Swal.fire('Warning', 'Both fields are required!', 'warning');
      return;
    }

    setLoading(true);

    try {
      const response = await updateFuelType({
        Id: editFuelType.id,
        Name: editFuelType.name,
        Description: editFuelType.description
      });
      if (response.statuscode === 200) {
        Swal.fire('Success', response.message, 'success');
        fetchFuelTypes(); // Refresh the table data
        setEditDialogOpen(false);
      } else {
        Swal.fire('Error', response.message || 'Failed to update fuel type.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message || 'An error occurred.', 'error');
    } finally {
      setLoading(false);
    }
  };

 const toggleStatus = async (rowData) => {
     const toggleTo = !rowData.isActive; // Determine the new state
     Swal.fire({
       title: 'Are you sure?',
       text: `Do you want to ${rowData.isActive ? 'deactivate' : 'activate'} this fuel?`,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Yes',
       cancelButtonText: 'No'
     }).then(async (result) => {
       if (result.isConfirmed) {
         try {
           setLoading(true); // Start loading
           const response = await deleteFuelType(rowData.id); // Call the API
           if (response.statuscode === 200) {
             Swal.fire('Success', rowData.isActive ? 'Fuel deactivated successfully!' : 'Fuel activated successfully!', 'success');
 
             // Update local state to reflect the change
             setFuelTypes((prevModels) => prevModels.map((model) => (model.id === rowData.id ? { ...model, isActive: toggleTo } : model)));
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

  const actionTemplate = (rowData) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <EditCalendarIcon
        onClick={() => handleEdit(rowData)}
        sx={{
          fontSize: '24px',
          color: 'red',
          cursor: 'pointer',
          '&:hover': { color: '#115293' }
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

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: '15px', fontWeight: 'bold', color: 'black' }}>
        Fuel Master
      </Typography>

      <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: '5px' }}>
        <Grid item xs={12} md={2} sm={3}>
          <TextField label="Fuel Name" variant="outlined" fullWidth size="medium" value={name} onChange={(e) => setName(e.target.value)} />
        </Grid>

        <Grid item xs={12} md={2} sm={4}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="medium"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={2} container alignItems="center">
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

      <Box className="card" sx={{ marginTop: '50px' }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            value={fuelTypes}
            paginator
            paginatorPosition="bottom"
            paginatorTemplate="RowsPerPageDropdown CurrentPageReport PrevPageLink PageLinks NextPageLink"
            rows={5}
            rowsPerPageOptions={[5, 10, 20]}
            responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            style={{ textAlign: 'left' }}
          >
            <Column
              header="Sr. No."
              body={(rowData, { rowIndex }) => rowIndex + 1}
              style={{ width: '100px' }}
              headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }}
            />
            <Column field="id" header="ID" headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }} />
            <Column field="name" header="Fuel Name" headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }} />
            <Column field="description" header="Description" headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }} />
            <Column header="Actions" body={actionTemplate} headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }} />
          </DataTable>
        )}
      </Box>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '16px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          },
        }}
      >
        <DialogTitle sx={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'black',
          padding: '14px 20px',
        }}>Edit Fuel Type</DialogTitle>
         <IconButton  onClick={() => setEditDialogOpen(false)} style={{ position: 'absolute', top: '8px', right: '8px' }}>
          <CloseIcon sx={{ color: 'red' }} />
        </IconButton>

        <DialogContent >
          <TextField
            label="Fuel Name"
            variant="outlined" 
            fullWidth
            size="medium"
            value={editFuelType?.name || ""}
            onChange={(e) =>
              setEditFuelType((prev) => ({ ...prev, name: e.target.value }))
            }
            sx={{ marginBottom: "15px", marginTop: '10px', }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="medium"
            value={editFuelType?.description || ""}
            onChange={(e) =>
              setEditFuelType((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleEditSave} variant="contained"
           color="primary"
           sx={{
            fontSize: '1rem',
            textTransform: 'none',
            marginBottom:"20px",
            marginRight:"10px"
          }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FuelType;
