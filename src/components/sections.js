import React, { useState } from "react";
import { useAuth } from "../provider/auth";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasicModal from "../material-components/modal";
import { Button, TextField } from "@mui/material";
import { Progress } from "antd";

const Section = ({
  section,
  addItem,
  entries,
  removeItem,
  removeSection,
  saveEdit,
}) => {
  const [newFood, setNewFood] = useState("");
  const [open, setOpen] = useState(false);
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

  const text = (text) => {
    return <div className="text-stone-100 text-xl">{text}</div>;
  };

  const event =
    open === true ? { pointerEvents: "none" } : { pointerEvents: "auto" };

  return (
    <div>
      {section.title !== "" ? (
        <div className="mt-10 w-9/12 m-auto">
          <Accordion
            style={{
              borderRadius: "18px",
              pointerEvents: "none",
              backgroundColor: "#1a1a1a",
              /*  borderBottom: "4px solid black",
              border: "1px solid black", */
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" sx={event} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                backgroundColor: "#1a1a1a",
                borderTopLeftRadius: "18px",
                borderTopRightRadius: "18px",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
                padding: "10px",
                pointerEvents: "none",
              }}
            >
              <Typography className="w-full" style={{ pointerEvents: "none" }}>
                <div className="flex align-center justify-evenly">
                  <div className="flex-none w-64 font-sans">
                    <h1 className="text-4xl text-stone-100">{section.title}</h1>
                    <h2 className="text-3xl text-stone-100 font-extralight">
                      {section.time}
                    </h2>
                  </div>
                  <div className="shrink w-7/12">
                    <Progress
                      percent={Math.ceil(((carbSum * 4) / kcalSum) * 100)}
                      strokeColor="#e63946"
                      format={() => text("C")}
                    ></Progress>
                    <Progress
                      percent={Math.ceil(((protSum * 4) / kcalSum) * 100)}
                      strokeColor="#06d6a0"
                      format={() => text("P")}
                    ></Progress>
                    <Progress
                      percent={Math.ceil(((fatSum * 9) / kcalSum) * 100)}
                      strokeColor="#fca311"
                      format={() => text("G")}
                    ></Progress>
                    <h2 className="text-xl text-stone-100 font-sans font-thin">
                      {kcalSum} Kcal
                    </h2>
                  </div>
                  <div className="flex-none">
                    <Button
                      variant="contained"
                      onClick={() => removeSection()}
                      sx={{ pointerEvents: "auto" }}
                    >
                      Remover Refeição
                    </Button>
                    <BasicModal
                      newFood={newFood}
                      setNewFood={setNewFood}
                      open={open}
                      setOpen={setOpen}
                      setFoodInput={setFoodInput}
                      qnty={qnty}
                      setQnty={setQnty}
                      entries={entries}
                      addItem={(item) => addItem(item)}
                    ></BasicModal>
                  </div>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ pointerEvents: "auto" }}>
              <Typography>
                <div className="bg-[] text-stone-800 ">
                  {section.food.map((item, i) => (
                    <>
                      <div className="text-stone-800 flex justify-evenly bg-white border-2 border-white rounded-xl mt-2">
                        <div className="p-2 w-3/12">
                          <h2
                            className={`text-stone-800 ${
                              item.length >= 25 ? "text-2xl" : "text-3xl"
                            } `}
                          >
                            {item}
                          </h2>
                          <div>
                            <h3 className="text-2xl italic">Quantidade</h3>
                            <div className="flex justify-between">
                              <div className="w-6/12 flex justify-between">
                                {edit === i ? (
                                  <>
                                    <TextField
                                      type="number"
                                      variant="standard"
                                      value={
                                        edit === i ? value : section.quantity[i]
                                      }
                                      onChange={(e) => setValue(e.target.value)}
                                    />
                                    <Button
                                      variant="contained"
                                      onClick={() => saveEdit(i)}
                                      color="secondary"
                                    >
                                      Salvar
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-2xl m-0 p-0 py-0 font-sans font-medium italic">
                                      {section.quantity[i]}g
                                    </p>
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      onClick={() => {
                                        setEdit(i);
                                        setValue(section.quantity[i]);
                                      }}
                                    >
                                      Editar
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-3/12 flex align-center justify-between">
                          <div className="mt-3">
                            <div className="bg-[#e63946] text-white font-bold text-2xl text-center w-16 h-8 flex flex-col align-center justify-center rounded-t-xl">
                              C
                            </div>
                            <div className="text-white bg-stone-900 text-center h-8 rounded-b-md font-sans">
                              {section.carb[i]}
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="bg-[#06d6a0] text-white font-bold text-2xl text-center w-16 h-8 flex flex-col align-center justify-center rounded-t-xl">
                              P
                            </div>
                            <div className="text-white bg-stone-900 text-center h-8 rounded-b-md font-sans">
                              {section.protein[i]}
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="bg-[#fca311] text-white font-bold text-2xl text-center w-16 h-8 flex flex-col align-center justify-center rounded-t-xl ">
                              G
                            </div>
                            <div className="text-white bg-stone-900 text-center h-8 rounded-b-md font-sans">
                              {section.fat[i]}
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="bg-[#f50057] text-white font-bold text-xl text-center w-16 h-8 flex flex-col align-center justify-center rounded-t-xl">
                              Kcal
                            </div>
                            <div className="text-white bg-stone-900 text-center h-8 rounded-b-md font-sans">
                              {section.calories[i]}
                            </div>
                          </div>
                        </div>
                        <div className="w-36">
                          {/* <Button
                            style={{ marginTop: "12px" }}
                            variant="contained"
                            onClick={() => removeItem(i)}
                            id={i}
                          >
                            Remover
                          </Button> */}
                          <img
                            src="./minus.png"
                            alt="Excluir"
                            className="mt-3 w-10 hover:scale-105 duration-100 cursor-pointer ml-[70%]"
                            onClick={() => removeItem(i)}
                          ></img>
                        </div>
                      </div>
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
