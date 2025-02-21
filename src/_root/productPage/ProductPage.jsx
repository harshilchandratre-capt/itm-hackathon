import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productServices } from "@/services/productServices";
import { productsContext } from "@/context/productsContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const ProductPage = () => {
  const { id } = useParams();
  const { products, fetchProductById } = useContext(productsContext);
  const [product, setProduct] = useState(products[id] || null);
  const [loading, setLoading] = useState(!product);
  const [orderQuantity, setOrderQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      if (product) return;
      try {
        setLoading(true);
        const fetchedProduct = await productServices.getProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id, product]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <img
              src={product.media[0]}
              alt={product.title}
              className="w-full h-96 object-cover"
            />
          </motion.div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              <p className="text-gray-700 text-lg mb-6">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold text-green-600">
                  ₹{product.sellingPrice}
                </p>
                <p className="text-gray-600 text-lg">
                  Quantity: {product.quantity}
                </p>
              </div>

              <p className="text-lg text-gray-600">
                Status:{" "}
                <span className="font-medium text-blue-600">
                  {product.availabilityStatus}
                </span>
              </p>

              <div className="mt-4">
                <label className="text-gray-700 font-medium">
                  Select Quantity: {orderQuantity}
                </label>
                <Slider
                  defaultValue={[orderQuantity]}
                  min={1}
                  max={product.quantity}
                  step={1}
                  onValueChange={(value) => setOrderQuantity(value[0])}
                  className="mt-2"
                />
              </div>

              <Link to={`/place-order/${product.$id}/${orderQuantity}`}>
                <Button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                  Order Now ({orderQuantity})
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;
