const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/UserRatingRoute");
const app = express();

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("DB CONNECTION SUCCESFULLY");
  })
  .catch((err) => {
    console.log("connection failed due to :", err);
  });

app.use(express.json());
app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is runnig on ${process.env.PORT}`);
});
