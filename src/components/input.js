import { Button, TextField } from "@mui/material";
import React from "react";
import moment from "moment";
import "antd/dist/antd.css";
import { TimePicker, Tooltip } from "antd";
import locale from "antd/es/date-picker/locale/pt_BR";
import { useAuth } from "../provider/auth";
import ReactSwitch from "react-switch";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import InfoIcon from "@mui/icons-material/Info";

const FoodInput = ({ sectionTitle, setSectionTitle, setSections }) => {
  const { time, setTime, theme, toggleTheme } = useAuth();

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
    <div className="mt-5 font-sans">
      <div className="ml-10">
        <ReactSwitch
          onChange={toggleTheme}
          checked={theme === "dark"}
          checkedIcon={<LightModeIcon></LightModeIcon>}
          uncheckedIcon={<NightlightIcon></NightlightIcon>}
        ></ReactSwitch>
      </div>
      <h1 className="text-7xl text-center">
        <span className="text-9xl text-secondary">M</span>acro tracker
      </h1>
      <div className="w-8/12 m-auto flex align-center justify-between bg-white p-5 rounded-3xl">
        <TextField
          className="flex-0.5"
          id="refName"
          label="Refeição"
          variant="standard"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          sx={{ width: "250px" }}
          color="secondary"
        />
        <TimePicker
          defaultValue={moment(time, format)}
          format={format}
          className="time"
          placeholder="Horário"
          onChange={(value, dateString) => {
            setTime(dateString);
          }}
          locale={{
            ...locale,
            lang: {
              ...locale.lang,
              now: "Agora",
              ok: "Ok",
            },
          }}
        />
        <img
          src="add-pink.png"
          alt="Adicionar"
          className="hover:scale-105 duration-100 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            addSection(sectionTitle);
          }}
        ></img>
        <Tooltip title={"Aaa"} zIndex={1300} placement="right">
          <InfoIcon></InfoIcon>
        </Tooltip>
      </div>
    </div>
  );
};

export default FoodInput;
