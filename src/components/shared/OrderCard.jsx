import React, { useEffect, useState } from "react";
import { productServices } from "@/services/productServices";

const OrderCard = ({ order, onAccept, onCancel, isManagePage = false }) => {
  const [product, setProduct] = useState(null);

  const getProductInfo = async () => {
    try {
      const res = await productServices.getProductById(order.productId);
      setProduct(res);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getProductInfo();
  }, [order.productId]);

  if (!product) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.media[0]}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {product.title}
        </h2>
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">Quantity: {order.quantity}</p>
          <p className="text-gray-600">₹{order.totalAmount}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">Status:</p>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              order.orderStatus === "completed"
                ? "bg-green-100 text-green-700"
                : order.orderStatus === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {order.orderStatus}
          </span>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
          View Details
        </button>

        {/* Show Accept & Cancel Buttons ONLY in ManageOrders */}
        {isManagePage && order.orderStatus === "pending" && (
          <div className="mt-4 flex gap-3">
            <button
              onClick={onAccept}
              className="w-1/2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Accept
            </button>
            <button
              onClick={onCancel}
              className="w-1/2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
