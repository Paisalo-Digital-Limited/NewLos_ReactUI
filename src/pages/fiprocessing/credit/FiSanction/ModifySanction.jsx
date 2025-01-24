// import React, { useState } from 'react';
// import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdate';

// const ModifySanctionPage = () => {
//   const [creator, setCreator] = useState('');
//   const [code, setCode] = useState('');
//   const [amount, setAmount] = useState('');

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
//           Modify Sanction Amount
//         </Typography>
//         {/* First Row */}
//         <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: '5px' }}>
//           <Grid item xs={12} md={3} sm={3}>
//             <FormControl fullWidth>
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
//           <Grid item xs={12} md={3} sm={3}>
//             <TextField
//               fullWidth
//               label="code"
//               variant="outlined"
//               size="medium"
//               id="Code"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12} md={3} sm={7}>
//             <Button
//               variant="contained"
//               size="medium"
//               sx={{
//                 padding: '6px 18px',
//                 fontSize: '15px',
//                 background: 'linear-gradient(135deg,rgb(17, 121, 206),rgb(17, 126, 216))',
//                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                 '&:hover': {
//                   background: 'linear-gradient(135deg,rgb(30, 119, 192),rgb(54, 141, 212))',
//                   boxShadow: '0px 8px 15px rgba(238, 222, 222, 0.4)',
//                   transform: 'scale(1.05)'
//                 },
//                 '& .MuiButton-startIcon': {
//                   fontSize: '21px'
//                 }
//               }}
//               startIcon={<SearchIcon />}
//               onClick={() => console.log('Search Clicked')}
//               // Add your styling here
//             >
//               Search
//             </Button>
//           </Grid>
//         </Grid>
//       </Card>
//       {/* Second Row */}

//       <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginTop: '15px' }}>
//         <Grid item xs={12} md={3} sm={3} hidden>
//           <TextField
//             fullWidth
//             id="Amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             size="medium"
//             label="sanction Amount"
//             variant="outlined"
//           />
//         </Grid>
//         <Grid item xs={12} md={3} sm={3} hidden>
//           <Button
//             variant="contained"
//             size="medium"
//             sx={{
//               padding: '6px 18px',
//               fontSize: '15px',
//               background: 'linear-gradient(135deg, #E91E63, #F06292)',
//               boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//               '&:hover': {
//                 background: 'linear-gradient(135deg,rgb(175, 57, 96),rgb(187, 65, 106) )',
//                 boxShadow: '0px 8px 15px rgba(245, 213, 213, 0.4)',
//                 transform: 'scale(1.05)'
//               },
//               // Base properties for the icon
//               '& .MuiButton-startIcon': {
//                 fontSize: '24px'
//               }
//             }}
//             startIcon={<SecurityUpdateGoodIcon />}
//           >
//             Update
//           </Button>

//           <Button
//             variant="contained"
//             size="medium"
//             sx={{
//               padding: '6px 18px',
//               fontSize: '15px',
//               marginLeft: '30px',
//               background: 'linear-gradient(135deg,rgb(233, 30, 30),rgb(235, 65, 65))',
//               boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//               '&:hover': {
//                 background: 'linear-gradient(135deg,rgb(219, 59, 59),rgb(216, 51, 51) )',
//                 boxShadow: '0px 8px 15px rgba(245, 213, 213, 0.4)',
//                 transform: 'scale(1.05)'
//               },
//               // Base properties for the icon
//               '& .MuiButton-startIcon': {
//                 fontSize: '24px'
//               }
//             }}
//           >
//             Delete Sanction
//           </Button>
//         </Grid>

//         {/* <Grid item xs={12} sm={3}>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   size="large"
//                   onClick={handleDelete}
//                   sx={{ marginTop: 2 }}
//                 >
//                   <span style={{ marginRight: 8 }}>Delete Sanction</span>
//                   <i className="fa fa-trash" />
//                 </Button>
//               </Grid> */}
//       </Grid>
//     </>
//   );
// };
// export default ModifySanctionPage;
import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  FormControl,
  TextField,
  MenuItem,
  Typography,
  Button,
  InputLabel 
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdate";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { fetchCreatorsApi } from "api/apiCreator"; 
import Swal from "sweetalert2";
import axios from "axios"; // Importing axios to perform API requests

const BASE_URL = "https://apiuat.paisalo.in:4015/fi/api/FiSanction/";

const ModifySanctionPage = () => {
  const [Creator, setCreator] = useState("");
  const [creatorList, setCreatorList] = useState([]);
  const [Fi_Id, setFiId] = useState("");
  const [amount, setAmount] = useState("");
  const [showSanctionDetails, setShowSanctionDetails] = useState(false);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE1OSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJTQVRJU0ggTUFVUllBICIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImRvdG5ldGRldjFAcGFpc2Fsby5pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTU5IiwiQ3JlYXRvciI6IlZIREVMSEkiLCJFbXBDb2RlIjoiUDAwMDAwMTUzNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IkphbiBXZWQgMjIgMjAyNSAxMTowMjoyMCBBTSIsIm5iZiI6MTczNzQ1NzM0MCwiZXhwIjoxNzM3NTQzNzQwLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTg4IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE4OCJ9.S47nRfcpdhJ37MCq1MX1E8v4Cw-T7gjhjBx4cAq0OQg';

  // Fetch creator list on component mount
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


  // Handle search action
  const handleSearch = async () => {
    try {
      if (Fi_Id && !isNaN(Number(Fi_Id))) {
        const response = await axios.get(`${BASE_URL}GetSanctionAmount`, {
          headers: {
            Authorization: token,
          },
          params: {
            fiId: Number(Fi_Id),
          },
        });
        if (response.data && response.data.length > 0) {
          setAmount(response.data[0].sanctionedAmt.toString());
          setShowSanctionDetails(true);
          Swal.fire({
            icon: "success",
            title: "Data Found",
            text: "Sanction details retrieved successfully.",
            confirmButtonText: "OK",
          });
        } else {
          setAmount("");
          setShowSanctionDetails(false);
          Swal.fire({
            icon: "error",
            title: "No Data Found",
            text: "No data found for the entered FI_Id.",
            confirmButtonText: "OK",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid FI_Id",
          text: "Please enter a valid FI_Id.",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error(err);
      setAmount("");
      setShowSanctionDetails(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error fetching sanction amount. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  // Handle update action
  const handleUpdate = async () => {
    try {
      if (Fi_Id && !isNaN(Number(Fi_Id)) && amount) {
        const updatedAmount = parseFloat(amount);
        const response = await axios.post(
          `${BASE_URL}UpdateSanctionAmt`,
          {
            fiId: Number(Fi_Id),
            sanctionedAmt: updatedAmount,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.data && response.data.statuscode === 20) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Sanction amount updated successfully.",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: response.data?.message || "Failed to update the sanction amount.",
            confirmButtonText: "OK",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Input",
          text: "Please enter valid FI_Id and Amount.",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error updating sanction amount. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  // Handle delete action
  const handleDelete = async () => {
    const fiId = Number(Fi_Id);

    if (isNaN(fiId)) {
      console.error("Invalid input: FI_Id is not a valid number.");
      Swal.fire({
        icon: "error",
        title: "Invalid FI_Id",
        text: "Please enter a valid FI_Id.",
        confirmButtonText: "OK",
      });
      return;
    }

    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this sanction amount?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await axios.delete(`${BASE_URL}DeleteSanctionAmt`, {
          headers: {
            Authorization: token,
          },
          data: {
            fiId: fiId,
          },
        });

        if (response.data && response.data.success) {
          console.log("Deletion successful:", response.data.message || response.data);
          setShowSanctionDetails(false);
          setFiId("");

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Sanction amount has been successfully deleted.",
            confirmButtonText: "OK",
          });
        } else {
          console.error("Deletion failed:", response.data?.message || "Unexpected response format.");
          Swal.fire({
            icon: "error",
            title: "Deletion Failed",
            text: response.data?.message || "Something went wrong while deleting the sanction amount.",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error("Error while deleting sanction amount:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while deleting the sanction amount. Please try again.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <>
      {/* Search Section */}
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
          Modify Sanction 
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: "5px" }}>
          <Grid item xs={12} md={3} sm={3}>
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
          <Grid item xs={12} md={3} sm={3}>
            <TextField
              fullWidth
              label="FI_Id"
              variant="outlined"
              size="medium"
              value={Fi_Id} 
              onChange={(e) => setFiId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={7}>
            <Button
              variant="contained"
              size="small"
              sx={{
                padding: "12px 14px",
                fontSize: "15px",
                background: "linear-gradient(135deg, #2196F3, #64B5F6)",
                borderRadius: "8px",
                "&:hover": {
                  background: "linear-gradient(135deg,rgb(30, 119, 192),rgb(54, 141, 212))",
                },
              }}
              startIcon={<SearchIcon />}
              onClick={handleSearch} 
            >
              SEARCH
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Sanction Details Section (Visible After Search) */}
      {showSanctionDetails && (
        <Card
          sx={{
            boxShadow: "none",
            borderRadius: "7px",
            mb: "25px",
            padding: { xs: "18px", sm: "20px", lg: "25px" },
          }}
        >
          <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
            <Grid item xs={12} md={3} sm={3}>
              <TextField
                fullWidth
                id="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)} 
                size="medium"
                label="Sanction Amount"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={1} sm={3}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  padding: "10px 12px",
                  fontSize: "15px",
                  background: "linear-gradient(135deg, #E91E63, #F06292)",
                  borderRadius: "8px",
                  "&:hover": {
                    background: "linear-gradient(135deg,rgb(175, 57, 96),rgb(187, 65, 106))",
                  },
                }}
                startIcon={<SecurityUpdateGoodIcon />}
                onClick={handleUpdate}
              >
                UPDATE
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  padding: "10px 12px",
                  fontSize: "15px",
                  background: "linear-gradient(135deg, rgb(233, 30, 30), rgb(206, 22, 22))",
                  borderRadius: "8px",
                }}
                startIcon={<DeleteOutlineIcon />}
                onClick={handleDelete}
              >
                DELETE
              </Button>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
};

export default ModifySanctionPage;