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

  // Income statistics
  const incResult =
    profile?.income && calcTransaction(profile?.income ? profile.income : []);

  // Expense statistics
  const expResult = profile?.expenses && calcTransaction(profile?.expenses);

  const totalRecords = (profile?.expenses?.length || 0) + (profile?.income?.length || 0);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="app-container">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2 className="panel-title">My Profile</h2>
                <p className="panel-subtitle">Manage account and view financial summary</p>
              </div>
              <button
                className="btn btn-profile-outline"
                onClick={() =>
                  history.push({
                    pathname: "/update-profile",
                    state: { user: userAuth },
                  })
                }
              >
                Edit Profile
              </button>
            </div>

            <div className="card-ui" style={{ padding: "24px", marginBottom: "24px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "24px" }}>
                <div style={{ flex: "0 0 auto", margin: "0 auto" }}>
                  <img
                    src="https://i.imgur.com/sjLMNDM.png"
                    alt="profile"
                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%", border: "3px solid var(--border)", padding: "4px" }}
                  />
                </div>

                <div style={{ flex: "1 1 250px" }}>
                  <h3 style={{ margin: "0 0 8px 0", textTransform: "capitalize", fontSize: "1.5rem", fontWeight: "700" }}>
                    {profile?.firstname} {profile?.lastname}
                  </h3>
                  <p className="muted" style={{ margin: "0 0 16px 0", fontSize: "1rem" }}>{profile?.email}</p>
                  <p style={{ margin: "0" }}>
                    <span className="badge-income" style={{ padding: "8px 14px", fontSize: "0.85rem" }}>Records Created: {totalRecords}</span>
                  </p>
                </div>

                <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <button
                    onClick={() => history.push("/user-expenses")}
                    className="btn btn-profile-outline"
                    style={{ width: "100%" }}
                  >
                    View Expenses History
                  </button>
                  <button
                    onClick={() => history.push("/user-income")}
                    className="btn btn-profile-outline"
                    style={{ width: "100%" }}
                  >
                    View Income History
                  </button>
                </div>
              </div>
            </div>

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