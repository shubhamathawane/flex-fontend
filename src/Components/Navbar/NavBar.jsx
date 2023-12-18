import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../Features/UserSlice";
const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(LOGOUT());
    localStorage.removeItem("user");
  };

  return (
    <div>
      <nav class="navbar position-fix navbar-expand-lg navbar-light bg-body-tertiary">
        <div class="container-fluid">
          <button
            data-mdb-collapse-init
            class="navbar-toggler"
            type="button"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <Link to={"/"} class="nav-link fs-5 fw-bold" href="#">
                Flexmoney-Yoga
              </Link>
            </ul>
          </div>

          <div class="d-flex align-items-center">
            <a class="text-reset me-3" href="#">
              <i class="fas fa-shopping-cart"></i>
            </a>
            {/* <div class="dropdown">
              <a
                data-mdb-dropdown-init
                class="text-reset me-3 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                aria-expanded="false"
              >
                <i class="fas fa-bell"></i>
                <span class="badge rounded-pill badge-notification bg-danger">
                  1
                </span>
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a class="dropdown-item" href="#">
                    Some news
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another news
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div> */}
            <div class="dropdown">
              <ul class="navbar-nav text-success me-auto mb-2 mb-lg-0">
                {!user ? (
                  <>
                    <li class="nav-item ">
                      <Link to="/register">
                        <label>Register</label>
                      </Link>
                    </li>
                    <li class="nav-item ms-3">
                      <Link to="/login">
                        <label>Login</label>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li class="btn text-white bg-success nav-item ms-3">
                      <Link
                        style={{ color: "white", textDecoration: "none" }}
                        to={"/profile"}
                      >
                        Profile
                      </Link>
                    </li>
                    <li class="nav-item ms-3">
                      <button
                        className="btn text-white bg-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
