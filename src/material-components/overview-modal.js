import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAuth } from "../provider/auth";
import DataDrawer from "./drawer";
import { Progress, Popover } from "antd";
import InfoIcon from "@mui/icons-material/Info";

const OverviewModal = ({ open, setOpen, setValue, preValue }) => {
  const { sections, tmb, objective } = useAuth();
  const [drawer, setDrawer] = useState(false);
  const [userweight, setUserWeight] = useState(0);

  const weight = JSON.parse(localStorage.getItem("weight"));

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
        <ul className="text-base">
          <li>
            <span className="font-medium">Carboidratos:</span>
            {""} Recomenda-se de 2 a 4 gramas por quilograma corporal
          </li>
          <li>
            <span className="font-medium">Proteínas:</span> Recomenda-se de 1,6
            a 2 gramas por quilograma corporal
          </li>
          <li>
            <span className="font-medium">Gorduras:</span> Recomenda-se de 0,4 a
            1 grama por quilograma corporal
          </li>
        </ul>
        <p className="text-sm font-medium">
          *Os valores podem mudar de acordo com as necessidades individuais
        </p>
      </div>
    );
  };

  const valueInfo = "Valores estimados utilizando o método Harris-Bennet";

  function Tool(text) {
    return (
      <Popover content={text} zIndex={1300} placement="left">
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
        <div className="m-auto w-11/12 lg:w-9/12 text-center p-1 bg-white border-4 border-stone-800 rounded-[32px] ">
          <h1 className="text-xl lg:text-2xl font-sans font-semibold text-stone-800">
            Meta diária:{" "}
            <span className="font-light italic">
              {target} <span className="text-lg lg:text-xl">KCAL</span>
            </span>
            {Tool(valueInfo)}
          </h1>
          <Progress
            type="circle"
            percent={Math.ceil((totalKcal / target) * 100)}
            format={() => kcalValue()}
            width={window.innerWidth < 650 ? 110 : 150}
            color="#00e5ff"
            strokeWidth={10}
            trailColor="#00e5ff26"
          />
          <p className="text-stone-800 font-normal text-lg lg:text-xl mt-2 font-sans leading-3">
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
        <div className="flex flex-col mt-2">
          <h1 className="m-auto text-center text-white font-normal font-sans text-lg md:text-xl lg:text-2xl px-2 pt-3 md:pt-2 bg-stone-800 rounded-t-full w-10/12 lg:w-1/2 ">
            Quantidades por quilograma
          </h1>
          <div className="flex align-center justify-between md:justify-around p-2 bg-white border-4 border-stone-800 rounded-[22px] text-black rounded-br-none lg:w-5/6 lg:m-auto">
            <div className="text-center">
              <h3 className="text-sm lg:text-lg text-black font-sans font-normal">
                Carboidratos
              </h3>
              <Progress
                percent={(100 * totalCarb) / (weight * 4)}
                strokeColor="#e63946"
                type="circle"
                format={() => macroQty(totalCarb)}
                width={window.innerWidth < 650 ? 100 : 150}
                strokeWidth={8}
                trailColor="#e6394726"
                status="normal"
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm lg:text-lg text-black font-sans font-normal">
                Proteínas
              </h3>
              <Progress
                percent={(100 * totalProt) / (weight * 2)}
                strokeColor="#06d6a0"
                type="circle"
                format={() => macroQty(totalProt)}
                width={window.innerWidth < 650 ? 100 : 150}
                strokeWidth={8}
                trailColor="#06d6a026"
                status="normal"
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm lg:text-lg text-black font-sans font-normal">
                Gorduras
              </h3>
              <Progress
                percent={(100 * totalFat) / weight}
                strokeColor="#fca311"
                type="circle"
                format={() => macroQty(totalFat)}
                width={window.innerWidth < 650 ? 100 : 150}
                strokeWidth={8}
                trailColor="#fca31126"
                status="normal"
              />
            </div>
          </div>
          <div className="flex flex-row-reverse align-center text-white lg:w-[91.7%]">
            <p className="flex text-sm text-white px-6 pt-2 pb-3 bg-stone-800 rounded-b-full">
              Valores recomendados
              {
                <div className="ml-1">
                  <Popover
                    content={recomendedValues}
                    zIndex={1300}
                    placement="left"
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
      <p className="font-sans text-black italic font-normal text-sm lg:text-lg mt-4">
        {totalKcal.toFixed(1)}Kcal
      </p>
    );
  }

  function macroQty(macro) {
    return (
      <p className="font-sans italic text-black font-normal text-base lg:text-lg mt-4">
        {(macro / weight).toFixed(2)}g/kg
      </p>
    );
  }

  const General = () => {
    return (
      <div className="w-full flex flex-col text-white align-center justify-evenly">
        <div className="text-center mt-5">
          <h1 className="text-2xl 2xl:text-3xl font-semibold text-white font-sans">
            Calorias totais:
          </h1>
          <h2 className="text-xl 2xl:text-2xl font-semibold italic text-white font-sans">
            {totalKcal} Kcal
          </h2>
        </div>
        <div className="w-full 2xl:w-5/6 2xl:m-auto 2xl:mt-10 flex text-white justify-between md:justify-around myprogress mt-5">
          <Progress
            percent={Math.ceil(carbKcal)}
            type="circle"
            strokeColor="#e63946"
            width={window.innerWidth < 650 ? 110 : 150}
            strokeWidth={10}
          />
          <Progress
            percent={Math.ceil(protKcal)}
            type="circle"
            strokeColor="#06d6a0"
            width={window.innerWidth < 650 ? 110 : 150}
            strokeWidth={10}
          />
          <Progress
            percent={Math.ceil(fatKcal)}
            type="circle"
            strokeColor="#fca311"
            width={window.innerWidth < 650 ? 110 : 150}
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
        <div className="glass-modal top-1/2 w-[98%] 2xl:w-11/12">
          <h1 className="m-auto text-center font-sans font-bold text-white text-xl lg:text-2xl 2xl:text-4xl bg-secondary rounded-full p-2 py-4 w-7/12 lg:w-1/3">
            VISÃO GERAL
          </h1>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {tmb[0] !== 0 ? <UserData></UserData> : <General></General>}
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
