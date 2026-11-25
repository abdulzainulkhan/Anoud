import React, { useEffect, useState } from "react";
import countries from "../../../data/countries.json";
import "../FlagCode.css";

export default function FlagCode({ flag, setFlag }) {
  const [searchQuery, setSearchQuery] = useState("");

  /** @typedef {{name: string, code: string}} suggestionPacket */
  /** @type {[suggestionPacket[], React.Dispatch<React.SetStateAction<suggestionPacket[]>>]} */
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchQuery("");
      setSuggestions([]);
      return;
    }

    const filteredCountries = countries.filter((c) => {
      const words = c.name.toLowerCase().split(" ");
      const queryWords = searchQuery.toLowerCase().trim().split(/\s+/);

      return queryWords.every((queryWord, i) =>
        words[i]?.startsWith(queryWord),
      );
    });

    const suggestionPackets = filteredCountries.map((fc) => ({
      name: fc.name,
      code: fc.alpha2.toLowerCase(),
    }));
    setSuggestions(suggestionPackets);
  }, [searchQuery]);

  const handleSuggestionAccept = (code) => {
    const country = countries.find((c) => c.alpha2.toLowerCase() === code);

    setFlag({ ...country, code, copyIconState: "content_copy" });
    setSearchQuery("");
    setSuggestions([]);
  };

  const handleCopytoClipboard = async () => {
    if (flag.copyIconState !== "content_copy") return;
    try {
      await navigator.clipboard.writeText(flag.code);
      setFlag((prev) => ({ ...prev, copyIconState: "check" }));
    } catch (err) {
      setFlag((prev) => ({ ...prev, copyIconState: "error" }));
    } finally {
      setTimeout(
        () => setFlag((prev) => ({ ...prev, copyIconState: "content_copy" })),
        1000,
      );
    }
  };

  return (
    <main className="flag-code">
      <section className="query-block">
        <header>
          <h3>Search a Country Details</h3>
        </header>
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="Search Query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="suggestion-block">
          {suggestions.map((sg, idx) => (
            <div
              className="suggestion-band"
              key={idx}
              onClick={() => handleSuggestionAccept(sg.code)}
            >
              <div className="flag">
                <img src={`https://flagcdn.com/w80/${sg.code}.png`} />
              </div>
              <div className="country-text">
                <span className="name">{sg.code}</span>
                <span className="name">{sg.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {flag.code && (
        <section className="country-details-block">
          <div
            className="close-btn"
            title="reset this country selected"
            onClick={() => setFlag({ code: false })}
          >
            <span className="material-symbols-outlined">close</span>
          </div>

          <div className="country-details">
            <div className="flag">
              <img src={`https://flagcdn.com/w80/${flag.code}.png`} />
            </div>
            <div className="field">
              <label>Name</label>
              <span className="value">{flag.name}</span>
            </div>

            <div className="field code">
              <label>Alpha Code</label>
              <span className="value">
                <div className="code">{flag.code}</div>
                <div
                  className={`copy-button${flag.copyIconState === "check" ? " copy-done" : flag.copyIconState === "error" ? " copy-error" : ""}`}
                  onClick={handleCopytoClipboard}
                >
                  <span className="material-symbols-outlined">
                    {flag.copyIconState}
                  </span>
                </div>
              </span>
            </div>

            <div className="field">
              <label>Official Name</label>
              <span className="value">{flag.officialName}</span>
            </div>

            <div className="field">
              <label>Calling Code</label>
              <span className="value">{flag.callingCode}</span>
            </div>

            <div className="field">
              <label>Currency</label>
              <span className="value">{flag.currency}</span>
            </div>

            <div className="field">
              <label>Capital</label>
              <span className="value">{flag.capital}</span>
            </div>

            <div className="field">
              <label>Region</label>
              <span className="value">{flag.subregion}</span>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
