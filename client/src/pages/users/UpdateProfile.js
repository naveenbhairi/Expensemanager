import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateProfileAction } from "../../redux/slices/users/usersSlices";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import DisabledButton from "../../components/DisableButton";

//form validations
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
});

const UpdateProfile = ({ location: { state } }) => {
  //history
  const history = useHistory();
  //get data from store
  const user = useSelector(state => state?.users);
  const { userAppErr, userServerErr, userLoading, isEdited } = user;

  //dispatch
  const dispatch = useDispatch();
  //formik form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: state?.user?.email,
      firstname: state?.user?.firstname,
      lastname: state?.user?.lastname,
    },

    onSubmit: values => {
      dispatch(updateProfileAction(values));
    },
    validationSchema: formSchema,
  });
  //redirect
  useEffect(() => {
    if (isEdited) history.push("/profile");
  }, [isEdited, dispatch]);
  return (
    <>
      {userAppErr || userServerErr ? (
        <ErrorDisplayMessage>
          {userServerErr} {userAppErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="pal-1 " style={{background:"#c4d3f6"}}>
          <div className="container text-center">
            <div className="row mb-4">
              <div className="col-12 col-md-10 col-lg-5 mx-auto">
                <div className="p-5 shadow-sm  rounded bg-white">
                  <form onSubmit={formik.handleSubmit}>
                  <h3 className="mb-4 fw-light">Update Profile</h3>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.firstname}
                        onBlur={formik.handleBlur("firstname")}
                        onChange={formik.handleChange("firstname")}
                        className="form-control"
                        type="text"
                        placeholder="Enter firstname"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.lastname}
                        onBlur={formik.handleBlur("lastname")}
                        onChange={formik.handleChange("lastname")}
                        className="form-control"
                        type="text"
                        placeholder="Enter lastname"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.email}
                        onBlur={formik.handleBlur("email")}
                        onChange={formik.handleChange("email")}
                        className="form-control"
                        type="email"
                        placeholder="Enter email"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.email && formik.errors.email}
                    </div>

                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      {userLoading ? (
                        <DisabledButton />
                      ) : (
                        <button type="submit" class="btn btn-warning">
                          Update
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UpdateProfile;