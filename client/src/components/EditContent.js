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
    <section className="pal-6 bg-secondary ">
      <div className="container text-center">
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-white">
              <form onSubmit={formik.handleSubmit}>
                {/* Display Err */}
                {appErr || serverErr ? <div>Err</div> : null}
                {item?.type === "income" ? (
                  <h2>Update Income</h2>
                ) : (
                  <h2>Update Expense</h2>
                )}
                
                <div className="mb-4 mt-4 input-group">
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Title"
                  />
                </div>
                <div className="mb-4 input-group">
                  <input
                    value={formik.values.note}
                    onChange={formik.handleChange("note")}
                    onBlur={formik.handleBlur("note")}
                    className="form-control"
                    type="text"
                    placeholder="Enternote"
                  />
                </div>
                <div className="mb-4 input-group">
                  <input
                    value={formik.values.amount}
                    onChange={formik.handleChange("amount")}
                    onBlur={formik.handleBlur("amount")}
                    className="form-control"
                    type="number"
                    placeholder="Enter Amount"
                  />
                </div>
                <div className="mb-4 input-group">
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
                  <button type="submit" className="btn btn-primary w-100"> 
                  update 
                  </button> 
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditContent;