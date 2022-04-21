import React, { useState } from "react";
import { useAuth } from "../provider/auth";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasicModal from "../material-components/modal";
import { Button } from "@mui/material";

const Section = ({ section, addItem, setFoodInput, entries, removeItem }) => {
  const [newFood, setNewFood] = useState("");
  const [hide, setHide] = useState(false);
  const { qnty, setQnty } = useAuth();

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
                  <h3>Quantidade: {section.quantity[i]}g</h3>
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
