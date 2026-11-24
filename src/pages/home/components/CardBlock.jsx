import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWebsiteContent from "../../../api/useWebsiteContent";

export default function CardBlock() {
  const { adCard, loading, error } = useWebsiteContent();
  const navigate = useNavigate();

  const handleOpenJobAd = (code) => {
    navigate(`/ad/${code}`);
  };

  useEffect(() => console.log(adCard), [adCard]);

  if (loading) return <p>Loading vacancies...</p>;
  if (error) return <p>Failed to load vacancies.</p>;
  return (
    <section className="ad-card-block">
      <div className="heading">
        <h3>Featured Overseas Opportunities</h3>
      </div>

      <div className="card-container">
        {adCard.map((c, idx) => {
          const description = c.benefits.split(";").map((cd) => {
            const [, icon, desc] = cd.trim().match(/^<([^>]+)>\s*(.*)$/) || [];
            return { icon, desc };
          });
          return (
            <div className="ad-card-outline" key={idx}>
              <div className="ad-card" onClick={() => handleOpenJobAd(c.code)}>
                <div className="ad-header">
                  <span className="flag">
                    <img
                      src={`https://flagcdn.com/w80/${c.country_code}.png`}
                      alt=""
                    />
                  </span>
                  <span className="country-name">{c.country_name}</span>
                </div>

                <div className="ad-body">
                  <div className="job-title">{c.job_name}</div>

                  <hr />

                  <div className="pay-info">
                    {c?.salary_currency && (
                      <span className="currency material-symbols-outlined">
                        {c?.salary_currency}
                      </span>
                    )}
                    <span className="amount">
                      {c.salary_amount}
                      <span className="sub"> {c.salary_sub}</span>
                    </span>
                  </div>

                  <hr />

                  <div className="description">
                    <ul>
                      {description.map((d, didx) => (
                        <li key={didx}>
                          {d?.icon && (
                            <span className="ad-desc-icon material-symbols-outlined">
                              {d?.icon}
                            </span>
                          )}
                          {d?.desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="btn-container">
                  <button className="ad-apply-now-btn">Apply Now</button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="ad-card-outline">
          <div className="ad-card special-card">
            <div className="header">Our Services</div>

            <div className="stamp-block-container">
              <div className="stamp-block">
                <div className="top">
                  <span className="material-symbols-outlined">language</span>
                </div>
                <div className="bottom">
                  <span className="text">Overseas Job Placement</span>
                </div>
              </div>

              <div className="stamp-block">
                <div className="top">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <div className="bottom">
                  <span className="text">All Types of Work Visas</span>
                </div>
              </div>

              <div className="stamp-block">
                <div className="top">
                  <span className="material-symbols-outlined">travel</span>
                </div>
                <div className="bottom">
                  <span className="text">Flight Tickets</span>
                </div>
              </div>

              <div className="stamp-block">
                <div className="top">
                  <span className="material-symbols-outlined">domain</span>
                </div>
                <div className="bottom">
                  <span className="text">Tour & Travel Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
