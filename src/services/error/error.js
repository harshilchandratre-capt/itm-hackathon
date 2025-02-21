export class AuthError extends Error {
  code;
  success;
  originalError;

  constructor(message, code = 0, originalError) {
    super(message);
    this.name = "AuthError";
    this.code = code;
    this.success = false;
    this.originalError = originalError;

    Object.setPrototypeOf(this, AuthError.prototype);
  }

  static fromAppwriteError(error) {
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
