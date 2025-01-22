// src/components/AddEmployee.js

import React from 'react';
import {
  Box,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  Card,
  FormControl,
  InputLabel,
  Select,
  CircularProgress
} from '@mui/material';
import useAddEmployeeLogic from './AddEmployeeLogic'; // Adjust the path as necessary

const AddEmployee = () => {
  const {
    formData,
    loading,
    creators,
    roles,
    designations,
    departments,
    errors,
    error, // Include error here
    handleChange,
    handleSubmit
  } = useAddEmployeeLogic();

  return (
    <Card>
      <Box sx={{ padding: '16px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox name="forBranch" checked={formData.forBranch} onChange={handleChange} />}
              label="For Branch"
            />
          </Grid>
          {/* First Name, Last Name, Email */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="First Name *"
              fullWidth
              variant="outlined"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Last Name *" fullWidth variant="outlined" name="lastName" value={formData.lastName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Email *" fullWidth variant="outlined" name="email" value={formData.email} onChange={handleChange} />
          </Grid>

          {/* Password, Gender, Department */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Password *" type="password" fullWidth variant="outlined" name="password" onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Gender *" select fullWidth variant="outlined" name="gender" value={formData.gender} onChange={handleChange}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth error={Boolean(errors.department)}>
              <InputLabel id="department-label">
                Department <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <Select label="Department" labelId="department-label" value={formData.department} name="department" onChange={handleChange}>
                {loading ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : (
                  departments.map((department) => (
                    <MenuItem key={department.id} value={department.id}>
                      {department.name}
                    </MenuItem>
                  ))
                )}
              </Select>
              {errors.department && <span style={{ color: 'red', fontSize: '12px' }}>{errors.department}</span>}
            </FormControl>
          </Grid>

          {/* Designation, Role, Reporting */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth error={Boolean(errors.designation)}>
              <InputLabel id="designation-label">
                Designation <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <Select
                label="Designation"
                labelId="designation-label"
                value={formData.designation}
                name="designation"
                onChange={handleChange}
              >
                {designations.map((designation) => (
                  <MenuItem key={designation.id} value={designation.id}>
                    {designation.title}
                  </MenuItem>
                ))}
              </Select>
              {errors.designation && <span style={{ color: 'red', fontSize: '12px' }}>{errors.designation}</span>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth error={Boolean(errors.role)}>
              <InputLabel id="role-label">
                Role <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <Select label="Role" labelId="role-label" value={formData.role} name="role" onChange={handleChange}>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.role && <span style={{ color: 'red', fontSize: '12px' }}>{errors.role}</span>}
            </FormControl>
          </Grid>

          {/* Reporting, Creator, Branch Code */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Reporting *"
              fullWidth
              variant="outlined"
              name="reporting"
              value={formData.reporting}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="creator-label">
                Creator <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              {loading ? (
                <Select label="Creator *" displayEmpty value="">
                  <MenuItem disabled>
                    <CircularProgress size={20} /> Loading...
                  </MenuItem>
                </Select>
              ) : error ? (
                <Select label="Creator *" displayEmpty value="">
                  <MenuItem disabled>{error}</MenuItem>
                </Select>
              ) : (
                <Select
                  label="Creator *"
                  value={formData.creator}
                  onChange={handleChange}
                  name="creator"
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        overflowY: 'auto'
                      }
                    }
                  }}
                  sx={{ minWidth: 120 }}
                >
                  <MenuItem value="">
                    <em>--Select Creator--</em>
                  </MenuItem>
                  {creators.map((creator) => (
                    <MenuItem key={creator.creatorID} value={creator.creator}>
                      {creator.creator}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Branch Code *"
              fullWidth
              variant="outlined"
              name="branchCode"
              value={formData.branchCode}
              onChange={handleChange}
            />
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Date of Birth *"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </Grid>

          {/* Mother's & Father's Name */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Mother's First Name *"
              fullWidth
              variant="outlined"
              name="motherFirstName"
              value={formData.motherFirstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Mother's Last Name *"
              fullWidth
              variant="outlined"
              name="motherLastName"
              value={formData.motherLastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Father's Last Name *"
              fullWidth
              variant="outlined"
              name="fatherLastName"
              value={formData.fatherLastName}
              onChange={handleChange}
            />
          </Grid>

          {/* Addresses */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Permanent Address *"
              fullWidth
              variant="outlined"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Current Address *"
              fullWidth
              variant="outlined"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox name="sameAsPermanent" checked={formData.sameAsPermanent} onChange={handleChange} />}
              label="Same as Permanent Address"
            />
          </Grid>

          {/* Mobile Number, Category, Religion */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Mobile Number *"
              fullWidth
              variant="outlined"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Category *"
              select
              fullWidth
              variant="outlined"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="SC/ST">SC/ST</MenuItem>
              <MenuItem value="OBC">OBC</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Religion *"
              select
              fullWidth
              variant="outlined"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
            >
              <MenuItem value="Hindu">Hindu</MenuItem>
              <MenuItem value="Muslim">Muslim</MenuItem>
              <MenuItem value="Christian">Christian</MenuItem>
            </TextField>
          </Grid>

          {/* Blood Group, Marital Status, Spouse's Details */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Blood Group *"
              fullWidth
              variant="outlined"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Marital Status *"
              select
              fullWidth
              variant="outlined"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Spouse First Name"
              fullWidth
              variant="outlined"
              name="spouseFirstName"
              value={formData.spouseFirstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Spouse Last Name"
              fullWidth
              variant="outlined"
              name="spouseLastName"
              value={formData.spouseLastName}
              onChange={handleChange}
            />
          </Grid>

          {/* FI Sourcing */}
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox name="fiSourcing" checked={formData.fiSourcing} onChange={handleChange} />}
              label="FI Sourcing"
            />
          </Grid>

          {/* Submit Buttons */}
          <Grid container sx={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', alignItems: 'center', spacing: 2 }}>
            <Grid item xs={12} sm={6} md={2}>
              <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button variant="contained" color="warning" fullWidth>
                Details
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default AddEmployee;
