import React, { useState } from "react";
import { Button } from "@mui/material";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const hour = document.getElementById("time");
  const [input, setInput] = useState("");
  const [time, setTime] = useState("00:00");
  const [carb, setCarb] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [qnty, setQnty] = useState(0);
  const [calories, setCalories] = useState(0);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [sections, setSections] = useState([
    {
      id: Math.random(),
      title: "First Meal",
      time: time,
      food: [],
      quantity: [],
      carb: [],
      protein: [],
      fat: [],
      calories: [],
    },
  ]);
  return (
    <AuthContext.Provider
      value={{
        input,
        setInput,
        carb,
        setCarb,
        protein,
        setProtein,
        fat,
        setFat,
        calories,
        setCalories,
        qnty,
        setQnty,
        data,
        setData,
        sections,
        setSections,
        time,
        setTime,
        value,
        setValue,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
