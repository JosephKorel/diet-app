import { Button, TextField } from "@mui/material";
import React from "react";
import moment from "moment";
import "antd/dist/antd.css";
import { TimePicker } from "antd";
import { useAuth } from "../provider/auth";
import ReactSwitch from "react-switch";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { pink } from "@mui/material/colors";

const FoodInput = ({ sectionTitle, setSectionTitle, setSections }) => {
  const { time, setTime, theme, toggleTheme } = useAuth();

  const pinkColor = pink["A400"];

  const addSection = (title) => {
    if (title === "") return;

    setSections((s) => [
      ...s,
      {
        id: Math.random(),
        title: title,
        time: time,
        food: [],
        quantity: [],
        carb: [],
        protein: [],
        fat: [],
        calories: [],
      },
    ]);
    setSectionTitle("");
  };

  const format = "HH:mm";

  return (
    <div className="mt-5">
      <div className="ml-10">
        <ReactSwitch
          onChange={toggleTheme}
          checked={theme === "dark"}
          checkedIcon={<LightModeIcon></LightModeIcon>}
          uncheckedIcon={<NightlightIcon></NightlightIcon>}
        ></ReactSwitch>
      </div>
      <h1 className="text-7xl text-center">Título</h1>
      <div className="w-8/12 m-auto flex align-center justify-between bg-white p-5 rounded-xl">
        <TextField
          id="refName"
          label="Refeição"
          variant="standard"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          sx={{ width: "250px" }}
        />
        <TimePicker
          defaultValue={moment(time, format)}
          format={format}
          placeholder="Horário"
          onChange={(value, dateString) => {
            setTime(dateString);
          }}
        />
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            addSection(sectionTitle);
          }}
        >
          Nova Refeição
        </Button>
      </div>
    </div>
  );
};

export default FoodInput;
