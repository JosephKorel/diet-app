import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import { Tooltip } from "antd";

export function SexSelector({ sex, setSex }) {
  const handleChange = (event) => {
    setSex(event.target.value);
  };

  return (
    <Box sx={{ width: "150px" }}>
      <FormControl fullWidth>
        <InputLabel id="sex-selector">Sexo</InputLabel>
        <Select value={sex} label="Sex" onChange={handleChange}>
          <MenuItem value={"Masculino"}>Masculino</MenuItem>
          <MenuItem value={"Feminino"}>Feminino</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export function ActSelector({ act, setAct }) {
  const handleChange = (event) => {
    setAct(event.target.value);
  };

  return (
    <Box sx={{ width: "220px" }}>
      <FormControl fullWidth>
        <InputLabel id="activity">Nível de atividade física</InputLabel>
        <Select
          value={act}
          label="Nível de atividade física"
          onChange={handleChange}
        >
          <MenuItem value={1.2}>Sedentário</MenuItem>
          <MenuItem value={1.375}>Leve</MenuItem>
          <MenuItem value={1.55}>Moderado</MenuItem>
          <MenuItem value={1.725}>Alto</MenuItem>
          <MenuItem value={1.9}>Extremo</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export function ActivityPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <InfoIcon
        aria-describedby={id}
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      ></InfoIcon>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          <h1>Taxa de atividade</h1>
          <ul>
            <li>
              <span>Sedentário:</span> Pouca ou nenhuma atividade física
            </li>
            <li>
              <span>Leve:</span> Exercício leve de uma a três vezes na semana
            </li>
            <li>
              <span>Moderado:</span> Exercício moderado de três a cinco vezes na
              semana
            </li>
            <li>
              <span>Alto:</span> Exercício pesado de cinco a seis vezes na
              semana
            </li>
            <li>
              <span>Extremo:</span> Exercício pesado diariamente até mesmo duas
              vezes ao dia
            </li>
          </ul>
        </Typography>
      </Popover>
    </div>
  );
}

export function ObjectiveRadio({ setObjective }) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Objetivo</FormLabel>
      <RadioGroup aria-labelledby="demo-radio-buttons-group-label">
        <FormControlLabel
          value="emagrecimento"
          control={<Radio />}
          label="Emagrecimento"
          onClick={() => setObjective("emagrecimento")}
        />
        <FormControlLabel
          value="hipertrofia"
          control={<Radio />}
          label="Hipertrofia"
          onClick={() => setObjective("hipertrofia")}
        />
        <FormControlLabel
          value="manter"
          control={<Radio />}
          label="Manter peso"
          onClick={() => setObjective("manter")}
        />
      </RadioGroup>
    </FormControl>
  );
}

export function GenderRadio({ tmb, sex, setSex }) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Sexo</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        defaultValue={tmb[0] !== 0 ? sex : ""}
      >
        <FormControlLabel
          value="Masculino"
          control={<Radio />}
          label="Masculino"
          onClick={() => setSex("Masculino")}
        />
        <FormControlLabel
          value="Feminino"
          control={<Radio />}
          label="Feminino"
          onClick={() => setSex("Feminino")}
        />
      </RadioGroup>
    </FormControl>
  );
}

export function KcalProgress(props, tmb, totalKcal) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {totalKcal !== 0 ? (totalKcal / tmb[1]) * 100 : 0}%
        </Typography>
      </Box>
    </Box>
  );
}

KcalProgress.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function ThisKcal() {
  return <KcalProgress />;
}

export function ValuesPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <InfoIcon
        aria-describedby={id}
        onMouseEnter={handleClick}
        sx={{ cursor: "pointer" }}
      ></InfoIcon>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          Valores estimados utilizando o método Harris-Bennet
        </Typography>
      </Popover>
    </div>
  );
}

export function HelpPop() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <InfoIcon
        aria-describedby={id}
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      ></InfoIcon>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="w-8/12">
          <h1>Como utilizar?</h1>
          <p>
            Comece adicionando sua refeição e o horário, após isso adicione à
            refeição o alimento e a quantidade a ser consumida
          </p>
        </div>
      </Popover>
    </div>
  );
}
