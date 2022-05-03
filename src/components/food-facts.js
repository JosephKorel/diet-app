import { Paper } from "@mui/material";
import React from "react";

const FoodFact = ({
  carb,
  protein,
  fat,
  iron,
  magnesium,
  potassium,
  zinc,
  sodium,
  calcium,
}) => {
  const macro = ["Carboidrato", "Proteína", "Gordura"];
  const macroValue = carb !== "NA" ? [carb, protein, fat] : [0, protein, fat];
  const maxMacro = macroValue.reduce((total, item) => {
    return Math.max(total, item);
  }, 0);
  const macroIndex = macroValue.indexOf(maxMacro);

  const mineralValue = [iron, magnesium, potassium, sodium, calcium, zinc];
  const mineral = ["Ferro", "Magnésio", "Potássio", "Sódio", "Cálcio", "Zinco"];
  const newValues = [];
  for (let i = 0; i < mineralValue.length; i++) {
    mineralValue[i] == "Tr"
      ? newValues.push(0)
      : newValues.push(mineralValue[i]);
  }
  const maxMineral = newValues.reduce((total, item) => {
    return Math.max(total, item);
  }, 0);
  const mineralIndex = newValues.indexOf(maxMineral);

  const carbFact =
    "Ao contrário da crença popular, carboidratos não engordam. Na verdade, os carboidratos são fonte de energia e são indispensáveis para um bom rendimento na prática de esportes de alta intensidade. ";
  const protFact = "";
  const fatFact = "";

  return (
    <div className="w-1/3 ">
      <Paper elevation={12}>
        <div className="w-full p-5">
          <h1 className="text-2xl font-sans font-normal text-stone-800">
            Macronutriente mais abundante:{" "}
            <span className="text-3xl font-sans font-bold">
              {macro[macroIndex]}
            </span>
          </h1>
          <p className="text-base text-justify">{carbFact}</p>
        </div>
      </Paper>
      <Paper elevation={12}>
        <div className="w-full p-5 mt-5">
          <h1 className="text-2xl font-sans font-normal text-stone-800">
            Mineral mais abundante:{" "}
            <span className="text-3xl font-sans font-bold">
              {mineral[mineralIndex]}
            </span>
          </h1>
          <p className="text-base text-justify">{carbFact}</p>
        </div>
      </Paper>
    </div>
  );
};

export default FoodFact;
