import React, { useState } from "react";
import navLogo from "../../../data/Anoud Tour and Travel Logo.png";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openLink = () => {
    setIsMenuOpen(false);
    window.open(
      "https://www.researchgate.net/publication/343627020/figure/fig1/AS:923927526244352@1597292896117/Meme-circulated-on-WhatsApp-Personal-communication-Moscow-2020.jpg",
      "_blank",
    );
  };

  return (
    <nav>
      <div className="logo">
        <img src={navLogo} alt="logo" />
      </div>
      <button
        className="menu-toggle"
        type="button"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((menuOpen) => !menuOpen)}
      >
        <span className="material-symbols-outlined">
          {isMenuOpen ? "close" : "menu"}
        </span>
      </button>
      <ul
        className={`option-list${isMenuOpen ? " option-list-open" : ""}`}
        id="primary-navigation"
      >
        <li onClick={openLink}>Overseas Jobs</li>
        <li onClick={openLink}>Work Visas</li>
        <li onClick={openLink}>Flight Tickets</li>
        <li onClick={openLink}>Tour Package</li>
      </ul>
      <div className="button-container">
        <button className="golden-button">Apply Now</button>
      </div>
    </nav>
  );
}
