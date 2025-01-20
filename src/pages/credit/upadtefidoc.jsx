// // material-ui
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// // project import
// import MainCard from 'components/MainCard';
// import ComponentSkeleton from './ComponentSkeleton';

// // ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

// export default function ComponentRole() {
//   return (
//     <ComponentSkeleton>
//       <Grid container spacing={3}>
//         <Grid item xs={12} lg={6}>
//         <h1>hey</h1>
//       </Grid>
//       </Grid>
//     </ComponentSkeleton>
//   );
// }

import React, { ChangeEvent, useState } from 'react';
import { Card, Radio, RadioGroup, FormControl, FormControlLabel, Typography, Box, Grid, Divider, Chip } from '@mui/material';
import UpdateScheme from './UpdateScheme';
import LoanAmount from './LoanAmount';
import Sanction from './Sanction';
import UpdateSanction from './UpdateSanction';
import ComponentSkeleton from '../component-overview/ComponentSkeleton';
import MainCard from 'components/MainCard';

export default function UserAccess() {
  const [selectedPage, setSelectedPage] = useState('schemecode');

  const handlePageChange = (event) => {
    setSelectedPage(event.target.value);
  };

  return (
    <>
      <ComponentSkeleton>
        <MainCard>
          <Box>
            <Grid>
              {/* Radio Buttons */}
              <FormControl component="fieldset" fullWidth>
                <RadioGroup row value={selectedPage} onChange={handlePageChange} sx={{ justifyContent: 'left' }}>
                  {[
                    { value: 'schemecode', label: 'Update Scheme Code' },
                    { value: 'loanAmount', label: 'Loan Amount' },
                    { value: 'modifySanction', label: 'Modify Sanction' },
                    { value: 'sanctionUpdate', label: 'Update Sanction ' }
                  ].map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={
                        <Radio
                          sx={{
                            color: '#4CAF50',
                            '&.Mui-checked': {
                              color: '#388E3C'
                            }
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: selectedPage === option.value ? 'bold' : 'normal',
                              color: selectedPage === option.value ? '#388E3C' : '#000'
                            }}
                          >
                            {option.label}
                          </Typography>
                          <Box
                            sx={{
                              width: '100%',
                              height: '4px',
                              backgroundColor: selectedPage === option.value ? '#4CAF50' : 'transparent',
                              borderRadius: '4px',
                              transition: 'background-color 0.3s ease'
                            }}
                          />
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Box sx={{ mb: 2 }}>
              {selectedPage === 'schemecode' && <UpdateScheme />}
              {selectedPage === 'loanAmount' && <LoanAmount />}
              {selectedPage === 'modifySanction' && <Sanction />}
              {selectedPage === 'sanctionUpdate' && <UpdateSanction />}
            </Box>
          </Box>
        </MainCard>
      </ComponentSkeleton>
    </>
  );
}
