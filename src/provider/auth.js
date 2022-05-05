import React, { useState } from "react";
import useLocalStorage from "../localStorage/useLocalStorage";

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
  const [value, setValue] = useState(0);
  const [edit, setEdit] = useState(-1);
  const [tmb, setTmb] = useLocalStorage("tmb", [0, 0]);
  const [objective, setObjective] = useLocalStorage("objective", "");
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [sections, setSections] = useLocalStorage("sections", [
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

  const toggleTheme = () => {
    setTheme((curr) => (curr == "dark" ? "light" : "dark"));
  };
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
        tmb,
        setTmb,
        objective,
        setObjective,
        theme,
        toggleTheme,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
