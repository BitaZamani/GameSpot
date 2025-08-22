import { BrowserRouter, Route, Routes } from "react-router-dom";

import B048Board from "./games/2048/B048Board";
import MineSweeperBoard from "./games/MineSweeper/MineSweeperBoard";

import HomePage from "./HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/2048" element={<B048Board />} />
        <Route path="/MineSweeper" element={<MineSweeperBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
