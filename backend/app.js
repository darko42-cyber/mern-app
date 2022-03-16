const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const fileUpload = require("express-fileupload");
const bodyPasser = require("body-parser");

const path = require("path");

//? config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
app.use(express.json());
app.use(cookieParser());
app.use(bodyPasser.urlencoded({ extended: true }));
app.use(fileUpload());

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../commerce/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../commerce/build/index.html"));
});

//* middleware for error
app.use(errorMiddleware);

module.exports = app;
