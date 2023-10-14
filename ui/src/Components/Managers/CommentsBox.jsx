import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function CommentsBox() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [commentsdetails, setCommentsDetails] = useState([]);
    const [commentsresponse, setCommentsResponse] = useState({
        comments_id: 0,
        response: "",
    })

    const GetComments = () => {
        const m_id = localStorage.getItem('manager_id');
        axios.get(`http://127.0.0.1:5000/api/getcomments/${m_id}`)
            .then((response) => setCommentsDetails(response.data));
    }
    useEffect(() => {
        GetComments()
    }, [])

    const handleResponse = async (e) => {
        e.preventDefault();
        axios.put('http://127.0.0.1:5000/api/response/', commentsresponse)
            .then((response) => {
                GetComments();
                handleClose();
                alert("Response Added Successfully")
            })
            .catch((error) => {
                console.error('Error status:', error);
            });
    };

    return (
        <div className='container-fluid p-4 w-100'>
            <h5>Employee Comments</h5>
            <div>
                {commentsdetails.length > 0 ? commentsdetails.map((item, index) => (
                    <div className='mb-3' key={index}>
                        <div className='card border-primary p-2 rounded-1 shadow' style={{ backgroundColor: "aliceblue" }}>
                            <div className='card-header d-flex justify-content-between'>
                                <div>
                                    <strong> Prject Name:&nbsp;</strong>{item.project_name}&nbsp;
                                </div>
                                <span className='float-end'><strong>Employee:&nbsp;</strong>{item.empname}</span>
                            </div>

                            <div className='card-body'>
                                <h5><span className='float-end'>{new Date(item.added_date).toLocaleDateString('en-US')}</span></h5>
                                <h5>Task:&nbsp;<span className='fs-6 fw-normal'>{item.task_name}</span></h5>
                                <h5 className='card-title text-primary fw-normal fs-5 pt-1'>{item.comments}</h5>
                                <span className='float-end pt-3'>
                                    <a className='btn btn-sm btn-outline-primary m-1' type='button' onClick={() => { handleShow(); setCommentsResponse({ ...commentsresponse, comments_id: item.id }) }}>Response</a>
                                </span>
                            </div>
                        </div>

                    </div>
                )) : (<p className='text-center text-danger p-5'>No Data Available</p>)}
            </div>

            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Add Response</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='p-2' onSubmit={handleResponse}>
                        <div className='row mb-4'>
                            <div className='col-md-12'>
                                <label className='form-label'>Response</label>
                                <textarea type='text' className='form-control form-control-sm' required
                                    onChange={(e) => setCommentsResponse({ ...commentsresponse, response: e.target.value })} ></textarea>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-sm btn-outline-primary w-25' type='submit'>Add</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal >
        </div>


    )
}

export default CommentsBox