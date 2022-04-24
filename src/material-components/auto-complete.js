import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
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

  return (
    <div>
      <Autocomplete
        disablePortal
        freeSolo={true}
        value={newFood}
        onInputChange={handleChange}
        onChange={() => setShow(true)}
        onOpen={() => setShow(false)}
        id="combo-box-demo"
        options={foodInput.length >= 3 ? entries[0] : values}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Alimento" />}
      />
    </div>
  );
}
