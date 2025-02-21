import { Account, Client, ID, Models } from "appwrite";
import { AuthError } from "./errors";
import { client } from "@/lib/appwrite/appwrite";

class AuthServices {
  private client: Client;
  private account: Account;

  constructor() {
    this.client = client;
    this.account = new Account(this.client);
  }

  async createAccount({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<Models.User<Models.Preferences>> {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      this.login({ email, password });
      return user;
    } catch (error) {
      throw AuthError.fromAppwriteError(error);
    }
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Models.Session> {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      throw AuthError.fromAppwriteError(error);
    }
  }

  async sendOTP({ phoneNumber }: { phoneNumber: string }): Promise<string> {
    try {
      const token = await this.account.createPhoneToken(
        ID.unique(),
        phoneNumber
      );
      console.log(phoneNumber);
      console.log(token);
      return token.userId;
    } catch (error) {
      throw AuthError.fromAppwriteError(error);
    }
  }

  async verifyOTP({
    userId,
    otp,
  }: {
    userId: string;
    otp: string;
  }): Promise<Models.Session> {
    try {
      const session = await this.account.createSession(userId, otp);
      console.log(session);
      return session;
    } catch (error) {
      console.log(error);
      throw AuthError.fromAppwriteError(error);
    }
  }

  async getCurrentUser(): Promise<
    Models.User<Models.Preferences> | null | undefined
  > {
    try {
      const user = await this.account.get();
      return user;
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AuthError) {
        error.log();
      }
      return undefined;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSessions();
      console.log("user logged out");
    } catch (error) {
      throw AuthError.fromAppwriteError(error);
    }
  }
}

const authServices = new AuthServices();

export { authServices };
