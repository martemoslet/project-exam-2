import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import VenuePage from "./pages/venue/VenuePage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="VenuePage/:id" element={<VenuePage />} />
      </Route>
    </Routes>
  );
}
