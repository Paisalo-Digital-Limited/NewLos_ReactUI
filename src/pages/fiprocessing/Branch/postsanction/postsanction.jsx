// import React, { useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   IconButton,
//   Modal,
//   Box,
//   Typography,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Card,
//   Dialog,
//   TextField,
//   Grid,
//   Tooltip,
//   TableFooter,
//   TablePagination
// } from '@mui/material';
// import { CheckCircle, HourglassBottom } from '@mui/icons-material';
// import { CloudUpload, Close, Visibility, DocumentScanner } from '@mui/icons-material';
// import SearchIcon from '@mui/icons-material/Search';
// import RepeatIcon from '@mui/icons-material/Repeat';
// import AddIcon from '@mui/icons-material/Add';
// import Swal from 'sweetalert2';
// import AnimateButton from 'components/@extended/AnimateButton';
// import SendIcon from '@mui/icons-material/Send';

// // Example static data
// const staticData = [
//   {
//     SmCode: 'SM001',
//     FiCode: 12345,
//     Creator: 'User1',
//     Branch_Code: 'BR001',
//     Group_code: 'G001',
//     BorrSignStatus: 'Y',
//     Doc: 'Document1',
//     Comments: 'Initial Submission'
//   },
//   {
//     SmCode: 'SM002',
//     FiCode: 12346,
//     Creator: 'User2',
//     Branch_Code: 'BR002',
//     Group_code: 'G002',
//     BorrSignStatus: 'N',
//     Doc: 'Document2',
//     Comments: 'Pending Approval'
//   }
// ];

// const PostSanction = () => {
//   const [filterOption, setFilterOption] = useState('');
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [fiCode, setFiCode] = useState('');
//   const [creator, setCreator] = useState('');
//   const [data, setData] = useState(staticData); // Use static data
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [openModal, setOpenModal] = useState(false);
//   const [openAddModal, setOpenAddModal] = useState(false);
//   const [newRemarks, setNewRemarks] = useState('');
//   const [file, setFile] = useState(null);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [openImageModal, setOpenImageModal] = useState(false);

//   // Handle filter change
//   const handleFilterChange = (event) => {
//     setFilterOption(event.target.value);
//     // Clear other input fields when filter option changes
//     setFromDate('');
//     setToDate('');
//     setFiCode('');
//     setCreator('');
//   };

//   // Search button should be enabled based on filter option
//   const isSearchEnabled = () => {
//     if (filterOption === 'date') {
//       return fromDate && toDate; // Ensure both dates are set
//     } else if (filterOption === 'ficode') {
//       return fiCode && creator; // Ensure FiCode and Creator are set
//     }
//     return false; // Disable button for unselected filter options
//   };

//   // Move to Audit handler (mock behavior)
//   const handleMoveToAudit = (fiCode, creator, borrSignStatus) => {
//     if (borrSignStatus !== 'Y') {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Warning!',
//         text: '2nd eSign is not done. Please complete the eSign process before moving to Audit.'
//       });
//       return;
//     }

//     Swal.fire({
//       icon: 'success',
//       title: 'Success',
//       text: 'Successfully moved to Audit.'
//     });
//   };

//   // Display document info modal
//   const handleDocClick = () => {
//     setOpenModal(true);
//   };

//   return (
//     <div>
//       <Card sx={{ boxShadow: 'none', borderRadius: '7px', mb: 3, p: 2 }}>
//         <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
//           <Grid item></Grid>
//         </Grid>

//         <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
//           <Grid item xs={12} sm={6} md={3}>
//             <FormControl fullWidth size="medium">
//               <InputLabel>Search By</InputLabel>
//               <Select value={filterOption} onChange={handleFilterChange} label="Search By" size="medium">
//                 <MenuItem value="date">Date</MenuItem>
//                 <MenuItem value="ficode">FiCode & Creator</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {filterOption === 'date' && (
//             <>
//               <Grid item xs={12} sm={6} md={3}>
//                 <TextField
//                   fullWidth
//                   label="From Date"
//                   type="date"
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                   InputLabelProps={{ shrink: true }}
//                   variant="outlined"
//                   size="medium"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <TextField
//                   fullWidth
//                   label="To Date"
//                   type="date"
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                   InputLabelProps={{ shrink: true }}
//                   variant="outlined"
//                   size="medium"
//                 />
//               </Grid>
//             </>
//           )}

//           {filterOption === 'ficode' && (
//             <>
//               <Grid item xs={12} sm={6} md={3}>
//                 <TextField
//                   fullWidth
//                   label="FiCode"
//                   value={fiCode}
//                   onChange={(e) => setFiCode(e.target.value)}
//                   variant="outlined"
//                   size="medium"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <TextField
//                   fullWidth
//                   label="Creator"
//                   value={creator}
//                   onChange={(e) => setCreator(e.target.value)}
//                   variant="outlined"
//                   size="medium"
//                 />
//               </Grid>
//             </>
//           )}

//           <Grid item xs={12} sm={8} md={2}>
//             <Grid item>
//               <AnimateButton>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   sx={{
//                     fontWeight: 'bold',
//                     bgcolor: 'primary',
//                     '&:hover': { bgcolor: 'primary' } // Ensuring it stays green on hover
//                   }}
//                   fullWidth
//                   startIcon={<SearchIcon />} // Adding Submit Icon
//                 >
//                   SERACH
//                 </Button>
//               </AnimateButton>
//             </Grid>
//           </Grid>
//         </Grid>

//         <TableContainer component={Paper} sx={{ borderRadius: '4px', marginTop: '1rem' }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 {['SmCode', 'FiCode', 'Creator', 'Branch_Code', 'Group_code', '2nd Esign', 'Doc', 'Comments', 'Action'].map((header) => (
//                   <TableCell
//                     key={header}
//                     sx={{ fontWeight: 'bold', textTransform: 'uppercase', background: '#ff4c4c', color: 'white', textAlign: 'center' }}
//                   >
//                     {header}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((item, index) => (
//                 <TableRow key={index} hover>
//                   <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.SmCode}</TableCell>
//                   <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.FiCode}</TableCell>
//                   <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.Creator}</TableCell>
//                   <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.Branch_Code}</TableCell>
//                   <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.Group_code}</TableCell>
//                   <TableCell
//                     sx={{
//                       padding: '12px 16px',
//                       textAlign: 'center',
//                       fontWeight: 'bold',
//                       color: item.BorrSignStatus === 'Y' ? 'green' : 'red'
//                     }}
//                   >
//                     {item.BorrSignStatus === 'Y' ? (
//                       <CheckCircle sx={{ color: 'green', fontSize: '20px' }} />
//                     ) : (
//                       <HourglassBottom sx={{ color: 'red', fontSize: '20px' }} />
//                     )}
//                   </TableCell>
//                   <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>
//                     <IconButton onClick={handleDocClick}>
//                       <DocumentScanner />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>{item.Comments}</TableCell>
//                   <TableCell sx={{ padding: '12px 16px', textAlign: 'center' }}>
//                     <Button variant="contained" onClick={() => handleMoveToAudit(String(item.FiCode), item.Creator, item.BorrSignStatus)}>
//                       <Tooltip title="Move To Audit" arrow>
//                         <span>
//                           <RepeatIcon />
//                         </span>
//                       </Tooltip>
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//             <TableFooter>
//               <TableRow>
//                 <TablePagination
//                   rowsPerPageOptions={[5, 10, 25]}
//                   count={data.length}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onPageChange={(event, newPage) => setPage(newPage)}
//                   onRowsPerPageChange={(event) => {
//                     setRowsPerPage(parseInt(event.target.value, 10));
//                     setPage(0); // Reset page to 0 when rows per page changes
//                   }}
//                 />
//               </TableRow>
//             </TableFooter>
//           </Table>
//         </TableContainer>
//       </Card>

//       {/* Modal for Document Info */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <Box
//           sx={{
//             padding: '20px',
//             backgroundColor: 'white',
//             borderRadius: '10px',
//             maxWidth: '600px',
//             margin: 'auto',
//             boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
//             outline: 'none'
//           }}
//         >
//           <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
//             Document Information
//           </Typography>
//           <Button onClick={() => setOpenModal(false)} sx={{ position: 'absolute', right: 0, top: 0, minWidth: 0, padding: 0 }}>
//             <Close sx={{ color: 'red', fontSize: '1.5rem' }} />
//           </Button>
//           {/* Add Document info here */}
//         </Box>
//       </Modal>

//       {/* Modal for Adding Document */}
//       <Modal
//         open={openAddModal}
//         onClose={() => setOpenAddModal(false)}
//         sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//       >
//         <Box
//           sx={{
//             padding: '24px',
//             backgroundColor: 'white',
//             borderRadius: '8px',
//             maxWidth: '400px',
//             margin: 'auto',
//             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
//             outline: 'none',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center'
//           }}
//         >
//           <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px', color: '#1976d2', textAlign: 'center' }}>
//             Add New Document
//           </Typography>

//           {/* File Input */}
//           <input
//             type="file"
//             className="form-control form-control-sm"
//             onChange={(event) => setFile(event.target.files?.[0] || null)} // Attach the fixed handler
//             style={{
//               width: '100%',
//               marginBottom: '16px',
//               padding: '8px',
//               borderRadius: '4px'
//             }}
//           />
//           <TextField
//             fullWidth
//             label="Remarks"
//             value={newRemarks}
//             onChange={(e) => setNewRemarks(e.target.value)}
//             variant="outlined"
//             margin="normal"
//           />

//           {/* Action Buttons */}
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
//             <Button
//               variant="contained"
//               color="success"
//               onClick={() => {
//                 if (file) {
//                   setUploadedFile(URL.createObjectURL(file)); // Directly set the uploaded file for preview
//                   Swal.fire('Success', 'File uploaded successfully!', 'success');
//                   setOpenAddModal(false);
//                 }
//               }}
//               disabled={!file}
//               sx={{ flex: 1, padding: '10px 16px', fontSize: '16px', fontWeight: 'bold', marginRight: '8px' }}
//             >
//               <CloudUpload sx={{ marginRight: '8px' }} /> Save
//             </Button>

//             <Button
//               variant="outlined"
//               color="error"
//               onClick={() => setOpenAddModal(false)}
//               sx={{
//                 flex: 1,
//                 padding: '10px 16px',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 marginLeft: '8px',
//                 borderColor: '#d32f2f',
//                 color: '#d32f2f'
//               }}
//             >
//               <Close sx={{ marginRight: '8px' }} /> Close
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Dialog for Image Preview */}
//       <Dialog open={openImageModal} onClose={() => setOpenImageModal(false)} maxWidth="md" fullWidth>
//         <Box sx={{ padding: 3 }}>
//           <Grid container spacing={3}>
//             {uploadedFile && (
//               <Grid item xs={12} sm={6}>
//                 <Paper sx={{ padding: 2, textAlign: 'center', boxShadow: 3 }}>
//                   <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
//                     Uploaded File:
//                   </Typography>
//                   <img
//                     src={uploadedFile}
//                     alt="Uploaded File"
//                     style={{ height: '150px', borderRadius: '8px', objectFit: 'cover', width: '100%' }}
//                   />
//                 </Paper>
//               </Grid>
//             )}
//           </Grid>
//         </Box>
//       </Dialog>
//     </div>
//   );
// };

// export default PostSanction;

import React, { useState, useEffect } from "react";
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
  TablePagination,
} from "@mui/material";
import { CheckCircle, HourglassBottom } from "@mui/icons-material";
import {
  CloudUpload,
  Close,
  Visibility,
  DocumentScanner,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import RepeatIcon from "@mui/icons-material/Repeat";
import apiClient from "network/apiClient";
import Swal from "sweetalert2";

import axios from "axios";
import PreviewIcon from "@mui/icons-material/Preview";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { Link } from "react-router-dom";
//import MoveToAuditRecord from "./MoveToAuditRecord/MoveToAuditRecord";
//import MoveToAuditquery from "./MoveToAuditRecord/MoveToAuditRecord";

const PostSanction = () => {
  const [filterOption, setFilterOption] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fiCode, setFiCode] = useState("");
  const [creator, setCreator] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newRemarks, setNewRemarks] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [Creatorlist, setCreatorlist] = useState([]);
  const [PronoteDocopen, setPronoteDocopen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [pinfoData, setPinfoData] = useState([]);
  const [openmodelForAddDoc, setopenmodelForAddDoc] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [pronoteuploaded, setPronoteuploaded] = useState(false);
  const [DocID, setDocID] = useState(null);
  const [docname, setdocname] = useState(null);
  const [errorsearch, setErrorsearch] = useState({ fiCode: "", creator: "" });
  const [selectedItemForDoc, setSelectedItemForDoc] = useState(null);

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
    setFromDate("");
    setToDate("");
    setFiCode("");
    setCreator("");
  };

  useEffect(() => {
    getCreatorDropdown();
  }, []);

  const getCreatorDropdown = async () => {
    try {
      const response = await apiClient.get("/Masters/GetCreator", {
        requireAuth: true,
        checkTokenInResponse: false,
      });
      const fetchCreator = response.data.data;
      setCreatorlist(fetchCreator);
    } catch (error) {
    } finally {
    }
  };

  const handleCreatorChange = (event) => {
    const selectedCreator = event.target.value;
    setCreator(selectedCreator);
  };

  // Search button should be enabled based on filter option
  const isSearchEnabled = () => {
    if (filterOption === "date") {
      return fromDate && toDate; // Ensure both dates are set
    } else if (filterOption === "ficode") {
      return fiCode && creator; // Ensure FiCode and Creator are set
    }
    return false;
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const handleViewDoc = (docName,FI_ID) => {
    debugger;
    const pdfFilePaths = `LOSDOC/FiDocs/${FI_ID}/FiDocuments/${docName}`;
     //const pdfFilePath = docName;
      //const fileName = pdfFilePath.split(':').pop();
      //const pdfUrl = `https://predeptest.paisalo.in:8084/${fileName}`;
      //window.open('https://predeptest.paisalo.in:8084//LOSDOC/FiDocs/10048/EsignDoc/SecondEsign_261824_BAREILLY.pdf', '_blank', 'noopener,noreferrer');
      window.open(pdfFilePaths, '_blank', 'noopener,noreferrer');

    
  };
  //Move to Audit handler (mock behavior) open a query page new tab
  const handleQueryForMoveToAudit = async () => {
    debugger;
    const newPageUrl = "/MoveToAuditRecord"; 
    window.location.href = newPageUrl;
  };

  //Move to Audit handler (mock behavior)
  const handleMoveToAudit = (fiCode, creator, borrSignStatus, smCode) => {
    debugger;
    alert(pronoteuploaded);
    //MoveToAudit(fiCode, creator);
    if (smCode !== 'pending' && pronoteuploaded === false) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: '2nd eSign is not done. Please complete the eSign process before moving to Audit.',
      });
      return;
    }
     MoveToAudit(fiCode,creator);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Successfully moved to Audit.',
    });
  };

  //-----------download one pager API call------------

  const handleDownloadonePager = async (FiCode, Creator) => {
    debugger;
    if (!FiCode || !Creator) {
      console.error("Invalid inputs for handlePersonalInfoClick:", {
        FiCode,
        Creator,
      });
      return;
    }
    setLoading(true);
    const url = `https://apiuat.paisalo.in:4015/fi/api/FiSanction/OnePgerdonload?ficode=${FiCode}&creator=${Creator}`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          //Authorization: `Bearer ${token}`, // Ensure proper headers JSON.parse(response.data.data)
        },
      });
      const { statuscode, message, data } = response.data;
      if (statuscode === 20) {
        const pdfFilePath = data.pdfOnePager; 
        const urlRegex = /https?:\/\/[^\s'"]+/;
        const extractedUrl = pdfFilePath.match(urlRegex)[0];
        window.open(extractedUrl, '_blank', 'noopener,noreferrer');
      } 
      else {
        console.error(
          "Error in API response:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error in handlePersonalInfoClick:", error);
    } finally {
      setLoading(false);
    }
  };
 

  const MoveToAudit = async () => {
    debugger;
    setLoading(true);
    try {
      const response = await axios.post(
        //`https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/GetFiPostSanctionDateWise`,
        `https://localhost:7030/api/FiPostSanction/InsertFiPostSanctionMoveTo?FiCode=${fiCode}&Creator=${creator}`,
        {
          params: {
            FiCode: fiCode,
            Creator: creator,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      debugger;
      if (response.status === 200) {
        setData(response.data.data || []);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadDoc = async (
    FICode,
    Creator,
    FI_ID,
    CheckListId,
    DocName,
    Document,
    DocID
  ) => {
    setopenmodelForAddDoc(true);
    debugger;
    setDocID(CheckListId);
    setdocname(Document);
    setSelectedItem({
      FICode,
      Creator,
      FI_ID,
      CheckListId,
      DocName,
      Document,
      DocID
    });
    
  };
  const handleDocClickModelopen=(FICode, Creator,FI_ID,CheckListId,DocName,Document,DocID)=>{
    setPronoteDocopen(true);
    debugger;
    setSelectedItemForDoc({
      FICode,
      Creator,
      FI_ID,
      CheckListId,
      DocName,
      Document,
      DocID
    });
    
  }
 
  const SubmitAddDoc = async () => {
    debugger;
   
    if (!file) {
      //setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("creator", selectedItemForDoc.Creator);
    formData.append("DocName", docname);
    formData.append("ficode", selectedItemForDoc.FICode);
    formData.append("DocId", DocID);
    formData.append("FI_ID", selectedItemForDoc.FI_ID);

    try {
      const response = await axios.post(
        `https://localhost:7030/api/FiPostSanction/FilePostUpload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
            "Access-Control-Allow-Origin": "*", // CORS header
            // Authorization: `Bearer ${token}`, // Add token if needed
          },
        }
      );
      if (response.data.statuscode === 200) {
        debugger;
        alert(response.data.message);
        setOpenModal(false);
        setFile(null);
        setRemarks("");
      } else {
        //setError('Error uploading file.'); // Show error message
      }
    } catch (error) {
      //setError('An error occurred while uploading the file.'); // Handle API error
      console.error(error); // Log error for debugging
    } finally {
      //setIsLoading(false); // Hide loading indicator
    }
  };
  

  const handleDocClick = async (FiCode, Creator) => {
    debugger;
    if (!FiCode || !Creator) {
      console.error("Invalid inputs for handlePersonalInfoClick:", {
        FiCode,
        Creator,
      });
      return;
    }
    setLoading(true);
    //const url = `https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/GetFiPostDoc?FiCode=${FiCode}&Creator=${Creator}`;
    const url = `https://localhost:7030/api/FiPostSanction/GetFiPostDoc?FiCode=${FiCode}&Creator=${Creator}`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${token}`, // Ensure proper headers JSON.parse(response.data.data)
        },
      });
      if (response.status === 200) {
        const apipinfoData = JSON.parse(response.data.data || "[]");
         // setSelectedItem(apipinfoData);
        pinfoData.map((item,index)=>{
          debugger;
           if(item.Document=="Pronote" && item.CheckListId !=null){
            setPronoteuploaded(true);
        }
        });
      //     apipinfoData.forEach((item)=>{
      //     if(item.Document=="Pronote" && item.CheckListId !=null){
      //         setPronoteuploaded(true);
      //     }
      // });
      
        setPinfoData(apipinfoData);
        setSelectedRowData(apipinfoData[0] || null);
       // setPronoteDocopen(true);
      } else {
        console.error(
          "Error in API response:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error in handlePersonalInfoClick:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchData = async () => {
    debugger;
    setErrorsearch({ fiCode: '', creator: '',fromDate:'',toDate:'' });
  
  if (!fiCode && !creator) {
    setErrorsearch({
        fiCode: fiCode ? '' : 'FiCode is required.',
        creator: creator ? '' : 'Creator is required.',
    });
    return;
}

//  if (!fromDate && !toDate) { 
//     setErrorsearch({
//         fromDate: fromDate ? '' : 'fromDate is required.',
//         toDate: toDate ? '' : 'toDate is required.',
//     });
//     return;
// }
    
    setLoading(true);
    try {
      const response = await axios.get(
        //`https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/GetFiPostSanctionDateWise`,
        `https://localhost:7030/api/FiPostSanction/GetFiPostSanctionDateWise`,
        {
          params: {
            fiCode: fiCode,
            creator: creator,
            pageSize: 5,
            pageNumber: 1,
            fromdate: fromDate,
            todate: toDate,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {

        setData(response.data.data || []);
        handleDocClick(fiCode,creator);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = () => {
    fetchData();
   
  };

  return (
    <div>
      <Card sx={{ boxShadow: "none", borderRadius: "7px", mb: 3, p: 2 }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Grid item></Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="medium">
              <InputLabel>Search By</InputLabel>
              <Select
                value={filterOption}
                onChange={handleFilterChange}
                label="Search By"
                size="medium"
              >
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="ficode">FiCode & Creator</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {filterOption === "date" && (
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
                  {errorsearch.fromDate && <div className="error-message">{errorsearch.fromDate}</div>}
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
                 {errorsearch.toDate && <div className="error-message">{errorsearch.toDate}</div>}
              </Grid>
            </>
          )}

          {filterOption === "ficode" && (
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
                 {errorsearch.fiCode && <div className="error-message">{errorsearch.fiCode}</div>}
              </Grid>
             
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="medium">
                  <InputLabel>Creator</InputLabel>
                  <Select
                    label="Creator"
                    size="medium"
                    value={creator}
                    onChange={handleCreatorChange}
                  >
                    {Creatorlist.map((index) => (
                      <MenuItem key={index.creatorid} value={index.creator}>
                        {index.creator}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errorsearch.creator && <div className="error-message">{errorsearch.creator}</div>}
              </Grid>
             
            </>
          )}

          <Grid item xs={12} sm={6} md={1}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  fontWeight: "bold",
                  bgcolor: "primary",
                  "&:hover": { bgcolor: "primary" }, // Ensuring it stays green on hover
                }}
                fullWidth
                startIcon={<SearchIcon />}
                onClick={handleSearch}
              >
                SERACH
              </Button>
              
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
            <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  fontWeight: "bold",
                  bgcolor: "primary",
                  marginLeft:"20px",
                  "&:hover": { bgcolor: "primary" }, // Ensuring it stays green on hover
                }}
                fullWidth
                startIcon={<SearchIcon />}
                onClick={handleQueryForMoveToAudit}
              >
                query
              </Button>
            </Grid>
          </Grid>
       

        <TableContainer
          component={Paper}
          sx={{ borderRadius: "4px", marginTop: "1rem" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "SmCode",
                  "FiCode",
                  "Creator",
                  "Branch_Code",
                  "Group_code",
                  "2nd Esign",
                  "Doc",
                  "Comments",
                  "Action",
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      background: "#ff4c4c",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((item, index) => (
                <TableRow key={index} hover>
                             <TableCell
                  sx={{ padding: "12px 16px", textAlign: "center" }}
                  onClick={!item.smCode ?()=> handleDownloadonePager(item.fiCode,item.creator) : undefined}
                >
                  <span style={{ color: !item.smCode ? "red" : "inherit" }}>
                    {item.smCode || "download one pager"}
                  </span>
                </TableCell>
                   
                  <TableCell sx={{ padding: "12px 16px", textAlign: "center" }}>
                    {item.fiCode}
                  </TableCell>
                  <TableCell sx={{ padding: "12px 16px", textAlign: "center" }}>
                    {item.creator}
                  </TableCell>
                  <TableCell sx={{ padding: "12px 16px", textAlign: "center" }}>
                    {item.branch_Code}
                  </TableCell>
                  <TableCell sx={{ padding: "12px 16px", textAlign: "center" }}>
                    {item.group_Code}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "12px 16px",
                      textAlign: "center",
                      fontWeight: "bold",
                      color: item.borrSignStatus === "Y" ? "green" : "red",
                    }}
                  >
                    {item.borrSignStatus === "Y" ? (
                      <CheckCircle sx={{ color: "green", fontSize: "20px" }} />
                    ) : (
                      <HourglassBottom
                        sx={{ color: "red", fontSize: "20px" }}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: "12px 16px", textAlign: "center" }}>
                    <IconButton
                      onClick={() => {
                        if (item?.fiCode && item?.creator) {
                          setPronoteDocopen(true);
                          handleDocClickModelopen(item.fiCode.toString(), item.creator,item.fi_Id,item.CheckListId,item.DocName,item.Document);
                        } else {
                          console.error(
                            "Missing FiCode or Creator in row:",
                            row
                          );
                        }
                      }}
                    >
                      <DocumentScanner />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ padding: "12px 16px", textAlign: "center" }}>
                    {item.comments}
                  </TableCell>
                  <TableCell sx={{ padding: "12px 16px", textAlign: "center" }}>
                    {item.borrSignStatus === "Y" && pronoteuploaded? (
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleMoveToAudit(
                            String(item.fiCode),
                            item.creator,
                            item.borrSignStatus,
                            item.smCode
                          )
                        }
                      >
                        <Tooltip title="Move To Audit" arrow>
                          <span>
                            <RepeatIcon />
                          </span>
                        </Tooltip>
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        disabled
                        onClick={() =>
                          handleMoveToAudit(
                            String(item.fiCode),
                            item.creator,
                            item.borrSignStatus,
                            item.smCode
                          )
                        }
                      >
                        <Tooltip title="Move To Audit" arrow>
                          <span>
                            <RepeatIcon />
                          </span>
                        </Tooltip>
                      </Button>
                    )}
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
                    setPage(0); 
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>

      {/* Modal for Document Info */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            maxWidth: "600px",
            margin: "auto",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            outline: "none",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Document Information
          </Typography>
          <Button
            onClick={() => setOpenModal(false)}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              minWidth: 0,
              padding: 0,
            }}
          >
            <Close sx={{ color: "red", fontSize: "1.5rem" }} />
          </Button>
          {/* Add Document info here */}
        </Box>
      </Modal>

      {/* Modal for Adding Document */}
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            padding: "24px",
            backgroundColor: "white",
            borderRadius: "8px",
            maxWidth: "400px",
            margin: "auto",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "16px",
              color: "#1976d2",
              textAlign: "center",
            }}
          >
            Add New Document
          </Typography>

          {/* File Input */}
          <input
            type="file"
            className="form-control form-control-sm"
            onChange={(event) => setFile(event.target.files?.[0] || null)} // Attach the fixed handler
            style={{
              width: "100%",
              marginBottom: "16px",
              padding: "8px",
              borderRadius: "4px",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                if (file) {
                  setUploadedFile(URL.createObjectURL(file)); // Directly set the uploaded file for preview
                  Swal.fire(
                    "Success",
                    "File uploaded successfully!",
                    "success"
                  );
                  setOpenAddModal(false);
                }
              }}
              disabled={!file}
              sx={{
                flex: 1,
                padding: "10px 16px",
                fontSize: "16px",
                fontWeight: "bold",
                marginRight: "8px",
              }}
            >
              <CloudUpload sx={{ marginRight: "8px" }} /> Save
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenAddModal(false)}
              sx={{
                flex: 1,
                padding: "10px 16px",
                fontSize: "16px",
                fontWeight: "bold",
                marginLeft: "8px",
                borderColor: "#d32f2f",
                color: "#d32f2f",
              }}
            >
              <Close sx={{ marginRight: "8px" }} /> Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Dialog for Image Preview */}
      <Dialog
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ padding: 3 }}>
          <Grid container spacing={3}>
            {uploadedFile && (
              <Grid item xs={12} sm={6}>
                <Paper sx={{ padding: 2, textAlign: "center", boxShadow: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: 2, fontWeight: "bold" }}
                  >
                    Uploaded File:
                  </Typography>
                  <img
                    src={uploadedFile}
                    alt="Uploaded File"
                    style={{
                      height: "150px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      </Dialog>

      <Modal open={PronoteDocopen} onClose={() => setPronoteDocopen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            width: "80%",
            maxHeight: "80%",
            overflowY: "auto",
            padding: "16px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "16px",
              textAlign: "center",
              color: "#D32F2F",
            }}
          >
            Document Information
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {["S.NO", "DocName", "Action"].map((header, index) => (
                    <TableCell
                      key={header.replace(/\s/g, "_")}
                      sx={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        background: "linear-gradient(90deg, #FF4C4C, #FF7F7F)",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {Array.isArray(pinfoData) && pinfoData.length > 0 ? (
                  pinfoData.map((mainItem, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ textAlign: "center" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {mainItem.Document || mainItem.DocName}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {mainItem.DocName !== null &&
                        mainItem.Document !== null ? (
                          <IconButton
                            disabled
                            onClick={() =>
                              handleUploadDoc(
                                mainItem.FICode,
                                mainItem.Creator,
                                mainItem.FI_ID,
                                mainItem.DocID,
                                mainItem.CheckListId,
                                mainItem.DocName,
                                mainItem.Document
                              )
                            }
                          >
                            <AddBoxIcon
                              sx={{ color: "red", fontSize: "20px" }}
                            />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() =>
                              handleUploadDoc(
                                mainItem.FICode,
                                mainItem.Creator,
                                mainItem.FI_ID,
                                mainItem.DocID,
                                mainItem.CheckListId,
                                mainItem.DocName,
                                mainItem.Document
                              )
                            }
                          >
                            <AddBoxIcon
                              sx={{ color: "green", fontSize: "20px" }}
                            />
                          </IconButton>
                        )}
                        {mainItem.DocName !== null &&
                        mainItem.Document !== null ? (
                          <IconButton
                            onClick={() => handleViewDoc(mainItem.DocName,mainItem.FI_ID)}
                          >
                            <PreviewIcon
                              sx={{ color: "green", fontSize: "20px" }}
                            />
                          </IconButton>
                        ) : (
                          <IconButton disabled>
                            <PreviewIcon
                              sx={{ color: "red", fontSize: "20px" }}
                            />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ textAlign: "center", marginTop: "16px" }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setPronoteDocopen(false)}
            >
              {" "}
              {/* Close modal button */}
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openmodelForAddDoc}
        onClose={() => setopenmodelForAddDoc(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            width: "40%",
            height: "20%",
            overflowY: "auto",
            padding: "16px",
            justifyContent: "center",
          }}
        >
          <Grid sx={{ marginTop: "25px", marginLeft: "20px" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "16px",
                textAlign: "center",
                color: "#D32F2F",
              }}
            >
              Upload Document Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ marginLeft: "10px" }}>
                <Button
                  component="label"
                  variant="outlined"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon sx={{ color: "red" }} />}
                  sx={{
                    border: "1px solid grey",
                    color: "gray",
                    fontSize: "16px",
                  }}
                >
                  Chouse File
                  <VisuallyHiddenInput
                    type="file"
                    //onChange={(event) => console.log(event.target.files)}
                    onChange={handleFileChange}
                    multiple
                  />
                </Button>
              </Grid>
              {/* <Grid item xs={2}>
           <TextField
          fullWidth
          label="Remarks"
          name='remarks'
          onChange={handleRemarksChange}
          />
         
          </Grid> */}
              <Grid item xs={3} sx={{ marginTop: "5px" }} spacing={2}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => SubmitAddDoc()}
                >
                  {" "}
                  {/* Close modal button */}
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setopenmodelForAddDoc(false)}
                  sx={{ marginLeft: "10px" }}
                >
                  {" "}
                  {/* Close modal button */}
                  Close
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default PostSanction;


