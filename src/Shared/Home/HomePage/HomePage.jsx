import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../Footer/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const HomePage = () => {
  return (
    <div className="bg-green-50 text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-green-900">
                Empowering a Greener Future with Renewable Energy
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                We connect businesses and individuals to a clean energy
                ecosystem — trading, tracking, and managing renewable energy
                certificates (RECs) with transparency and ease.
              </p>
              <Link
                to="/learn-more"
                className="inline-block mt-8 px-6 py-3 bg-green-500 text-white font-medium rounded-md shadow-md hover:bg-green-600 transition-all"
              >
                Learn More
              </Link>
            </motion.div>

            <motion.div
              className="mt-12 lg:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://i.pinimg.com/1200x/6f/b6/7c/6fb67c0a7fb9181b245b5c2c44c3725c.jpg"
                alt="Green Energy Illustration"
                className="w-full h-[650px] rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl font-semibold text-green-900 text-center"
        >
          Our Solutions
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Buy & Sell RECs",
              text: "Trade renewable energy certificates seamlessly through our trusted marketplace.",
            },
            {
              title: "Manage Energy Goals",
              text: "Track, plan, and achieve your company’s sustainability milestones efficiently.",
            },
            {
              title: "Monetize Solar Assets",
              text: "Easily onboard your solar assets and generate additional value from clean energy.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all border border-green-100"
            >
              <h3 className="text-xl font-medium text-green-700">
                {item.title}
              </h3>
              <p className="mt-4 text-gray-600">{item.text}</p>
              <Link
                to="#"
                className="mt-4 inline-block text-green-600 font-medium hover:underline"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl font-semibold text-green-900 text-center"
          >
            How It Works
          </motion.h2>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "1. Sellers",
                text: "List your renewable energy certificates on our secure platform and earn revenue for contributing to green energy.",
              },
              {
                title: "2. Buyers",
                text: "Purchase RECs that align with your sustainability commitments and reduce your carbon footprint.",
              },
              {
                title: "3. AI Forecasting",
                text: "Every transaction is verified and traceable, ensuring complete transparency and compliance.",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center p-6 bg-green-50 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-2xl font-medium text-green-700">
                  {step.title}
                </h3>
                <p className="mt-4 text-gray-700">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-green-50 py-20" id="faq">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold text-green-900 text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "What is a Renewable Energy Certificate (REC)?",
                a: "A Renewable Energy Certificate (REC) represents proof that 1 megawatt-hour (MWh) of electricity was generated from a renewable energy source. It allows companies to support clean energy production even if they cannot directly use renewable power.",
              },
              {
                q: "How does your trading platform work?",
                a: "Our platform connects renewable energy producers with organizations and individuals looking to purchase RECs. Each transaction is transparent, traceable, and verified to ensure authenticity and compliance.",
              },
              {
                q: "Can individuals participate in REC trading?",
                a: "Yes! Individuals who own renewable energy systems, such as rooftop solar, can register and monetize their energy production through RECs on our platform.",
              },
              {
                q: "Are RECs the same as carbon credits?",
                a: "No, RECs and carbon credits are different. RECs certify renewable electricity generation, while carbon credits offset emissions from non-renewable sources. Both contribute to sustainability but serve different purposes.",
              },
              {
                q: "Is your platform available globally?",
                a: "We currently operate in selected regions, but expansion is underway. Our goal is to make renewable energy trading accessible to everyone worldwide.",
              },
            ].map((faq, idx) => (
              <motion.details
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white border border-green-100 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <summary className="flex justify-between items-center cursor-pointer px-6 py-4 text-green-800 font-medium text-lg">
                  {faq.q}
                  <span className="ml-2 text-green-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="px-6 pb-4 text-gray-700 text-base">{faq.a}</div>
              </motion.details>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
