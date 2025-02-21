import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section
      className="relative min-h-screen flex items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/main-bg.jpg')" }} // Update with actual image path
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl tracking-tight md:text-6xl font-bold text-white mb-6">
              किसान की ताकत, तकनीक की राह – समृद्धि की नई चाह!
            </h1>
            <p className="text-xl text-gray-200 mb-8">

              किसान से सीधा ग्राहक तक सही दाम, सही काम!
            </p>
            <div className="flex gap-4">
              <button onClick={() => navigate('/auth')}
                className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-colors">
                Create Profile
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
