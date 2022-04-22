import React, { useState, useEffect } from "react";
import foodData from "../foodList.json";
import FoodInput from "./input";
import Section from "./sections";
import { useAuth } from "../provider/auth";
import { addItem, removeItem, removeSection } from "../tools/functions";
import axios from "axios";

function Main() {
  const [input, setInput] = useState("");
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
    value,
    setValue,
    setEdit,
  } = useAuth();

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

  const saveEdit = (index, i) => {
    const editedSections = sections.slice();
    const newQnty = editedSections[index].quantity;
    const newCarb = editedSections[index].carb.slice();
    const newProt = editedSections[index].protein.slice();
    const newFat = editedSections[index].fat.slice();
    const newKcal = editedSections[index].calories.slice();

    //Alterar os macros
    const editedCarb = +(
      (newCarb[i] * value) /
      sections[index].quantity[i]
    ).toFixed(2);
    newCarb.splice(i, 1, editedCarb);
    editedSections[index].carb = newCarb;

    const editedProt = +(
      (newProt[i] * value) /
      sections[index].quantity[i]
    ).toFixed(2);
    newProt.splice(i, 1, editedProt);
    editedSections[index].protein = newProt;

    const editedFat = +(
      (newFat[i] * value) /
      sections[index].quantity[i]
    ).toFixed(2);
    newFat.splice(i, 1, editedFat);
    editedSections[index].fat = newFat;

    const editedKcal = editedCarb * 4 + editedProt * 4 + editedFat * 9;
    newKcal.splice(i, 1, editedKcal);
    editedSections[index].calories = newKcal;

    // Alterar a quantidade
    newQnty.splice(i, 1, Number(value));
    editedSections[index].quantity = newQnty;

    setSections(editedSections);
    setValue(0);
    setEdit(-1);
  };

  return (
    <div>
      <FoodInput
        input={input}
        setInput={setInput}
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
            addItem={(item) =>
              addItem(
                index,
                item,
                qnty,
                carb,
                protein,
                fat,
                sections,
                setSections
              )
            }
            removeItem={(i) => removeItem(index, i, sections, setSections)}
            removeSection={() => removeSection(index, sections, setSections)}
            saveEdit={(i) => saveEdit(index, i)}
          />
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Main;
