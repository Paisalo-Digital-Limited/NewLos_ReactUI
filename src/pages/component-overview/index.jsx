import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Avatar,
  Button,
  Card,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  MenuItem
} from '@mui/material';
import {
  AccountBalance,
  Assignment,
  Home,
  AssignmentTurnedIn,
  Description,
  AccountCircle,
  Map,
  AttachMoney,
  FileCopy,
  Preview,
  Close
} from '@mui/icons-material';
// import { useActions } from './actionConfigurations';
import AnimateButton from 'components/@extended/AnimateButton';
import ComponentSkeleton from './ComponentSkeleton';
import Details from './details';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from './rightsidebar';
import CloneStatusDialog from './CloneStatusDialog';
import handleGetCrif from './handleGetCrif'; // Adjust the path as necessary
import axios from 'axios';
import axiosInstance from './axiosInstance';
import Swal from 'sweetalert2';
import { fetchCreatorsApi } from './../../api/apiCreator';

function LoanTrackerPage() {
  const [activeList, setActiveList] = useState('BORROWER');
  const [isHovered, setIsHovered] = useState(false);
  const [cloneData, setCloneData] = useState(null); // State to hold clone data
  const [openPopup, setOpenPopup] = useState(false); // State to manage dialog visibility
  const [creator, setCreator] = useState('');
  const [ficode, setFiCode] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState(null);
  const [smCode, setSMMCode] = useState('');
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    AREAS: '',
    Name: '',
    Approved: '',
    Tag: '',
    sourcingDate: '',
    currentStatus: '',
    schemeType: '',
    SmCode: '',
    percentage: '',
    fivPan_Name: '',
    fivAadhar_Name: '',
    fivBankAcc_Name: '',
    Bank_IFCS: '',
    Picture: ''
  });

  // Set fixed values for F_Id and DbName
  const fId = '10057';
  const DbNamevalue = 'PDLERP';

  const handleAccountOpening = async () => {
    setLoading(true);
    const HouseVisitVM = {
      F_Id: fId,
      Type: 'AppliactionForm',
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

        // You can also use the following code to trigger download
        // const link = document.createElement('a');
        // link.href = pdfUrl;
        // link.download = "ApplicationForm.pdf";
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
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

  const handleLoanAgreement = async () => {
    setLoading(true);
    const HouseVisitVM = {
      F_Id: fId,
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

  const handleHouseVisit = async () => {
    setLoading(true);
    const HouseVisitVM = {
      F_Id: fId,
      Type: 'HouseVisit',
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

  // Set fixed values for F_Id and DbName
  const pronotetype = 'Pronote';

  const handlePronote = async () => {
    setLoading(true);
    const HouseVisitVM = {
      F_Id: fId,
      Type: pronotetype,
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
        Swal.fire({
          icon: 'info',
          title: 'No Data Found',
          text: message || 'No data available for the provided inputs.',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message || 'An unexpected error occurred.',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error fetching the report:', error);
      Swal.fire({
        icon: 'error',
        title: 'Request Failed',
        text: 'An error occurred while fetching the PDF report.',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleList = (list) => {
    setActiveList(list);
  };

  const InitilizeCrif = async (ficode, creator) => {
    try {
      const response = await axios.post(`https://apiuat.paisalo.in:4015/fi/api/FIIndex/InitilizeCrif?ficode=${ficode}&creator=${creator}`);

      if (response.status === 200) {
        const message = response.data.data[0]?.Msg; // Optional chaining to avoid errors

        if (message) {
          Swal.fire({
            title: 'Notification',
            text: message, // This will show "Crif can't be generated after case sanctioned" or any other message from the API response
            icon: 'info'
          });
        } else {
          Swal.fire({
            title: 'Success',
            text: response.data.message, // If no specific message in data, show general success message
            icon: 'success'
          });
        }
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message,
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong!',
        icon: 'error'
      });
    }
  };

  // useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axiosInstance.get(
  //           "/FIIndex/FiMasterData?ficode=261863&creator=BAREILLY"

  //         );
  //         if (response.status === 200) {
  //           const data = JSON.parse(response.data.data)[0]; // Assuming the data is an array
  //           setFormData(prev => ({ ...prev, ...data })); // Merge the fetched data with the initial formData
  //         }
  //       } catch (err) {
  //         setError("Failed to fetch data");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const data = await fetchCreatorsApi();
        setCreators(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCreators();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/FIIndex/FiMasterData?ficode=${ficode}&creator=${creator}`);
      if (response.status === 200) {
        const data = JSON.parse(response.data.data)[0];
        setFormData((prev) => ({ ...prev, ...data }));

        // Here, we're directly using the updated ficode and creator
        // Since Rightsidebar will be listening to these values
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCloneStatus = async () => {
    try {
      const response = await axios.get(`https://apiuat.paisalo.in:4015/fi/api/FIIndex/GetCloneStatus?Code=${ficode}&Creator=${creator}`);
      if (response.data.statuscode === 200) {
        setCloneData(response.data.data); // Assuming data is under response.data.data
        setOpenPopup(true); // Open dialog
      } else {
        console.error('Error fetching clone status:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching clone status:', error);
    }
  };

  const handleReadyToPush = async () => {
    try {
      const response = await axios.get(
        `https://apiuat.paisalo.in:4015/fi/api/FIIndex/CheckDocumentsAndReturnStatus?FiCode=${ficode}&Creator=${creator}`
      );
      if (response.status === 200) {
        const data = response.data;
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message,
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('Error fetching the document status:', error);
      Swal.fire({
        title: 'Request Failed',
        text: 'An error occurred while fetching the document status.',
        icon: 'error'
      });
    }
  };

  const handlePDDDocs = async () => {
    try {
      const response = await axios.get(
        `https://apiuat.paisalo.in:4015/fi/api/FIIndex/GetVehicleDocuments?FiCode=${ficode}&Creator=${creator}`
      );
      if (response.status === 200) {
        Swal.fire({
          title: 'Documents Retrieved',
          text: response.data.message,
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message,
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('Error fetching vehicle documents:', error);
      Swal.fire({
        title: 'Request Failed',
        text: 'An error occurred while retrieving vehicle documents.',
        icon: 'error'
      });
    }
  };

  const actionConfigurations = [
    {
      label: 'Account Opening',
      icon: <AccountBalance />,
      color: '#1976d2',
      id: 'account-opening-btn',
      onClick: handleAccountOpening
    },
    {
      label: 'Loan Agreement',
      icon: <Assignment />,
      color: '#d32f2f',
      id: 'loan-agreement-btn',
      onClick: handleLoanAgreement
    },
    {
      label: 'House Visit',
      icon: <Home />,
      color: '#2d7830',
      id: 'house-visit-btn',
      onClick: handleHouseVisit
    },
    {
      label: 'Get Crif',
      icon: <AssignmentTurnedIn />,
      color: '#22d4e6',
      id: 'get-crif-btn',
      onClick: () => handleGetCrif('261863', 'BAREILLY') // Pass the required arguments
    },
    {
      label: 'Generate',
      icon: <Description />,
      color: '#1976d2',
      id: 'generate-btn',
      onClick: () => InitilizeCrif('261863', 'BAREILLY') // Pass the required arguments
    },
    {
      label: 'Account Aggregator',
      icon: <AccountCircle />,
      color: '#d32f2f',
      id: 'account-aggregator-btn'
    },
    {
      label: 'Geo Tagging',
      icon: <Map />,
      color: '#0288d1',
      id: 'geo-tagging-btn'
    },
    {
      label: 'PDD Docs',
      icon: <AttachMoney />,
      color: '#f57c00',
      id: 'pdd-docs-btn',
      onClick: handlePDDDocs // Assign the newly created function here
    },
    {
      label: 'Promote',
      icon: <AssignmentTurnedIn />,
      color: '#43a047',
      id: 'promote-btn',
      onClick: handlePronote // Attach the Pronote handler here
    },
    {
      label: 'Clone Status',
      icon: <FileCopy />,
      color: '#e67e22',
      id: 'clone-status-btn',
      onClick: fetchCloneStatus
    },
    {
      label: 'Ready To Push',
      icon: <Preview />,
      color: '#8e24aa',
      id: 'ready-to-push-btn',
      onClick: handleReadyToPush
    }
  ];

  return (
    <ComponentSkeleton>
      <Grid container>
        <Grid item xs={12}>
          <Card variant="outlined" style={{ padding: '20px', marginBottom: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Select Creator"
                  variant="outlined"
                  select
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                >
                  {creators.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Enter Fi code here"
                  variant="outlined"
                  value={ficode}
                  onChange={(e) => setFiCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography>OR</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Enter Sm code here"
                  variant="outlined"
                  value={smCode}
                  onChange={(e) => setSMMCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <AnimateButton>
                  <Button variant="contained" color="primary" fullWidth startIcon={<SearchIcon />} onClick={handleSubmit}>
                    SEARCH
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {actionConfigurations.map(({ label, icon, color, id, onClick }) => (
                    <Grid item key={id} xs={6} sm={4} md={2}>
                      <AnimateButton>
                        <Button
                          id={id}
                          variant="contained"
                          sx={{
                            backgroundColor: color,
                            color: '#fff',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1
                          }}
                          onClick={onClick} // Attach onClick handler
                        >
                          {icon}
                          {label}
                        </Button>
                      </AnimateButton>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Borrower Details Section */}
        <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {/* Left Content: Borrower Details */}
          <Grid item xs={12} md={9}>
            <Card variant="outlined" style={{ padding: '20px', marginBottom: '20px' }}>
              <Grid container spacing={2}>
                {/* Row 1 */}
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="FO Name"
                    fullWidth
                    variant="outlined"
                    name="AREAS"
                    value={formData.AREAS}
                    onChange={(e) => setFormData({ ...formData, AREAS: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="FO Area"
                    fullWidth
                    variant="outlined"
                    name="Name"
                    value={formData.Name}
                    onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Approved"
                    fullWidth
                    variant="outlined"
                    name="NPR"
                    value={formData.Approved}
                    onChange={(e) => setFormData({ ...formData, NPR: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="FI Tag"
                    fullWidth
                    variant="outlined"
                    name="Tag"
                    value={formData.Tag}
                    onChange={(e) => setFormData({ ...formData, Tag: e.target.value })}
                  />
                </Grid>

                {/* Row 2 */}
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Sourcing Date"
                    fullWidth
                    variant="outlined"
                    name="sourcingDate"
                    value={formData.sourcingDate}
                    onChange={(e) => setFormData({ ...formData, sourcingDate: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Current Status"
                    fullWidth
                    variant="outlined"
                    name="currentStatus"
                    value={formData.currentStatus}
                    onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Scheme Type"
                    fullWidth
                    variant="outlined"
                    name="schemeType"
                    value={formData.SmCode}
                    onChange={(e) => setFormData({ ...formData, schemeType: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Score"
                    fullWidth
                    variant="outlined"
                    name="score"
                    value={formData.Score}
                    onChange={(e) => setFormData({ ...formData, SmCode: e.target.value })}
                  />
                </Grid>

                {/* Row 3 */}
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Percentage"
                    fullWidth
                    variant="outlined"
                    name="percentage"
                    value={formData.percentage}
                    onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Card>

            <Card style={{ padding: '20px', display: 'flex' }}>
              <Grid container spacing={2} style={{ flex: 1 }}>
                {/* Borrower Details Section */}
                <Grid item xs={12} sm={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    Borrower Details
                  </Typography>

                  <Grid container spacing={2}>
                    {/* Row 1: All text fields in one line */}
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Name as Aadhar"
                        fullWidth
                        variant="outlined"
                        name="Aadhar_Name"
                        value={formData.fivAadhar_Name}
                        onChange={(e) => setFormData({ ...formData, fivAadhar_Name: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Name as Pan"
                        fullWidth
                        variant="outlined"
                        name="Pan_Name"
                        value={formData.fivPan_Name}
                        onChange={(e) => setFormData({ ...formData, fivPan_Name: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Name on Bank"
                        fullWidth
                        variant="outlined"
                        name="BankAcc_Name"
                        value={formData.fivBankAcc_Name}
                        onChange={(e) => setFormData({ ...formData, fivBankAcc_Name: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="IFSC"
                        fullWidth
                        variant="outlined"
                        name="Bank_IFCS"
                        value={formData.Bank_IFCS}
                        onChange={(e) => setFormData({ ...formData, Bank_IFCS: e.target.value })}
                      />
                    </Grid>
                  </Grid>

                  {/* Checkboxes for verification */}
                  <Grid container spacing={2} style={{ marginTop: '10px' }}>
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.fivAadhar_Name === formData.fivPan_Name && formData.fivPan_Name === formData.fivBankAcc_Name}
                            onChange={(e) => {
                              // Handle checkbox change if necessary
                            }}
                          />
                        }
                        label="Is verified"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControlLabel control={<Checkbox />} label="OCR verified" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControlLabel control={<Checkbox />} label="KYC Done manually" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControlLabel control={<Checkbox />} label="Is Scanned" />
                    </Grid>
                  </Grid>
                  {/* Divider */}
                  <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                    <Typography variant="subtitle2">BORROWER DETAILS</Typography>
                    <Divider sx={{ width: '100%', margin: '8px 0' }} />
                  </Box>
                </Grid>
                {/* User Image Section */}
                <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
                  <img
                    alt="User Image"
                    sx={{ width: 100, height: 100 }} // Set size for Avatar
                    src={`https://predeptest.paisalo.in:8084${formData.Picture}`}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Right Sidebar */}
          <Sidebar activeList={activeList} handleToggleList={handleToggleList} ficode={ficode} creator={creator} />
        </Grid>

        {/* Sticky Action Bar */}

        {/* Dialog for Clone Status */}
        <CloneStatusDialog open={openPopup} onClose={() => setOpenPopup(false)} cloneData={cloneData} />
        <Box>
          <Details isEditable={isEditable} ficode={ficode} creator={creator} />
        </Box>
      </Grid>
    </ComponentSkeleton>
  );
}

export default LoanTrackerPage;
