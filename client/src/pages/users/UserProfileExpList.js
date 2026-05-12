import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import {
  deleteExpAction,
} from "../../redux/slices/expenses/expenseStatSlice";
import { userProfileAction } from "../../redux/slices/users/usersSlices";
import "../../App.css";

const UserProfileExpList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  // Safely check for both singular and plural state names
  const expenseState = useSelector((state) => state?.expenses || state?.expense);
  
  const { loading: expLoading, appErr: expAppErr, serverErr: expServerErr } = expenseState || {};
  const isDeleted = expenseState?.isDeleted || expenseState?.isExpdeleted || expenseState?.isExpDeleted;

  // Get user profile data for user's specific expenses
  const userState = useSelector((state) => state?.users);
  const { profile, loading: userLoading, appErr: userAppErr, serverErr: userServerErr } = userState || {};

  const rows = profile?.expenses || [];

  const loading = expLoading || userLoading;
  const appErr = expAppErr || userAppErr;
  const serverErr = expServerErr || userServerErr;

  useEffect(() => {
    if (isDeleted) {
      dispatch(userProfileAction());
    }
  }, [isDeleted, dispatch]);

  const handleDelete = (id) => {
    const ok = window.confirm("Are you sure you want to delete this expense?");
    if (ok) dispatch(deleteExpAction(id));
  };

  return (
    <section className="app-container">
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : (
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">My Expense History</h2>
              <p className="panel-subtitle">All your expense transactions</p>
            </div>
          </div>

          {rows?.length ? (
            <div className="table-wrap">
              <table className="table table-modern">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Note</th>
                    <th>Type</th>
                    <th style={{ width: 180 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item) => (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td className="text-danger fw-bold">Rs. {item.amount}</td>
                      <td>{item.date ? new Date(item.date).toLocaleDateString() : "-"}</td>
                      <td>{item.note}</td>
                      <td>
                        <span className="badge-expense">{item.type || "expense"}</span>
                      </td>
                      <td>
                        <div className="row-actions">
                          <Link 
                            to={{ pathname: "/edit", state: { item } }} 
                            className="btn btn-sm btn-outline-primary"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="panel mt-3 text-center">
              <p className="muted mb-0">No expense transactions found.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default UserProfileExpList;