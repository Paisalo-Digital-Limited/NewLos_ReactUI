import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  Typography,
  Button,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { fetchCreatorsApi } from '../../api/apiCreator';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fetchStatesApi } from '../../api/apiState';

import Swal from 'sweetalert2';
import { insertGuarantorApi } from '../../api/apiAddGuarantor';

export const AddGuarantorProcess = () => {
  const [formData, setFormData] = useState({
    fiCode: '',
    creator: '',
    name: '',
    guardianName: '',
    dob: null,
    gender: '',
    relation: '',
    religion: '',
    caste: '',
    aadhar: '',
    pan: '',
    mobile: '',
    voterId: '',
    address1: '',
    address2: '',
    address3: '',
    city: '',
    state: '',
    pin: ''
  });
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCreators, setLoadingCreators] = useState(false);
  const [creators, setCreators] = useState([]);

  const initialFormData = {
    fiCode: '',
    creator: '',
    name: '',
    guardianName: '',
    dob: null,
    gender: '',
    relation: '',
    religion: '',
    caste: '',
    aadhar: '',
    pan: '',
    mobile: '',
    voterId: '',
    address1: '',
    address2: '',
    address3: '',
    city: '',
    state: '',
    pin: ''
  };

  useEffect(() => {
    const fetchCreators = async () => {
      setLoadingCreators(true);
      try {
        const response = await fetchCreatorsApi();
        console.log('API Response:', response); // Log the raw response
        const mappedCreators = response.map((item) => ({
          id: item.creatorID,
          name: item.creator
        }));
        console.log('Mapped Creators:', mappedCreators); // Log the mapped creators
        setCreators(mappedCreators);
      } catch (error) {
        console.error('Error fetching creators:', error);
      } finally {
        setLoadingCreators(false);
      }
    };

    fetchCreators();
  }, []);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      if (uploadedFile.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(uploadedFile.type)) {
        alert('Only JPG and PNG files are allowed');
        return;
      }
      setFile(uploadedFile); // Store the file in state
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const validate = () => {
    const newErrors = {};
  
    if (!formData.fiCode.trim()) newErrors.fiCode = 'Fi Code is required';
    if (!formData.creator) newErrors.creator = 'Creator is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.gender || formData.gender === 'select') newErrors.gender = 'Gender is required';
    if (!formData.relation || formData.relation === 'select') newErrors.relation = 'Relation is required';
    if (!formData.religion.trim()) newErrors.religion = 'Religion is required';
    if (!formData.caste.trim()) newErrors.caste = 'Caste is required';
  
    // Validate Aadhar Card (12 digits only)
    if (!/^\d{12}$/.test(formData.aadhar)) {
      newErrors.aadhar = 'Aadhar must be a 12-digit number';
    }
  
    // Validate PAN Card (ABCDE1234F format)
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)) {
      newErrors.pan = 'Invalid PAN format (e.g., ABCDE1234F)';
    }
  
    // Validate Mobile Number (10 digits only)
    if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be a 10-digit number';
    }
  
    // Optional Voter ID Validation
    if (formData.voterId && formData.voterId.length < 10) {
      newErrors.voterId = 'Voter ID must be at least 10 characters';
    }
  
    if (!formData.address1.trim()) newErrors.address1 = 'Address Line 1 is required';
    if (!formData.address2.trim()) newErrors.address2 = 'Address Line 2 is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
  
    // Validate PIN (6 digits only)
    if (!/^\d{6}$/.test(formData.pin)) {
      newErrors.pin = 'PIN must be a 6-digit number';
    }
  
    if (!file) newErrors.file = 'File upload is required';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  

  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const statesList = await fetchStatesApi();
        setStates(statesList);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching states.'
        });
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const submissionData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submissionData.append(key, value); // Append all other form fields
      });

      if (file) {
        submissionData.append('Image', file); // Append the file under the key 'Image'
      } else {
        console.error('File is missing');
      }

      console.log([...submissionData.entries()]); // Log the FormData contents for debugging

      await insertGuarantorApi(submissionData); // Call your API method

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Guarantor added successfully!'
      });

      setFormData(initialFormData); // Reset form fields
      setFile(null); // Reset file
    } catch (error) {
      console.error('Submission error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again.'
      });
    }
  };

  return (
    <Box component="form" sx={{ margin: '0 auto' }}>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '7px',
          mb: 2,
          padding: { xs: '18px', sm: '20px', lg: '25px' }
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
          Add Guarantor
        </Typography>

        <Box sx={{ mt: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <TextField
                  label="Fi Code *"
                  name="fiCode"
                  value={formData.fiCode}
                  onChange={handleChange}
                  error={!!errors.fiCode}
                  helperText={errors.fiCode}
                  placeholder="Enter Fi Code"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth error={!!errors.creator}>
                <InputLabel id="creator-label">Select Creator</InputLabel>
                <Select
                  labelId="creator-label"
                  id="creator-select"
                  name="creator"
                  value={formData.creator || ''} // Use creatorID as the value
                  onChange={(e) => {
                    setFormData({ ...formData, creator: e.target.value }); // Save creatorID in formData
                    setErrors({ ...errors, creator: '' });
                  }}
                  label="Select Creator"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
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
                    creators.map((creator) => (
                      <MenuItem key={creator.id} value={creator.id}>
                        {creator.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No creators found</MenuItem>
                  )}
                </Select>

                <FormHelperText>{errors.creator}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <TextField
                  label="Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  placeholder="Enter your name"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <TextField
                  label="Guardian Name *"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  error={!!errors.guardianName}
                  helperText={errors.guardianName}
                  placeholder="Enter your guardian name"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth *"
                  value={formData.dob}
                  onChange={handleDateChange}
                  format="DD-MM-YYYY"
                  slotProps={{
                    textField: {
                      error: !!errors.dob,
                      helperText: errors.dob
                    }
                  }}
                  sx={{
                    width: '100%',
                    '& fieldset': {
                      border: '1px solid #D5D9E2',
                      borderRadius: '7px'
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="Gender">Gender</InputLabel>
                <Select
                  labelId="Gender"
                  id="gender-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        overflowY: 'auto'
                      }
                    }
                  }}
                >
                  <MenuItem value="select">--Select--</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
                {errors.gender && <FormHelperText sx={{ color: 'red' }}>{errors.gender}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="Relation With Borrower">Relation With Borrower</InputLabel>
                <Select
                  labelId="Relation With Borrower"
                  id="relation-select"
                  name="relation"
                  value={formData.relation}
                  onChange={handleChange}
                  label="Relation With Borrower"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        overflowY: 'auto'
                      }
                    }
                  }}
                >
                  <MenuItem value="select">--Select--</MenuItem>
                  <MenuItem value="father">Father</MenuItem>
                  <MenuItem value="mother">Mother</MenuItem>
                  <MenuItem value="brother">Brother</MenuItem>
                  <MenuItem value="husband">Husband</MenuItem>
                  <MenuItem value="daughter">Daughter</MenuItem>
                  <MenuItem value="son">Son</MenuItem>
                  <MenuItem value="sister">Sister</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {errors.relation && <FormHelperText sx={{ color: 'red' }}>{errors.relation}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <TextField
                  label="Religion *"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  error={!!errors.religion}
                  helperText={errors.religion}
                  placeholder="Enter your Religion"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <TextField
                  label="Caste *"
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                  error={!!errors.caste}
                  helperText={errors.caste}
                  placeholder="Enter your Caste"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <TextField
               label="Aadhar No *"
               name="aadhar"
               type="number"
               value={formData.aadhar}
               onChange={(e) => {
                 if (e.target.value.length <= 12) {
                   handleChange(e); // Allow changes only if the length is <= 12
                 }
               }}
               error={!!errors.aadhar}
               helperText={errors.aadhar}
               placeholder="Enter your Aadhar No"
               inputProps={{ maxLength: 12 }} // Add maxLength restriction
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <TextField
                  label="PAN No *"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  error={!!errors.pan}
                  helperText={errors.pan}
                  placeholder="Enter your Pan No"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <TextField
                label="Mobile No *"
                name="mobile"
                type="number"
                value={formData.mobile}
                onChange={(e) => {
                  if (e.target.value.length <= 10) {
                    handleChange(e);
                  }
                }}
                error={!!errors.mobile}
                helperText={errors.mobile}
                placeholder="Enter your Mobile No"
                inputProps={{ maxLength: 10 }} 
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <TextField
                  label="Voter ID"
                  name="voterId"
                  value={formData.voterId}
                  onChange={handleChange}
                  placeholder="Enter your Voter ID"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <TextField
                  label="Permanent Address-1 *"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  error={!!errors.address1}
                  helperText={errors.address1}
                  placeholder="Enter your Permanent Address-1"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <TextField
                  label="Permanent Address-2 *"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  error={!!errors.address2}
                  helperText={errors.address2}
                  placeholder="Enter your Permanent Address-2"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <TextField
                  name="address3"
                  value={formData.address3}
                  onChange={handleChange}
                  label="Permanent Address-3 *"
                  placeholder="Enter your Permanent Address-3"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth error={!!errors.city}>
                <TextField
                  label="Permanent City *"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your Permanent City"
                />
                {errors.city && <FormHelperText sx={{ color: 'red' }}>{errors.city}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth error={!!errors.state}>
                <InputLabel id="state-label">State *</InputLabel>
                <Select
                  labelId="state-label"
                  id="state-select"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  label="State *"
                  disabled={loadingStates}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        overflowY: 'auto'
                      }
                    }
                  }}
                >
                  {loadingStates ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} />
                    </MenuItem>
                  ) : states.length > 0 ? (
                    states.map((state, index) => (
                      <MenuItem key={index} value={state.name || state.stateName}>
                        {state.name || state.stateName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No states found</MenuItem>
                  )}
                </Select>
                {errors.state && <FormHelperText sx={{ color: 'red' }}>{errors.state}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <TextField
                  label="Pin *"
                  name="pin"
                  type="number"
                  value={formData.pin}
                  onChange={(e) => {
                    if (e.target.value.length <= 6) {
                      handleChange(e); // Allow changes only if the length is <= 6
                    }
                  }}
                  error={!!errors.pin}
                  helperText={errors.pin}
                  placeholder="Enter your Pin"
                  inputProps={{ maxLength: 6 }} // Add maxLength restriction
                />
              </FormControl>
            </Grid>
       
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth error={!!errors.file}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px dashed #ccc',
                    borderRadius: 1,
                    p: 1.7,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#f9fafc' }
                  }}
                  onClick={() => document.getElementById('file-upload-inline')?.click()}
                >
                  <UploadFileIcon sx={{ mr: 1, color: '#1976d2' }} />
                  <Typography variant="body2" color="text.secondary">
                    {file ? file.name : 'Click or drag a file here to upload'}
                  </Typography>
                </Box>
                <input type="file" id="file-upload-inline" hidden onChange={handleFileChange} />
                {errors.file && <FormHelperText>{errors.file}</FormHelperText>}
                {file && (
                  <Button variant="outlined" startIcon={<DeleteIcon />} color="error" onClick={handleRemoveFile} sx={{ mt: 1 }}>
                    Remove File
                  </Button>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  background: 'linear-gradient(135deg, #4CAF50 30%, #8BC34A 90%)',
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  borderRadius: '10px',
                  padding: '12px 30px',
                  fontSize: '16px',
                  letterSpacing: '1px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #388E3C 30%, #4CAF50 90%)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                    transform: 'translateY(-2px)'
                  },
                  '&:active': {
                    background: 'linear-gradient(135deg, #2E7D32 30%, #388E3C 90%)',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    transform: 'translateY(0px)'
                  }
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
};
