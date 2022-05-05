import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import { useAuth } from "../provider/auth";

export default function FoodField({ setShow, newFood, setNewFood }) {
  const { entries, foodInput, setFoodInput } = useAuth();

  useEffect(() => {
    setFoodInput(newFood);
    if (newFood == "") setShow(false);
  }, [newFood]);
  const values = [];
  const handleChange = (e, newValue) => {
    if (newValue !== null) {
      setNewFood(newValue);
    }
  };

  const MyTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "primary",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "primary",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "#66ff66",
      },
    },
  });

  return (
    <div>
      <Autocomplete
        size={window.innerWidth >= 600 ? "medium" : "small"}
        disablePortal
        freeSolo={true}
        value={newFood}
        disableClearable={foodInput == "" ? true : false}
        onInputChange={handleChange}
        onChange={() => setShow(true)}
        onOpen={() => setShow(false)}
        options={foodInput.length >= 3 ? entries[0] : values}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Alimento"
            sx={{
              width: {
                xs: "150px",
                sm: "230px",
              },
            }}
            color="secondary"
          />
        )}
      />
    </div>
  );
}
