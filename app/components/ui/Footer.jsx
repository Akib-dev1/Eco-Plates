import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary-accent dark:bg-[#1A1A1A] text-input-text font-plus-jakarta-sans">
      <div className="mx-auto max-w-11/12 md:max-w-10/12 lg:max-w-9/12 py-10">
        {/* Top section */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-oswald text-lg mb-2">Eco plates</h3>
            <p className="text-xs sm:text-sm opacity-80">
              Reducing food waste, one plate at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-oswald text-sm mb-3">Quick Links</h4>
            <ul className="space-y-1 text-xs sm:text-sm">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Get Involved
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-oswald text-sm mb-3">Legal</h4>
            <ul className="space-y-1 text-xs sm:text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-oswald text-sm mb-3">Connect With Us</h4>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-full bg-input-text/10 hover:bg-input-text/20 transition"
              >
                <Twitter className="h-5 w-5 text-input-text" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-full bg-input-text/10 hover:bg-input-text/20 transition"
              >
                <Facebook className="h-5 w-5 text-input-text" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-full bg-input-text/10 hover:bg-input-text/20 transition"
              >
                <Instagram className="h-5 w-5 text-input-text" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider + bottom line */}
        <div className="mt-8 border-t border-input-text/20 pt-6 text-center text-[11px] sm:text-xs opacity-80">
          © {new Date().getFullYear()} Eco plates. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
