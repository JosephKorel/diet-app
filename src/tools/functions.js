import React, { useState } from "react";

export function addFood(input, amount, food, foodList, setFood, setFoodList) {
  setFood({ amount: amount });
  setFoodList([...foodList, food]);

  console.log("hello");
}
