import { client, databases } from "@/lib/appwrite/appwrite";
import { ID, Query } from "appwrite";

class OrderServices {
  constructor() {
    this.client = client;
    this.databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    this.ordersCollectionId =
      import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID;
    this.databases = databases;
  }

  async placeOrder({ order }) {
    try {
      const response = await this.databases.createDocument(
        this.databaseId,
        this.ordersCollectionId,
        ID.unique(),
        { ...order }
      );
      return response;
    } catch (error) {
      console.error("Error adding order to DB:", error);
      throw error;
    }
  }

  async getOrdersByBuyerId(buyerId) {
    try {
      const response = await this.databases.listDocuments(
        this.databaseId,
        this.ordersCollectionId,
        [Query.equal("buyerId", buyerId)]
      );
      return response.documents;
    } catch (error) {
      console.error("Error fetching orders by buyerId:", error);
      throw error;
    }
  }
  async getOrdersBySellerId(sellerId) {
    try {
      const response = await this.databases.listDocuments(
        this.databaseId,
        this.ordersCollectionId,
        [Query.equal("sellerId", sellerId)]
      );
      return response.documents;
    } catch (error) {
      console.error("Error fetching orders by buyerId:", error);
      throw error;
    }
  }
  async updateOrderField(orderId, field, value) {
    try {
      const response = await this.databases.updateDocument(
        this.databaseId,
        this.ordersCollectionId,
        orderId,
        { [field]: value }
      );
      return response;
    } catch (error) {
      console.error("Error updating order field:", error);
      throw error;
    }
  }
  async updateOrderStatus(orderId, orderStatus) {
    try {
      const response = await this.databases.updateDocument(
        this.databaseId,
        this.ordersCollectionId,
        orderId,
        { orderStatus }
      );
      return response;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  }
}

export const orderServices = new OrderServices();
