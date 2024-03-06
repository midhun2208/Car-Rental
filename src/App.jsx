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
import PaymentUserRental from "./Components/Users/Pages/PaymentUserRental/PaymentUserRental";
import AdminRentalCarView from "./Components/Admin/Pages/CarCards/AdminRentalCarView";

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
        <Route path='/userRentalPayment/:id' element={<PaymentUserRental/>}/>
        <Route path='/adminDashboard/viewCar/:id' element={<AdminRentalCarView/>}/>
      </Routes>
    </div>
  );
}

export default App;
