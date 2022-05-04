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
import { Responsive } from "../material-components/media-query";
import { styled } from "@mui/material/styles";
import { red, green, blue } from "@mui/material/colors";

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
  const { qnty, setQnty, value, setValue, edit, setEdit, setFoodInput, theme } =
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
    return (
      <div className="text-stone-100 dark:text-stone-900 text-xl">{text}</div>
    );
  };

  const Responsive = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      color: "secondary",
    },
  }));

  const Root = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("laptop")]: {
      backgroundColor: "secondary",
      color: "secondary",
      padding: "12px",
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.secondary.main,
      padding: "12px",
    },
  }));

  return (
    <div>
      {section.title !== "" ? (
        <div className="mt-10 lg:w-9/12 md:w-11/12 sm:w-[98%] m-auto">
          <Accordion
            style={{
              borderRadius: "18px",
              backgroundColor: `${theme == "light" ? "#1a1a1a" : "#f6f9f7"}`,
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  color="primary"
                  sx={{
                    pointerEvents: "auto",
                    marginTop: {
                      xs: "80px",
                    },
                  }}
                />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                backgroundColor: `${theme == "light" ? "#1a1a1a" : "#f6f9f7"}`,
                borderTopLeftRadius: "18px",
                borderTopRightRadius: "18px",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
                padding: "10px",
                pointerEvents: "none",
              }}
            >
              <Typography className="w-full" style={{ pointerEvents: "none" }}>
                <div className="flex align-center justify-evenly sm:justify-between">
                  <div className="flex-none sm:shrink-0 lg:w-64 md:w-44 sm:w-32 sm:p-1 font-sans">
                    <h1 className="lg:text-4xl text-stone-100 dark:text-stone-900 sm:text-xl md:text-3xl">
                      {section.title}
                    </h1>
                    <h2 className="lg:text-3xl sm:text-lg text-stone-100 dark:text-stone-900 font-extralight md:text-2xl">
                      {section.time}
                    </h2>
                    {window.innerWidth <= 500 ? (
                      <h2 className="text-base text-stone-100 dark:text-stone-900 font-sans font-thin dark:font-light">
                        {kcalSum.toFixed(1)} Kcal
                      </h2>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="shrink sm:shrink-0 md:w-7/12 sm:w-5/12">
                    <Progress
                      percent={Math.ceil(((carbSum * 4) / kcalSum) * 100)}
                      strokeColor="#e63946"
                      trailColor={theme == "light" ? "#f6f9f7" : "#4d4d4d"}
                      format={() => text("C")}
                    ></Progress>
                    <Progress
                      percent={Math.ceil(((protSum * 4) / kcalSum) * 100)}
                      strokeColor="#06d6a0"
                      trailColor={theme == "light" ? "#f6f9f7" : "#4d4d4d"}
                      format={() => text("P")}
                    ></Progress>
                    <Progress
                      percent={Math.ceil(((fatSum * 9) / kcalSum) * 100)}
                      strokeColor="#fca311"
                      trailColor={theme == "light" ? "#f6f9f7" : "#4d4d4d"}
                      format={() => text("G")}
                    ></Progress>
                    {window.innerWidth > 500 ? (
                      <h2 className="md:text-xl text-stone-100 dark:text-stone-900 font-sans font-thin dark:font-light">
                        {kcalSum} Kcal
                      </h2>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="flex-none sm:mt-2 md:mt-0">
                    <Button
                      variant="contained"
                      onClick={() => removeSection()}
                      sx={{
                        width: {
                          xs: "80px",
                          sm: "150px",
                          md: "185px",
                          lg: "185px",
                        },
                        fontSize: {
                          xs: "12px",
                          lg: "14px",
                        },
                        padding: {
                          xs: "2px",
                          sm: "8px",
                        },
                      }}
                    >
                      {window.innerWidth < 600 ? "Remover" : "Remover refeição"}
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
                <div className=" text-stone-800 ">
                  {section.food.map((item, i) => (
                    <>
                      <div className="text-stone-900 dark:text-stone-100 flex lg:justify-evenly md:justify-between bg-white dark:bg-dark border-2 border-white rounded-xl mt-2">
                        <div className="p-2 lg:w-3/12 md:w-5/12">
                          <h2
                            className={`text-stone-900 dark:text-stone-100 ${
                              item.length >= 25
                                ? "lg:text-2xl md:text-xl"
                                : "lg:text-3xl md:text-2xl"
                            } `}
                          >
                            {item}
                          </h2>
                          <div>
                            <h3 className="lg:text-2xl md:text-xl italic text-stone-900 dark:text-stone-100">
                              Quantidade
                            </h3>
                            <div className="flex justify-between">
                              <div className="lg:w-6/12 md:w-2/3 flex justify-between">
                                {edit === i ? (
                                  <>
                                    <TextField
                                      type="number"
                                      size="medium"
                                      color="secondary"
                                      variant="standard"
                                      value={
                                        edit === i ? value : section.quantity[i]
                                      }
                                      sx={{
                                        "& .MuiInputBase-root ": {
                                          color: `${
                                            theme == "light"
                                              ? "#1a1a1a"
                                              : "#f6f9f7"
                                          }`,
                                        },
                                      }}
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
                                    <p className="lg:text-2xl md:text-xl m-0 p-0 py-0 font-sans font-medium italic">
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
                        <div className="lg:w-3/12 md: w-1/2 flex align-center justify-between">
                          <div className="mt-3">
                            <div className="bg-[#e63946] text-white font-bold text-2xl text-center w-16 h-8 flex flex-col align-center justify-center rounded-t-xl">
                              C
                            </div>
                            <div className="text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 text-center h-8 rounded-b-md font-sans">
                              {section.carb[i]}
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="bg-[#06d6a0] text-white font-bold text-2xl text-center w-16 h-8 flex flex-col align-center justify-center rounded-t-xl">
                              P
                            </div>
                            <div className="text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 text-center h-8 rounded-b-md font-sans">
                              {section.protein[i]}
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="bg-[#fca311] text-white font-bold text-2xl text-center w-16 h-8 flex flex-col align-center justify-center rounded-t-xl ">
                              G
                            </div>
                            <div className="text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 text-center h-8 rounded-b-md font-sans">
                              {section.fat[i]}
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="bg-[#f50057] text-white font-bold text-xl text-center w-16 h-8 flex flex-col align-center justify-center rounded-t-xl">
                              Kcal
                            </div>
                            <div className="text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 text-center h-8 rounded-b-md font-sans">
                              {section.calories[i].toFixed(1)}
                            </div>
                          </div>
                        </div>
                        <div className="w-36">
                          <img
                            src="./minus.png"
                            alt="Excluir"
                            className="mt-3 w-10 hover:scale-105 duration-100 cursor-pointer lg:ml-[70%] md:ml-[60%]"
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
