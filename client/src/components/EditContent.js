import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'


import DisabledButton from "./DisableButton";
import { updateExpAction } from "../redux/slices/expenses/expenseStatSlice";
import {  updateIncomeAction } from "../redux/slices/income/incomeSlices";

const EditContent = ({
  location: {
    state: { item },
  },
}) => {

  //dispatch
  const dispatch = useDispatch();
  //formik form
  const formik = useFormik({
    initialValues: {
      title: item?.title,
      note: item?.note,
      amount: item?.amount,
      date:item?.date,
    },
    onSubmit: values => {
      const data = {
        ...values,
        id: item?._id,
      };
      item?.type === "income"
        ? dispatch(updateIncomeAction(data))
        : dispatch(updateExpAction(data));
    },
  });

  //get data form store
  // const history = useHistory();
  const expenseData = useSelector(state => state.expenses);
  const { appErr, serverErr, expenseUpdated, loading } = expenseData;

  return (
    <section className="app-container">
      <div className="form-card">
        <h2 className="auth-title mb-1">
          {item?.type === "income" ? "Update Income" : "Update Expense"}
        </h2>
        <p className="auth-subtitle mb-3">Update your transaction details</p>
        <div className="auth-divider" />

        {(appErr || serverErr) && (
          <div className="alert alert-danger" role="alert">
            {serverErr} {appErr}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              value={formik.values.title}
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              className="form-control"
              type="text"
              placeholder="Enter Title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Note</label>
            <input
              value={formik.values.note}
              onChange={formik.handleChange("note")}
              onBlur={formik.handleBlur("note")}
              className="form-control"
              type="text"
              placeholder="Enter note"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Amount (Rs.)</label>
            <input
              value={formik.values.amount}
              onChange={formik.handleChange("amount")}
              onBlur={formik.handleBlur("amount")}
              className="form-control"
              type="number"
              placeholder="Enter Amount"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Date</label>
            <input
              value={formik.values.date}
              onChange={formik.handleChange("date")}
              onBlur={formik.handleBlur("date")}
              className="form-control"
              type="date"
            />
          </div>

          {loading ? (
            <DisabledButton />
          ) : (
            <button type="submit" className="btn btn-primary w-100 mt-2">
              Update
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default EditContent;