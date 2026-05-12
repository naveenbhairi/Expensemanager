import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import {
  fetchAllIncomeAction,
  DeleteIncomeAction,
} from "../../redux/slices/income/incomeSlices";
import "../../App.css";

const IncomeList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllIncomeAction());
  }, [dispatch]);

  const incomeState = useSelector((state) => state?.income);
  const { loading, appErr, serverErr, incomeList } = incomeState || {};
  const isDeleted = incomeState?.isDeleted || incomeState?.incomeDeleted || incomeState?.isIncDeleted;

  // Robustly extract the array regardless of how the API payload is wrapped (e.g., pagination)
  const rows = incomeList?.docs || incomeList?.incomes || (Array.isArray(incomeList) ? incomeList : []);

  useEffect(() => {
    if (isDeleted) {
      dispatch(fetchAllIncomeAction());
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
              <h2 className="panel-title">Income Transactions</h2>
              <p className="panel-subtitle">View and manage all income records</p>
            </div>
          </div>

          {rows?.length ? (
            <div className="table-wrap">
              <table className="table table-modern">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Note</th>
                    <th>Type</th>
                    <th style={{ width: "180px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item) => (
                    <tr key={item._id}>
                      <td className="text-capitalize fw-bold">{item?.user?.firstname} {item?.user?.lastname}</td>
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
                            to={{ pathname: "/edit", state: { item: { ...item, type: item?.type || "income" } } }} 
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
                <tfoot>
                  <tr>
                    <td colSpan="2" style={{ textAlign: "right", fontWeight: "bold" }}>Total:</td>
                    <td className="text-success fw-bold" style={{ fontSize: "1.05rem" }}>Rs. {rows.reduce((acc, item) => acc + Number(item.amount), 0)}</td>
                    <td colSpan="4"></td>
                  </tr>
                </tfoot>
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

export default IncomeList;