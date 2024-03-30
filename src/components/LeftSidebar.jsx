import { Image, Button, ListGroup } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import { sidebarLinks } from "../constants";
import useAuthContext from "../hooks/useAuthContext";

function LeftSidebar() {
  const { user, logout } = useAuthContext();
  const { pathname } = useLocation();

  return (
    <nav className="d-none d-md-flex px-3 py-5 flex-column justify-content-between bg-purple-900">
      <div className="d-flex flex-column">
        <Link to="/" className="d-flex align-items-center mb-4">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={250}
            height={60}
          />
        </Link>
        <Link
          to={`/profile/${user.id}`}
          className="d-flex align-items-center mb-4 text-decoration-none"
        >
          <Image
            src={user.image_url || "/assets/images/profile-placeholder.svg"}
            alt="profile"
            className="rounded-circle"
            width={55}
            height={55}
          />
          <div className="d-flex flex-column ps-2 pt-2">
            <p className="fw-bold fs-4 mb-0 text-white">{user.name}</p>
            <p className="fst-italic text-secondary-emphasis fs-6">
              @{user.username}
            </p>
          </div>
        </Link>
        <ListGroup className="d-flex flex-column ps-0">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;

            return (
              <ListGroup.Item
                key={link.label}
                action
                className={`fw-medium d-flex justify-content-start align-items-start rounded mb-3 p-2  ${isActive && "bg-purple-500"
                  }`}
              >
                <NavLink
                  to={link.route}
                  className="d-flex align-items-center p-2 text-white text-decoration-none"
                >
                  <i className={`${link.icon} me-3 custom  ${isActive && "text-white"
                    }`} />
                  {link.label}
                </NavLink>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
      <Button
        variant="link"
        onClick={() => logout()}
        className="me-5 d-flex text-decoration-none"
      >
        <i className="bi bi-box-arrow-right text-purple-300 fs-2" />
        <p className="fs-5 fw-medium lh-base ms-3 pt-2 text-white">Logout</p>
      </Button>
    </nav>
  );
}

export default LeftSidebar;
