import React from "react";

import NavBar from "./components/NavBar";
import CoverBlock from "./components/CoverBlock";
import CardBlock from "./components/CardBlock";
import Footer from "./components/Footer";

import "./nav.css";
import "./cover.css";
import "./adCards.css";
import "./footer.css";
import "./nav-mobile.css";
import "./cover-mobile.css";
import "./adCards-mobile.css";
import "./footer-mobile.css";
import "../../tokens.css";

export default function Home() {
  return (
    <main className="home">
      <NavBar />
      <CoverBlock />
      <CardBlock />
      <Footer />
    </main>
  );
}

// TODO
// create hook for fetching google sheets.
// make it available globally through the application.
