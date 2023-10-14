import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function AssignTasks() {
  const [employeedetails, setEmployeeDetails] = useState([]);
  const [projectsdetails, setProjectsDetails] = useState([]);
  const m_id = localStorage.getItem('manager_id');
  const [invalid, setInvalid] = useState(true);
  const [taskdetails, setTaskDetails] = useState({
    task_id: "",
    task_name: "",
    descriptions: "",
    comments: "",
    start_date: "",
    end_date: "",
    task_status: "open",
    project_id: "",
    emp_id: "",
    manager_id: m_id
  });

  const GetEmployeeDetails = async () => {
    const m_id = localStorage.getItem('manager_id');
    axios.get(`http://127.0.0.1:5000/api/getemployees/${m_id}`)
      .then((response) => {
        setEmployeeDetails(response?.data);
      })
      .catch((error) => { console.error('Error:', error); });
  };

  const GetProjectsDetails = async () => {
    const m_id = localStorage.getItem('manager_id');
    axios.get(`http://127.0.0.1:5000/api/getprojects/${m_id}`)
      .then((response) => {
        setProjectsDetails(response?.data);
      })
      .catch((error) => { console.error('Error:', error); });
  };

  useEffect(() => {
    GetProjectsDetails();
    GetEmployeeDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(taskdetails.task_id)
    const response = await axios.get(`http://127.0.0.1:5000/api/task_id/${taskdetails.task_id}`);
    console.log(response.data)
    const { isAvailable } = response.data;
    if (isAvailable) {
      setInvalid('')
      await axios.post('http://127.0.0.1:5000/api/tasks/', taskdetails)
        .then((response) => {
          alert("Task Added Successfully");
          window.location.reload();
          setTaskDetails({
            task_id: "",
            task_name: "",
            descriptions: "",
            comments: "",
            start_date: "",
            end_date: "",
            task_status: "open",
            project_id: "",
            emp_id: "",
            manager_id: m_id
          })
        })
        .catch((error) => {
          console.error('Error Adding Task :', error);
        });
    }
    else {
      setInvalid('Task Id Unavailable')
    }
  }

  return (
    <div className='container-fluid p-4 w-100'>
      <h5>Add Tasks</h5>
      <div className='p-5 card ' style={{ backgroundColor: "antiquewhite" }}>
        <form onSubmit={handleSubmit}>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label className='form-label'>Task Name</label>
              <input type='text' className='form-control form-control-sm'
                onChange={(e) => setTaskDetails({ ...taskdetails, task_name: e.target.value })} />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Task Id</label>
              <input type='text' className='form-control form-control-sm'
                onChange={(e) => setTaskDetails({ ...taskdetails, task_id: e.target.value })} />
              {invalid !== true && <p className="text-danger text-center">{invalid}</p>}
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-12'>
              <label className='form-label'>Task Description</label>
              <textarea type='text' className='form-control form-control-sm'
                onChange={(e) => setTaskDetails({ ...taskdetails, descriptions: e.target.value })}>
              </textarea>
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label className='form-label '>Start Date</label>
              <input type='date' className='form-control form-control-sm'
                onChange={(e) => setTaskDetails({ ...taskdetails, start_date: e.target.value })} />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>End Date</label>
              <input type='date' className='form-control form-control-sm'
                onChange={(e) => setTaskDetails({ ...taskdetails, end_date: e.target.value })} />
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label className='form-label '>Project</label>
              <Form.Select size='sm' aria-label="Default select example" required value={taskdetails.project_id}
                onChange={(e) => setTaskDetails({ ...taskdetails, project_id: e.target.value })}>
                <option value="">Select Project</option>
                {projectsdetails.map((item, index) => (
                  <option value={item.project_id} key={index}>{item.project_id}&nbsp;{item.project_name}</option>
                ))}
              </Form.Select>
            </div>

            <div className='col-md-6'>
              <label className='form-label '>Assigned To</label>
              <Form.Select size='sm' aria-label="Default select example" required value={taskdetails.emp_id}
                onChange={(e) => setTaskDetails({ ...taskdetails, emp_id: e.target.value })} >
                <option value="">Select Employee</option>
                {employeedetails.map((item, index) => (
                  <option value={item.emp_id} key={index}>
                    {item.emp_id}&nbsp;{item.empname}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-12'>
              <label className='form-label'>Comments</label>
              <textarea type='text' className='form-control form-control-sm'
                onChange={(e) => setTaskDetails({ ...taskdetails, comments: e.target.value })}></textarea>
            </div>
          </div>

          <div className='text-start'>
            <button className='btn btn-primary w-25'>Add Task</button>
          </div>

        </form>
      </div >

    </div >
  )
}

export default AssignTasks