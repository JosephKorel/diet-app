import { Paper } from "@mui/material";
import React from "react";

const FoodFact = ({
  carb,
  protein,
  fat,
  iron,
  magnesium,
  potassium,
  zinc,
  sodium,
  calcium,
}) => {
  const macro = ["Carboidrato", "Proteína", "Gordura"];
  const macroValue = carb !== "NA" ? [carb, protein, fat] : [0, protein, fat];
  const maxMacro = macroValue.reduce((total, item) => {
    return Math.max(total, item);
  }, 0);
  const macroIndex = macroValue.indexOf(maxMacro);

  const mineralValue = [iron, magnesium, potassium, sodium, calcium, zinc];
  const mineral = ["Ferro", "Magnésio", "Potássio", "Sódio", "Cálcio", "Zinco"];
  const newValues = [];
  for (let i = 0; i < mineralValue.length; i++) {
    mineralValue[i] == "Tr"
      ? newValues.push(0)
      : newValues.push(mineralValue[i]);
  }
  const maxMineral = newValues.reduce((total, item) => {
    return Math.max(total, item);
  }, 0);
  const mineralIndex = newValues.indexOf(maxMineral);

  const carbFact =
    "Ao contrário da crença popular, carboidratos não engordam. Na verdade, os carboidratos são fonte de energia e são indispensáveis para um bom rendimento na prática de esportes de alta intensidade. ";
  const protFact =
    "As proteínas são as responsáveis pelo desenvolvimento e manuntenção dos órgãos e tecidos. Por serem responsáveis pelo reparo do tecido muscular, as proteínas são um macronutriente essencial para praticantes de musculação, os mesmos devem ter uma alta ingestão de proteínas diariamente. ";
  const fatFact =
    "Apesar de ser vista como vilã, a gordura também é parte essencial da dieta, pois desempenha importante papel na produção de hormônios e o transporte de algumas vitaminas. Como a gordura é o macronutriente mais calórico, seu consumo deve ser mais limitado em relação às proteínas e carboidratos.";

  const macroFacts = [carbFact, protFact, fatFact];

  const ironFact = (
    <div>
      <p>
        Essencial para o funcionamento do organismo, sendo uma de suas
        principais funções o transporte de oxigênio para os demais órgãos. A
        carência de ferro é uma das carências mais comuns do mundo, podendo
        resultar em anemia.
      </p>
      <p>
        <span className="text-lg font-bold">Fontes:</span> Feijão, fígado de
        boi, fígado de frango, pitaia.
      </p>
    </div>
  );

  const magFact = (
    <div>
      <p>
        Um dos principais micronutrientes dentro das células. No músculo, é
        responsável pela contração e relaxamento, pressão sanguínea, comunicação
        com o sistema nervoso, entre outros. Alguns sintomas típicos de carência
        são anorexia, letargia e fraqueza.{" "}
      </p>
      <p>
        <span className="text-lg font-bold">Fontes:</span> Feijão, soja, semente
        de chia, peito de frango, banana.
      </p>
    </div>
  );

  const potFact = (
    <div>
      <p>
        É o mineral em maior quantidade na célula, sendo assim, é responsável
        pelo bom funcionamento da mesma. A carência grave de potássio está
        associada com o aumento da pressão arterial, aumentando o risco de
        doenças cardiovasculares.
      </p>
      <p>
        <span className="text-lg font-bold">Fontes:</span> Feijão, quinoa,
        pistache, leite de vaca desnatado.
      </p>
    </div>
  );

  const sodiumFact = (
    <div>
      <p>
        É responsável pela manuntenção da pressão sanguínea. 40% do sal de
        cozinha é composto de sódio, portanto é a fonte mais comum na
        alimentação. Por ser facilmente encontrado, a carência de sódio é rara,
        mas pode ocorrer em indivíduo que suam muito, como trabalhadores braçais
        ou atletas em ambientes quentes. Já o excesso pode levar ao aumento da
        pressão arterial e assim levando ao desenvolvimento de doenças
        cardiovasculares.
      </p>
      <p>
        <span className="text-lg font-bold">Fontes:</span> Semente de chia,
        clara do ovo de galinha, morango, feijão.
      </p>
    </div>
  );

  const calcFact = (
    <div>
      <p>
        É o mineral mais abundante no organismo, representando de 1 a 2% do peso
        corporal. Possui funções estruturais e funcionais, como o
        desenvolvimento e manuntenção do esqueleto e fortalecimento dos ossos e
        dentes. Na verdade, 99% do cálcio é encontrado nos ossos e dentes. A
        carência leva ao raquitismo e osteomalácia.
      </p>
      <p>
        <span className="text-lg font-bold">Fontes:</span> Lambari, leite de
        vaca desnatado, soja, feijão, semente de chia.
      </p>
    </div>
  );

  const zincFact = (
    <div>
      <p>
        Desempenha funções catalíticas, quebra de moléculas, assim acelerando a
        reação. Além disso também está envolvido em uma série de processos, que
        vão desde síntese do DNA até a cicatrização de feridas. A carência pode
        levar a anorexia, perda de paladar, alopecia, entre outros.
      </p>
      <p>
        <span className="text-lg font-bold">Fontes:</span> Ostra, acém bovino,
        grão-de-bico, ovo de galinha, semente de chia.
      </p>
    </div>
  );

  const mineralFacts = [
    ironFact,
    magFact,
    potFact,
    sodiumFact,
    calcFact,
    zincFact,
  ];

  return (
    <div className="w-full lg:w-1/3 mt-2 mb-16">
      <Paper elevation={12}>
        <div className="w-full p-3">
          <h1 className="text-lg font-sans font-normal text-stone-800">
            Macronutriente mais abundante:
          </h1>
          <p className="text-xl font-sans font-bold leading-3">
            {macro[macroIndex]}
          </p>
          <p className="text-base text-justify">{macroFacts[macroIndex]}</p>
        </div>
      </Paper>
      <Paper elevation={12}>
        <div className="w-full p-5 mt-2">
          <h1 className="text-lg font-sans font-normal text-stone-800">
            Mineral mais abundante:{" "}
          </h1>
          <p className="text-xl font-sans font-bold leading-3">
            {mineral[mineralIndex]}
          </p>
          <p className="text-base text-justify">{mineralFacts[mineralIndex]}</p>
        </div>
      </Paper>
    </div>
  );
};

export default FoodFact;
