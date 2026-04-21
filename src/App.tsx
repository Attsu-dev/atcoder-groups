import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Group from "./Group";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:gistId" element={<Group />} />
      </Routes>
    </BrowserRouter>
  );
}
