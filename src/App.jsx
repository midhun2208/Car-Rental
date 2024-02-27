import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./Components/Pages/Auth/LoginFrom";
import Login from "./Components/Admin/Pages/Login/Login";
import AdminDashboard from "./Components/Admin/Pages/AdminDashboard/AdminDashboard";
import AddCarForm from "./Components/Admin/Pages/AddCars/AddCarForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/admin" element={<Login />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/AddCar" element={<AddCarForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
