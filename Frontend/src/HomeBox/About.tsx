import React from "react";
import "./About.css";

const About: React.FC = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-grid">
          {/* LEFT SIDE */}
          <div className="about-left">
            <h2 className="about-title">About AI Complaint Manager</h2>

            <p className="about-description">
              AI Complaint Manager is a smart SaaS platform designed to
              transform how businesses handle customer complaints. It uses
              artificial intelligence to automate workflows, reduce response
              time, and improve customer satisfaction.
            </p>

            <div className="about-mission">
              <h3>🎯 Our Mission</h3>
              <p>
                To simplify complaint management using AI and help businesses
                deliver faster, smarter, and more reliable support experiences.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="about-right">
            <h3 className="services-title">Our Services</h3>

            <ul className="services-list">
              <li>🤖 AI-Based Complaint Categorization</li>
              <li>📊 Real-Time Analytics Dashboard</li>
              <li>🔔 Smart Notifications System</li>
              <li>📁 Complaint History & Tracking</li>
              <li>🔒 Secure Data Management</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
