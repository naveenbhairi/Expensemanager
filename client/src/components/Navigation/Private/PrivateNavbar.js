import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import { logout } from "../../../redux/slices/users/usersSlices";
import ex from "../../../img/exx.png"
import '../../../App.css'
const PrivateNavbar = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state?.users?.userAuth);

  return (
    <nav className="navbar-glass-dark">
      {/* Brand / Logo */}
      <Link to="/" className="nav-brand nav-brand-dark">
        <img style={{ height: "36px", width: "auto" }} src={ex} alt="Expense Manager" />
        <span>
          Expense<span>Manager</span>
        </span>
      </Link>

      {/* Desktop Nav Links & Auth Buttons */}
      <div className="nav-menu">
        {userLogin?.isAdmin ? (
          <>
            <Link to="/dashboard" className="nav-link-item nav-link-item-dark">Dashboard</Link>
            <Link to="/expenses" className="nav-link-item nav-link-item-dark">Expenses</Link>
            <Link to="/incomes" className="nav-link-item nav-link-item-dark">Income</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="nav-link-item nav-link-item-dark">Profile</Link>
            <Link to="/add-expense" className="nav-link-item nav-link-item-dark">Add Expense</Link>
            <Link to="/add-income" className="nav-link-item nav-link-item-dark">Add Income</Link>
          </>
        )}
        
        <button 
          onClick={() => dispatch(logout())}
          className="nav-link-item nav-link-item-dark"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default PrivateNavbar;