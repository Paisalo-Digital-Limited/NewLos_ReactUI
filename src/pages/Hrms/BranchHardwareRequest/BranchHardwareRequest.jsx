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
  Divider
} from '@mui/material';
import { fetchCreatorsApi } from '../../../api/apiCreator';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
export const BranchHardware = () => {
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
      morphon: ''
    }
  ]);
  const [loadingCreators, setLoadingCreators] = useState(false);

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
    setRows(updatedRows);
  };

  const handleAddRow = (index) => {
    const updatedRows = [...rows];
    // Add a new row after the current index
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
      morphon: ''
    });
    setRows(updatedRows);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
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
                  flexWrap: 'wrap' // Allow wrapping for smaller screens
                }}
              >
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="creator-label">Select Creator</InputLabel>
                    <Select
                      labelId="creator-label"
                      id="creator-select"
                      name="creator"
                      //onChange={handleChange}
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
                    <InputLabel id={`branch-label-${index}`}> Branch Code</InputLabel>
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
                      {loadingCreators ? (
                        <MenuItem disabled>
                          <CircularProgress size={20} />
                        </MenuItem>
                      ) : creators.length > 0 ? (
                        creators.map((item, idx) => (
                          <MenuItem key={idx} value={item.creator}>
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
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={row.address}
                    onChange={(e) => handleRowChange(index, 'address', e.target.value)}
                    placeholder="Enter Address"
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
                    label="Contact Person Name"
                    name="contactPersonName"
                    value={row.contactPersonName}
                    onChange={(e) => handleRowChange(index, 'contactPersonName', e.target.value)}
                    placeholder="Enter Contact Person Name"
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
      </Card>
    </Box>
  );
};
