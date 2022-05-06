import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import foodData from "../foodList.json";
import Autocomplete from "@mui/material/Autocomplete";
import FoodTable from "./food-table";
import ReactSwitch from "react-switch";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import InfoIcon from "@mui/icons-material/Info";
import { useAuth } from "../provider/auth";

const FoodSearch = () => {
  const [input, setInput] = useState("");
  const [food, setFood] = useState([]);
  const [entries, setEntries] = useState([]);
  const { theme, toggleTheme } = useAuth();

  useEffect(() => {
    document.body.style.backgroundColor = `${
      theme == "light" ? "#d3ffd3" : "#1a1a1a"
    }`;

    const html = document.getElementById("html");

    theme == "dark"
      ? html.classList.add("dark")
      : html.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    const userFood = foodData.filter((item) => item.description === input);
    setFood(userFood);

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
      <div className="ml-2 mt-2">
        <ReactSwitch
          onChange={toggleTheme}
          onColor="#f6f9f7"
          onHandleColor="ffd12b"
          checked={theme === "dark"}
          checkedIcon={<LightModeIcon></LightModeIcon>}
          uncheckedIcon={<NightlightIcon></NightlightIcon>}
        ></ReactSwitch>
      </div>
      <div className="w-full p-1 m-auto mt-5 rounded-2xl">
        <div className="w-full flex align-center justify-center ">
          <div className="bg-white rounded-lg">
            <Autocomplete
              disablePortal
              freeSolo={true}
              value={input}
              onInputChange={handleChange}
              id="combo-box-demo"
              options={input.length >= 3 ? entries[0] : values}
              sx={{
                width: 300,
              }}
              renderInput={(params) => (
                <TextField {...params} label="Alimento" color="secondary" />
              )}
            />
          </div>
        </div>
        <div className="mt-5">
          <FoodTable food={food}></FoodTable>
        </div>
      </div>
    </div>
  );
};

export default FoodSearch;
