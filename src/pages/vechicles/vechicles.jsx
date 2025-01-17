import React, { ChangeEvent, useState } from "react";

import {
  Card,
  Radio,
  RadioGroup,
  FormControl,
  Grid,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import Brand from "./VheicleDetails/Brand/Brand";
import Modeltype from "./VheicleDetails/ModelType/ModelType";
import Fuel from "./VheicleDetails/Fuel/Fuel";
import Vehicle from "./VheicleDetails/VheicleType/VheicleType";
import MainCard from 'components/MainCard';

import ComponentSkeleton from '../component-overview/ComponentSkeleton';

export default function UserAccess() {
  const [selectedPage, setSelectedPage] = useState("brand");

  const handlePageChange = (event) => {
    setSelectedPage(event.target.value);
  };

  return (
    <>
    <ComponentSkeleton>
    <MainCard>
      <Box>
      <Grid sx={{boxShadow: "none", mb: 2,}}>

        {/* Radio Buttons */}
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            row
            value={selectedPage}
            onChange={handlePageChange}
            sx={{justifyContent: "left" }}
          >
            {[
              { value: "brand", label: "Brand" },
              { value: "modeltype", label: "Model Type" },
              { value: "fuel", label: "Fuel" },
              { value: "vehicle", label: "Vehicle" },
            ].map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={
                  <Radio
                    sx={{
                      color: "#4CAF50",
                      "&.Mui-checked": {
                        color: "#388E3C",
                      },
                    }}
                  />
                }
                label={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: selectedPage === option.value ? "bold" : "normal",
                        color: selectedPage === option.value ? "#388E3C" : "#000",
                      }}
                    >
                      {option.label}
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        height: "4px",
                        backgroundColor: selectedPage === option.value ? "#4CAF50" : "transparent",
                        borderRadius: "4px",
                        transition: "background-color 0.3s ease",
                      }}
                    />
                  </Box>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>

      <Box >
        {selectedPage === "brand" && <Brand />}
        {selectedPage === "modeltype" && <Modeltype />}
        {selectedPage === "fuel" && <Fuel />}
        {selectedPage === "vehicle" && <Vehicle />}
      </Box>
      </Box>
      </MainCard>
      </ComponentSkeleton>
      </>
  );
}