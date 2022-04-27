import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import foodData from "../foodList.json";
import Autocomplete from "@mui/material/Autocomplete";
import FoodTable from "./food-table";

const FoodSearch = () => {
  const [input, setInput] = useState("");
  const [food, setFood] = useState([]);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const userFood = foodData.filter((item) => item.description === input);
    setFood(userFood);
    console.log(userFood);

    if (input !== "") {
      const description = foodData.map((item) => item.description);
      const filter = description.filter((item) =>
        item.toLowerCase().includes(input.toLowerCase())
      );
      setEntries([filter]);
    }
  }, [input]);

  const values = [];

  const handleChange = (e, newValue) => {
    if (newValue !== null) {
      setInput(newValue);
    }
  };
  return (
    <div>
      <Autocomplete
        disablePortal
        freeSolo={true}
        value={input}
        onInputChange={handleChange}
        id="combo-box-demo"
        options={input.length >= 3 ? entries[0] : values}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Alimento" />}
      />
      <FoodTable food={food}></FoodTable>
    </div>
  );
};

export default FoodSearch;
