const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`DB connected Successfully`);
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};
// process.env.MONGO_URL
module.exports = dbConnect;
// k2yn2SKiXnqFECK1
//mongodb+srv://sravan:k2yn2SKiXnqFECK1@expence-manager.kynjs.mongodb.net/expence-manager?retryWrites=true&w=majority