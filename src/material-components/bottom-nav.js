import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Paper from "@mui/material/Paper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OverviewModal from "./overview-modal";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const [preValue, setPreValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  let navigate = useNavigate();
  return (
    <Box sx={{ width: 500 }}>
      {open === true ? (
        <OverviewModal
          setOpen={setOpen}
          open={open}
          setValue={setValue}
          preValue={preValue}
        ></OverviewModal>
      ) : (
        <div></div>
      )}
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "70%",
          margin: "auto",
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setPreValue(value);
            setValue(newValue);
            console.log(value);
            console.log(preValue);
          }}
        >
          <BottomNavigationAction
            label="Dieta"
            icon={<RestoreIcon />}
            onClick={() => navigate("/")}
          />
          <BottomNavigationAction
            label="Visão geral"
            icon={<FavoriteIcon />}
            onClick={() => setOpen(true)}
          />
          <BottomNavigationAction
            label="Consultar"
            icon={<LocationOnIcon />}
            onClick={() => navigate("/search")}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
