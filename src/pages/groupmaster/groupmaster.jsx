import React from 'react';
import {
  Grid,
  Card,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  Divider,
  Typography,
  Chip,
  Button,
  Stack,
  Paper,
} from '@mui/material';
import { Save as SaveIcon, Search as SearchIcon, Edit as EditIcon, Update as UpdateIcon } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import ComponentSkeleton from '../component-overview/ComponentSkeleton';


const JljGroupMaster = () => {
  const formValues = {
    creator: "Sample Creator",
    branchCode: "000",
    groupCode: "Sample Group Code",
    groupName: "",
    villageName: "",
    centerName: "",
    cso: "",
    bmCode: "",
    preGRT: "",
    grt: "",
  };

  return (

        <ComponentSkeleton>
        <MainCard>
    <Box component="form">
      <Paper
        elevation={3}
        sx={{
          borderRadius: "12px",
          padding: "32px",
          mb: "24px",
          boxShadow: "none",
        }}
      >
        <Divider>
          <Chip label=" 📑 Group Master Details" size="small" />
        </Divider>
        <Box sx={{ mb: 4, mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="creator-label">Select Creator</InputLabel>
                <Select
                  labelId="creator-label"
                  id="creator-select"
                  value={formValues.creator}
                  label="Select Creator"
                >
                  <MenuItem value="Sample Creator">Sample Creator</MenuItem>
                  <MenuItem value="Creator 1">Creator 1</MenuItem>
                  <MenuItem value="Creator 2">Creator 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="branch-code-label">Branch Code</InputLabel>
                <Select
                  labelId="branch-code-label"
                  value={formValues.branchCode}
                >
                  <MenuItem value="000">000</MenuItem>
                  <MenuItem value="002">002</MenuItem>
                  <MenuItem value="003">003</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="groupCode"
                label="Group Code"
                variant="outlined"
                fullWidth
                value={formValues.groupCode}
              />
            </Grid>

            <Grid item xs={3}>
              <Box sx={{ textAlign: "left", display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<SearchIcon />}
                  sx={{
                    textTransform: "none",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    padding: "12px 28px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    boxShadow: "0px 4px 15px rgba(76, 175, 80, 0.3)",
                    "&:hover": {
                      backgroundColor: "#388E3C",
                    },
                  }}
                >
                  Search
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Divider sx={{ mb: 4 }}>
            <Chip label="📝 Details" size="small" />
          </Divider>
          <Grid container spacing={3}>
            {[
              "groupName",
              "villageName",
              "centerName",
              "cso",
              "bmCode",
              "preGRT",
              "grt",
            ].map((field, index) => (
              <Grid item xs={12} md={3} key={index}>
                <TextField
                  fullWidth
                  label={field.replace(/([A-Z])/g, " $1").trim() + " *"}
                  name={field}
                  value={formValues[field] || ""}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2, color: "#444" }}
          >
            ⚡ Actions
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "center", mt: 2 }}
          >
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{
                textTransform: "none",
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "12px 28px",
                backgroundColor: "#FFA726",
                color: "white",
                "&:hover": {
                  backgroundColor: "#FB8C00",
                },
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<UpdateIcon />}
              sx={{
                textTransform: "none",
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "12px 28px",
                backgroundColor: "#42A5F5",
                color: "white",
                "&:hover": {
                  backgroundColor: "#1E88E5",
                },
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                textTransform: "none",
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "12px 28px",
                backgroundColor: "#FFA726",
                color: "white",
                "&:hover": {
                  backgroundColor: "#FB8C00",
                },
              }}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
          </MainCard>
        </ComponentSkeleton>
  );
};

export default JljGroupMaster;