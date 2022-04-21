import React, { useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [input, setInput] = useState("");
  const [carb, setCarb] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [qnty, setQnty] = useState(0);
  const [calories, setCalories] = useState(0);
  const [data, setData] = useState([]);
  const [sections, setSections] = useState([
    {
      id: Math.random(),
      title: "First Meal",
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
