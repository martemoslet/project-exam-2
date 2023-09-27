import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import VenuePage from "./pages/venue/VenuePage";
import Register from "./pages/register/RegisterPage";
import Login from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AddVenue from "./pages/venue/AddVenuePage";
import UpdateVenue from "./pages/venue/UpdateVenuePage";
import OwnerProfile from "./pages/profile/OwnerProfile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="VenuePage/:id" element={<VenuePage />} />
        <Route path="RegisterPage" element={<Register />} />
        <Route path="LoginPage" element={<Login />} />
        <Route path="profilePage/:name" element={<ProfilePage />} />
        <Route path="addVenuePage" element={<AddVenue />} />
        <Route path="updateVenuePage/:id" element={<UpdateVenue />} />
        <Route path="ownerProfile/:name" element={<OwnerProfile />} />
      </Route>
    </Routes>
  );
}
