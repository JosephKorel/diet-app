import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAuth } from "../provider/auth";
import DataDrawer from "./drawer";
import { Progress, Tooltip, Popover } from "antd";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";

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

const OverviewModal = ({ open, setOpen, setValue, preValue }) => {
  const { sections, tmb, objective } = useAuth();
  const [drawer, setDrawer] = useState(false);
  const [userweight, setUserWeight] = useState(0);

  const weight = JSON.parse(localStorage.getItem("weight"));

  console.log(tmb[1]);

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
    setValue(preValue);
  };

  const recomendedValues = () => {
    return (
      <div>
        <ul className="text-lg">
          <li>
            <span className="text-lg font-medium">Carboidratos:</span>
            {""} Recomenda-se de 2 a 4 gramas por quilograma corporal
          </li>
          <li>
            <span className="text-lg font-medium">Proteínas:</span> Recomenda-se
            de 1,6 a 2 gramas por quilograma corporal
          </li>
          <li>
            <span className="text-lg font-medium">Gorduras:</span> Recomenda-se
            de 0,4 a 1 grama por quilograma corporal
          </li>
        </ul>
        <p className="text-base font-medium">
          *Os valores podem mudar de acordo com as necessidades individuais
        </p>
      </div>
    );
  };

  const valueInfo = "Valores estimados utilizando o método Harris-Bennet";

  function Tool(text) {
    return (
      <Popover content={text} zIndex={1300} placement="right">
        <InfoIcon></InfoIcon>
      </Popover>
    );
  }

  const UserData = () => {
    let target = 0;
    if (objective === "emagrecimento") target += tmb[1] - 300;
    if (objective === "hipertrofia") target += tmb[1] + 300;
    if (objective === "manter") target += tmb[1];
    return (
      <div className="myprogress">
        <div className="text-center">
          <h1 className="text-4xl font-sans font-semibold text-white">
            Meta diária:{" "}
            <span className="font-light italic">
              {target} <span className="text-2xl">KCAL</span>
            </span>
            {Tool(valueInfo)}
          </h1>
          <Progress
            type="circle"
            percent={Math.ceil((totalKcal / tmb[1]) * 100)}
            format={() => kcalValue()}
            width={150}
            color="#00e5ff"
          />
          <p className="text-white font-semibold text-2xl mt-4 font-sans">
            {totalKcal > tmb[1] ? (
              <>
                Ultrapassou em{" "}
                <span className="font-light italic">
                  {(totalKcal - target).toFixed(2)}
                </span>{" "}
                calorias
              </>
            ) : (
              <>
                Faltam{" "}
                <span className="font-light italic">
                  {(target - totalKcal).toFixed(2)}
                </span>{" "}
                calorias
              </>
            )}
          </p>
        </div>
        <div className="flex flex-col ">
          <h1 className="text-white font-sans font-semibold text-3xl">
            Quantidades por quilograma
          </h1>
          <div className="flex align-center justify-between">
            <div className="text-center">
              <h3 className="text-xl text-white font-sans font-light">
                Carboidratos
              </h3>
              <Progress
                percent={Math.ceil(carbKcal)}
                strokeColor="#e63946"
                type="circle"
                format={() => macroQty(totalCarb)}
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl text-white font-sans font-light">
                Proteínas
              </h3>
              <Progress
                percent={Math.ceil(protKcal)}
                strokeColor="#06d6a0"
                type="circle"
                format={() => macroQty(totalProt)}
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl text-white font-sans font-light">
                Gorduras
              </h3>
              <Progress
                percent={Math.ceil(fatKcal)}
                strokeColor="#fca311"
                type="circle"
                format={() => macroQty(totalFat)}
              />
            </div>
          </div>
          <div className="flex align-center mt-3 text-white">
            <p className="text-white mr-1">Valores recomendados</p>
            <Popover content={recomendedValues} zIndex={1300} placement="right">
              <InfoIcon></InfoIcon>
            </Popover>
          </div>
        </div>
      </div>
    );
  };
  function kcalValue() {
    return (
      <p className="font-sans italic font-light text-lg mt-4">
        {totalKcal}Kcal
      </p>
    );
  }

  function macroQty(macro) {
    return (
      <p className="font-sans italic font-light text-lg mt-4">
        {(macro / weight).toFixed(2)}g/kg
      </p>
    );
  }

  const General = () => {
    return (
      <div className="flex flex-col text-white border-0 align-center justify-evenly">
        <div className="text-center mt-5">
          <h1 className="text-4xl font-semibold text-white font-sans">
            Calorias totais:
          </h1>
          <h2 className="text-2xl font-semibold italic text-white font-sans">
            {totalKcal} Kcal
          </h2>
        </div>
        <div className="flex text-white border-0 justify-between myprogress mt-5">
          <Progress
            percent={Math.ceil(carbKcal)}
            type="circle"
            strokeColor="#e63946"
            width={150}
          />
          <Progress
            percent={Math.ceil(protKcal)}
            type="circle"
            strokeColor="#06d6a0"
            width={150}
          />
          <Progress
            percent={Math.ceil(fatKcal)}
            type="circle"
            strokeColor="#fca311"
            width={150}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={drawer === true ? console.log() : handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="glass-modal">
          <h1 className="m-auto text-center font-bold text-stone-800 text-3xl p-2 bg-white rounded-3xl w-4/12 ">
            Visão geral
          </h1>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {tmb[0] !== 0 ? (
              <div>
                <UserData></UserData>
              </div>
            ) : (
              <General></General>
            )}
            <DataDrawer
              drawer={drawer}
              setDrawer={setDrawer}
              setUserWeight={setUserWeight}
            ></DataDrawer>
          </Typography>
        </div>
      </Modal>
    </div>
  );
};

export default OverviewModal;
