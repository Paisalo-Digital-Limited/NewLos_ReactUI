import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Card,
  Switch,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import Tooltip from "@mui/material/Tooltip";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "./apidepartment"; // Import your axios instance// Adjust the import path accordingly// Import Loader component
import Swal from "sweetalert2";
import AnimateButton from "components/@extended/AnimateButton";
import SendIcon from "@mui/icons-material/Send";



const Department = () => {
  const [name, setName] = useState("");
  const [departments, setDepartments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editedDepartmentName, setEditedDepartmentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editedDepartmentId, setEditedDepartmentId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
  const [nameError, setNameError] = useState(false);

  useEffect(() => {
       getDepartments(); 
  }, []);

 

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    setNameError(false);

    if (!name.trim()) {
      setNameError(true);
      isValid = false;
    }
   
    if (isValid) {
      setLoading(true);
   
      const data = { name, id: 0 };
      try {
        await axiosInstance.post("/CreateDepartment", data); // Removed header since it's being set in the axios instance
         Swal.fire("Success", "Department created successfully!", "success");
        setName("");
        getDepartments();
      } catch (error) {
        console.error(error);

      }
    }
  };

  const handleUpdate = async () => {
    if (editedDepartmentName && editedDepartmentId !== null) {
        try {
          await axiosInstance.post("/UpdateDepartment", {
            id: editedDepartmentId,
            name: editedDepartmentName,
          }); // Removed header since it's being set in the axios instance
          Swal.fire("Success", "Role updated successfully!", "success");
          getDepartments();
          setEditDialogOpen(false)
        } catch (error) {
          console.error(error); 
        }
    }
  };

  const getDepartments = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/GetDepartmentDetails");
      if (response.status === 200) {
        setDepartments(response.data.data);
      } else {
        console.error(response.status + ": " + response.statusText);
       setEditDialogOpen(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async (id) => {
  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you want to delete this department?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Yes, delete it!",
  //     cancelButtonText: "No, cancel!",
  //   });

  //   if (result.isConfirmed) {
  //     try {
  //       await axiosInstance.get(`/DeleteDepartment?DepartmentId=${id}`); // Removed header since it's being set in the axios instance
  //       setSnackbarMessage("Department deleted successfully.");
  //       setSnackbarOpen(true);
  //       await getDepartments();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

//  const handleToggleActive= async (rowData) => {
//        const updatedStatus = !rowData.isActive;
   
//        // Optimistically update the UI
//        setDepartments((prev) =>
//          prev.map((fuel) =>
//            fuel.id === rowData.id ? { ...fuel, isActive: updatedStatus } : fuel
//          )
//        );
   
//        try {
//          // Assuming the delete API is used to toggle status
//          const response = await deleteDepartment(rowData.id);
//          if (response.statuscode === 200) {
//            Swal.fire(
//              "Success",
//              `Department id has been ${updatedStatus ? "activated" : "deactivated"}`,
//              "success"
//            );
//          } else {
//            throw new Error(response.message || "Failed to toggle status.");
//          }
//        } catch (error) {
//          // Rollback UI if API fails
//          setDepartments((prev) =>
//            prev.map((fuel) =>
//              fuel.id === rowData.id ? { ...fuel, isActive: !updatedStatus } : fuel
//            )
//          );
//          Swal.fire("Error", error.message || "An error occurred.", "error");
//        }
//      };
   


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "10px",
        }}
        className="rmui-card"
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Department Master
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} md={4}>
              <TextField
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setNameError("");
                }}
                variant="outlined"
                label="Enter Department Name"
                fullWidth
                error={!!nameError}
                helperText={nameError && 'Department Name is required'}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <AnimateButton>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    fontWeight: "bold",
                    bgcolor: "green",
                    "&:hover": { bgcolor: "green" }, // Ensuring it stays green on hover
                  }}
                  fullWidth
                  startIcon={<SendIcon />} // Adding Submit Icon
                >
                  SUBMIT
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      </Card>

     
        <TableContainer component={Paper} sx={{ borderRadius: "5px" }}>
          <Table>
            <TableHead>
            <TableRow sx={{ background: "#ff4c4c", color: "white" }}>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold", color:"white" }}>
                  S.NO
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold", color:"white" }}>
                  Title
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold", color:"white" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {(rowsPerPage > 0? departments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage): departments
              ).map((department, index) => (
                <TableRow key={department.id}>
                  <TableCell sx={{ padding: "10px 16px", textAlign: "center" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell sx={{ padding: "10px 16px", textAlign: "center" }}>
                    {department.name}
                  </TableCell>
                  <TableCell sx={{ padding: "10px 16px", textAlign: "center" }}>
                    <Button
                      color="secondary"
                      onClick={() => {
                        setEditedDepartmentName(department.name);
                        setEditedDepartmentId(department.id);
                        setEditDialogOpen(true)
                      }}
                    >
                      <Tooltip title="Edit Designation" arrow>
                        <EditCalendarIcon sx={{ color: "red" }} />
                      </Tooltip>
                    </Button>
                    <Switch
                      checked={department.isActive}
                      onChange={() => handleToggleActive(department)}
                      color="success"
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    {/* <Button color="error" onClick={() => handleDelete(department.id)}>Delete</Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={departments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        <Dialog
         open={editDialogOpen}
         onClose={() => setEditDialogOpen(false)}
         fullWidth
         sx={{
           "& .MuiDialog-paper": {
             borderRadius: "16px",
             boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
           },
         }}
       >
         <DialogTitle
           sx={{
             fontSize: "1.5rem",
             fontWeight: "bold",
            color: "Black",
            padding: "16px 24px",
           }}
         >           {" "}
           Edit Department Name
         </DialogTitle>
         <IconButton
           onClick={() => setEditDialogOpen(false)}
           style={{ position: "absolute", top: "8px", right: "8px" }}
         >
           <CloseIcon sx={{ color: "red" }} />
         </IconButton>
         <Grid sx={{ padding: "20px" }}>
           <TextField
             label="Department Name"
             variant="outlined"
             fullWidth
             size="medium"
             value={editedDepartmentName}
             onChange={(event) => setEditedDepartmentName(event.target.value)}
             
           />

         </Grid>
         <DialogActions>
           <Button
             onClick={handleUpdate}
             variant="contained"
             color="primary"
             sx={{
               fontSize: "1rem",
               textTransform: "none",
               marginBottom:"10px"
              
            }}
          >
            Save
          </Button>      
            </DialogActions>
      </Dialog> 
    </>
  );
};

export default Department;



// import React, { useState, useEffect } from 'react';
// import {
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Snackbar,
//   Card,
//   Switch,
//   IconButton,
//   TablePagination,
// } from '@mui/material';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import Tooltip from '@mui/material/Tooltip';
// import MuiAlert from '@mui/material/Alert';
// import CloseIcon from '@mui/icons-material/Close';
// import axiosInstance from './apidepartment'; // Import your axios instance// Adjust the import path accordingly// Import Loader component
// import Swal from 'sweetalert2';

// const Department = () => {
//   const [name, setName] = useState('');
//   const [departments, setDepartments] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [editedDepartmentName, setEditedDepartmentName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [editedDepartmentId, setEditedDepartmentId] = useState(null);

//   const [showLoader, setShowLoader] = useState(true);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

//   useEffect(() => {
//     const loadDepartments = async () => {
//       await getDepartments();
//       setShowLoader(false);
//     };

//     loadDepartments();
//   }, []);

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to create this department?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, create it!',
//       cancelButtonText: 'No, cancel!',
//     });

//     if (result.isConfirmed) {
//       const data = { name, id: 0 };
//       try {
//         await axiosInstance.post('/CreateDepartment', data);  // Removed header since it's being set in the axios instance
//         setName('');
//         setSnackbarMessage('Department created successfully.');
//         setSnackbarOpen(true);
//         getDepartments();
//       } catch (error) {
//         console.error(error);
//         setSnackbarMessage('Failed to create department.');
//         setSnackbarOpen(true);
//       }
//     }
//   };

//   const handleUpdate = async () => {
//     if (editedDepartmentName && editedDepartmentId !== null) {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: 'Do you want to update this department?',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, update it!',
//         cancelButtonText: 'No, cancel!',
//       });

//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.post('/UpdateDepartment', {
//             id: editedDepartmentId,
//             name: editedDepartmentName
//           }); // Removed header since it's being set in the axios instance
//           setSnackbarMessage('Department updated successfully.');
//           getDepartments();
//           setOpenModal(false);
//         } catch (error) {
//           console.error(error);
//           setSnackbarMessage('Failed to update department.');
//         } finally {
//           setSnackbarOpen(true);
//         }
//       }
//     }
//   };

//   const getDepartments = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get('/GetDepartmentDetails');
//       if (response.status === 200) {
//         setDepartments(response.data.data);
//       } else {
//         console.error(response.status + ': ' + response.statusText);
//         setSnackbarMessage('Failed to fetch departments.');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error(error);
//       setSnackbarMessage('Failed to fetch departments.');
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to delete this department?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'No, cancel!',
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosInstance.get(`/DeleteDepartment?DepartmentId=${id}`); // Removed header since it's being set in the axios instance
//         setSnackbarMessage('Department deleted successfully.');
//         setSnackbarOpen(true);
//         await getDepartments();
//       } catch (error) {
//         console.error(error);
//         setSnackbarMessage('Failed to delete department.');
//         setSnackbarOpen(true);
//       }
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const displayedDepartments = departments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Grid container spacing={2} justifyContent="center">

//           <Grid item xs={12}>
//             <Card>
//               <Grid item xs={12} p={2}>
//                 <Typography variant="h5" sx={{ marginBottom: "5px", fontWeight: "bold" }}>Department Master</Typography>
//               </Grid>
//               <Grid item xs={12} p={1} mt={-1}>
//                 <form onSubmit={handleSubmit}>
//                   <Grid container direction="row" spacing={2} sx={{marginBottom:'1rem'}}>
//                     <Grid item xs={5} md={2}>
//                       <TextField
//                         value={name}
//                         onChange={(event) => setName(event.target.value)}
//                         variant="outlined"
//                         label="Enter Department Name"
//                         fullWidth
//                         size="medium"
//                       />
//                     </Grid>
//                     <Grid item xs={2} mt={0.5}>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         size="small"
//                         sx={{
//                           padding: "10px 12px",
//                           fontSize: "15px",
//                           background: "linear-gradient(135deg, #008000, #008000)",
//                           borderRadius: "8px",
//                           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                           "&:hover": {
//                             background: "linear-gradient(135deg, #81c783, #4caf50)",
//                           }
//                         }}
//                         startIcon={<CheckBoxIcon />}
//                       >
//                         SUBMIT
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </form>
//               </Grid>
//             </Card>
//           </Grid>

//           <Grid item xs={12} mb={2}>
//             <TableContainer component={Paper} sx={{borderRadius: '5px'}}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>S.NO</TableCell>
//                     <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Title</TableCell>
//                     <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {displayedDepartments.map((department, index) => (
//                     <TableRow key={department.id}>
//                       <TableCell sx={{padding: "10px 16px", textAlign:'center'}}>{(page * rowsPerPage) + index + 1}</TableCell>
//                       <TableCell sx={{padding: "10px 16px", textAlign:'center'}}>{department.name}</TableCell>
//                       <TableCell sx={{padding: "10px 16px", textAlign:'center'}}>
//                         <Button color="secondary" onClick={() => {
//                           setEditedDepartmentName(department.name);
//                           setEditedDepartmentId(department.id);
//                           setOpenModal(true);
//                         }}>
//                           <Tooltip title="Edit Designation" arrow>
//                             <EditCalendarIcon sx={{color:'red'}} />
//                           </Tooltip>
//                         </Button>
//                         <Switch
//                           checked={true}
//                           onChange={() => handleToggleActive(department.id, true)}
//                           color="success"
//                           inputProps={{ 'aria-label': 'controlled' }}
//                         />
//                         {/* <Button color="error" onClick={() => handleDelete(department.id)}>Delete</Button> */}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25]}
//                 component="div"
//                 count={departments.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//             </TableContainer>

//             {openModal && (
//               <Modal
//                 onClose={() => setOpenModal(false)}
//                 onUpdate={handleUpdate}
//                 editedDepartmentName={editedDepartmentName}
//                 setEditedDepartmentName={setEditedDepartmentName}
//               />
//             )}
//           </Grid>

//           <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
//             <MuiAlert onClose={handleSnackbarClose} severity="info">{snackbarMessage}</MuiAlert>
//           </Snackbar>

//     </Grid>
//   );
// };

// const Modal = ({ onClose, onUpdate, editedDepartmentName, setEditedDepartmentName }) => {
//   return (
//     <Paper
//       elevation={6}
//       square
//       sx={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         padding: '16px',
//         maxWidth: '500px',
//         width: { xs: '90%', sm: '500px' },
//       }}
//     >
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Typography variant="h6">Edit Department Name*</Typography>
//         <IconButton onClick={onClose}>
//           <CloseIcon sx={{color: 'red'}} />
//         </IconButton>
//       </div>
//       <TextField
//         value={editedDepartmentName}
//         onChange={(event) => setEditedDepartmentName(event.target.value)}
//         variant="outlined"
//         label="Name"
//         fullWidth
//         margin="normal"
//       />
//       <Button onClick={onUpdate} variant="contained" color="primary" style={{ float: 'inline-end', marginTop: '16px' }}>Update</Button>
//     </Paper>
//   );
// };

// export default Department;
