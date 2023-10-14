import { Link } from "react-router-dom";
import reglog from "../Images/Home1.png";
import { AiTwotoneHome } from "react-icons/ai";


export default function Home() {
    return (
        < div className="continer-fluid" style={{ backgroundColor: "antiquewhite" }}>
            <div className="row mw-100 vh-100" >
                <div className="col-md-7 h-100">
                    <img src={reglog} height={'100%'} width={'100%'} alt="Logo" />
                </div>


                <div className="col-md-5 h-100" style={{ backgroundColor: "antiquewhite" }}>
                    <div className="d-flex justify-content-end mt-2">
                        <Link to={'/'}><AiTwotoneHome size={"40px"} className="text-danger" /></Link>
                    </div>

                    <div style={{ marginTop: "32%" }}>
                        <h5 className='pt-3  mt-5 display-1 fw-bold text-danger' style={{ fontFamily: "Oswald", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>W<span className='text-primary'>ork Wave</span></h5>
                    </div>
                    <div className="text-center pe-5">
                        <Link to={'/login'}> <button className='btn text-light btn-danger' style={{ fontFamily: "Oswald" }}>Let's Go</button></Link>
                    </div>
                </div>
            </div>

        </ div>

    );
}
