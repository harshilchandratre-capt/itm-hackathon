export class AuthError extends Error {
  code: number;
  success: boolean;
  originalError?: any;

  constructor(message: string, code: number = 0, originalError?: any) {
    super(message);
    this.name = "AuthError";
    this.code = code;
    this.success = false;
    this.originalError = originalError;

    Object.setPrototypeOf(this, AuthError.prototype);
  }

  static fromAppwriteError(error: any): AuthError {
    return new AuthError(
      error.message || "Authentication failed",
      error.code,
      error
    );
  }

  log() {
    console.error(
      `AuthError (${this.code}): ${this.message}`,
      this.originalError
    );
  }
}
