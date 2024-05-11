// Footer.js

import React from 'react';
import '../layouts/layout.css'; // Import the stylesheet for Footer

const Footer = () => {
  return (
    <footer className="dark-footer">
      <div className="social-media-links">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        {/* Add more social media links as needed */}
      </div>
      <p>&copy; 2024 Your Company Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
