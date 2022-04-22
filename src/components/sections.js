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
  setFoodInput,
  entries,
  removeItem,
  removeSection,
  saveEdit,
}) => {
  const [newFood, setNewFood] = useState("");
  const [hide, setHide] = useState(false);
  const [edit, setEdit] = useState(false);
  /*  const [newQnty, setNewQnty] = useState(section.quantity); */
  const [newCarb, setNewCarb] = useState(section.carb);
  const [newProt, setNewProt] = useState(section.protein);
  const { qnty, setQnty, value, setValue } = useAuth();

  const editItem = (e) => {
    setValue(e.target.value);
  };

  /* const saveEdit = (i) => {
    // Editar a quantidade
    const newValues = newQnty.slice();
    newValues.splice(i, 1, value);
    setNewQnty(newValues);

    //Editar cada macro
    const editedCarb = newCarb.slice();
    const carbValue = +(
      (section.carb[i] * value) /
      section.quantity[i]
    ).toFixed(2);
    editedCarb.splice(i, 1, carbValue);
    setNewCarb(editedCarb);

    setEdit(false);
  }; */

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <h1>{section.title}</h1>
            <h3>{section.time}</h3>
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
                    {/* <input
                      type="number"
                      id={`Quantity_${i}`}
                      value={newQnty[i]}
                      onClick={(e) => editValue(e)}
                       onChange={(e) => setValue(e.target.value)}
                    ></input> */}
                    <TextField
                      type="number"
                      variant="standard"
                      aria-readonly={true}
                      value={edit === true ? value : section.quantity[i]}
                      onChange={(e) => editItem(e)}
                    />
                    <br></br>
                    {edit === true ? (
                      <Button
                        variant="contained"
                        onClick={() => saveEdit(i, setEdit)}
                      >
                        Salvar
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <ul>
                    <li key={Math.random()}>Carboidratos: {newCarb[i]}g</li>
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
                  <Button variant="contained" onClick={() => setEdit(true)}>
                    Editar Quantidade
                  </Button>
                </>
              ))}
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Section;
