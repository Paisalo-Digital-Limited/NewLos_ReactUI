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
} from "@mui/material";
import Swal from "sweetalert2";
import ArticleIcon from '@mui/icons-material/Article';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

const Disbursement = () => {
  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "7px",
        mb: "10px",
      }}
      className="rmui-card"
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Cam Generation
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={5} md={3}>
          <FormControl fullWidth>
            <InputLabel id="sub-menu-label">Creator</InputLabel>
            <Select
              label="Sub Menu"
              labelId="sub-menu-label"
              id="sub-menu-select"
            ></Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <FormControl fullWidth>
            <InputLabel id="sub-menu-label">Branch Code</InputLabel>
            <Select
              label="Sub Menu"
              labelId="sub-menu-label"
              id="sub-menu-select"
            ></Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField variant="outlined" label="Group Code" fullWidth />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField variant="outlined" label="Database Name" fullWidth />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={5} md={2} sx={{justifyContent:"flex-end", display:"flex"}}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            bgcolor: 'green',
            marginTop: '15px',
            "& .MuiButton-startIcon": {
                  fontSize: "20px",
                },
          }}
          startIcon={< ArticleIcon/>}
        >
          DISBURSEMENT SHEET
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(135deg,rgb(166, 66, 9),rgb(173, 77, 4))',
            marginTop: '15px',
            marginLeft: '20px',
            "& .MuiButton-startIcon": {
                  fontSize: "20px",
                },
          }}
          startIcon={<CreditCardIcon/>}
        >
          LOAN CARD
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(135deg, #FF9800,rgb(247, 152, 11))',
            marginTop: '15px',
            marginLeft: '20px',
            "& .MuiButton-startIcon": {
                  fontSize: "20px",
                },
          }}
          startIcon={<FingerprintIcon/>}
        >
          THUMB EXPRESSION
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(135deg,rgb(2, 83, 42),rgb(5, 75, 45))',
            marginTop: '15px',
            marginLeft: '20px',
            "& .MuiButton-startIcon": {
                  fontSize: "20px",
                },
          }}
          startIcon={<CreditScoreIcon/>}
        >
          SIGNED LOAN CARD
        </Button>
      </Grid>

    </Card>
  );
};

export default Disbursement;
