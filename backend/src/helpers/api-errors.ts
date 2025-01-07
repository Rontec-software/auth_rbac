export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly field?: string;

  constructor(message: string, statusCode: number, field?: string) {
    super(message);
    this.statusCode = statusCode;
    this.field = field;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}
