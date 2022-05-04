import { Button, TextField } from "@mui/material";
import React from "react";
import moment from "moment";
import "antd/dist/antd.css";
import { TimePicker, Popover } from "antd";
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

  const helpContent = (
    <div className="w-9/12 text-lg">
      <p>
        Primeiro adicione uma refeição e o horário, após isso adicione os
        alimentos a serem consumidos nas respectivas refeições
      </p>
      <p>
        Você também pode ver os valores totais bem como sua meta diária de
        calorias clicando em <span className="font-semibold">Visão geral</span>
      </p>
    </div>
  );

  const helpTitle = <h1 className="text-2xl">Como utilizar</h1>;

  return (
    <div className="mt-5 font-sans">
      <div className="ml-10">
        <ReactSwitch
          onChange={toggleTheme}
          onColor="#f6f9f7"
          onHandleColor="ffd12b"
          checked={theme === "dark"}
          checkedIcon={<LightModeIcon></LightModeIcon>}
          uncheckedIcon={<NightlightIcon></NightlightIcon>}
        ></ReactSwitch>
      </div>
      <h1 className="text-7xl text-center">
        <span className="text-9xl text-secondary">M</span>acro tracker
      </h1>
      <div className="w-6/12 m-auto flex align-center justify-between bg-white p-5 rounded-3xl">
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
        <div className="myant flex flex-col align-center justify-center">
          <TimePicker
            defaultValue={moment(time, format)}
            format={format}
            className="time"
            placeholder="Horário"
            size="large"
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
        </div>
        <img
          src="add-pink.png"
          alt="Adicionar"
          className="hover:scale-105 duration-100 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            addSection(sectionTitle);
          }}
        ></img>
        <Popover
          content={helpContent}
          title={helpTitle}
          placement="right"
          style={{ width: "300px", backgroundColor: "black" }}
        >
          <InfoIcon></InfoIcon>
        </Popover>
      </div>
    </div>
  );
};

export default FoodInput;
