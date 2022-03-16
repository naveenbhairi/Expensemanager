import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createExpAction } from "../../redux/slices/expenses/expenseStatSlice"
import DisabledButton from "../../components/DisableButton";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";

//form validations
const formSchema = Yup.object({
  title: Yup.string().required("title is required"),
  note: Yup.string().required("note: is required"),
  amount: Yup.number().required(" Expense Amount is required"),
  date: Yup.date().required("Date is required"),
});

const AddExpense = props => {
  const history = useHistory();
  //dispatch
  const dispatch = useDispatch();
  //formik form
  const formik = useFormik({
    initialValues: {
      title: "",
      note: "",
      amount: "",
      date: "",
    },
    onSubmit: values => {
      dispatch(createExpAction(values));
    },
    validationSchema: formSchema,
  });

  //Get expense created from store
  const state = useSelector(state => state.expenses);
  const { loading, appErr, serverErr, expenseCreated, isExpCreated } = state;

  //Redirect
  useEffect(() => {
    if (isExpCreated) history.push("/profile");
  }, [isExpCreated, dispatch]);
  return (
    <>
      <section className="pal" style={{ "background": "#c4d3f6"}}>
        <div className="container text-center">
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <h2 className="mb-4 fw-light">Record New Expense</h2>
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
                      placeholder="Enter Expense Amount"
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
                      placeholder="Enter Date"
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
                      placeholder="Enter Note"
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
                      Record Expense
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddExpense;