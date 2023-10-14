import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Register from "./Home/Register";
import Login from "./Home/Login";
import ManagerMain from "./Components/Managers/ManagerMain";
import EmployeeMain from "./Components/Employees/EmployeeMain";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manager/dashboard" element={<ManagerMain />} />
          <Route path="/employee/dashboard" element={<EmployeeMain />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
