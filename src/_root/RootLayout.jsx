import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import  useAuthContext  from "../hooks/useAuthContext";
import Topbar from "../components/Topbar";
import LeftSidebar from "../components/LeftSidebar";
import Bottombar from "../components/Bottombar";


function RootLayout(){
    const navigate = useNavigate();
    const { sessionVerified } = useAuthContext();

    useEffect(() => {
        if(!sessionVerified){
            navigate("/sign-in", { replace: true });
        }
    }, [sessionVerified]);

    return sessionVerified ? (
        <div className="w-100 d-md-flex">
            <Topbar />
            <LeftSidebar />

            <section className="d-flex h-100 flex-grow-1 flex-shrink-1" >
                <Outlet />
            </section>

            <Bottombar /> 
        </div>
    ) : null;
}

export default RootLayout;