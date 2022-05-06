import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Alert, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAuth } from "../provider/auth";
import FoodField from "./auto-complete";

const BasicModal = ({
  newFood,
  setNewFood,
  qnty,
  setQnty,
  addItem,
  open,
  setOpen,
}) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { carb, protein, fat, entries } = useAuth();
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const alertStyle = {
    position: "absolute",
    top: "110%",
  };

  const errorStyle = {
    position: "absolute",
    top: "110%",
  };

  function closeAlert() {
    setAlert(false);
    setError(false);
  }

  const addFood = (e) => {
    if (qnty > 0) {
      e.preventDefault();
      addItem(newFood);
      setNewFood("");
      setShow(false);
      setError(false);
      setQnty(0);
      setAlert(true);
      setTimeout(closeAlert, 2000);
    } else if (newFood == "") return;
    else {
      setError(true);
      setTimeout(closeAlert, 2000);
    }
  };

  const onModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={onModalClick}>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{
          marginTop: "10px",
          pointerEvents: "auto",
        }}
        sx={{
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
        {window.innerWidth < 600 ? "Adicionar" : "Adicionar alimento"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(2px)",
        }}
      >
        <div className="flex flex-col w-full">
          <div className="glass w-[95%] lg:w-5/6 2xl:w-2/3 bg-white font-sans">
            <h1 className="text-stone-800 text-lg md:text-2xl lg:text-3xl 2xl:text-4xl p-5">
              Adicionar alimento
            </h1>
            <Typography
              id="modal-modal-description"
              sx={{
                mt: 2,
              }}
            >
              <div className="flex flex-col align-center justify-center">
                <div>
                  <div className="w-full flex align-center justify-around p-2 mb-3">
                    <FoodField
                      setShow={setShow}
                      newFood={newFood}
                      setNewFood={setNewFood}
                    ></FoodField>
                    <TextField
                      id="foodQuantity"
                      label="Quantidade(g)"
                      type="number"
                      variant="standard"
                      value={qnty}
                      onChange={(e) => setQnty(e.target.value)}
                      color="secondary"
                      sx={{
                        width: {
                          xs: "80px",
                          sm: "100px",
                          md: "150px",
                        },
                      }}
                    />
                    {window.innerWidth >= 600 ? (
                      <Button
                        variant="contained"
                        onClick={addFood}
                        color="secondary"
                      >
                        Adicionar
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                  {show === true ? (
                    <div className="p-2">
                      <h1 className="text-stone-800 text-xl md:text-2xl lg:text-3xl 2xl:text-4xl">
                        {entries.map((item) =>
                          item.slice(0, 1).map((obj) => obj)
                        )}
                      </h1>
                      <h2 className="text-base md:text-xl 2xl:text-2xl italic">
                        Valor nutricional em 100 gramas
                      </h2>
                      <ul className="text-sm md:text-base lg:text-lg 2xl:text-xl">
                        <li>Carboidratos: {carb}g</li>
                        <li>Proteínas: {protein}g</li>
                        <li>Gorduras: {fat}g</li>
                      </ul>
                      {window.innerWidth < 600 ? (
                        <Button
                          variant="contained"
                          onClick={addFood}
                          color="secondary"
                        >
                          Adicionar
                        </Button>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div>
                  {alert === true ? (
                    <div style={alertStyle} className="w-full">
                      <Alert
                        severity="success"
                        sx={{ width: "270px", margin: "auto" }}
                      >
                        Alimento adicionado!
                      </Alert>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {error === true ? (
                    <div style={errorStyle} className="w-full">
                      <Alert
                        severity="error"
                        sx={{ width: "270px", margin: "auto" }}
                      >
                        Insira uma quantidade válida
                      </Alert>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </Typography>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BasicModal;
