import React, { useState, useEffect } from 'react';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function TaskAssigned() {
    const [taskdetails, setTaskDetails] = useState([])
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const m_id = localStorage.getItem('manager_id');
    const emp_id = localStorage.getItem('emp_id');
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);
    const [taskupdate, setTaskUpdate] = useState({
        task_status: "Open",
        completed: '0',
        task_id: ''
    })
    const [commentsdetails, setCommentsDetails] = useState({
        project_id: "",
        task_id: "",
        manager_id: m_id,
        comments: "",
        emp_id: emp_id
    })

    const TaskDetails = () => {
        const emp_id = localStorage.getItem('emp_id');
        axios.get(`http://127.0.0.1:5000/api/gettasks/${emp_id}`)
            .then((response) => setTaskDetails(response.data));
    }

    useEffect(() => {
        TaskDetails()
    }, [])

    const UpdateStatus = async (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:5000/api/updatetask/${taskupdate.task_id}`, taskupdate)
            .then((response) => {
                TaskDetails()
                handleClose();
                alert("Task Updated Successfully")
            })
            .catch((error) => {
                console.error('Error updating Task status:', error);
            });
    };

    const AddComments = async (e) => {
        e.preventDefault();
        console.log(commentsdetails)
        await axios.post('http://127.0.0.1:5000/api/comments/', commentsdetails)
            .then((response) => {
                alert("Comments Added Successfully");
                handleClose1();
            })
            .catch((error) => {
                console.error('Error Adding Projec:', error);
            });
    }

    return (<>
        <div className='container-fluid p-4 w-100'>
            <h5>Task Assingned</h5>
            {taskdetails.length > 0 ? (
                <div>
                    {taskdetails.map((task) =>
                    (
                        <div className='pb-3'>
                            <div className='card border-primary p-2 rounded-1 shadow' style={{ backgroundColor: "aliceblue" }}>
                                <div className='card-header d-flex justify-content-between'>
                                    <div>
                                        <strong> Task:&nbsp;</strong>{task.task_name}
                                    </div>
                                    <span> <strong>Status:&nbsp;</strong>{task.task_status}</span>
                                    <span> <strong>Completed:&nbsp;</strong>{task.completed}%</span>
                                    <span className='float-end'><strong>Assigned By:&nbsp;</strong>{task.manager_name}</span>
                                </div>

                                <div className='card-body'>
                                    <h5 className='fs-6 fw-normal'> Prject Name:&nbsp;{task.project_name}</h5>
                                    <h5 className='fs-6 fw-normal'>
                                        <span className='float-end fw-normal fs-6'>{new Date(task.start_date).toLocaleDateString('en-US')}&nbsp;to&nbsp;{new Date(task.end_date).toLocaleDateString('en-US')}</span></h5>
                                    <h5 className='card-title text-primary fw-normal fs-5'>{task.descriptions}</h5>
                                    <span className='d-flex justify-content-between pt-3'>
                                        <span>Comment:&nbsp;{task.comments}</span>
                                        <div>
                                            <a className='btn btn-sm btn-outline-primary m-1' type='button' onClick={() => { handleShow(); setTaskUpdate({ ...taskupdate, task_id: task.task_id }) }}>Update Work</a>
                                            <a className='btn btn-sm btn-outline-primary m-1' type='button' onClick={() => {
                                                handleShow1();
                                                setCommentsDetails({
                                                    ...commentsdetails,
                                                    project_id: task.project_id,
                                                    task_id: task.task_id,
                                                    manager_id: task.manager_id
                                                });
                                            }}>Comment</a>
                                        </div>
                                    </span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            ) : (<p className='text-center text-danger p-5'>No Data Available</p>)}

        </div>

        <Modal show={show} onHide={handleClose} centered >
            <Modal.Header closeButton>
                <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='p-3' onSubmit={UpdateStatus}>
                    <div className='row mb-3'>
                        <div className='col-md-12'>
                            <label className='form-label'>Task Status</label>
                            <Form.Select size='sm' aria-label="Default select example"
                                required value={taskupdate.task_status} onChange={(e) => setTaskUpdate({ ...taskupdate, task_status: e.target.value })}>
                                <option value="">Project Status</option>
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="closed">Closed</option>
                            </Form.Select>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-md-12'>
                            <label className='form-label'>Completion Percentage</label>
                            <input type='number' className='form-control form-control-sm' min={0} max={100}
                                required onChange={(e) => setTaskUpdate({ ...taskupdate, completed: e.target.value })} />
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-outline-primary btn-sm' type='submit'>Update</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>

        <Modal show={show1} onHide={handleClose1} centered >
            <Modal.Header closeButton>
                <Modal.Title>Add Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='p-2' onSubmit={AddComments}>
                    <div className='row mb-4'>
                        <div className='col-md-12'>
                            <label className='form-label'>Enter Comments</label>
                            <textarea type='text' className='form-control form-control-sm'
                                onChange={(e) => setCommentsDetails({ ...commentsdetails, comments: e.target.value })} ></textarea>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-sm btn-outline-primary w-25' type='submit'>Add</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal >
    </>
    )
}

export default TaskAssigned