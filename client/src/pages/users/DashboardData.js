import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import { fetchAccountStatsAction } from "../../redux/slices/accountsStats/accountStatSlices";
import "../../App.css";

const DashboardData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccountStatsAction());
  }, [dispatch]);

  const account = useSelector((state) => state.account);
  const { loading, accountDetails, appErr, serverErr } = account;

  const totalIncome = accountDetails?.incomeStats?.[0]?.totalIncome || 0;
  const totalIncomeTx = accountDetails?.incomeStats?.[0]?.totalRecordsIncome || 0;

  const totalExpense = accountDetails?.expenseStats?.[0]?.totalExp || 0;
  const totalExpenseTx = accountDetails?.expenseStats?.[0]?.totalRecordsExp || 0;

  const balance = totalIncome - totalExpense;

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : (
        <div className="app-container">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2 className="panel-title">Dashboard Overview</h2>
                <p className="panel-subtitle">Your account summary at a glance</p>
              </div>
            </div>

            <div className="grid-3">
              {/* Balance */}
              <div className="stat-card">
                <div className="stat-top">
                  <p className="stat-title">Current Balance</p>
                  <span className="stat-icon balance">BL</span>
                </div>
                <h3 className="stat-value">Rs. {balance}</h3>
                <p className="muted mb-0">Income - Expense</p>
              </div>

              {/* Income */}
              <div className="stat-card">
                <div className="stat-top">
                  <p className="stat-title">Total Income</p>
                  <span className="stat-icon income">IN</span>
                </div>
                <h3 className="stat-value">Rs. {totalIncome}</h3>
                <p className="muted mb-0">Total Transactions: {totalIncomeTx}</p>
              </div>

              {/* Expense */}
              <div className="stat-card">
                <div className="stat-top">
                  <p className="stat-title">Total Expenses</p>
                  <span className="stat-icon expense">EX</span>
                </div>
                <h3 className="stat-value">Rs. {totalExpense}</h3>
                <p className="muted mb-0">Total Transactions: {totalExpenseTx}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardData;