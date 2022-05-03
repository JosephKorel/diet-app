import React, { useState, useEffect } from "react";
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
import HelpIcon from "@mui/icons-material/Help";
import { Popover } from "antd";
import useLocalStorage from "../localStorage/useLocalStorage";

export default function DataDrawer({ setUserWeight }) {
  const [state, setState] = useState({
    bottom: false,
  });
  const { tmb, setTmb, objective, setObjective } = useAuth();
  const [act, setAct] = useState("");
  const [age, setAge] = useLocalStorage("age", "");
  const [weight, setWeight] = useLocalStorage("weight", "");
  const [height, setHeight] = useLocalStorage("height", "");
  const [sex, setSex] = useLocalStorage("sex", "");

  useEffect(() => {
    setUserWeight(weight);
  }, [weight]);

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
      <div className="w-8/12 m-auto">
        <div className="p-3 flex align-center justify-evenly">
          <GenderRadio sex={sex} setSex={setSex} tmb={tmb}></GenderRadio>
          <TextField
            color="secondary"
            type="number"
            label="Idade"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          ></TextField>
          <TextField
            color="secondary"
            type="number"
            label="Peso(kg)"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          ></TextField>
          <TextField
            color="secondary"
            type="number"
            label="Altura (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            onClick={(e) => console.log(e.target.value)}
          ></TextField>
        </div>
        <div className="w-6/12 flex align-center justify-evenly mt-5 ml-3 mb-16">
          <div className="flex align-center justify-center ">
            <ActSelector act={act} setAct={setAct}></ActSelector>
            <ActivityPopover></ActivityPopover>
          </div>
          <ObjectiveRadio
            objective={objective}
            setObjective={setObjective}
          ></ObjectiveRadio>
        </div>
        <div className="p-5 ml-[5%]">
          <Button
            onClick={() => {
              tmbCalc(anchor);
            }}
            variant="contained"
            color="secondary"
          >
            Salvar
          </Button>
        </div>
      </div>
    </Box>
  );

  return (
    <div className={tmb[0] !== 0 ? "mt-5" : "mt-24"}>
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            variant="contained"
            color="secondary"
          >
            {tmb[0] !== 0 ? "Editar" : "Adicionar Informações"}
          </Button>
          {tmb[0] !== 0 ? (
            <></>
          ) : (
            <Popover
              content="Adicione informações pessoais para obter detalhes personalizados"
              zIndex={1300}
            >
              <HelpIcon color="secondary" fontSize="large" />
            </Popover>
          )}

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
