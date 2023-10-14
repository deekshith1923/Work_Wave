import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import AddProject from './AddProject';
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";

function ProjectDetails() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [projectdetails, setProjectsDetails] = useState([])

  const ProjectsDetails = () => {
    const m_id = localStorage.getItem('manager_id');
    axios.get(`http://127.0.0.1:5000/api/getprojects/${m_id}`)
      .then((response) => setProjectsDetails(response.data));
  }


  useEffect(() => {
    ProjectsDetails()
  }, [])

  const DeleteProject = async (Id) => {
    try {
      const confirm = window.confirm("Are You Sure?")
      if (confirm) {
        const response = await axios.delete(`  http://127.0.0.1:5000/api/deleteprojects/${Id}`);
        console.log(`Project with ID ${Id} deleted successfully`);
        ProjectsDetails()
      }
    } catch (error) {
      console.error(`Error deleting resource with ID ${Id}:`, error);
    }
  }


  return (
    <div className='container-fluid p-4 w-100'>
      <div className='d-flex justify-content-between'>
        <h5>Project Details</h5>
        <button className='btn btn-outline-primary btn-sm shadow-none' onClick={handleShow}><IoIosAddCircleOutline />&nbsp;Add Project</button>
      </div>

      {projectdetails.length > 0 ?
        (<div className='table-container p-5'>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Project Id</th>
                <th>Project Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Project Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {
                projectdetails.map((item, index) => (
                  <tr style={{ lineHeight: "40px" }}>
                    <td>{index + 1}</td>
                    <td>{item.project_id}</td>
                    <td>{item.project_name}</td>
                    <td>{new Date(item.start_date).toLocaleDateString('en-US')}</td>
                    <td>{new Date(item.end_date).toLocaleDateString('en-US')}</td>
                    <td>{item.projects_status}</td>
                    <td>
                      <button className='btn btn-outline-danger btn-sm shadow-none w-100' onClick={() => DeleteProject(item.project_id)}><RiDeleteBinLine /></button>
                    </td>
                  </tr>))}

            </tbody>
          </Table>
        </div>) : (<p className='text-center text-danger p-5'>No Data Available</p>)}

      <AddProject show={show} setShow={setShow} />
    </div>
  )
}

export default ProjectDetails