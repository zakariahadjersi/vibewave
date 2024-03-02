import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

function LeftSidebar() {
    const {user, logout} = useAuthContext();
    console.log(user);
  return (
    <nav className="d-none d-md-flex px-5 py-5 flex-column justify-content-between bg-dark bg-gradient">
      <div className="d-flex flex-column">
        <Link to="/" className="d-flex align-items-center">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="d-flex align-items-center">
          <Image
            src={user.image_url || "/assets/images/profile-placeholder.svg"}
            alt="profile"
            className="rounded-circle"
          />
          <div className="d-flex flex-column">
            <p className="fw-bold">{user.name}</p>
            <p className="fst-italic fs-6">@{user.username}</p>
          </div>
        </Link>
        <ul>

        </ul>
      </div>
    </nav>
  );
}

export default LeftSidebar;
