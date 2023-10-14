import { useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { GoTasklist } from "react-icons/go";
import { RiFileListLine } from "react-icons/ri";
import { LiaCommentSolid } from "react-icons/lia";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";


import "../Sidebar.css";
import MainNavbar from "../MainNavbar";
import AssignTasks from "./AssignTasks";
import CommentsBox from "./CommentsBox";
import TaskDetails from "./TaskDetails";
import ProjectDetails from "./ProjectDetails";
import EmployeeDetails from "./EmployeeDetails";
import ManagerDashboard from "./ManagerDashboard";

export default function ManagerMain() {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState("dashboard");
    const [isOpen, setIsopen] = useState(true);
    const [bcolor, setbgColor] = useState(1)

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

                            <li onClick={() => { handlePageClick('projectinfo'); setbgColor(2) }} className="list-item">
                                <div className={`${isOpen ? (bcolor === 2 ? 'item-active' : 'item-open') : ('item-closed')}`}>
                                    <RiFileListLine className="fs-3 me-3" />
                                    <span>Projects</span>
                                </div>
                            </li>

                            <li onClick={() => { handlePageClick('employeeinfo'); setbgColor(3) }} className="list-item">
                                <div className={`${isOpen ? (bcolor === 3 ? 'item-active' : 'item-open') : ('item-closed')}`}>
                                    <BsFillPersonPlusFill className="fs-3 me-3" />
                                    <span>Employees</span>
                                </div>
                            </li>

                            <li onClick={() => { handlePageClick('assigntasks'); setbgColor(5) }} className="list-item">
                                <div className={`${isOpen ? (bcolor === 5 ? 'item-active' : 'item-open') : ('item-closed')}`}>
                                    <MdOutlineAssignmentTurnedIn className="fs-3 me-3" />
                                    <span>Assign Tasks</span>
                                </div>
                            </li>

                            <li onClick={() => { handlePageClick('taskinfo'); setbgColor(6) }} className="list-item">
                                <div className={`${isOpen ? (bcolor === 6 ? 'item-active' : 'item-open') : ('item-closed')}`}>
                                    <GoTasklist className="fs-3 me-3" />
                                    <span>Tasks Added</span>
                                </div>
                            </li>

                            <li onClick={() => { handlePageClick('empcomments'); setbgColor(7) }} className="list-item">
                                <div className={`${isOpen ? (bcolor === 7 ? 'item-active' : 'item-open') : ('item-closed')}`}>
                                    <LiaCommentSolid className="fs-3 me-3" />
                                    <span>Messages</span>
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
                    {activePage === "dashboard" && <ManagerDashboard />}
                    {activePage === "projectinfo" && <ProjectDetails />}
                    {activePage === "assigntasks" && <AssignTasks />}
                    {activePage === "taskinfo" && <TaskDetails />}
                    {activePage === "employeeinfo" && <EmployeeDetails />}
                    {activePage === "empcomments" && <CommentsBox />}
                </div>
            </div>
        </>
    )
}

