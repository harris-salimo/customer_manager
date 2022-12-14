import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = ({ isUserAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers["Authorization"];
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      aria-label="Fifth navbar example"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/#">
          Customer Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample05"
          aria-controls="navbarsExample05"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample05">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/customers">
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/invoices">
                Invoices
              </Link>
            </li>
          </ul>
          {/* <form>
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
          </form> */}

          <ul className="navbar-nav ml-auto">
            {!isUserAuthenticated() ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Sign up
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary btn-sm" to="/login">
                    Sign in
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleLogout}
                >
                  Sign out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
