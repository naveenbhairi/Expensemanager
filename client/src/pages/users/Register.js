import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { registerUserAction } from "../../redux/slices/users/usersSlices";
import DisabledButton from "../../components/DisableButton";
 import './css/main.css'
//form validations
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
});

const Register = () => {
  //history
  const history = useHistory();
  //get data from store
  const user = useSelector(state => state?.users);
  const { userAppErr, userServerErr, userLoading, isRegistered } = user;

  //dispatch
  const dispatch = useDispatch();
  //formik form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    onSubmit: values => {
      dispatch(registerUserAction(values));
    },
    validationSchema: formSchema,
  });

  // Redirect
  useEffect(() => {
    if (isRegistered) {
      history.push("/login");

    }
  }, [isRegistered]);

  return (
    <>
  
    
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
        <h2 className="display-5 fw-bold mt-5 text-dark">
                Keep Track of your income and expenses flow
              </h2>
				</div>

				<form class="login100-form validate-form" onSubmit={formik.handleSubmit}>
        <span class="login100-title mt-4">
					 User Registration
					</span>
             {/* Display err here */}
             {userAppErr || userServerErr ? (
                  <div class="alert alert-danger" role="alert">
                    {userServerErr} {userAppErr}
                  </div>
                ) : null}

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input
             value={formik.values.firstname}
             onChange={formik.handleChange("firstname")}
             onBlur={formik.handleBlur("firstname")}
             class="input100"
             type="text"
              name="email"
               placeholder=" Firstname"/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-user" aria-hidden="true"></i>
						</span>
					</div>
          <div className="text-danger mb-2">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
          <div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input
              value={formik.values.lastname}
              onChange={formik.handleChange("lastname")}
              onBlur={formik.handleBlur("lastname")}
             class="input100" 
             type="lastname"
              name="pass"
               placeholder="Lastname"/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-user" aria-hidden="true"></i>
						</span>
					</div>
          <div className="text-danger mb-2">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
          <div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
             class="input100" type="email" name="pass" placeholder="Email"/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class=" fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>
          <div className="text-danger mb-2">
                  {formik.touched.email && formik.errors.email}
                </div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input
             value={formik.values.password}
             onChange={formik.handleChange("password")}
             onBlur={formik.handleBlur("password")}
             class="input100" type="password" name="pass" placeholder="Password"/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
          <div className="text-danger mb-2">
                  {formik.touched.password && formik.errors.password}
                </div>
                {userLoading ? (
                  <DisabledButton />
                ) : (
                  <button
                    type="submit"
                    className="login100-form-btn"
                  >
                    Register
                  </button>
                )}
						</form>
			</div>
		</div>
	</div>
	

    </>
  );
};

export default Register;