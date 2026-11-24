import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./adPoster.css";
import "./adPoster-mobile.css";
import "../../tokens.css";

import useWebsiteContent from "../../api/useWebsiteContent";
import whatsappLogo from "../../data/whatsapp-icon.png";
import footerLogo from "../../data/Anoud Travel Globe Logo.png";

export default function AdPoster() {
  const { code } = useParams();
  const { adCard, loading, error } = useWebsiteContent();
  const [adC, setAdC] = useState(false);

  useEffect(() => {
    setAdC(adCard.find((c) => c.code === code) || false);
  }, [adCard]);

  if (loading) return <p>Loading vacancies...</p>;
  if (error) return <p>Failed to load vacancies.</p>;
  return (
    <main className="ad-poster">
      <div className="poster-outline">
        <div className="poster">
          <div className="poster-image">
            {adC && <img src={adC.ad_image} alt="Ad Poster" />}
          </div>
          <div className="contact-us">
            <div className="ad-info">
              <div className="job-name">{adC.job_name}</div>
              <div className="country">{adC.country_name}</div>
            </div>
            <div
              className="whatsapp-button"
              onClick={() =>
                window.open(
                  `https://wa.me/${adC.ad_referral_phone}?text=${encodeURIComponent(`Hey I would like to enquire about ${adC.job_name} Job in ${adC.country_name}`)}`, '_blank'
                )
              }
            >
              <div className="logo">
                <img src={whatsappLogo} alt="whatsapp-icon" />
              </div>
              <span className="text">Send Whatsapp</span>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="logo">
          <img src={footerLogo} alt="logo" />
        </div>
        <div className="text">Start Your Overseas Career Today</div>
      </footer>
    </main>
  );
}
