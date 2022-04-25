import * as React from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAuth } from "../provider/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const OverviewModal = ({ open, setOpen, setValue }) => {
  const { sections } = useAuth();

  let totalCarb = 0;
  let totalProt = 0;
  let totalFat = 0;
  let totalKcal = 0;
  for (let i = 0; i < sections.length; i++) {
    const carbMap = sections.map((item) => item.carb);
    const protMap = sections.map((item) => item.protein);
    const fatMap = sections.map((item) => item.fat);
    const calMap = sections.map((item) => item.calories);

    let carbSum = carbMap[i].reduce((total, item) => {
      return (total += item);
    }, 0);
    totalCarb += carbSum;

    let protSum = protMap[i].reduce((total, item) => {
      return (total += item);
    }, 0);
    totalProt += protSum;

    let fatSum = fatMap[i].reduce((total, item) => {
      return (total += item);
    }, 0);
    totalFat += fatSum;

    let calSum = calMap[i].reduce((total, item) => {
      return (total += item);
    }, 0);
    totalKcal += calSum;
  }

  const handleClose = () => {
    setOpen(false);
    setValue(0);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ul>
              <li>C: {totalCarb}g</li>
              <li>P: {totalProt}g</li>
              <li>G: {totalFat}g</li>
              <li>Kcal: {totalKcal}</li>
            </ul>
            <Button variant="contained" onClick={handleClose}>
              Não
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default OverviewModal;
