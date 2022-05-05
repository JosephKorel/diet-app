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
import ListAltIcon from "@mui/icons-material/ListAlt";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../provider/auth";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const [preValue, setPreValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const { theme } = useAuth();

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
    <div className="w-full bottom-0 fixed lg:mb-5 md:mb-0">
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
      <div className="lg:w-2/3 md:w-full text-center m-auto bg-dark dark:bg-slate-100 lg:rounded-full md:rounded-none  lg:border-2 sm:border-t-2 border-white dark:border-stone-900">
        <BottomNavigation
          showLabels
          sx={{
            width: "full",
            margin: "auto",
            backgroundColor: `${theme == "light" ? "#1a1a1a" : "#f6f9f7"}`,
            borderRadius: "100%",
            "& .MuiBottomNavigationAction-root": {
              color: `${theme == "light" ? "white" : "#1a1a1a"}`,
            },
            "& .Mui-selected, .Mui-selected > svg": {
              color: "#00bfa5",
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
            icon={<ListAltIcon />}
            onClick={() => navigate("/")}
          />
          <BottomNavigationAction
            label="Visão geral"
            icon={<AnalyticsIcon />}
            onClick={() => setOpen(true)}
          />
          <BottomNavigationAction
            label="Consultar"
            icon={<SearchIcon />}
            onClick={() => navigate("/search")}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}
