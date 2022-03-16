import React from "react";
import "../../App.css";

const UserProfileStats = ({ totalExp, totalInc }) => {
  return (
    <>
      <div class="det">
        <div class="container-1 ">
          <div class="card-1">
            <div class="content-1">
              <div class="contentBx">
                <h3>Current Balance</h3>
              </div>
              <div class="ll">Rs.{totalInc - totalExp}</div>
            </div>
          </div>
          <div class="card-1">
            <div class="content-1">
              <div class="contentBx">
                <h3>Total Income</h3>
              </div>
              <div class="ll">Rs.{totalInc}</div>
            </div>
          </div>
          <div class="card-1">
            <div class="content-1">
              <div class="contentBx">
                <h3>Total Expenses</h3>
              </div>
              <div class="ll">Rs.{totalExp}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileStats;
