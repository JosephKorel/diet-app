import "./App.css";
import Main from "./components/main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodSearch from "./components/food-search";
import BottomNav from "./material-components/bottom-nav";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { red, green, blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#66ff66",
    },
    secondary: {
      main: "#f50057",
    },
    tertiary: {
      main: "white",
    },
    breakpoints: {
      mobile: 350,
      tablet: 768,
      laptop: 1024,
    },
  },
});

const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up("lg")]: {
      backgroundColor: green[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<FoodSearch />} />
        </Routes>
        <BottomNav></BottomNav>
      </Router>
    </ThemeProvider>
  );
}

export default App;
