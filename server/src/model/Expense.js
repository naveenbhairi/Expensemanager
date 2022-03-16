const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
//schema
const expensSchema = mongoose.Schema(
  {
    title: {
      required: [true, "Title  is required"],
      type: String,
    },
    note: {
      required: [true, "note is required"],
      type: String,
    },
    type: {
      type: String,
      default: "expense",
    },
    amount: {
      required: [true, "Amount is required"],
      type: Number,
    },
    date:{
      required: [true, "Date is required"],
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, //MUST BE MONGODB ID
      ref: "User",
      required: [true, "User ID is required"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamp: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

//pagination
expensSchema.plugin(mongoosePaginate);
const Expense = mongoose.model("Expense", expensSchema);

module.exports = Expense;