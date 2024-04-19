import { Link, useLocation } from "react-router-dom";
import { bottombarLinks } from "../constants";

function Bottombar() {
    const { pathname } = useLocation();

    return (
        <section className="d-flex justify-content-between w-100 sticky-bottom rounded-top bg-dark bg-gradient p-3 d-md-none">
            {bottombarLinks.map((link) => {
                const isActive = pathname === link.route;

                return (
                    <Link
                        to={link.route}
                        key={link.label}
                        className={`fw-medium d-flex flex-column justify-content-center align-items-center pt-2 px-2 link-underline link-underline-opacity-0 ${isActive && "bg-purple-500 rounded"
                            }`}
                    >
                        <i className={`${link.icon} custom  ${isActive && "text-white"
                            }`} />
                        <p className="fw-medium text-white lh-base">{link.label}</p>
                    </Link>
                );
            })}
        </section>
    );
}

export default Bottombar;