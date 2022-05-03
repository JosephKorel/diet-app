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

  const styles = {
    root: {
      color: "green",
    },
    selected: {
      color: "red",
    },
  };

  let navigate = useNavigate();
  return (
    <div className="w-full bottom-0 fixed mb-5 ">
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
      <div className="2xl:w-2/3 text-center m-auto bg-[#1a1a1a] border-2 border-white rounded-full bottomnav">
        <BottomNavigation
          showLabels
          sx={{
            width: "full",
            margin: "auto",
            backgroundColor: "#1a1a1a",
            borderRadius: "100%",
            "& .MuiBottomNavigationAction-root": {
              color: "white",
            },
            "& .Mui-selected, .Mui-selected > svg": {
              color: "#f50057",
            },
          }}
          value={value}
          onChange={(event, newValue) => {
            setPreValue(value);
            setValue(newValue);
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
      </div>
    </div>
  );
}
