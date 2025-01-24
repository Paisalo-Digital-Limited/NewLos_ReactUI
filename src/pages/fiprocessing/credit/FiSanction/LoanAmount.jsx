
import React, { useState, useEffect } from "react";
import {
    Card,
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdate";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { fetchCreatorsApi } from "api/apiCreator"; 
import Swal from 'sweetalert2';
import axios from 'axios';  // Importing axios for API requests

const ModifyLoanAmount = () => {
    const [beforeLoanCreator, setBeforeLoanCreator] = useState("");
    const [afterSanctionCreator, setAfterSanctionCreator] = useState("");
    const [code, setCode] = useState("");
    const [Fiamount, setFiAmount] = useState("");
    const [Sanctionamount, setSanctionamount] = useState("");
    const [showSanctionDetails, setShowSanctionDetails] = useState(false);
    const [Fi_Id, setFiId] = useState("");
    const [FiCode, setFiCode] = useState("");
    const [Amount, setbAmount] = useState("");
    const [Creator, setCreator] = useState("");
    const [creatorList, setCreatorList] = useState([]);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE1OSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJTQVRJU0ggTUFVUllBICIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImRvdG5ldGRldjFAcGFpc2Fsby5pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTU5IiwiQ3JlYXRvciI6IlZIREVMSEkiLCJFbXBDb2RlIjoiUDAwMDAwMTUzNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IkphbiBXZWQgMjIgMjAyNSAxMTowMjoyMCBBTSIsIm5iZiI6MTczNzQ1NzM0MCwiZXhwIjoxNzM3NTQzNzQwLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTg4IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE4OCJ9.S47nRfcpdhJ37MCq1MX1E8v4Cw-T7gjhjBx4cAq0OQg';

    //const BASE_URL = "https://apiuat.paisalo.in:4015/fi/api/FiSanction";
    const BASE_URL = "http://localhost:7030/api/FiSanction/UpdateSanctionAmtbefore";

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
        debugger;
        alert(Creator);
        try {
            if (FiCode) {
                const response = await axios.get(`https://localhost:7030/api/FiSanction/GetSanctionAmount`, {
                     headers: {
                            'Content-Type': 'application/json',
                             "Access-Control-Allow-Origin": "*"
                             // Authorization: token,
                        },
                    params: {FiCode: FiCode,Creator: Creator},
                });
                if (response.data.statuscode==200) {
                    setSanctionamount(response.data.data[0].sanctionedAmt);
                    setShowSanctionDetails(true);
                } else {
                    setSanctionamount("");
                    setShowSanctionDetails(false);
                    Swal.fire({
                        icon: "warning",
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
            setSanctionamount("");
            setShowSanctionDetails(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error fetching sanction amount. Please try again.",
                confirmButtonText: "OK",
            });
        }
    };
        //-------update after santion-----------
        const handleUpdateAftersanction = async () => {
            debugger;
            try {
                if (FiCode && Sanctionamount && Creator) {
                    const response = await axios.post(
                        `https://localhost:7030/api/FiSanction/UpdateSanctionAmtAfter`,
                        {
                            FICode: FiCode,    
                            Amount: Sanctionamount,    
                            creator: Creator, 
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                 "Access-Control-Allow-Origin": "*"
                            },
                        }
                    );
                    if (response.data.statuscode==200 && response.data.data>0) {
                        debugger;
                        Swal.fire({
                            title: 'Success!',
                            text: 'Sanction amount updated successfully!',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        });
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: response?.data.message || 'Failed to update the sanction amount.',
                            icon: 'error',
                            confirmButtonText: 'Try Again',
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'Please enter valid FI Code, Amount, and Creator.',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (err) {
                console.error("Error updating sanction amount:", err);
                Swal.fire({
                    title: 'Error!',
                    text: 'Error updating sanction amount.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        };

//--------update before sanction
    const handleUpdate = async () => {
        debugger;
        try {
            // Ensure all required fields are present
            if (FiCode && Amount && Creator) {
                debugger;
                
                // Make the API call
                const response = await axios.post(
                    `https://localhost:7030/api/FiSanction/UpdateSanctionAmtbefore`,
                    {
                        FICode: FiCode,    
                        Amount: Amount,    
                        creator: Creator, 
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                             "Access-Control-Allow-Origin": "*"
                            // Add any other headers if required, such as authorization tokens
                        },
                        // httpsAgent: new https.Agent({  
                        //     rejectUnauthorized: false, // Ignore SSL certificate errors
                        // }),
                    }
                );
    
                // Handle the response
                if (response.data.statuscode==200 && response.data.data>0) {
                    debugger;
                    Swal.fire({
                        title: 'Success!',
                        text: 'Sanction amount updated successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: response?.data.message || 'Failed to update the sanction amount.',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                }
            } else {
                Swal.fire({
                    title: 'Warning!',
                    text: 'Please enter valid FI Code, Amount, and Creator.',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                });
            }
        } catch (err) {
            console.error("Error updating sanction amount:", err);
            Swal.fire({
                title: 'Error!',
                text: 'Error updating sanction amount.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    //     debugger;
    //     try {
    //         if (FiCode && Amount && Creator) {
    //             debugger;
                
    //             const response = await axios.post(`https://localhost:7030/api/FiSanction/UpdateSanctionAmtbefore`, {
    //                 FICode: FiCode,
    //                 Amount: Amount,
    //                 creator: Creator,
    //             }, {
    //                 // headers: {
    //                 //     'Content-Type': 'application/json',
    //                 //      "Access-Control-Allow-Origin": "*"
    //                 //      // Authorization: token,
    //                 // },
    //             });

    //             if (response && response.data.statuscode === 20) {
    //                 debugger;
    //                 Swal.fire({
    //                     title: 'Success!',
    //                     text: 'Sanction amount updated successfully!',
    //                     icon: 'success',
    //                     confirmButtonText: 'OK',
    //                 });
    //             } else {
    //                 Swal.fire({
    //                     title: 'Error!',
    //                     text: response?.data.message || 'Failed to update the sanction amount.',
    //                     icon: 'error',
    //                     confirmButtonText: 'Try Again',
    //                 });
    //             }
    //         } else {
    //             Swal.fire({
    //                 title: 'Warning!',
    //                 text: 'Please enter valid FI Code, Amount, and Creator.',
    //                 icon: 'warning',
    //                 confirmButtonText: 'OK',
    //             });
    //         }
    //     } catch (err) {
    //         console.error("Error updating sanction amount:", err);
    //         Swal.fire({
    //             title: 'Error!',
    //             text: 'Error updating sanction amount.',
    //             icon: 'error',
    //             confirmButtonText: 'Try Again',
    //         });
    //     }
    // };

    const handleDelete = async () => {
        const fiId = Number(Fi_Id);
    
        if (isNaN(fiId)) {
            console.error("Invalid input: FI_Id is not a valid number.");
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
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
                const response = await axios.delete(`${BASE_URL}/DeleteSanctionAmt`, {
                    headers: {
                        Authorization: token,
                    },
                    data: { fiId },
                });

                if (response && response.data.success) {
                    setShowSanctionDetails(false);
                    setFiId("");
                    Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Sanction amount has been successfully deleted.",
                        confirmButtonText: "OK",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Deletion Failed",
                        text: response?.data.message || "Something went wrong while deleting the sanction amount.",
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
            {/* Card for modifying before loan amount */}
            <Card
                sx={{
                    boxShadow: "none",
                    borderRadius: "7px",
                    mb: "25px",
                    padding: { xs: "18px", sm: "20px", lg: "25px" },
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                    Modify Before Loan Amount
                </Typography>
                <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: "5px" }}>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="FI Code"
                            value={FiCode}
                            onChange={(e) => setFiCode(e.target.value)}
                            variant="outlined"
                            size="medium"
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
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

                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="Sanction Amount"
                            value={Amount}
                            onChange={(e) => setbAmount(e.target.value)}
                            variant="outlined"
                            size="medium"
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Button
                            variant="contained"
                            size="medium"
                            sx={{
                                padding: "12px 12px",
                                fontSize: "15px",
                                background: "linear-gradient(135deg, #E91E63, #F06292)",
                                borderRadius: "8px",
                                "&:hover": {
                                    background: "linear-gradient(135deg, rgb(175, 57, 96), rgb(187, 65, 106))",
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

            {/* Card for modifying after sanction amount */}
            <Card
                sx={{
                    boxShadow: "none",
                    borderRadius: "7px",
                    mb: "25px",
                    padding: { xs: "18px", sm: "20px", lg: "25px" },
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                    Modify After Sanction Amount
                </Typography>
                <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
                    <Grid item xs={12} md={3}>
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
                   
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="FI Code"
                            value={FiCode}
                            onChange={(e) => setFiCode(e.target.value)}
                            variant="outlined"
                            size="medium"
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Button
                            variant="contained"
                            size="medium"
                            sx={{
                                padding: "12px 14px",
                                fontSize: "15px",
                                background: "linear-gradient(135deg, #2196F3, #64B5F6)",
                                borderRadius: "8px",
                                "&:hover": {
                                    background: "linear-gradient(135deg, rgb(30, 119, 192), rgb(54, 141, 212))",
                                },
                            }}
                            startIcon={<SearchIcon />}
                            onClick={handleSearch}
                        >
                            SEARCH
                        </Button>
                    </Grid>
                </Grid>

                {showSanctionDetails && (
                    <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginTop: "20px" }}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Amount"
                                variant="outlined"
                                size="medium"
                                value={Sanctionamount}
                                onChange={(e) => setSanctionamount(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <Button
                                variant="contained"
                                size="medium"
                                sx={{
                                    padding: "10px 12px",
                                    fontSize: "15px",
                                    background: "linear-gradient(135deg, #E91E63, #F06292)",
                                    borderRadius: "8px",
                                }}
                                startIcon={<SecurityUpdateGoodIcon />}
                                onClick={handleUpdateAftersanction}
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
                )}
            </Card>
        </>
    );
};

export default ModifyLoanAmount;