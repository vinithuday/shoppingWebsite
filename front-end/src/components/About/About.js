
import { useEffect } from "react";
import {NavLink, Outlet, useNavigate} from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    //Component Did Mount
    useEffect(() =>{
        navigate("info");
    }, []);

    return(
        <div>
            <nav style={{border:"none", justifyContent: "center"}}>
                <NavLink to="info">Info</NavLink>
                <NavLink to="offers">Offers</NavLink>

            </nav>
            <Outlet/>
        </div>
    );
};

export default About;