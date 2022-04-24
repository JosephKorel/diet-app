import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAuth } from "../provider/auth";

export default function FoodField({ setShow }) {
  const { entries, foodInput, setFoodInput } = useAuth();
  const [value, setValue] = useState("");

  useEffect(() => {
    setFoodInput(value);
    if (value == "") setShow(false);
  }, [value]);
  const values = [];
  const handleChange = (e, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
    }
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        freeSolo={true}
        value={value}
        onInputChange={handleChange}
        onChange={() => setShow(true)}
        onOpen={() => setShow(false)}
        id="combo-box-demo"
        options={foodInput.length >= 3 ? entries[0] : values}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} />}
      />
      <button
        onClick={() => {
          console.log(value);
          console.log(foodInput);
        }}
      >
        Click me
      </button>
    </div>
  );
}
