import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  FormControl,
  InputLabel,
  Select,  MenuItem,
} from '@mui/material';
import Swal from 'sweetalert2';
import DownloadIcon from '@mui/icons-material/Download';
import apiClient from "network/apiClient";
import axios from "axios";

const DownloadOnePager = () => {
    const [fiCode, setFiCode] = useState("");
    const [creator, setCreator] = useState("");
    const [Creatorlist, setCreatorlist] = useState([]);
    const [downloadlist, setdownloadlist] = useState([]);



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
    //-----------download one pager API call------------

  const handleDownloadonePager = async () => {
    debugger;
    if (!fiCode || !creator) {
      console.error("Invalid inputs for handlePersonalInfoClick:", {
        fiCode,
        creator,
      });
      return;
    }
    //setLoading(true);
    
    const url = `https://apiuat.paisalo.in:4015/fi/api/FiSanction/OnePgerdonload?ficode=${fiCode}&creator=${creator}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          //Authorization: `Bearer ${token}`, // Ensure proper headers JSON.parse(response.data.data)
        },
      });
      
      const { statuscode, message, data } = response.data;
      if (statuscode === 200) {
        const pdfFilePath = data.pdfOnePager; 
        const urlRegex = /https?:\/\/[^\s'"]+/;
        const extractedUrl = pdfFilePath.match(urlRegex)[0];
        window.open(extractedUrl, '_blank', 'noopener,noreferrer');
       
      } else {
        alert(response.data.message);
        // console.error(
        //   "Error in API response:",
        //   response.data.message || "Unknown error"
        // );
      }
    } catch (error) {
      console.error("Error in handlePersonalInfoClick:", error);
    } finally {
      //setLoading(false);
    }
  };

  const handleSearch = () => {
    handleDownloadonePager();
   
  };
  return (
   <Card
          sx={{
            boxShadow: "none",
            borderRadius: "7px",
            mb: "10px",
          }}
          className="rmui-card"
        >
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Download One Pager
      </Typography>

        <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          fullWidth
                          label="FiCode"
                          value={fiCode}
                          onChange={(e) => setFiCode(e.target.value)}
                          variant="outlined"
                          size="medium"
                        />
                         
                      </Grid>
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
          
          <Grid item xs={12} md={1.5}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(135deg,rgb(8, 103, 20),rgb(2, 88, 8))',
                "& .MuiButton-startIcon": {
                  fontSize: "20px",
                },
              }}
              fullWidth
              startIcon={<DownloadIcon />}
              onClick={handleSearch}
            >
              DOWNLOAD
            </Button>
          </Grid>
        </Grid>
    </Card>
  );
};

export default DownloadOnePager;
