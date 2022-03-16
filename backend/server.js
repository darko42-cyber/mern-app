const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinay = require("cloudinary");



//!uncaughtException
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("shutting server due to Uncaught Exception");
  process.exit(1);
});
//? config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//todo connection to database
connectDatabase();

cloudinay.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_secret: process.env.CLOUDINARY_API_SECREET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

//? Unhandled promise rejection

process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("shouting the server due to unhandledRejection");
  server.close(() => {
    process.exit(1);
  });
});
