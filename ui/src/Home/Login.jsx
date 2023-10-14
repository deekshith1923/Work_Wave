import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import reglog from "../Images/Home1.png";
import { AiTwotoneHome } from "react-icons/ai";
import Validation from "./Validation";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("manager");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setError] = useState({});
  const [invalid, setInvalid] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    if (role === "manager") {
      try {
        const validationErrors = Validation(data);
        setError(validationErrors);
        const response = await axios.get(`http://127.0.0.1:5000/api/managerlogin/${data.email}/${data.password}`);
        console.log(response)
        if (response.status === 200) {
          setInvalid('')
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('empname', response.data.empname);
          localStorage.setItem('manager_id', response.data.manager_id);
          navigate("/manager/dashboard");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            if (error.response.data.error === 'User not found') {
              setInvalid('User not found');
            } else if (error.response.data.error === 'Incorrect password') {
              setInvalid('Incorrect password');
            }
          } else {
            setInvalid('Internal server error');
          }
        } else if (error.request) {
          setInvalid('Network error');
        } else {
          setInvalid('Error: ' + error.message);
        }
      }
    }

    else {
      try {
        const validationErrors = Validation(data);
        setError(validationErrors);
        const response = await axios.get(`http://127.0.0.1:5000/api/emplogin/${data.email}/${data.password}`);
        console.log(response)
        if (response.status === 200) {
          setInvalid('')
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('empname', response.data.empname);
          localStorage.setItem('manager_id', response.data.manager_id);
          localStorage.setItem('emp_id', response.data.emp_id);
          navigate("/employee/dashboard")
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            if (error.response.data.error === 'User not found') {
              setInvalid('User not found');
            } else if (error.response.data.error === 'Incorrect password') {
              setInvalid('Incorrect password');
            }
          } else {
            setInvalid('Internal server error');
          }
        } else if (error.request) {
          setInvalid('Network error');
        } else {
          setInvalid('Error: ' + error.message);
        }
      }
    }
  }

  const handleSelectChange = (e) => {
    setRole(e.target.value);
  }

  return (
    < div className="continer-fluid" style={{ backgroundColor: "antiquewhite" }}>
      <div className="row mw-100 vh-100" >
        <div className="col-md-7 h-100">
          <img src={reglog} height={'100%'} width={'100%'} alt="Logo" />
        </div>

        <div className="col-md-5 h-100" style={{ backgroundColor: "antiquewhite" }}>
          <div className="d-flex justify-content-end mt-2">
            <Link to={'/'}><AiTwotoneHome size={"40px"} className="text-danger" /></Link>
          </div>

          <div className="mt-4">
            <h5 className="text-center fw-bold fs-2 text-danger" style={{fontFamily:"Oswald"}}><strong>W</strong><span className="text-primary">ork <strong>W</strong>ave</span></h5>
          </div>
          <h5 className="text-danger mb-5 text-center">Login</h5>

          <form className="d-flex justify-content-center align-item-center mt-4 w-100" onSubmit={handleLogin}>
            <div className="w-100">

              <div className='mb-3 mx-auto  w-75'>
                <Form.Select size="sm" className="form-control  border-0 border-bottom rounded-0 shadow-none" required
                  onChange={handleSelectChange}>
                  <option value={""}>User Type</option>
                  <option value={"manager"}>Manager</option>
                  <option value={"employee"}>Employee</option>
                </Form.Select>
              </div>

              <div className="mx-auto w-75 mb-3">
                <input type="email" className="form-control form-control-sm border-0 border-bottom rounded-0 shadow-none" autoComplete="off" required
                  onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" />
                {errors.email && <p className="text-danger text-center">{errors.email}</p>}
              </div>
              <div className="mx-auto w-75 mb-2">
                <input type="password" className="form-control form-control-sm border-0 border-bottom  rounded-0 shadow-none" required
                  onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Password" />
                {errors.password && <p className="text-danger text-center">{errors.password}</p>}
              </div>

              {invalid && <p className="text-danger text-center">{invalid}</p>}

              <div className="text-center mb-2">
                <button type="submit" className="btn btn-primary btn-sm w-75">Sign In</button>
              </div>
              <div className="mb-2 text-center">
                <span>Don't have an account?</span>
              </div>
              <div className="text-center">
                <Link to="/register" className="btn btn-sm bg-light border w-75">Sign Up</Link>
              </div>
            </div>

          </form>
        </div>
      </div>

    </ div>

  );
}

