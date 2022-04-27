import React from "react";

export const FoodTable = ({ food }) => {
  const item = food[0];
  let carb = 0;
  let protein = 0;
  let fat = 0;
  let fiber = 0;
  let iron = 0;
  let magnesium = 0;
  let potassium = 0;
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
    <div>
      {food[0] ? (
        <div>
          <h1>{item.description}</h1>
          <h2>Valores referentes à porção de 100 gramas</h2>
          <ul>
            <li>
              <h3>
                Carboidratos{" "}
                <span>{carb === "NA" ? "NA" : carb.toFixed(2) + "g"}</span>
              </h3>
            </li>
            <li>
              <h3>
                Proteínas <span>{protein}g</span>
              </h3>
            </li>
            <li>
              <h3>
                Gorduras totais <span>{fat}g</span>
              </h3>
              {food[0].attributes.fatty_acids ? (
                <ul>
                  <li>
                    <h4>
                      Gorduras saturadas <span>{satFat.toFixed(2)}g</span>
                    </h4>
                    <h4>
                      Gorduras monossaturadas <span>{monoFat.toFixed(2)}g</span>
                    </h4>
                    <h4>
                      Gorduras polissaturadas <span>{polyFat.toFixed(2)}g</span>
                    </h4>
                  </li>
                </ul>
              ) : (
                <div></div>
              )}
            </li>
            <li>
              <h3>
                Fibras{" "}
                <span>{fiber === "NA" ? "NA" : fiber.toFixed(2) + "g"}</span>
              </h3>
            </li>
            <li>
              <h3>
                Ferro{" "}
                <span>{iron === "NA" ? "NA" : iron.toFixed(2) + "mg"}</span>
              </h3>
            </li>
            <li>
              <h3>
                Magnésio{" "}
                <span>
                  {magnesium === "NA" ? "NA" : magnesium.toFixed(2) + "mg"}
                </span>
              </h3>
            </li>
            <li>
              <h3>
                Potássio{" "}
                <span>
                  {potassium === "NA" ? "NA" : potassium.toFixed(2) + "mg"}
                </span>
              </h3>
            </li>
            <li>
              <h3>
                Sódio{" "}
                <span>{sodium === "NA" ? "NA" : sodium.toFixed(2) + "mg"}</span>
              </h3>
            </li>
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default FoodTable;
