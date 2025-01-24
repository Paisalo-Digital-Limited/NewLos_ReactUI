import React, { useState,useEffect } from 'react';
import { Grid, Typography, TextField, Button, Chip, Card, FormControl, InputLabel, Select,MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import apiClient from 'network/apiClient';
import axios from 'axios';

const DeleteEsign = () => {
  const [creatorList, setCreatorList] = useState([]); 
      const [creator, setCreator] = useState('');
      const [fiCode, setFiCode] = useState('');
      const [SmCode, setSmCode] = useState('');

const [setShowSecoundEsignButton, setShowDeleteSecoundEsignButton] = useState(false);   

      useEffect(() => {
        getCreatorDropdown();
    }, []);
    
    const handleCreatorChange = (event) => {
        const selectedCreator = event.target.value;
        setCreator(selectedCreator);
    };

    const handleFiCodeChange = (event) => {
        setFiCode(event.target.value);
    };
    const handleSmCodeChange = (event) => {
      setSmCode(event.target.value);
  };
    const getCreatorDropdown = async () => {
        try {
            const response = await apiClient.get('/Masters/GetCreator', {
                requireAuth: true,
                checkTokenInResponse: false
            });
            const fetchCreator = response.data.data;
            setCreatorList(fetchCreator);
        } catch (error) {
            Swal.fire('Error', 'Failed to load creators', 'error');
        }
    };

    const handleSearch = async () => {
       
        const Type="SecoundEsign"
        const url = `https://apiuat.paisalo.in:4015/fi/api/Delete/GetDeleteCrifAndSecoundEsign?Creator=${creator}&FiCode=${fiCode}&Type=${Type}&SmCode=${SmCode}`;
        //const url = `https://localhost:7030/api/Delete/GetDeleteCrifAndSecoundEsign?Creator=${creator}&FiCode=${fiCode}&Type=${Type}&SmCode=${SmCode}`;

        try {
            const response = await axios.get(url, {
                headers: {
                  'Content-Type': 'application/json'
                  //Authorization: `Bearer ${token}`, // Ensure proper headers
                }
              });
            if (response.data.statuscode==200) {
                Swal.fire('Success', 'Search completed successfully', 'success');
                setShowDeleteSecoundEsignButton(true);
            } else {
                Swal.fire('Alert', 'Secound Esign Not Completed', 'info');
                setShowDeleteSecoundEsignButton(false);
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to perform search', 'error');
            setShowDeleteSecoundEsignButton(false);
        }
    };
    const handleDeleteSecoundEsign = async () => {
      const obj={
        Creator:creator,
        FICode:fiCode,
        type:"SecondESign",
        SMCode:SmCode}
      const url = 'https://apiuat.paisalo.in:4015/fi/api/Delete/Delete';
      //const url = `https://localhost:7030/api/Delete/Delete`;

      try {
          const response = await axios.post(url,obj, {
              headers: {
                'Content-Type': 'application/json'
                //Authorization: `Bearer ${token}`, // Ensure proper headers
              }
            });
          if (response.data.statuscode==200) {
              Swal.fire('Success', response.data.message, 'success');
              setShowDeleteSecoundEsignButton(false);
          } 
          else if (response.data.statuscode==-2) {
            Swal.fire('Alert', response.data.message, 'info');
            setShowDeleteSecoundEsignButton(true);
        }
        else if (response.data.statuscode==-1) {
          Swal.fire('Success', response.data.message, 'success');
          setShowDeleteSecoundEsignButton(true);
         }
          else {
              Swal.fire('Alert', response.data.message, 'info');
              setShowDeleteSecoundEsignButton(true);
          }
      } catch (error) {
          Swal.fire('Error', 'Failed to perform search', 'error');
          setShowDeleteSecoundEsignButton(true);
      }
  };
  return (
    <Card
      sx={{
        boxShadow: 'none',
        borderRadius: '7px',
        mb: '10px'
      }}
      className="rmui-card"
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Delete Second ESign
      </Typography>

      <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={5} md={3}>
                    <FormControl fullWidth size="medium">
                        <InputLabel>Creator</InputLabel>
                        <Select label="Creator" size="medium" value={creator} onChange={handleCreatorChange}>
                            {creatorList.map((item) => (
                                <MenuItem key={item.creatorid} value={item.creator}> {/* Use creatorid as value */}
                                    {item.creator}
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
                        value={fiCode} // Bind the fiCode state
                        onChange={handleFiCodeChange} // Update on change
                    />
                </Grid>
                
            </Grid>
      <Grid item xs={5} sm={1} md={1}>
        <Chip
          label="OR"
          sx={{
            fontWeight: 'bold',
            fontSize: '14px',
            background: 'none',
            borderBottom: '2px solid red',
            marginLeft: '25%',
            marginTop: '20px'
          }}
        />
      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={5} md={3} sx={{ marginTop: '30px' }}>
          <TextField variant="outlined" label="SM Code" fullWidth
           value={SmCode}
            onChange={handleSmCodeChange}/>
            
        </Grid>
        
        <Grid item xs={12} sm={5} md={1.5}>
        {setShowSecoundEsignButton && (
                <Button
                    variant="contained"
                    size="medium"
                    onClick={handleDeleteSecoundEsign}
                    sx={{
                        bgcolor: 'red',
                        color: 'white'
                    }}
                >
                    Delete Second ESign
                </Button>
            )}
        </Grid>
        <Grid item xs={12} md={1.5}>
                    <Button
                        type="button" // Keep type as button
                        variant="contained"
                        size="medium"
                        sx={{
                            bgcolor: 'linear-gradient(135deg, #2196F3, #64B5F6)'
                        }}
                        fullWidth
                        onClick={handleSearch} // Trigger search on button click
                    >
                        Search
                    </Button>
                </Grid>
      </Grid>
    </Card>
  );
};

export default DeleteEsign;
