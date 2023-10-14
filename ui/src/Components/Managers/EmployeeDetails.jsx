import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
function EmployeeDetails() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [employeedetails, setEmployeeDetails] = useState([])

  const EmployeeDetails = () => {
    const m_id = localStorage.getItem('manager_id');
    axios.get(` http://127.0.0.1:5000/api/getemployees/${m_id}`)
      .then((response) => setEmployeeDetails(response?.data));
  }

  useEffect(() => {
    EmployeeDetails()
  }, [])

  const DeleteEmployee = async (Id) => {
    try {
      const confirm = window.confirm("Are You Sure?")
      if (confirm) {
        const response = await axios.delete(`  http://127.0.0.1:5000/api/deleteemployee/${Id}`);
        console.log(`Employee with ID ${Id} deleted successfully`);
        EmployeeDetails()
      }
    } catch (error) {
      console.error(`Error deleting Employee with ID ${Id}:`, error);
    }
  }

  return (
    <div className='container-fluid p-4 w-100'>
      <div className='d-flex justify-content-between'>
        <h5>Employee Details</h5>
      </div>
      <div className='table-container p-5'>
        {employeedetails.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Employee Id</th>
                <th>Employee Name</th>
                <th>Designation</th>
                <th>Manager</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeedetails.map((item, index) => (
                <tr style={{ lineHeight: "40px" }}>
                  <td>{index + 1}</td>
                  <td>{item.emp_id}</td>
                  <td>{item.empname}</td>
                  <td>{item.designation}</td>
                  <td>{item.manager_id}</td>
                  <td>
                    <button className='btn btn-outline-danger btn-sm shadow-none w-75' onClick={() => DeleteEmployee(item.emp_id)}><RiDeleteBinLine /></button>
                  </td>
                </tr>))}
            </tbody>
          </Table>
        ) : (<p className='text-center text-danger p-5'>No Data Available</p>)}

      </div>
    </div>
  )
}

export default EmployeeDetails