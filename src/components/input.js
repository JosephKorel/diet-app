import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useAuth } from "../provider/auth";

const FoodInput = ({ entries, sectionTitle, setSectionTitle, setSections }) => {
  const { input, setInput } = useAuth();

  const addSection = (title) => {
    if (title === "") return;

    setSections((s) => [
      ...s,
      {
        id: Math.random(),
        title: title,
        food: [],
        quantity: [],
        carb: [],
        protein: [],
        fat: [],
        calories: [],
      },
    ]);
    setSectionTitle("");
  };

  return (
    <div>
      <form>
        <TextField
          id="refName"
          label="Refeição"
          variant="standard"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
        />
        <TextField
          id="time"
          label="Horário"
          variant="standard"
          value={input}
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            addSection(sectionTitle);
          }}
        >
          Nova Refeição
        </Button>
      </form>
    </div>
  );
};

export default FoodInput;

/* accordion: (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>
        {
          <div>
            <ul>
              <li>{input}</li>
              <li>{time} Hrs</li>
            </ul>
            <Button variant="contained" onClick={addFood}>
              Add Button
            </Button>
          </div>
        }
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        {foodList.map((item) => {
          return (
            <div key={item.id}>
              <h1>{item.name}</h1>
              <h2>{item.amount}</h2>
            </div>
          );
        })}
      </Typography>
    </AccordionDetails>
  </Accordion>
), */
