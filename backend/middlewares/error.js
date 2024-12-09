function ErrorHandler(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Handle invalid ObjectId (CastError)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle duplicate key errors (E11000)
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue)[0];
    const message = `Duplicate field value entered: ${duplicateField}`;
    err = new ErrorHandler(message, 400);
  }

  // Generic error response
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
