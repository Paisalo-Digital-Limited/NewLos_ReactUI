import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import { createFuelType, getFuelTypeDetails, updateFuelType, deleteFuelType } from "../../../../api/apiVheicle";
import AnimateButton from 'components/@extended/AnimateButton';

const FuelType = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFuelType, setEditFuelType] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const tableCellStyle = {
    background: '#ff4c4c',
    padding: '10px 16px',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  };
  
  // Fetch Fuel Types
  const fetchFuelTypes = async () => {
    setLoading(true);
    try {
      const response = await getFuelTypeDetails();
      if (response.statuscode === 200) {
        setFuelTypes(response.data);
      } else {
        Swal.fire("Error", response.message || "Failed to fetch data.", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "An error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuelTypes();
  }, []);

  // Handle Fuel Type Submission
  const handleSubmit = async () => {
    if (!name.trim() || !description.trim()) {
      Swal.fire("Warning", "Both fields are required!", "warning");
      return;
    }

    setLoading(true);
    try {
      const response = await createFuelType({ Name: name, Description: description });
      if (response.statuscode === 200) {
        Swal.fire("Success", response.message, "success");
        fetchFuelTypes(); // Refresh the table data
        setName("");
        setDescription("");
      } else {
        Swal.fire("Error", response.message || "Failed to create fuel type.", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "An error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle Editing Fuel Type
  const handleEdit = (fuelType) => {
    setEditFuelType(fuelType);
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    if (!editFuelType?.name.trim() || !editFuelType?.description.trim()) {
      Swal.fire("Warning", "Both fields are required!", "warning");
      return;
    }

    setLoading(true);
    try {
      const response = await updateFuelType({
        Id: editFuelType.id,
        Name: editFuelType.name,
        Description: editFuelType.description,
      });
      if (response.statuscode === 200) {
        Swal.fire("Success", response.message, "success");
        fetchFuelTypes(); // Refresh the table data
        setEditDialogOpen(false);
      } else {
        Swal.fire("Error", response.message || "Failed to update fuel type.", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "An error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Fuel Type Status
  const toggleFuelType = async (rowData) => {
    const updatedStatus = !rowData.isActive;

    // Optimistically update the UI
    setFuelTypes((prev) =>
      prev.map((fuel) =>
        fuel.id === rowData.id ? { ...fuel, isActive: updatedStatus } : fuel
      )
    );

    try {
      // Assuming the delete API is used to toggle status
      const response = await deleteFuelType(rowData.id);
      if (response.statuscode === 200) {
        Swal.fire(
          "Success",
          `Fuel type has been ${updatedStatus ? "activated" : "deactivated"}`,
          "success"
        );
      } else {
        throw new Error(response.message || "Failed to toggle status.");
      }
    } catch (error) {
      // Rollback UI if API fails
      setFuelTypes((prev) =>
        prev.map((fuel) =>
          fuel.id === rowData.id ? { ...fuel, isActive: !updatedStatus } : fuel
        )
      );
      Swal.fire("Error", error.message || "An error occurred.", "error");
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: '15px', fontWeight: 'bold', color: 'black' }}>
        Fuel Master
      </Typography>

      <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: "5px" }}>
        <Grid item xs={12} md={2} sm={3}>
          <TextField
            label="Fuel Name"
            variant="outlined"
            fullWidth
            size="medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={2} sm={4}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="medium"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={2}>       
          <AnimateButton>
          <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                fontWeight: 'bold',
                    bgcolor: 'green',
                    '&:hover': { bgcolor: 'green' } // Ensuring it stays green on hover
                  }}
              startIcon={<CheckBoxIcon />} // Adding Submit Icon
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
            </AnimateButton>
        </Grid>
      </Grid>

      <Box className="card" sx={{ marginTop: "10px" }}>
    
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableCellStyle}>Sr. No.</TableCell>
                  <TableCell sx={tableCellStyle}>ID</TableCell>
                  <TableCell sx={tableCellStyle}>Fuel Name</TableCell>
                  <TableCell sx={tableCellStyle}>Description</TableCell>
                  <TableCell sx={tableCellStyle}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? fuelTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : fuelTypes
                ).map((rowData, index) => (
                  <TableRow key={rowData.id}>
                    <TableCell  sx={{ textAlign: 'center' }}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell  sx={{ textAlign: 'center' }}>{rowData.id}</TableCell>
                    <TableCell  sx={{ textAlign: 'center' }}>{rowData.name}</TableCell>
                    <TableCell  sx={{ textAlign: 'center' }}>{rowData.description}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center",justifyContent:'center' }}>
                        <EditIcon
                          onClick={() => handleEdit(rowData)}
                          sx={{
                            fontSize: "24px",
                            color: "#1976d2",
                            cursor: "pointer",
                            "&:hover": { color: "#115293" },
                          }}
                        />
                        <Switch
                          checked={rowData.isActive}
                          onChange={() => toggleFuelType(rowData)}
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#4caf50",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                              backgroundColor: "#81c784",
                            },
                            "& .MuiSwitch-track": {
                              backgroundColor: rowData.isActive ? "#81c784" : "#ef9a9a",
                            },
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={fuelTypes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </TableContainer>

      </Box>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '16px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          },
        }}
      >
        <DialogTitle sx={{
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #2196f3, #21cbf3)',
          color: 'white',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          padding: '16px 24px',
          marginBottom: '30px'
        }}>Edit Fuel Type</DialogTitle>

        <DialogContent>
          <TextField
            label="Fuel Name"
            variant="outlined"
            fullWidth
            size="medium"
            value={editFuelType?.name || ""}
            onChange={(e) =>
              setEditFuelType((prev) => ({ ...prev, name: e.target.value }))
            }
            sx={{ marginBottom: "15px", marginTop: '10px', }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="medium"
            value={editFuelType?.description || ""}
            onChange={(e) =>
              setEditFuelType((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}
            sx={{
              borderRadius: '12px',
              padding: '8px 24px',
              fontSize: '1rem',
              textTransform: 'none',
              borderColor: '#d32f2f',
              color: '#d32f2f',
              '&:hover': {
                background: '#ffd2d2',
              },
            }}
          >Cancel</Button>
          <Button onClick={handleEditSave} variant="contained"
            sx={{
              borderRadius: '12px',
              padding: '8px 24px',
              fontSize: '1rem',
              textTransform: 'none',
              background: 'linear-gradient(135deg, #21cbf3, #2196f3)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(135deg, #1a78c2, #1976d2)',
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FuelType;