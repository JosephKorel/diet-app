import "./App.css";
import Main from "./components/main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodSearch from "./components/food-search";
import BottomNav from "./material-components/bottom-nav";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<FoodSearch />} />
      </Routes>
      <BottomNav></BottomNav>
    </Router>
  );
}

export default App;
