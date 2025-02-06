import { AxiosResponse, AxiosError } from "axios";


export class CodedError extends Error {
    public code: string;
    public statusCode: number;
    public response: AxiosResponse;
    public isRecoverable: boolean;

    constructor(message: string, code: string, statusCode: number, name = 'CodedError') {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.name = name;
    }
}

export class InternalServerError extends CodedError {
    constructor(message: string, name = 'InternalServerError') {
        super(message, 'E501', 500, name);
    }
}

export class BadRequestError extends CodedError {
    constructor(message: string, name = 'BadRequestError', code = 'E400') {
        super(message, code, 400, name);
    }
}

export class AuthorizationError extends CodedError {
    constructor(message: string, name = 'AuthorizationError', code = 'E401') {
        super(message, code, 401, name);
    }
}

export class ForbiddenError extends CodedError {
    constructor(message: string, name = 'ForbiddenError') {
        super(message, 'E403', 403, name);
    }
}

export class NotFoundError extends CodedError {
    constructor(message: string, name = 'NotFoundError', code = 'E404') {
        super(message, code, 404, name);
    }
}

export class ConflictError extends CodedError {
    constructor(message: string, name = 'ConflictError', code = 'E409') {
        super(message, code, 409, name);
    }
}

export class UnprocessableEntityError extends CodedError {
    constructor(message: string, name = 'UnprocessableEntityError', code = 'E422') {
        super(message, code, 422, name);
    }
}


export class DatabasePrimaryKeyViolationError extends CodedError {
    constructor(message: string) {
        super(message, 'E400', 400, 'DatabasePrimaryKeyViolationError');
    }
}

export class DatabaseUnknownError extends CodedError {
    constructor(message: string) {
        super(message, 'E500', 500, 'DatabaseUnknownError');
    }
}

export class DatabaseForeignKeyViolationError extends CodedError {
    constructor(message: string) {
        super(message, 'E400', 400, 'DatabaseForeignKeyViolationError');
    }
}

export class UnSupportedModeError extends BadRequestError {
    constructor(message: string) {
        super(message, 'UnSupportedModeError', 'E203');
    }
}

export class UnexpectedDBResult extends BadRequestError {
    constructor(message: string) {
        super(message, 'UnexpectedDBResult', 'E204');
    }
}

export class InvalidOrExpiredTokenError extends AuthorizationError {
    constructor(message: string) {
        super(message, 'InvalidOrExpiredTokenError', undefined);
    }
}

export class AccountAlreadyExistsError extends BadRequestError {
    constructor(message: string) {
        super(message, 'AccountAlreadyExistsError', 'E202');
    }
}

export class AccountNotEnabledError extends BadRequestError {
    constructor(message: string) {
        super(message, 'AccountNotEnabledError', 'E203');
    }
}

export class EmailNotValidError extends BadRequestError {
    constructor(message: string) {
        super(message, 'EmailNotValidError', 'E203');
    }
}

export class TimeoutError extends CodedError {
    constructor(message: string = "Timeout error") {
        super(message, 'E502', 500, "TimeoutError");
    }
}




/**
 * Typeguard for AxiosError
 */
export const isAxiosError = (error: Error): error is AxiosError => {
    const maybeAxiosError = (error as AxiosError);
    return !!maybeAxiosError.response && !!maybeAxiosError.response.status;
}


export const isCodedError = (error: Error): error is CodedError => {
    const isCodedError = (error as CodedError);
    return !!isCodedError.code && !!isCodedError.statusCode;
}

export enum AUTH_ERROR {
    INVALID_CREDENTIAL = "auth/invalid-credential",
    ACCOUNT_ALREADY_EXIST = 'auth/email-already-exists',
    EMAIL_NOT_EXIST = 'auth/user-not-found',
    ACCOUNT_NOT_ENABLED = "auth/user-disabled"
}
