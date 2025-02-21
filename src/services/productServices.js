import { client, databases } from "@/lib/appwrite/appwrite";
import { ID, Query } from "appwrite";

class ProductServices {
  constructor() {
    this.client = client;
    this.databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    this.productsCollectionId =
      import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID;
    this.databases = databases;
  }

  async addProduct({ product }) {
    try {
      const response = await this.databases.createDocument(
        this.databaseId,
        this.productsCollectionId,
        ID.unique(),
        { ...product }
      );
      return response;
    } catch (error) {
      console.error("Error adding product to DB:", error);
      throw error;
    }
  }

  async fetchProducts({ limit = 5, offset = 0 }) {
    try {
      const response = await this.databases.listDocuments(
        this.databaseId,
        this.productsCollectionId,
        [Query.limit(limit), Query.offset(offset)]
      );
      return response.documents;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const response = await this.databases.getDocument(
        this.databaseId,
        this.productsCollectionId,
        productId
      );
      return response;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  }
}

export const productServices = new ProductServices();
