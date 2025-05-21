import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './customError';

class UnauthenticatedError extends CustomAPIError {
  statusCode: number;

  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;