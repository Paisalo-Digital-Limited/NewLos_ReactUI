import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Modal,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  Dialog,
  TextField,
  Grid,
  Tooltip,
  TableFooter,
  TablePagination
} from '@mui/material';
import { CheckCircle, HourglassBottom } from '@mui/icons-material';
import { CloudUpload, Close, Visibility, DocumentScanner } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import RepeatIcon from '@mui/icons-material/Repeat';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import AnimateButton from 'components/@extended/AnimateButton';
import SendIcon from '@mui/icons-material/Send';

// Example static data
const staticData = [
  {
    SmCode: 'SM001',
    FiCode: 12345,
    Creator: 'User1',
    Branch_Code: 'BR001',
    Group_code: 'G001',
    BorrSignStatus: 'Y',
    Doc: 'Document1',
    Comments: 'Initial Submission'
  },
  {
    SmCode: 'SM002',
    FiCode: 12346,
    Creator: 'User2',
    Branch_Code: 'BR002',
    Group_code: 'G002',
    BorrSignStatus: 'N',
    Doc: 'Document2',
    Comments: 'Pending Approval'
  }
];

const PostSanction = () => {
  const [filterOption, setFilterOption] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fiCode, setFiCode] = useState('');
  const [creator, setCreator] = useState('');
  const [data, setData] = useState(staticData); // Use static data
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newRemarks, setNewRemarks] = useState('');
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
    // Clear other input fields when filter option changes
    setFromDate('');
    setToDate('');
    setFiCode('');
    setCreator('');
  };

  // Search button should be enabled based on filter option
  const isSearchEnabled = () => {
    if (filterOption === 'date') {
      return fromDate && toDate; // Ensure both dates are set
    } else if (filterOption === 'ficode') {
      return fiCode && creator; // Ensure FiCode and Creator are set
    }
    return false; // Disable button for unselected filter options
  };

  // Move to Audit handler (mock behavior)
  const handleMoveToAudit = (fiCode, creator, borrSignStatus) => {
    if (borrSignStatus !== 'Y') {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: '2nd eSign is not done. Please complete the eSign process before moving to Audit.'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Successfully moved to Audit.'
    });
  };

  // Display document info modal
  const handleDocClick = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <Card sx={{ boxShadow: 'none', borderRadius: '7px', mb: 3, p: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Grid item></Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="medium">
              <InputLabel>Search By</InputLabel>
              <Select value={filterOption} onChange={handleFilterChange} label="Search By" size="medium">
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="ficode">FiCode & Creator</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {filterOption === 'date' && (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="From Date"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="To Date"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  size="medium"
                />
              </Grid>
            </>
          )}

          {filterOption === 'ficode' && (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="FiCode"
                  value={fiCode}
                  onChange={(e) => setFiCode(e.target.value)}
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Creator"
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  variant="outlined"
                  size="medium"
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={8} md={2}>
            <Grid item>
              <AnimateButton>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: 'primary',
                    '&:hover': { bgcolor: 'primary' } // Ensuring it stays green on hover
                  }}
                  fullWidth
                  startIcon={<SearchIcon />} // Adding Submit Icon
                >
                  SERACH
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ borderRadius: '4px', marginTop: '1rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['SmCode', 'FiCode', 'Creator', 'Branch_Code', 'Group_code', '2nd Esign', 'Doc', 'Comments', 'Action'].map((header) => (
                  <TableCell
                    key={header}
                    sx={{ fontWeight: 'bold', textTransform: 'uppercase', background: '#ff4c4c', color: 'white', textAlign: 'center' }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.SmCode}</TableCell>
                  <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.FiCode}</TableCell>
                  <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.Creator}</TableCell>
                  <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.Branch_Code}</TableCell>
                  <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.Group_code}</TableCell>
                  <TableCell
                    sx={{
                      padding: '12px 16px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: item.BorrSignStatus === 'Y' ? 'green' : 'red'
                    }}
                  >
                    {item.BorrSignStatus === 'Y' ? (
                      <CheckCircle sx={{ color: 'green', fontSize: '20px' }} />
                    ) : (
                      <HourglassBottom sx={{ color: 'red', fontSize: '20px' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>
                    <IconButton onClick={handleDocClick}>
                      <DocumentScanner />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.Comments}</TableCell>
                  <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>
                    <Button variant="contained" onClick={() => handleMoveToAudit(String(item.FiCode), item.Creator, item.BorrSignStatus)}>
                      <Tooltip title="Move To Audit" arrow>
                        <span>
                          <RepeatIcon />
                        </span>
                      </Tooltip>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(event, newPage) => setPage(newPage)}
                  onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0); // Reset page to 0 when rows per page changes
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>

      {/* Modal for Document Info */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          sx={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            maxWidth: '600px',
            margin: 'auto',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            outline: 'none'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Document Information
          </Typography>
          <Button onClick={() => setOpenModal(false)} sx={{ position: 'absolute', right: 0, top: 0, minWidth: 0, padding: 0 }}>
            <Close sx={{ color: 'red', fontSize: '1.5rem' }} />
          </Button>
          {/* Add Document info here */}
        </Box>
      </Modal>

      {/* Modal for Adding Document */}
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          sx={{
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '8px',
            maxWidth: '400px',
            margin: 'auto',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', color: '#1976d2', textAlign: 'center' }}>
            Add New Document
          </Typography>

          {/* File Input */}
          <input
            type="file"
            className="form-control form-control-sm"
            onChange={(event) => setFile(event.target.files?.[0] || null)} // Attach the fixed handler
            style={{
              width: '100%',
              marginBottom: '16px',
              padding: '8px',
              borderRadius: '4px'
            }}
          />
          <TextField
            fullWidth
            label="Remarks"
            value={newRemarks}
            onChange={(e) => setNewRemarks(e.target.value)}
            variant="outlined"
            margin="normal"
          />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                if (file) {
                  setUploadedFile(URL.createObjectURL(file)); // Directly set the uploaded file for preview
                  Swal.fire('Success', 'File uploaded successfully!', 'success');
                  setOpenAddModal(false);
                }
              }}
              disabled={!file}
              sx={{ flex: 1, padding: '10px 16px', fontSize: '16px', fontWeight: 'bold', marginRight: '8px' }}
            >
              <CloudUpload sx={{ marginRight: '8px' }} /> Save
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenAddModal(false)}
              sx={{
                flex: 1,
                padding: '10px 16px',
                fontSize: '16px',
                fontWeight: 'bold',
                marginLeft: '8px',
                borderColor: '#d32f2f',
                color: '#d32f2f'
              }}
            >
              <Close sx={{ marginRight: '8px' }} /> Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Dialog for Image Preview */}
      <Dialog open={openImageModal} onClose={() => setOpenImageModal(false)} maxWidth="md" fullWidth>
        <Box sx={{ padding: 3 }}>
          <Grid container spacing={3}>
            {uploadedFile && (
              <Grid item xs={12} sm={6}>
                <Paper sx={{ padding: 2, textAlign: 'center', boxShadow: 3 }}>
                  <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                    Uploaded File:
                  </Typography>
                  <img
                    src={uploadedFile}
                    alt="Uploaded File"
                    style={{ height: '150px', borderRadius: '8px', objectFit: 'cover', width: '100%' }}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
};

export default PostSanction;
