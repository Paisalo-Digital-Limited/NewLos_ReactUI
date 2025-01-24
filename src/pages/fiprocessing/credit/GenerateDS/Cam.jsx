import React, { useState,useEffect  } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  FormControl,
  InputLabel,
  Select,
  FormGroup,MenuItem ,
  FormControlLabel,Checkbox
} from '@mui/material';
import Swal from 'sweetalert2';
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from '@mui/icons-material/Download';
import apiClient from 'network/apiClient';
import axios from "axios";

const Cam = () => {
  const [creator, setCreator] = useState('');
      const [branchCode, setBranchCode] = useState('');
      const [groupCode, setGroupCode] = useState('');
      const [Creatorlist, setCreatorlist] = useState([]);
      const [Branchlist, setBranchlist] = useState([]);
      const [FiCodeList, setFiCodeList] = useState([]);


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
          //const response = await apiClient.get("https://apiuat.paisalo.in:4015/fi/api/Masters/GetBranchCodeByCreator", {
            const response = await axios.get("http://localhost:5238/api/Masters/GetBranchCodeByCreator", {
             // const response = await axios.get("https://apiuat.paisalo.in:4015/admin/api/Masters/GetBranchCodeByCreator", {
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

      // const handleGroupCodeChange = (event) => { 
      //   debugger;
      //   const selectedBranch = event.target.value;
      //   setGroupCode(selectedBranch);
      //   getByGroupCodeFiCode(creator,branchCode,groupCode);
      // }
      // const DownloadCamGeneration = async () => {
      //   BranchCode:branchCode;
      //   const branchNumber = branchCode.split('-')[0];
      //   alert('Download Cam Generation');
      // }
      //-------groucode onchange -----
      const getByGroupCodeFiCode = async () => {
        debugger;
        BranchCode:branchCode;
        const branchNumber = branchCode.split('-')[0];
        try {
          debugger;
            //const response = await axios.get("http://localhost:5238/api/Masters/GetALLFiByCreator", {
              const response = await axios.get("https://apiuat.paisalo.in:4015/admin/api/Masters/GetBranchCodeByCreator", {
            params: {
              Creator: creator,
              BranchCode: branchNumber,
              GroupCode: groupCode
          },
            requireAuth: true,
            checkTokenInResponse: false,
          });
          if(response.data.statuscode === 200){
            const fetchFiCode = response.data.data;
            setFiCodeList(fetchFiCode);
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
      const handleSearchCam = () => {
        getByGroupCodeFiCode();
      }
      const handleCheckboxChange = (fiCode) => {
        setSelectedFiCodes(prev => 
          prev.includes(fiCode) ? prev.filter(code => code !== fiCode) : [...prev, fiCode]
        );
      };
      const  handleSearchCamgenerate = () => {
        DownloadCamGeneration();

      }
      
      //---------generate cam API call-----
      const DownloadCamGeneration = async () => {
        debugger;
        // let newErrors = { creator: !creator, branchCode: !branchCode, groupCode: !groupCode };
        // setErrors(newErrors);
        // if (Object.values(newErrors).some(v => v)) return;
    
        if (selectedFiCodes.length === 0) {
          setSnackbarMessage('Please select at least one FI Code.');
          setSnackbarOpen(true);
          return;
        }
    
        setLoading(true);
        try {
         
          const response = await axios.post(`https://localhost:7030/api/FiSanction/GetCamGenerate`, {
            Creator: creator,
            GroupCode: groupCode,
            FiCode: selectedFiCodes.join(',')
          }, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          });
    
          if (response.data.statusCode === 200) {
            // Handle the response data here
            console.log(response.data.data);
          } else {
            setSnackbarMessage('Failed to generate CAM.');
            setSnackbarOpen(true);
          }
        } catch (error) {
          console.error('Error generating CAM:', error);
          setSnackbarMessage('Error generating CAM.');
          setSnackbarOpen(true);
        } finally {
          setLoading(false);
        }
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
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
             <TextField variant="outlined" label="Group Code" fullWidth 
                       value={groupCode}
                       onChange={(e) => setGroupCode(e.target.value)}
                       //onChange={handleGroupCodeChange}
                      />
          </Grid>
          
          <Grid item xs={12} md={1.5}>
          <Button
              type="search"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'linear-gradient(135deg, #2196F3, #64B5F6)',
                "& .MuiButton-startIcon": {
                  fontSize: "20px",
                },
              }}
              fullWidth
              startIcon={<SearchIcon />}
              onClick={handleSearchCam}
            >
              SEARCH
            </Button>
            </Grid>
            <Grid item xs={12} md={1.5}>
            <Button
              type="search"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'linear-gradient(135deg, #2196F3, #64B5F6)',
                "& .MuiButton-startIcon": {
                  fontSize: "20px",
                },
              }}
              fullWidth
              // startIcon={<SearchIcon />}
              onClick={handleSearchCamgenerate}
            >
              Cam Generation
            </Button>
            </Grid>

          <Grid item xs={12} md={1.5}>
          <Button
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(135deg,rgb(172, 93, 9),rgb(143, 92, 4))',
                "& .MuiButton-startIcon": {
                  fontSize: "20px",
                },
              }}
              fullWidth
              startIcon={<DownloadIcon />}
            >
              EXPORT
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} md={1.5}>
        {/* <FormGroup>
          <FormControlLabel  control={<Checkbox />} label="Fi Code" />
        </FormGroup> */}
        <FormGroup>
      {FiCodeList.map((item, index) => (
        <FormControlLabel
          key={index}
          control={<Checkbox onChange={() => handleCheckboxChange(item.fiCode)} />}
          label={item.fiCode}
        />
      ))}
    </FormGroup>
    {/* <Button onClick={handleGenerateCam} disabled={loading}>
        {loading ? 'Generating...' : 'Generate CAM'}
      </Button> */}
      </Grid>
    </Card>
  );
};

export default Cam;

