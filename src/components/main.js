import React, { useState, useEffect } from "react";
import foodData from "../foodList.json";
import FoodInput from "./input";
import Section from "./sections";
import { useAuth } from "../provider/auth";
import axios from "axios";

function Main() {
  const [acc, setAcc] = useState([]);
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [entries, setEntries] = useState([]);
  const [foodInput, setFoodInput] = useState("");
  const [id, setId] = useState(0);
  const [itemData, setItemData] = useState([]);

  const {
    qnty,
    carb,
    protein,
    fat,
    data,
    sections,
    setSections,
    setCarb,
    setProtein,
    setFat,
    setCalories,
    setData,
  } = useAuth();

  const getData = () => {
    fetch("foodList.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => setItemData([myJson]));
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(itemData);

  useEffect(() => {
    const foodObj = foodData.filter((item) =>
      item.description.includes(foodInput)
    );

    if (foodInput !== "") {
      const description = foodData.map((item) => item.description);
      const filter = description.filter((item) =>
        item.toLowerCase().includes(foodInput.toLowerCase())
      );
      setEntries([filter]);
    }
    if (foodObj[0]) {
      const foodId = foodObj[0].id;
      const nutrients = foodObj[0].attributes;
      const tableCarb = +nutrients.carbohydrate.qty.toFixed(2);
      const tableProtein = +nutrients.protein.qty.toFixed(2);
      const tableFat = +nutrients.lipid.qty.toFixed(2);
      setId(foodId);
      setCarb(tableCarb);
      setProtein(tableProtein);
      setFat(tableFat);
      setData([foodObj]);

      const carbKcal = tableCarb * 4;
      const protKcal = tableProtein * 4;
      const fatKcal = tableFat * 9;

      setCalories(carbKcal + protKcal + fatKcal);
    }
  }, [foodInput]);

  const addItem = (index, item) => {
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
    newSections[index].quantity.push(qnty);
    newSections[index].carb.push(userCarb);
    newSections[index].protein.push(userProt);
    newSections[index].fat.push(userFat);
    newSections[index].calories.push(totalKcal);
    setSections(newSections);
  };

  const removeItem = (index, i) => {
    const newSections = sections.slice();
    const newFood = newSections[index].food;
    const newQnty = newSections[index].quantity;
    const newCarb = newSections[index].carb;
    const newProt = newSections[index].protein;
    const newFat = newSections[index].fat;

    newFood.splice(i, 1);
    newQnty.splice(i, 1);
    newCarb.splice(i, 1);
    newProt.splice(i, 1);
    newFat.splice(i, 1);
    newSections[index].food = newFood;
    newSections[index].quantity = newQnty;
    newSections[index].carb = newCarb;
    newSections[index].protein = newProt;
    newSections[index].fat = newFat;

    setSections(newSections);
  };

  return (
    <div>
      <FoodInput
        input={input}
        time={time}
        setInput={setInput}
        setTime={setTime}
        sectionTitle={sectionTitle}
        setSectionTitle={setSectionTitle}
        setSections={setSections}
        entries={entries}
        setEntries={setEntries}
      ></FoodInput>
      {sections.length !== 0 ? (
        sections.map((section, index) => (
          <Section
            sections={sections}
            input={input}
            id={id}
            index={index}
            setInput={setInput}
            setFoodInput={setFoodInput}
            entries={entries}
            section={section}
            key={section.id}
            addItem={(item) => addItem(index, item)}
            removeItem={(i) => removeItem(index, i)}
          />
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Main;
