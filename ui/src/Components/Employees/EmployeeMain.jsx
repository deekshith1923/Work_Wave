import { useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { BiTask } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";

import "../Sidebar.css";
import MainNavbar from "../MainNavbar";
import CommentsDetails from "./CommentsDetails";
import EmpDashboard from "./EmpDashboard";
import TaskAssigned from "./TaskAssigned";
import { Link, useNavigate } from "react-router-dom";


export default function EmployeeMain() {
    const [activePage, setActivePage] = useState("dashboard");
    const [isOpen, setIsopen] = useState(true);
    const [bcolor, setbgColor] = useState(1);
    const navigate = useNavigate();


    const toggleSidebar = ({ toggleSidebar }) => {
        setIsopen(!isOpen)
    }
    const handlePageClick = (page) => {
        setActivePage(page);
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }


return (
    <>
        <MainNavbar toggleSidebar={toggleSidebar} />
        <div className="pt-5">
            <div className={`${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className={`${isOpen ? 'sidebar-container' : ''}`}>

                    <ul className="ul-list">

                    <li onClick={() => { handlePageClick('dashboard'); setbgColor(1) }} className="list-item">
                            <div className={`${isOpen ? (bcolor === 1 ? 'item-active' : 'item-open') : ('item-closed')}`}>
                                <AiOutlineDashboard className="fs-3 me-3" />
                                <span>Dashboard</span>
                            </div>
                        </li>

                        <li onClick={() => { handlePageClick('taskasigned'); setbgColor(2) }} className="list-item">
                            <div className={`${isOpen ? (bcolor === 2 ? 'item-active' : 'item-open') : ('item-closed')}`}>
                                <BiTask className="fs-3 me-3" />
                                <span>Task Assigned</span>
                            </div>
                        </li>

                        <li onClick={() => { handlePageClick('comments'); setbgColor(5) }} className="list-item">
                            <div className={`${isOpen ? (bcolor === 5 ? 'item-active' : 'item-open') : ('item-closed')}`}>
                                <LiaCommentSolid className="fs-3 me-3" />
                                <span>My Comments</span>
                            </div>
                        </li>

                    </ul>
                    <ul className="ul-list">
                        <li onClick={() => handleLogout()} className="list-item mt-5">
                            <div className={`${isOpen ? ('logout-item') : ('logout-close')}`}>
                                <CgLogOut className="fs-3 me-3" />
                                <span>Logout</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={`${isOpen ? 'main-open' : 'main-closed'}`}>
            {activePage === "dashboard" && <EmpDashboard />}
                {activePage === "taskasigned" && <TaskAssigned />}
                {activePage === "comments" && <CommentsDetails />}
            </div>
        </div>
    </>
)
}

