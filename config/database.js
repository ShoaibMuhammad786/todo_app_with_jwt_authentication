const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(`Database connected`);
  } catch (error) {
    console.log(`Error while connecting database >>>>`, error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
