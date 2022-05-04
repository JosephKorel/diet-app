import "./App.css";
import Main from "./components/main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodSearch from "./components/food-search";
import BottomNav from "./material-components/bottom-nav";
import { ThemeOptions, ThemeProvider, createMuiTheme } from "@material-ui/core";

const colors = createMuiTheme({
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
  },
});

function App() {
  return (
    <ThemeProvider theme={colors}>
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
