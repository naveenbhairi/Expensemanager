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
    <>
      <nav
        class="navbar navbar-expand-md navbar-dark  fixed-top p-1"
        style={{ "background-color": "#5e5d96"}}
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
          class="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav ">
            <li class="nav-item">
              {userLogin?.isAdmin ? 
                <Link
                  to="/expenses"
                  className="nav-link active text-light me-4"
                >
                  Expenses List
                </Link>
               : null}
            </li>

            <li class="nav-item ">
              {userLogin?.isAdmin ? 
                <Link to="/incomes" className="nav-link active text-light me-4">
                  Income List
                </Link>
              : null}
            </li>

            <li class="nav-item ">
              {userLogin?.isAdmin ? 
                <Link
                  to="/dashboard"
                  className="nav-link active text-light me-4"
                >
                  Dashboard
                </Link>
               : null}
            </li>
            </ul>
            <form class="form-inline d-flex al" style={{"text-align":"center"}}>
            {userLogin?.isAdmin ? null:
              <Link 
                to="/profile" 
                className="text-light text-decoration-none al-1"
                style={{ "margin-right": "2em" }}
                >
                Profile
              </Link>
             }
            {userLogin?.isAdmin ? null:
              <Link
                to="/add-income"
                className="text-light text-decoration-none al-2" 
                style={{ "margin-right": "2em" }}
              >
                Add Transaction
              </Link>
            }
            <Link
                onClick={() => dispatch(logout())}
                className="text-light text-decoration-none"
                style={{ "margin-right": "5em" }}
              >
                Logout
              </Link>
          </form>
              
              
        </div>
      </nav>
    </>
  );
};

export default PrivateNavbar;