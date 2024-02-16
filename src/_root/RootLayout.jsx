import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  useAuthContext  from "../hooks/useAuthContext";

function RootLayout(){
    const navigate = useNavigate();
    const { sessionVerified } = useAuthContext();
    useEffect(() => {
        if(!sessionVerified){
            navigate("/sign-in", { replace: true });
        }
    }, [sessionVerified]);

    return sessionVerified ? (
        <div>RootLayout</div>
    ) : null;
}

export default RootLayout;