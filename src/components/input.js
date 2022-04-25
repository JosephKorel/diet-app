import { Button, TextField } from "@mui/material";
import React from "react";
import moment from "moment";
import "antd/dist/antd.css";
import { TimePicker } from "antd";
import { useAuth } from "../provider/auth";

const FoodInput = ({ sectionTitle, setSectionTitle, setSections }) => {
  const { time, setTime } = useAuth();

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
    <div>
      <form>
        <TextField
          id="refName"
          label="Refeição"
          variant="standard"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
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
      </form>
    </div>
  );
};

export default FoodInput;
