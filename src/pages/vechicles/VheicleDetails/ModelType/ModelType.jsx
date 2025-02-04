import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  CircularProgress,
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
  TablePagination ,
  Paper
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  getVehicleTypes,
  getFuelTypeDetails,
  getBrandDetails,
  createNewModel,
  getModelDetails,
  updateModel,
  deleteModel
} from "../../../../api/apiVheicle";
import Swal from "sweetalert2";
import EditIcon from '@mui/icons-material/Edit';

const ModelType = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [dropdown3, setDropdown3] = useState("");
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState([]);

    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page
  
  
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [brandDetails, setBrandDetails] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false); // Dialog state
  const [dialogMode, setDialogMode] = useState("create"); // "create" or "edit"

  // Error states
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [dropdown1Error, setDropdown1Error] = useState(false);
  const [dropdown2Error, setDropdown2Error] = useState(false);
  const [dropdown3Error, setDropdown3Error] = useState(false);

  // Fetch dropdown data and model details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehicleResponse, fuelResponse, brandResponse, modelResponse] = await Promise.all([
          getVehicleTypes(),
          getFuelTypeDetails(),
          getBrandDetails(),
          getModelDetails(),
        ]);

        if (vehicleResponse.statuscode === 200) {
          setVehicleTypes(vehicleResponse.data);
        }

        if (fuelResponse.statuscode === 200) {
          setFuelTypes(fuelResponse.data);
        }

        if (brandResponse.statuscode === 200) {
          setBrandDetails(brandResponse.data);
        }

        if (modelResponse.statuscode === 200) {
          setModels(modelResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleDialogOpen = (mode = "create", rowData = {}) => {
    setDialogMode(mode);
    if (mode === "edit") {
      setName(rowData.modelName || "");
      setDescription(rowData.description || "");
      setDropdown1(rowData.vehicleTypeId || "");
      setDropdown2(rowData.fuelTypeId || "");
      setDropdown3(rowData.brandId || "");
      setDialogOpen(true); // Store the ID for editing
    } else {
      setName("");
      setDescription("");
      setDropdown1("");
      setDropdown2("");
      setDropdown3("");
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    setNameError(!name.trim());
    setDescriptionError(!description.trim());
    setDropdown1Error(!dropdown1);
    setDropdown2Error(!dropdown2);
    setDropdown3Error(!dropdown3);

    if (!name.trim() || !description.trim() || !dropdown1 || !dropdown2 || !dropdown3) return;

    setLoading(true);
    try {
      const modelData = {
        Name: name,
        Description: description,
        VehicleTypeId: dropdown1,
        FuelTypeId: dropdown2,
        BrandId: dropdown3,
      };

      if (dialogMode === "create") {
        // Create new model
        const response = await createNewModel(modelData);
        if (response.statuscode === 200) {
          alert("Model created successfully!");
          const updatedModelsResponse = await getModelDetails();
          if (updatedModelsResponse.statuscode === 200) {
            setModels(updatedModelsResponse.data);
          }
        } else {
          alert(response.message || "Failed to create model.");
        }
      } else if (dialogMode === "edit") {
        // Update existing model
        modelData.Id = rowData.id; // Pass the `id` of the model being updated
        const response = await updateModel(modelData);
        if (response.statuscode === 200) {
          alert("Model updated successfully!");
          const updatedModelsResponse = await getModelDetails();
          if (updatedModelsResponse.statuscode === 200) {
            setModels(updatedModelsResponse.data);
          }
        } else {
          alert(response.message || "Failed to update model.");
        }
      }
    } catch (error) {
      alert("An error occurred.");
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
      handleDialogClose();
    }
  };

  const toggleStatus = async (rowData) => {
    const toggleTo = !rowData.isActive; // Determine the new state
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${rowData.isActive ? "deactivate" : "activate"} this model?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true); // Start loading
          const response = await deleteModel(rowData.id); // Call the API
          if (response.statuscode === 200) {
            Swal.fire(
              "Success",
              rowData.isActive
                ? "Model deactivated successfully!"
                : "Model activated successfully!",
              "success"
            );

            // Update local state to reflect the change
            setModels((prevModels) =>
              prevModels.map((model) =>
                model.id === rowData.id ? { ...model, isActive: toggleTo } : model
              )
            );
          } else {
            Swal.fire("Error", response.message || "Failed to toggle status.", "error");
          }
        } catch (error) {
          Swal.fire("Error", error.message || "An error occurred.", "error");
        } finally {
          setLoading(false); // Stop loading
        }
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: '15px', fontWeight: 'bold', color: 'black' }}>
        Model Master
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: "5px" }}>
        {/* Vehicle Type Dropdown */}
        <Grid item xs={12} md={2} sm={3}>
          <FormControl fullWidth error={dropdown1Error}>
            <InputLabel id="dropdown1-label">Vehicle Type *</InputLabel>
            <Select
              labelId="dropdown1-label"
              id="dropdown1"
              value={dropdown1}
              onChange={(e) => setDropdown1(e.target.value)}
              label="Vehicle Type"
            >
              {vehicleTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
            {dropdown1Error && <FormHelperText>Vehicle Type is required</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Fuel Type Dropdown */}
        <Grid item xs={12} md={2} sm={3}>
          <FormControl fullWidth error={dropdown2Error}>
            <InputLabel id="dropdown2-label">Fuel Type *</InputLabel>
            <Select
              labelId="dropdown2-label"
              id="dropdown2"
              value={dropdown2}
              onChange={(e) => setDropdown2(e.target.value)}
              label="Fuel Type"
            >
              {fuelTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
            {dropdown2Error && <FormHelperText>Fuel Type is required</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Brand Dropdown */}
        <Grid item xs={12} md={2} sm={3}>
          <FormControl fullWidth error={dropdown3Error}>
            <InputLabel id="dropdown3-label">Brand *</InputLabel>
            <Select
              labelId="dropdown3-label"
              id="dropdown3"
              value={dropdown3}
              onChange={(e) => setDropdown3(e.target.value)}
              label="Brand"
            >
              {brandDetails.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
            {dropdown3Error && <FormHelperText>Brand is required</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Model Name Field */}
        <Grid item xs={12} md={2} sm={3}>
          <TextField
            label="Model Name *"
            variant="outlined"
            fullWidth
            size="medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
            helperText={nameError && "Model Name is required"}
          />
        </Grid>

        {/* Description Field */}
        <Grid item xs={12} md={2} sm={4}>
          <TextField
            label="Description *"
            variant="outlined"
            fullWidth
            size="medium"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={descriptionError}
            helperText={descriptionError && "Description is required"}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12} md={2} container alignItems="center">
          <Button
            variant="contained"
            size="large"
            type="button"
            sx={{ bgcolor: 'green', borderRadius: '0px', color: 'white', fontWeight: 'bold' }}
            startIcon={<CheckBoxIcon />}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Submit"}
          </Button>
        </Grid>
      </Grid>

      {/* Data Table */}
      <Box className="card" sx={{ marginTop: "10px" }}>
      
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#ff4c4c', color: 'white' }}>
                  <TableCell style={{ color: 'white',  textAlign: 'center' }}>Sr. No.</TableCell>
                  <TableCell style={{ color: 'white',  textAlign: 'center' }}>ID</TableCell>
                  <TableCell style={{ color: 'white',  textAlign: 'center' }}>Model Name</TableCell>
                  <TableCell style={{ color: 'white',  textAlign: 'center' }}>Description</TableCell>
                  <TableCell style={{ color: 'white',  textAlign: 'center' }}>Vehicle Name</TableCell>
                  <TableCell style={{ color: 'white',  textAlign: 'center' }}>Brand Name</TableCell>
                  <TableCell style={{ color: 'white',  textAlign: 'center' }}>Fuel Type</TableCell>
                  <TableCell style={{ color: 'white',  textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {models.map((model, index) => (
                  <TableRow key={model.id}>
                    <TableCell style={{textAlign: 'center' }}>{index + 1}</TableCell>
                    <TableCell style={{textAlign: 'center' }}>{model.id}</TableCell>
                    <TableCell style={{textAlign: 'center' }}>{model.modelName}</TableCell>
                    <TableCell style={{textAlign: 'center' }}>{model.description}</TableCell>
                    <TableCell style={{textAlign: 'center' }}>{model.vehicleName}</TableCell>
                    <TableCell style={{textAlign: 'center' }}>{model.brandName}</TableCell>
                    <TableCell style={{textAlign: 'center' }}>{model.fuelType}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <EditIcon
                          onClick={() => handleDialogOpen("edit", model)}
                          sx={{
                            fontSize: "24px",
                            color: "#1976d2",
                            cursor: "pointer",
                            "&:hover": { color: "#115293" },
                          }}
                        />
                        {/* Switch Button */}
                        <Switch
                          checked={model.isActive}
                          onChange={() => toggleStatus(model)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#4caf50',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#81c784',
                            },
                            '& .MuiSwitch-track': {
                              backgroundColor: model.isActive ? '#81c784' : '#ef9a9a',
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
              count={models.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
  
      </Box>

      {/* Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleDialogClose} 
        fullWidth
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
        }}>
          {dialogMode === "create" ? "Add New Model" : "Edit Model"}
        </DialogTitle>
        <DialogContent sx={{ padding: '24px', backgroundColor: '#ffff' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Model Name *"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameError && "Model Name is required"}
                sx={{ marginBottom: "15px", marginTop: '10px', }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description *"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={descriptionError}
                helperText={descriptionError && "Description is required"}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={dropdown1Error}>
                <InputLabel id="dropdown1-label">Vehicle Type *</InputLabel>
                <Select
                  labelId="dropdown1-label"
                  id="dropdown1"
                  value={dropdown1}
                  onChange={(e) => setDropdown1(e.target.value)}
                  label="Vehicle Type"
                >
                  {vehicleTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
                {dropdown1Error && <FormHelperText>Vehicle Type is required</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={dropdown2Error}>
                <InputLabel>Fuel Type *</InputLabel>
                <Select
                  labelId="dropdown2-label"
                  id="dropdown2"
                  value={dropdown2}
                  onChange={(e) => setDropdown2(e.target.value)}
                  label="Fuel Type"
                >
                  {fuelTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
                {dropdown2Error && <FormHelperText>Fuel Type is required</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={dropdown3Error}>
                <InputLabel>Brand *</InputLabel>
                <Select
                  labelId="dropdown3-label"
                  id="dropdown3"
                  value={dropdown3}
                  onChange={(e) => setDropdown3(e.target.value)}
                  label="Brand"
                >
                  {brandDetails.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </Select>
                {dropdown3Error && <FormHelperText>Brand is required</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}
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
          <Button onClick={handleSubmit} variant="contained" disabled={loading}
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
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModelType;