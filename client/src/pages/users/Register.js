import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import * as Yup from "yup";
import { registerUserAction } from "../../redux/slices/users/usersSlices";
import DisabledButton from "../../components/DisableButton";

// Form validations
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
});

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.users);
  const { userAppErr, userServerErr, userLoading, isRegistered } = user;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    onSubmit: (values) => {
      dispatch(registerUserAction(values));
    },
    validationSchema: formSchema,
  });

  // Redirect
  useEffect(() => {
    if (isRegistered) {
      history.push("/login");
    }
  }, [isRegistered, history]);

  return (
    <section className="app-container auth-page-bg">
      <div className="auth-card" style={{ maxWidth: "460px", margin: "0 auto" }}>
        <div className="text-center">
          <h2 className="auth-title">Create an Account</h2>
          <p className="auth-subtitle">Join us to manage your expenses</p>
        </div>
        
        <div className="auth-divider" />

        {/* Error Message */}
        {(userAppErr || userServerErr) && (
          <div className="alert alert-danger p-3 mb-4 rounded-3" role="alert" style={{ fontSize: "0.95rem" }}>
            {userServerErr} {userAppErr}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* First Name Input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">First Name</label>
            <input
              value={formik.values.firstname}
              onChange={formik.handleChange("firstname")}
              onBlur={formik.handleBlur("firstname")}
              className="form-control"
              type="text"
              name="firstname"
              placeholder="Enter your first name"
            />
            <div className="text-danger mt-1 small">
              {formik.touched.firstname && formik.errors.firstname}
            </div>
          </div>

          {/* Last Name Input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Last Name</label>
            <input
              value={formik.values.lastname}
              onChange={formik.handleChange("lastname")}
              onBlur={formik.handleBlur("lastname")}
              className="form-control"
              type="text"
              name="lastname"
              placeholder="Enter your last name"
            />
            <div className="text-danger mt-1 small">
              {formik.touched.lastname && formik.errors.lastname}
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              className="form-control"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
            <div className="text-danger mt-1 small">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              className="form-control"
              type="password"
              name="password"
              placeholder="Create a password"
            />
            <div className="text-danger mt-1 small">
              {formik.touched.password && formik.errors.password}
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-grid mt-4">
            {userLoading ? (
              <div className="text-center"><DisabledButton /></div>
            ) : (
              <button type="submit" className="btn btn-primary w-100 py-2">
                Register
              </button>
            )}
          </div>

          <div className="text-center mt-4 muted" style={{ fontSize: "0.95rem" }}>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;