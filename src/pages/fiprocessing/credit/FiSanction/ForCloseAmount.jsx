import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  FormControl,
  InputLabel,
  Select,
  Box,
} from "@mui/material";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import { constant, set } from "lodash";
import handleGetCrif from "../Index/handleGetCrif";
import axios from "axios";

const ForCloseAmount = () => {
    const [smCode, setSmCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [ForCloseDataList, setForCloseDataList] = useState({
        custName: '',
        amtToColl: 0,
      });
      const [errorMessage, setErrorMessage] = useState('');

    const handleForCloserAmount = async (smCode) => { 
        debugger;  
     const url = `https://apiuat.paisalo.in:4015/fi/api/FiSanction/GetForcedCloseData?SmCode=${smCode}`;
     try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            //Authorization: `Bearer ${token}`, // Ensure proper headers JSON.parse(response.data.data)
          },
        });
        
        const { statuscode, message, data } = response.data;
        debugger;
        if (statuscode === 200) {
            const fetchForCloseData = response.data.data;
            if (fetchForCloseData.custName && fetchForCloseData.amtToColl!== 0) {
                setForCloseDataList(fetchForCloseData);
                setErrorMessage('');
              } 
              else {
                setErrorMessage('Amount To Collection 0. Please contact your coordinator!!');
              }
         
        } else {
          console.error(
            "Error in API response:",
            response.data.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error in handlePersonalInfoClick:", error);
      } finally {
        //setLoading(false);
      }

    }

   const handleSearch = () => {
    if (smCode === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter SM Code",
      });
    } else {
        handleForCloserAmount(smCode);
    }
   };

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
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        ForClose Amount Calculation
        </Typography>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={5} md={3}>
            <TextField variant="outlined" label="Sm Code" 
            fullWidth
            value={smCode}
            onChange={(e) => setSmCode(e.target.value)}
             size="medium"
             />
          </Grid>

          <Grid item xs={12} md={1.5}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background:
                  "linear-gradient(135deg,rgb(17, 121, 206),rgb(17, 126, 216))",
                "& .MuiButton-startIcon": {
                  fontSize: "20px",
                },
              }}
              fullWidth
              startIcon={<SearchIcon />}
              onClick={handleSearch}
            >
              SEARCH
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mt: "10px",
        }}
        className="rmui-card"
      >
      {ForCloseDataList.custName && ForCloseDataList.amtToColl !== 0 ? (
        <div>
          <div id="custName">Customer Name: {ForCloseDataList.custName}</div>
          <div id="amounttocall">Closure Amount: {ForCloseDataList.amtToColl}</div>
        </div>
      ) : (
        <div id="errorLbl" style={{ display: errorMessage ? 'block' : 'none' }}>
          {errorMessage}
        </div>
      )}
      </Card>
    </>
  );
};

export default ForCloseAmount;

 