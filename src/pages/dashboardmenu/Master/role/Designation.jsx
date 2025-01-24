// import React, { useState, useEffect } from "react";
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
//   IconButton,
//   Switch,
//   Card,
//   TablePagination,
//   TableFooter,
// } from "@mui/material";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import Tooltip from "@mui/material/Tooltip";
// import MuiAlert from "@mui/material/Alert";
// import Swal from "sweetalert2";
// import CloseIcon from "@mui/icons-material/Close";
// import axiosInstance from "./apidepartment"; // Import your axios instance

// const Designation = () => {
//   const [title, setTitle] = useState("");
//   const [designations, setDesignations] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [openModal, setOpenModal] = useState(false);
//   const [editedDesignationTitle, setEditedDesignationTitle] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [editedDesignationId, setEditedDesignationId] = useState(null);

//   useEffect(() => {
//     getDesignations();
//   }, []); // Fetch designations initially

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const { isConfirmed } = await Swal.fire({
//       title: "Confirm Creation",
//       text: "Do you want to create a new designation?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       cancelButtonText: "No",
//     });

//     if (isConfirmed) {
//       const data = {
//         id: 0,
//         title,
//         isActive: true,
//         isDeleted: false,
//         createdOn: new Date().toISOString(),
//         modifiedOn: new Date().toISOString(),
//       };

//       try {
//         await axiosInstance.post("/CreateDesignation", data);
//         setTitle(""); // Clear the input field
//         Swal.fire("Success!", "Designation created successfully.", "success");
//         getDesignations(); // Fetch updated designations
//       } catch (error) {
//         console.error(error);
//         Swal.fire("Error!", "Failed to create designation.", "error");
//       }
//     }
//   };

//   const handleUpdate = async () => {
//     if (editedDesignationTitle && editedDesignationId !== null) {
//       const { isConfirmed } = await Swal.fire({
//         title: "Are you sure?",
//         text: "Do you want to update this designation?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, update it!",
//         cancelButtonText: "No, cancel!",
//       });

//       if (isConfirmed) {
//         const data = {
//           id: editedDesignationId,
//           title: editedDesignationTitle,
//           isActive: true,
//           isDeleted: false,
//           modifiedOn: new Date().toISOString(),
//         };

//         try {
//           await axiosInstance.post("/UpdateDesignation", data);
//           Swal.fire("Updated!", "Designation updated successfully.", "success");
//           getDesignations(); // Refresh the designations list
//           setOpenModal(false); // Close the modal
//         } catch (error) {
//           console.error(error);
//           Swal.fire("Error!", "Failed to update designation.", "error");
//         }
//       }
//     }
//   };

//   const getDesignations = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/GetDesignationDetails");
//       if (response.status === 200) {
//         setDesignations(response.data.data);
//       } else {
//         console.error(response.status + ": " + response.statusText);
//         setSnackbarMessage("Failed to fetch designations.");
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error(error);
//       setSnackbarMessage("Failed to fetch designations.");
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const { isConfirmed } = await Swal.fire({
//       title: "Are you sure?",
//       text: "This will permanently delete the designation!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, cancel!",
//     });

//     if (isConfirmed) {
//       try {
//         await axiosInstance.get(`/DeleteDesignation?DesignationId=${id}`);
//         Swal.fire("Deleted!", "Designation deleted successfully.", "success");
//         getDesignations(); // Refresh the designations
//       } catch (error) {
//         console.error(error);
//         Swal.fire("Error!", "Failed to delete designation.", "error");
//       }
//     }
//   };

//   const handleToggleActive = async (id, currentStatus) => {
//     const newStatus = !currentStatus;
//     try {
//       await axiosInstance.post("/UpdateRoleStatus", {
//         id,
//         isActive: newStatus,
//       });
//       Swal.fire("Success", "Role status updated successfully!", "success");
//       getDesignations(); // Refresh the designations
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         "Failed to update role status. Please try again.",
//         "error"
//       );
//       console.error(error);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const displayedDesignations = designations.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Grid container spacing={2} justifyContent="center">
//       <Grid item xs={12}>
//         <Grid item xs={12} p={2}>
//           <Typography
//             variant="h5"
//             sx={{ marginBottom: "5px", fontWeight: "bold" }}
//           >
//             Designation Master
//           </Typography>
//         </Grid>
//         <Grid item xs={12} p={1} mb={1}>
//           <form onSubmit={handleSubmit}>
//             <Grid container direction="row" spacing={2}>
//               <Grid item xs={5} md={3}>
//                 <TextField
//                   value={title}
//                   onChange={(event) => setTitle(event.target.value)}
//                   variant="outlined"
//                   label="Enter Designation Title"
//                   fullWidth
//                   size="medium"
//                 />
//               </Grid>
//               <Grid item xs={2}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   sx={{
//                     fontWeight: "bold",
//                     bgcolor: "green",
//                     "&:hover": { bgcolor: "green" }, // Ensuring it stays green on hover
//                   }}
//                   fullWidth
//                   startIcon={<CheckBoxIcon />}
//                 >
//                   SUBMIT
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </Grid>
//       </Grid>

//       <Grid item xs={12} mb={2}>
//         <TableContainer
//           component={Paper}
//           sx={{ borderRadius: "5px", marginTop: "1rem" }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow sx={{ background: "#ff4c4c", color: "white" }}>
//                 <TableCell
//                   sx={{
//                     textAlign: "center",
//                     fontWeight: "bold",
//                     color: "white",
//                   }}
//                 >
//                   S.NO
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     textAlign: "center",
//                     fontWeight: "bold",
//                     color: "white",
//                   }}
//                 >
//                   Title
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     textAlign: "center",
//                     fontWeight: "bold",
//                     color: "white",
//                   }}
//                 >
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {displayedDesignations.map((designation, index) => (
//                 <TableRow key={designation.id}>
//                   <TableCell sx={{ padding: "10px 16px", textAlign: "center" }}>
//                     {index + 1 + page * rowsPerPage}
//                   </TableCell>
//                   <TableCell sx={{ padding: "10px 16px", textAlign: "center" }}>
//                     {designation.title}
//                   </TableCell>
//                   <TableCell sx={{ padding: "10px 16px", textAlign: "center" }}>
//                     <Button
//                       color="secondary"
//                       onClick={() => {
//                         setEditedDesignationTitle(designation.title);
//                         setEditedDesignationId(designation.id);
//                         setOpenModal(true);
//                       }}
//                     >
//                       <Tooltip title="Edit Designation" arrow>
//                         <EditCalendarIcon sx={{ color: "red" }} />
//                       </Tooltip>
//                     </Button>
//                     <Switch
//                       checked={designation.isActive}
//                       onChange={() =>
//                         handleToggleActive(designation.id, designation.isActive)
//                       }
//                       color="success"
//                     />
//                     {/* <Button color="error" onClick={() => handleDelete(designation.id)}>Delete</Button> */}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>

//             <TableFooter>
//               <TableRow>
//                 <TablePagination
//                   rowsPerPageOptions={[5, 10, 25]}
//                   count={designations.length}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//               </TableRow>
//             </TableFooter>
//           </Table>
//         </TableContainer>

//         {/* Modal for Updating Designation */}
//         {openModal && (
//           <Modal
//             onClose={() => setOpenModal(false)}
//             onUpdate={handleUpdate}
//             editedDesignationTitle={editedDesignationTitle}
//             setEditedDesignationTitle={setEditedDesignationTitle}
//           />
//         )}
//       </Grid>

//       {/* Snackbar for Feedback */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//       >
//         <MuiAlert onClose={handleSnackbarClose} severity="info">
//           {snackbarMessage}
//         </MuiAlert>
//       </Snackbar>
//     </Grid>
//   );
// };

// const Modal = ({
//   onClose,
//   onUpdate,
//   editedDesignationTitle,
//   setEditedDesignationTitle,
// }) => {
//   return (
//     <Paper
//       elevation={6}
//       square
//       style={{
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         padding: "16px",
//         width: "90%", // Responsive width
//         maxWidth: "600px", // Max width
//         boxSizing: "border-box", // Ensure padding is included in width calculation
//       }}
//     >
//       <IconButton
//         onClick={onClose}
//         style={{ position: "absolute", top: "8px", right: "8px" }}
//       >
//         <CloseIcon sx={{ color: "red" }} />
//       </IconButton>

//       <Typography variant="h6" gutterBottom>
//         Edit Designation Title
//       </Typography>
//       <TextField
//         sx={{ marginTop: "1rem" }}
//         value={editedDesignationTitle}
//         onChange={(event) => setEditedDesignationTitle(event.target.value)}
//         variant="outlined"
//         label="Title"
//         fullWidth
//       />
//       <Button
//         onClick={onUpdate}
//         variant="contained"
//         color="primary"
//         style={{ float: "inline-end", marginTop: "16px" }}
//       >
//         Update
//       </Button>
//     </Paper>
//   );
// };

// export default Designation;





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
  IconButton,
  Switch,
  Card,
  TablePagination,
  TableFooter,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import Tooltip from "@mui/material/Tooltip";
import MuiAlert from "@mui/material/Alert";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "./apidepartment"; // Import your axios instance
import SendIcon from "@mui/icons-material/Send";


const Designation = () => {
  const [title, setTitle] = useState("");
  const [designations, setDesignations] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editedDesignationTitle, setEditedDesignationTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [editedDesignationId, setEditedDesignationId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [nameError, setNameError] = useState(false);
   

  useEffect(() => {
    getDesignations();
  }, []); // Fetch designations initially

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    setNameError(false);

    if (!title.trim()) {
      setNameError(true);
      isValid = false;
    }
   
    if (isValid) {
      setLoading(true);
      const data = {
        id: 0,
        title,
        isActive: true,
        isDeleted: false,
        createdOn: new Date().toISOString(),
        modifiedOn: new Date().toISOString(),
      };

      try {
        await axiosInstance.post("/CreateDesignation", data);
        Swal.fire("Success!", "Designation created successfully.", "success");
        setTitle("");
        getDesignations(); // Fetch updated designations
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to create designation.", "error");
      }
    }
  };

  const handleUpdate = async () => {
    if (editedDesignationTitle && editedDesignationId !== null) {
        const data = {
          id: editedDesignationId,
          title: editedDesignationTitle,
          isActive: true,
          isDeleted: false,
          modifiedOn: new Date().toISOString(),
        };

        try {
          await axiosInstance.post("/UpdateDesignation", data);
          Swal.fire("Updated!", "Designation updated successfully.", "success");
          getDesignations(); // Refresh the designations list
          setEditDialogOpen(false);
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to update designation.", "error");
        }
      
    }
  };

  const getDesignations = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/GetDesignationDetails");
      if (response.status === 200) {
        setDesignations(response.data.data);
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

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the designation!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (isConfirmed) {
      try {
        await axiosInstance.get(`/DeleteDesignation?DesignationId=${id}`);
        Swal.fire("Deleted!", "Designation deleted successfully.", "success");
        getDesignations(); // Refresh the designations
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to delete designation.", "error");
      }
    }
  };

  const handleToggleActive= async (rowData) => {
         const updatedStatus = !rowData.isActive; 
         // Optimistically update the UI 
         setDesignations((prev) =>
           prev.map((fuel) =>
             fuel.id === rowData.id ? { ...fuel, isActive: updatedStatus } : fuel
           )
         );
     
         try {
           // Assuming the delete API is used to toggle status
           const response = await deleteDesignation(rowData.id);
           if (response.statuscode === 200) {
             Swal.fire(
               "Success",
               `Designation id has been ${updatedStatus ? "activated" : "deactivated"}`,
               "success"
             );
           } else {
             throw new Error(response.message || "Failed to toggle status.");
           }
         } catch (error) {
           // Rollback UI if API fails
           setDesignations((prev) =>
             prev.map((fuel) =>
               fuel.id === rowData.id ? { ...fuel, isActive: !updatedStatus } : fuel
             )
           );
           Swal.fire("Error", error.message || "An error occurred.", "error");
         }
       };
     

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedDesignations = designations.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
        <Typography
          variant="h5"
          sx={{ marginBottom: "2px", fontWeight: "bold" }}
        >
          Designation Master
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} mt={0.5}>
            <Grid item xs={5} md={4}>
              <TextField
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                variant="outlined"
                label="Enter Designation Title"
                fullWidth
                error={!!nameError}
                helperText={nameError && 'Designation Name is required'}
              />
            </Grid>
            <Grid item xs={12} md={2}>
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
                startIcon={<SendIcon />}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </form>
        {/* Modal for Updating Designation */}
      </Card>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: "5px", marginTop: "1rem" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#ff4c4c", color: "white" }}>
              <TableCell
                sx={{ textAlign: "center", fontWeight: "bold", color: "white" }}
              >
                S.NO
              </TableCell>
              <TableCell
                sx={{ textAlign: "center", fontWeight: "bold", color: "white" }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{ textAlign: "center", fontWeight: "bold", color: "white" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedDesignations.map((designation, index) => (
              <TableRow key={designation.id}>
                <TableCell sx={{ padding: "10px 16px", textAlign: "center" }}>
                  {index + 1 + page * rowsPerPage}
                </TableCell>
                <TableCell sx={{ padding: "10px 16px", textAlign: "center" }}>
                  {designation.title}
                </TableCell>
                <TableCell sx={{ padding: "10px 16px", textAlign: "center" }}>
                  <Button
                    color="secondary"
                    onClick={() => {
                      setEditedDesignationTitle(designation.title);
                      setEditedDesignationId(designation.id);
                      setEditDialogOpen(true);
                    }}
                  >
                    <Tooltip title="Edit Designation" arrow>
                      <EditCalendarIcon sx={{ color: "red" }} />
                    </Tooltip>
                  </Button>
                  <Switch
                    checked={designation.isActive}
                    onChange={() =>
                      handleToggleActive(designation)
                    }
                    color="success"
                  />
                  {/* <Button color="error" onClick={() => handleDelete(designation.id)}>Delete</Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={designations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
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
        >
          {" "}
          Edit Designation Name
        </DialogTitle>
        <IconButton
          onClick={() => setEditDialogOpen(false)}
          style={{ position: "absolute", top: "8px", right: "8px" }}
        >
          <CloseIcon sx={{ color: "red" }} />
        </IconButton>
        <Grid sx={{ padding: "20px" }}>
          <TextField
            label="Brand Name"
            variant="outlined"
            fullWidth
            size="medium"
            value={editedDesignationTitle}
            onChange={(event) => setEditedDesignationTitle(event.target.value)}
            sx={{ marginBottom: "20px" }}
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
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Designation;