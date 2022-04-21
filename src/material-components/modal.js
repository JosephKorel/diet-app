import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Alert, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAuth } from "../provider/auth";

const BasicModal = ({
  newFood,
  setNewFood,
  hide,
  setHide,
  setFoodInput,
  qnty,
  setQnty,
  addItem,
  entries,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { carb, protein, fat, data } = useAuth();
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const other = { display: "flex", flexDirection: "column" };

  const alertStyle = {
    position: "absolute",
    top: "210%",
  };

  const suggestions = (e) => {
    setNewFood(e.target.innerText);
    setFoodInput(e.target.innerText);
    setHide(true);
    setShow(true);
  };

  function closeAlert() {
    setAlert(false);
  }

  const addFood = (e) => {
    e.preventDefault();
    addItem(newFood);
    setNewFood("");
    setShow(false);
    setQnty(0);
    setAlert(true);
    setTimeout(closeAlert, 2000);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adicionar Alimento
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              id="foodName"
              label="Alimento"
              variant="standard"
              value={newFood}
              onChange={(e) => {
                setNewFood(e.target.value);
                setHide(false);
                setFoodInput(e.target.value);
                setShow(false);
              }}
              style={{ width: "300px" }}
            />
            <div>
              <div
                className={
                  newFood.length >= 3 && hide === false ? "sugg" : "hide"
                }
              >
                {newFood.length >= 3 && hide === false ? (
                  entries.map((item) =>
                    item.map((obj) => <p onClick={suggestions}>{obj}</p>)
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <TextField
              id="foodName"
              label="Quantidade"
              type="number"
              variant="standard"
              value={qnty}
              onChange={(e) => setQnty(e.target.value)}
            />
            <Button variant="contained" onClick={addFood}>
              Adicionar
            </Button>
            {show === true ? (
              <div>
                <h1>{entries.slice(0, 1)}</h1>
                <h2>Valor nutricional em 100 gramas</h2>
                <ul>
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
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
