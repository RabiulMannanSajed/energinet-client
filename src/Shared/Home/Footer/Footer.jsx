import React from "react";

const Footer = () => {
  return (
    <div>
      {/* Footer Section */}
      <footer className="bg-green-900 text-green-100 pt-16 pb-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Top Footer */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-green-700">
            {/* Company Info */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Energynet
              </h2>
              <p className="text-green-200 text-sm leading-relaxed">
                Empowering a sustainable future through renewable energy
                innovation. Join us in creating a cleaner, greener planet.
              </p>
              <div className="flex space-x-4 mt-5">
                <a href="#" className="hover:text-green-400 transition">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="hover:text-green-400 transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-green-400 transition">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="hover:text-green-400 transition">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-green-200">
                <li>
                  <p href="/" className="hover:text-green-400 transition">
                    Home
                  </p>
                </li>
                <li>
                  <p href="/about" className="hover:text-green-400 transition">
                    About Us
                  </p>
                </li>
                <li>
                  <p
                    href="/services"
                    className="hover:text-green-400 transition"
                  >
                    Services
                  </p>
                </li>
                <li>
                  <p
                    href="/contact"
                    className="hover:text-green-400 transition"
                  >
                    Contact
                  </p>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Resources
              </h3>
              <ul className="space-y-2 text-green-200">
                <li>
                  <p href="/faq" className="hover:text-green-400 transition">
                    FAQs
                  </p>
                </li>
                <li>
                  <p href="/blog" className="hover:text-green-400 transition">
                    Blog
                  </p>
                </li>
                <li>
                  <p
                    href="/careers"
                    className="hover:text-green-400 transition"
                  >
                    Careers
                  </p>
                </li>
                <li>
                  <p
                    href="/support"
                    className="hover:text-green-400 transition"
                  >
                    Support
                  </p>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Contact Us
              </h3>
              <ul className="space-y-2 text-green-200 text-sm">
                <li>
                  <span className="block">
                    📍 45 Green Valley Road, Dhaka, Bangladesh
                  </span>
                </li>
                <li>
                  <span className="block">📞 +880 1234-567890</span>
                </li>
                <li>
                  <span className="block">✉️ support@Energynet.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 text-sm text-green-300">
            <p>© {new Date().getFullYear()} Energynet. All rights reserved.</p>
            <div className="flex gap-4 mt-3 sm:mt-0">
              <p href="/privacy" className="hover:text-green-400 transition">
                Privacy Policy
              </p>
              <p href="/terms" className="hover:text-green-400 transition">
                Terms of Service
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
