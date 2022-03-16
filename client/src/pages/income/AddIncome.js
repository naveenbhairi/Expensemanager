import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useHistory ,Link} from "react-router-dom";
import '../../App.css'
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { createIncomeAction } from "../../redux/slices/income/incomeSlices";
import DisabledButton from "../../components/DisableButton";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
//form validations
const formSchema = Yup.object({
  title: Yup.string().required("title is required"),
  note: Yup.string().required("note is required"),
  amount: Yup.number().required("income Amount is required"),
  date: Yup.date().required("Date is required")
});

const AddIncome = () => {
  const history = useHistory();
  //dispatch
  const dispatch = useDispatch();
  //formik form
  const formik = useFormik({
    initialValues: {
      title: "",
      note: "",
      amount: "",
      date:""
    },
    onSubmit: values => {
      dispatch(createIncomeAction(values));
    },
    validationSchema: formSchema,
  });

  //Get expense created from store
  const state = useSelector(state => state.income);
  const { loading, appErr, serverErr,  isIncCreated } = state;

  //Redirect
  useEffect(() => {
    if (isIncCreated) history.push("/profile");
  }, [isIncCreated, dispatch]);
  return (
    <>
      <section className="pal" style={{ "background-color": "#c4d3f6"}}>
        <div className="container text-center">
          
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <h2 className="mb-4 fw-light">Record New Income</h2>
                  {/* Display income Err */}
                  {serverErr || appErr ? (
                    <ErrorDisplayMessage>
                      {serverErr} {appErr}
                    </ErrorDisplayMessage>
                  ) : null}
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.title}
                      onChange={formik.handleChange("title")}
                      onBlur={formik.handleBlur("title")}
                      className="form-control"
                      type="text"
                      placeholder="Enter Title"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.title && formik.errors.title}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.amount}
                      onChange={formik.handleChange("amount")}
                      onBlur={formik.handleBlur("amount")}
                      className="form-control"
                      type="number"
                      placeholder="Enter Income Amount"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.amount && formik.errors.amount}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.date}
                      onChange={formik.handleChange("date")}
                      onBlur={formik.handleBlur("date")}
                      className="form-control"
                      type="date"
                      placeholder="Enter date"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.date && formik.errors.date}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.note}
                      onChange={formik.handleChange("note")}
                      onBlur={formik.handleBlur("note")}
                      className="form-control"
                      type="text"
                      placeholder="Enter note"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.note && formik.errors.note}
                  </div>
                  {loading ? (
                    <DisabledButton />
                  ) : (
                    <button type="submit" className="btn btn-warning mb-4 w-100">
                      Record Income
                    </button>
                  )}

                  <div>
                    <h3 className="mb-2 fw-light">For Expense</h3>
                  <Link to="/add-expense" className="btn btn-warning me-2">
                click here
              </Link>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddIncome;