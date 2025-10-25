import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaUsers, FaGlobe, FaHandshake } from "react-icons/fa";
import Footer from "../Footer/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const AboutUs = () => {
  return (
    <div className="bg-green-50 text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-28 px-6 text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-gray-800/60"></div>

        <motion.div
          className="relative z-10 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            About Energynet
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-green-100 leading-relaxed">
            Empowering a sustainable future through renewable energy innovation,
            smart trading, and green technology.
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80"
            alt="Our Story"
            className="rounded-2xl shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-green-700 mb-4">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Founded in 2020, Energynet was built with a vision to promote clean
            energy and transparent trading systems. We empower individuals,
            communities, and industries to contribute towards a greener world.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, we are proud to be one of the leading eco-trade platforms in
            South Asia, combining innovation, technology, and sustainability to
            drive meaningful change.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16 px-6 text-center">
        <motion.h2
          className="text-3xl font-semibold text-green-700 mb-8"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >
          Our Mission & Vision
        </motion.h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          {[
            {
              icon: <FaLeaf className="text-green-600 text-4xl mb-4 mx-auto" />,
              title: "Our Mission",
              desc: "To make renewable energy trading accessible, transparent, and profitable for everyone — while protecting our planet for generations to come.",
            },
            {
              icon: (
                <FaGlobe className="text-green-600 text-4xl mb-4 mx-auto" />
              ),
              title: "Our Vision",
              desc: "A world powered by clean energy, where sustainability drives economic growth and every community thrives with green innovation.",
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              className="bg-green-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {card.icon}
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <motion.h2
          className="text-3xl font-semibold text-center text-green-700 mb-12"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >
          Our Core Values
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <FaHandshake className="text-green-600 text-3xl" />,
              title: "Integrity",
              desc: "We believe in transparency, honesty, and long-term trust in every partnership.",
            },
            {
              icon: <FaUsers className="text-green-600 text-3xl" />,
              title: "Community",
              desc: "Empowering local communities and promoting collaboration for a sustainable world.",
            },
            {
              icon: <FaLeaf className="text-green-600 text-3xl" />,
              title: "Innovation",
              desc: "We embrace technology and creativity to develop smarter green energy solutions.",
            },
          ].map((val, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition text-center"
              whileHover={{ scale: 1.03 }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">{val.icon}</div>
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                {val.title}
              </h3>
              <p className="text-gray-600">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-green-100 py-20 px-6 text-center">
        <motion.h2
          className="text-3xl font-semibold text-green-700 mb-10"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >
          Meet Our Team
        </motion.h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            {
              name: "Rabiul Sajed",
              role: "Founder & CEO",
              img: "https://randomuser.me/api/portraits/men/75.jpg",
            },
            {
              name: "Ayesha Rahman",
              role: "Head of Sustainability",
              img: "https://randomuser.me/api/portraits/women/68.jpg",
            },
            {
              name: "Tariq Hasan",
              role: "Lead Engineer",
              img: "https://randomuser.me/api/portraits/men/45.jpg",
            },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-green-300"
              />
              <h3 className="text-lg font-semibold text-green-700">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
