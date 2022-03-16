import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userProfileAction } from "../../redux/slices/users/usersSlices";

import "../../App.css";
import calcTransaction from "../../utils/accountStatistics";
import UserProfileStats from "./UserProfileStats";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);
  const state = useSelector((state) => state.users);
  const { loading, appErr, serverErr, userAuth, profile } = state;

  //Get income statistics
  const incResult =
    profile?.income && calcTransaction(profile?.income ? profile.income : []);

  //Get expense statistics
  const expResult = profile?.expenses && calcTransaction(profile?.expenses);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : (
        <section>
            <div className="cards">
              <div className="card ">
                <div className="card__overlay">
                  <div className="card__header ">
                  <div>
                    <img
                      className="card__thumb"
                      src="https://i.imgur.com/sjLMNDM.png"
                      alt=""
                    />
                    </div>
                    <div className="op">
                      <h3 className="card__title text-capitalize">
                        {" "}
                        {profile?.firstname} {profile?.lastname}
                      </h3>
                      <span className="card__status">
                        {" "}
                        {profile?.expenses?.length + profile?.income?.length}
                        {""}
                        {""} Records Created
                      </span>
                    </div>
                    <div className="ka">
                      <h3 className="card__title-2">{profile?.email} </h3>
                      <span>
                        <button
                          className="btn btn-info btn-sm l"
                          onClick={() =>
                            history.push({
                              pathname: "update-profile",
                              state: {
                                user: userAuth,
                              },
                            })
                          }
                        >
                          Edit Profile
                        </button>
                      </span>
                    </div>
                    <div >
                      <button
                        onClick={() => history.push("/user-expenses")}
                        className="border border-0 my-1 btn btn-info b btn-sm d-flex"
                      >
                        <span>View Expenses History</span>
                      </button>
                      <button
                        onClick={() => history.push("/user-income")}
                        className="border border-0  w-100 btn btn-info b btn-sm d-flex"
                      >
                        <span>View Income History</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="position-relative p-1 border border-0 ">
              <UserProfileStats
                totalExp={expResult?.sumTotal}
                totalInc={incResult?.sumTotal}
              />
            </div>
        </section>
      )}
    </>
  );
};

export default Profile;
