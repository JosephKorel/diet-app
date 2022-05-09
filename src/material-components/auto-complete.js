import React, { useEffect } from "react";
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
