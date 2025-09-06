const app = require("./app");
const PORT = process.env.PORT;
const connectDatabase = require("./config/database");

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on PORT >>>", PORT);
    });
  })
  .catch((err) => {
    console.log(`Server crashed >>>>`, err.message);
    process.exit(1);
  });
