import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Card, Paper, FormControl, InputLabel, Select, Table, TableCell, TableHead, TableRow, TableContainer, TableBody, FormGroup, FormControlLabel, Radio } from '@mui/material';
const DeleteSmCode = () => {
    const [fiCode, setFiCode] = useState('');
    const [creator, setCreator] = useState('');
    const [option, setOption] = useState('deleteCode'); // default option
    const handleSearch = () => {
        // Your search logic here
        console.log('Search:', { fiCode, creator });
    }
    const handleUpdate = () => {
        // Your update logic here
        console.log('Update:', { fiCode, creator, option });
    }
    return (
        <Card sx={{ boxShadow: 'none', borderRadius: '7px', mb: '10px' }} className="rmui-card">
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Update Fi
            </Typography>
            <Grid sx={{ marginLeft: "5px", marginTop: "20px" }}>
                <FormGroup sx={{ display: "inline-block" }}>
                    <FormControlLabel
                        control={<Radio checked={option === 'deleteCode'} onChange={() => setOption('deleteCode')} />}
                        label="Delete Sm Code"
                        sx={{ fontSize: "27px" }}
                    />
                    <FormControlLabel
                        control={<Radio checked={option === 'sanction'} onChange={() => setOption('sanction')} />}
                        label="Sanction"
                        sx={{ fontSize: "27px" }}
                    />
                </FormGroup>
            </Grid>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={5} md={3}>
                    <TextField
                        variant="outlined"
                        label="Fi Code"
                        fullWidth
                        value={fiCode}
                        onChange={(e) => setFiCode(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={5} md={3}>
                    <FormControl fullWidth>
                        <InputLabel id="sub-menu-label">Creator</InputLabel>
                        <Select
                            label="Sub Menu"
                            labelId="sub-menu-label"
                            id="sub-menu-select"
                            value={creator}
                            onChange={(e) => setCreator(e.target.value)}
                        >
                            {/* Add Menu Items here */}
                        </Select>
                    </FormControl>
                </Grid>
                {option === 'sanction' ? (
                    <Grid item xs={12} md={1.5}>
                        <Button
                            type="button"
                            variant="contained"
                            size="medium"
                            sx={{
                                bgcolor: 'linear-gradient(135deg, #2196F3, #64B5F6)'
                            }}
                            fullWidth
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </Grid>
                ) : (
                    <Grid item xs={12} md={2}>
                        <Button
                            type="button"
                            variant="contained"
                            size="medium"
                            sx={{
                                background: 'linear-gradient(135deg, #E91E63, #F06292)'
                            }}
                            fullWidth
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    </Grid>
                )}
                {option === 'sanction' ? (
                    <TableContainer component={Paper} sx={{ marginTop: '25px', width: '100%' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ background: 'linear-gradient(90deg,#ED1C24,#ED1C24)', padding: '10px 16px', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>SchemeCode</TableCell>
                                    <TableCell sx={{ background: 'linear-gradient(90deg,#ED1C24,#ED1C24)', padding: '10px 16px', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Sanction Amount</TableCell>
                                    <TableCell sx={{ background: 'linear-gradient(90deg,#ED1C24,#ED1C24)', padding: '10px 16px', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Finance Date</TableCell>
                                    <TableCell sx={{ background: 'linear-gradient(90deg,#ED1C24,#ED1C24)', padding: '10px 16px', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>smCode</TableCell>
                                    <TableCell sx={{ background: 'linear-gradient(90deg,#ED1C24,#ED1C24)', padding: '10px 16px', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                           
                        </Table>
                    </TableContainer>
                ) : (
                    ''
                )}
            </Grid>
        </Card>
    );
};
export default DeleteSmCode;