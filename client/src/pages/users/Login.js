import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUserAction } from "../../redux/slices/users/usersSlices";
import DisabledButton from "../../components/DisableButton";

// Form validations
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.users);
  const { userAppErr, userServerErr, userLoading, userAuth } = user;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUserAction(values));
    },
    validationSchema: formSchema,
  });

  // Redirect
  useEffect(() => {
    if (userAuth) {
      userAuth?.isAdmin ? history.push("/dashboard") : history.push("/profile");
    }
  }, [userAuth, history]);

  return (
    <section className="app-container auth-page-bg">
      <div className="auth-card" style={{ maxWidth: "460px", margin: "0 auto" }}>
        <div className="text-center">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Login to your account to continue</p>
        </div>
        
        <div className="auth-divider" />

        {/* Error Message */}
        {(userAppErr || userServerErr) && (
          <div className="alert alert-danger p-3 mb-4 rounded-3" role="alert" style={{ fontSize: "0.95rem" }}>
            {userServerErr} {userAppErr}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
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
              placeholder="Enter your password"
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
                Login
              </button>
            )}
          </div>

          <div className="text-center mt-4 muted" style={{ fontSize: "0.95rem" }}>
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;