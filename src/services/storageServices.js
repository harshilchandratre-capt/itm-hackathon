import { Storage, ID } from "appwrite";
import { client } from "@/lib/appwrite/appwrite";

class StorageServices {
  constructor() {
    this.bucketId = import.meta.env.VITE_APPWRITE_ASSETS_BUCKET_ID;
    this.storage = new Storage(client);
  }

  async uploadFile(file) {
    try {
      if (!file) throw new Error("No file provided.");

      const response = await this.storage.createFile(
        this.bucketId,
        ID.unique(),
        file
      );

      const previewUrl = this.storage.getFilePreview(
        this.bucketId,
        response.$id
      );

      console.log("File uploaded successfully:", response);
      return { response, previewUrl };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(this.bucketId, fileId);
  }
}

export const storageServices = new StorageServices();
