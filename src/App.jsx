import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./Components/Users/Pages/Auth/LoginFrom";
import Login from "./Components/Admin/Pages/Login/Login";
import AdminDashboard from "./Components/Admin/Pages/AdminDashboard/AdminDashboard";
import AddCarForm from "./Components/Admin/Pages/AddCars/AddCarForm";
import ShowNavBar from "./Components/Admin/AdminCommon/AdminNavBar";
import AdminHeader from "./Components/Admin/AdminCommon/AdminHeader";
import Header from "./Components/Users/Common/Header";
import ShowNavBarLogin from "./Components/Users/Common/UserNavBar";
import UserDashboard from "./Components/Users/Pages/UserDashboard/UserDashboard";

function App() {
  return (
    <div className="App">
      <ShowNavBar>
        <AdminHeader/>
      </ShowNavBar>
      <ShowNavBarLogin>
      <Header/>
      </ShowNavBarLogin>
      
      
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/admin" element={<Login />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/AddCar" element={<AddCarForm/>}/>
        <Route path="/" element={<UserDashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
