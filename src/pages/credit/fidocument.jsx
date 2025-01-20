import React from 'react';
import {
  Grid,
  Card,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  Divider,
  Typography,
  Chip,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  Switch
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MainCard from 'components/MainCard';
import ComponentSkeleton from '../component-overview/ComponentSkeleton';
import SendIcon from '@mui/icons-material/Send';
import AnimateButton from 'components/@extended/AnimateButton';

export const GetFiDocument = () => {
  const tableCellStyle = {
    background: '#ff4c4c',
    padding: '10px 16px',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  };

  return (
    <>
      <ComponentSkeleton>
        <MainCard>
          <Card>
            {/* Title */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={7} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField id="fi-code" label="Fi Code" />
                    </FormControl>
                  </Grid>

                  {/* Creator Dropdown */}
                  <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="creator-label">Select Creator</InputLabel>
                      <Select labelId="creator-label" id="creator-select" label="Select Creator">
                        {/* Static Menu Items */}
                        <MenuItem value={'creator1'}>Creator 1</MenuItem>
                        <MenuItem value={'creator2'}>Creator 2</MenuItem>
                        <MenuItem value={'creator3'}>Creator 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <AnimateButton>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                          fontWeight: 'bold',
                          bgcolor: 'green',
                          '&:hover': { bgcolor: 'green' } // Ensuring it stays green on hover
                        }}
                        fullWidth
                        startIcon={<SendIcon />} // Adding Submit Icon
                      >
                        SUBMIT
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ borderRadius: '5px', marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableCellStyle}>S.NO</TableCell>
                    <TableCell sx={tableCellStyle}>Document Name</TableCell>
                    <TableCell sx={tableCellStyle}>Upload File</TableCell>
                    <TableCell sx={tableCellStyle}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center' }}>1</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Document A</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <IconButton sx={{ color: 'red', fontSize: '24px' }}>
                        <UploadFileIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Switch
                        // checked={role.isActive}
                        checked={true}
                        // onChange={() => handleToggleActive(role.id, role.isActive)}
                        onChange={() => handleToggleActive(role.id, true)}
                        color="success"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </MainCard>
      </ComponentSkeleton>
    </>
  );
};

export default GetFiDocument;
