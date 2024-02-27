import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './Components/Pages/Auth/LoginFrom';
import Login from './Components/Admin/Login';
import AdminDashboard from './Components/Admin/AdminDashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/login/admin' element={<Login/>}/>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
