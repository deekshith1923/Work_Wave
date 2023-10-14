import React, { useState, useEffect } from 'react';
import axios from "axios";

function TaskDetails() {
  const [taskdetails, setTaskDetails] = useState([])

  const TaskDetails = () => {
    const m_id = localStorage.getItem('manager_id');
    axios.get(`http://127.0.0.1:5000/api/gettasksadded/${m_id}`)
      .then((response) => setTaskDetails(response.data));
  }

  useEffect(() => {
    TaskDetails()
  }, [])

  const DeleteTask = async (Id) => {
    try {
      const confirm = window.confirm("Are You Sure?")
      if (confirm) {
        const response = await axios.delete(`  http://127.0.0.1:5000/api/deletetask/${Id}`);
        console.log(`Task with ID ${Id} deleted successfully`);
        TaskDetails()
      }
    } catch (error) {
      console.error(`Error deleting Task with ID ${Id}:`, error);
    }
  }

  return (
    <div className='container-fluid p-4 w-100'>
      <h5>Task Added</h5>
      {taskdetails.length > 0 ? (
        <div>
          {taskdetails.map((task) =>
          (
            <div className='pb-3'>
              <div className='card border-primary p-2 rounded-1 shadow' style={{ backgroundColor: "aliceblue" }}>
                <div className='card-header d-flex justify-content-between'>
                  <div>
                    <strong> Prject Name:&nbsp;</strong>{task.project_name}&nbsp;
                  </div>
                  <span> <strong>Status:&nbsp;</strong>{task.task_status}</span>
                  <span> <strong>Complete:&nbsp;</strong>{task.completed}%</span>
                  <span className='float-end'><strong>Assigned To:&nbsp;</strong>{"Mohan"}</span>
                </div>

                <div className='card-body'>
                  <h5><strong>Task:&nbsp;</strong>{task.task_name}
                    <span className='float-end fw-normal fs-6'>Added:&nbsp;{new Date(task.added_date).toLocaleDateString('en-US')}</span></h5>
                  <h5 className='card-title text-primary fw-normal fs-5'>{task.descriptions}</h5>
                  <span className='float-end pt-3'>
                    <a className='btn btn-sm btn-outline-danger m-1' type='button' onClick={() => DeleteTask(task.task_id)}>Delete Task</a>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>) : (<p className='text-center text-danger p-5'>No Data Available</p>)}

    </div>
  )
}

export default TaskDetails