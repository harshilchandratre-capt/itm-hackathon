import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Real-time Monitoring",
    description: "Track your investments and farming projects in real-time with our advanced monitoring system.",
    icon: "📊"
  },
  {
    title: "Secure Investment",
    description: "Your investments are secured with our bank-grade security systems and insurance coverage.",
    icon: "🔒"
  },
  {
    title: "Expert Support",
    description: "Get support from our team of agricultural and investment experts 24/7.",
    icon: "👥"
  },
  {
    title: "High Returns",
    description: "Earn competitive returns on your agricultural investments with minimal risk.",
    icon: "💰"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Why Choose Farmvest?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            We provide the best features to make your agricultural investment journey smooth and profitable
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
