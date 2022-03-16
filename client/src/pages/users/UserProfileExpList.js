import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../../redux/slices/users/usersSlices";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import UserProfileContentDetails from "./UserProfileContentdetails";
import '../../App.css';
const UserProfileExpList = () => {
  const state = useSelector((state) => state.users);
  const { loading, appErr, serverErr, profile } = state;

  const [search, setSearch] = useState("");
  // const[filter,setFilter]=useState('')

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  const arr = (e) => {
    setSearch(e.target.value);
  };

  var evens = profile?.expenses.filter(
    (item) => item.date.substring(5, 7) === search
  );
  console.log(evens);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : profile?.expenses?.length <= 0 ? (
        <div class="container-table100">
          <h2>No Expense Found</h2>
        </div>
      ) : (
        <div class="pal-5 bg-light">
          <div className="container-fluid ">
            <div className="border border-0">
              <h6 className="kal fs-2 text-secondary ">
                Recent Expense Details
              </h6>
              <div className="my-3 lo dropdown show">
                <select
                  className="custom-select btn btn-info dropdown-toggle " style={{"background-color":"white"}}
                  onChange={arr}
                >
                  <option value="01">January</option>
                  <option value="02">Febuary</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May </option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div className="tt">
                <table className="table table-striped ">
                  <thead>
                    <tr className="table-active">
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
                      <th scope="col">
                        <strong className="btn  text-uppercase fw-bold text-light">
                          Edit
                        </strong>
                      </th>
                      <th scope="col">
                        <strong className="btn  text-uppercase fw-bold text-light">
                          Delete
                        </strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-light">
                    <>
                      {evens.length <= 0 ? (
                        <h4 className="my-3 mm ">No entries Found in this month</h4>
                      ) : (
                        evens.map((exp) => (
                          <UserProfileContentDetails
                            item={exp}
                            key={exp?._id}
                          />
                        ))
                      )}
                    </>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileExpList;
