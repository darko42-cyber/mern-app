const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //? Wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resources not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  //! Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  //* jsonwebtoken error
  if (err.name === "jsonWebTokenError") {
    const message = `Json Web Token is invalid, try again`
    err = new ErrorHandler(message, 400);
  }
  //? Jwt expired error 
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired try again`
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
