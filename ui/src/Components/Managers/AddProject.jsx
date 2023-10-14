import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';

function AddProject({ show, setShow }) {
    const handleClose = () => setShow(false);
    const [invalid, setInvalid] = useState(true);
    const m_id = localStorage.getItem('manager_id');
    const [projectdetails, setProjectsDetails] = useState(
        {
            project_id: "",
            project_name: "",
            descriptions: "",
            start_date: "",
            end_date: "",
            projects_status: "open",
            manager_id: m_id
        }
    )

    const AddProject = async (e) => {
        e.preventDefault();
        const response = await axios.get(`http://127.0.0.1:5000/api/project_id/${projectdetails.project_id}`);
        const { isAvailable } = response.data;
        if (isAvailable) {
            setInvalid('')
            await axios.post('http://127.0.0.1:5000/api/projects/', projectdetails)
                .then((response) => {
                    alert("Project Added Successfully");
                    handleClose();
                })
                .catch((error) => {
                    console.error('Error Adding Projec:', error);
                });
        }
        else {
            setInvalid('Project Id Unavailable')
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='p-3' onSubmit={AddProject}>
                        <div className='row mb-2'>
                            <div className='col-md-6'>
                                <label className='form-label'>Project Id</label>
                                <input type='text' className='form-control form-control-sm'
                                    onChange={(e) => setProjectsDetails({ ...projectdetails, project_id: e.target.value })} />
                                {invalid !== true && <p className="text-danger text-center">{invalid}</p>}
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label'>Project Name</label>
                                <input type='text' className='form-control form-control-sm'
                                    onChange={(e) => setProjectsDetails({ ...projectdetails, project_name: e.target.value })} />
                            </div>
                        </div>

                        <div className='row mb-2'>
                            <div className='col-md-12'>
                                <label className='form-label'>Project Description</label>
                                <textarea type='text' className='form-control form-control-sm'
                                    onChange={(e) => setProjectsDetails({ ...projectdetails, descriptions: e.target.value })}></textarea>
                            </div>
                        </div>

                        <div className='row mb-2'>
                            <div className='col-md-6'>
                                <label className='form-label'>Start Date</label>
                                <input type='date' className='form-control form-control-sm'
                                    onChange={(e) => setProjectsDetails({ ...projectdetails, start_date: e.target.value })} />
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label'>End Date</label>
                                <input type='date' className='form-control form-control-sm'
                                    onChange={(e) => setProjectsDetails({ ...projectdetails, end_date: e.target.value })} />
                            </div>
                        </div>

                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-sm btn-outline-primary w-25' type='submit'>Add</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default AddProject;