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
                <a href="https://wa.me/9220702926">9220702926</a>
              </span>
            </li>

            <li>
              <span className="footer-icon material-symbols-outlined">
                call
              </span>
              <span className="text">
                <a href="https://wa.me/9205895056">9205895056</a>
              </span>
            </li>

            <li>
              <span className="footer-icon material-symbols-outlined">
                mail
              </span>
              <span className="text">
                <a href="mailto:anoudinternationalcareers@gmail.com">
                  anoudinternationalcareers@gmail.com
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
