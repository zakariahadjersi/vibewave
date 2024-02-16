import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

function AuthLayout() {
  const { sessionVerified } = useAuthContext();

  return (
    <>
      { sessionVerified ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="d-flex flex-grow-1 justify-content-center align-content-center flex-column py-10" >
            <Outlet />
          </section>
          <img
            src="/assets/images/3d-woman.jpg"
            alt="side image" 
            className="d-none d-xl-block h-100 w-50 object-fit-cover"
          />
        </>
      )}
    </>
  );
}

export default AuthLayout;
