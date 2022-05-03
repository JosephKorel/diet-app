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
        <div className=" m-auto w-11/12 text-center p-1 bg-white border-4 border-stone-800 rounded-[64px] mt-8">
          <h1 className="text-4xl font-sans font-semibold text-stone-800 mt-6">
            Meta diária:{" "}
            <span className="font-light italic">
              {target} <span className="text-2xl">KCAL</span>
            </span>
            {Tool(valueInfo)}
          </h1>
          <Progress
            type="circle"
            percent={Math.ceil((totalKcal / target) * 100)}
            format={() => kcalValue()}
            width={150}
            color="#00e5ff"
            strokeWidth={10}
            trailColor="#00e5ff26"
          />
          <p className="text-stone-800 font-normal p-0 text-2xl mt-2 font-sans">
            {totalKcal > target ? (
              <>
                Ultrapassou em{" "}
                <span className="font-bold italic">
                  {(totalKcal - target).toFixed(2)}
                </span>{" "}
                calorias
              </>
            ) : (
              <>
                Faltam{" "}
                <span className="font-bold italic">
                  {(target - totalKcal).toFixed(2)}
                </span>{" "}
                calorias
              </>
            )}
          </p>
        </div>
        <div className="flex flex-col mt-10">
          <h1 className="m-auto text-center text-white font-normal font-sans text-2xl p-2 pt-3 bg-stone-800 rounded-t-full w-8/12">
            Quantidades por quilograma
          </h1>
          <div className="flex align-center justify-around p-5 bg-white border-4 border-stone-800 rounded-[48px] text-black rounded-br-none">
            <div className="text-center">
              <h3 className="text-xl text-black font-sans font-normal">
                Carboidratos
              </h3>
              <Progress
                percent={(100 * totalCarb) / (weight * 4)}
                strokeColor="#e63946"
                type="circle"
                format={() => macroQty(totalCarb)}
                strokeWidth={8}
                trailColor="#e6394726"
                status="normal"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl text-black font-sans font-normal">
                Proteínas
              </h3>
              <Progress
                percent={(100 * totalProt) / (weight * 2)}
                strokeColor="#06d6a0"
                type="circle"
                format={() => macroQty(totalProt)}
                strokeWidth={8}
                trailColor="#06d6a026"
                status="normal"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl text-black font-sans font-normal">
                Gorduras
              </h3>
              <Progress
                percent={(100 * totalFat) / weight}
                strokeColor="#fca311"
                type="circle"
                format={() => macroQty(totalFat)}
                strokeWidth={8}
                trailColor="#fca31126"
                status="normal"
              />
            </div>
          </div>
          <div className="flex flex-row-reverse align-center text-white">
            <p className="flex text-white px-8 pt-2 pb-3 bg-stone-800 rounded-b-full">
              Valores recomendados
              {
                <div className="ml-3">
                  <Popover
                    content={recomendedValues}
                    zIndex={1300}
                    placement="right"
                    style={{ marginLeft: "4px" }}
                  >
                    <InfoIcon></InfoIcon>
                  </Popover>
                </div>
              }
            </p>
          </div>
        </div>
      </div>
    );
  };

  function kcalValue() {
    return (
      <p className="font-sans text-black italic font-normal text-lg mt-4">
        {totalKcal.toFixed(1)}Kcal
      </p>
    );
  }

  function macroQty(macro) {
    return (
      <p className="font-sans italic text-black font-normal text-lg mt-4">
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
            strokeWidth={10}
          />
          <Progress
            percent={Math.ceil(protKcal)}
            type="circle"
            strokeColor="#06d6a0"
            width={150}
            strokeWidth={10}
          />
          <Progress
            percent={Math.ceil(fatKcal)}
            type="circle"
            strokeColor="#fca311"
            width={150}
            strokeWidth={10}
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
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="glass-modal">
          <h1 className="m-auto text-center font-sans font-bold text-white text-5xl bg-secondary rounded-full p-2 py-4  w-7/12 ">
            VISÃO GERAL
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
