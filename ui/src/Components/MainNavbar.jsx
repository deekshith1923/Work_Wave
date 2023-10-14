import { HiBars3 } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function MainNavbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const id = localStorage.getItem('manager_id');
  const handleLogout = () => {
    localStorage.clear();
    navigate('/')
  }

  return (
    <div className="d-flex p-2 justify-content-between fixed-top" style={{ backgroundColor: "#1976d2" }}>

      <div className='ps-3 d-inline text-light' >
        <HiBars3 className='m-1' style={{ fontSize: "30px", cursor: "pointer" }} onClick={toggleSidebar} />
        <div className=' d-inline ps-3  fw-bold text-warning fs-5'>
          WorkWave
        </div>
      </div>

      <div className='d-inline pe-3 text-light'>
        <div className='row'>
          <div className='col xs-auo'>

            <Dropdown drop="down-centered" >
              <Dropdown.Toggle style={{ backgroundColor: "#1976d2" }} className="border-0"><CgProfile size={"20px"} className="me-3" /><span className="me-2">{email}</span></Dropdown.Toggle>
              <Dropdown.Menu className='rounded-3 border-1 shadow-lg'>
                <Dropdown.Item className="pb-0">{email}</Dropdown.Item>
                <Dropdown.Item className="pb-0">{id}</Dropdown.Item>
                <hr className="dropdown-divider" />
                <Dropdown.Item className="text-center fw-bold text-danger" onClick={() => handleLogout()}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

        </div>
      </div>

    </div>
  );
}

export default MainNavbar;