import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Paper from "@mui/material/Paper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OverviewModal from "./overview-modal";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ width: 500 }}>
      {open === true ? (
        <OverviewModal
          setOpen={setOpen}
          open={open}
          setValue={setValue}
        ></OverviewModal>
      ) : (
        <div></div>
      )}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(newValue);
          }}
        >
          <BottomNavigationAction label="Dieta" icon={<RestoreIcon />} />
          <BottomNavigationAction
            label="Visão geral"
            icon={<FavoriteIcon />}
            onClick={() => setOpen(true)}
          />
          <BottomNavigationAction label="Consultar" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
