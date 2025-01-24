// import React, { useState } from 'react';
// import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
// import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdate';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// const SanctionUpdate = () => {
//   const [creator, setCreator] = useState('');
//   const [code, setCode] = useState('');

//   return (
//     <>
//       <Card
//         sx={{
//           boxShadow: 'none',
//           borderRadius: '7px',
//           mb: '10px'
//         }}
//         className="rmui-card"
//       >
//         {/* Form Header */}
//         <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
//           Sanction Update
//         </Typography>
//         {/* First Row */}
//         <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: '5px' }}>
//           <Grid item xs={12} md={2} sm={4}>
//             <FormControl fullWidth size="medium">
//               <InputLabel id="ddlCreator">Creator</InputLabel>
//               <Select
//                 id="ddlCreator"
//                 label="creator type "
//                 labelId="creator-label"
//                 value={creator}
//                 onChange={(e) => setCreator(e.target.value)}
//               >
//                 <MenuItem value="">--Select Creator--</MenuItem>
//                 {/* Add more options dynamically if needed */}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} md={2} sm={4}>
//             <TextField
//               fullWidth
//               label="Fi code"
//               variant="outlined"
//               size="medium"
//               id="Code"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//             />
//           </Grid>

//           <Grid item xs={12} sm={3}>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <Box sx={{ display: 'flex', gap: '16px' }}>
//                 <DatePicker
//                   label="Disbursement Date"
//                   // value={searchParams.fromDate}
//                   // onChange={(newValue) => {
//                   //     handleInputChange("fromDate", newValue);
//                   //     setErrors((prev) => ({ ...prev, fromDate: "" })); // Clear error on change
//                   // }}
//                   slots={{
//                     textField: (params) => (
//                       <TextField
//                         {...params}
//                         fullWidth
//                         // error={!!errors.fromDate}
//                         // helperText={errors.fromDate}
//                       />
//                     )
//                   }}
//                 />
//               </Box>
//             </LocalizationProvider>
//           </Grid>
//           <Grid item xs={12} sm={3}>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <Box sx={{ display: 'flex', gap: '16px' }}>
//                 <DatePicker
//                   label="Start Date"
//                   // value={searchParams.fromDate}
//                   // onChange={(newValue) => {
//                   //     handleInputChange("fromDate", newValue);
//                   //     setErrors((prev) => ({ ...prev, fromDate: "" })); // Clear error on change
//                   // }}
//                   slots={{
//                     textField: (params) => (
//                       <TextField
//                         {...params}
//                         fullWidth
//                         // error={!!errors.fromDate}
//                         // helperText={errors.fromDate}
//                       />
//                     )
//                   }}
//                 />
//               </Box>
//             </LocalizationProvider>
//           </Grid>
//           <Grid item xs={12} sm={2}>
//             <Button
//               variant="contained"
//               size="medium"
//               sx={{
//                 padding: '6px 18px',
//                 fontSize: '15px',
//                 background: 'linear-gradient(135deg, #E91E63, #F06292)',
//                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                 '&:hover': {
//                   background: 'linear-gradient(135deg,rgb(175, 57, 96),rgb(187, 65, 106) )',
//                   boxShadow: '0px 8px 15px rgba(245, 213, 213, 0.4)',
//                   transform: 'scale(1.05)'
//                 },
//                 // Base properties for the icon
//                 '& .MuiButton-startIcon': {
//                   fontSize: '24px'
//                 }
//               }}
//               startIcon={<SecurityUpdateGoodIcon />}
//             >
//               Update
//             </Button>
//           </Grid>
//         </Grid>
//       </Card>
//     </>
//   );
// };
// export default SanctionUpdate;

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdate";
import { fetchCreatorsApi } from "api/apiCreator"; 
import Swal from 'sweetalert2';
import axios from 'axios';

const SanctionUpdate = () => {
  const [Creator, setCreator] = useState("");
  const [creatorList, setCreatorList] = useState([]);
  const [FiCode, setFiCode] = useState("");
  const [Amount, setAmount] = useState("");
  const [SanctionedDate, setSanctionedDate] = useState("");
  const [StartDate, setStartDate] = useState("");

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE1OSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJTQVRJU0ggTUFVUllBICIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImRvdG5ldGRldjFAcGFpc2Fsby5pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTU5IiwiQ3JlYXRvciI6IlZIREVMSEkiLCJFbXBDb2RlIjoiUDAwMDAwMTUzNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IkphbiBXZWQgMjIgMjAyNSAxMTowMjoyMCBBTSIsIm5iZiI6MTczNzQ1NzM0MCwiZXhwIjoxNzM3NTQzNzQwLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTg4IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE4OCJ9.S47nRfcpdhJ37MCq1MX1E8v4Cw-T7gjhjBx4cAq0OQg';

  const BASE_URL = "https://apiuat.paisalo.in:4015/fi/api/FiSanction/";

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const data = await fetchCreatorsApi(token);
        setCreatorList(data);
      } catch (error) {
        console.error("Error fetching creator data:", error);
      }
    };

    fetchCreatorData();
  }, [token]);


  const handleUpdate = async () => {
    // Validate inputs
    if (!FiCode.trim() || !Creator.trim() || !SanctionedDate || !StartDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required fields.',
      });
      return;
    }
  
    try {
      // Call the API with the correct parameters for updating the modification date
      const response = await axios.post(
        `${BASE_URL}FiSanctionedUpdateDate`, // The correct endpoint for updating
        {
          fiCode: FiCode,
          creator: Creator,
          sanctionedDate: SanctionedDate,
          startDate: StartDate,
        },
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        }
      );
  
      // Check for a successful HTTP response
      if (response && response.status === 200) {
        if (response.data && response.data.statuscode === 20) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Sanction amount updated successfully!',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: response.data?.message || "Failed to update the sanction amount.",
          });
        }
      }
    } catch (err) {
      console.error("Error updating sanction amount:", err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error updating sanction amount.',
      });
    }
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: "20px", fontWeight: "bold" }}
        >
          Modify Sanction Amount
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3} sm={6}>
            <FormControl fullWidth>
                          <InputLabel id="creator-label">Select Creator</InputLabel>
                          <TextField
                            select
                            value={Creator}
                            onChange={(e) => setCreator(e.target.value)}
                            label="Creator"
                            fullWidth
                          >
                            {creatorList.map((creatorItem, index) => (
                              <MenuItem key={index} value={creatorItem.creator}>
                                {creatorItem.creator}
                              </MenuItem>
                            ))}
                          </TextField>
                        </FormControl>
          </Grid>

          {/* FI Code */}
          <Grid item xs={12} md={3} sm={6}>
            <TextField
              fullWidth
              label="FI Code"
              variant="outlined"
              value={FiCode}
              onChange={(e) => setFiCode(e.target.value)}
            />
          </Grid>

          {/* Sanctioned Date */}
          <Grid item xs={12} md={3} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Sanctioned Date"
              InputLabelProps={{ shrink: true }}
              value={SanctionedDate}
              onChange={(e) => setSanctionedDate(e.target.value)}
            />
          </Grid>

          {/* Start Date */}
          <Grid item xs={12} md={3} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              value={StartDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>

          {/* Update Button */}
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                padding: "10px 12px",
                fontSize: "15px",
                background: "linear-gradient(135deg, #E91E63, #F06292)",
                borderRadius: "8px",
                "&:hover": {
                  background:
                    "linear-gradient(135deg,rgb(175, 57, 96),rgb(187, 65, 106))",
                },
              }}
              startIcon={<SecurityUpdateGoodIcon />}
              onClick={handleUpdate}
            >
              UPDATE
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default SanctionUpdate;