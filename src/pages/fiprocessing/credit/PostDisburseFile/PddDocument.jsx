import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  CircularProgress,
  Box,
  FormHelperText
} from '@mui/material';
import Switch from '@mui/material/Switch';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2';
import { fetchCreatorsApi } from 'api/apiCreator';

const PddDocument = () => {
  const [creators, setCreators] = useState([]);
  const [loadingCreators, setLoadingCreators] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState('');
  const [fiCode, setFiCode] = useState('');
  const [files, setFiles] = useState({
    imageWithVehicle: null,
    invoice: null,
    insurance: null,
    vehicleRc: null
  });
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoadingCreators(true);
      try {
        const creatorsList = await fetchCreatorsApi();
        setCreators(creatorsList);
      } catch (error) {
        console.error(error.message || 'Unknown error');
      } finally {
        setLoadingCreators(false);
      }
    };

    fetchCreators();
  }, []);

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fileType]: file || null
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fileType]: ''
    }));
  };

  const handleRemoveFile = (fileType) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fileType]: null
    }));
  };


  


  const handleSubmit = async () => {
    if (!fiCode || !selectedCreator) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fiCode: !fiCode ? 'Fi Code is required' : '',
        selectedCreator: !selectedCreator ? 'Creator is required' : ''
      }));
      return;
    }

    const formData = new FormData();
    formData.append("FiCode", fiCode);
    formData.append('Creator', selectedCreator);
    if (files.imageWithVehicle) formData.append('ImageWithVechile', files.imageWithVehicle);
    if (files.invoice) formData.append('Invoice', files.invoice);
    if (files.insurance) formData.append('Insuarance', files.insurance);
    if (files.vehicleRc) formData.append('VechileRc', files.vehicleRc);

    try {
      const response = await fetch('http://localhost:5238/api/Masters/UploadVehicleDocuments', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (result.statuscode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.message,
          confirmButtonText: 'OK',
          timer: 3000,
          timerProgressBar: true
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.message,
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while uploading files.',
        confirmButtonText: 'OK'
      });
    }
  };


  
  const isSearchEnabled = fiCode && selectedCreator;

  // Check if any file is uploaded
  const isFileUploaded = Object.values(files).some((file) => file !== null);

  // Search button functionality
  const handleSearch = async () => {
    if (!fiCode || !selectedCreator) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fiCode: !fiCode ? 'Fi Code is required' : '',
        selectedCreator: !selectedCreator ? 'Creator is required' : '',
      }));
      return;
    }
  
    try {
      setLoading(true); // Show loading spinner
      const response = await fetch(
        `http://localhost:5238/api/Masters/GetVehicleDocuments?FiCode=${fiCode}&Creator=${selectedCreator}`
      );
      const result = await response.json();
  
      if (result.statuscode === 200) {
        setTableData(result.data); // Set API response `data` to `tableData`
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.message,
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while fetching data.',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };


  const handleToggle = async (rowData) => {
    const updatedStatus = rowData.isActive === 1 ? 0 : 1;
  
    // Optimistic UI update
    setTableData((prev) =>
      prev.map((item) =>
        item.fi_Id === rowData.fi_Id
          ? {
              ...item,
              isActive: updatedStatus,
            }
          : item
      )
    );
  
    try {
      const response = await fetch(
        `http://localhost:5238/api/Masters/DeleteVehicleDocuments?Fi_Id=${rowData.fi_Id}`,
        {
          method: 'GET',
        }
      );
      const result = await response.json();
  
      if (result.statuscode === 200) {
        Swal.fire(
          'Success',
          `Document has been ${
            updatedStatus === 1 ? 'activated' : 'deactivated'
          } successfully.`,
          'success'
        );
  
        // Re-fetch updated data from the backend
        await handleSearch();
      } else {
        throw new Error(result.message || 'Failed to toggle document status.');
      }
    } catch (error) {
      // Rollback UI update if API fails
      setTableData((prev) =>
        prev.map((item) =>
          item.fi_Id === rowData.fi_Id
            ? {
                ...item,
                isActive: rowData.isActive,
              }
            : item
        )
      );
      Swal.fire('Error', error.message || 'An error occurred.', 'error');
    }
  };
  
  
  
  
  // Action column template
  const actionTemplate = (rowData) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      {/* Switch Button */}
      <Switch
        checked={rowData.isActive === 1} // Bind directly to isActive state
        onChange={() => handleToggle (rowData)} // Call toggle function
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#4caf50', // Green for active
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#81c784', // Green track for active
          },
          '& .MuiSwitch-track': {
            backgroundColor: rowData.isActive === 1 ? '#81c784' : '#ef9a9a', // Red for inactive
          },
        }}
      />
    </div>
  );
  


  return (
    <Box sx={{ margin: '0 auto' }}>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '7px',
          mb: 2,
          padding: { xs: '18px', sm: '20px', lg: '25px' }
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Upload Vehicle Documents
        </Typography>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth error={!!errors.selectedCreator}>
              <InputLabel id="creator-label">Select Creator</InputLabel>
              <Select
                labelId="creator-label"
                value={selectedCreator}
                onChange={(e) => setSelectedCreator(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                      width: 100,
                      overflowY: 'auto'
                    }
                  }
                }}
              >
                {loadingCreators ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : creators.length > 0 ? (
                  creators.map((item, index) => (
                    <MenuItem key={index} value={item.creator}>
                      {item.creator}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No creators found</MenuItem>
                )}
              </Select>
              {errors.selectedCreator && <FormHelperText>{errors.selectedCreator}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={5} md={2}>
            <TextField
              variant="outlined"
              label="Fi Code"
              value={fiCode}
              onChange={(e) => setFiCode(e.target.value)}
              fullWidth
              error={!!errors.fiCode}
              helperText={errors.fiCode}
            />
          </Grid>

          {[
            { type: 'imageWithVehicle', label: 'Image With Vehicle *' },
            { type: 'invoice', label: 'Invoice *' },
            { type: 'insurance', label: 'Insurance *' },
            { type: 'vehicleRc', label: 'Vehicle RC *' }
          ].map((file) => (
            <Grid item xs={12} sm={6} md={2} key={file.type}>
              <FormControl fullWidth>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px dashed #ccc',
                    borderRadius: 1,
                    p: 1,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#f9fafc' }
                  }}
                  onClick={() => document.getElementById(`file-upload-${file.type}`)?.click()}
                >
                  <UploadFileIcon sx={{ mr: 1, color: '#1976d2' }} />
                  <Typography variant="body2" color="text.secondary">
                    {files[file.type]?.name || `Upload ${file.label}`}
                  </Typography>
                </Box>
                <input type="file" id={`file-upload-${file.type}`} hidden onChange={(e) => handleFileChange(e, file.type)} />
                {files[file.type] && (
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleRemoveFile(file.type)}
                    sx={{ mt: 1 }}
                  >
                    Remove File
                  </Button>
                )}
              </FormControl>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12} sm={5} md={2} mb={4}>
          {isFileUploaded ? (
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#4CAF50',
                marginTop: '15px',
                '&:hover': {
                  bgcolor: '#45a049'
                },
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease'
              }}
              startIcon={<SendIcon />}
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#2196F3',
                marginTop: '15px',
                '&:hover': {
                  bgcolor: '#1e88e5'
                },
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
                opacity: isSearchEnabled ? 1 : 0.7
              }}
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              disabled={!isSearchEnabled}
            >
              SEARCH
            </Button>
          )}
        </Grid>

        <Box>
        {/* <DataTable
          value={tableData}
          paginator
          paginatorPosition="bottom"
          paginatorTemplate="RowsPerPageDropdown CurrentPageReport PrevPageLink PageLinks NextPageLink"
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          style={{ textAlign: 'left' }}
          loading={loading}
        >
          <Column
            header="S.No."
            body={(rowData, { rowIndex }) => rowIndex + 1}
            style={{ width: '100px' }}
          />
          <Column field="documentName" header="Document Name" />
          <Column field="documentPath" header="Document Path" />
          <Column header="Action" body={actionTemplate} style={{ textAlign: 'center' }} />
        </DataTable> */}
        <DataTable
  value={tableData}
  paginator
  paginatorPosition="bottom"
  paginatorTemplate="RowsPerPageDropdown CurrentPageReport PrevPageLink PageLinks NextPageLink"
  rows={5}
  rowsPerPageOptions={[5, 10, 20]}
  responsiveLayout="scroll"
  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
  style={{ textAlign: 'left' }}
  loading={loading}
>
  <Column
    header="S.No."
    body={(rowData, { rowIndex }) => rowIndex + 1}
    style={{ width: '100px' }}
  />
  <Column field="fi_Id" header="FI ID" style={{ textAlign: 'center', width: '120px' }} />
  <Column field="documentName" header="Document Name" />
  <Column field="documentPath" header="Document Path" />
  <Column header="Action" body={actionTemplate} style={{ textAlign: 'center' }} />
</DataTable>

        </Box>
      </Card>
    </Box>
  );
};

export default PddDocument;
