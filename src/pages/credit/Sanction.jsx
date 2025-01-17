import React, { useState } from "react";
import {
  Card,
  Grid,
  FormControl,
  TextField,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import AnimateButton from 'components/@extended/AnimateButton';
import SearchIcon from '@mui/icons-material/Search';

const Sanction  = () => {
  const [creator, setCreator] = useState("");
  const [Fi_Id, setFiId] = useState(""); 
  const [creatorList] = useState([
    { creator: "John Doe" },
    { creator: "Jane Smith" },
    { creator: "Alice Johnson" },
  ]);
  const [amount, setAmount] = useState("");
  const [showSanctionDetails, setShowSanctionDetails] = useState(false); 

  return (
    <>
      {/* Search Section */}
      <Card
              sx={{
                boxShadow: "none",
                borderRadius: "7px",
                mb: "10px",
              }}
              className="rmui-card"
            >
        <Typography
          variant="h5"
          sx={{ marginBottom: "20px", fontWeight: "bold", fontSize:"20px" }}
        >
          Modify Sanction 
        </Typography>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="flex-start"
          sx={{ marginBottom: "5px" }}
        >
          <Grid item xs={12} md={3} sm={3}>
            <FormControl fullWidth>
              <TextField
                select
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                label="Creator"
                fullWidth
                size="medium"
              >
                {creatorList.map((creatorItem, index) => (
                  <MenuItem key={index} value={creatorItem.creator}>
                    {creatorItem.creator}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} sm={3}>
            <TextField
              fullWidth
              label="FI_Id"
              variant="outlined"
              size="medium"
              value={Fi_Id} 
              onChange={(e) => setFiId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
          <AnimateButton>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                fontWeight: 'bold',
                    bgcolor: 'primary',
                    '&:hover': { bgcolor: 'primary' } // Ensuring it stays green on hover
                  }}
              fullWidth
              startIcon={<SearchIcon />} // Adding Submit Icon
            >
              SERACH
            </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </Card>

      {/* {showSanctionDetails && (
        <Card
          sx={{
            boxShadow: "none",
            borderRadius: "7px",
            mb: "25px",
            padding: { xs: "18px", sm: "20px", lg: "25px" },
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Grid item xs={12} md={3} sm={3}>
              <TextField
                fullWidth
                id="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)} 
                size="medium"
                label="Sanction Amount"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={1} sm={3}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  background: "#ff4c4c",
                  "&:hover": {
                    background: "linear-gradient(135deg,rgb(175, 57, 96),rgb(187, 65, 106))",
                  },
                }}
              >
                UPDATE
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  padding: "10px 12px",
                  fontSize: "15px",
                  background: "linear-gradient(135deg, rgb(233, 30, 30), rgb(206, 22, 22))",
                  borderRadius: "8px",
                }}
                startIcon={<DeleteOutlineIcon />}
                onClick={handleDelete}
              >
                DELETE
              </Button>
            </Grid>
          </Grid>
        </Card>
      )} */}
    </>
  );
};

export default Sanction;