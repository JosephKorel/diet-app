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

  const saveEdit = (index, i, setEdit) => {
    const newSections = sections.slice();
    const newQnty = newSections[index].quantity;

    newQnty.splice(i, 1, Number(value));
    newSections[index].quantity = newQnty;

    setSections(newSections);
    setValue(0);
    setEdit(false);
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
            saveEdit={(i, setEdit) => saveEdit(index, i, setEdit)}
          />
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Main;
