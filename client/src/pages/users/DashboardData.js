import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import { fetchAccountStatsAction } from "../../redux/slices/accountsStats/accountStatSlices";
import '../../App.css'
const DashboardData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccountStatsAction());
  }, [dispatch]);

  const account = useSelector(state => state.account);
  const { loading, accountDetails, appErr, serverErr } = account;

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : (
        <div class="pal-4">
          <div class="container">
            <div class="container-1 ">
              <div class="card-2" >
                <div class="content-1">
                  <div class="contentBx mb-2">
                    <h3>Total Income</h3>
                  </div>
                  <div class="ll">Rs.{accountDetails?.expenseStats[0]?.totalExp}</div>
                  <div class="ll-1">Total Transactions    {accountDetails?.expenseStats[0]?.totalRecordsExp}</div>
                </div>
                
              </div>
              <div></div>
              <div class="card-2">
                <div class="content-1">
                  <div class="contentBx mb-2">
                    <h3>Total Expenses</h3>
                  </div>
                  <div class="ll">Rs.{accountDetails?.incomeStats[0]?.totalIncome}</div>
                  <div class="ll-1">Total Transactions {accountDetails?.incomeStats[0]?.totalRecordsIncome}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardData;