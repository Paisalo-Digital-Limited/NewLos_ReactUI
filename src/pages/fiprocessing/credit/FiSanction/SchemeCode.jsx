// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Card,
//   FormControl,
//   Grid,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Tooltip,
//   Typography
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const UpdateScheme = () => {
//   const [creator, setCreator] = useState('');
//   const [code, setCode] = useState('');
//   const columns = [
//     { id: 'sNo', label: 'S.No' },
//     { id: 'code', label: 'Code' },
//     { id: 'creatorName', label: 'Creator Name' },
//     { id: 'aadharId', label: 'Aadhar ID' },
//     { id: 'schemeCode', label: 'Scheme Code' },
//     { id: 'address', label: 'Address' },
//     { id: 'loanAmount', label: 'Loan Amount' },
//     { id: 'loanReason', label: 'Loan Reason' },
//     { id: 'loanDuration', label: 'Loan Duration' },
//     { id: 'Action', label: 'Action' }
//   ];

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
//           Update Scheme Code
//         </Typography>

//         <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: '5px' }}>
//           <Grid item xs={12} md={3} sm={4}>
//             <FormControl fullWidth size="medium">
//               <InputLabel id="ddlCreator">Creator Name</InputLabel>
//               <Select
//                 id="ddlCreator"
//                 label="creator type"
//                 labelId="creator-label"
//                 value={creator}
//                 onChange={(e) => setCreator(e.target.value)}
//               >
//                 <MenuItem value="">-- Select Creator--</MenuItem>
//                 {/* Add more options dynamically if needed */}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} md={3} sm={4}>
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
//           <Grid item xs={12} sm={5} md={3}>
//             <Button
//               variant="contained"
//               size="large"
//               sx={{
//                 padding: '6px 35px',
//                 fontSize: '15px',
//                 marginRight: '8px',
//                 '&:hover': {
//                   background: 'linear-gradient(135deg,rgb(17, 121, 206),rgb(17, 126, 216) )',
//                   boxShadow: '0px 8px 15px rgba(245, 213, 213, 0.4)',
//                   transform: 'scale(1.05)',
//                   // Apply the hover effects to the icon on button hover
//                   '& .MuiButton-startIcon': {
//                     transform: 'scale(1.2)',
//                     filter: 'drop-shadow(0 4px 8px rgba(255, 255, 255, 0.6))'
//                   }
//                 },
//                 // Base properties for the icon
//                 '& .MuiButton-startIcon': {
//                   fontSize: '24px',
//                   transition: 'transform 0.3s ease, filter 0.3s ease',
//                   filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
//                 }
//               }}
//               startIcon={<SearchIcon />}
//             >
//               Search
//             </Button>
//           </Grid>
//         </Grid>
//       </Card>
//       {/* Second Row */}
//       <Card
//         sx={{
//           boxShadow: 'none',
//           borderRadius: '7px',
//           mb: '10px'
//         }}
//         className="rmui-card"
//       >
//         <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
//           <Table>
//             <TableHead>
//               <TableRow
//                 sx={{
//                   textTransform: 'uppercase',
//                   background: '#ED1C24',
//                   color: 'white',
//                   textAlign: 'center',
//                   fontSize: '10px',
//                   letterSpacing: '1px'
//                 }}
//               >
//                 {columns.map((header, index) => (
//                   <TableCell
//                     key={index}
//                     sx={{
//                       color: 'white',
//                       textAlign: 'center'
//                     }}
//                   >
//                     {header.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             {/* <TableFooter>
//                             <TableRow>
//                                 <TablePagination
//                                     rowsPerPageOptions={[5, 10, 25]}
//                                     count={filteredData.length}
//                                     rowsPerPage={rowsPerPage}
//                                     page={page}
//                                     onPageChange={(event: any, newPage: number) => {
//                                         setPage(newPage);

//                                     }}
//                                     onRowsPerPageChange={(event: {
//                                         target: { value: string };
//                                     }) => {
//                                         const newRowsPerPage = parseInt(event.target.value, 10);
//                                         setRowsPerPage(newRowsPerPage);
//                                         setPage(0);

//                                     }}
//                                 />
//                             </TableRow>
//                         </TableFooter> */}
//           </Table>
//         </TableContainer>
//       </Card>
//     </>
//   );
// };
// export default UpdateScheme;
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { fetchCreatorsApi } from "api/apiCreator"; 
import Swal from "sweetalert2";

// Base URL for your API calls
const BASE_URL = "https://apiuat.paisalo.in:4015/fi/api/";

const UpdateScheme = () => {
  const [Creator, setCreator] = useState("");
  const [FiCode, setCode] = useState("");
  const [creatorList, setCreatorList] = useState([]);
  const [tableData, setTableData] = useState([]);
  
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE1OSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJTQVRJU0ggTUFVUllBICIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImRvdG5ldGRldjFAcGFpc2Fsby5pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTU5IiwiQ3JlYXRvciI6IlZIREVMSEkiLCJFbXBDb2RlIjoiUDAwMDAwMTUzNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IkphbiBXZWQgMjIgMjAyNSAxMTowMjoyMCBBTSIsIm5iZiI6MTczNzQ1NzM0MCwiZXhwIjoxNzM3NTQzNzQwLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTg4IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE4OCJ9.S47nRfcpdhJ37MCq1MX1E8v4Cw-T7gjhjBx4cAq0OQg';

  const columns = [
    { id: "sNo", label: "S.No" },
    { id: "code", label: "Code" },
    { id: "creatorName", label: "Creator Name" },
    { id: "aadharId", label: "Aadhar ID" },
    { id: "schemeCode", label: "Scheme Code" },
    { id: "address", label: "Address" },
    { id: "loanAmount", label: "Loan Amount" },
    { id: "loanReason", label: "Loan Reason" },
    { id: "loanDuration", label: "Loan Duration" },
    { id: "Action", label: "Action" },
  ];

  // Fetch creators
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

  const handleSearch = async () => {
    try {
      if (FiCode && !isNaN(Number(FiCode))) {
        const response = await GetFiData(FiCode, Creator);
        if (response && response.data && response.data.length > 0) {
          setTableData(response.data);
          console.log("Data fetched successfully:", response.data);
        } else {
          setTableData([]);
          Swal.fire({
            icon: "warning",
            title: "No data found",
            text: "No data found for the entered FI Code.",
            confirmButtonText: "OK",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid FI Code",
          text: "Please enter a valid FI Code.",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error fetching data. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  // Fetch FI Data
  const GetFiData = async (fiCode, creator) => {
    try {
      const response = await fetch(`${BASE_URL}FiSanction/GetFiData?fiCode=${fiCode}&creator=${creator}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching FI Data:', error);
      throw error;
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
        <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
          Update Scheme Code
        </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: "5px" }}>
          <Grid item xs={12} md={3} sm={4}>
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
          <Grid item xs={12} md={3} sm={4}>
            <TextField
              fullWidth
              label="Fi Code"
              variant="outlined"
              value={FiCode}
              onChange={(e) => setCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                padding: "12px 14px",
                fontSize: "15px",
                background: "linear-gradient(135deg, #2196F3, #64B5F6)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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

      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  textTransform: "uppercase",
                  background: "#ED1C24",
                  color: "white",
                  textAlign: "center",
                  fontSize: "10px",
                  letterSpacing: "1px",
                }}
              >
                {columns.map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      border: "1px solid rgba(202, 202, 200, 0.5)",
                      color: "white",
                    }}
                  >
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.fiCode}</TableCell>
                    <TableCell>{row.creator}</TableCell>
                    <TableCell>{row.aadharId}</TableCell>
                    <TableCell>{row.p_Phone}</TableCell>
                    <TableCell>{row.permanentAddress}</TableCell>
                    <TableCell>{row.loanAmount}</TableCell>
                    <TableCell>{row.loanReason}</TableCell>
                    <TableCell>{row.loanDuration}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          background: "#64B5F6",
                          "&:hover": { background: "#2196F3" },
                        }}
                      >
                        Action
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default UpdateScheme;