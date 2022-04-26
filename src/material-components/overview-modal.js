import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAuth } from "../provider/auth";
import DataDrawer from "./drawer";
import { Progress, Tooltip } from "antd";
import InfoIcon from "@mui/icons-material/Info";

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
  const { sections, tmb, objective } = useAuth();
  const [drawer, setDrawer] = React.useState(false);

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

  const carbKcal = ((totalCarb * 4) / totalKcal) * 100;
  const protKcal = ((totalProt * 4) / totalKcal) * 100;
  const fatKcal = ((totalFat * 9) / totalKcal) * 100;

  const handleClose = () => {
    setOpen(false);
    setValue(0);
  };

  const valueInfo = "Valores estimados utilizando o método Harris-Bennet";
  const carbSug = "Recomenda-se de 2 a 4 gramas por quilograma corporal";
  const protSug = "Recomenda-se de 1,2 a 2 gramas por quilograma corporal";
  const fatSug = "Recomenda-se de 0,4 a 1 grama por quilograma corporal";

  function Tool(text) {
    return (
      <Tooltip title={text} zIndex={1300} placement="right">
        <InfoIcon></InfoIcon>
      </Tooltip>
    );
  }

  const UserData = () => {
    let target = 0;
    if (objective === "emagrecimento") target += tmb[1] - 300;
    if (objective === "hipertrofia") target += tmb[1] + 300;
    if (objective === "manter") target += tmb[1];
    return (
      <div>
        <h2>
          Meta diária: {target} Kcal {Tool(valueInfo)}
        </h2>
        <Progress
          type="circle"
          percent={Math.ceil((totalKcal / tmb[1]) * 100)}
          format={() => kcalValue()}
        />
        <h3>Carboidratos {Tool(carbSug)}</h3>
        <Progress percent={Math.ceil(carbKcal)} />
        <h3>Proteínas {Tool(protSug)}</h3>
        <Progress percent={Math.ceil(protKcal)} />
        <h3>Gorduras {Tool(fatSug)}</h3>
        <Progress percent={Math.ceil(fatKcal)} />
      </div>
    );
  };
  function kcalValue() {
    return <p style={{ fontSize: "18px" }}>{totalKcal}Kcal</p>;
  }

  const General = () => {
    return (
      <div>
        <ul>
          <li>C: {totalCarb}g</li>
          <li>P: {totalProt}g</li>
          <li>G: {totalFat}g</li>
          <li>Kcal: {totalKcal}</li>
        </ul>
      </div>
    );
  };

  console.log((totalKcal / tmb[1]) * 100);

  return (
    <div>
      <Modal
        open={open}
        onClose={drawer === true ? console.log() : handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Visão geral
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {tmb[0] !== 0 ? <UserData></UserData> : <General></General>}
            <DataDrawer drawer={drawer} setDrawer={setDrawer}></DataDrawer>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default OverviewModal;
