import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import Footer from "../Footer/Footer";

const Contactus = () => {
  return (
    <div className="bg-green-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-28 px-6 text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-700/70"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-green-100 leading-relaxed">
            Have questions or want to collaborate? We’d love to hear from you —
            let’s build a greener future together.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-4 gap-8 text-center">
        {[
          {
            icon: <FaMapMarkerAlt />,
            title: "Address",
            info: ["45 Green Valley Road, Dhaka, Bangladesh"],
          },
          {
            icon: <FaPhoneAlt />,
            title: "Phone",
            info: ["+880 1234-567890", "+880 9876-543210"],
          },
          {
            icon: <FaEnvelope />,
            title: "Email",
            info: ["info@energynet.com", "support@energynet.com"],
          },
          {
            icon: <FaClock />,
            title: "Working Hours",
            info: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: Closed"],
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow hover:shadow-lg hover:scale-105 transition transform duration-300"
          >
            <div className="text-green-600 text-3xl mx-auto mb-4">
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              {item.title}
            </h3>
            {item.info.map((line, i) => (
              <p key={i} className="text-gray-600">
                {line}
              </p>
            ))}
          </div>
        ))}
      </section>

      {/* Contact Form */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Form */}
          <div>
            <h2 className="text-3xl font-semibold text-green-700 mb-6">
              Get In Touch
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below and our team will get back to you shortly.
              We value every inquiry and are committed to providing quick,
              meaningful responses.
            </p>

            <form className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-green-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-green-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full border border-green-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right - Map */}
          <div className="h-96 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=23.797782999938786,90.44969985726378&hl=en&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contactus;
