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
} from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';
import apiClient from 'network/apiClient';
import axios from "axios";

   const Download60 = () => {
        const [creator, setCreator] = useState('');
        const [FiCode, setFiCode] = useState('');
        const [Creatorlist, setCreatorlist] = useState([]);
        const [FiID, setFiId] = useState('');

       

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
            } catch (error) {
            } finally {
            }
          };
          const handleCreatorChange = (event) => {
            const selectedCreator = event.target.value;
            setCreator(selectedCreator);
          };
          //------get FiCode-----------
           
          const GetFiId = async () => {
            debugger;
            try {
                const response = await axios.get("https://apiuat.paisalo.in:4015/fi/api/FiSanction/GEtFiIDByCreatorAndFiCode", {
                   // const response = await axios.get("https://localhost:7030/api/FiSanction/GEtFiIDByCreatorAndFiCode", {
                params: {
                    FiCode: FiCode,
                    Creator: creator
              },
                requireAuth: true,
                checkTokenInResponse: false,
              });
              if(response.data.statuscode === 200){
                const fetchFiId = response.data.data;
                if(fetchFiId.length>0){ 
                    setFiId(fetchFiId[0].fi_Id);
                    HandleDownloadForm60(fetchFiId[0].fi_Id);
                }
                else{
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No Record Found",
                  });
                }                
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
          //-------Download Form 60-----
          const HandleDownloadForm60 = async (FiID) => {
            debugger;
            const HouseVisitVM = {
              F_Id: FiID,
              Type: 'Form60',
              DbName: 'PDLERP',
            };
            try {
              const response = await axios.post(
                'https://apiuat.paisalo.in:4015/PDLDocReports/api/DocGen/GetDocument',
                HouseVisitVM
              );
              debugger;
              const { code, message, data } = response.data;
              if (code === 200) {
                const pdfFilePath = data; 
                const fileName = pdfFilePath.split(':').pop(); 
                const pdfUrl = `https://predeptest.paisalo.in:8084/${fileName}`; 
                window.open(pdfUrl, '_blank', 'noopener,noreferrer');
                
              } else if (code === 201) {
                alert('No Data Found');
              } else {
                alert('Error');
              }
            } catch (error) {
              console.error('Error fetching the report:', error);
              alert('Request Failed');
            } finally {
              setLoading(false);
            }
          };

       const   SearchFormDownload=()=>{ 
        GetFiId();
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
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Download Form60
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
            <TextField
              variant="outlined"
              label="Fi Code"
              fullWidth
              value={FiCode}
              onChange={(e) => setFiCode(e.target.value)}
            />
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
              onClick={SearchFormDownload}
            >
              DOWNLOAD
            </Button>
          </Grid>
        </Grid>
    </Card>
  );
};
export default Download60;