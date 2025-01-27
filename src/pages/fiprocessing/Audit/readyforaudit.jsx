import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  Link,
  Typography,
  Modal,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { Description, AccountBox, Fingerprint, Folder } from '@mui/icons-material';
import Swal from 'sweetalert2'; // Import SweetAlert2
import LinearProgress from '@mui/material/LinearProgress';
import TablePagination from '@mui/material/TablePagination';
import PreviewIcon from '@mui/icons-material/Preview';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import apiClient from 'network/apiClient';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import BackspaceIcon from '@mui/icons-material/Backspace';

// Document details with icons


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};
// Static documents for loading state
const staticDocuments = documentDetails.map((detail, index) => ({
  id: `${index + 1}`,
  name: detail.docName,
  docID: index + 1,
  docName: detail.docName,
  checklistId: null,
  docData: null,
  docFilePath: null,
  dc: 0,
  createdDate: null,
  filePath: null,
  grNo: 0,
  icon: detail.icon
}));
const ReadyForAudit = () => {
  const [filterOption, setFilterOption] = useState('date');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [creator, setCreator] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Creatorlist, setCreatorlist] = useState([]);

  //--------model open--------
 

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page

  const [open, setOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState('');

  const handleViewDoc = (docName) => {
    debugger;
    const pdfFilePath = docName;
    const fileName = pdfFilePath.split(':').pop();
    const pdfUrl = `https://predeptest.paisalo.in:8084/${fileName}`;
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // Handle filter change
  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
    setFromDate('');
    setToDate('');
    setCreator('');
    setBranchCode('');
    setGroupCode('');
  };
  useEffect(() => {
    debugger;
    getCreatorDropdown();
  }, []);
  const handleGetAllDocModelOpen = async (FiCode, Creator) => {
    setLoading(true); // Start loading state
    try {
      //const response = await fetch(`https://apiuat.paisalo.in:4015/fi/api/FIIndex/GetAllDoc?creator=BAREILLY&ficode=261863`);
      const response = await fetch(`https://apiuat.paisalo.in:4015/fi/api/FIIndex/GetAllDoc?creator=${Creator}&ficode=${FiCode}`);
      const data = await response.json();
      if (data.statuscode === 200) {
        const mergedDocuments = data.data.map((doc) => ({
          ...doc,
          icon: doc.icon || <Description />
        }));
        setDocuments(mergedDocuments);
        setGetAllDocopen(true);
      } else {
        console.error('Error fetching documents:', data.message);
      }
    } catch (error) {
      console.error('Failed to fetch documents', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    //handleGetAllDocModelOpen(); // Fetch documents on component mount
  }, []);
  const filteredDocuments = documents.filter((doc) => (selectedType === 'borrower' ? doc.grNo <= 0 : doc.grNo > 0));

  const handleCellClick = () => {
    setModalData(row.pInfo || '-'); // Set data for the modal
    setModalOpen(true); // Open the modal
  };
  const handleGetAllDocClose = () => {
    setGetAllDocopen(false); // Close the modal
    //setSelectedRow(null); // Clear the selected row data
  };
  // Handle opening the modal
  const handleOpenModal = (doc) => {
    setSelectedDocument(doc);
    setOpenModal(true);
  };
  // Handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDocument(null);
  };

  const getCreatorDropdown = async () => {
    try {
      //setLoading(true);
      const response = await apiClient.get('/Masters/GetCreator', {
        requireAuth: true,
        checkTokenInResponse: false
      });
      const fetchCreator = response.data.data;
      setCreatorlist(fetchCreator);
    } catch (error) {
    } finally {
      //setLoading(false);
    }
  };

  const getSortedDocuments = () => {
    return [...documents].sort((a, b) => {
      if (a.filePath && !b.filePath) return -1;
      if (!a.filePath && b.filePath) return 1;
      return 0;
    });
  };
  const handlePersonalInfoClick = async (FiCode, Creator) => {
    if (!FiCode || !Creator) {
      console.error('Invalid inputs for handlePersonalInfoClick:', { FiCode, Creator });
      return;
    }
    setLoading(true); // Set loading to true before making the API call
    const url = `https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/GetPinFoDocument?FiCode=${FiCode}&Creator=${Creator}`;
    //const url = `https://localhost:7030/api/FiPostSanction/GetPinFoDocument?FiCode=${261809}&Creator=${Creator}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
          //Authorization: `Bearer ${token}`, // Ensure proper headers
        }
      });
      if (response.status === 200) {
        const apipinfoData = response.data.data || '[]';
        setPinfoData(apipinfoData);
        setSelectedRowData(apipinfoData[0] || null);
        setPinInfopen(true);
      } else {
        console.error('Error in API response:', response.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error in handlePersonalInfoClick:', error);
    } finally {
      setLoading(false);
    }
  };
  //-------------Income Details----------
  const handleIncomeClick = async (FiCode, Creator) => {
    debugger;
    if (!FiCode || !Creator) {
      console.error('Invalid inputs for handlePersonalInfoClick:', { FiCode, Creator });
      return;
    }
    setLoading(true); // Set loading to true before making the API call
    const url = `https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/GetFiInComebyCreatorFiCode?FiCode=${FiCode}&Creator=${Creator}`;
    // const url = `https://localhost:7030/api/FiPostSanction/GetFiInComebyCreatorFiCode?FiCode=${261809}&Creator=${Creator}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
          //Authorization: `Bearer ${token}`, // Ensure proper headers
        }
      });
      if (response.status === 200) {
        const apipinfoData = response.data.data || '[]';
        setPinfoData(apipinfoData);
        setSelectedRowData(apipinfoData[0] || null);
        setIncomeopen(true);
      } else {
        console.error('Error in API response:', response.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error in handlePersonalInfoClick:', error);
    } finally {
      setLoading(false);
    }
  };
  //----------Doc Details-------------------
  const handleDocClick = async (FiCode, Creator) => {
    if (!FiCode || !Creator) {
      console.error('Invalid inputs for handlePersonalInfoClick:', { FiCode, Creator });
      return;
    }
    setLoading(true); // Set loading to true before making the API call
    const url = `https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/GetFiDocumentbyCreatorFiCode?FiCode=${FiCode}&Creator=${Creator}`;
    //const url = `https://localhost:7030/api/FiPostSanction/GetFiDocumentbyCreatorFiCode?FiCode=${261809}&Creator=${Creator}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
          //Authorization: `Bearer ${token}`, // Ensure proper headers
        }
      });
      if (response.status === 200) {
        const apipinfoData = response.data.data || '[]';
        setPinfoData(apipinfoData);
        setSelectedRowData(apipinfoData[0] || null);
        setPronoteDocopen(true);
      } else {
        console.error('Error in API response:', response.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error in handlePersonalInfoClick:', error);
    } finally {
      setLoading(false);
    }
  };
  //---------loan Agreeement-----------------
  const DbNamevalue = 'PDLERP';
  const handleLoanAgreement = async (fiId) => {
    debugger;
    setLoading(true);
    const HouseVisitVM = {
      F_Id: fiId,
      Type: 'SecondeSign',
      DbName: DbNamevalue
    };

    try {
      const response = await axios.post('https://apiuat.paisalo.in:4015/PDLDocReports/api/DocGen/GetDocument', HouseVisitVM);
      const { code, message, data } = response.data;
      if (code === 200) {
        const pdfFilePath = data;
        const fileName = pdfFilePath.split(':').pop();
        const pdfUrl = `https://predeptest.paisalo.in:8084/${fileName}`;
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      } else if (code === 201) {
        alert('No Data Found');
      } else {
        alert('Error');
      }
    } catch (error) {
      console.error('Error fetching the report:', error);
      alert('Request Failed');
    } finally {
      setLoading(false);
    }
  };
  //------------------------------------
  const handleCreatorChange = (event) => {
    const selectedCreator = event.target.value;
    setCreator(selectedCreator);
  };
  //----------send To NEFT-------------
  // Send To  Neft Api call
  const handleSentToNeft = async (FiCode, Creator) => {
    if (!FiCode || !Creator) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'FiCode and Creator are required!'
      });
      console.error('Invalid inputs for handleSentToNeft:', { FiCode, Creator });
      return;
    }

    setLoading(true);
    const url = `https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/AssignreadyforNeft?FiCode=${FiCode}&Creator=${Creator}`;

    try {
      // Making a POST request with the required data
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            'Content-Type': 'application/json'
            //Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Assign Ready For Neft successful!'
        });
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'Unknown error'
        });
        console.error('Error in API response:', response.data.message || 'Unknown error');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data.message || 'An error occurred. Please try again later.'
      });
      console.error('Error in handleSentToNeft:', error);
    } finally {
      setLoading(false);
    }
  };
  const [BackToNeftopen, setBackToNeftopen] = useState(false);
  const [selectedDataBranch, setselectedDataBranch] = useState({ FiCode: '', Creator: '' });
  const [remark, setRemark] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSentToBranch = async (FiCode, Creator) => {
    const payloadRemark = remark;
    if (!FiCode || !Creator) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All required fields must be filled!'
      });
      return;
    }

    const url = `https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/BackReadyForNeft?FiCode=${FiCode}&Creator=${Creator}`;

    setLoading(true); // Set loading to true
    try {
      console.log('Making API call to:', url);
      const response = await axios.post(
        url,
        {}, // Pass an empty object for the body
        {
          headers: {
            'Content-Type': 'application/json'
            //Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Rejected From branch!'
        });
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setBackToNeftopen(false);
        }, 2000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'Unknown error'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data.message || error.message
      });
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const fetchData = async () => {
    debugger;
    setLoading(true);
    try {
      const response = await axios.get(`https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/GetFiReadyForNeft`, {
        params: {
          Creator: creator,
          Branch: branchCode,
          GroupCode: groupCode,
          pageSize: 15,
          pageNumber: 1,
          fromDate: fromDate,
          toDate: toDate
        }
      });
      if (response.status === 200) {
        setData(response.data.data || []);
        if (response.data.statuscode === 201) {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = () => {
    fetchData();
  };

  return (
    <div>
      <Card sx={{ boxShadow: 'none', borderRadius: '7px', mb: 3, p: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Grid item xs={6} container justifyContent="start">
            <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
              Ready For Audit
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="medium">
              <InputLabel>Search By</InputLabel>
              <Select value={filterOption} onChange={handleFilterChange} label="Search By" size="medium">
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="ficode">Creator</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {filterOption === 'date' && (
            <>
              <Grid item xs={12} sm={6} md={2}>
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
              <Grid item xs={12} sm={6} md={2}>
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
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="medium">
                  <InputLabel>Creator</InputLabel>
                  <Select label="Creator" size="medium" value={creator} onChange={handleCreatorChange}>
                    {Creatorlist.map((index) => (
                      <MenuItem key={index.creatorid} value={index.creator}>
                        {index.creator}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  label="Branch Code"
                  variant="outlined"
                  size="medium"
                  value={branchCode}
                  onChange={(e) => setBranchCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  label="Group Code"
                  variant="outlined"
                  size="medium"
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value)}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={8} md={2}>
            <Button
              variant="contained"
              size="large"
              sx={{
                fontWeight: 'bold',
                bgcolor: 'green',
                '&:hover': { bgcolor: 'green' } // Ensuring it stays green on hover
              }}
              fullWidth
              startIcon={<SearchIcon />}
              onClick={handleSearch}
            >
              SEARCH
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
          {/* {loading && <LinearProgress />} */}
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#ff4c4c', color: 'white' }}>
                {[
                  'SNo.',
                  'SmCode',
                  'ficode',
                  'Creator',
                  'Group',
                  'Branch',
                  'Name',
                  'SchCode',
                  'Date',
                  'A/C Verify',
                  'Model/Brand',
                  'Pinfo',
                  'Income',
                  'Doc',
                  'Document',
                  'Action'
                ].map((header, index) => (
                  <TableCell sx={{ color: 'white' }} key={index}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={16} sx={{ textAlign: 'center' }}>
                    No Data Available
                  </TableCell>
                </TableRow>
              ) : (
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{row.smCode}</TableCell>
                    <TableCell>{row.fiCode}</TableCell>
                    <TableCell>{row.creator}</TableCell>
                    <TableCell>{row.groupCode}</TableCell>
                    <TableCell>{row.branch || '-'}</TableCell>
                    <TableCell>{row.fullName}</TableCell>
                    <TableCell>{row.schCode || '-'}</TableCell>
                    <TableCell>{row.createdOn || '-'}</TableCell>
                    <TableCell>{row.verify || '-'}</TableCell>
                    <TableCell>{row.model || '-'}</TableCell>

                    <TableCell align="center">
                      <IconButton
                        aria-label=""
                        size="small"
                        onClick={() => {
                          if (row?.fiCode && row?.creator) {
                            console.log('Row Data:', row);
                            handlePersonalInfoClick(row.fiCode.toString(), row.creator);
                          } else {
                            console.error('Missing FiCode or Creator in row:', row);
                          }
                        }}
                      >
                        <PermContactCalendarIcon sx={{ color: 'red' }} />
                      </IconButton>
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        aria-label=""
                        size="small"
                        onClick={() => {
                          if (row?.fiCode && row?.creator) {
                            console.log('Row Data:', row);
                            handleIncomeClick(row.fiCode.toString(), row.creator);
                          } else {
                            console.error('Missing FiCode or Creator in row:', row);
                          }
                        }}
                      >
                        <LocalAtmIcon sx={{ color: 'blue' }} />
                      </IconButton>
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        aria-label=""
                        size="small"
                        onClick={() => {
                          if (row?.fiCode && row?.creator) {
                            console.log('Row Data:', row);
                            handleDocClick(row.fiCode.toString(), row.creator);
                          } else {
                            console.error('Missing FiCode or Creator in row:', row);
                          }
                        }}
                      >
                        <DocumentScannerIcon sx={{ color: 'green' }} />
                      </IconButton>
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        aria-label=""
                        size="small"
                        onClick={() => {
                          if (row?.fiCode && row?.creator) {
                            console.log('Row Data:', row);
                            handleLoanAgreement(row.fiId);
                          } else {
                            console.error('Missing FiCode or Creator in row:', row);
                          }
                        }}
                      >
                        <DownloadIcon sx={{ color: 'orange' }} />
                      </IconButton>
                      <IconButton
                        aria-label=""
                        size="small"
                        onClick={() => {
                          if (row?.fiCode && row?.creator) {
                            console.log('Row Data:', row);
                            handleGetAllDocModelOpen(row.fiCode.toString(), row.creator);
                          } else {
                            console.error('Missing FiCode or Creator in row:', row);
                          }
                        }}
                      >
                        <PreviewIcon sx={{ color: 'purple' }} />
                      </IconButton>
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        aria-label=""
                        size="small"
                        onClick={() => {
                          if (row?.fiCode && row?.creator) {
                            console.log('Row Data:', row);
                            handleSentToNeft(row.fiCode.toString(), row.creator);
                          } else {
                            console.error('Missing FiCode or Creator in row:', row);
                          }
                        }}
                      >
                        <SendIcon sx={{ color: 'teal' }} />
                      </IconButton>
                      <IconButton
                        aria-label=""
                        size="small"
                        onClick={() => {
                          if (row?.fiCode && row?.creator) {
                            console.log('Row Data:', row);
                            handleSentToBranch(row.fiCode.toString(), row.creator);
                          } else {
                            console.error('Missing FiCode or Creator in row:', row);
                          }
                        }}
                      >
                        <BackspaceIcon sx={{ color: 'grey' }} fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination Component */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)} // Update current page
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10)); // Update rows per page
              setPage(0); // Reset to first page
            }}
          />
        </TableContainer>
      </Card>

      <Modal open={pinInfopen} onClose={() => setPinInfopen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            width: '80%',
            maxHeight: '80%',
            overflowY: 'auto',
            padding: '16px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              marginBottom: '16px',
              textAlign: 'center',
              color: '#D32F2F'
            }}
          >
            Personal Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField label="S.NO" value="1" variant="outlined" InputProps={{ readOnly: true }} fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Name" value={selectedRowData?.fullName || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Address" value={selectedRowData?.address || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Mob" value={selectedRowData?.phoneNo || 'N/A'} variant="outlined" fullWidth />
            </Grid>

            <Grid item xs={3}>
              <TextField label="AC No" value={selectedRowData?.accNo || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Bank" value={selectedRowData?.bankName || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Creator" value={selectedRowData?.creator || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Code" value={selectedRowData?.fiCode || 'N/A'} variant="outlined" fullWidth />
            </Grid>

            <Grid item xs={3}>
              <TextField label="Amt" value={selectedRowData?.loanAmount || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Duration" value={selectedRowData?.loanDuration || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Gender" value={selectedRowData?.gender || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Religion" value={selectedRowData?.religion || 'N/A'} variant="outlined" fullWidth />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', marginTop: '16px' }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setPinInfopen(false)} // Close modal
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                padding: '8px 16px'
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={IncomeDataopen} onClose={() => setIncomeopen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            width: '80%',
            maxHeight: '80%',
            overflowY: 'auto',
            padding: '16px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              marginBottom: '16px',
              textAlign: 'center',
              color: '#D32F2F'
            }}
          >
            Income Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField label="S.NO" value="1" variant="outlined" InputProps={{ readOnly: true }} fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="FullName" value={selectedRowData?.fullName || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="IFSC" value={selectedRowData?.ifsc || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Rent" value={selectedRowData?.rent || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Fooding" value={selectedRowData?.fooding || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Education" value={selectedRowData?.education || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Health" value={selectedRowData?.health || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Travelling" value={selectedRowData?.travelling || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Entertainment" value={selectedRowData?.entertainment || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Others" value={selectedRowData?.others || 'N/A'} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Income" value={selectedRowData?.income || 'N/A'} variant="outlined" fullWidth />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', marginTop: '16px' }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setIncomeopen(false)} // Close modal
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                padding: '8px 16px'
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={PronoteDocopen} onClose={() => setPronoteDocopen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            width: '80%',
            maxHeight: '80%',
            overflowY: 'auto',
            padding: '16px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              marginBottom: '16px',
              textAlign: 'center',
              color: '#D32F2F'
            }}
          >
            Document Information
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['S.NO', 'Creator', 'FiCode', 'Doc Name', 'Remarks', 'Action'].map((header, index) => (
                    <TableCell
                      key={header.replace(/\s/g, '_')}
                      sx={{
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        background: 'linear-gradient(90deg, #FF4C4C, #FF7F7F)',
                        color: 'white',
                        textAlign: 'center'
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedRowData ? (
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center' }}>1</TableCell>
                    <TableCell>{selectedRowData.creator || 'N/A'}</TableCell>
                    <TableCell>{selectedRowData.fiCode || 'N/A'}</TableCell>
                    <TableCell>{selectedRowData.document || 'N/A'}</TableCell>
                    <TableCell>{selectedRowData.remarks || 'N/A'}</TableCell>

                    <TableCell sx={{ textAlign: 'center' }}>
                      <IconButton onClick={() => handleViewDoc(selectedRowData.docName)}>
                        {/* {selectedRowData.document || 'N/A'} */}
                        <PreviewIcon />
                      </IconButton>
                    </TableCell>

                    {/* <TableCell sx={{ textAlign: 'center' }}>
                                    {loading ? 'Loading...' : <VisibilityIcon />}
                                </TableCell> */}
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Modal open={open} onClose={handleClose}>
            <Box sx={{ ...style, width: '80%', maxHeight: '80vh', overflow: 'auto' }}>
              <img src={currentDoc} alt="Document Preview" style={{ width: '100%' }} />
            </Box>
          </Modal>

          <Box sx={{ textAlign: 'center', marginTop: '16px' }}>
            <Button variant="contained" color="error" onClick={() => setPronoteDocopen(false)}>
              {' '}
              {/* Close modal button */}
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={GetAllDocopen} onClose={handleGetAllDocClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            width: '50%',
            padding: '16px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              marginBottom: '16px',
              textAlign: 'center',
              color: '#1976D2'
            }}
          >
            Documents
          </Typography>

          {/* Display FiCode and Creator from the selected row */}
          {/* {selectedRow && (
          <>
            <Typography>FiCode: {selectedRow.FiCode}</Typography>
            <Typography>Creator: {selectedRow.Creator}</Typography>
          </>
        )} */}

          {/* Document Tabs */}
          <Card
            variant="outlined"
            sx={{
              height: { xs: '400px', sm: '500px', md: '550px' },
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              marginTop: '16px'
            }}
          >
            <Tabs
              value={selectedType}
              onChange={(event, newValue) => setSelectedType(newValue)}
              textColor="primary"
              indicatorColor="primary"
              sx={{ mb: 1 }}
            >
              <Tab label="Borrower Documents" value="borrower" />
              <Tab label="Co-Borrower Documents" value="co-borrower" />
            </Tabs>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: '10px' }}>
              <List>
                {loading ? (
                  <ListItem>
                    <ListItemText primary="Loading..." />
                  </ListItem>
                ) : filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc, index) => (
                    <ListItem key={index} divider>
                      <ListItemIcon sx={{ color: doc.filePath ? 'green' : 'red', minWidth: '40px' }}>
                        <Description />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          doc.filePath ? (
                            <Link
                              onClick={() => handleOpenModal(doc)} // Define handleOpenModal function for functionality
                              sx={{ cursor: 'pointer', color: 'green', textDecoration: 'underline', fontWeight: 'bold' }}
                            >
                              {doc.docName}
                            </Link>
                          ) : (
                            doc.docName
                          )
                        }
                        secondary={doc.docFilePath ? `File Path: ${doc.docFilePath}` : 'File not available'}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No documents found." />
                  </ListItem>
                )}
              </List>
            </Box>
          </Card>

          <Box sx={{ textAlign: 'center', marginTop: '16px' }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleGetAllDocClose} // Close the modal
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                padding: '8px 16px',
                marginLeft: '8px'
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>{selectedDocument?.docName}</DialogTitle>
        <DialogContent>
          {/* If there's a PDF URL, display it in an iframe */}
          {selectedDocument?.filePath && (
            <iframe
              src={`https://predeptest.paisalo.in:8084${selectedDocument.filePath.split(':').pop()}`}
              style={{ width: '100%', height: '500px', border: 'none' }}
              title="Document Preview"
            />
          )}
          {!selectedDocument?.filePath && <p>File not available to view.</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ReadyForAudit;
