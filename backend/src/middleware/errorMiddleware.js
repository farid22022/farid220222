import multer from "multer";

export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  let statusCode = error.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  let message = error.message || "Internal server error";

  if (error instanceof multer.MulterError) {
    statusCode = 400;
    message = error.code === "LIMIT_FILE_SIZE" ? "Each image must be 8 MB or smaller" : error.message;
  } else if (error.name === "ValidationError" || error.name === "CastError") {
    statusCode = 400;
  } else if (error.code === 11000) {
    statusCode = 409;
    message = "A record with that value already exists";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack
  });
}
