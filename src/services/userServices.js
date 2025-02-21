import { client, databases } from "@/lib/appwrite/appwrite";
import { Account, Databases, ID } from "appwrite";

class UserServices {
  constructor() {
    this.client = client;
    this.databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    this.userCollectionId = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
    this.databases = databases;
  }

  async addUserIntoDb({ data }) {
    try {
      const response = await this.databases.createDocument(
        this.databaseId,
        this.userCollectionId,
        ID.unique(),
        { ...data }
      );
      console.log("User added:", response);
      return response;
    } catch (error) {
      console.error("Error adding user to DB:", error);
      throw error;
    }
  }
}

export const userServices = new UserServices();
