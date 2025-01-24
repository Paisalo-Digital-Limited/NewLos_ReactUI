import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Button, Card, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2'; 
import apiClient from 'network/apiClient';
import axios from 'axios';

const DeleteCrif = () => {
    const [creatorList, setCreatorList] = useState([]); 
    const [creator, setCreator] = useState('');
    const [fiCode, setFiCode] = useState('');
    const [showDeleteCrifButton, setShowDeleteCrifButton] = useState(false); // State for button visibility

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
       
        const Type="DeleteCrif"
        const url = `https://apiuat.paisalo.in:4015/fi/api/Delete/GetDeleteCrifAndSecoundEsign?Creator=${creator}&FiCode=${fiCode}&Type=${Type}`;

        try {
            const response = await axios.get(url, {
                headers: {
                  'Content-Type': 'application/json'
                  //Authorization: `Bearer ${token}`, // Ensure proper headers
                }
              });
            if (response.data.statuscode==200) {
                Swal.fire('Success', 'Search completed successfully', 'success');
                setShowDeleteCrifButton(true);
            } else {
                Swal.fire('Alert', 'Crif not generated', 'info');
                setShowDeleteCrifButton(false);
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to perform search', 'error');
            setShowDeleteCrifButton(false);
        }
    };
    const handleDeleteCrif = async () => {
        const obj={
          Creator:creator,
          FICode:fiCode,
          type:"CrifScoreDealer",
          SMCode:null
        }
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
                Swal.fire('Success', 'Crif Delete successfully', 'success');
                setShowDeleteCrifButton(false);
            } else {
                Swal.fire('Alert', 'Crif Not Delete', 'info');
                setShowDeleteCrifButton(true);
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to perform search', 'error');
            setShowDeleteCrifButton(true);
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
                Delete Crif Report
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
            {showDeleteCrifButton && (
                <Button
                    variant="contained"
                    size="medium"
                    onClick={handleDeleteCrif}
                    sx={{
                        bgcolor: 'red',
                        color: 'white'
                    }}
                >
                    Delete Crif
                </Button>
            )}
        
        </Card>
    ); 
};

export default DeleteCrif;