class apiError extends Error {
  constructor(
    statuscode,
    message,

    errors = [],
    stack = "",
  ) {
    (super(message),
      (this.statuscode = statuscode),
      (this.success = false),
      (this.errors = errors),
      (this.message = message));
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { apiError };
