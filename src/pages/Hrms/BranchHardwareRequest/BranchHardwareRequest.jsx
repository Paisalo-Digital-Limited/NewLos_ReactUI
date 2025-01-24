import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  CircularProgress,
  IconButton,
  Tooltip,
  Divider,
  Button
} from '@mui/material';
import { fetchCreatorsApi } from '../../../api/apiCreator';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

export const BranchHardware = () => {
  const [branches, setBranches] = useState([]);
  const [creators, setCreators] = useState([]);
  const [rows, setRows] = useState([
    {
      branch: '',
      address: '',
      contactPersonNumber: '',
      contactPersonName: '',
      computer: '',
      printer: '',
      mouse: '',
      scanner: '',
      keyboard: '',
      morphon: '',
      errors: { address: false, contactPersonName: false }
    }
  ]);
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [loadingCreators, setLoadingCreators] = useState(false);

  // Fetch branches from API
  useEffect(() => {
    const fetchBranches = async () => {
      setLoadingBranches(true);
      try {
        const response = await fetch('http://localhost:5238/api/Masters/GetBranchMaster');
        if (!response.ok) {
          throw new Error('Failed to fetch branch data');
        }
        const result = await response.json();

        // Extract the 'data' array from the response
        console.log('Full API Response:', result);
        const { data } = result;

        if (Array.isArray(data)) {
          console.log('Branch Data:', data); // Debugging
          setBranches(data); // Set the branches state
        } else {
          console.error('Invalid response structure:', result);
        }
      } catch (error) {
        console.error('Error fetching branch data:', error.message);
      } finally {
        setLoadingBranches(false);
      }
    };

    fetchBranches();
  }, []);

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

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    // Clear validation errors when the user interacts
    if (field === 'address' || field === 'contactPersonName') {
      updatedRows[index].errors[field] = false;
    }

    setRows(updatedRows);
  };

  const handleAddRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index + 1, 0, {
      branch: '',
      address: '',
      contactPersonNumber: '',
      contactPersonName: '',
      computer: '',
      printer: '',
      mouse: '',
      scanner: '',
      keyboard: '',
      morphon: '',
      errors: { address: false, contactPersonName: false }
    });
    setRows(updatedRows);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

  const validateRows = () => {
    let isValid = true;
    const updatedRows = rows.map((row) => {
      const errors = {
        address: !row.address.trim(),
        contactPersonName: !row.contactPersonName.trim()
      };

      if (errors.address || errors.contactPersonName) {
        isValid = false;
      }

      return { ...row, errors };
    });

    setRows(updatedRows);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateRows()) {
      return;
    }

    // Assuming the first row's data represents the main input
    const rowData = rows[0];

    // Create the payload object based on API expectations
    const payload = {
      EmpId: null, // Replace with actual EmpId if available
      Branch: rowData.branch,
      BankAddress: rowData.address,
      ContactPersonNumber: rowData.contactPersonNumber,
      ContactPersonName: rowData.contactPersonName,
      ComputerLaptop: rowData.computer,
      Printer: rowData.printer,
      Scanner: rowData.scanner,
      Mouse: rowData.mouse,
      Keyboard: rowData.keyboard,
      MorphonDevices: rowData.morphon,
      reqdate: new Date().toISOString(), // Assuming reqdate is the current date
      FirstApprovelBy: null, // Replace with actual value if required
      FirstApprovalStatus: false, // Default value
      SecondApprovalStatus: false, // Default value
      SecondApprovelBy: null, // Replace with actual value if required
      activeUser: 'testUser', // Replace with the actual active user
      dbname: 'testDB', // Replace with the actual database name
      islive: true // Adjust the value based on your environment
    };

    try {
      const response = await fetch('https://localhost:7030/api/FiSanction/InsertBranchAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.statuscode === 200) {
        alert(result.message);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred while submitting the data.');
    }
  };

  return (
    <Box component="form" sx={{ margin: '0 auto', width: '100%' }}>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '7px',
          mb: 2,
          padding: { xs: '18px', sm: '20px', lg: '25px' }
        }}
      >
        <Box>
          {rows.map((row, index) => (
            <Box key={index}>
              <Grid
                container
                spacing={2}
                wrap="nowrap"
                key={index}
                alignItems="center"
                sx={{
                  flexWrap: 'wrap'
                }}
              >
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="creator-label">Select Creator</InputLabel>
                    <Select
                      labelId="creator-label"
                      id="creator-select"
                      name="creator"
                      label="Select Creator"
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
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id={`branch-label-${index}`}>Select Branch</InputLabel>
                    <Select
                      labelId={`branch-label-${index}`}
                      name="branch"
                      value={row.branch}
                      onChange={(e) => handleRowChange(index, 'branch', e.target.value)}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 300,
                            overflowY: 'auto'
                          }
                        }
                      }}
                    >
                      {loadingBranches ? (
                        <MenuItem disabled>
                          <CircularProgress size={20} />
                        </MenuItem>
                      ) : branches.length > 0 ? (
                        branches.map((branch, idx) => (
                          <MenuItem key={idx} value={branch.branchCode}>
                            {branch.creatorName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No branches found</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={row.address}
                    error={row.errors.address}
                    onChange={(e) => handleRowChange(index, 'address', e.target.value)}
                    placeholder="Enter Address"
                    helperText={row.errors.address ? 'Address is required' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    label="Contact Person Name"
                    name="contactPersonName"
                    value={row.contactPersonName}
                    error={row.errors.contactPersonName}
                    onChange={(e) => handleRowChange(index, 'contactPersonName', e.target.value)}
                    placeholder="Enter Contact Person Name"
                    helperText={row.errors.contactPersonName ? 'Contact Person Name is required' : ''}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    label="Contact Person Number"
                    name="contactPersonNumber"
                    value={row.contactPersonNumber}
                    onChange={(e) => handleRowChange(index, 'contactPersonNumber', e.target.value)}
                    placeholder="Enter Contact Person Number"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    label="Computer"
                    name="computer"
                    value={row.computer}
                    onChange={(e) => handleRowChange(index, 'computer', e.target.value)}
                    placeholder="Enter Computer"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    label="Printer"
                    name="printer"
                    value={row.printer}
                    onChange={(e) => handleRowChange(index, 'printer', e.target.value)}
                    placeholder="Enter Printer"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth>
                    <TextField label="Printer" name="printer" placeholder="Enter Printer" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth>
                    <TextField label="Mouse" name="mouse" placeholder="Enter Mouse" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth>
                    <TextField label="Scanner" name="scanner" placeholder="Enter Scanner" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth>
                    <TextField label="Keyboard" name="keyboard" placeholder="Enter Keyboard" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth>
                    <TextField label="Morphon" name="keyboard" placeholder="Enter Morphon" />
                  </FormControl>
                </Grid>
                <Grid item>
                  <Box display="flex" justifyContent="space-between">
                    <Tooltip title="Add Row">
                      <IconButton color="primary" onClick={() => handleAddRow(index)} disabled={index !== rows.length - 1}>
                        <AddCircleIcon />
                      </IconButton>
                    </Tooltip>
                    {index > 0 && (
                      <Tooltip title="Delete Row">
                        <IconButton color="error" onClick={() => handleDeleteRow(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Grid>
              </Grid>

              {index < rows.length - 1 && <Divider sx={{ marginBottom: 2 }} />}
            </Box>
          ))}
        </Box>
        <Box sx={{ marginTop: 3, textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
