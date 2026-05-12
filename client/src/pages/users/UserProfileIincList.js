import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import {
  DeleteIncomeAction,
} from "../../redux/slices/income/incomeSlices";
import { userProfileAction } from "../../redux/slices/users/usersSlices";
import "../../App.css";

const UserProfileIincList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  const incomeState = useSelector((state) => state?.income);
  
  const { loading: incLoading, appErr: incAppErr, serverErr: incServerErr } = incomeState || {};
  const isDeleted = incomeState?.isDeleted || incomeState?.incomeDeleted || incomeState?.isIncDeleted;

  // Get user profile data for user's specific income
  const userState = useSelector((state) => state?.users);
  const { profile, loading: userLoading, appErr: userAppErr, serverErr: userServerErr } = userState || {};

  const rows = profile?.income || profile?.incomes || [];

  const loading = incLoading || userLoading;
  const appErr = incAppErr || userAppErr;
  const serverErr = incServerErr || userServerErr;

  useEffect(() => {
    if (isDeleted) {
      dispatch(userProfileAction());
    }
  }, [isDeleted, dispatch]);

  const handleDelete = (id) => {
    const ok = window.confirm("Are you sure you want to delete this income?");
    if (ok) dispatch(DeleteIncomeAction(id));
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
              <h2 className="panel-title">My Income History</h2>
              <p className="panel-subtitle">All your income transactions</p>
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
                      <td className="text-success fw-bold">Rs. {item.amount}</td>
                      <td>{item.date ? new Date(item.date).toLocaleDateString() : "-"}</td>
                      <td>{item.note}</td>
                      <td>
                        <span className="badge-income">{item.type || "income"}</span>
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
              <p className="muted mb-0">No income transactions found.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default UserProfileIincList;