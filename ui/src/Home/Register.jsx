import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import reglog from "../Images/Home1.png";
import { AiTwotoneHome } from "react-icons/ai";
import Validation from "./Validation";

export default function Register() {
    const [role, setRole] = useState('');
    const [errors, setError] = useState({});
    const [idavailable, setIdavailable] = useState(true);
    const [emailavailable, setEmailavailable] = useState(true);
    const [managerAvailable, setManagervailable] = useState(true);
    const [data, setData] = useState({
        emp_name: "",
        emp_id: "",
        email: "",
        password: "",
        designation: "",
        manager_id: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = Validation(data);
        setError(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                let response;
                if (role === "manager") {
                    const idavailableResponse = await axios.get(`http://127.0.0.1:5000/api/manager_id/${data.emp_id}`);
                    if (idavailableResponse.data.isAvailable) {
                        setIdavailable('');
                        const emailavailableResponse = await axios.get(`http://127.0.0.1:5000/api/manager_email/${data.email}`);
                        if (emailavailableResponse.data.isEmailAvailable) {
                            setEmailavailable(true);
                            response = await axios.post("http://127.0.0.1:5000/api/register/manager", data);
                        } else {
                            setEmailavailable("Email Already Exists");
                        }
                    } else {
                        setIdavailable('Employee ID Already Exists');
                    }
                } else if (role === "employee") {
                    const idavailableResponse = await axios.get(`http://127.0.0.1:5000/api/employee_id/${data.emp_id}`);
                    if (idavailableResponse.data.isAvailable) {
                        setIdavailable('');
                        const emailavailableResponse = await axios.get(`http://127.0.0.1:5000/api/employee_email/${data.email}`);
                        if (emailavailableResponse.data.isEmailAvailable) {
                            setEmailavailable(true);
                            const managerpresence = await axios.get(`http://127.0.0.1:5000/api/emp_manager/${data.manager_id}`);
                            if (!managerpresence.data.ManagerExcist) {
                                setManagervailable(true);
                                response = await axios.post("http://127.0.0.1:5000/api/register/employee", data);
                            }
                            else {
                                setManagervailable("Manager Id Not Present")
                            }
                        } else {
                            setEmailavailable("Email Already Exists");
                        }
                    } else {
                        setIdavailable('Employee ID Already Exists');
                    }
                }
                if (response && response.status === 200) {
                    alert("Registration Successful");
                    window.location.reload();
                } else {
                    console.error("Registration failed");
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        }
    };

    const handleSelectChange = (e) => {
        setRole(e.target.value);
    };

    return (
        <div className="container-fluid" style={{ backgroundColor: "antiquewhite" }}>
            <div className="row mw-100 vh-100">
                <div className="col-md-7 h-100">
                    <img src={reglog} height={'100%'} width={'100%'} alt="Logo" />
                </div>

                <div className="col-md-5 h-100" style={{ backgroundColor: "antiquewhite" }}>
                    <div className="d-flex justify-content-end mt-2">
                        <Link to={'/'}><AiTwotoneHome size={"40px"} className="text-danger" /></Link>
                    </div>
                    <div>
                        <h5 className="text-center fw-bold fs-2 text-danger"style={{fontFamily:"Oswald"}}><strong>W</strong><span className="text-primary">ork <strong>W</strong>ave</span></h5>
                    </div>

                    <form className="d-flex justify-content-center  w-100 p-4 pt-0 ps-0 pe-0" onSubmit={handleSubmit}>
                        <div className="w-75">
                            <h5 className="text-danger text-center">Register</h5>

                            <div className='mb-2'>
                                <Form.Select size="sm" className="form-control border-0 border-bottom rounded-0 shadow-none" required onChange={handleSelectChange}>
                                    <option value={""}>User Type</option>
                                    <option value={"manager"}>Manager</option>
                                    <option value={"employee"}>Employee</option>
                                </Form.Select>
                            </div>

                            <div className='mb-2'>
                                <input type="text" className="form-control form-control-sm border-0 border-bottom rounded-0 shadow-none" required
                                    onChange={(e) => setData({ ...data, emp_name: e.target.value })} placeholder="Name" />
                            </div>

                            <div className='mb-2'>
                                <input type="text" className="form-control form-control-sm border-0 border-bottom  rounded-0 shadow-none" required
                                    onChange={(e) => setData({ ...data, emp_id: e.target.value })} placeholder="Employee Id" />
                                {idavailable !== true  && <p className="text-danger text-center">{idavailable}</p>}
                            </div>

                            <div className='mb-2'>
                                <input type="email" className="form-control form-control-sm border-0 border-bottom rounded-0 shadow-none" required
                                    onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" />
                                {errors.email && <p className="text-danger text-center">{errors.email}</p>}
                                {emailavailable !== true && <p className="text-danger text-center">{emailavailable}</p>}
                            </div>

                            <div className='mb-2'>
                                <input type="password" className="form-control form-control-sm border-0 border-bottom  rounded-0 shadow-none" required
                                    onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Password" />
                                {errors.password && <p className="text-danger text-center">{errors.password}</p>}
                            </div>

                            <div className='mb-2'>
                                <input type="text" className="form-control form-control-sm border-0 border-bottom rounded-0 shadow-none" required
                                    onChange={(e) => setData({ ...data, designation: e.target.value })} placeholder="Designation" />
                            </div>

                            {role === "employee" && (
                                <div className='mb-2'>
                                    <input type="text" className="form-control form-control-sm border-0 border-bottom  rounded-0 shadow-none" required
                                        onChange={(e) => setData({ ...data, manager_id: e.target.value })} placeholder="Manager Id" />
                                    {managerAvailable !== true && <p className="text-danger text-center">{managerAvailable}</p>}
                                </div>
                            )}

                            <div className="text-center mb-2">
                                <button type="submit" className="btn btn-primary btn-sm w-100">Sign Up</button>
                            </div>

                            <div className="mb-2 text-center">
                                <span>Already have an account?</span>
                            </div>

                            <div className="text-center">
                                <Link to="/login" className="btn btn-sm bg-light border w-100">Sign In</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
