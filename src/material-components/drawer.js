import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, TextField } from "@mui/material";
import {
  ActSelector,
  ActivityPopover,
  GenderRadio,
  ObjectiveRadio,
} from "./selectors";
import { useAuth } from "../provider/auth";

export default function DataDrawer() {
  const [state, setState] = React.useState({
    bottom: false,
  });
  const { tmb, setTmb, objective, setObjective } = useAuth();
  const [act, setAct] = React.useState("");
  const [age, setAge] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [sex, setSex] = React.useState("");

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const tmbCalc = (anchor) => {
    if (
      age !== "" &&
      weight !== 0 &&
      height !== 0 &&
      act !== 0 &&
      sex === "Masculino"
    ) {
      const manTmb = Math.ceil(66 + (13.7 * weight + 5 * height - 6.8 * age));
      const actManTmb = Math.ceil(manTmb * act);
      setTmb([manTmb, actManTmb]);
      setState({ ...state, [anchor]: false });
    } else if (
      age !== "" &&
      weight !== 0 &&
      height !== 0 &&
      act !== 0 &&
      sex === "Feminino"
    ) {
      const femTmb = Math.ceil(655 + (9.6 * weight + 1.8 * height - 4.7 * age));
      const actFemTmb = Math.ceil(femTmb * act);
      setTmb([femTmb, actFemTmb]);
      setState({ ...state, [anchor]: false });
    }
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      /* onClick={toggleDrawer(anchor, false)} */
    >
      <GenderRadio sex={sex} setSex={setSex} tmb={tmb}></GenderRadio>
      <TextField
        className="personal-input"
        type="number"
        label="Idade"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      ></TextField>
      <TextField
        className="personal-input"
        type="number"
        label="Peso(kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      ></TextField>
      <TextField
        className="personal-input"
        type="number"
        label="Altura (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        onClick={(e) => console.log(e.target.value)}
      ></TextField>
      <ActSelector act={act} setAct={setAct}></ActSelector>
      <ActivityPopover></ActivityPopover>
      <ObjectiveRadio
        objective={objective}
        setObjective={setObjective}
      ></ObjectiveRadio>
      <Button
        onClick={() => {
          tmbCalc(anchor);
        }}
      >
        Salvar
      </Button>
    </Box>
  );

  return (
    <div>
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            {tmb[0] !== 0 ? "Editar" : "Adicionar"}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{ zIndex: 1300 }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
