import React from "react";
import "./Footer.css";
import { FaGlobeAmericas } from "react-icons/fa";
import { RxLinkedinLogo } from "react-icons/rx";
import { AiFillFacebook } from "react-icons/ai";
type LinkItem = {
  label: string;
  href: string;
};

const quickLinks: LinkItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-section brand">
          <h2 className="logo">🤖 AI Manager</h2>
          <p className="footer-text">
            Smart AI-powered complaint management platform helping businesses
            automate workflows and improve customer satisfaction.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* SOCIAL */}
        <div className="footer-section social">
          <h3>Connect</h3>
          <div className="social-icons">
            <a
              href="https://ai-complain-manager-frontend.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGlobeAmericas size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/samarth-malhotra-619211296/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RxLinkedinLogo size={24} />
            </a>
            <a
              href="https://www.facebook.com/AIComplaintManager"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillFacebook size={24} />
            </a>
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} AI Complaint Manager. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
