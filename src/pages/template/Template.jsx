import React, { useState } from "react";
import FlagCode from "./components/FlagCode";

export default function Template() {
  const [flag, setFlag] = useState({code: false});

  return (
    <main className="template">
      <nav>
        <ul className="option-list">
          <li className="option">
            <span className="material-symbols-outlined">home</span>
          </li>
        </ul>
      </nav>

      <FlagCode flag={flag} setFlag={setFlag} />
    </main>
  );
}
