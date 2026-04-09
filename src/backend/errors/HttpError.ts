export type HttpErrorCode =
  | 'BAD_REQUEST'
  | 'VALIDATION_ERROR'
  | 'UNPROCESSABLE_ENTITY'
  | 'INTERNAL_SERVER_ERROR'
  | 'NOT_FOUND';

type HttpErrorParams = {
  statusCode: number;
  code: HttpErrorCode;
  message: string;
  details?: unknown;
};

export class HttpError extends Error {
  readonly statusCode: number;
  readonly code: HttpErrorCode;
  readonly details?: unknown;

  constructor({ statusCode, code, message, details }: HttpErrorParams) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string, details?: unknown) {
    super({
      statusCode: 400,
      code: 'BAD_REQUEST',
      message,
      details,
    });
  }
}

export class ValidationError extends HttpError {
  constructor(message: string, details?: unknown) {
    super({
      statusCode: 422,
      code: 'VALIDATION_ERROR',
      message,
      details,
    });
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message: string, details?: unknown) {
    super({
      statusCode: 422,
      code: 'UNPROCESSABLE_ENTITY',
      message,
      details,
    });
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Not found', details?: unknown) {
    super({
      statusCode: 404,
      code: 'NOT_FOUND',
      message,
      details,
    });
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string = 'Internal server error', details?: unknown) {
    super({
      statusCode: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message,
      details,
    });
  }
}

export function normalizeHttpError(error: unknown): HttpError {
  if (error instanceof HttpError) {
    return error;
  }

  if (error instanceof Error) {
    return new InternalServerError(error.message);
  }

  return new InternalServerError();
}
