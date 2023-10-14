import reglog from "../../Images/emp.png";

export default function EmpDashboard() {
    return (
        <div style={{ marginTop: "-20px" }}>
            <div style={{
                backgroundImage: `url(${reglog})`, height: "100vh", width: "100%", backgroundPosition: "center",
                backgroundRepeat: 'no-repeat', backgroundSize: "cover"
            }}>
                <div className="p-5">
                    <div className="p-5 ps-0">
                        <h5 className='display-1 fw-bold text-danger' style={{ fontFamily: "Oswald", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>W<span className='text-light'>ork Wave</span></h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
