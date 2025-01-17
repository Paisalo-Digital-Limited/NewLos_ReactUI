import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  IconButton,
  Tooltip,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { Switch } from "@mui/material";
import MainCard from 'components/MainCard';
import ComponentSkeleton from '../component-overview/ComponentSkeleton';
import SendIcon from '@mui/icons-material/Send';
import AnimateButton from 'components/@extended/AnimateButton';

const PermissionAccess = () => {
  const headers = ["S.No", "Controller", "Action Name", "Service Name", "Title", "Action"];
  const rows = [
    { id: 1, controller: "Controller1", actionName: "Action1", serviceName: "Service1", title: "Page 1", isActive: true },
    { id: 2, controller: "Controller2", actionName: "Action2", serviceName: "Service2", title: "Page 2", isActive: false },
    { id: 3, controller: "Controller3", actionName: "Action3", serviceName: "Service3", title: "Page 3", isActive: true },
  ];

  const menuItems = [
    { id: 1, title: "Page 1" },
    { id: 2, title: "Page 2" },
    { id: 3, title: "Page 3" },
    { id: 1, title: "Page 4" },
    { id: 2, title: "Page 5" },
    { id: 3, title: "Page 6" },
  ];

  return (
    <ComponentSkeleton>
      <MainCard>
        {/* Form Card */}
        <Card sx={{ boxShadow: "none", borderRadius: "7px", mb: 2, padding: 2 }}>
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={12} md={3}>
              <TextField label="Controller Name" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="Action Name" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="Service Name" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Page</InputLabel>
                <Select defaultValue="" label="Page">
                  {menuItems.map((item) => (
                    <MenuItem key={item.id} value={item.title}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} mt={2} md={2}>
            <AnimateButton>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                fontWeight: 'bold',
                    bgcolor: 'green',
                    '&:hover': { bgcolor: 'green' } // Ensuring it stays green on hover
                  }}
              fullWidth
              startIcon={<SendIcon />} // Adding Submit Icon
            >
              SUBMIT
            </Button>
            </AnimateButton>
            </Grid>
          </Grid>
        </Card>

        {/* Table Card */}
        <TableContainer component={Paper} sx={{ borderRadius: '5px', overflow: 'hidden', marginBottom: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: "bold",
                      background: '#ff4c4c', 
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
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.controller}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.actionName}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.serviceName}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.title}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Tooltip title="Edit">
                        <IconButton>
                          <EditCalendarIcon sx={{ color: 'red', fontSize: "24px" }} />
                        </IconButton>
                      </Tooltip>
                      <Switch
                        checked={row.isActive}
                        disabled
                        sx={{
                          '& .MuiSwitch-switchBase': {
                            '&.Mui-checked': {
                              '& .MuiSwitch-thumb': {
                                background: "green",
                              },
                            },
                            '&:not(.Mui-checked) .MuiSwitch-thumb': {
                              background: 'red',
                            },
                            '&.Mui-checked + .MuiSwitch-track': {
                              border: '1px solid black',
                            },
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={headers.length} align="center">
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit Dialog */}
        <Dialog open={false}>
          <DialogTitle>Edit Permission</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Controller Name" fullWidth margin="normal" />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Action Name" fullWidth margin="normal" />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Service Name" fullWidth margin="normal" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="secondary">Cancel</Button>
            <Button color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </MainCard>
    </ComponentSkeleton>
  );
};

export default PermissionAccess;