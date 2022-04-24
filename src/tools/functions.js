import React, { useState } from "react";

export function addFood(input, amount, food, foodList, setFood, setFoodList) {
  setFood({ amount: amount });
  setFoodList([...foodList, food]);

  console.log("hello");
}

export const addItem = (
  index,
  item,
  qnty,
  carb,
  protein,
  fat,
  sections,
  setSections
) => {
  if (item === "") return;

  let baseQty = 100;
  let userCarb = +((qnty * carb) / baseQty).toFixed(2);
  let userProt = +((qnty * protein) / baseQty).toFixed(2);
  let userFat = +((qnty * fat) / baseQty).toFixed(2);

  let carbKcal = userCarb * 4;
  let protKcal = userProt * 4;
  let fatKcal = userFat * 9;

  let totalKcal = +(carbKcal + protKcal + fatKcal).toFixed(2);

  const newSections = sections.slice();
  newSections[index].food.push(item);
  newSections[index].quantity.push(Number(qnty));
  newSections[index].carb.push(userCarb);
  newSections[index].protein.push(userProt);
  newSections[index].fat.push(userFat);
  newSections[index].calories.push(totalKcal);
  setSections(newSections);
};

export const removeItem = (index, i, sections, setSections) => {
  const newSections = sections.slice();
  const newFood = newSections[index].food;
  const newQnty = newSections[index].quantity;
  const newCarb = newSections[index].carb;
  const newProt = newSections[index].protein;
  const newFat = newSections[index].fat;
  const newKcal = newSections[index].calories;

  newFood.splice(i, 1);
  newQnty.splice(i, 1);
  newCarb.splice(i, 1);
  newProt.splice(i, 1);
  newFat.splice(i, 1);
  newKcal.splice(i, 1);

  newSections[index].food = newFood;
  newSections[index].quantity = newQnty;
  newSections[index].carb = newCarb;
  newSections[index].protein = newProt;
  newSections[index].fat = newFat;
  newSections[index].calories = newKcal;

  setSections(newSections);
};

export const removeSection = (index, sections, setSections) => {
  const newSections = sections.slice();
  newSections.splice(index, 1);
  setSections(newSections);
};
