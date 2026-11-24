import React from "react";

export default function CoverBlock() {
  return (
    <header className="cover-block">
      <div className="main-text">
        <div className="long-bubble-text">OVERSEAS JOB CONSULTANT</div>
        <div className="large-text">Your Dream Job, Our Commitment</div>
        <div className="small-text">
          Verified international job placements, 3-year work permits, flight
          ticketing, and global tour packages.
        </div>
      </div>

      <div className="cover-buttons">
        <button>Explore Jobs</button>
        <button>Get Consultation</button>
      </div>

      <div className="picture-cards">
        <div className="card" id="card-1">
          <img src="https://placeholdr.dev/200x300/travel" alt="travel" />
        </div>
        <div className="card" id="card-2">
          <img src="https://placeholdr.dev/200x300/monument" alt="travel" />
        </div>
        <div className="card" id="card-3">
          <img src="https://placeholdr.dev/200x300/maldives" alt="travel" />
        </div>
      </div>

      <div className="placards-container">
        <div className="placard" id="placard-1">
          <div className="placard-logo">
            <span className="material-symbols-outlined">description</span>
          </div>

          <div className="text">3-Year Work Permit</div>
        </div>

        <div className="placard" id="placard-2">
          <div className="placard-logo">
            <span className="material-symbols-outlined">paid</span>
          </div>

          <div className="text">Well-Paying Earnings</div>
        </div>

        <div className="placard" id="placard-3">
          <div className="placard-logo">
            <span className="material-symbols-outlined">restaurant</span>{" "}
          </div>

          <div className="text">Food & Accomodation Provided</div>
        </div>
      </div>
    </header>
  );
}
