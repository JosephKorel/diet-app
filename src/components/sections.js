import React, { useState } from "react";
import { useAuth } from "../provider/auth";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasicModal from "../material-components/modal";
import { Button, TextField } from "@mui/material";

const Section = ({
  section,
  addItem,
  entries,
  removeItem,
  removeSection,
  saveEdit,
}) => {
  const [newFood, setNewFood] = useState(null);
  const [hide, setHide] = useState(false);
  const { qnty, setQnty, value, setValue, edit, setEdit, setFoodInput } =
    useAuth();

  const carbSum = section.carb.reduce((total, item) => {
    return +(total += item).toFixed(2);
  }, 0);

  const protSum = section.protein.reduce((total, item) => {
    return +(total += item).toFixed(2);
  }, 0);

  const fatSum = section.fat.reduce((total, item) => {
    return +(total += item).toFixed(2);
  }, 0);

  const kcalSum = section.calories.reduce((total, item) => {
    return +(total += item).toFixed(2);
  }, 0);

  return (
    <div>
      {section.title !== "" ? (
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <h1>{section.title}</h1>
                <h2>{section.time}</h2>
                <ul>
                  <li>C: {carbSum}g</li>
                  <li>P: {protSum}g</li>
                  <li>G: {fatSum}g</li>
                  <li>Kcal: {kcalSum}</li>
                </ul>
                <Button variant="contained" onClick={() => removeSection()}>
                  Remover
                </Button>
                <br></br>
                <BasicModal
                  newFood={newFood}
                  setNewFood={setNewFood}
                  hide={hide}
                  setHide={setHide}
                  setFoodInput={setFoodInput}
                  qnty={qnty}
                  setQnty={setQnty}
                  entries={entries}
                  addItem={(item) => addItem(item)}
                ></BasicModal>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div>
                  {section.food.map((item, i) => (
                    <>
                      <h2>{item}</h2>
                      <div>
                        <h3>Quantidade</h3>
                        <TextField
                          type="number"
                          variant="standard"
                          value={edit === i ? value : section.quantity[i]}
                          onChange={(e) => setValue(e.target.value)}
                        />
                        <br></br>
                        {edit === i ? (
                          <Button
                            variant="contained"
                            onClick={() => saveEdit(i)}
                          >
                            Salvar
                          </Button>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      <ul>
                        <li key={Math.random()}>
                          Carboidratos: {section.carb[i]}g
                        </li>
                        <li key={Math.random()}>
                          Proteínas: {section.protein[i]}g
                        </li>
                        <li key={Math.random()}>Gorduras: {section.fat[i]}g</li>
                        <li key={Math.random()}>
                          Calorias: {section.calories[i]}kcal
                        </li>
                      </ul>
                      <Button
                        variant="contained"
                        onClick={() => removeItem(i)}
                        id={i}
                      >
                        Remover
                      </Button>
                      <br></br>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setEdit(i);
                          setValue(section.quantity[i]);
                        }}
                      >
                        Editar Quantidade
                      </Button>
                    </>
                  ))}
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Section;
