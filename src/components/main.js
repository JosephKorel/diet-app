import React, { useState, useEffect } from "react";
import foodData from "../foodList.json";
import FoodInput from "./input";
import Section from "./sections";
import { useAuth } from "../provider/auth";
import { addItem, removeItem, removeSection } from "../tools/functions";

function Main() {
  const [input, setInput] = useState("");
  const [sectionTitle, setSectionTitle] = useState("");
  const [id, setId] = useState(0);
  const [foodj, setFoodj] = useState([]);

  const {
    qnty,
    carb,
    protein,
    fat,
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
    entries,
    setEntries,
    foodInput,
    setFoodInput,
  } = useAuth();

  /* useEffect(() => {
    fetch("../foodList.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);
 */

  /* useEffect(() => {
    const teste = foodData.filter((item) => item.attributes.lipid);
    console.log(teste);
  }, []); */

  useEffect(() => {
    try {
      const foodObj = foodData.filter((item) =>
        item.description.includes(foodInput)
      );
      setFoodj(foodObj);
    } catch (error) {
      console.log(error);
    }

    if (foodInput !== "") {
      const description = foodData.map((item) => item.description);
      const filter = description.filter((item) =>
        item.toLowerCase().includes(foodInput.toLowerCase())
      );
      setEntries([filter]);
    }
    if (foodj[0]) {
      try {
        const foodId = foodj[0].id;
        const nutrients = foodj[0].attributes;
        const tableCarb = +nutrients.carbohydrate.qty.toFixed(2);
        const tableProtein = +nutrients.protein.qty.toFixed(2);
        const tableFat =
          nutrients.lipid.qty !== "Tr" ? +nutrients.lipid.qty.toFixed(2) : 0;
        setId(foodId);
        setCarb(tableCarb);
        setProtein(tableProtein);
        setFat(tableFat);
        setData([foodj]);

        const carbKcal = tableCarb * 4;
        const protKcal = tableProtein * 4;
        const fatKcal = tableFat * 9;

        setCalories(carbKcal + protKcal + fatKcal);
      } catch (error) {
        console.log(error);
      }
    }
  }, [foodInput]);

  const saveEdit = (index, i) => {
    const editedSections = sections.slice();
    const newQnty = editedSections[index].quantity;
    const newCarb = editedSections[index].carb.slice();
    const newProt = editedSections[index].protein.slice();
    const newFat = editedSections[index].fat.slice();
    const newKcal = editedSections[index].calories.slice();

    if (value !== 0) {
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

      const editedKcal = +(
        editedCarb * 4 +
        editedProt * 4 +
        editedFat * 9
      ).toFixed(2);
      newKcal.splice(i, 1, editedKcal);
      editedSections[index].calories = newKcal;

      // Alterar a quantidade
      newQnty.splice(i, 1, Number(value));
      editedSections[index].quantity = newQnty;

      setSections(editedSections);
      setValue(0);
      setEdit(-1);
    } else {
      removeItem(index, i, sections, setSections);
      setEdit(-1);
    }
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
