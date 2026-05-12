import React from "react";
import { Link } from "react-router-dom";
import ex from "../../../img/exx.png";
import "../../../App.css";

const PublicNavbar = () => {
  return (
    <nav className="navbar-glass-light">
      {/* Brand / Logo */}
      <Link to="/" className="nav-brand nav-brand-light">
        <img style={{ height: "36px", width: "auto" }} src={ex} alt="Expense Manager" />
        <span style={{ color: "#cbd5e1" }}>ExpenseManager</span>
      </Link>

      {/* Desktop Nav Links & Auth Buttons */}
      <div className="nav-menu">
        <Link to="/" className="nav-link-item nav-link-item-light">Home</Link>
        <Link to="/login" className="nav-link-item nav-link-item-light">
          Sign In
        </Link>
        <Link to="/register" className="nav-link-item nav-link-item-light">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;