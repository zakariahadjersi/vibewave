import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

function Topbar() {
  const { logout, user } = useAuthContext();
  
  return (
    <section className="d-flex flex-row justify-content-between d-block d-md-none w-100 bg-dark bg-gradient">
      <div className="d-flex justify-content-between align-items-center px-3 py-2">
        <Link to="/" className="d-flex align-items-center">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={50}
          />
        </Link>
      </div>
      <div className="d-flex me-3">
        <Button variant="link" onClick={() => logout()} className="me-3" >
          <i className="bi bi-box-arrow-right text-purple-300 fs-2" />
        </Button>
        <Link
          to={`/profile/${user.id}`}
          className="d-flex align-items-center justify-content-center"
        >
          <Image
            src={user.image_url || "/assets/images/profile-placeholder.svg"}
            alt="profile"
            className="rounded-circle"
            width={35}
            height={35}
          />
        </Link>
      </div>
    </section>
  );
}

export default Topbar;
