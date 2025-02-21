import { Account } from "appwrite";

class AuthServices {
  client;
  account;

  constructor() {
    this.client = client;
    this.account = new Account(this.client);
  }

  async createAccount() {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}

const authServices = new AuthServices();

export default authServices;
