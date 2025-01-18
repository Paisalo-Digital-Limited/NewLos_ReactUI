import React from 'react';
import { Grid, Typography, TextField, Button, Card, Paper, FormControl, InputLabel, Select, Table, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const DeleteRc = () => {
    const tableCellStyle = {
        background: 'linear-gradient(90deg,#ed1c24,#ed1c24)',
        padding: '10px 16px',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
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
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Rc Delete Status
      </Typography>
      

       <TableContainer component={Paper} sx={{  marginTop: '30px' }}>
       <Table>
         <TableHead>
           <TableRow>
            <TableCell sx={tableCellStyle}><Checkbox sx={{background:"none"}}/></TableCell>
             <TableCell sx={tableCellStyle}>Creator</TableCell>
             <TableCell sx={tableCellStyle}>RcDate</TableCell>
             <TableCell sx={tableCellStyle}>Rccode</TableCell>
             <TableCell sx={tableCellStyle}>Ahead</TableCell>
             <TableCell sx={tableCellStyle}>Vdesc</TableCell>
             <TableCell sx={tableCellStyle}>Code</TableCell>
             <TableCell sx={tableCellStyle}>DR</TableCell>
             <TableCell sx={tableCellStyle}>CR</TableCell>
             <TableCell sx={tableCellStyle}>CreatedBy</TableCell>
           </TableRow>
         </TableHead>
       </Table>
     </TableContainer> 

      <Grid container spacing={2} mb={2} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
             <Grid item xs={12} sm={5} md={1.5} >
               <Button
                 variant="contained"
                 size="medium"
                 sx={{
                   background:"#D22B2B",
                   marginTop:"40px",
                 }}
                 fullWidth
               >
                 Delete
               </Button>
             </Grid>
           </Grid>
      

     
    </Card>
  );
};

export default DeleteRc;
