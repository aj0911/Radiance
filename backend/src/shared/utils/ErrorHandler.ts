
export default class ErrorHandler extends Error {

    status: number;

    constructor(message: string, status: number) {
      super(message);
      this.status = status;
  
      // Captures the stack trace for the error
      Error.captureStackTrace(this, this.constructor);
    }
  }