import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateProfileAction } from "../../redux/slices/users/usersSlices";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import DisabledButton from "../../components/DisableButton";
import "../../App.css";

// Form validation
const formSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter a valid email"),
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
});

const UpdateProfile = ({ location: { state } }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.users);
  const { userAppErr, userServerErr, userLoading, isEdited } = user;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: state?.user?.email || "",
      firstname: state?.user?.firstname || "",
      lastname: state?.user?.lastname || "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      dispatch(updateProfileAction(values));
    },
  });

  // Redirect after successful update
  useEffect(() => {
    if (isEdited) history.push("/profile");
  }, [isEdited, history]);

  return (
    <section className="app-container auth-page-bg">
      <div className="auth-card" style={{ maxWidth: "720px" }}>
        <div className="text-center">
          <h2 className="auth-title">Update Profile</h2>
          <p className="auth-subtitle">Edit your personal details</p>
          <div className="auth-divider" />
        </div>

        {(userAppErr || userServerErr) && (
          <ErrorDisplayMessage>
            {userServerErr} {userAppErr}
          </ErrorDisplayMessage>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label fw-semibold">First Name</label>
              <input
                name="firstname"
                value={formik.values.firstname}
                onBlur={formik.handleBlur("firstname")}
                onChange={formik.handleChange("firstname")}
                className="form-control"
                type="text"
                placeholder="Enter first name"
              />
              <div className="text-danger mt-1 small">
                {formik.touched.firstname && formik.errors.firstname}
              </div>
            </div>

            <div className="col-12 col-md-6 mb-3">
              <label className="form-label fw-semibold">Last Name</label>
              <input
                name="lastname"
                value={formik.values.lastname}
                onBlur={formik.handleBlur("lastname")}
                onChange={formik.handleChange("lastname")}
                className="form-control"
                type="text"
                placeholder="Enter last name"
              />
              <div className="text-danger mt-1 small">
                {formik.touched.lastname && formik.errors.lastname}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur("email")}
              onChange={formik.handleChange("email")}
              className="form-control"
              type="email"
              placeholder="Enter email"
            />
            <div className="text-danger mt-1 small">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>

          <div className="d-flex gap-2 mt-3">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => history.push("/profile")}
            >
              Cancel
            </button>

            {userLoading ? (
              <DisabledButton />
            ) : (
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;