import React, { useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState([]);
  const [foodInput, setFoodInput] = useState("");
  const [time, setTime] = useState("08:00");
  const [carb, setCarb] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [qnty, setQnty] = useState(0);
  const [calories, setCalories] = useState(0);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [edit, setEdit] = useState(-1);
  const [sections, setSections] = useState([
    {
      id: Math.random(),
      title: "",
      time: "",
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
        edit,
        setEdit,
        entries,
        setEntries,
        foodInput,
        setFoodInput,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
