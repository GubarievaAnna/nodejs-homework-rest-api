const app = require("./app");
const { connect } = require("mongoose");
require("dotenv").config();

connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection successful");

    app.listen(process.env.PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
