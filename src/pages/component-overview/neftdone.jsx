import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  TableFooter,
  TablePagination,
  Card,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import BackupIcon from "@mui/icons-material/Backup";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
  { id: "select", label: "" },
  { id: "smCode", label: "SM Code" },
  { id: "fiCode", label: "FI Code" },
  { id: "creator", label: "Creator" },
  { id: "groupCode", label: "Group Code" },
  { id: "branchCode", label: "Branch Code" },
  { id: "loanDuration", label: "Loan Duration (months)" },
  { id: "bankName", label: "Bank Name" },
  { id: "bankAccount", label: "Bank Account" },
  { id: "encProperty", label: "Enc Property" },
  { id: "schCode", label: "Sch Code" },
  { id: "sanctionedAmt", label: "Sanctioned Amount" },
  { id: "bankIFCS", label: "IFSC" },
  { id: "fullName", label: "Full Name" },
  { id: "trackStatus", label: "Track Status" },
  { id: "action", label: "Action" },
];

const ComponentTypography = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ boxShadow: "none", borderRadius: "7px", p: 2, mb: 2 }}>
        <Typography variant="h5">CASE STATUS</Typography>
        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
          {["Bulk NEFT Approved", "NEFT Reject/Return Cases"].map((label) => (
            <Grid item xs={12} sm={6} key={label}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "5px", color: "red" }}>
                {label} <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{
                display: "flex",
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: "flex-start",
                gap: "10px"
              }}>
                <Button
                  variant="outlined"
                  component="label"
                  size="large"
                  startIcon={<BackupIcon />}
                  sx={{ textTransform: 'none', color: '#3f51b5', borderColor: '#3f51b5', fontWeight: 600 }}>
                  <input type="file" hidden />
                  Choose File
                </Button>
                <Button
                  variant="contained"
                  startIcon={<FileUploadIcon />}
                  sx={{ background: "linear-gradient(135deg, #9C27B0, #BA68C8)" }}
                >
                  Upload
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CheckCircleIcon />}
                  sx={{ background: "linear-gradient(135deg, #2196F3, #64B5F6)" }}
                >
                  Sample File
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>

      <Card sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5">NEFT DONE</Typography>
        <Grid container spacing={2} alignItems="center" sx={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel>Search by</InputLabel>
              <Select defaultValue="Date" variant="outlined">
                <MenuItem value="Date">Date</MenuItem>
                <MenuItem value="Creator">Creator</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField label="From Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField label="To Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField label="Branch Code" fullWidth />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField label="Group Code" fullWidth />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={() => {}}
              sx={{ padding: "10px 12px" }}
            >
              Search
            </Button>
          </Grid>

          <Grid item xs={12} sm={1}>
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              onClick={() => {}}
              sx={{ background: "linear-gradient(135deg, #FF9800, #FFB74D)" }}
            >
              Export
            </Button>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              onClick={() => {}}
              sx={{ background: "linear-gradient(135deg, #009688, #4DB6AC)" }}
            >
              Approve
            </Button>
          </Grid>
        </Grid>
      </Card>

      <TableContainer component={Paper} sx={{ borderRadius: '5px', overflow: "auto", maxWidth: '100%' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#ff4c4c' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ fontWeight: "bold", textTransform: "uppercase", color: "white", padding: 1 }}>
                  <Typography variant="body2" noWrap>{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox color="default" />
                </TableCell>
                {columns.slice(1).map((column) => (
                  <TableCell key={column.id} sx={{ padding: 1 }}>Placeholder Data</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={3} // Placeholder for total count
                rowsPerPage={5}
                page={0} // Placeholder for current page
                onPageChange={() => {}}
                onRowsPerPageChange={() => {}}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ComponentTypography;