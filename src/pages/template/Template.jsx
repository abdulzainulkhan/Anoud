import React, { useState } from "react";
import FlagCode from "./components/FlagCode";
import "../../tokens.css";
import "./Template.css";
import CardEntry from "./components/CardEntry";

export default function Template() {
  const [flag, setFlag] = useState({ code: false });

  return (
    <main className="template">
      <nav>
        <ul className="option-list">
          <li className="option">
            <span
              className="material-symbols-outlined"
              onClick={() => window.open("/", "_self")}
            >
              home
            </span>
          </li>
        </ul>
      </nav>

      <FlagCode flag={flag} setFlag={setFlag} />
      <CardEntry />
    </main>
  );
}
