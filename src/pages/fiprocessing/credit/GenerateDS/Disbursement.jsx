import React, { useState } from "react";
import { useEffect } from "react";

import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  FormControl,
  InputLabel,
  Select,MenuItem 
} from "@mui/material";
import Swal from "sweetalert2";
import ArticleIcon from '@mui/icons-material/Article';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import apiClient from 'network/apiClient';
import axios from "axios";

const Disbursement = () => {
    const [creator, setCreator] = useState('');
    const [branchCode, setBranchCode] = useState('');
    const [groupCode, setGroupCode] = useState('');
    const [Creatorlist, setCreatorlist] = useState([]);
    const [Branchlist, setBranchlist] = useState([]);


 useEffect(() => {
    getCreatorDropdown();
  }, []);
  const getCreatorDropdown = async () => {
    debugger;
    try {
      const response = await apiClient.get("/Masters/GetCreator", {
        requireAuth: true,
        checkTokenInResponse: false,
      });
      const fetchCreator = response.data.data;
      setCreatorlist(fetchCreator);
      //getBranchDropdown();
    } catch (error) {
    } finally {
    }
  };
  const getBranchDropdown = async (creator) => {
    try {
      debugger;
      //const response = await apiClient.get("https://localhost:5238/api/Masters/GetBranchCodeByCreator", {
        const response = await axios.get("http://localhost:5238/api/Masters/GetBranchCodeByCreator", {
        params: {
          Creator: creator
      },
        requireAuth: true,
        checkTokenInResponse: false,
      });
      if(response.data.statuscode === 200){
        const fetchBranch = response.data.data;
        setBranchlist(fetchBranch);
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
     
    } catch (error) {
    } finally {
    }
  };

  const handleCreatorChange = (event) => {
    const selectedCreator = event.target.value;
    setCreator(selectedCreator);
    getBranchDropdown(selectedCreator);
  };
  const handleBranchChange = (event) => { 
    debugger;
    const selectedBranch = event.target.value;
    setBranchCode(selectedBranch);
  }
  const handleDownloadDisbursementSheet = () => {
    debugger;
    Creator:creator;
    BranchCode:branchCode;
    GroupCode:groupCode
      // Split the branchCode to extract the first part
      const branchNumber = branchCode.split('-')[0]; // This will give you "002"

  }

  const handleSearch = () => {
    handleDownloadDisbursementSheet();
  }

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "7px",
        mb: "10px",
      }}
      className="rmui-card"
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Cam Generation
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={5} md={3}>
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
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
         <FormControl fullWidth size="medium">
                  <InputLabel>Branch Code</InputLabel>
                  <Select
                    label="Creator"
                    size="medium"
                    value={branchCode}
                    onChange={handleBranchChange}
                  >
                    {Branchlist.map((index) => (
                      <MenuItem key={index.branch} value={index.branch}>
                        {index.branch}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
          {/* <FormControl fullWidth>
            <InputLabel id="sub-menu-label">Branch Code</InputLabel>
            <Select
              label="Sub Menu"
              labelId="sub-menu-label"
              id="sub-menu-select"
            ></Select>
          </FormControl> */}
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField variant="outlined" label="Group Code" fullWidth 
           value={groupCode}
           onChange={(e) => setGroupCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField variant="outlined" label="Database Name" fullWidth />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={5} md={2} sx={{justifyContent:"flex-end", display:"flex"}}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            bgcolor: 'green',
            marginTop: '15px',
            "& .MuiButton-startIcon": {
                  fontSize: "20px",
                },
          }}
          startIcon={< ArticleIcon/>}
          onClick={handleSearch}
        >
          DISBURSEMENT SHEET
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(135deg,rgb(166, 66, 9),rgb(173, 77, 4))',
            marginTop: '15px',
            marginLeft: '20px',
            "& .MuiButton-startIcon": {
                  fontSize: "20px",
                },
          }}
          startIcon={<CreditCardIcon/>}
        >
          LOAN CARD
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(135deg, #FF9800,rgb(247, 152, 11))',
            marginTop: '15px',
            marginLeft: '20px',
            "& .MuiButton-startIcon": {
                  fontSize: "20px",
                },
          }}
          startIcon={<FingerprintIcon/>}
        >
          THUMB EXPRESSION
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(135deg,rgb(2, 83, 42),rgb(5, 75, 45))',
            marginTop: '15px',
            marginLeft: '20px',
            "& .MuiButton-startIcon": {
                  fontSize: "20px",
                },
          }}
          startIcon={<CreditScoreIcon/>}
        >
          SIGNED LOAN CARD
        </Button>
      </Grid>

    </Card>
  );
};

export default Disbursement;
