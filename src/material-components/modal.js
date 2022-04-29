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
    top: "210%",
  };

  const errorStyle = {
    position: "absolute",
    top: "130%",
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
    } else {
      setError(true);
      setTimeout(closeAlert, 2000);
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{ marginTop: "10px", pointerEvents: "auto" }}
      >
        Adicionar alimento
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
        <div className="glass bg-white font-sans">
          {/* <Typography id="modal-modal-title" variant="h4" component="h2">
            Adicionar Alimentosss
          </Typography> */}
          <h1 className="text-stone-800 text-4xl p-5">Adicionar alimento</h1>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              /*  display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center", */
            }}
          >
            <div className="w-full flex align-center justify-evenly mt-10">
              <FoodField
                setShow={setShow}
                newFood={newFood}
                setNewFood={setNewFood}
              ></FoodField>
              <TextField
                id="foodQuantity"
                label="Quantidade (g)"
                type="number"
                variant="standard"
                value={qnty}
                onChange={(e) => setQnty(e.target.value)}
                color="secondary"
              />
              <Button variant="contained" onClick={addFood} color="secondary">
                Adicionar
              </Button>
            </div>
            {show === true ? (
              <div className="p-5 mt-10">
                <h1 className="text-stone-800 text-5xl">
                  {entries.map((item) => item.slice(0, 1).map((obj) => obj))}
                </h1>
                <h2 className="text-xl italic">
                  Valor nutricional em 100 gramas
                </h2>
                <ul className="text-lg">
                  <li>Carboidratos: {carb}g</li>
                  <li>Proteínas: {protein}g</li>
                  <li>Gorduras: {fat}g</li>
                </ul>
              </div>
            ) : (
              <div></div>
            )}
            {alert === true ? (
              <div style={alertStyle}>
                <Alert severity="success">Alimento adicionado!</Alert>
              </div>
            ) : (
              <div></div>
            )}
            {error === true ? (
              <div style={errorStyle}>
                <Alert severity="error">Insira uma quantidade válida</Alert>
              </div>
            ) : (
              <div></div>
            )}
          </Typography>
        </div>
      </Modal>
    </div>
  );
};

export default BasicModal;
