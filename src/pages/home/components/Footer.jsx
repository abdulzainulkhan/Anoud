import React from "react";
import footerLogo from "../../../data/Anoud Travel Globe Logo.png";

export default function Footer() {
  return (
    <footer>
      <div className="top">
        <div className="footer-icon">
          <img src={footerLogo} alt="logo" />
        </div>
        <div className="text">Start Your Overseas Career Today</div>
      </div>
      <div className="bottom">
        <div className="contact">
          <div className="heading">Contact Us</div>

          <ul>
            <li>
              <span className="footer-icon material-symbols-outlined">
                call
              </span>
              <span className="text">
                <a href="https://wa.me/9012970670">9012970670</a>
              </span>
            </li>

            <li>
              <span className="footer-icon material-symbols-outlined">
                call
              </span>
              <span className="text">8595106080</span>
            </li>

            <li>
              <span className="footer-icon material-symbols-outlined">
                mail
              </span>
              <span className="text">zainulavdeenkhan@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
