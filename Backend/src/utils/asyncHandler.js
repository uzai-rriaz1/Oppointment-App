const asyncHandler = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    next(error)
    res.status(100).json({
      success: false,
      message: error.message,
    });
  }
};

export { asyncHandler };
