import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentsDetails() {
    const [commentsdetails, setCommentsDetails] = useState([]);


    const GetComments = () => {
        const emp_id = localStorage.getItem('emp_id');
        axios.get(`http://127.0.0.1:5000/api/getmycomments/${emp_id}`)
            .then((response) => { setCommentsDetails(response.data) });
    }
    useEffect(() => {
        GetComments()
    }, [])

    const DeleteComments = async (Id) => {
        try {
            const confirm = window.confirm("Are You Sure?")
            if (confirm) {
                const response = await axios.delete(`  http://127.0.0.1:5000/api/deletecomments/${Id}`);
                console.log(`Comments with ID ${Id} deleted successfully`);
                GetComments();
            }
        } catch (error) {
            console.error(`Error deleting Task with ID ${Id}:`, error);
        }
    }

    return (
        <div className='container-fluid p-4 w-100'>
            <h5>All Comments</h5>
            <div>
                {commentsdetails.length > 0 ? commentsdetails.map((item, index) => (
                    <div className='mb-3' key={index}>
                        <div className='card border-primary p-2 rounded-1 shadow' style={{ backgroundColor: "aliceblue" }}>
                            <div className='card-header d-flex justify-content-between'>
                                <div>
                                    <strong> Prject Name:&nbsp;</strong>{item.project_name}&nbsp;
                                </div>
                                <h5>Task:&nbsp;<span className='fs-6 fw-normal'>{item.task_name}</span></h5>
                                <span className='float-end'><strong>Manager:&nbsp;</strong>{item.manager_name}</span>
                            </div>

                            <div className='card-body'>
                                <h5 className='text-dark fw-normal fs-6'>AddedDate:&nbsp;
                                    {new Date(item.added_date).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
                                </h5>
                                <h5 className='card-title text-primary fw-normal fs-5 pt-1'>{item.emp_comment}</h5>
                                <span className='d-flex justify-content-between '>
                                    <p className='fw-normal fs-6 pt-1'>Response:&nbsp;{item.emp_response}</p>
                                    <button className='btn btn-sm btn-outline-danger m-1 ' type='button' onClick={() => DeleteComments(item.id)}>Delete</button>
                                </span>
                            </div>
                        </div>

                    </div>
                )) : (<p className='text-center text-danger p-5'>No Data Available</p>)}
            </div>

        </div>


    )
}

export default CommentsDetails