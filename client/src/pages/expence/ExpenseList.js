import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppPagination from "../../components/AppPagination";
import ContentDetails from "../../components/ContentDetails";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import LoadingComponent from "../../components/Loading";
import { fetchAllExpAction } from "../../redux/slices/expenses/expenseStatSlice";
import '../../App.css';
const ExpensesList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  //get expenses from store
  const expenses = useSelector(state => state.expenses);
  const { loading, appErr, serverErr, expenseList } = expenses;
  //fetch expenses
  useEffect(() => {
    dispatch(fetchAllExpAction(+page));
  }, [dispatch, page, setPage]);
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : (
        <div className="pal-3 bg-light" >
          <div className="container-fluid " >
            <div className="border border-0">
                <h6 className="kal fs-2 text-secondary ">
                  Recent Expense transactions
                </h6>
              <div className="tt">
                <table className="table table-striped " >
                  <thead>
                    <tr>
                      <th scope="col" >
                        <strong className="btn  text-uppercase fw-bold text-light">
                          Username
                        </strong>
                      </th>
                      <th scope="col">
                        <strong className="btn  text-uppercase fw-bold text-light">
                          Title
                        </strong>
                      </th>
                      <th scope="col">
                        <strong className="btn  text-uppercase fw-bold text-light">
                          Note
                        </strong>
                      </th>
                      <th scope="col">
                        <strong className="btn  text-uppercase fw-bold text-light">
                          Amount
                        </strong>
                      </th>
                      <th scope="col">
                        <strong className="btn  text-uppercase fw-bold text-light">
                          Date
                        </strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody >
                    {loading ? (
                      <h1>Loading...</h1>
                    ) : appErr || serverErr ? (
                      <div>err</div>
                    ) : expenseList?.docs?.length <= 0 ? (
                      <h4 className="m-5" style={{ "font-size": "25px" }}>
                        No Expense Found
                      </h4>
                    ) : (
                      expenseList?.docs?.map((exp) => (
                        <>
                          <ContentDetails key={exp?._id} item={exp} />
                        </>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="pl"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <AppPagination
              setPage={setPage}
              pageNumber={expenseList?.totalPages}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ExpensesList;