import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67b82b820003ad4901ce");

export const account = new Account(client);
export { ID } from "appwrite";
