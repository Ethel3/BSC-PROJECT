const errorHandler = (err, req, res, next)=>{
    const message = err.message || "Something went wrong"
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        message,
        success: false,
        stack: process.env.NODE_ENV !== "development" ? null : err.stack
    });
}

export default errorHandler;