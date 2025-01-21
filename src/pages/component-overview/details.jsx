import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Tabs, Tab, TextField, Typography, Divider, MenuItem, Button } from '@mui/material';
import { AddCircleOutline, Edit, Delete, Update } from '@mui/icons-material';
import AnimateButton from 'components/@extended/AnimateButton';
import axios from 'axios';
import axiosInstance from './axiosInstance';
import Swal from 'sweetalert2';

const Details = ({ ficode, creator }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode
  const [formValues, setFormValues] = useState({
    ID: 10094, // Assuming this is known
    Bank_Ac: '3746786234',
    Bank_IFCS: '8324686234',
    Bank_address: ''
  });

  const handleUpdateButtonClick = async () => {
    setLoading(true);

    try {
      // First API Call - GET
      const fiCurrentStatusResponse = await axios.get(
        `https://apiuat.paisalo.in:4015/fi/api/FIIndex/FiCurrentStatus?creator=${creator}&ficode=${ficode}`,
        {
          params: {
            Id: formValues.ID
          }
        }
      );

      if (fiCurrentStatusResponse.status === 200) {
        const data = JSON.parse(fiCurrentStatusResponse.data.data)[0]; // Parse the response data
        console.log(data); // You can see the response

        // Prepare payload for the second API call
        const payload = {
          Id: formValues.ID, // Same ID from the previous response
          Bank_Ac: formValues.Bank_Ac,
          Bank_address: formValues.Bank_address,
          Bank_IFCS: formValues.Bank_IFCS
        };

        // Second API Call - POST
        const updateResponse = await axios.post('https://apiuat.paisalo.in:4015/fi/api/FIIndex/UpdateBeforeSecondESign', payload);

        if (updateResponse.data.statuscode === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Record Updated Successfully!',
            text: 'The record has been successfully updated.',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'An error occurred while updating the record. Please try again.'
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Fetch Current Status',
          text: 'Unable to fetch current status from the server.'
        });
      }
    } catch (error) {
      console.error('Error during update:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'An error occurred while updating the record. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Fetch Data on Component Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/FIIndex/FiMasterData?ficode=${ficode}&creator=${creator}`);
        if (response.status === 200) {
          const data = JSON.parse(response.data.data)[0]; // Assuming the data is an array
          setFormData(data);
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    // Fetch data only if ficode and creator are provided
    if (ficode && creator) {
      fetchData();
    }
  }, [ficode, creator]);

  // General Details Fields
  const generalDetailsFields = [
    { label: 'Full Name', name: 'FNAME', type: 'text' },
    { label: 'Father / Husband Name', name: 'F_FName', type: 'text' },
    { label: 'Gender', name: 'Gender', type: 'select', options: ['Male', 'Female'] },
    { label: 'Date of Birth (MM/DD/YYYY)', name: 'DOB', type: 'date' },
    { label: 'Age', name: 'Age', type: 'number' },
    { label: 'Religion', name: 'Religion', type: 'text' },
    { label: 'Caste', name: 'Cast', type: 'text' },
    { label: 'Scheme Code', name: 'SmCode', type: 'text' },
    { label: 'Apply Loan Amount', name: 'Loan_amount', type: 'number' },
    { label: 'Sanction Amount', name: 'sanctionAmt', type: 'number' },
    { label: 'Loan Duration', name: 'Loan_Duration', type: 'number' },
    { label: 'Loan Reason', name: 'Loan_Reason', type: 'text' }
  ];

  const addressFields = [
    {
      section: 'Resident Address',
      fields: ['Current_State', 'p_Pincode', 'P_Address2', 'P_City', 'P_Phone', 'P_Address3', 'residentPhone', 'residentPhone2']
    },
    {
      section: 'Temporary Address',
      fields: ['Current_State', 'Current_Pincode', 'Current_Address1', 'Current_City', 'Current_Phone', 'Current_Address3']
    }
  ];

  // Personal Details Fields
  const personalDetailsFields = [
    {
      label: 'Business Details',
      name: 'Business_Detail',
      type: 'select',
      options: [
        { label: 'Choose...', value: '' },
        { label: 'NPR', value: 'NPR' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Reject', value: 'Reject' }
      ]
    },
    { label: 'Bank A/C No.', name: 'Bank_Ac', type: 'text' },
    { label: 'IFSC Code', name: 'Bank_IFCS', type: 'text' },
    { label: 'Bank Address', name: 'Bank_address', type: 'text' },
    { label: 'Personal Income', name: 'personalIncome', type: 'text' },
    { label: 'Personal Expense', name: 'PersonalExpense', type: 'text' },
    { label: 'Family Income', name: 'FamilyIncome', type: 'text' },
    { label: 'Family Expense', name: 'FamilyExpense', type: 'text' },
    { label: 'PAN No', name: 'Pan_no', type: 'text' },
    { label: 'Aadhar ID', name: 'Aadhar_no', type: 'text' },
    { label: 'Scheme Code', name: 'SchemeCode', type: 'text' },
    { label: 'Voter ID', name: 'Voter_id', type: 'text' },
    { label: 'Driving License', name: 'DL', type: 'text' },
    {
      label: 'Other Identity Type',
      name: 'otherIdentityType',
      type: 'select',
      options: [
        { label: 'Choose...', value: '' },
        { label: 'Passport', value: 'passport' },
        { label: 'Govt ID', value: 'govtId' },
        { label: 'Other', value: 'other' }
      ]
    },
    { label: 'Cheque No.', name: 'ChequeNo', type: 'text' },
    { label: 'Other Identity No.', name: 'OtherIdentityNo', type: 'text' },
    { label: 'Family Members', name: 'FamilyMamber', type: 'text' },
    { label: 'Main Title Deed', name: 'MainTitleDeed', type: 'text' },
    { label: 'Residence Type', name: 'ResidenceType', type: 'text' },
    { label: 'Litigation Details', name: 'LitigationDetails', type: 'text' },
    { label: 'Guarantor Name', name: 'GurantorName', type: 'text' },
    { label: 'Details of Security Submitted (if any)', name: 'Securitysubmit', type: 'text' },
    { label: 'Rent of House', name: 'rentofhouse', type: 'text' },
    { label: 'Branch Code', name: 'branchCode', type: 'text' }
  ];

  // Financial Details Fields
  const financialDetailsFields = [
    { label: 'Type of Flat', name: 'typeOfFlat', type: 'text' },
    { label: 'Two Wheeler From', name: 'twoWheelerFrom', type: 'text' },
    { label: 'Landmark', name: 'landmark', type: 'text' },
    { label: 'Model', name: 'model', type: 'text' },
    { label: 'Loan for House', name: 'loanForHouse', type: 'text' },
    { label: 'Make', name: 'make', type: 'text' },
    { label: 'EMI Amount', name: 'emiAmount', type: 'text' },
    { label: 'Regd No.', name: 'regdNo', type: 'text' },
    { label: 'Identity of House', name: 'identityOfHouse', type: 'text' },
    { label: 'Four Wheeler From', name: 'fourWheelerFrom', type: 'text' },
    { label: 'How long in city', name: 'howLongInCity', type: 'text' },
    { label: 'How long at Present Place', name: 'howLongAtPresentPlace', type: 'text' },
    { label: 'Area of House', name: 'areaOfHouse', type: 'text' },
    { label: 'House Locality', name: 'houseLocality', type: 'text' },
    { label: 'Vehicle used by', name: 'vehicleUsedBy', type: 'text' },
    { label: 'Interior of House', name: 'interiorOfHouse', type: 'text' },
    { label: 'Cust. Dist. From Off. (KM)', name: 'custDistFromOff', type: 'text' },
    { label: 'Rejection Remark', name: 'rejectionRemark', type: 'text' },
    { label: 'Sourcing Channel', name: 'sourcingChannel', type: 'text' },
    { label: 'Verified Phone', name: 'verifiedPhone', type: 'text' },
    { label: 'FI Report', name: 'fiReport', type: 'text' }
  ];

  // Co-Borrower Details Fields
  const coBorrowerDetailsFields = [
    { label: 'Name', name: 'GrNAME', type: 'text' },
    { label: 'Guardian Name', name: 'grGuardianName', type: 'text' },
    { label: 'Mobile No.', name: 'GrPerMob1', type: 'text' },
    { label: 'Address', name: 'GurAddress', type: 'text' },
    { label: 'Date of Birth', name: 'grDOB', type: 'date' },
    { label: 'Age', name: 'grAge', type: 'number' },
    { label: 'Aadhar ID', name: 'graadharid', type: 'text' },
    { label: 'Permanent City', name: 'grPerCity', type: 'text' },
    {
      label: 'Relation With Borrower',
      name: 'relationWithBorrower',
      type: 'select',
      options: [
        { label: 'Choose Relation', value: '0' },
        { label: 'Son', value: 'Son' },
        { label: 'Husband', value: 'Husband' },
        { label: 'FatherInLaw', value: 'Father In Law' },
        { label: 'Wife', value: 'Wife' },
        { label: 'Mother', value: 'Mother' },
        { label: 'Father', value: 'Father' },
        { label: 'Brother', value: 'Brother' },
        { label: 'Others', value: 'Others' }
      ]
    },
    { label: 'PAN', name: 'grPANNo', type: 'text' },
    { label: 'Voter ID', name: 'guravoterid', type: 'text' }
  ];

  // Function to render fields
  const renderFields = (fields) => (
    <Grid container spacing={2}>
      {fields.map((field, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          {field.options ? (
            <TextField
              label={field.label}
              select
              fullWidth
              variant="outlined"
              value={formData[field.name] || ''}
              onChange={(e) => isEditable && setFormData({ ...formData, [field.name]: e.target.value })}
              disabled={!isEditable} // Disable until editable
            >
              {field.options.map((option, idx) => (
                <MenuItem key={idx} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              label={field.label}
              type={field.type}
              fullWidth
              variant="outlined"
              value={formData[field.name] || ''}
              onChange={(e) => isEditable && setFormData({ ...formData, [field.name]: e.target.value })}
              disabled={!isEditable} // Disable until editable
            />
          )}
        </Grid>
      ))}
    </Grid>
  );

  // Render General Details
  const renderGeneralDetails = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        General Details
      </Typography>
      {renderFields(generalDetailsFields)}
      <Divider sx={{ my: 2 }} />
      {addressFields.map((section, index) => (
        <Box key={index}>
          <Typography variant="subtitle1" gutterBottom>
            {section.section}
          </Typography>
          {renderFields(section.fields.map((field) => ({ label: field, name: field, type: 'text' })))}
        </Box>
      ))}
    </Box>
  );

  // Render Personal Details
  const renderPersonalDetails = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      {renderFields(personalDetailsFields)}
      <Divider sx={{ my: 2 }} />
    </Box>
  );

  // Function to render Financial Details
  const renderFinancialDetails = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Financial Details
      </Typography>
      {renderFields(financialDetailsFields)}
      <Divider sx={{ my: 2 }} />
    </Box>
  );

  // Function to render Co-Borrower Details Section
  const renderCoBorrowerDetails = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Co-Borrower Details
      </Typography>
      {renderFields(coBorrowerDetailsFields)}
      <Divider sx={{ my: 2 }} />
    </Box>
  );

  // Function to render Top-Up Details
  const renderTopUpDetails = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Top-Up Details
      </Typography>
      <Grid container full spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Top Case No." fullWidth variant="outlined" disabled={!isEditable} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="success" fullWidth sx={{ height: '56px' }} disabled={!isEditable}>
            Get Case Status
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Case Status" fullWidth multiline rows={3} variant="outlined" disabled={!isEditable} />
        </Grid>
      </Grid>
    </Box>
  );

  // Handling loading and error states
  // if (loading) return <Typography>Loading...</Typography>;
  // if (error) return <Typography color="error">{error}</Typography>;

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderGeneralDetails();
      case 1:
        return renderPersonalDetails();
      case 2:
        return renderFinancialDetails();
      case 3:
        return renderCoBorrowerDetails();
      case 4:
        return renderTopUpDetails();
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        boxShadow: 'none',
        borderRadius: '7px',
        padding: { xs: '16px', sm: '24px', lg: '32px' }
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={2} style={{ display: 'flex' }}>
          <Tabs orientation="vertical" value={activeTab} onChange={handleTabChange} sx={{ borderRight: 1, borderColor: 'divider' }}>
            <Tab label="General Details" />
            <Tab label="Personal Details" />
            <Tab label="Financial Details" />
            <Tab label="Co-Borrower Details" />
            <Tab label="Top Up Details" />
          </Tabs>
        </Grid>
        <Grid item xs={12} sm={9} md={10}>
          {renderTabContent()}
        </Grid>
      </Grid>
      <Box
        sx={{
          position: 'fixed',
          top: '50%', // center vertically
          right: 0,
          transform: 'translateY(-50%)',
          backgroundColor: '#fff',
          boxShadow: 2,
          borderRadius: '8px 0 0 8px',
          padding: 2,
          zIndex: 1000
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimateButton>
          <Button variant="contained" color="primary" fullWidth sx={{ marginBottom: '10px' }}>
            <AddCircleOutline sx={{ marginRight: 1 }} />
            Add
          </Button>
        </AnimateButton>
        <AnimateButton>
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ marginBottom: '10px' }}
            onClick={() => setIsEditable((prev) => !prev)}
          >
            {/* {isEditable ? "Save Changes" : "Edit"} */}
            <Edit sx={{ marginRight: 1 }} />
            Edit
          </Button>
        </AnimateButton>
        <AnimateButton>
          <Button variant="contained" color="secondary" fullWidth sx={{ marginBottom: '10px' }}>
            <Delete sx={{ marginRight: 1 }} />
            Delete
          </Button>
        </AnimateButton>
        <AnimateButton>
          <Button variant="contained" color="info" fullWidth sx={{ marginBottom: '10px' }} onClick={handleUpdateButtonClick}>
            <Update sx={{ marginRight: 1 }} />
            Update
          </Button>
        </AnimateButton>
      </Box>
    </Card>
  );
};

export default Details;
