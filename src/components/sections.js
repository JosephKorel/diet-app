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
      <div className="text-stone-100 dark:text-stone-900 text-lg md:text-xl">
        {text}
      </div>
    );
  };

  return (
    <div>
      {section.title !== "" ? (
        <div className="mt-10 w-[90%] md:w-11/12 sm:w-[98%] m-auto">
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
                <div className="flex align-center md:justify-evenly sm:justify-between">
                  <div className="flex-none shrink-0 md:shrink w-[28%] lg:w-64 md:w-44 font-sans">
                    <h1 className="text-base md:text-2xl lg:text-4xl  text-stone-100 dark:text-stone-900  ">
                      {section.title}
                    </h1>
                    <h2 className="text-sm md:text-xl lg:text-3xl  text-stone-100 dark:text-stone-900 font-extralight ">
                      {section.time}
                    </h2>
                    {window.innerWidth <= 500 ? (
                      <h2 className="text-sm text-stone-100 dark:text-stone-900 font-sans font-thin dark:font-light">
                        {kcalSum.toFixed(1)} Kcal
                      </h2>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="shrink-0 md:shrink w-6/12 md:w-7/12 ">
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
                  <div className="flex-none sm:mt-2 sm:shrink-0 md:mt-0">
                    <Button
                      variant="contained"
                      onClick={() => removeSection()}
                      sx={{
                        pointerEvents: "auto",
                        width: {
                          xs: "70px",
                          sm: "150px",
                          md: "185px",
                        },
                        fontSize: {
                          xs: "12px",
                          md: "14px",
                        },
                        padding: {
                          xs: "0px",
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
                      <div className="text-stone-900 dark:text-stone-100 flex flex-col md:flex-row justify-between lg:justify-between 2xl:justify-around bg-white dark:bg-dark border-2 border-white rounded-xl mt-2">
                        <div className="p-2 2xl:w-[25%] lg:w-2/6 md:w-5/12 w-full flex flex-col">
                          <div className="flex align-center justify-between w-full">
                            <h2
                              className={`text-stone-900 dark:text-stone-100 ${
                                item.length >= 25
                                  ? "lg:text-xl 2xl:text-2xl md:text-base text-sm"
                                  : "lg:text-2xl 2xl:text-3xl text-lg"
                              } `}
                            >
                              {item}
                            </h2>
                            {window.innerWidth < 600 ? (
                              <div className="">
                                <img
                                  src="./minus.png"
                                  alt="Excluir"
                                  className="w-[36px] mt-3 hover:scale-105 duration-100 cursor-pointer lg:ml-[70%] md:ml-[60%]"
                                  onClick={() => removeItem(i)}
                                ></img>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-sm md:text-base lg:text-xl italic text-stone-900 dark:text-stone-100">
                              Quantidade
                            </h3>
                            <div className="flex justify-between">
                              <div className="w-[35%] md:w-2/3 lg:w-6/12 flex justify-between">
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
                                      sx={{
                                        width: {
                                          xs: "50px",
                                          sm: "60px",
                                          md: "80px",
                                        },
                                        padding: {
                                          xs: "0px",
                                          sm: "2px",
                                          md: "4px",
                                        },
                                        fontSize: {
                                          xs: "12px",
                                          sm: "14px",
                                        },
                                      }}
                                    >
                                      Salvar
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-sm lg:text-lg m-0 p-0 py-0 font-sans font-medium italic">
                                      {section.quantity[i]}g
                                    </p>
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      onClick={() => {
                                        setEdit(i);
                                        setValue(section.quantity[i]);
                                      }}
                                      sx={{
                                        width: {
                                          xs: "50px",
                                          sm: "60px",
                                          md: "80px",
                                        },
                                        padding: {
                                          xs: "0px",
                                          sm: "2px",
                                          md: "4px",
                                        },
                                        fontSize: {
                                          xs: "12px",
                                          sm: "14px",
                                        },
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

                        <div className="w-full lg:w-5/12 md:w-1/2 mb-2 flex align-center justify-evenly md:justify-between md:m-0  md:translate-y-[25%] lg:translate-y-[20%] 2xl:translate-y-[15%]">
                          <div className="mt-3">
                            <div className="bg-[#e63946] text-white font-bold text-xl 2xl:text-3xl text-center w-12 lg:w-16 2xl:w-20 2xl:h-10 h-6 lg:h-8 flex flex-col align-center justify-center rounded-t-lg">
                              C
                            </div>
                            <div className="text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 text-center h-6 lg:h-8 2xl:h-10 rounded-b-lg font-sans text-sm lg:text-base 2xl:text-lg 2xl:leading-10">
                              {section.carb[i]}
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="bg-[#06d6a0] text-white font-bold text-xl 2xl:text-3xl text-center w-12 lg:w-16 h-6 lg:h-8 2xl:w-20 2xl:h-10 flex flex-col align-center justify-center rounded-t-lg">
                              P
                            </div>
                            <div className="text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 text-center h-6 lg:h-8 2xl:h-10 rounded-b-lg font-sans text-sm lg:text-base 2xl:text-lg 2xl:leading-10">
                              {section.protein[i]}
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="bg-[#fca311] text-white font-bold text-xl 2xl:text-3xl text-center w-12 lg:w-16 h-6 lg:h-8 2xl:w-20 2xl:h-10 flex flex-col align-center justify-center rounded-t-lg ">
                              G
                            </div>
                            <div className="text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 text-center h-6 lg:h-8 2xl:h-10 rounded-b-lg font-sans text-sm lg:text-base 2xl:text-lg 2xl:leading-10">
                              {section.fat[i]}
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="bg-[#f50057] text-white font-bold text-base 2xl:text-2xl text-center w-12 lg:w-16 h-6 lg:h-8 2xl:w-20 2xl:h-10 flex flex-col align-center justify-center rounded-t-lg">
                              Kcal
                            </div>
                            <div className="text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 text-center h-6 lg:h-8 2xl:h-10 rounded-b-lg font-sans text-sm lg:text-base 2xl:leading-10">
                              {section.calories[i].toFixed(1)}
                            </div>
                          </div>
                        </div>
                        {window.innerWidth >= 600 ? (
                          <div className="w-36">
                            <img
                              src="./minus.png"
                              alt="Excluir"
                              className="mt-3 w-10 hover:scale-105 duration-100 cursor-pointer lg:ml-[70%] md:ml-[60%]"
                              onClick={() => removeItem(i)}
                            ></img>
                          </div>
                        ) : (
                          <div></div>
                        )}
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

{
  /*  <div className="bg-[#e63946] text-white font-bold text-2xl text-center w-16 h-8 flex flex-col align-center justify-center rounded-t-xl">
                              C
                            </div>
                            <div className="text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 text-center h-8 rounded-b-md font-sans">
                            {section.carb[i]}
                          </div> */
}
