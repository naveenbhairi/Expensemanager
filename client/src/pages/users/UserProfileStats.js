import React from "react";
import "../../App.css";

const UserProfileStats = ({ totalExp = 0, totalInc = 0 }) => {
  const balance = (totalInc || 0) - (totalExp || 0);

  return (
    <div className="grid-3">
      <div className="stat-card">
        <div className="stat-top">
          <p className="stat-title">Current Balance</p>
          <span className="stat-icon balance">BL</span>
        </div>
        <h3 className="stat-value">Rs. {balance}</h3>
      </div>

      <div className="stat-card">
        <div className="stat-top">
          <p className="stat-title">Total Income</p>
          <span className="stat-icon income">IN</span>
        </div>
        <h3 className="stat-value">Rs. {totalInc || 0}</h3>
      </div>

      <div className="stat-card">
        <div className="stat-top">
          <p className="stat-title">Total Expenses</p>
          <span className="stat-icon expense">EX</span>
        </div>
        <h3 className="stat-value">Rs. {totalExp || 0}</h3>
      </div>
    </div>
  );
};

export default UserProfileStats;