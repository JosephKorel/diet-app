import React from "react";
import FoodFact from "./food-facts";

export const FoodTable = ({ food }) => {
  const item = food[0];
  let carb = 0;
  let protein = 0;
  let fat = 0;
  let fiber = 0;
  let iron = 0;
  let magnesium = 0;
  let potassium = 0;
  let calcium = 0;
  let zinc = 0;
  let sodium = 0;
  let satFat = 0;
  let monoFat = 0;
  let polyFat = 0;

  if (food[0]) {
    const nutrients = food[0].attributes;
    const fatAcids = food[0].attributes.fatty_acids;

    nutrients.carbohydrate
      ? (carb = nutrients.carbohydrate.qty)
      : (carb = "NA");

    protein = +nutrients.protein.qty.toFixed(2);

    fat = +nutrients.lipid.qty.toFixed(2);

    nutrients.fiber ? (fiber = nutrients.fiber.qty) : (fiber = "NA");

    nutrients.iron ? (iron = nutrients.iron.qty) : (iron = "NA");

    nutrients.magnesium
      ? (magnesium = nutrients.magnesium.qty)
      : (magnesium = "NA");

    nutrients.potassium
      ? (potassium = nutrients.potassium.qty)
      : (potassium = "NA");
    nutrients.sodium ? (sodium = nutrients.sodium.qty) : (sodium = "NA");

    nutrients.calcium ? (calcium = nutrients.calcium.qty) : (calcium = "NA");

    nutrients.zinc ? (zinc = nutrients.zinc.qty) : (zinc = "NA");

    nutrients.sodium ? (sodium = nutrients.sodium.qty) : (sodium = "NA");

    if (fatAcids) {
      fatAcids.saturated ? (satFat = fatAcids.saturated.qty) : (satFat = "");
      fatAcids.monounsaturated
        ? (monoFat = fatAcids.monounsaturated.qty)
        : (monoFat = "");

      fatAcids.polyunsaturated
        ? (polyFat = fatAcids.polyunsaturated.qty)
        : (polyFat = "");
    }
  }

  return (
    <div className="flex align-center justify-evenly">
      <div>
        {food[0] ? (
          <div className="text-stone-800">
            <h1 className="text-4xl ">{item.description}</h1>
            <h2 className="text-2xl italic">
              Valores referentes à porção de 100 gramas
            </h2>
            <table className="w-full table-auto text-lg font-sans foodtable">
              <tr>
                <td>Carboidratos</td>
                <td>
                  <span>{carb === "NA" ? "NA" : carb.toFixed(2)}</span>
                </td>
                <td>g</td>
              </tr>
              <tr>
                <td>Proteínas</td>
                <td>
                  <span>{protein}</span>
                </td>
                <td>g</td>
              </tr>
              <tr>
                <td>Gorduras totais</td>
                <td>
                  <span>{fat}</span>
                </td>
                <td>g</td>
              </tr>
              {food[0].attributes.fatty_acids ? (
                <>
                  <tr>
                    <td>Gorduras saturadas</td>
                    <td>
                      <span>{satFat.toFixed(2)}</span>
                    </td>
                    <td>g</td>
                  </tr>
                  <tr>
                    <td>Gorduras monoinsaturadas</td>
                    <td>
                      <span>{monoFat.toFixed(2)}</span>
                    </td>
                    <td>g</td>
                  </tr>
                  <tr>
                    <td>Gorduras poliinsaturadas</td>
                    <td>
                      <span>{polyFat.toFixed(2)}</span>
                    </td>
                    <td>g</td>
                  </tr>
                </>
              ) : (
                <div></div>
              )}
              <tr>
                <td>Fibras</td>
                <td>
                  <span>{fiber === "NA" ? "NA" : fiber.toFixed(2)}</span>
                </td>
                <td>g</td>
              </tr>
              <tr>
                <td>Ferro</td>
                <td>
                  <span>{iron === "Tr" ? "Tr" : iron.toFixed(2)}</span>
                </td>
                <td>mg</td>
              </tr>
              <tr>
                <td>Magnésio</td>
                <td>
                  <span>
                    {magnesium === "Tr" ? "Tr" : magnesium.toFixed(2)}
                  </span>
                </td>
                <td>mg</td>
              </tr>
              <tr>
                <td>Potássio</td>
                <td>
                  <span>
                    {potassium === "Tr" ? "Tr" : potassium.toFixed(2)}
                  </span>
                </td>
                <td>mg</td>
              </tr>
              <tr>
                <td>Cálcio</td>
                <td>
                  <span>{calcium === "Tr" ? "Tr" : calcium.toFixed(2)}</span>
                </td>
                <td>mg</td>
              </tr>
              <tr>
                <td>Zinco</td>
                <td>
                  <span>{zinc === "Tr" ? "Tr" : zinc.toFixed(2)}</span>
                </td>
                <td>mg</td>
              </tr>
              <tr>
                <td>Sódio</td>
                <td>
                  <span>
                    {sodium === "Tr" ? "Tr" : sodium.toFixed(2) + "mg"}
                  </span>
                </td>
                <td>mg</td>
              </tr>
            </table>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <FoodFact
        carb={carb}
        protein={protein}
        fat={fat}
        iron={iron}
        sodium={sodium}
        magnesium={magnesium}
        calcium={calcium}
        zinc={zinc}
        potassium={potassium}
      />
    </div>
  );
};

export default FoodTable;
