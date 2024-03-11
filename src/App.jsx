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
import AdminRentalCarView from "./Components/Admin/Pages/CarRentalCards/AdminRentalCarView";
import Payment from "./Components/Admin/Pages/Payments/Payment";
import RentalCarPayment from "./Components/Users/Pages/RentalCarPayment/RentalCarPayment";
import ForUsedCars from "./Components/Users/Pages/DashBoardForUsedCars/ForUsedCars";
import UsedCarsPayement from "./Components/Users/Pages/DashBoardForUsedCars/UsedCarsPayment/UsedCarsPayement";
import UsedCarsPayment from "./Components/Admin/Pages/Payments/UsedCarsPayment";
import UsedCarPayment from "./Components/Users/Pages/UsedCarPayment/UsedCarPayment";

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
        <Route path="/userRentalPayment" element={<RentalCarPayment/>}/>
        <Route path="/" element={<UserDashboard/>}/>
        <Route path="/UsedCar/userPayment" element={<UsedCarPayment/>}/>
        <Route path="/UsedCars" element={<ForUsedCars/>}/>
        <Route path="/UsedCars/Payment/:id" element={<UsedCarsPayement/>}/>
        <Route path='/userRentalPayment/:id' element={<PaymentUserRental/>}/>

        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/AddCar" element={<AddCarForm/>}/>
        <Route path='/adminDashboard/viewCar/:id' element={<AdminRentalCarView/>}/>
        <Route path="/adminDashboard/payments" element={<Payment/>}/>
        <Route path="/adminDashboard/usedcarpayments" element={<UsedCarsPayment/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
