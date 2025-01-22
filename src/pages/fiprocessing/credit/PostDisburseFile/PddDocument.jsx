import React, { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  FormControl,
  InputLabel,
  Table,
  Select,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Box
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from '@mui/icons-material/Visibility';

const PddDocument = () => {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  });

  const tableCellStyle = {
    background: 'linear-gradient(90deg,#ed1c24,#ed1c24)',
    padding: '10px 16px',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  };

  return (
     <Box sx={{ margin: "0 auto" }}>
    <Card
      sx={{
        boxShadow: 'none',
        borderRadius: '7px',
        mb: 2,
        padding: { xs: '18px', sm: '20px', lg: '25px' }
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Upload Vehicle Documents
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={5} md={3}>
          <FormControl fullWidth>
            <InputLabel id="sub-menu-label">Creator</InputLabel>
            <Select label="Sub Menu" labelId="sub-menu-label" id="sub-menu-select"></Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField variant="outlined" label="Fi Code" fullWidth />
        </Grid>

        <Grid item xs={12} sm={5} md={6}>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Button
              component="label"
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon sx={{ color: 'red' }} />}
              sx={{ border: '1px solid grey', color: 'gray', fontSize: '16px' }}
            >
              Image With Vehicle
              <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple />
            </Button>
            <Button
              component="label"
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon sx={{ color: 'red' }} />}
              sx={{ border: '1px solid grey', color: 'gray', fontSize: '16px' }}
            >
              Invoice
              <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple />
            </Button>
            <Button
              component="label"
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon sx={{ color: 'red' }} />}
              sx={{ border: '1px solid grey', color: 'gray', fontSize: '16px' }}
            >
              Insurance
              <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple />
            </Button>
            <Button
              component="label"
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon sx={{ color: 'red' }} />}
              sx={{ border: '1px solid grey', color: 'gray', fontSize: '16px' }}
            >
              Vehicle Rc
              <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple />
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={5} md={2}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            bgcolor: 'green',
            marginTop: '15px'
          }}
          startIcon={<SendIcon/>}
        >
          SUBMIT
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(135deg, #FF9800,rgb(247, 152, 11))',
            marginTop: '15px',
            marginLeft: '20px'
          }}
          startIcon={<VisibilityIcon/>}
        >
          SHOW UPLOAD DOCUMENT
        </Button>
      </Grid>

    
    </Card>
      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyle}>S.no</TableCell>
            <TableCell sx={tableCellStyle}>Fi Code</TableCell>
            <TableCell sx={tableCellStyle}>Creator</TableCell>
            <TableCell sx={tableCellStyle}>DocumentName</TableCell>
            <TableCell sx={tableCellStyle}>Document</TableCell>
            <TableCell sx={tableCellStyle}>Action</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default PddDocument;