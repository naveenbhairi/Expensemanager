import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createExpAction } from "../../redux/slices/expenses/expenseStatSlice";
import DisabledButton from "../../components/DisableButton";
import "../../App.css";

// Validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .positive("Amount must be greater than 0"),
  date: Yup.string().required("Date is required"),
  note: Yup.string().required("Note is required"),
});

const AddExpense = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Safely check for both singular and plural state names, and grab the correct success flag
  const expenseState = useSelector((state) => state?.expenses || state?.expense);
  const { loading, appErr, serverErr, isCreated, isExpCreated } = expenseState || {};

  const formik = useFormik({
    initialValues: {
      title: "",
      amount: "",
      date: "",
      note: "",
      type: "expense",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
dispatch(createExpAction(values));    },
  });

  React.useEffect(() => {
    if (isCreated || isExpCreated) history.push("/profile");
  }, [isCreated, isExpCreated, history]);

  return (
    <section className="app-container">
      <div className="form-card">
        <h2 className="auth-title mb-1">Add Expense</h2>
        <p className="auth-subtitle mb-3">Record a new expense transaction</p>
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
              type="text"
              name="title"
              className="form-control"
              placeholder="e.g. Groceries"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="text-danger small mt-1">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Amount (Rs.)</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              placeholder="e.g. 1200"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="text-danger small mt-1">
              {formik.touched.amount && formik.errors.amount}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="text-danger small mt-1">
              {formik.touched.date && formik.errors.date}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Note</label>
            <textarea
              name="note"
              rows="1"
              className="form-control"
              placeholder="Add short description"
              value={formik.values.note}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="text-danger small mt-1">
              {formik.touched.note && formik.errors.note}
            </div>
          </div>

          {loading ? (
            <DisabledButton />
          ) : (
            <button type="submit" className="btn btn-primary w-100">
              Add Expense
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default AddExpense;