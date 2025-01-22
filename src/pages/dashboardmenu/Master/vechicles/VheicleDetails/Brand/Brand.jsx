import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  IconButton
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Swal from 'sweetalert2';
import { createBrand, getBrandDetails, updateBrand, deleteBrand } from 'api/apiVheicle';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import SendIcon from '@mui/icons-material/Send';
import AnimateButton from 'components/@extended/AnimateButton';
import CloseIcon from "@mui/icons-material/Close";

const BrandType = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editBrand, setEditBrand] = useState(null);

  const handleSubmit = async () => {
    let isValid = true;

    setNameError(false);
    setDescriptionError(false);

    if (!name.trim()) {
      setNameError(true);
      isValid = false;
    }
    if (!description.trim()) {
      setDescriptionError(true);
      isValid = false;
    }

    if (isValid) {
      setLoading(true);
      const brandData = { Name: name, Description: description };

      try {
        const response = await createBrand(brandData);
        if (response.statuscode === 200) {
          Swal.fire('Success', 'Brand created successfully!', 'success');
          fetchBrands();
          setName('');
          setDescription('');
        } else {
          Swal.fire('Error', response.message || 'Failed to create brand.', 'error');
        }
      } catch (error) {
        Swal.fire('Error', error.message || 'An error occurred.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await getBrandDetails();
      if (response.statuscode === 200) {
        setBrands(response.data);
      } else {
        Swal.fire('Error', response.message || 'Failed to fetch brand details.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message || 'An error occurred.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // const handleEditSave = async () => {
  //   if (!editBrand.name.trim() || !editBrand.description.trim()) {
  //     Swal.fire('Warning', 'Both fields are required.', 'warning');
  //     return;
  //   }

  //   try {
  //     const response = await updateBrand({
  //       Id: editBrand.id,
  //       Name: editBrand.name,
  //       Description: editBrand.description
  //     });

  //     if (response.statuscode === 200) {
  //       Swal.fire('Success', 'Brand updated successfully!', 'success');
  //       fetchBrands();
  //       setEditDialogOpen(false);
  //     } else {
  //       Swal.fire('Error', response.message || 'Failed to update brand.', 'error');
  //     }
  //   } catch (error) {
  //     Swal.fire('Error', error.message || 'An error occurred.', 'error');
  //   }
  // };

  const handleEditSave = async () => {
    if (!editBrand.name.trim() || !editBrand.description.trim()) {
      Swal.fire('Warning', 'Both fields are required.', 'warning');
      return;
    }

    const payload = {
      Id: editBrand.id,
      Name: editBrand.name,
      Description: editBrand.description
    };

    console.log('Payload sent to API:', payload);

    try {
      const response = await updateBrand(payload);

      if (response.statuscode === 200) {
        Swal.fire('Success', 'Brand updated successfully!', 'success');
        fetchBrands();
        setEditDialogOpen(false);
      } else {
        Swal.fire('Error', response.message || 'Failed to update brand.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message || 'An error occurred.', 'error');
    }
  };

  const handleEdit = (rowData) => {
    setEditBrand(rowData);
    setEditDialogOpen(true);
  };

  
  const toggleStatus = async (rowData) => {
      const toggleTo = !rowData.isActive; // Determine the new state
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to ${rowData.isActive ? 'deactivate' : 'activate'} this brand?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setLoading(true); // Start loading
            const response = await deleteBrand(rowData.id); // Call the API
            if (response.statuscode === 200) {
              Swal.fire('Success', rowData.isActive ? 'Brand deactivated successfully!' : 'Brand activated successfully!', 'success');
  
              // Update local state to reflect the change
              setBrands((prevModels) => prevModels.map((model) => (model.id === rowData.id ? { ...model, isActive: toggleTo } : model)));
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
        Brand Master
      </Typography>

      <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: '5px' }}>
        <Grid item xs={12} md={2} sm={3}>
          <TextField
            label="Brand Name"
            variant="outlined"
            fullWidth
            size="medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
            helperText={nameError && 'Brand Name is required'}
          />
        </Grid>

        <Grid item xs={12} md={2} sm={4}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="medium"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={descriptionError}
            helperText={descriptionError && 'Description is required'}
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

      <Box className="card" sx={{ marginTop: '50px' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <DataTable
            value={brands}
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
            <Column field="name" header="Brand Name" headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }} />
            <Column field="description" header="Description" headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }} />
            <Column header="Actions" body={actionTemplate} headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }} />
          </DataTable>
        )}
      </Box>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '16px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
          }
        }}
      >
        <DialogTitle
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'Black',
            padding: '16px 24px',
          }}
        >
          {' '}
          Edit Brand
        </DialogTitle>
        <IconButton    onClick={() => setEditDialogOpen(false)} style={{ position: 'absolute', top: '8px', right: '8px' }}>
          <CloseIcon sx={{ color: 'red' }} />
        </IconButton>
        <Grid sx={{padding:"20px"}}>

          <TextField
            label="Brand Name"
            variant="outlined"
            fullWidth
            size="medium"
            value={editBrand?.name || ''}
            onChange={(e) => setEditBrand((prev) => ({ ...prev, name: e.target.value }))}
           sx={{marginBottom:"20px"}}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="medium"
            value={editBrand?.description || ''}
            onChange={(e) => setEditBrand((prev) => ({ ...prev, description: e.target.value }))}
          />
          </Grid>
        <DialogActions>
          <Button
            onClick={handleEditSave}
            variant="contained"
            color='primary'
            sx={{
              fontSize: '1rem',
              textTransform: 'none',
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BrandType;
