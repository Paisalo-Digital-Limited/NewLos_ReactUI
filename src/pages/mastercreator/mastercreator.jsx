import React from 'react';
import {
  Card,
  Divider,
  Chip,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from '../component-overview/ComponentSkeleton';
import SendIcon from '@mui/icons-material/Send';
import AnimateButton from 'components/@extended/AnimateButton';

const AddCreator = () => {
  const formData = {
    creator: '',
    description: '',
    tag: '',
    deF_BANK: '',
    deF_CASH: '',
    creatorType: '',
    creatorFor: '',
    addressEn: '',
    addressHi: '',
    phone: '',
    branch_email: '',
    credit_email: '',
    zoneName: '',
    stateCodeEn: '',
  };

  const creatorTypeOptions = [
    { label: 'Choose...', value: '' },
    { label: 'HO', value: 'HO' },
    { label: 'BR', value: 'BR' },
  ];

  const creatorForOptions = [
    { label: 'Choose...', value: '' },
    { label: 'ABF', value: 'ABF' },
    { label: 'BOTH', value: 'BOTH' },
    { label: 'MFI', value: 'MFI' },
  ];

  const zoneNameOptions = [
    { label: 'Choose...', value: '' },
    { label: 'ZONE1', value: 'ZONE1' },
    { label: 'ZONE2', value: 'ZONE2' },
    { label: 'ZONE3', value: 'ZONE3' },
  ];

  const stateCodeEnOptions = [
    { label: 'Choose...', value: '' },
    { label: 'DL', value: 'DL' },
    { label: 'MH', value: 'MH' },
  ];

  return (
<ComponentSkeleton>
<MainCard>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '7px',
          mb: '25px',
          padding: { xs: '18px', sm: '20px', lg: '25px' },
        }}
      >
        <Divider>
          <Chip label="Add Creator Details" size="small" />
        </Divider>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {[
            { label: 'Creator*', name: 'creator' },
            { label: 'Description*', name: 'description' },
            { label: 'Tag*', name: 'tag' },
            { label: 'Def_Bank*', name: 'deF_BANK' },
            { label: 'Def_Cash*', name: 'deF_CASH' },
            { label: 'Address (English)*', name: 'addressEn' },
            { label: 'Address (Hindi)*', name: 'addressHi' },
            { label: 'Phone*', name: 'phone' },
            { label: 'Branch Email*', name: 'branch_email' },
            { label: 'Credit Email*', name: 'credit_email' },
          ].map((field) => (
            <Grid key={field.name} item xs={12} md={3}>
              <TextField
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                fullWidth
              />
            </Grid>
          ))}

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="creatorType-label">Creator Type*</InputLabel>
              <Select
                labelId="creatorType-label"
                id="creatorType-select"
                value={formData.creatorType}
                label="Creator Type*"
              >
                {creatorTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="creatorFor-label">Creator For*</InputLabel>
              <Select
                labelId="creatorFor-label"
                id="creatorFor-select"
                value={formData.creatorFor}
                label="Creator For*"
              >
                {creatorForOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="zoneName-label">Zone Name*</InputLabel>
              <Select
                labelId="zoneName-label"
                id="zoneName-select"
                value={formData.zoneName}
                label="Zone Name*"
              >
                {zoneNameOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="stateCodeEn-label">State*</InputLabel>
              <Select
                labelId="stateCodeEn-label"
                id="stateCodeEn-select"
                value={formData.stateCodeEn}
                label="State*"
              >
                {stateCodeEnOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
          }}
        >
          <Grid item xs={12} sm={4} md={2}>
           
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
         <Grid item xs={12} sm={4} md={2}>
           
           <AnimateButton>
           <Button
             type="submit"
             variant="contained"
             size="large"
             sx={{
               fontWeight: 'bold',
                   bgcolor: 'red',
                   '&:hover': { bgcolor: 'red' } // Ensuring it stays green on hover
                 }}
             fullWidth
             startIcon={<SendIcon />} // Adding Submit Icon
           >
             Cancel
           </Button>
           </AnimateButton>
           
         </Grid>
        </Box>
      </Card>

      <Dialog open={false} onClose={() => {}}>
        <DialogTitle>Edit Creator Details</DialogTitle>
        <DialogContent>
          {/* Dialog content can be structured similarly to the main form */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {}} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => {}} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      </MainCard>
      </ComponentSkeleton>
  );
};

export default AddCreator;