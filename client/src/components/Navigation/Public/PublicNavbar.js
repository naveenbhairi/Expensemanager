import React from "react";
import { Link } from "react-router-dom";
import ex from "../../../img/exx.png"
import '../../../App.css'
const PublicNavbar = () => {
  return (
    <>
      <nav
        class="navbar navbar-expand-sm navbar-dark fixed-top p-1 "
        style={{"background-color": "#5e5d96" }}
      >
        <Link to="/" className="navbar-brand">
          <img className="image-fluid mx-5" src={ex} width="120" height="50" />
          
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ">
            <li className="nav-item ">
              <Link to="/" className="nav-link active text-light ">
                Home
              </Link>
            </li>
          </ul>
          <form class="form-inline d-flex kaa">
            <Link
              to="/login"
              className="text-light text-decoration-none na "
              style={{ "margin-right": "2em" }}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-light text-decoration-none "
              style={{ "margin-right": "5em" }}
            >
              Sign Up
            </Link>
          </form>
        </div>
      </nav>
    </>
  );
};

export default PublicNavbar;